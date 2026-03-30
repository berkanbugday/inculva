"use client";

import { useState } from "react";
import type { DashboardMessages } from "@/i18n/messages";
import type { ScanPageData } from "./scan-results";

function statusBadge(status: string) {
  if (status === "completed")
    return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400";
  if (status === "failed")
    return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400";
  return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
}

function scoreColor(score: number | null | undefined) {
  if (score == null) return "text-gray-400 dark:text-gray-600";
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-blue-600 dark:text-blue-400";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function statusLabel(status: string, t: DashboardMessages) {
  if (status === "completed") return t.scanner.pageCompleted;
  if (status === "failed") return t.scanner.pageFailed;
  if (status === "pending") return t.scanner.statusPending;
  if (status === "scanning") return t.scanner.statusScanning;
  return status;
}

interface Props {
  pages: ScanPageData[];
  t: DashboardMessages;
}

const COLLAPSED_COUNT = 5;

export function ReportPages({ pages, t }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (pages.length <= 1) return null;

  const displayPages = expanded ? pages : pages.slice(0, COLLAPSED_COUNT);
  const completedCount = pages.filter((p) => p.status === "completed").length;
  const failedCount = pages.filter((p) => p.status === "failed").length;

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t.scanner.scannedPages}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {t.scanner.pagesScanned.replace("{count}", String(pages.length))}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {t.scanner.scannedPagesDesc}
      </p>

      {/* Summary badges */}
      <div className="flex gap-2 mb-4">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
          {completedCount} {t.scanner.pageCompleted}
        </span>
        {failedCount > 0 && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400">
            {failedCount} {t.scanner.pageFailed}
          </span>
        )}
      </div>

      {/* Pages list */}
      <div className="space-y-1.5">
        {displayPages.map((page) => (
          <div
            key={page.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span
              className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBadge(
                page.status,
              )}`}
            >
              {statusLabel(page.status, t)}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm text-gray-700 dark:text-gray-300 truncate"
                title={page.url}
              >
                {page.url.replace(/^https?:\/\//, "")}
              </p>
            </div>
            {page.violations != null && page.violations > 0 && (
              <span className="text-xs text-red-600 dark:text-red-400 tabular-nums">
                {page.violations} {t.scanner.violations}
              </span>
            )}
            {page.score != null && (
              <span
                className={`text-sm font-bold tabular-nums ${scoreColor(
                  page.score,
                )}`}
              >
                {Math.round(page.score)}
              </span>
            )}
          </div>
        ))}
      </div>

      {pages.length > COLLAPSED_COUNT && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {expanded
            ? t.scanner.showFewerPages
            : t.scanner.showAllPages.replace("{count}", String(pages.length))}
        </button>
      )}
    </div>
  );
}
