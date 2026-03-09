"use client";

import { useEffect, useState } from "react";

interface ReferralData {
  code: string;
  shareUrl: string;
  referralCount: number;
}

export function ReferralBanner() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referrals")
      .then((r) => r.json() as Promise<ReferralData>)
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleCopy() {
    if (!data) return;
    await navigator.clipboard.writeText(data.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Refer &amp; Earn</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Share your unique link. Every friend who signs up is counted toward your referrals.
        </p>
      </div>

      {data ? (
        <>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
              {data.shareUrl}
            </code>
            <button
              onClick={() => void handleCopy()}
              className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide font-medium">Your code</p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white mt-0.5">{data.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide font-medium">Referrals</p>
              <p className="font-semibold text-gray-900 dark:text-white mt-0.5">{data.referralCount}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      )}
    </section>
  );
}
