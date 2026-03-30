import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function welcomeTemplate(name: string, locale: Locale = "en") {
  const displayName = escapeHtml(name || t(locale, "there"));
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "welcomeHi")} ${displayName}!</h2>
    <p>${t(locale, "welcomeDesc")}</p>
    <p>${t(locale, "welcomeHowTo")}</p>
    <ol style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "welcomeStep1")}</li>
      <li>${t(locale, "welcomeStep2")}</li>
      <li>${t(locale, "welcomeStep3")}</li>
    </ol>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "welcomeCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "welcomePlan")} <strong>${t(locale, "freePlan")}</strong> — ${t(locale, "freePlanDesc")}<br>
    ${t(locale, "readyToScale")} <a href="${APP_URL}/pricing" style="color: #1d4ed8;">${t(locale, "upgradeAnytime")}</a></p>
    `,
    t(locale, "welcomeTitle"),
  );
  return { html, subject: t(locale, "welcomeSubject") };
}
