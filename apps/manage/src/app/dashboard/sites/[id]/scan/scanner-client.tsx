"use client";

import { useState } from "react";
import type { ScanResult, ScanViolation, ImpactLevel } from "@/lib/scanner";

const IMPACT_STYLES: Record<ImpactLevel, { badge: string; border: string; label: string }> = {
  critical: {
    badge: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-900",
    label: "Critical",
  },
  serious: {
    badge: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-900",
    label: "Serious",
  },
  moderate: {
    badge: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-900",
    label: "Moderate",
  },
  minor: {
    badge: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900",
    label: "Minor",
  },
};

function impactCount(violations: ScanViolation[], impact: ImpactLevel): number {
  return violations.filter((v) => v.impact === impact).length;
}

function ViolationCard({ v }: { v: ScanViolation }) {
  const [open, setOpen] = useState(false);
  const style = IMPACT_STYLES[v.impact];

  return (
    <div className={`rounded-xl border ${style.border} bg-white dark:bg-gray-900 overflow-hidden`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <span className={`shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
          {style.label}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{v.id}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">WCAG {v.wcag} {v.wcagLevel}</span>
            {v.count > 1 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
                {v.count} instances
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">{v.description}</p>
        </div>
        <svg
          className={`shrink-0 mt-1 w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 pb-4 pt-3 space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">{v.description}</p>

          {v.elements.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                Affected elements
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
            WCAG {v.wcag} understanding document
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
      const json = (await res.json()) as { success?: boolean; data?: ScanResult; error?: string };

      if (!res.ok || !json.success) {
        setError(json.error ?? "Scan failed");
      } else {
        setResult(json.data ?? null);
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  const sortedViolations = result?.violations.slice().sort((a, b) => {
    const order: ImpactLevel[] = ["critical", "serious", "moderate", "minor"];
    return order.indexOf(a.impact) - order.indexOf(b.impact);
  }) ?? [];

  return (
    <div className="space-y-6">
      {/* Scan form */}
      <form onSubmit={runScan} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
          WCAG Accessibility Scan
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Checks the public HTML of any URL for common WCAG A and AA violations. The page must be publicly accessible.
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "Scanning…" : "Run Scan"}
          </button>
        </div>
        {loading && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Fetching and analyzing HTML — this can take up to 15 seconds for slow sites…
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
          {/* Summary bar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {result.violations.length === 0
                    ? "No violations found"
                    : `${result.violations.length} violation${result.violations.length !== 1 ? "s" : ""} found`}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {result.passCount} checks passed · scanned {new Date(result.scannedAt).toLocaleTimeString()}
                </p>
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

            {/* Impact breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["critical", "serious", "moderate", "minor"] as ImpactLevel[]).map((impact) => {
                const count = impactCount(result.violations, impact);
                const style = IMPACT_STYLES[impact];
                return (
                  <div key={impact} className={`rounded-lg border ${style.border} px-3 py-2 text-center`}>
                    <div className={`text-2xl font-bold ${count > 0 ? style.badge.split(" ").slice(2).join(" ") : "text-gray-400 dark:text-gray-600"}`}>
                      {count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">{impact}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Violation cards */}
          {sortedViolations.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Violations (sorted by severity)</h4>
              {sortedViolations.map((v) => (
                <ViolationCard key={v.id} v={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6 text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="font-semibold text-green-800 dark:text-green-300">All {result.passCount} checks passed</p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                No detectable violations in the static HTML. Consider running a full browser-based audit with axe DevTools for dynamic content.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
