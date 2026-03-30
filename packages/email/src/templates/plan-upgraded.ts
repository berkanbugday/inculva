import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function planUpgradedTemplate(
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
    <h2>${t(locale, "upgradedTitle")} ${label} ${t(locale, "upgradedPlan")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "upgradedDesc")}</p>
    ${plan === "large" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>1,000,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>25 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedCustomBranding")}</li>
      <li>${t(locale, "upgradedPriorityPhone")}</li>
    </ul>` : plan === "medium" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>300,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>10 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedPriorityEmail")}</li>
    </ul>` : `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>100,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>5 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedFullScan")}</li>
    </ul>`}
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "upgradedCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "upgradedQuestions")} <a href="${APP_URL}/help" style="color: #1d4ed8;">${t(locale, "helpCenter")}</a>.<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    `You're now on the ${label} plan`,
  );
  return { html, subject: `${t(locale, "upgradedSubject")} ${label} ${t(locale, "upgradedPlan")}` };
}
