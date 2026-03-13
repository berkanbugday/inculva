import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference — Inculva",
  description: "Complete API reference for the Inculva accessibility widget. Widget config, event ingestion, analytics, and compliance badge endpoints.",
};

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;
const API_URL = process.env["NEXT_PUBLIC_API_URL"]!;

function Badge({ label, color }: { label: string; color: "green" | "blue" | "yellow" | "gray" }) {
  const colors = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${colors[color]}`}>
      {label}
    </span>
  );
}

function CodeBlock({ code, lang = "json" }: { code: string; lang?: string }) {
  return (
    <pre className={`language-${lang} bg-gray-950 text-green-300 rounded-xl p-5 text-sm overflow-x-auto leading-relaxed`}>
      <code>{code}</code>
    </pre>
  );
}

function Endpoint({
  method,
  path,
  auth,
  description,
  params,
  responseExample,
  requestExample,
  notes,
}: {
  method: string;
  path: string;
  auth: "none" | "api-key" | "session";
  description: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  responseExample: string;
  requestExample?: string;
  notes?: string[];
}) {
  const methodColor: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-green-100 text-green-700",
  };

  const authLabel: Record<string, string> = {
    none: "Public",
    "api-key": "API Key",
    session: "Session",
  };
  const authColor: Record<string, "green" | "yellow" | "blue"> = {
    none: "green",
    "api-key": "yellow",
    session: "blue",
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
      <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center gap-3">
        <span className={`px-3 py-1 rounded-lg text-sm font-bold font-mono ${methodColor[method] ?? "bg-gray-100 text-gray-700"}`}>
          {method}
        </span>
        <code className="text-sm font-mono text-gray-900 font-medium">{path}</code>
        <Badge label={authLabel[auth]!} color={authColor[auth]!} />
      </div>

      <div className="px-6 py-5 space-y-5">
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

        {notes && notes.length > 0 && (
          <ul className="space-y-1">
            {notes.map((n, i) => (
              <li key={i} className="text-sm text-gray-500 flex gap-2">
                <span className="text-gray-300 shrink-0">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        )}

        {params && params.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Parameters</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left pb-2 pr-4 text-xs text-gray-400 font-medium">Name</th>
                    <th className="text-left pb-2 pr-4 text-xs text-gray-400 font-medium">Type</th>
                    <th className="text-left pb-2 pr-4 text-xs text-gray-400 font-medium">Required</th>
                    <th className="text-left pb-2 text-xs text-gray-400 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {params.map((p) => (
                    <tr key={p.name} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 pr-4 font-mono text-blue-700 text-xs">{p.name}</td>
                      <td className="py-2 pr-4 font-mono text-gray-500 text-xs">{p.type}</td>
                      <td className="py-2 pr-4 text-xs">
                        {p.required ? (
                          <span className="text-red-500 font-medium">Yes</span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="py-2 text-gray-600 text-xs">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {requestExample && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Request body</p>
            <CodeBlock code={requestExample} />
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Response</p>
          <CodeBlock code={responseExample} />
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-gray-900 text-lg">Inculva</a>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="/changelog" className="hover:text-gray-900 transition-colors">Changelog</a>
            <a href={`${APP_URL}/register`} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Badge label="API Reference" color="blue" />
          <h1 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Inculva API</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            The Inculva API is a REST API. All responses are JSON. The widget config and event ingestion endpoints are public; analytics endpoints require an API key.
          </p>
        </div>

        {/* Base URLs */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <p className="text-sm font-semibold text-gray-700 mb-3">Base URLs</p>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 w-20 shrink-0">Widget API</span>
              <code className="text-blue-700">{API_URL}</code>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 w-20 shrink-0">Dashboard</span>
              <code className="text-blue-700">{APP_URL}/api</code>
            </div>
          </div>
        </div>

        {/* Auth section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Authentication</h2>
          <p className="text-gray-600 text-sm mb-4">
            Analytics endpoints require an API key passed in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">x-api-key</code> header.
            Generate keys in <a href={`${APP_URL}/dashboard/settings`} className="text-blue-600 hover:underline">Dashboard → Settings</a>.
          </p>
          <CodeBlock
            lang="bash"
            code={`# API key format: ink_<64 hex chars>
curl ${API_URL}/widget/events/SITE_ID \\
  -H "x-api-key: ink_your_key_here"`}
          />
          <p className="text-xs text-gray-400 mt-3">
            Key limits: Free = 5 keys, Pro = 20 keys, Business = unlimited. Keys can have optional expiry dates.
          </p>
        </div>

        {/* Rate limits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Endpoint</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Limit</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Window</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["All endpoints (global)", "100 requests", "1 minute"],
                  ["POST /widget/events (per site)", "60 events", "1 minute"],
                  ["Monthly event quota — Free", "10,000 events", "Calendar month"],
                  ["Monthly event quota — Pro", "100,000 events", "Calendar month"],
                  ["Monthly event quota — Business", "Unlimited", "—"],
                ].map(([ep, limit, window]) => (
                  <tr key={ep} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">{ep}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{limit}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{window}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Endpoints */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Endpoints</h2>

        <Endpoint
          method="GET"
          path={`${API_URL}/widget/config/:siteId`}
          auth="none"
          description="Fetch the widget configuration for a site. Called automatically by the widget on page load. Validates the requesting domain against the site's allowlist if configured. Records a widget load event."
          params={[
            { name: "siteId", type: "string (path)", required: true, desc: "The site ID from your dashboard" },
          ]}
          notes={[
            "Domain validation: if allowedDomains is set, the requesting Origin/Referer must match",
            "White-label text is only returned for Business plan sites",
            "Labels are returned in the widget's configured language (41 supported)",
          ]}
          responseExample={`{
  "success": true,
  "data": {
    "siteId": "clx1a2b3c4d5e6f7g8h9",
    "position": "bottom-right",
    "theme": "auto",
    "primaryColor": "#0066cc",
    "language": "en",
    "features": {
      "textResizing": true,
      "highContrast": true,
      "dyslexiaFont": true,
      "colorBlindMode": true,
      ...
    },
    "labels": { "open": "Open Accessibility Menu", ... },
    "accessibilityStatementUrl": null,
    "whiteLabelText": null
  }
}`}
        />

        <Endpoint
          method="POST"
          path={`${API_URL}/widget/events`}
          auth="none"
          description="Ingest a widget interaction event. Called by the embedded widget when a user opens the panel or toggles a feature. Events count toward the site's monthly quota."
          params={[
            { name: "siteId", type: "string (body)", required: true, desc: "Site ID (max 64 chars)" },
            { name: "sessionId", type: "string (body)", required: true, desc: "Anonymous session identifier (max 128 chars)" },
            { name: "event", type: "string (body)", required: true, desc: "One of: opened, closed, feature_enabled, feature_disabled" },
            { name: "feature", type: "string (body)", required: false, desc: "Feature name (required when event is feature_enabled/disabled)" },
          ]}
          notes={[
            "Returns 204 No Content on success",
            "Returns 429 Too Many Requests when monthly quota is exceeded",
            "Server always uses server-side timestamp — client-supplied timestamps are ignored",
          ]}
          requestExample={`{
  "siteId": "clx1a2b3c4d5e6f7g8h9",
  "sessionId": "sess_abc123def456",
  "event": "feature_enabled",
  "feature": "highContrast"
}`}
          responseExample={`// 204 No Content on success
// 429 Too Many Requests on quota exceeded:
{
  "success": false,
  "error": "Monthly event quota exceeded"
}`}
        />

        <Endpoint
          method="GET"
          path={`${API_URL}/widget/events/:siteId`}
          auth="api-key"
          description="Fetch paginated widget events for a site. The API key must belong to the site owner."
          params={[
            { name: "siteId", type: "string (path)", required: true, desc: "The site ID" },
            { name: "from", type: "ISO date (query)", required: false, desc: "Start date filter (e.g. 2025-01-01)" },
            { name: "to", type: "ISO date (query)", required: false, desc: "End date filter" },
            { name: "limit", type: "number (query)", required: false, desc: "Max results per page (1–200, default 50)" },
            { name: "offset", type: "number (query)", required: false, desc: "Pagination offset (default 0)" },
          ]}
          responseExample={`{
  "success": true,
  "data": [
    {
      "id": "evt_abc123",
      "event": "feature_enabled",
      "feature": "highContrast",
      "sessionId": "sess_abc123",
      "createdAt": "2025-03-01T14:32:00.000Z"
    }
  ],
  "total": 1482,
  "limit": 50,
  "offset": 0
}`}
        />

        <Endpoint
          method="GET"
          path={`${API_URL}/widget/events/:siteId/stats`}
          auth="api-key"
          description="Get aggregated daily event counts and feature usage statistics for a site. Ideal for building custom dashboards or reports."
          params={[
            { name: "siteId", type: "string (path)", required: true, desc: "The site ID" },
            { name: "days", type: "number (query)", required: false, desc: "Number of days to look back (1–90, default 30)" },
          ]}
          responseExample={`{
  "success": true,
  "data": {
    "daily": [
      { "date": "2025-03-01", "count": 142 },
      { "date": "2025-03-02", "count": 98 }
    ],
    "features": [
      { "feature": "highContrast", "count": 312 },
      { "feature": "textResizing", "count": 287 }
    ]
  }
}`}
        />

        <Endpoint
          method="GET"
          path={`${API_URL}/badge/:siteId.svg`}
          auth="none"
          description="Returns an SVG accessibility compliance badge for the site. The badge color reflects the latest WCAG scan result. Cached for 5 minutes."
          params={[
            { name: "siteId", type: "string (path)", required: true, desc: "The site ID (note the .svg extension)" },
          ]}
          notes={[
            'Returns a green "WCAG 2.1 AA" badge if the last scan had zero violations',
            'Returns a yellow badge with violation count if issues were found',
            'Returns a gray "Not scanned" badge if no scan has been run',
            "CORS enabled — embed from any domain",
          ]}
          responseExample={`<!-- Embed on your site: -->
<img
  src="${API_URL}/badge/YOUR_SITE_ID.svg"
  alt="WCAG 2.1 AA compliance badge"
  height="20"
/>`}
        />

        {/* SDK section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h3 className="font-semibold text-blue-900 mb-2">Need help?</h3>
          <p className="text-sm text-blue-700">
            Questions about the API? Email{" "}
            <a href="mailto:support@inculva.com" className="underline font-medium">support@inculva.com</a>{" "}
            or check the <a href="/changelog" className="underline font-medium">changelog</a> for recent updates.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Inculva</span>
          <div className="flex gap-6">
            <a href="/" className="hover:text-gray-600">Home</a>
            <a href="/pricing" className="hover:text-gray-600">Pricing</a>
            <a href="/changelog" className="hover:text-gray-600">Changelog</a>
            <a href="/privacy" className="hover:text-gray-600">Privacy</a>
            <a href="/terms" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
