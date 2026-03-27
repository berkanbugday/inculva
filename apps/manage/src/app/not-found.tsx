"use client";

import { useMessages } from "@/i18n/useMessages";

export default function NotFound() {
  const t = useMessages();
  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
          404
        </p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          {t.errors.pageNotFound}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {t.errors.pageNotFoundDesc}
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            {t.errors.backToDashboard}
          </a>
          <a
            href="/"
            className="px-6 py-3 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t.errors.home}
          </a>
        </div>
      </div>
    </div>
  );
}
