export interface HealthCheckResult {
  installed: boolean;
  statusCode?: number;
  error?: string;
}

// Matches private/loopback addresses — used for SSRF prevention in production.
const PRIVATE_HOST_RE =
  /^(localhost|127\.|0\.0\.0\.0|::1|fd[0-9a-f]{2}:|fc[0-9a-f]{2}:|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.|100\.64\.)/i;

// Cloud-provider metadata endpoints — always blocked regardless of environment.
const BLOCKED_HOSTS = new Set([
  "metadata.google.internal",
  "metadata.gcp.internal",
  "kubernetes.default",
]);

const LOCALHOST_RE = /^(localhost|127\.|0\.0\.0\.0|::1)/i;
const isDev = process.env.NODE_ENV !== "production";

/**
 * Resolve the protocol for a domain string that has no explicit scheme.
 * In dev, localhost gets http:// (no TLS). Everything else gets https://.
 */
function buildUrl(domain: string): string {
  if (domain.startsWith("http://") || domain.startsWith("https://"))
    return domain;
  if (isDev && LOCALHOST_RE.test(domain)) return `http://${domain}`;
  return `https://${domain}`;
}

/**
 * Fetch a site's homepage and check whether the inculva widget is present.
 *
 * SSRF prevention: private IPs and cloud metadata endpoints are blocked in
 * production. In development the check is relaxed so engineers can verify
 * a local install (e.g. localhost:3002) without deploying first.
 */
export async function checkSiteHealth(
  domain: string,
  siteId: string,
): Promise<HealthCheckResult> {
  const url = buildUrl(domain);

  let parsedHost: string;
  try {
    parsedHost = new URL(url).hostname.toLowerCase();
  } catch {
    return { installed: false, error: "Invalid site domain" };
  }

  // Cloud metadata endpoints are always off-limits.
  if (BLOCKED_HOSTS.has(parsedHost)) {
    return { installed: false, error: "Invalid site domain" };
  }

  // In production, also block private/loopback ranges (SSRF protection).
  // In development, allow localhost so the widget can be verified locally.
  if (!isDev && PRIVATE_HOST_RE.test(parsedHost)) {
    return {
      installed: false,
      error:
        "Localhost domains can't be reached from a remote server — deploy your site first",
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "inculvaBot/1.0 (health check)" },
    });
    clearTimeout(timeout);

    const html = await res.text();

    // Require the correct siteId to appear in an embed-code context.
    // Checking only for "inculva" or "widget.js" without the siteId produces
    // false positives when those strings appear in page copy or when a
    // different site's widget embed is present.
    const hasSiteIdEmbed =
      html.includes(`data-site-id="${siteId}"`) ||
      html.includes(`data-site-id='${siteId}'`);

    // Looser fallback: the siteId is present alongside an inculva asset reference
    // (catches custom embed patterns that don't use the data attribute).
    const hasSiteIdWithScript =
      html.includes(siteId) &&
      (html.includes("inculva") || html.includes("widget.js"));

    const installed = hasSiteIdEmbed || hasSiteIdWithScript;

    return { installed, statusCode: res.status };
  } catch (err) {
    const error =
      err instanceof Error && err.name === "AbortError"
        ? "Request timed out after 8s"
        : "Could not reach site";
    return { installed: false, error };
  }
}
