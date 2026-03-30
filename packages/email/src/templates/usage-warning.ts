import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function usageWarningTemplate(
  name: string,
  plan: string,
  used: number,
  limit: number,
  locale: Locale = "en",
) {
  const percent = Math.round((used / limit) * 100);
  const planLabel: Record<string, string> = {
    free: "Free",
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? "Free";
  const usedFormatted = used.toLocaleString();
  const limitFormatted = limit.toLocaleString();

  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "warningTitle")} ${percent}% ${t(locale, "warningOfMonthly")}</h2>
    <p>${t(locale, "warningHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "warningApproaching")} ${label} ${t(locale, "warningPlan")}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fefce8; border: 1px solid #fde047; border-radius: 10px;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #92400e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "warningEventUsage")}</p>
          <p style="margin: 0; font-size: 28px; font-weight: 700; color: #78350f;">${usedFormatted} <span style="font-size: 15px; font-weight: 400; color: #92400e;">/ ${limitFormatted}</span></p>
        </td>
      </tr>
    </table>
    <p>${t(locale, "warningOnce100")}</p>
    <p>${t(locale, "warningUpgrade")}</p>
    <a href="${APP_URL}/pricing" class="btn">${t(locale, "warningCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "warningResets")}<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    `You've used ${percent}% of your ${label} plan events`,
  );
  const warningSubjectKey = locale === "tr" 
    ? `Aylık etkinliklerinizin %${percent}'ini kullandınız`
    : `You've used ${percent}% of your monthly events`;

  return { html, subject: warningSubjectKey };
}
