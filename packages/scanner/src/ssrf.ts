import { lookup } from "node:dns/promises";

/** SSRF protection — blocks private/internal IP ranges and cloud metadata hostnames */

const PRIVATE_HOSTNAME_RE =
  /^(localhost|127\.|0\.0\.0\.0|::1|fd[0-9a-f]{2}:|fc[0-9a-f]{2}:|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.|100\.64\.)/i;

const BLOCKED_HOSTNAMES = new Set([
  "metadata.google.internal",
  "metadata.gcp.internal",
  "kubernetes.default",
  "kubernetes.default.svc",
]);

/** Check if an IP address is in a private/blocked range */
function isPrivateIp(ip: string): boolean {
  return PRIVATE_HOSTNAME_RE.test(ip);
}

const isDev = process.env["NODE_ENV"] !== "production";

export function assertSafeHostname(hostname: string): void {
  if (isDev) return; // Allow localhost/private IPs in development
  const h = hostname.toLowerCase();
  if (PRIVATE_HOSTNAME_RE.test(h) || BLOCKED_HOSTNAMES.has(h)) {
    throw new Error("URL resolves to a blocked host");
  }
}

export function assertSafeUrl(rawUrl: string): URL {
  const url = new URL(rawUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Only HTTP/HTTPS URLs are allowed");
  }
  assertSafeHostname(url.hostname);
  return url;
}

/**
 * Resolve hostname to IP and verify it doesn't point to a private/internal address.
 * Prevents DNS rebinding attacks where a public hostname resolves to 127.0.0.1, etc.
 */
export async function assertSafeResolvedUrl(rawUrl: string): Promise<URL> {
  const url = assertSafeUrl(rawUrl);

  if (isDev) return url; // Skip DNS resolution check in development

  try {
    const { address } = await lookup(url.hostname);
    if (isPrivateIp(address)) {
      throw new Error(
        `URL hostname "${url.hostname}" resolves to blocked IP ${address}`,
      );
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("resolves to blocked")) {
      throw err;
    }
    // DNS lookup failed — block to be safe
    throw new Error(`DNS lookup failed for "${url.hostname}": ${err instanceof Error ? err.message : "unknown error"}`);
  }

  return url;
}
