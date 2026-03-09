import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

interface DigestSite {
  name: string;
  domain: string;
  events: number;
  topFeature: string | null;
}

export function weeklyDigestTemplate(
  userName: string,
  totalEvents: number,
  sites: DigestSite[],
  weekLabel: string,
): string {
  const sitesHtml = sites
    .map(
      (s) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6;">
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${escapeHtml(s.name)}</p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">${escapeHtml(s.domain)}</p>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; font-weight: 600; color: #1d4ed8;">
          ${s.events.toLocaleString()}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 13px; color: #6b7280;">
          ${s.topFeature ? escapeHtml(s.topFeature) : "—"}
        </td>
      </tr>`,
    )
    .join("");

  const noActivity = totalEvents === 0;

  return baseTemplate(
    `
    <h2>Your weekly accessibility digest</h2>
    <p>Hi ${escapeHtml(userName || "there")},</p>
    <p>Here's a summary of your widget activity for <strong>${escapeHtml(weekLabel)}</strong>.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 12px; color: #1d4ed8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Total Events This Week</p>
          <p style="margin: 0; font-size: 36px; font-weight: 700; color: #1e40af;">${totalEvents.toLocaleString()}</p>
        </td>
      </tr>
    </table>

    ${
      noActivity
        ? `<p style="color: #6b7280;">It looks like your widget didn't receive any events this week. Make sure it's installed correctly on your site.</p>
           <a href="${APP_URL}/dashboard" class="btn">Check your sites →</a>`
        : `<table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
             <thead>
               <tr style="background: #f9fafb;">
                 <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Site</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Events</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Top Feature</th>
               </tr>
             </thead>
             <tbody>${sitesHtml}</tbody>
           </table>
           <a href="${APP_URL}/dashboard" class="btn">View full analytics →</a>`
    }

    <hr class="divider">
    <p class="small">
      You're receiving this weekly digest because you have an active Inculva account.<br>
      Manage your notification preferences in <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">Account Settings</a>.
    </p>
    `,
    `${totalEvents.toLocaleString()} accessibility events this week`,
  );
}
