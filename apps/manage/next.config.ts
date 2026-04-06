import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const apiUrl = process.env["NEXT_PUBLIC_API_URL"];
const cdnOrigin = process.env["NEXT_PUBLIC_CDN_URL"];
if (!apiUrl || !cdnOrigin) {
  throw new Error(
    "next.config: set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_CDN_URL (see apps/manage/.env.example)",
  );
}

/** Cloudflare Web Analytics / beacon (injected when proxied through Cloudflare). */
const cloudflareInsightsScript = "https://static.cloudflareinsights.com";
const cloudflareInsightsConnect = "https://cloudflareinsights.com";

const polarUrl = process.env["POLAR_URL"] ?? "https://sandbox.polar.sh";

/** Allow embedding the marketing site (e.g. login/register iframes); must match NEXT_PUBLIC_LANDING_URL origin. */
function landingOriginForCsp(): string {
  const raw = process.env["NEXT_PUBLIC_LANDING_URL"];
  if (typeof raw === "string" && raw.trim().length > 0) {
    try {
      return new URL(raw.trim()).origin;
    } catch {
      /* use default */
    }
  }
  return "https://inculva.com";
}

const landingOrigin = landingOriginForCsp();

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnOrigin} ${cloudflareInsightsScript}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: https://www.gravatar.com ${apiUrl} ${cdnOrigin}`,
      `font-src 'self' ${cdnOrigin} data:`,
      `connect-src 'self' ${apiUrl} ${cdnOrigin} ${polarUrl} ${cloudflareInsightsConnect} https://formspree.io`,
      `frame-src 'self' ${landingOrigin}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ]
      .filter(Boolean)
      .join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: monorepoRoot,
  // Prisma query-engine binaries live under the workspace root pnpm store; Next
  // traces includes from the app directory (apps/manage), so paths are relative
  // to that folder. See https://pris.ly/d/engine-not-found-nextjs
  outputFileTracingIncludes: {
    "/**": [
      "../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/**/*",
    ],
  },
  serverExternalPackages: ["@prisma/client"],
  transpilePackages: [
    "@inculva/ui",
    "@inculva/types",
    "@inculva/db",
    "@inculva/email",
    "@inculva/wcag-kb",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack(config) {
    // Allow TypeScript source packages that use `.js` extensions in ESM imports
    // (e.g. `import "./client.js"` in a .ts file) to be resolved correctly by webpack.
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
