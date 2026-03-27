"use client";

import { useMessages } from "@/i18n/useMessages";

export default function BannedPage() {
  const t = useMessages();
  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-12 w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-950 flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          {t.banned.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
          {t.banned.description}
        </p>

        <a
          href="mailto:hi@inculva.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
        >
          {t.banned.contactSupport}
        </a>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
          hi@inculva.com
        </p>
      </div>
    </div>
  );
}
