import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function dripDay30Template(
  userName: string,
  eventCount: number,
): string {
  return baseTemplate(
    `
    <h2>Unlock unlimited accessibility</h2>
    <p>Hi ${escapeHtml(userName || "there")},</p>
    <p>You've been using inculva for a month — thank you! Your widget has tracked <strong>${eventCount.toLocaleString()} events</strong> so far.</p>
    <p>On the Free plan you're limited to <strong>10,000 events/month</strong> and <strong>1 site</strong>. Upgrading to <strong>Pro</strong> gives you:</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>Up to 10 sites</li>
      <li>100,000 events/month</li>
      <li>Team collaboration (up to 5 members)</li>
      <li>Priority support</li>
    </ul>
    <a href="${APP_URL}/dashboard/settings/billing" class="btn">Upgrade to Pro →</a>
    <hr class="divider">
    <p class="small">
      You're on the Free plan. <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">Compare all plans</a><br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">Manage email preferences</a>
    </p>
    `,
    `You've tracked ${eventCount.toLocaleString()} events — time to upgrade?`,
  );
}
