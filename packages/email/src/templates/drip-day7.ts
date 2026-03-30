import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay7Template(userName: string, locale: Locale = "en") {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip7Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip7Desc")} <strong>${t(locale, "drip7Scanner")}</strong>${t(locale, "drip7Desc2")}</p>
    <p>${t(locale, "drip7Desc3")}</p>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "drip7Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "drip7Ea")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    "Free WCAG scan included with your inculva account",
  );
  return { html, subject: t(locale, "drip7Subject") };
}
