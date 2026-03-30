import {
  type AggregatedResult,
  type ImpactLevel,
  type IssueCategory,
  type PageScanResult,
  IMPACT_WEIGHTS,
} from "./types.js";

/**
 * Aggregate scan results across one or more pages into a single score.
 *
 * Compliance score formula:
 *   score = max(0, 100 - weightedPenalty)
 *
 * Violations are penalized at full weight (critical=4, serious=3, moderate=2, minor=1).
 * Incomplete items (needs review) are penalized at half weight — axe-core couldn't
 * determine pass/fail, so they likely have issues.
 *
 * Penalty is scaled relative to total checks so a site with more elements
 * isn't unfairly penalized.
 */
export function aggregateResults(pages: PageScanResult[]): AggregatedResult {
  const impactCounts: Record<ImpactLevel, number> = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };

  const categoryCounts: Record<IssueCategory, number> = {
    perceivable: 0,
    operable: 0,
    understandable: 0,
    robust: 0,
  };

  let totalViolations = 0;
  let totalPasses = 0;
  let totalIncomplete = 0;

  for (const page of pages) {
    totalPasses += page.passes;

    for (const v of page.violations) {
      totalViolations++;
      impactCounts[v.impact]++;
      categoryCounts[v.category]++;
    }

    totalIncomplete += page.incompleteRules.length;
  }

  // Compute weighted penalty for violations (full weight)
  let violationPenalty = 0;
  for (const [impact, count] of Object.entries(impactCounts)) {
    violationPenalty += count * IMPACT_WEIGHTS[impact as ImpactLevel]!;
  }

  // Incomplete items penalized at half weight (moderate severity assumed)
  const incompletePenalty = totalIncomplete * (IMPACT_WEIGHTS.moderate * 0.5);

  const totalPenalty = violationPenalty + incompletePenalty;

  // Scale penalty relative to total checks to normalize across different page sizes
  const totalChecks = totalViolations + totalPasses + totalIncomplete;
  let complianceScore: number;

  if (totalChecks === 0) {
    complianceScore = 100;
  } else {
    const maxPenalty = totalChecks * IMPACT_WEIGHTS.critical;
    const normalizedPenalty = (totalPenalty / maxPenalty) * 100;
    complianceScore = Math.max(0, Math.round((100 - normalizedPenalty) * 10) / 10);
  }

  return {
    totalViolations,
    totalPasses,
    totalIncomplete,
    complianceScore,
    categoryCounts,
    impactCounts,
  };
}
