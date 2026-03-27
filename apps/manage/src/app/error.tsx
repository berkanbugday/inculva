"use client";

import { useMessages } from "@/i18n/useMessages";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const t = useMessages();
  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-black bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
          500
        </p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          {t.errors.somethingWentWrong}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          {error.message || t.errors.unexpectedError}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-6 font-mono">
            {t.errors.errorId} {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            {t.errors.tryAgain}
          </button>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t.errors.goToDashboard}
          </a>
        </div>
      </div>
    </div>
  );
}
