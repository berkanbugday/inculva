"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMessages, getLocale } from "@/i18n/useMessages";
import { ScanResults, type ScanData } from "./scan-results";
import { ScanHistory, type ScanHistoryItem } from "./scan-history";

const TAB_IDS = ["scan", "history"] as const;
type TabId = (typeof TAB_IDS)[number];

interface Props {
  siteId: string;
  domain: string;
}

export function ScannerClient({ siteId, domain }: Props) {
  const t = useMessages();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const activeTab: TabId = TAB_IDS.includes(tabParam as TabId)
    ? (tabParam as TabId)
    : "scan";

  const TABS = [
    { id: "scan" as const, label: t.scanner.scanTab },
    { id: "history" as const, label: t.scanner.historyTab },
  ];

  function setTab(tab: TabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const [url, setUrl] = useState(`https://${domain}`);
  const [scanType, setScanType] = useState<"page" | "site">("page");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeScan, setActiveScan] = useState<ScanData | null>(null);
  const [historyScan, setHistoryScan] = useState<ScanData | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const HISTORY_PER_PAGE = 3;

  const loadHistory = useCallback(
    async (page = 1) => {
      setHistoryLoading(true);
      const offset = (page - 1) * HISTORY_PER_PAGE;
      const res = await fetch(
        `/api/sites/${siteId}/scan?limit=${HISTORY_PER_PAGE}&offset=${offset}`,
      );
      if (res.ok) {
        const json = await res.json();
        setHistory(json.data?.scans ?? []);
        setHistoryTotal(json.data?.total ?? 0);
      }
      setHistoryLoading(false);
    },
    [siteId, HISTORY_PER_PAGE],
  );

  useEffect(() => {
    void loadHistory(historyPage);
  }, [loadHistory, historyPage]);

  const pollScan = useCallback(
    async (scanId: string) => {
      const poll = async () => {
        const res = await fetch(`/api/sites/${siteId}/scan?scanId=${scanId}`);
        if (!res.ok) {
          setScanning(false);
          setError(t.scanner.fetchStatusFailed);
          return;
        }
        const json = await res.json();
        const scan = json.data as ScanData;
        setActiveScan(scan);

        if (scan.status === "completed" || scan.status === "failed") {
          setScanning(false);
          if (scan.status === "failed") setError(t.scanner.scanFailed);
          void loadHistory(historyPage);
          return;
        }
        setTimeout(() => {
          void poll();
        }, 3000);
      };
      void poll();
    },
    [siteId, loadHistory],
  );

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    setScanning(true);
    setError(null);
    setActiveScan(null);

    try {
      const res = await fetch(`/api/sites/${siteId}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          type: scanType,
          contentLocale: getLocale() === "tr" ? "tr" : "en",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error ?? t.scanner.scanFailed);
        setScanning(false);
        return;
      }
      void pollScan(json.data.scanId);
    } catch {
      setError(t.scanner.networkError);
      setScanning(false);
    }
  }

  async function selectScan(scanId: string) {
    const res = await fetch(`/api/sites/${siteId}/scan?scanId=${scanId}`);
    if (res.ok) {
      const json = await res.json();
      setHistoryScan(json.data as ScanData);
    }
  }

  return (
    <div className="space-y-6">
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-full p-1.5 shadow-sm overflow-x-auto w-full sm:w-fit">
        {TABS.map((tab: { id: TabId; label: string }) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "scan" && (
        <>
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
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setScanType("page")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  scanType === "page"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {t.scanner.singlePage}
              </button>
              <button
                type="button"
                onClick={() => setScanType("site")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  scanType === "site"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {t.scanner.fullSite}
              </button>
            </div>
            {scanType === "site" && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {t.scanner.fullSiteDesc}
              </p>
            )}
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
                disabled={scanning}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-full text-sm font-semibold transition-colors"
              >
                {scanning ? t.scanner.scanning : t.scanner.runScan}
              </button>
            </div>
            {scanning && (
              <div className="mt-3 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeScan?.progress && activeScan.progress.pagesTotal > 0
                    ? t.scanner.crawlProgress
                        .replace(
                          "{current}",
                          String(activeScan.progress.pagesScanned),
                        )
                        .replace(
                          "{total}",
                          String(activeScan.progress.pagesTotal),
                        )
                    : t.scanner.scanningHint}
                </p>
              </div>
            )}
          </form>

          {error && (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {activeScan && activeScan.status === "completed" && (
            <ScanResults scan={activeScan} t={t} />
          )}
        </>
      )}

      {activeTab === "history" && (
        <>
          <ScanHistory
            scans={history}
            onSelect={(scanId) => {
              void selectScan(scanId);
            }}
            selectedId={historyScan?.id}
            t={t}
            page={historyPage}
            totalPages={Math.max(1, Math.ceil(historyTotal / HISTORY_PER_PAGE))}
            totalScans={historyTotal}
            loading={historyLoading}
            onPageChange={(p: number) => {
              setHistoryPage(p);
              setHistoryScan(null);
            }}
          />

          {historyScan && historyScan.status === "completed" && (
            <ScanResults scan={historyScan} t={t} />
          )}
        </>
      )}
    </div>
  );
}
