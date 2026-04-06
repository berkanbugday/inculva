import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay3Template(userName: string, locale: Locale = "en") {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip3Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip3Desc")}</p>
    <p>${t(locale, "drip3Desc2")} <code>body</code> ${t(locale, "drip3Tag")}</p>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "drip3Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "questionsReply")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(
        locale,
        "managePreferences",
      )}</a>
    </p>
    `,
    "Install your accessibility widget in 30 seconds",
  );
  return { html, subject: t(locale, "drip3Subject") };
}
