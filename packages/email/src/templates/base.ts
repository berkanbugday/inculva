import { CDN_URL } from "../client.js";

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type Locale = "en" | "tr";

export function baseTemplate(
  locale: Locale,
  content: string,
  previewText = "",
): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>inculva</title>
  ${
    previewText
      ? `<span style="display:none;max-height:0;overflow:hidden;">${previewText}</span>`
      : ""
  }
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; }
    .card { background: #ffffff; border-radius: 16px; overflow: hidden; }
    .header { background: #ffffff; padding: 24px 36px; border-bottom: 3px solid #1d4ed8; }
    .header img { height: 36px; width: auto; display: block; }
    .body { padding: 36px; color: #374151; text-align: center; }
    .body h2 { margin: 0 0 12px; font-size: 20px; color: #111827; }
    .body p { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #4b5563; }
    .body ul { margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8; text-align: left; display: inline-block; }
    .body ol { margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8; text-align: left; display: inline-block; }
    .btn { display: inline-block; background: #1d4ed8; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 600; font-size: 15px; margin: 8px 0 20px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .small { font-size: 13px; color: #9ca3af; line-height: 1.5; }
    .footer { padding: 20px 36px; text-align: center; font-size: 12px; color: #9ca3af; }
    .footer a { color: #9ca3af; }
    code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <img src="${CDN_URL}/logos/logo-dark.png" alt="inculva" />
      </div>
      <div class="body">
        ${content}
      </div>
    </div>
    <div class="footer">
      <p>© ${year} inculva. All rights reserved.</p>
      <p>You're receiving this because you signed up for inculva.</p>
    </div>
  </div>
</body>
</html>`;
}
