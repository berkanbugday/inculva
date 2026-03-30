import { Worker, type Job } from "bullmq";
import { db } from "@inculva/db";
import { aggregateResults, type PageScanResult } from "@inculva/scanner";
import type { Redis } from "ioredis";
import { SCAN_REPORT_QUEUE } from "../plugins/bull.js";

export interface ScanReportJobData {
  scanId: string;
}

async function processScanReport(job: Job<ScanReportJobData>): Promise<void> {
  const { scanId } = job.data;

  const scan = await db.scan.findUnique({
    where: { id: scanId },
    include: { pages: { include: { issues: true, passedRules: true, incompleteRules: true } } },
  });

  if (!scan) return;

  // Build page results for aggregation
  const pageResults: PageScanResult[] = scan.pages
    .filter((p) => p.status === "completed")
    .map((p) => ({
      url: p.url,
      violations: p.issues.map((i) => ({
        ruleId: i.ruleId,
        description: i.description,
        impact: i.impact as "critical" | "serious" | "moderate" | "minor",
        wcag: i.wcag,
        wcagLevel: i.wcagLevel as "A" | "AA" | "AAA",
        category: i.category as "perceivable" | "operable" | "understandable" | "robust",
        selector: i.selector ?? "",
        html: i.html ?? "",
        helpUrl: i.helpUrl ?? "",
      })),
      passedRules: (p.passedRules ?? []).map((pr) => ({
        ruleId: pr.ruleId,
        description: pr.description,
        helpText: pr.helpText ?? pr.description,
        wcag: pr.wcag,
        wcagLevel: pr.wcagLevel as "A" | "AA" | "AAA",
        category: pr.category as "perceivable" | "operable" | "understandable" | "robust",
        helpUrl: pr.helpUrl ?? "",
        nodeCount: pr.nodeCount,
      })),
      incompleteRules: (p.incompleteRules ?? []).map((inc) => ({
        ruleId: inc.ruleId,
        description: inc.description,
        impact: inc.impact as "critical" | "serious" | "moderate" | "minor",
        wcag: inc.wcag,
        wcagLevel: inc.wcagLevel as "A" | "AA" | "AAA",
        category: inc.category as "perceivable" | "operable" | "understandable" | "robust",
        selector: inc.selector ?? "",
        html: inc.html ?? "",
        helpUrl: inc.helpUrl ?? "",
        message: inc.message,
      })),
      passes: p.passes ?? 0,
      startedAt: p.startedAt?.toISOString() ?? "",
      completedAt: p.completedAt?.toISOString() ?? "",
    }));

  const aggregated = aggregateResults(pageResults);

  // Update scan with aggregated results
  await db.scan.update({
    where: { id: scanId },
    data: {
      status: "completed",
      totalPages: scan.pages.length,
      totalViolations: aggregated.totalViolations,
      totalPasses: aggregated.totalPasses,
      totalIncomplete: aggregated.totalIncomplete,
      complianceScore: aggregated.complianceScore,
      completedAt: new Date(),
    },
  });

  // Update WidgetConfig with latest scan results (for badge)
  await db.widgetConfig.updateMany({
    where: { siteId: scan.siteId },
    data: {
      lastScanViolations: aggregated.totalViolations,
      lastScanAt: new Date(),
      lastComplianceScore: aggregated.complianceScore,
    },
  });

  // Create/update compliance snapshot for today
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  await db.complianceSnapshot.upsert({
    where: { siteId_date: { siteId: scan.siteId, date: today } },
    create: {
      siteId: scan.siteId,
      date: today,
      score: aggregated.complianceScore,
      violations: aggregated.totalViolations,
      passes: aggregated.totalPasses,
      scanId,
    },
    update: {
      score: aggregated.complianceScore,
      violations: aggregated.totalViolations,
      passes: aggregated.totalPasses,
      scanId,
    },
  });
}

export function createScanReportWorker(connection: Redis): Worker<ScanReportJobData> {
  const worker = new Worker<ScanReportJobData>(
    SCAN_REPORT_QUEUE,
    async (job) => {
      await processScanReport(job);
    },
    { connection, concurrency: 2 },
  );

  worker.on("failed", (job, err) => {
    console.error(`Scan report job ${job?.id} failed:`, err.message);
  });

  return worker;
}
