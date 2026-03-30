import { baseTemplate } from "./base.js";

export function verifyEmailTemplate(name: string, verifyUrl: string): string {
  return baseTemplate(
    `
    <h2>Verify your email address</h2>
    <p>Hi ${name || "there"},</p>
    <p>Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.</p>
    <a href="${verifyUrl}" class="btn">Verify Email →</a>
    <hr class="divider">
    <p class="small">If you didn't create an inculva account, you can safely ignore this email.<br>
    Or copy this link: <span style="word-break: break-all; color: #6b7280;">${verifyUrl}</span></p>
    `,
    "Verify your inculva email address",
  );
}
