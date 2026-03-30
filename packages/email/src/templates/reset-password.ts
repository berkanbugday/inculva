import { baseTemplate } from "./base.js";
import { t, type Locale } from "../i18n/messages.js";

export function resetPasswordTemplate(
  resetUrl: string,
  locale: Locale = "en",
) {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "resetTitle")}</h2>
    <p>${t(locale, "hi")} ${t(locale, "there")},</p>
    <p>${t(locale, "resetDesc")}</p>
    <a href="${resetUrl}" class="btn">${t(locale, "resetCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "ifYouDidntRequest")}<br>
    ${t(locale, "orCopyLink")}: <span style="word-break: break-all; color: #6b7280;">${resetUrl}</span></p>
    `,
    t(locale, "resetTitle"),
  );
  return { html, subject: t(locale, "resetSubject") };
}
