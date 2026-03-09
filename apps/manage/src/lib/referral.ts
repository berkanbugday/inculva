import crypto from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

/** Generate a unique 8-character referral code (base-58 style, no ambiguous chars). */
export function generateReferralCode(): string {
  const bytes = crypto.randomBytes(8);
  let code = "";
  for (const byte of bytes) {
    code += ALPHABET[byte % ALPHABET.length];
  }
  return code;
}
