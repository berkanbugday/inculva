import type { NextConfig } from "next";

// Resolved at server startup — safe to use in CSP header values.
const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.inculva.com";

// The widget script may be served from a CDN (NEXT_PUBLIC_WIDGET_URL) or
// from this app's own /widget.js. Extract the CDN origin so we can add it
// to script-src; if the URL is relative or same-origin, 'self' already covers it.
const widgetScriptUrl = process.env["NEXT_PUBLIC_WIDGET_URL"] ?? "";
let widgetScriptOrigin = "";
try {
  const parsed = new URL(widgetScriptUrl);
  // Only add when it's genuinely external (different from the app origin)
  widgetScriptOrigin = parsed.origin;
} catch {
  // Relative path or empty — 'self' covers it
}

// In development the API runs on localhost:3001. We always include it so the
// widget preview iframe can reach the API even when NEXT_PUBLIC_API_URL is
// not overridden in .env.local.
const devApiUrl =
  process.env["NODE_ENV"] !== "production" ? "http://localhost:3001" : "";

// CDN origin where self-hosted fonts (and widget.js) live in production
const cdnOrigin = widgetScriptOrigin || "https://cdn.inculva.com";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'", // required by Next.js
  widgetScriptOrigin, // CDN origin for widget.js (empty string is ignored by join filter)
]
  .filter(Boolean)
  .join(" ");

const connectSrc = [
  "'self'",
  apiUrl,
  devApiUrl,
  "https://cdn.inculva.com",
]
  .filter(Boolean)
  .join(" ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
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
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      // Allow badge SVGs served from the API origin
      `img-src 'self' data: https://www.gravatar.com ${apiUrl}`,
      // data: allows the base64 WOFF2 data URIs the widget inlines for OpenDyslexic.
      // 'self' + cdnOrigin cover static .woff2 files served from the CDN / manage public dir.
      `font-src 'self' ${cdnOrigin} data:`,
      // Allow dashboard API calls + widget preview fetch
      `connect-src ${connectSrc}`,
      // srcdoc iframes don't require a frame-src entry, but 'self' keeps the fallback tidy
      "frame-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@inculva/ui", "@inculva/types", "@inculva/db", "@inculva/email"],
  async headers() {
    return [
      {
        // widget.js must be loadable cross-origin from any website that embeds it
        source: "/widget.js",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=60" },
        ],
      },
      {
        // i18n translation JSON files must be loadable cross-origin (widget fetches from CDN)
        source: "/i18n/:file*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      {
        // OpenDyslexic fonts must be loadable cross-origin from any site that embeds the widget
        source: "/fonts/:file*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
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
