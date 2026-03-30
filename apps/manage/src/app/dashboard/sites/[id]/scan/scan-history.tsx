"use client";

import type { DashboardMessages } from "@/i18n/messages";
import { useLocale } from "@/i18n/useMessages";

export interface ScanHistoryItem {
  id: string;
  status: string;
  complianceScore?: number | null;
  totalViolations?: number | null;
  totalPages?: number | null;
  createdAt: string;
  completedAt?: string | null;
  _count?: { issues: number; pages: number };
}

function statusBadge(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400";
    case "failed":
      return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400";
    case "scanning":
    case "crawling":
      return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400";
    case "pending":
      return "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
  }
}

function scoreBadge(score: number | null | undefined) {
  if (score == null) return "text-gray-400 dark:text-gray-600";
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-blue-600 dark:text-blue-400";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

interface Props {
  scans: ScanHistoryItem[];
  onSelect: (scanId: string) => void;
  selectedId?: string | null | undefined;
  t: DashboardMessages;
  page: number;
  totalPages: number;
  totalScans: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

function statusLabel(status: string, t: DashboardMessages): string {
  switch (status) {
    case "completed":
      return t.scanner.statusCompleted;
    case "failed":
      return t.scanner.statusFailed;
    case "scanning":
      return t.scanner.statusScanning;
    case "crawling":
      return t.scanner.statusCrawling;
    case "pending":
      return t.scanner.statusPending;
    default:
      return status;
  }
}

export function ScanHistory({
  scans,
  onSelect,
  selectedId,
  t,
  page,
  totalPages,
  totalScans,
  loading,
  onPageChange,
}: Props) {
  const locale = useLocale();

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t.scanner.scanHistory}
        </h3>
        {totalScans > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {t.scanner.totalScans.replace("{count}", String(totalScans))}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : scans.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
          {t.scanner.noScanHistory}
        </p>
      ) : (
        <div className="space-y-1.5">
          {scans.map((scan) => (
            <button
              key={scan.id}
              onClick={() => onSelect(scan.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                selectedId === scan.id
                  ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
              }`}
            >
              <span
                className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge(
                  scan.status,
                )}`}
              >
                {statusLabel(scan.status, t)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {new Date(scan.createdAt).toLocaleDateString(locale, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {scan.complianceScore != null && (
                <span
                  className={`text-lg font-bold tabular-nums ${scoreBadge(
                    scan.complianceScore,
                  )}`}
                >
                  {Math.round(scan.complianceScore)}
                </span>
              )}
              {(scan._count?.pages ?? 0) > 1 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {scan._count?.pages ?? scan.totalPages ?? 0}{" "}
                  {t.scanner.pagesAbbrev}
                </span>
              )}
              {scan.totalViolations != null && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {scan.totalViolations} {t.scanner.violations}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.scanner.prev}
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
            {t.scanner.pageOf
              .replace("{current}", String(page))
              .replace("{total}", String(totalPages))}
          </span>
          <button
            type="button"
            disabled={page >= totalPages || loading}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t.scanner.next}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
