import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function healthDegradedTemplate(
  userName: string,
  domain: string,
  siteId: string,
  locale: Locale = "en",
) {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "healthTitle")} ${escapeHtml(domain)}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "healthDesc")} <strong>${escapeHtml(domain)}</strong>. ${t(locale, "healthMightMean")}</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>${t(locale, "healthReason1")}</li>
      <li>${t(locale, "healthReason2")}</li>
      <li>${t(locale, "healthReason3")}</li>
    </ul>
    <p>${t(locale, "healthImpact")}</p>
    <a href="${APP_URL}/dashboard/sites/${escapeHtml(siteId)}" class="btn">${t(locale, "healthCheckSettings")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "healthOneNotification")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    `Widget may be offline on ${domain}`,
  );
  return { html, subject: `${t(locale, "healthSubject")} ${domain}` };
}
