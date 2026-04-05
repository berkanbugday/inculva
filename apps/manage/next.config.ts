import type { NextConfig } from "next";

const apiUrl = process.env["NEXT_PUBLIC_API_URL"]!;
const cdnOrigin = process.env["NEXT_PUBLIC_CDN_URL"]!;
const polarUrl = process.env["POLAR_URL"] ?? "https://sandbox.polar.sh";

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
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnOrigin}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: https://www.gravatar.com ${apiUrl} ${cdnOrigin}`,
      `font-src 'self' ${cdnOrigin} data:`,
      `connect-src 'self' ${apiUrl} ${cdnOrigin} ${polarUrl}`,
      "frame-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ]
      .filter(Boolean)
      .join("; "),
  },
];

const nextConfig: NextConfig = {
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
