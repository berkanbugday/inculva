import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const CDN = process.env["NEXT_PUBLIC_CDN_URL"]!;

// Derive widget origin from NEXT_PUBLIC_WIDGET_URL when set (staging / prod overrides).
// Falls back to the CDN in production and localhost in dev.
function widgetOrigin(): string {
  const envUrl = process.env.NEXT_PUBLIC_WIDGET_URL;
  if (envUrl) {
    try { return new URL(envUrl).origin; } catch { /* fall through */ }
  }
  return isDev ? new URL(process.env["NEXT_PUBLIC_APP_URL"]!).origin : CDN;
}

const widgetSrc = widgetOrigin();
const apiSrc = process.env["NEXT_PUBLIC_API_URL"]!;

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // unsafe-eval is required by Next.js webpack in development (HMR/eval source maps)
      `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} ${widgetSrc}`.trimEnd(),
      "style-src 'self' 'unsafe-inline'",
      // data: allows the base64 WOFF2 data URIs the widget inlines for OpenDyslexic.
      // 'self' + widgetSrc cover static .woff2 files served from the CDN/manage app.
      `font-src 'self' ${widgetSrc} ${CDN} ${apiSrc} data:`,
      `img-src 'self' data: https://picsum.photos ${CDN}`,
      `connect-src 'self' ${apiSrc} ${CDN}${isDev ? ` ${widgetSrc}` : ""}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@inculva/ui", "@inculva/types"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack(config) {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
