# Comprehensive Accessibility Scanning & Reporting Module

## Context

inculva currently has a basic 12-rule Cheerio-based scanner (`apps/manage/src/lib/scanner.ts`) that checks static HTML without JavaScript rendering, supports only single-page on-demand scans, and stores results as a violation count in `WidgetConfig`. Competitors like accessiBe and UserWay offer full-site crawling, 80+ WCAG rules, scheduled scans, trend tracking, and compliance reports. This module is the core differentiator that makes inculva a serious accessibility SaaS platform.

---

## Architecture Overview

```
Next.js (Vercel)          Fastify API (Railway)         Scanner Worker (Railway)
  Dashboard UI     --->   Scan endpoints + BullMQ  ---> Playwright + axe-core
                          Redis (Upstash/Railway)        Page-by-page scanning
                                |                              |
                          PostgreSQL (Railway) <----------------+
```

**Key decisions:**

- **axe-core + Playwright** replaces Cheerio: 80+ rules, JS rendering, color contrast detection
- **BullMQ + Redis** for async job queue (scans are long-running)
- **Scanner runs on Railway** (supports headless Chrome; Vercel serverless does not)
- **Separate DB tables** (not JSON columns) for queryable issue tracking
- **Next.js API routes proxy** to Fastify with internal service token for auth

---

## Phase 1: Foundation — axe-core Engine + Single Page (Week 1-2)

### 1.1 Infrastructure Setup

**Add Redis to docker-compose.yml:**

```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

**New env vars:** `REDIS_URL`, `INTERNAL_API_SECRET`

### 1.2 Database Schema (Prisma Migration)

Add to `packages/db/prisma/schema.prisma`:

**New models:**

- `Scan` — id, siteId, status (pending/crawling/scanning/completed/failed), trigger (manual/scheduled/webhook), maxPages, wcagLevel, totalPages, totalViolations, totalPasses, complianceScore, startedAt, completedAt, errorMessage
- `ScanPage` — id, scanId, url, status, violations, passes, score, errorMessage, startedAt, completedAt
- `ScanIssue` — id, scanId, pageId, siteId, ruleId, description, impact, wcag, wcagLevel, category (perceivable/operable/understandable/robust), selector, html, helpUrl, status (open/fixed/ignored/false_positive), firstSeenAt, fixedAt, fixSuggestion
- `ComplianceSnapshot` — id, siteId, date, score, violations, passes, scanId (@@unique siteId+date)
- `ScanSchedule` — id, siteId (unique), frequency (daily/weekly/monthly), enabled, lastRunAt, nextRunAt

**Updates to existing models:**

- `Site`: add relations to Scan[], ScanIssue[], ScanSchedule?, ComplianceSnapshot[]
- `WidgetConfig`: add `lastComplianceScore Float?`

### 1.3 New Package: `packages/scanner`

```
packages/scanner/
  package.json          # @inculva/scanner — deps: playwright, @axe-core/playwright
  tsconfig.json
  src/
    index.ts            # Public exports
    ssrf.ts             # Extracted from apps/manage/src/lib/scanner.ts
    page-scanner.ts     # Playwright + axe-core single-page scan
    aggregator.ts       # Score computation (weighted by severity)
    types.ts            # ScanResult, PageResult, IssueResult types
```

**page-scanner.ts core logic:**

- Launch Playwright Chromium browser (reusable instance)
- Navigate to URL, wait for networkidle
- Run `@axe-core/playwright` with configurable WCAG level tags
- Return structured violations with selectors, HTML snippets, WCAG mappings
- SSRF protection via `ssrf.ts` (extracted `assertSafeHostname`)
- 60s timeout per page

### 1.4 BullMQ Setup in Fastify API

**New files in `apps/api/src/`:**

- `plugins/redis.ts` — Redis connection (ioredis), registered as Fastify plugin
- `plugins/bull.ts` — BullMQ queue definitions + worker registration
- `workers/scan-page.worker.ts` — Processes single-page scan jobs

**Job flow (Phase 1 — single page):**

1. `POST /scans` creates `Scan` + `ScanPage` records, enqueues BullMQ job
2. Worker picks up job, runs Playwright + axe-core
3. Writes `ScanIssue` records, updates `ScanPage` and `Scan` status
4. Updates `WidgetConfig.lastScanViolations`, `lastScanAt`, `lastComplianceScore`

### 1.5 New Fastify Routes

**`apps/api/src/routes/scan.ts`:**

- `POST /scans` — Create scan (auth via internal token, body: siteId, url, wcagLevel)
- `GET /scans/:scanId` — Get scan status + results
- `GET /sites/:siteId/scans` — List scans (paginated, sorted by date)
- `GET /sites/:siteId/scans/latest` — Latest completed scan

**Auth pattern:** Next.js API routes validate session, then call Fastify with `Authorization: Bearer INTERNAL_API_SECRET`. Add a simple `internalAuth` preHandler plugin.

### 1.6 Next.js Proxy Routes

Update `apps/manage/src/app/api/sites/[id]/scan/route.ts` to:

1. Validate user session (existing pattern)
2. Check site ownership
3. Enforce rate limits and plan limits
4. Forward to Fastify `POST /scans`
5. Return scan ID for polling

### 1.7 Dockerfile Update

Switch `apps/api/Dockerfile` from `node:20-alpine` to Playwright-compatible image:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.49.0-noble AS builder
# ... rest of build
FROM mcr.microsoft.com/playwright:v1.49.0-noble AS runner
# ... only install chromium deps, not full browsers
```

### 1.8 Update Dashboard UI

Update `apps/manage/src/app/dashboard/sites/[id]/scan/`:

- Show scan progress (polling `/scans/:id` for status)
- Display rich results: violations grouped by impact, with selectors + HTML snippets
- Show compliance score (0-100%)
- Keep backward compat with existing scan results display

---

## Phase 2: Site Crawling + Scheduling with Crawlee (Week 3-4)

> **Revised:** Replaced DIY crawler with Crawlee (`PlaywrightCrawler`) as inner crawl engine inside BullMQ workers. Crawlee provides battle-tested URL discovery, auto-dedup, memory-aware autoscaling, browser crash recovery, and sitemap parsing — all in TypeScript. See `/docs/plans/phase-2-crawlee-revision.md` for full details.

### 2.1 Crawlee-Based Site Crawler

**New file: `packages/scanner/src/site-crawler.ts`**

- `crawlSite(options)` — single exported function, uses Crawlee `PlaywrightCrawler` internally
- Sitemap seeding: fetch `{origin}/sitemap.xml`, parse with Crawlee's `Sitemap.load()`, fallback to `startUrl`
- `enqueueLinks({ strategy: 'SameHostname' })` — auto URL discovery + dedup
- `maxRequestsPerCrawl: maxPages` — enforces plan limits
- `AutoscaledPool` manages concurrency based on CPU/RAM (default max 3)
- `preNavigationHooks`: SSRF check via `assertSafeResolvedUrl()` before every navigation
- Per-page: `@axe-core/playwright.analyze()` in `requestHandler`, results via callback
- `failedRequestHandler`: records failed pages in DB
- In-memory `RequestQueue` only — no Crawlee persistent storage (BullMQ handles job persistence)
- **New deps:** `crawlee`, `@crawlee/playwright` in `packages/scanner`

### 2.2 Multi-Page Orchestration

**Architecture:** BullMQ = outer job queue (user-facing status). Crawlee = inner engine (URL discovery, browser pool, page processing).

- **New queue:** `scan-site` in `apps/api/src/plugins/bull.ts`
- **New worker:** `apps/api/src/workers/scan-site.worker.ts`
  - Concurrency: 1 (Crawlee manages its own internal concurrency)
  - Calls `crawlSite()` with `onPageScanned` callback (writes ScanPage + ScanIssue to DB)
  - `onProgress` callback updates Scan.totalPages for real-time UI polling
  - After crawl completes: runs `aggregateResults()`, updates Scan/WidgetConfig/ComplianceSnapshot
- **Existing workers unchanged:** `scan-page.worker.ts` + `scan-report.worker.ts` still handle single-page scans (backward compatible)

**Extract shared logic:** `mapAxeViolations()` helper extracted from `page-scanner.ts`, used by both single-page and site-crawler flows.

### 2.3 Route Updates

**`POST /scans`** — new optional `type` field: `"page"` (default, existing flow) or `"site"` (new crawl flow)

- `type="site"`: creates Scan (status=crawling), enqueues on `scan-site` queue with `maxPages` from plan
- `GET /scans/:scanId` — adds `progress` field (pagesScanned/pagesQueued) for crawl UI

**Next.js proxy** — passes `type` + `maxPages` from frontend to Fastify

### 2.4 Plan-Based Limits

Already implemented in Phase 1 (`packages/types/src/billing.ts`):

```typescript
maxPagesPerScan: number; // free:5, small:25, medium:100, large:500
scanFrequency: string; // free:"monthly", small:"weekly", medium:"weekly", large:"daily"
scanHistoryDays: number; // free:30, small:90, medium:180, large:365
pdfReports: boolean; // free:false, others:true
aiFixSuggestions: boolean; // free/small:false, medium/large:true
```

### 2.5 Scheduled Scanning

- **New routes:** `apps/api/src/routes/scan-schedule.ts` — GET/PUT/DELETE `/sites/:siteId/schedule`
- **Cron route:** `apps/manage/src/app/api/cron/scan-scheduler/route.ts` — CRON_SECRET protected, queries due schedules, triggers site scans
- **UI:** frequency dropdown (filtered by plan), enable/disable toggle, next scan date

### 2.6 Dashboard UI Updates

- **scanner-client.tsx:** scan type toggle (Single Page / Full Site), crawl progress display
- **scan-results.tsx:** violations grouped by page URL, page-level scores, "X pages scanned" summary
- **scan-history.tsx:** page count + scan type badge in history list

---

## Phase 3: Reporting + Issue Management (Week 5-6)

### 3.1 Issue Diffing

**New file: `packages/scanner/src/differ.ts`**

- Compare current scan vs previous scan by fingerprint: `(ruleId, selector, url)`
- Detect: new issues, recurring issues, fixed issues
- Carry over `ignored`/`false_positive` status from previous scan
- Update `ScanIssue.fixedAt` for resolved issues

### 3.2 Issue Management API + UI

**New routes: `apps/api/src/routes/issues.ts`**

- `GET /sites/:siteId/issues` — Filter by status, impact, wcag, page (paginated)
- `PATCH /issues/:issueId` — Update status (ignore, false_positive)
- `GET /sites/:siteId/issues/summary` — Counts by category, impact, status

**UI:** Issue list with filters, bulk actions, status toggles

### 3.3 Compliance Trends

- `ComplianceSnapshot` stores daily scores
- `GET /sites/:siteId/compliance/history` returns time-series data
- Frontend: line chart using a lightweight library (recharts or chart.js)
- Dashboard executive summary card with score, trend arrow, key metrics

### 3.4 PDF Reports

Use **`@react-pdf/renderer`** for structured data reports:

- Cover page (site name, scan date, score)
- Executive summary (score, trend, top issues)
- WCAG compliance by principle (Perceivable, Operable, Understandable, Robust)
- EAA/ADA compliance indicators
- Issue details grouped by severity
- Per-page scores table

**Route:** `GET /sites/:siteId/reports/pdf`

### 3.5 Enhanced Badge

Update `apps/api/src/routes/badge.ts`:

- Show compliance score percentage (not just violation count)
- Color: green (90+), yellow (70-89), orange (50-69), red (<50)
- Include WCAG level indicator

### 3.6 Email Notifications

- New email templates: `scanCompletedTemplate`, `scoreDroppedTemplate`
- Trigger on scan completion if score dropped >10 points or new critical issues found

---

## Decisions Made

- **Start with Phase 1** (Foundation): axe-core engine, BullMQ, single-page deep scan
- **Redis:** Railway Redis addon (managed, same network as API, ~$5/mo)
- **Worker deployment:** Same Railway service as Fastify API (split later when needed)

---

## Phase 4: Competitive Differentiators (Week 7-8)

### 4.1 AI Fix Suggestions

- On scan completion, for each critical/serious issue, call Claude API with issue context + HTML snippet
- Store suggestion in `ScanIssue.fixSuggestion`
- Medium/Large plans only
- Display in issue detail view with code diff preview

### 4.2 EAA/ADA Compliance Indicators

- Map WCAG 2.1 AA criteria to EN 301 549 (EAA) requirements
- Map WCAG 2.0/2.1 AA to ADA (DOJ rule) requirements
- Show compliance status per regulation in executive summary

### 4.3 Deploy Webhook Scanning

- Endpoint: `POST /webhooks/scan-trigger` accepts GitHub/Vercel deploy hooks
- Auto-triggers scan on deployment (with debounce)
- Large plan feature

### 4.4 Color Contrast Analyzer

- axe-core already checks contrast (rule: `color-contrast`)
- Enhance with suggested color alternatives that meet WCAG AA ratio (4.5:1)

---

## Critical Files to Modify

| File                                               | Change                                                                 |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `packages/db/prisma/schema.prisma`                 | Add Scan, ScanPage, ScanIssue, ComplianceSnapshot, ScanSchedule models |
| `packages/types/src/billing.ts`                    | Extend PlanLimits with scan limits                                     |
| `apps/api/src/server.ts`                           | Register new route plugins, initialize Redis + BullMQ                  |
| `apps/api/Dockerfile`                              | Switch to Playwright-compatible base image                             |
| `docker-compose.yml`                               | Add Redis service                                                      |
| `apps/manage/src/lib/scanner.ts`                   | Deprecate; extract SSRF logic to packages/scanner                      |
| `apps/manage/src/app/api/sites/[id]/scan/route.ts` | Proxy to Fastify API                                                   |
| `apps/manage/src/app/dashboard/sites/[id]/scan/`   | New scan UI components                                                 |

## New Files to Create

| File                                         | Purpose                                            |
| -------------------------------------------- | -------------------------------------------------- |
| `packages/scanner/`                          | New package: axe-core + Playwright scanning engine |
| `apps/api/src/plugins/redis.ts`              | Redis connection plugin                            |
| `apps/api/src/plugins/bull.ts`               | BullMQ queue setup                                 |
| `apps/api/src/routes/scan.ts`                | Scan CRUD endpoints                                |
| `apps/api/src/routes/issues.ts`              | Issue management endpoints                         |
| `apps/api/src/routes/reports.ts`             | Reporting + PDF endpoints                          |
| `apps/api/src/routes/scan-schedule.ts`       | Schedule management                                |
| `apps/api/src/workers/scan-crawl.worker.ts`  | Crawl discovery worker                             |
| `apps/api/src/workers/scan-page.worker.ts`   | Page scanning worker                               |
| `apps/api/src/workers/scan-report.worker.ts` | Aggregation worker                                 |

## Key Dependencies to Add

| Package                | Where            | Purpose               |
| ---------------------- | ---------------- | --------------------- |
| `playwright`           | packages/scanner | Headless browser      |
| `@axe-core/playwright` | packages/scanner | 80+ WCAG rules        |
| `bullmq`               | apps/api         | Job queue             |
| `ioredis`              | apps/api         | Redis client          |
| `@react-pdf/renderer`  | apps/api         | PDF reports (Phase 3) |

## Verification Plan

1. **Unit tests:** Scanner package — test axe-core integration against known HTML fixtures
2. **Integration tests:** BullMQ job flow — enqueue scan, verify DB records created
3. **E2E test:** Trigger scan from dashboard UI, verify results display
4. **Performance:** Scan a 25-page site in <5 minutes
5. **SSRF:** Verify private IP blocking still works with Playwright
6. **Plan limits:** Verify free plan capped at 5 pages, paid plans at their limits
