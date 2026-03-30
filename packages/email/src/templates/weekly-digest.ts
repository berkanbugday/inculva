import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

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
  locale: Locale = "en",
) {
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

  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "digestTitle")}</h2>
    <p>${t(locale, "digestHi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "digestDesc")} <strong>${escapeHtml(weekLabel)}</strong>.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 12px; color: #1d4ed8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestTotalEvents")}</p>
          <p style="margin: 0; font-size: 36px; font-weight: 700; color: #1e40af;">${totalEvents.toLocaleString()}</p>
        </td>
      </tr>
    </table>

    ${
      noActivity
        ? `<p style="color: #6b7280;">${t(locale, "digestNoActivity")}</p>
           <a href="${APP_URL}/dashboard" class="btn">${t(locale, "digestCheckSites")} →</a>`
        : `<table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
             <thead>
               <tr style="background: #f9fafb;">
                 <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestSite")}</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestEvents")}</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestTopFeature")}</th>
               </tr>
             </thead>
             <tbody>${sitesHtml}</tbody>
           </table>
           <a href="${APP_URL}/dashboard" class="btn">${t(locale, "digestViewAnalytics")} →</a>`
    }

    <hr class="divider">
    <p class="small">
      ${t(locale, "digestManage")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    t(locale, "digestTitle"),
  );
  return { html, subject: t(locale, "digestSubject") };
}
