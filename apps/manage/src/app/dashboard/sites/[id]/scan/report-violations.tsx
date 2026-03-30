"use client";

import { useState } from "react";
import type { DashboardMessages } from "@/i18n/messages";
import type { ScanIssueData } from "./scan-results";

type ImpactLevel = "critical" | "serious" | "moderate" | "minor";

function getImpactStyle(impact: string, t: DashboardMessages) {
  const styles: Record<
    string,
    { badge: string; border: string; label: string }
  > = {
    critical: {
      badge: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-900",
      label: t.scanner.critical,
    },
    serious: {
      badge:
        "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-900",
      label: t.scanner.serious,
    },
    moderate: {
      badge:
        "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
      border: "border-yellow-200 dark:border-yellow-900",
      label: t.scanner.moderate,
    },
    minor: {
      badge: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-900",
      label: t.scanner.minor,
    },
  };
  return styles[impact] ?? styles["moderate"]!;
}

interface GroupedRule {
  ruleId: string;
  description: string;
  impact: string;
  wcag: string;
  wcagLevel: string;
  helpUrl?: string | null | undefined;
  issues: ScanIssueData[];
}

function groupByRule(issues: ScanIssueData[]): GroupedRule[] {
  const map = new Map<string, GroupedRule>();
  for (const issue of issues) {
    const existing = map.get(issue.ruleId);
    if (existing) {
      existing.issues.push(issue);
    } else {
      map.set(issue.ruleId, {
        ruleId: issue.ruleId,
        description: issue.description,
        impact: issue.impact,
        wcag: issue.wcag,
        wcagLevel: issue.wcagLevel,
        helpUrl: issue.helpUrl,
        issues: [issue],
      });
    }
  }
  return Array.from(map.values());
}

function IssueInstance({
  issue,
  index,
  t,
}: {
  issue: ScanIssueData;
  index: number;
  t: DashboardMessages;
}) {
  return (
    <div className="rounded-lg border border-[#e8eaf0] dark:border-[#2a2a3e] bg-gray-50 dark:bg-[#141425] p-3 space-y-2">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        #{index + 1}
      </p>
      {issue.selector && (
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {t.scanner.cssSelector}
          </p>
          <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap break-all">
            {issue.selector}
          </code>
        </div>
      )}
      {issue.html && (
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {t.scanner.affectedElements}
          </p>
          <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap break-all">
            {issue.html}
          </code>
        </div>
      )}
    </div>
  );
}

function RuleGroupCard({
  group,
  t,
}: {
  group: GroupedRule;
  t: DashboardMessages;
}) {
  const [open, setOpen] = useState(false);
  const style = getImpactStyle(group.impact, t);

  return (
    <div
      className={`rounded-2xl border ${style.border} bg-white dark:bg-[#1a1a2e] overflow-hidden`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <span
          className={`shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
        >
          {style.label}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {group.ruleId}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {group.wcag === "best-practice"
                ? t.scanner.bestPractice
                : group.wcag === "unknown"
                ? ""
                : `WCAG ${group.wcag} ${group.wcagLevel}`}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
              {group.issues.length} {t.scanner.instances}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
            {group.description}
          </p>
        </div>
        <svg
          className={`shrink-0 mt-1 w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 pb-4 pt-3 space-y-3">
          {group.helpUrl && group.wcag !== "unknown" && (
            <a
              href={group.helpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {group.wcag === "best-practice"
                ? t.scanner.learnMore
                : t.scanner.wcagDocument.replace("{wcag}", group.wcag)}
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          <div className="space-y-2">
            {group.issues.map((issue, i) => (
              <IssueInstance key={issue.id} issue={issue} index={i} t={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  issues: ScanIssueData[];
  t: DashboardMessages;
}

export function ReportViolations({ issues, t }: Props) {
  const sorted = [...issues].sort((a, b) => {
    const order: ImpactLevel[] = ["critical", "serious", "moderate", "minor"];
    return (
      order.indexOf(a.impact as ImpactLevel) -
      order.indexOf(b.impact as ImpactLevel)
    );
  });

  const groups = groupByRule(sorted);

  const impactCounts = (
    ["critical", "serious", "moderate", "minor"] as const
  ).map((imp) => ({
    impact: imp,
    count: issues.filter((i) => i.impact === imp).length,
    style: getImpactStyle(imp, t),
  }));

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6 text-center">
        <svg
          className="w-8 h-8 text-green-500 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-semibold text-green-800 dark:text-green-300">
          {t.scanner.noViolations}
        </p>
      </div>
    );
  }

  return (
    <div id="violations-section" className="space-y-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {t.scanner.breakdownBySeverity}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {impactCounts.map(({ impact, count, style }) => (
            <div
              key={impact}
              className={`rounded-lg border ${style.border} px-3 py-2 text-center`}
            >
              <div
                className={`text-2xl font-bold ${
                  count > 0
                    ? style.badge.split(" ").slice(2).join(" ")
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {count}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {style.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t.scanner.violationsSorted}
        </h4>
        {groups.map((group) => (
          <RuleGroupCard key={group.ruleId} group={group} t={t} />
        ))}
      </div>
    </div>
  );
}
