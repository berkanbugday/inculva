import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function paymentFailedTemplate(
  name: string,
  plan: string,
  locale: Locale = "en",
) {
  const planLabel: Record<string, string> = {
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? plan;

  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "paymentTitle")}</h2>
    <p>${t(locale, "paymentHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "paymentFailed")} <strong>${label}</strong> ${t(locale, "paymentPlan")}</p>
    <p>${t(locale, "paymentRestricted")}</p>
    <p>${t(locale, "paymentPleaseUpdate")}</p>
    <a href="${APP_URL}/dashboard/settings/billing" class="btn">${t(locale, "paymentCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "paymentErrorContact")} <a href="mailto:${t(locale, "paymentSupportEmail")}" style="color: #1d4ed8;">${t(locale, "paymentSupportEmail")}</a>.</p>
    `,
    "Payment failed — action required",
  );
  return { html, subject: t(locale, "paymentSubject") };
}
