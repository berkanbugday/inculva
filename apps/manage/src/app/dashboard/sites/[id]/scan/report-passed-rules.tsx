"use client";

import { useState } from "react";
import type { DashboardMessages } from "@/i18n/messages";
import type { PassedRuleData } from "./scan-results";

interface Props {
  passedRules: PassedRuleData[];
  t: DashboardMessages;
}

function getCategoryLabel(cat: string, t: DashboardMessages): string {
  switch (cat) {
    case "perceivable":
      return t.scanner.perceivableCategory;
    case "operable":
      return t.scanner.operableCategory;
    case "understandable":
      return t.scanner.understandableCategory;
    case "robust":
      return t.scanner.robustCategory;
    default:
      return cat;
  }
}

export function ReportPassedRules({ passedRules, t }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Deduplicate by ruleId (across pages), summing nodeCount
  const ruleMap = new Map<string, PassedRuleData & { totalNodes: number }>();
  for (const rule of passedRules) {
    const existing = ruleMap.get(rule.ruleId);
    if (existing) {
      existing.totalNodes += rule.nodeCount ?? 1;
    } else {
      ruleMap.set(rule.ruleId, { ...rule, totalNodes: rule.nodeCount ?? 1 });
    }
  }
  const uniqueRules = [...ruleMap.values()];

  // Group by category
  const grouped = new Map<
    string,
    (PassedRuleData & { totalNodes: number })[]
  >();
  for (const rule of uniqueRules) {
    const cat = rule.category ?? "robust";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(rule);
  }

  const totalElements = uniqueRules.reduce((s, r) => s + r.totalNodes, 0);

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t.scanner.passedChecks}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {t.scanner.rulesPassed.replace("{count}", String(uniqueRules.length))}{" "}
          ·{" "}
          {t.scanner.elementsChecked.replace("{count}", String(totalElements))}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {t.scanner.passedChecksDesc}
      </p>

      {!expanded ? (
        <div className="space-y-2 mb-3">
          {[...grouped.entries()].map(([cat, rules]) => (
            <div key={cat} className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-green-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {getCategoryLabel(cat, t)}
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                {rules.length} {t.scanner.rules}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-3">
          {[...grouped.entries()].map(([cat, rules]) => (
            <div key={cat}>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {getCategoryLabel(cat, t)}
              </h4>
              <div className="space-y-1">
                {rules.map((rule) => (
                  <div
                    key={rule.ruleId}
                    className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {rule.ruleId}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {rule.wcag === "best-practice"
                            ? t.scanner.bestPractice
                            : rule.wcag === "unknown"
                            ? ""
                            : `WCAG ${rule.wcag} ${rule.wcagLevel}`}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {rule.totalNodes} {t.scanner.elements}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {rule.description}
                      </p>
                    </div>
                    {rule.helpUrl && (
                      <a
                        href={rule.helpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                        title={t.scanner.wcagDocs}
                      >
                        <svg
                          className="w-3.5 h-3.5"
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        {expanded
          ? t.scanner.showSummary
          : t.scanner.showAllPassedRules.replace(
              "{count}",
              String(uniqueRules.length),
            )}
      </button>
    </div>
  );
}
