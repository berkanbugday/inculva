import { Worker, Queue, type Job } from "bullmq";
import { db } from "@inculva/db";
import { scanPage, aggregateResults, type PageScanResult } from "@inculva/scanner";
import type { Redis } from "ioredis";
import { SCAN_PAGE_QUEUE, SCAN_REPORT_QUEUE } from "../plugins/bull.js";

export interface ScanPageJobData {
  scanId: string;
  pageId: string;
  siteId: string;
  url: string;
  wcagLevel: "A" | "AA" | "AAA";
}

async function processScanPage(data: ScanPageJobData): Promise<void> {
  const { scanId, pageId, siteId, url, wcagLevel } = data;

  // Mark page as scanning
  await db.scanPage.update({
    where: { id: pageId },
    data: { status: "scanning", startedAt: new Date() },
  });

  let result: PageScanResult;

  try {
    result = await scanPage({ url, wcagLevel });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown scan error";
    await db.scanPage.update({
      where: { id: pageId },
      data: { status: "failed", errorMessage: message, completedAt: new Date() },
    });
    return;
  }

  // Write scan issues to DB
  if (result.violations.length > 0) {
    await db.scanIssue.createMany({
      data: result.violations.map((v) => ({
        scanId,
        pageId,
        siteId,
        ruleId: v.ruleId,
        description: v.description,
        impact: v.impact,
        wcag: v.wcag,
        wcagLevel: v.wcagLevel,
        category: v.category,
        selector: v.selector,
        html: v.html,
        helpUrl: v.helpUrl,
      })),
    });
  }

  // Write passed rules to DB
  if (result.passedRules.length > 0) {
    await db.scanPassedRule.createMany({
      data: result.passedRules.map((p) => ({
        scanId,
        pageId,
        ruleId: p.ruleId,
        description: p.description,
        helpText: p.helpText,
        wcag: p.wcag,
        wcagLevel: p.wcagLevel,
        category: p.category,
        helpUrl: p.helpUrl,
        nodeCount: p.nodeCount,
      })),
    });
  }

  // Write incomplete (needs review) items to DB
  if (result.incompleteRules.length > 0) {
    await db.scanIncomplete.createMany({
      data: result.incompleteRules.map((inc) => ({
        scanId,
        pageId,
        ruleId: inc.ruleId,
        description: inc.description,
        impact: inc.impact,
        wcag: inc.wcag,
        wcagLevel: inc.wcagLevel,
        category: inc.category,
        selector: inc.selector,
        html: inc.html,
        helpUrl: inc.helpUrl,
        message: inc.message,
      })),
    });
  }

  // Compute per-page score using same weighted formula as aggregate
  const pageAgg = aggregateResults([result]);

  await db.scanPage.update({
    where: { id: pageId },
    data: {
      status: "completed",
      violations: result.violations.length,
      passes: result.passes,
      incomplete: result.incompleteRules.length,
      score: pageAgg.complianceScore,
      completedAt: new Date(),
    },
  });
}

/**
 * Check if all pages for a scan are done, and if so, enqueue the report job.
 * Uses Redis SETNX to prevent duplicate report jobs from concurrent workers.
 */
async function checkScanCompletion(
  scanId: string,
  connection: Redis,
  reportQueue: Queue,
): Promise<void> {
  const pendingPages = await db.scanPage.count({
    where: { scanId, status: { in: ["pending", "scanning"] } },
  });

  if (pendingPages > 0) return;

  // Atomic lock: only one worker enqueues the report job
  const lockKey = `scan-complete:${scanId}`;
  const acquired = await connection.set(lockKey, "1", "EX", 300, "NX");

  if (acquired) {
    await reportQueue.add("aggregate", { scanId });
  }
}

export function createScanPageWorker(
  connection: Redis,
  reportQueue: Queue,
): Worker<ScanPageJobData> {
  const worker = new Worker<ScanPageJobData>(
    SCAN_PAGE_QUEUE,
    async (job: Job<ScanPageJobData>) => {
      // Process page scan (may succeed or fail)
      await processScanPage(job.data);

      // Always check completion, regardless of page success/failure
      await checkScanCompletion(job.data.scanId, connection, reportQueue);
    },
    {
      connection,
      concurrency: 3,
      limiter: {
        max: 5,
        duration: 10_000,
      },
    },
  );

  worker.on("failed", (job, err) => {
    console.error(`Scan page job ${job?.id} failed:`, err.message);

    // Even if the worker-level job fails, check completion
    // so the scan doesn't get orphaned
    if (job?.data.scanId) {
      void checkScanCompletion(job.data.scanId, connection, reportQueue).catch(
        (e) => console.error("Completion check after failure failed:", e),
      );
    }
  });

  return worker;
}
