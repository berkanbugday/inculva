import { APP_URL } from "../client.js";
import { escapeHtml } from "./base.js";

export function paymentFailedTemplate(name: string, plan: string): string {
  const planLabel: Record<string, string> = { small: "Small", medium: "Medium", large: "Large" };
  const label = planLabel[plan] ?? plan;
  const billingUrl = `${APP_URL}/dashboard/settings/billing`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment failed — Inculva</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#dc2626;padding:28px 40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:rgba(255,255,255,0.15);border-radius:8px;width:32px;height:32px;text-align:center;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:16px;font-weight:700;">A</span>
                  </td>
                  <td style="padding-left:10px;color:#ffffff;font-size:18px;font-weight:700;">Inculva</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">Payment failed</h1>
              <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6;">
                Hi ${escapeHtml(name || "there")},
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6;">
                We were unable to process your payment for the <strong style="color:#111827;">${label}</strong> plan.
                Your account has been moved to a restricted state — your widget will continue to work, but you won&apos;t be able to create new sites or access premium features until your billing is resolved.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                Please update your payment method to restore full access.
              </p>
              <a href="${billingUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                Update payment method
              </a>
              <p style="margin:32px 0 0;font-size:13px;color:#9ca3af;line-height:1.6;">
                If you believe this is an error, contact us at
                <a href="mailto:hi@inculva.com" style="color:#2563eb;">hi@inculva.com</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} Inculva · <a href="${APP_URL}/privacy" style="color:#9ca3af;">Privacy</a> · <a href="${APP_URL}/terms" style="color:#9ca3af;">Terms</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
