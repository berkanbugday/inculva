"use client";

import type { DashboardMessages } from "@/i18n/messages";
import type { ScanIssueData, PassedRuleData } from "./scan-results";

type Category = "perceivable" | "operable" | "understandable" | "robust";

const CATEGORIES: Category[] = [
  "perceivable",
  "operable",
  "understandable",
  "robust",
];

function getCategoryMeta(cat: Category, t: DashboardMessages) {
  const meta: Record<Category, { label: string; desc: string; icon: string }> =
    {
      perceivable: {
        label: t.scanner.perceivable,
        desc: t.scanner.perceivableDesc,
        icon: "1",
      },
      operable: {
        label: t.scanner.operable,
        desc: t.scanner.operableDesc,
        icon: "2",
      },
      understandable: {
        label: t.scanner.understandable,
        desc: t.scanner.understandableDesc,
        icon: "3",
      },
      robust: {
        label: t.scanner.robust,
        desc: t.scanner.robustDesc,
        icon: "4",
      },
    };
  return meta[cat];
}

interface Props {
  issues: ScanIssueData[];
  passedRules: PassedRuleData[];
  t: DashboardMessages;
}

export function ReportPrinciples({ issues, passedRules, t }: Props) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {t.scanner.wcagPrinciples}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const meta = getCategoryMeta(cat, t);
          const passed = passedRules.filter((r) => r.category === cat);
          const failed = [
            ...new Set(
              issues.filter((i) => i.category === cat).map((i) => i.ruleId),
            ),
          ];
          const total = passed.length + failed.length;
          const rawPct =
            total > 0 ? Math.round((passed.length / total) * 100) : 100;
          const pct = failed.length > 0 && rawPct === 100 ? 99 : rawPct;
          const barColor =
            pct === 100
              ? "bg-green-500"
              : pct >= 80
              ? "bg-blue-500"
              : pct >= 50
              ? "bg-amber-500"
              : "bg-red-500";

          return (
            <div
              key={cat}
              className="rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center justify-center text-gray-600 dark:text-gray-400">
                  {meta.icon}
                </span>
                <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {meta.label}
                </span>
                <span
                  className={`ml-auto text-sm font-bold tabular-nums ${
                    pct === 100
                      ? "text-green-600 dark:text-green-400"
                      : pct >= 80
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {pct}%
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                {meta.desc}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mb-1.5">
                <div
                  className={`${barColor} h-1.5 rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>
                  {passed.length} {t.scanner.passed}
                </span>
                {failed.length > 0 && (
                  <a
                    href="#violations-section"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("violations-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-red-500 dark:text-red-400 hover:underline cursor-pointer"
                  >
                    {failed.length} {t.scanner.failedStatus}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
