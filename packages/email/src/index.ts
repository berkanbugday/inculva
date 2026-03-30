export { resend, FROM_ADDRESS, APP_URL, CDN_URL } from "./client.js";
export { welcomeTemplate } from "./templates/welcome.js";
export { verifyEmailTemplate } from "./templates/verify-email.js";
export { planUpgradedTemplate } from "./templates/plan-upgraded.js";
export { resetPasswordTemplate } from "./templates/reset-password.js";
export { usageWarningTemplate } from "./templates/usage-warning.js";
export { usageLimitTemplate } from "./templates/usage-limit.js";
export { paymentFailedTemplate } from "./templates/payment-failed.js";
export { weeklyDigestTemplate } from "./templates/weekly-digest.js";
export { dripDay3Template } from "./templates/drip-day3.js";
export { dripDay7Template } from "./templates/drip-day7.js";
export { dripDay30Template } from "./templates/drip-day30.js";
export { healthDegradedTemplate } from "./templates/health-degraded.js";
export { detectLocale, type Locale } from "./i18n/messages.js";

import { resend, FROM_ADDRESS } from "./client.js";

interface SendOptions {
  to: string;
  subject: string;
  html: string;
}

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 1000;

export async function sendEmail({ to, subject, html }: SendOptions): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });

    if (!error) return;

    lastError = new Error(error.message);
    console.error(`[email] Attempt ${attempt}/${MAX_ATTEMPTS} failed:`, error);

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, BASE_DELAY_MS * 2 ** (attempt - 1)));
    }
  }

  const dlqEntry = {
    timestamp: new Date().toISOString(),
    to,
    subject,
    error: lastError?.message ?? "Unknown",
    attempts: MAX_ATTEMPTS,
  };
  console.error("[email:DLQ] Permanently failed — add to dead-letter queue:", JSON.stringify(dlqEntry));

  throw lastError ?? new Error("Email send failed");
}
