import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function usageLimitTemplate(
  name: string,
  plan: string,
  limit: number,
): string {
  const planLabel: Record<string, string> = { free: "Free", small: "Small", medium: "Medium", large: "Large" };
  const label = planLabel[plan] ?? "Free";
  const limitFormatted = limit.toLocaleString();

  return baseTemplate(
    `
    <h2>You've reached your monthly event limit</h2>
    <p>Hi ${escapeHtml(name || "there")},</p>
    <p>Your ${label} plan has reached its limit of <strong>${limitFormatted} events</strong> for this month.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 10px;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Status</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #7f1d1d;">New events are being dropped until your limit resets</p>
        </td>
      </tr>
    </table>
    <p>This means the accessibility widget on your sites is still loading, but user interactions are no longer being recorded. More importantly, <strong>disabled users relying on your widget are not affected</strong> — the widget continues to function.</p>
    <p>Upgrade to restore event tracking and ensure complete analytics for the rest of the month.</p>
    <a href="${APP_URL}/pricing" class="btn">Upgrade Now →</a>
    <hr class="divider">
    <p class="small">Your usage resets automatically at the start of each calendar month.<br>
    Manage your plan in <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">Billing Settings</a>.</p>
    `,
    `Event limit reached — upgrade to restore tracking`,
  );
}
