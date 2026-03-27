"use client";

import { useSyncExternalStore } from "react";
import { getMessages, SUPPORTED_LOCALES } from "./messages";
import type { DashboardMessages, Locale } from "./messages";

function getCookieLocale(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const languages = navigator.languages ?? [navigator.language];
  for (const lang of languages) {
    const code = lang.split("-")[0].toLowerCase();
    if (SUPPORTED_LOCALES.includes(code as Locale)) {
      return code as Locale;
    }
  }
  return "en";
}

export function getLocale(): Locale {
  const cookie = getCookieLocale();
  if (cookie && SUPPORTED_LOCALES.includes(cookie as Locale)) {
    return cookie as Locale;
  }
  return getBrowserLocale();
}

export function setLocale(locale: Locale): void {
  document.cookie = `locale=${locale}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; SameSite=Lax`;
  window.dispatchEvent(new Event("locale-change"));
}

function subscribe(cb: () => void): () => void {
  window.addEventListener("languagechange", cb);
  window.addEventListener("locale-change", cb);
  return () => {
    window.removeEventListener("languagechange", cb);
    window.removeEventListener("locale-change", cb);
  };
}

function getSnapshot(): DashboardMessages {
  return getMessages(getLocale());
}

function getServerSnapshot(): DashboardMessages {
  return getMessages("en");
}

export function useMessages(): DashboardMessages {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, () => "en" as Locale);
}
