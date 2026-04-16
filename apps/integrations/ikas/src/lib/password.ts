import { scryptAsync } from "@noble/hashes/scrypt.js";
import { randomBytes } from "node:crypto";

const SCRYPT_CONFIG = { N: 16384, r: 16, p: 1, dkLen: 64 };

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = toHex(randomBytes(16));
  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: SCRYPT_CONFIG.N,
    r: SCRYPT_CONFIG.r,
    p: SCRYPT_CONFIG.p,
    dkLen: SCRYPT_CONFIG.dkLen,
    maxmem: 128 * SCRYPT_CONFIG.N * SCRYPT_CONFIG.r * 2,
  });
  return `${salt}:${toHex(key)}`;
}
