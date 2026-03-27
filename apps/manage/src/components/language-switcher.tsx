"use client";

import { SUPPORTED_LOCALES } from "@/i18n/messages";
import { setLocale, useLocale, useMessages } from "@/i18n/useMessages";
import type { Locale } from "@/i18n/messages";
import { useRouter } from "next/navigation";

const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useMessages();
  const router = useRouter();

  function handleSwitch(next: Locale) {
    if (next === locale) return;
    setLocale(next);
    document.documentElement.lang = next;
    router.refresh();
  }

  return (
    <div
      className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1"
      role="radiogroup"
      aria-label={t.langSwitcher.label}
    >
      {SUPPORTED_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={locale === l}
          onClick={() => handleSwitch(l)}
          suppressHydrationWarning
          className={`px-5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
            locale === l
              ? "bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white shadow-sm"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
        >
          {LOCALE_SHORT[l]}
        </button>
      ))}
    </div>
  );
}
