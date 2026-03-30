import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function healthDegradedTemplate(
  userName: string,
  domain: string,
  siteId: string,
): string {
  return baseTemplate(
    `
    <h2>Widget may be offline on ${escapeHtml(domain)}</h2>
    <p>Hi ${escapeHtml(userName || "there")},</p>
    <p>Our health monitor couldn't detect the inculva widget on <strong>${escapeHtml(
      domain,
    )}</strong>. This might mean:</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>The embed snippet was accidentally removed</li>
      <li>A deployment removed the widget script</li>
      <li>The site is temporarily down</li>
    </ul>
    <p>If accessibility tracking is interrupted, visitors won't be able to use the widget until it's restored.</p>
    <a href="${APP_URL}/dashboard/sites/${escapeHtml(
      siteId,
    )}" class="btn">Check site settings →</a>
    <hr class="divider">
    <p class="small">
      You'll only receive one notification per outage — we won't repeat this until the widget is healthy again.<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">Manage notification preferences</a>
    </p>
    `,
    `Widget may be offline on ${domain}`,
  );
}
