export type ImpactLevel = "critical" | "serious" | "moderate" | "minor";
export type WcagLevel = "A" | "AA" | "AAA";
export type IssueCategory =
  | "perceivable"
  | "operable"
  | "understandable"
  | "robust";
export type IssueStatus = "open" | "fixed" | "ignored" | "false_positive";

export interface ScanIssueResult {
  ruleId: string;
  description: string;
  impact: ImpactLevel;
  wcag: string;
  wcagLevel: WcagLevel;
  category: IssueCategory;
  selector: string;
  html: string;
  helpUrl: string;
}

export interface PassedRuleResult {
  ruleId: string;
  description: string;
  helpText: string;
  wcag: string;
  wcagLevel: WcagLevel;
  category: IssueCategory;
  helpUrl: string;
  nodeCount: number;
}

export interface IncompleteRuleResult {
  ruleId: string;
  description: string;
  impact: ImpactLevel;
  wcag: string;
  wcagLevel: WcagLevel;
  category: IssueCategory;
  selector: string;
  html: string;
  helpUrl: string;
  message: string; // Why axe-core couldn't determine pass/fail
}

export interface PageScanResult {
  url: string;
  violations: ScanIssueResult[];
  passedRules: PassedRuleResult[];
  incompleteRules: IncompleteRuleResult[];
  passes: number;
  startedAt: string;
  completedAt: string;
}

export interface AggregatedResult {
  totalViolations: number;
  totalPasses: number;
  totalIncomplete: number;
  complianceScore: number;
  categoryCounts: Record<IssueCategory, number>;
  impactCounts: Record<ImpactLevel, number>;
}

/** Severity weights for compliance score calculation */
export const IMPACT_WEIGHTS: Record<ImpactLevel, number> = {
  critical: 4,
  serious: 3,
  moderate: 2,
  minor: 1,
};

/**
 * Maps axe-core WCAG tags to the WCAG principle category.
 * The WCAG criterion number determines the principle:
 * - 1.x.x = Perceivable
 * - 2.x.x = Operable
 * - 3.x.x = Understandable
 * - 4.x.x = Robust
 */
export function wcagCriterionToCategory(wcag: string): IssueCategory {
  const principle = wcag.charAt(0);
  switch (principle) {
    case "1":
      return "perceivable";
    case "2":
      return "operable";
    case "3":
      return "understandable";
    case "4":
      return "robust";
    default:
      return "robust";
  }
}

/**
 * Extract the first WCAG criterion (e.g. "1.1.1") from axe-core tags.
 * axe-core provides tags like ["wcag2a", "wcag111"] — the numeric one maps to criterion.
 */
export function extractWcagCriterion(tags: string[]): {
  criterion: string;
  level: WcagLevel;
} {
  let level: WcagLevel = "A";

  for (const tag of tags) {
    if (tag === "wcag2aaa" || tag === "wcag21aaa" || tag === "wcag22aaa") {
      level = "AAA";
    } else if (tag === "wcag2aa" || tag === "wcag21aa" || tag === "wcag22aa") {
      level = "AA";
    } else if (tag === "wcag2a" || tag === "wcag21a" || tag === "wcag22a") {
      if (level === "A") level = "A";
    }
  }

  // Extract numeric criterion like "wcag111" -> "1.1.1"
  for (const tag of tags) {
    const match = /^wcag(\d)(\d)(\d+)$/.exec(tag);
    if (match) {
      return { criterion: `${match[1]}.${match[2]}.${match[3]}`, level };
    }
  }

  // If no specific criterion found, check for best-practice
  if (tags.includes("best-practice")) {
    return { criterion: "best-practice", level };
  }

  return { criterion: "unknown", level };
}
