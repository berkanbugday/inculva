import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay30Template(
  userName: string,
  eventCount: number,
  locale: Locale = "en",
) {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip30Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip30Desc")} <strong>${eventCount.toLocaleString()} ${t(locale, "drip30Events")}</strong> ${t(locale, "drip30Desc2")}</p>
    <p>${t(locale, "drip30FreeLimit")} <strong>${t(locale, "drip30EventsPerMonth")}</strong> ${t(locale, "drip30And")} <strong>${t(locale, "drip30Site")}</strong>. ${t(locale, "drip30Upgrade")} <strong>${t(locale, "drip30Pro")}</strong> ${t(locale, "drip30Gives")}</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>${t(locale, "drip30UpTo10Sites")}</li>
      <li>${t(locale, "drip30100kEvents")}</li>
      <li>${t(locale, "drip30TeamCollab")}</li>
      <li>${t(locale, "drip30PrioritySupport")}</li>
    </ul>
    <a href="${APP_URL}/dashboard/settings/billing" class="btn">${t(locale, "drip30Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "drip30OnFree")} <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "drip30Compare")}</a><br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    `You've tracked ${eventCount.toLocaleString()} events — time to upgrade?`,
  );
  return { html, subject: t(locale, "drip30Subject") };
}
