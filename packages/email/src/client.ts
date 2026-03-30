import { Resend } from "resend";

if (!process.env["RESEND_API_KEY"]) {
  console.warn("[email] RESEND_API_KEY not set — emails will not be sent");
}

export const resend = new Resend(process.env["RESEND_API_KEY"] ?? "re_placeholder");

export const FROM_ADDRESS = process.env["EMAIL_FROM"]!;
export const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;
export const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;
