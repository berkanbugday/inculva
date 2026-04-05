export { scanPage, getBrowser, closeBrowser, mapAxeViolations, mapAxePasses, mapAxeIncomplete, wcagLevelToTags, type ScanPageOptions } from "./page-scanner.js";
export { runAxeInPage, type ScanContentLocale } from "./axe-run.js";
export { crawlSite, type CrawlSiteOptions, type CrawlPageResult } from "./site-crawler.js";
export { aggregateResults } from "./aggregator.js";
export { assertSafeHostname, assertSafeUrl, assertSafeResolvedUrl } from "./ssrf.js";
export {
  type ImpactLevel,
  type WcagLevel,
  type IssueCategory,
  type IssueStatus,
  type ScanIssueResult,
  type PassedRuleResult,
  type IncompleteRuleResult,
  type PageScanResult,
  type AggregatedResult,
  IMPACT_WEIGHTS,
  wcagCriterionToCategory,
  extractWcagCriterion,
} from "./types.js";
export {
  AXE_RULE_KB_SLUG,
  wcagKbArticleUrl,
  type KbLocale,
} from "@inculva/wcag-kb";
