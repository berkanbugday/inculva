"use client";

import type { DashboardMessages } from "@/i18n/messages";
import { useLocale } from "@/i18n/useMessages";
import type { ScanData } from "./scan-results";

function scoreLabel(score: number, t: DashboardMessages) {
  if (score >= 95)
    return {
      text: t.scanner.excellent,
      color: "text-green-600 dark:text-green-400",
      ring: "ring-green-500",
    };
  if (score >= 80)
    return {
      text: t.scanner.good,
      color: "text-blue-600 dark:text-blue-400",
      ring: "ring-blue-500",
    };
  if (score >= 60)
    return {
      text: t.scanner.fair,
      color: "text-amber-600 dark:text-amber-400",
      ring: "ring-amber-500",
    };
  return {
    text: t.scanner.needsWork,
    color: "text-red-600 dark:text-red-400",
    ring: "ring-red-500",
  };
}

interface Props {
  scan: ScanData;
  t: DashboardMessages;
}

export function ReportHeader({ scan, t }: Props) {
  const locale = useLocale();
  const score = scan.complianceScore ?? 0;
  const { text: scoreText, color: scoreColor } = scoreLabel(score, t);
  const passedRules = scan.passedRules ?? [];
  const issues = scan.issues ?? [];
  const incompleteRules = scan.incompleteRules ?? [];
  const totalRules =
    passedRules.length +
    new Set(issues.map((i) => i.ruleId)).size +
    new Set(incompleteRules.map((i) => i.ruleId)).size;
  const totalElements =
    passedRules.reduce((sum, r) => sum + (r.nodeCount ?? 0), 0) +
    issues.length +
    incompleteRules.length;

  const duration =
    scan.startedAt && scan.completedAt
      ? Math.round(
          (new Date(scan.completedAt).getTime() -
            new Date(scan.startedAt).getTime()) /
            1000,
        )
      : null;

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t.scanner.reportTitle}
          </h2>
          {scan.completedAt && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {new Date(scan.completedAt).toLocaleString(locale)}
            </p>
          )}
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          WCAG {scan.wcagLevel ?? "AA"}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
            {Math.round(score)}
          </div>
          <div className={`text-sm font-semibold mt-1 ${scoreColor}`}>
            {scoreText}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="rounded-xl bg-gray-50 dark:bg-[#0e0e10] px-3 py-2.5">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              {totalRules}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {t.scanner.rulesEvaluated}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#0e0e10] px-3 py-2.5">
            <div className="text-lg font-bold text-green-600 dark:text-green-400 tabular-nums">
              {passedRules.length}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {t.scanner.checksPassed}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#0e0e10] px-3 py-2.5">
            <div className="text-lg font-bold text-red-600 dark:text-red-400 tabular-nums">
              {scan.totalViolations ?? 0}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {t.scanner.violations}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#0e0e10] px-3 py-2.5">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {incompleteRules.length}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {t.scanner.needsReview}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#0e0e10] px-3 py-2.5">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              {totalElements}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {t.scanner.elementsChecked.replace("{count}", "")}
            </div>
          </div>
        </div>
      </div>
      {duration != null && (
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3">
          {t.scanner.scanDuration}: {duration}s
        </p>
      )}
    </div>
  );
}
