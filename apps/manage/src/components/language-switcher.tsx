"use client";

import { SUPPORTED_LOCALES } from "@/i18n/messages";
import { setLocale, useLocale, useMessages } from "@/i18n/useMessages";
import type { Locale } from "@/i18n/messages";
import { useRouter } from "next/navigation";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useMessages();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    setLocale(next);
    document.documentElement.lang = next;
    // Ensure server components re-render with the updated `locale` cookie.
    router.refresh();
  }

  return (
    <select
      value={locale}
      suppressHydrationWarning
      onChange={handleChange}
      aria-label={t.langSwitcher.label}
      className="text-xs text-gray-500 dark:text-gray-400 bg-transparent dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-1.5 py-1 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  );
}
