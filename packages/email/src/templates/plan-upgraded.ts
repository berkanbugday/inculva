import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function planUpgradedTemplate(name: string, plan: string): string {
  const planLabel = plan === "business" ? "Business" : "Pro";
  return baseTemplate(
    `
    <h2>You're now on the ${planLabel} plan 🎉</h2>
    <p>Hi ${escapeHtml(name || "there")},</p>
    <p>Your upgrade was successful. Here's what you now have access to:</p>
    ${plan === "pro" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>Up to <strong>10 sites</strong></li>
      <li><strong>100,000 events</strong> per month</li>
      <li>Up to <strong>5 team members</strong></li>
      <li>Priority support</li>
    </ul>` : `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li><strong>Unlimited sites</strong></li>
      <li><strong>Unlimited events</strong></li>
      <li><strong>Unlimited team members</strong></li>
      <li>White-label widget</li>
      <li>Dedicated support + SLA</li>
    </ul>`}
    <a href="${APP_URL}/dashboard" class="btn">Go to Dashboard →</a>
    <hr class="divider">
    <p class="small">Questions? Reply to this email or visit our <a href="${APP_URL}/help" style="color: #1d4ed8;">Help Center</a>.<br>
    Manage your subscription in <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">Billing Settings</a>.</p>
    `,
    `You're now on the ${planLabel} plan`
  );
}
