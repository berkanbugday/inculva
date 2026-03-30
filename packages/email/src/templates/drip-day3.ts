import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function dripDay3Template(userName: string): string {
  return baseTemplate(
    `
    <h2>Have you installed the widget yet?</h2>
    <p>Hi ${escapeHtml(userName || "there")},</p>
    <p>You signed up for inculva a few days ago — great to have you! One quick question: have you added the widget to your site?</p>
    <p>It only takes 30 seconds — paste a single line of HTML before your closing <code>&lt;/body&gt;</code> tag and you're live.</p>
    <a href="${APP_URL}/dashboard" class="btn">Install the widget →</a>
    <hr class="divider">
    <p class="small">
      Need help? Reply to this email — we're happy to assist.<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">Manage email preferences</a>
    </p>
    `,
    "Install your accessibility widget in 30 seconds",
  );
}
