import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function dripDay7Template(userName: string): string {
  return baseTemplate(
    `
    <h2>Run your free WCAG scan</h2>
    <p>Hi ${escapeHtml(userName || "there")},</p>
    <p>Did you know Inculva includes a built-in <strong>WCAG 2.1 AA scanner</strong>? It checks your site for the most common accessibility issues and shows you exactly what to fix.</p>
    <p>It's free for all plans — just click below to scan your first site.</p>
    <a href="${APP_URL}/dashboard" class="btn">Run WCAG scan →</a>
    <hr class="divider">
    <p class="small">
      The European Accessibility Act requires digital products to be WCAG 2.1 AA compliant.<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">Manage email preferences</a>
    </p>
    `,
    "Free WCAG scan included with your Inculva account",
  );
}
