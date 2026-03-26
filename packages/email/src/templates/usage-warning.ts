import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function usageWarningTemplate(
  name: string,
  plan: string,
  used: number,
  limit: number,
): string {
  const percent = Math.round((used / limit) * 100);
  const planLabel: Record<string, string> = { free: "Free", small: "Small", medium: "Medium", large: "Large" };
  const label = planLabel[plan] ?? "Free";
  const usedFormatted = used.toLocaleString();
  const limitFormatted = limit.toLocaleString();

  return baseTemplate(
    `
    <h2>You've used ${percent}% of your monthly events</h2>
    <p>Hi ${escapeHtml(name || "there")},</p>
    <p>You're approaching your ${label} plan event limit for this month.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fefce8; border: 1px solid #fde047; border-radius: 10px;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #92400e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Event Usage</p>
          <p style="margin: 0; font-size: 28px; font-weight: 700; color: #78350f;">${usedFormatted} <span style="font-size: 15px; font-weight: 400; color: #92400e;">/ ${limitFormatted}</span></p>
        </td>
      </tr>
    </table>
    <p>Once you reach 100%, new events from your sites will be dropped until the month resets.</p>
    <p>Upgrade now to make sure disabled users on your sites keep receiving uninterrupted accessibility support.</p>
    <a href="${APP_URL}/pricing" class="btn">Upgrade Plan →</a>
    <hr class="divider">
    <p class="small">Your usage resets at the start of each calendar month.<br>
    Manage your plan in <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">Billing Settings</a>.</p>
    `,
    `You've used ${percent}% of your ${label} plan events`,
  );
}
