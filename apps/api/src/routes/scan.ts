import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { db } from "@inculva/db";
import { assertSafeUrl } from "@inculva/scanner";

interface CreateScanBody {
  siteId: string;
  url: string;
  wcagLevel?: "A" | "AA" | "AAA";
  maxPages?: number;
  type?: "page" | "site";
  contentLocale?: "en" | "tr";
}

interface ScanParams {
  scanId: string;
}

interface SiteParams {
  siteId: string;
}

interface ListScansQuery {
  limit?: number;
  offset?: number;
}

export async function scanRoutes(app: FastifyInstance): Promise<void> {
  // POST /scans — Create and enqueue a new scan
  app.post<{ Body: CreateScanBody }>(
    "/scans",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{ Body: CreateScanBody }>,
      reply: FastifyReply,
    ) => {
      const {
        siteId,
        url,
        wcagLevel = "AA",
        maxPages = 1,
        type = "page",
        contentLocale = "en",
      } = request.body;
      const scanLocale = contentLocale === "tr" ? "tr" : "en";

      if (!siteId || !url) {
        return reply
          .status(400)
          .send({ success: false, error: "siteId and url are required" });
      }

      // Validate URL safety
      try {
        assertSafeUrl(url);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid URL";
        return reply.status(400).send({ success: false, error: message });
      }

      // Verify site exists
      const site = await db.site.findUnique({ where: { id: siteId } });
      if (!site) {
        return reply
          .status(404)
          .send({ success: false, error: "Site not found" });
      }

      if (type === "site") {
        // Site-wide crawl scan — Crawlee discovers pages
        const scan = await db.scan.create({
          data: {
            siteId,
            status: "crawling",
            trigger: "manual",
            maxPages,
            wcagLevel,
            startedAt: new Date(),
          },
        });

        await app.scanSiteQueue.add("scan-site", {
          scanId: scan.id,
          siteId,
          startUrl: url,
          wcagLevel,
          maxPages,
          contentLocale: scanLocale,
        });

        return reply.status(201).send({
          success: true,
          data: {
            scanId: scan.id,
            status: scan.status,
            type: "site",
          },
        });
      }

      // Single-page scan (existing flow)
      const scan = await db.scan.create({
        data: {
          siteId,
          status: "scanning",
          trigger: "manual",
          maxPages: 1,
          wcagLevel,
          startedAt: new Date(),
          pages: {
            create: { url },
          },
        },
        include: { pages: true },
      });

      const page = scan.pages[0]!;

      await app.scanPageQueue.add("scan-page", {
        scanId: scan.id,
        pageId: page.id,
        siteId,
        url,
        wcagLevel,
        contentLocale: scanLocale,
      });

      return reply.status(201).send({
        success: true,
        data: {
          scanId: scan.id,
          status: scan.status,
          type: "page",
        },
      });
    },
  );

  // GET /scans/:scanId — Get scan status and results
  app.get<{ Params: ScanParams }>(
    "/scans/:scanId",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{ Params: ScanParams }>,
      reply: FastifyReply,
    ) => {
      const { scanId } = request.params;

      const scan = await db.scan.findUnique({
        where: { id: scanId },
        include: {
          pages: {
            orderBy: { createdAt: "asc" },
          },
          issues: {
            orderBy: [{ impact: "asc" }, { ruleId: "asc" }],
          },
          passedRules: {
            orderBy: [{ category: "asc" }, { ruleId: "asc" }],
          },
          incompleteRules: {
            orderBy: [{ impact: "asc" }, { ruleId: "asc" }],
          },
        },
      });

      if (!scan) {
        return reply
          .status(404)
          .send({ success: false, error: "Scan not found" });
      }

      const pagesScanned = scan.pages.filter(
        (p) => p.status === "completed" || p.status === "failed",
      ).length;
      const pagesTotal = scan.pages.length;

      return reply.send({
        success: true,
        data: {
          ...scan,
          progress: {
            pagesScanned,
            pagesTotal,
          },
        },
      });
    },
  );

  // GET /sites/:siteId/scans — List scans for a site
  app.get<{ Params: SiteParams; Querystring: ListScansQuery }>(
    "/sites/:siteId/scans",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{
        Params: SiteParams;
        Querystring: ListScansQuery;
      }>,
      reply: FastifyReply,
    ) => {
      const { siteId } = request.params;
      const limit = Math.min(request.query.limit ?? 20, 100);
      const offset = request.query.offset ?? 0;

      const [scans, total] = await Promise.all([
        db.scan.findMany({
          where: { siteId },
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
          include: {
            _count: { select: { issues: true, pages: true } },
          },
        }),
        db.scan.count({ where: { siteId } }),
      ]);

      return reply.send({
        success: true,
        data: { scans, total, limit, offset },
      });
    },
  );

  // GET /sites/:siteId/scans/latest — Latest completed scan
  app.get<{ Params: SiteParams }>(
    "/sites/:siteId/scans/latest",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{ Params: SiteParams }>,
      reply: FastifyReply,
    ) => {
      const { siteId } = request.params;

      const scan = await db.scan.findFirst({
        where: { siteId, status: "completed" },
        orderBy: { completedAt: "desc" },
        include: {
          pages: { orderBy: { createdAt: "asc" } },
          issues: { orderBy: [{ impact: "asc" }, { ruleId: "asc" }] },
          passedRules: { orderBy: [{ category: "asc" }, { ruleId: "asc" }] },
          incompleteRules: { orderBy: [{ impact: "asc" }, { ruleId: "asc" }] },
        },
      });

      if (!scan) {
        return reply
          .status(404)
          .send({ success: false, error: "No completed scans found" });
      }

      return reply.send({ success: true, data: scan });
    },
  );

  // GET /sites/:siteId/compliance — Current compliance overview
  app.get<{ Params: SiteParams }>(
    "/sites/:siteId/compliance",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{ Params: SiteParams }>,
      reply: FastifyReply,
    ) => {
      const { siteId } = request.params;

      // Latest scan
      const latestScan = await db.scan.findFirst({
        where: { siteId, status: "completed" },
        orderBy: { completedAt: "desc" },
      });

      // Previous scan for trend
      const previousScan = latestScan
        ? await db.scan.findFirst({
            where: { siteId, status: "completed", id: { not: latestScan.id } },
            orderBy: { completedAt: "desc" },
          })
        : null;

      // Issue summary by status
      const issueSummary = latestScan
        ? await db.scanIssue.groupBy({
            by: ["impact"],
            where: { scanId: latestScan.id },
            _count: true,
          })
        : [];

      // Category breakdown
      const categoryBreakdown = latestScan
        ? await db.scanIssue.groupBy({
            by: ["category"],
            where: { scanId: latestScan.id },
            _count: true,
          })
        : [];

      const currentScore = latestScan?.complianceScore ?? null;
      const previousScore = previousScan?.complianceScore ?? null;

      let trend: "improving" | "declining" | "stable" = "stable";
      if (currentScore !== null && previousScore !== null) {
        if (currentScore > previousScore + 1) trend = "improving";
        else if (currentScore < previousScore - 1) trend = "declining";
      }

      return reply.send({
        success: true,
        data: {
          currentScore,
          previousScore,
          trend,
          totalViolations: latestScan?.totalViolations ?? 0,
          totalPasses: latestScan?.totalPasses ?? 0,
          scannedPages: latestScan?.totalPages ?? 0,
          lastScanDate: latestScan?.completedAt?.toISOString() ?? null,
          impactBreakdown: issueSummary.map((g) => ({
            impact: g.impact,
            count: g._count,
          })),
          categoryBreakdown: categoryBreakdown.map((g) => ({
            category: g.category,
            count: g._count,
          })),
        },
      });
    },
  );

  // GET /sites/:siteId/compliance/history — Historical snapshots for charts
  app.get<{ Params: SiteParams; Querystring: { days?: number } }>(
    "/sites/:siteId/compliance/history",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{
        Params: SiteParams;
        Querystring: { days?: number };
      }>,
      reply: FastifyReply,
    ) => {
      const { siteId } = request.params;
      const days = Math.min(request.query.days ?? 30, 365);
      const since = new Date();
      since.setDate(since.getDate() - days);

      const snapshots = await db.complianceSnapshot.findMany({
        where: { siteId, date: { gte: since } },
        orderBy: { date: "asc" },
      });

      return reply.send({
        success: true,
        data: snapshots.map((s) => ({
          date: s.date.toISOString().split("T")[0],
          score: s.score,
          violations: s.violations,
          passes: s.passes,
        })),
      });
    },
  );
}
