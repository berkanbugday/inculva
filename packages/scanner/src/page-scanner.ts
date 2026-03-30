import { chromium, type Browser, type Page, type Route } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";
import { assertSafeResolvedUrl, assertSafeHostname } from "./ssrf.js";
import {
  type PageScanResult,
  type ScanIssueResult,
  type PassedRuleResult,
  type IncompleteRuleResult,
  type WcagLevel,
  type ImpactLevel,
  extractWcagCriterion,
  wcagCriterionToCategory,
} from "./types.js";

const PAGE_TIMEOUT_MS = 60_000;
const MAX_HTML_SNIPPET = 200;
const POST_LOAD_WAIT_MS = 2_000;

/** Shared browser instance — call closeBrowser() when shutting down */
let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }
  return browser;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

/**
 * Block navigation to private IPs at the network level.
 * Only intercepts HTTP/HTTPS requests — allows data:, blob:, etc. through.
 */
async function blockPrivateNetworks(page: Page): Promise<void> {
  await page.route("**/*", (route: Route) => {
    const reqUrl = route.request().url();

    // Only check HTTP/HTTPS requests — let data:, blob:, chrome: etc. pass through
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
}

/** WCAG level tags that axe-core uses to categorize rules */
export function wcagLevelToTags(level: WcagLevel): string[] {
  switch (level) {
    case "A":
      return ["wcag2a", "wcag21a", "wcag22a", "best-practice"];
    case "AA":
      return [
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
        "best-practice",
      ];
    case "AAA":
      return [
        "wcag2a",
        "wcag2aa",
        "wcag2aaa",
        "wcag21a",
        "wcag21aa",
        "wcag21aaa",
        "wcag22a",
        "wcag22aa",
        "wcag22aaa",
        "best-practice",
      ];
  }
}

/** Map raw axe-core violations to structured ScanIssueResult[] */
export function mapAxeViolations(
  violations: AxeResults["violations"],
): ScanIssueResult[] {
  const results: ScanIssueResult[] = [];

  for (const violation of violations) {
    const { criterion, level } = extractWcagCriterion(violation.tags);
    const category = wcagCriterionToCategory(criterion);
    const impact = (violation.impact ?? "moderate") as ImpactLevel;

    for (const node of violation.nodes) {
      results.push({
        ruleId: violation.id,
        description: violation.description,
        impact,
        wcag: criterion,
        wcagLevel: level,
        category,
        selector: node.target.map(String).join(", "),
        html: (node.html ?? "").slice(0, MAX_HTML_SNIPPET),
        helpUrl: violation.helpUrl,
      });
    }
  }

  return results;
}

/** Map raw axe-core passes to structured PassedRuleResult[] (one per rule, not per node) */
export function mapAxePasses(passes: AxeResults["passes"]): PassedRuleResult[] {
  const results: PassedRuleResult[] = [];

  for (const pass of passes) {
    const { criterion, level } = extractWcagCriterion(pass.tags);
    const category = wcagCriterionToCategory(criterion);

    results.push({
      ruleId: pass.id,
      description: pass.description,
      helpText: pass.help ?? pass.description,
      wcag: criterion,
      wcagLevel: level,
      category,
      helpUrl: pass.helpUrl,
      nodeCount: pass.nodes.length,
    });
  }

  return results;
}

/** Map raw axe-core incomplete results to structured IncompleteRuleResult[] */
export function mapAxeIncomplete(
  incomplete: AxeResults["incomplete"],
): IncompleteRuleResult[] {
  const results: IncompleteRuleResult[] = [];

  for (const item of incomplete) {
    const { criterion, level } = extractWcagCriterion(item.tags);
    const category = wcagCriterionToCategory(criterion);
    const impact = (item.impact ?? "moderate") as ImpactLevel;

    for (const node of item.nodes) {
      // Extract the check message explaining why axe couldn't determine pass/fail
      const message =
        node.any?.[0]?.message ??
        node.all?.[0]?.message ??
        item.help ??
        item.description;

      results.push({
        ruleId: item.id,
        description: item.description,
        impact,
        wcag: criterion,
        wcagLevel: level,
        category,
        selector: node.target.map(String).join(", "),
        html: (node.html ?? "").slice(0, MAX_HTML_SNIPPET),
        helpUrl: item.helpUrl,
        message,
      });
    }
  }

  return results;
}

export interface ScanPageOptions {
  url: string;
  wcagLevel?: WcagLevel;
}

export async function scanPage(
  options: ScanPageOptions,
): Promise<PageScanResult> {
  const { url, wcagLevel = "AA" } = options;
  const startedAt = new Date().toISOString();

  // SSRF check: validate hostname AND resolved IP (prevents DNS rebinding)
  await assertSafeResolvedUrl(url);

  const instance = await getBrowser();
  const context = await instance.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 inculva-Scanner/2.0",
    viewport: { width: 1280, height: 720 },
    javaScriptEnabled: true,
  });

  const page = await context.newPage();

  try {
    await blockPrivateNetworks(page);

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: PAGE_TIMEOUT_MS,
    });

    // Wait for JS frameworks to finish rendering (React, Vue, etc.)
    await page.waitForTimeout(POST_LOAD_WAIT_MS);

    // Run ALL axe-core rules (default excludes experimental).
    // We categorize results by their tags on output rather than limiting input.
    const results = await new AxeBuilder({ page }).analyze();

    const violations = mapAxeViolations(results.violations);
    const passedRules = mapAxePasses(results.passes);
    const incompleteRules = mapAxeIncomplete(results.incomplete);

    const completedAt = new Date().toISOString();

    return {
      url,
      violations,
      passedRules,
      incompleteRules,
      passes: results.passes.length,
      startedAt,
      completedAt,
    };
  } finally {
    await context.close();
  }
}
