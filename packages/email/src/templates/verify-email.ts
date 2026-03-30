import { baseTemplate } from "./base.js";
import { t, type Locale } from "../i18n/messages.js";

export function verifyEmailTemplate(
  name: string,
  verifyUrl: string,
  locale: Locale = "en",
) {
  const html = baseTemplate(
    locale,
    `
    <h2>${t(locale, "verifyTitle")}</h2>
    <p>${t(locale, "hi")} ${name || t(locale, "there")},</p>
    <p>${t(locale, "verifyDesc")}</p>
    <a href="${verifyUrl}" class="btn">${t(locale, "verifyCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "ifYouDidntCreate")}<br>
    ${t(locale, "orCopyLink")}: <span style="word-break: break-all; color: #6b7280;">${verifyUrl}</span></p>
    `,
    t(locale, "verifyTitle"),
  );
  return { html, subject: t(locale, "verifySubject") };
}
