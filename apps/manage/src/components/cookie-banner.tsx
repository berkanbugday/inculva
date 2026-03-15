"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "inculva_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "accepted") {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] px-6 py-4 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          We use cookies for authentication only — no tracking, no advertising,
          no third-party analytics.{" "}
          <a
            href="/privacy"
            className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Privacy Policy
          </a>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
