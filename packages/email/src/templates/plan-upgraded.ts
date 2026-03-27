import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function planUpgradedTemplate(name: string, plan: string): string {
  const planLabel: Record<string, string> = { small: "Small", medium: "Medium", large: "Large" };
  const label = planLabel[plan] ?? plan;
  return baseTemplate(
    `
    <h2>You're now on the ${label} plan 🎉</h2>
    <p>Hi ${escapeHtml(name || "there")},</p>
    <p>Your upgrade was successful. Here's what you now have access to:</p>
    ${plan === "large" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>Up to <strong>1,000,000 pageviews</strong> per month</li>
      <li>Up to <strong>25 websites</strong></li>
      <li>Custom branding</li>
      <li>Priority support (phone & email)</li>
    </ul>` : plan === "medium" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>Up to <strong>300,000 pageviews</strong> per month</li>
      <li>Up to <strong>10 websites</strong></li>
      <li>Priority email support</li>
    </ul>` : `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>Up to <strong>100,000 pageviews</strong> per month</li>
      <li>Up to <strong>5 websites</strong></li>
      <li>Full WCAG 2.1 AA & AAA scanning</li>
    </ul>`}
    <a href="${APP_URL}/dashboard" class="btn">Go to Dashboard →</a>
    <hr class="divider">
    <p class="small">Questions? Reply to this email or visit our <a href="${APP_URL}/help" style="color: #1d4ed8;">Help Center</a>.<br>
    Manage your subscription in <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">Billing Settings</a>.</p>
    `,
    `You're now on the ${label} plan`
  );
}
