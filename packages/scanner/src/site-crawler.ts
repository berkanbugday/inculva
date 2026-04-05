import {
  PlaywrightCrawler,
  type PlaywrightCrawlingContext,
  Configuration,
} from "crawlee";
import { runAxeInPage, type ScanContentLocale } from "./axe-run.js";
import { assertSafeResolvedUrl, assertSafeHostname } from "./ssrf.js";
import {
  mapAxeViolations,
  mapAxePasses,
  mapAxeIncomplete,
} from "./page-scanner.js";
import type {
  WcagLevel,
  ScanIssueResult,
  PassedRuleResult,
  IncompleteRuleResult,
} from "./types.js";

const POST_LOAD_WAIT_MS = 2_000;

const NON_HTML_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".css",
  ".js",
  ".mjs",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".zip",
  ".tar",
  ".gz",
  ".mp3",
  ".mp4",
  ".avi",
  ".mov",
  ".webm",
  ".xml",
  ".json",
  ".rss",
  ".atom",
]);

export interface CrawlPageResult {
  url: string;
  violations: ScanIssueResult[];
  passedRules: PassedRuleResult[];
  incompleteRules: IncompleteRuleResult[];
  passes: number;
  startedAt: string;
  completedAt: string;
  error?: string;
}

export interface CrawlSiteOptions {
  startUrl: string;
  wcagLevel: WcagLevel;
  maxPages: number;
  scanId: string;
  siteId: string;
  contentLocale?: ScanContentLocale;
  onPageScanned: (result: CrawlPageResult) => Promise<void>;
  onProgress?: (scanned: number, queued: number) => void;
}

function isHtmlUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    const ext = pathname.slice(pathname.lastIndexOf(".")).toLowerCase();
    return !NON_HTML_EXTENSIONS.has(ext);
  } catch {
    return true;
  }
}

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

async function trySitemapUrls(startUrl: string): Promise<string[]> {
  const origin = new URL(startUrl).origin;
  const sitemapUrl = `${origin}/sitemap.xml`;

  try {
    const response = await fetch(sitemapUrl, {
      headers: { "User-Agent": "inculva-Scanner/2.0" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const urls: string[] = [];

    const locRegex = /<loc>\s*(.*?)\s*<\/loc>/gi;
    let match: RegExpExecArray | null;
    while ((match = locRegex.exec(xml)) !== null) {
      const loc = match[1]!;
      if (loc.endsWith(".xml") || loc.includes("sitemap")) {
        try {
          const subResponse = await fetch(loc, {
            headers: { "User-Agent": "inculva-Scanner/2.0" },
            signal: AbortSignal.timeout(10_000),
          });
          if (subResponse.ok) {
            const subXml = await subResponse.text();
            let subMatch: RegExpExecArray | null;
            const subLocRegex = /<loc>\s*(.*?)\s*<\/loc>/gi;
            while ((subMatch = subLocRegex.exec(subXml)) !== null) {
              urls.push(subMatch[1]!);
            }
          }
        } catch {
          urls.push(loc);
        }
      } else {
        urls.push(loc);
      }
    }

    return urls;
  } catch {
    return [];
  }
}

export async function crawlSite(options: CrawlSiteOptions): Promise<void> {
  const {
    startUrl,
    wcagLevel,
    maxPages,
    contentLocale,
    onPageScanned,
    onProgress,
  } = options;

  let pagesScanned = 0;

  const sitemapUrls = await trySitemapUrls(startUrl);
  const seedUrls = [startUrl, ...sitemapUrls.map(normalizeUrl)];
  const uniqueSeeds = [...new Set(seedUrls)].slice(0, maxPages);

  const config = new Configuration({ persistStorage: false });

  const crawler = new PlaywrightCrawler(
    {
      maxRequestsPerCrawl: maxPages,
      maxConcurrency: 3,
      requestHandlerTimeoutSecs: 90,
      maxRequestRetries: 2,
      launchContext: {
        launchOptions: {
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
        },
      },
      browserPoolOptions: {
        maxOpenPagesPerBrowser: 3,
        retireBrowserAfterPageCount: 20,
      },

      preNavigationHooks: [
        async (_context, goToOptions) => {
          try {
            await assertSafeResolvedUrl(_context.request.url);
          } catch {
            _context.request.noRetry = true;
            throw new Error(`SSRF blocked: ${_context.request.url}`);
          }
          if (goToOptions) {
            goToOptions.waitUntil = "networkidle";
            goToOptions.timeout = 60_000;
          }
        },
      ],

      async requestHandler(context: PlaywrightCrawlingContext) {
        const { page, request, enqueueLinks } = context;
        const startedAt = new Date().toISOString();

        await page.route("**/*", (route) => {
          const reqUrl = route.request().url();
          if (!reqUrl.startsWith("http://") && !reqUrl.startsWith("https://")) {
            return route.continue();
          }
          try {
            const parsed = new URL(reqUrl);
            assertSafeHostname(parsed.hostname);
            return route.continue();
          } catch {
            return route.abort("blockedbyclient");
          }
        });

        await page.waitForTimeout(POST_LOAD_WAIT_MS);

        const results = await runAxeInPage(
          page,
          contentLocale !== undefined ? { contentLocale } : {},
        );

        const violations = mapAxeViolations(results.violations);
        const passedRules = mapAxePasses(results.passes);
        const incompleteRules = mapAxeIncomplete(results.incomplete);
        const completedAt = new Date().toISOString();

        pagesScanned++;

        await onPageScanned({
          url: request.url,
          violations,
          passedRules,
          incompleteRules,
          passes: results.passes.length,
          startedAt,
          completedAt,
        });

        onProgress?.(pagesScanned, 0);

        await enqueueLinks({
          strategy: "same-hostname",
          transformRequestFunction: (req) => {
            const normalized = normalizeUrl(req.url);
            if (!isHtmlUrl(normalized)) return false;
            req.url = normalized;
            return req;
          },
        });
      },

      async failedRequestHandler({ request }, error) {
        pagesScanned++;

        await onPageScanned({
          url: request.url,
          violations: [],
          passedRules: [],
          incompleteRules: [],
          passes: 0,
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        });

        onProgress?.(pagesScanned, 0);
      },
    },
    config,
  );

  await crawler.run(uniqueSeeds);
}
