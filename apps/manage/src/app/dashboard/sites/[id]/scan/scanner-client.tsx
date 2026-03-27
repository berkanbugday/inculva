"use client";

import { useState } from "react";
import type { ScanResult, ScanViolation, ImpactLevel } from "@/lib/scanner";
import { useMessages } from "@/i18n/useMessages";
import type { DashboardMessages } from "@/i18n/messages";

function getImpactStyles(
  t: DashboardMessages,
): Record<ImpactLevel, { badge: string; border: string; label: string }> {
  return {
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
}

function impactCount(violations: ScanViolation[], impact: ImpactLevel): number {
  return violations.filter((v) => v.impact === impact).length;
}

function computeScore(violations: number, passes: number): number {
  const total = violations + passes;
  if (total === 0) return 100;
  return Math.max(0, Math.round(100 - violations * (100 / total)));
}

function scoreLabel(
  score: number,
  t: DashboardMessages,
): { text: string; color: string } {
  if (score >= 95)
    return {
      text: t.scanner.excellent,
      color: "text-green-600 dark:text-green-400",
    };
  if (score >= 80)
    return { text: t.scanner.good, color: "text-blue-600 dark:text-blue-400" };
  if (score >= 60)
    return {
      text: t.scanner.fair,
      color: "text-amber-600 dark:text-amber-400",
    };
  return { text: t.scanner.needsWork, color: "text-red-600 dark:text-red-400" };
}

const CRITICAL_IMPACTS: ImpactLevel[] = ["critical", "serious"];
const WARNING_IMPACTS: ImpactLevel[] = ["moderate", "minor"];

function ViolationCard({ v, t }: { v: ScanViolation; t: DashboardMessages }) {
  const [open, setOpen] = useState(false);
  const IMPACT_STYLES = getImpactStyles(t);
  const style = IMPACT_STYLES[v.impact];

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
              {v.id}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              WCAG {v.wcag} {v.wcagLevel}
            </span>
            {v.count > 1 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
                {v.count} {t.scanner.instances}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
            {v.description}
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
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {v.description}
          </p>

          {v.elements.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                {t.scanner.affectedElements}
              </p>
              <div className="space-y-1.5">
                {v.elements.map((el, i) => (
                  <code
                    key={i}
                    className="block text-xs bg-gray-900 dark:bg-black text-green-400 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap break-all"
                  >
                    {el}
                  </code>
                ))}
              </div>
            </div>
          )}

          <a
            href={v.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t.scanner.wcagDocument.replace("{wcag}", v.wcag)}
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
        </div>
      )}
    </div>
  );
}

interface Props {
  siteId: string;
  domain: string;
}

export function ScannerClient({ siteId, domain }: Props) {
  const t = useMessages();
  const IMPACT_STYLES = getImpactStyles(t);
  const [url, setUrl] = useState(`https://${domain}`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/sites/${siteId}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        data?: ScanResult;
        error?: string;
      };

      if (!res.ok || !json.success) {
        setError(json.error ?? "Scan failed");
      } else {
        setResult(json.data ?? null);
      }
    } catch {
      setError(t.scanner.networkError);
    } finally {
      setLoading(false);
    }
  }

  const sortedViolations =
    result?.violations.slice().sort((a, b) => {
      const order: ImpactLevel[] = ["critical", "serious", "moderate", "minor"];
      return order.indexOf(a.impact) - order.indexOf(b.impact);
    }) ?? [];

  return (
    <div className="space-y-6">
      {/* Scan form */}
      <form
        onSubmit={runScan}
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
      >
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {t.scanner.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t.scanner.description}
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="flex-1 rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-full text-sm font-semibold transition-colors"
          >
            {loading ? t.scanner.scanning : t.scanner.runScan}
          </button>
        </div>
        {loading && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {t.scanner.scanningHint}
          </p>
        )}
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Compliance Score Card */}
          {(() => {
            const score = computeScore(
              result.violations.length,
              result.passCount,
            );
            const { text: scoreText, color: scoreColor } = scoreLabel(score, t);
            const criticalCount = CRITICAL_IMPACTS.reduce(
              (sum, imp) => sum + impactCount(result.violations, imp),
              0,
            );
            const warningCount = WARNING_IMPACTS.reduce(
              (sum, imp) => sum + impactCount(result.violations, imp),
              0,
            );
            const simulatedScore = computeScore(
              warningCount,
              result.passCount + criticalCount,
            );
            return (
              <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Score */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div
                        className={`text-5xl font-bold tabular-nums ${scoreColor}`}
                      >
                        {score}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.scanner.complianceScore}
                      </div>
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${scoreColor}`}>
                        {scoreText}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {result.violations.length}{" "}
                        {result.violations.length !== 1
                          ? t.scanner.violations
                          : t.scanner.violation}{" "}
                        · {result.passCount} {t.scanner.checksPassed}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                        {t.scanner.scanned}{" "}
                        {new Date(result.scannedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[240px]"
                  >
                    {result.url}
                  </a>
                </div>

                {/* Severity split */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 flex items-center gap-3">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {criticalCount}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-700 dark:text-red-300">
                        {t.scanner.criticalLabel}
                      </div>
                      <div className="text-xs text-red-500 dark:text-red-500">
                        {t.scanner.criticalDesc}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 flex items-center gap-3">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {warningCount}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        {t.scanner.warningLabel}
                      </div>
                      <div className="text-xs text-amber-500 dark:text-amber-500">
                        {t.scanner.warningDesc}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score simulation */}
                {criticalCount > 0 && (
                  <div className="mt-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 px-4 py-3">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {t.scanner.scoreSimulation}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {t.scanner.scoreSimulationDesc
                        .replace("{count}", String(criticalCount))
                        .replace("{from}", String(score))
                        .replace("{to}", String(simulatedScore))
                        .replace("{points}", String(simulatedScore - score))}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Detailed impact breakdown */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {t.scanner.breakdownBySeverity}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                ["critical", "serious", "moderate", "minor"] as ImpactLevel[]
              ).map((impact) => {
                const count = impactCount(result.violations, impact);
                const style = IMPACT_STYLES[impact];
                return (
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
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                      {impact}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Violation cards */}
          {sortedViolations.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t.scanner.violationsSorted}
              </h4>
              {sortedViolations.map((v) => (
                <ViolationCard key={v.id} v={v} t={t} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6 text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="font-semibold text-green-800 dark:text-green-300">
                {t.scanner.allChecksPassed.replace(
                  "{count}",
                  String(result.passCount),
                )}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                {t.scanner.allChecksPassedDesc}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
