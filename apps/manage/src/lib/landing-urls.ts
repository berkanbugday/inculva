import type { Locale } from "@/i18n/messages";

function landingBaseUrl(): string {
  const u = process.env["NEXT_PUBLIC_LANDING_URL"];
  return typeof u === "string" && u.length > 0
    ? u.replace(/\/$/, "")
    : "https://inculva.com";
}

/**
 * Path on the marketing site, matching `getLocalizedPath` in apps/landing (default locale has no prefix).
 */
export function landingLocalizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return `/${locale}${clean}`;
}

/** Absolute URL to a page on the landing/marketing site. */
export function landingAbsoluteUrl(path: string, locale: Locale): string {
  return `${landingBaseUrl()}${landingLocalizedPath(path, locale)}`;
}
