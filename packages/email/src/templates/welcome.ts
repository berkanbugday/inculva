import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function welcomeTemplate(name: string): string {
  const displayName = escapeHtml(name || "there");
  return baseTemplate(
    `
    <h2>Welcome to inculva, ${displayName}! 👋</h2>
    <p>We're glad you're here. inculva helps you make your website accessible to everyone — in minutes.</p>
    <p>Here's how to get started:</p>
    <ol style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>Add your first website</li>
      <li>Copy the embed snippet</li>
      <li>Paste it before &lt;/body&gt; on your site</li>
    </ol>
    <a href="${APP_URL}/dashboard" class="btn">Go to Dashboard →</a>
    <hr class="divider">
    <p class="small">Your plan: <strong>Free</strong> — 1 site, 10,000 events/month.<br>
    Ready to scale? <a href="${APP_URL}/pricing" style="color: #1d4ed8;">Upgrade anytime</a>.</p>
    `,
    `Welcome to inculva — let's make your site accessible`,
  );
}
