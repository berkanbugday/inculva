import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function usageLimitTemplate(
  name: string,
  plan: string,
  limit: number,
  locale: Locale = "en",
) {
  const planLabel: Record<string, string> = {
    free: "Free",
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? "Free";
  const limitFormatted = limit.toLocaleString();

  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "limitTitle")}</h2>
    <p>${t(locale, "limitHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "limitReached")} ${label} ${t(locale, "limitPlan")} <strong>${limitFormatted} ${t(locale, "limitEvents")}</strong> ${t(locale, "limitForMonth")}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 10px;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "limitStatus")}</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #7f1d1d;">${t(locale, "limitDropped")}</p>
        </td>
      </tr>
    </table>
    <p>${t(locale, "limitWidgetStill")} <strong>${t(locale, "limitDisabledUsers")}</strong> ${t(locale, "limitWidgetContinues")}</p>
    <p>${t(locale, "limitUpgrade")}</p>
    <a href="${APP_URL}/pricing" class="btn">${t(locale, "limitCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "limitResets")}<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    "Event limit reached — upgrade to restore tracking",
  );
  return { html, subject: t(locale, "limitSubject") };
}
