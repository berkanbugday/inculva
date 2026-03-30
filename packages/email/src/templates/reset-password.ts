import { baseTemplate } from "./base.js";

export function resetPasswordTemplate(resetUrl: string): string {
  return baseTemplate(
    `
    <h2>Reset your password</h2>
    <p>Hi there,</p>
    <p>We received a request to reset the password for your inculva account.
       Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
    <a href="${resetUrl}" class="btn">Reset Password →</a>
    <hr class="divider">
    <p class="small">If you didn't request a password reset, you can safely ignore this email.
       Your password will not be changed.<br>
       Or copy this link: <span style="word-break: break-all; color: #6b7280;">${resetUrl}</span></p>
    `,
    "Reset your inculva password",
  );
}
