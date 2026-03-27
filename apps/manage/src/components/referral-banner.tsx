"use client";

import { useEffect, useState } from "react";
import { useMessages } from "@/i18n/useMessages";

interface ReferralData {
  code: string;
  shareUrl: string;
  referralCount: number;
}

export function ReferralBanner() {
  const t = useMessages();
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
    <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {t.referral.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t.referral.description}
        </p>
      </div>

      {data ? (
        <>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-4 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
              {data.shareUrl}
            </code>
            <button
              onClick={() => void handleCopy()}
              className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
            >
              {copied ? t.referral.copied : t.referral.copyLink}
            </button>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide font-medium">
                {t.referral.yourCode}
              </p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white mt-0.5">
                {data.code}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide font-medium">
                {t.referral.referrals}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white mt-0.5">
                {data.referralCount}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      )}
    </section>
  );
}
