import { Worker, type Job } from "bullmq";
import { db } from "@inculva/db";
import {
  crawlSite,
  aggregateResults,
  type CrawlPageResult,
  type PageScanResult,
  type WcagLevel,
} from "@inculva/scanner";
import type { Redis } from "ioredis";
import { SCAN_SITE_QUEUE } from "../plugins/bull.js";

export interface ScanSiteJobData {
  scanId: string;
  siteId: string;
  startUrl: string;
  wcagLevel: WcagLevel;
  maxPages: number;
  contentLocale?: "en" | "tr";
}

async function processScanSite(job: Job<ScanSiteJobData>): Promise<void> {
  const { scanId, siteId, startUrl, wcagLevel, maxPages, contentLocale } =
    job.data;

  await db.scan.update({
    where: { id: scanId },
    data: { status: "crawling", startedAt: new Date() },
  });

  const pageResults: PageScanResult[] = [];

  try {
    await crawlSite({
      startUrl,
      wcagLevel,
      maxPages,
      scanId,
      siteId,
      contentLocale: contentLocale === "tr" ? "tr" : "en",

      async onPageScanned(result: CrawlPageResult) {
        // Create ScanPage record
        const scanPage = await db.scanPage.create({
          data: {
            scanId,
            url: result.url,
            status: result.error ? "failed" : "completed",
            violations: result.violations.length,
            passes: result.passes,
            incomplete: result.incompleteRules.length,
            score: result.error ? null : (() => {
              const agg = aggregateResults([{
                url: result.url,
                violations: result.violations,
                passedRules: result.passedRules,
                incompleteRules: result.incompleteRules,
                passes: result.passes,
                startedAt: result.startedAt,
                completedAt: result.completedAt,
              }]);
              return agg.complianceScore;
            })(),
            errorMessage: result.error ?? null,
            startedAt: new Date(result.startedAt),
            completedAt: new Date(result.completedAt),
          },
        });

        // Write violations
        if (result.violations.length > 0) {
          await db.scanIssue.createMany({
            data: result.violations.map((v) => ({
              scanId,
              pageId: scanPage.id,
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

        // Write passed rules
        if (result.passedRules.length > 0) {
          await db.scanPassedRule.createMany({
            data: result.passedRules.map((p) => ({
              scanId,
              pageId: scanPage.id,
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

        // Write incomplete (needs review) items
        if (result.incompleteRules.length > 0) {
          await db.scanIncomplete.createMany({
            data: result.incompleteRules.map((inc) => ({
              scanId,
              pageId: scanPage.id,
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

        // Track for final aggregation
        if (!result.error) {
          pageResults.push({
            url: result.url,
            violations: result.violations,
            passedRules: result.passedRules,
            incompleteRules: result.incompleteRules,
            passes: result.passes,
            startedAt: result.startedAt,
            completedAt: result.completedAt,
          });
        }
      },

      onProgress(scanned) {
        // Update scan progress for UI polling
        db.scan.update({
          where: { id: scanId },
          data: { totalPages: scanned },
        }).catch((e) => console.error("Progress update failed:", e));

        // Report BullMQ job progress
        job.updateProgress({ pagesScanned: scanned }).catch(() => {});
      },
    });

    // Crawl finished — aggregate results
    const aggregated = aggregateResults(pageResults);

    const totalPages = await db.scanPage.count({ where: { scanId } });

    await db.scan.update({
      where: { id: scanId },
      data: {
        status: "completed",
        totalPages,
        totalViolations: aggregated.totalViolations,
        totalPasses: aggregated.totalPasses,
        totalIncomplete: aggregated.totalIncomplete,
        complianceScore: aggregated.complianceScore,
        completedAt: new Date(),
      },
    });

    // Update WidgetConfig for badge
    await db.widgetConfig.updateMany({
      where: { siteId },
      data: {
        lastScanViolations: aggregated.totalViolations,
        lastScanAt: new Date(),
        lastComplianceScore: aggregated.complianceScore,
      },
    });

    // Upsert compliance snapshot for today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await db.complianceSnapshot.upsert({
      where: { siteId_date: { siteId, date: today } },
      create: {
        siteId,
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown crawl error";
    console.error(`Site scan ${scanId} failed:`, message);

    await db.scan.update({
      where: { id: scanId },
      data: {
        status: "failed",
        errorMessage: message,
        completedAt: new Date(),
      },
    });
  }
}

export function createScanSiteWorker(connection: Redis): Worker<ScanSiteJobData> {
  const worker = new Worker<ScanSiteJobData>(
    SCAN_SITE_QUEUE,
    async (job) => {
      await processScanSite(job);
    },
    {
      connection,
      concurrency: 1,
    },
  );

  worker.on("failed", (job, err) => {
    console.error(`Scan site job ${job?.id} failed:`, err.message);
  });

  return worker;
}
