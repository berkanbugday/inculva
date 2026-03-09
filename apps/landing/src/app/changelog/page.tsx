import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Inculva",
  description: "See what's new in Inculva. Product updates, new features, and improvements.",
};

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"] ?? "https://app.inculva.com";

type ChangeType = "new" | "improved" | "fixed" | "security";

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  summary: string;
  changes: Change[];
}

const RELEASES: Release[] = [
  {
    version: "2.3",
    date: "2026-03-05",
    summary: "Phase 2C: OAuth login, API docs, analytics improvements, and CSV export.",
    changes: [
      { type: "new", text: "Sign in and register with Google or GitHub — no password required." },
      { type: "new", text: "Public API reference at inculva.com/docs — all endpoints documented with request/response examples." },
      { type: "new", text: "This changelog page." },
      { type: "new", text: "Analytics period selector: switch between 7, 14, 30, and 90-day windows." },
      { type: "new", text: "Feature adoption % in analytics — see what % of unique sessions activated each accessibility feature." },
      { type: "new", text: "Export analytics as CSV — up to 10,000 events per export." },
      { type: "new", text: "Weekly digest email — delivered every Monday with your widget activity summary." },
    ],
  },
  {
    version: "2.2",
    date: "2026-03-05",
    summary: "Phase 2B: Better onboarding, site renaming, and notification improvements.",
    changes: [
      { type: "new", text: "Site rename — click the site name in settings to edit it inline." },
      { type: "improved", text: "Onboarding checklist now detects real widget installs via load events, so step 4 actually marks as done." },
      { type: "improved", text: "Dashboard site cards show 30-day event count and an Active/Not installed badge." },
      { type: "improved", text: "Notifications mark as read automatically when you open the notification panel." },
    ],
  },
  {
    version: "2.1",
    date: "2026-03-04",
    summary: "Phase 2A: Legal pages, security hardening, and annual billing.",
    changes: [
      { type: "new", text: "Privacy Policy and Terms of Service pages on inculva.com." },
      { type: "new", text: "Cookie consent banner on all pages." },
      { type: "new", text: "Annual billing toggle — save ~17% with a yearly Pro or Business subscription." },
      { type: "new", text: "GDPR data export — download all your account data as JSON." },
      { type: "security", text: "Fixed open redirect vulnerability in login page callbackUrl parameter." },
      { type: "security", text: "Fixed SSRF vulnerability in WCAG scanner — scanner now validates domain matches site." },
      { type: "security", text: "Brute-force protection — 20 login attempts per IP per 15 minutes." },
      { type: "security", text: "XSS protection — all widget panel content now uses safe DOM APIs." },
    ],
  },
  {
    version: "2.0",
    date: "2026-02-28",
    summary: "19 accessibility features, 41 languages, WCAG scanner, and white-label support.",
    changes: [
      { type: "new", text: "19 total widget features including Reading Mask, Text Alignment, and Saturation Boost." },
      { type: "new", text: "Color blind mode with 4 types: deuteranopia, protanopia, tritanopia, achromatopsia (Machado 2009 matrices)." },
      { type: "new", text: "41-language support including 4 RTL languages (Arabic, Hebrew, Persian, Urdu)." },
      { type: "new", text: "Built-in WCAG scanner — static analysis with 12 checks, powered by Cheerio." },
      { type: "new", text: "Accessibility Statement generator — EAA Article 13 compliant HTML download." },
      { type: "new", text: "WCAG compliance badge — live SVG badge for embedding on your site." },
      { type: "new", text: "White-label support for Business plan — hide or customise the 'Powered by Inculva' text." },
      { type: "new", text: "Notification center — in-app alerts for usage limits, payment issues, and plan upgrades." },
      { type: "new", text: "Analytics charts — SVG trend line and feature bar chart, no JS dependencies." },
      { type: "new", text: "Widget CDN — served from Cloudflare R2 at cdn.inculva.com/widget.js." },
      { type: "new", text: "Team collaboration — invite teammates, assign roles, manage members." },
    ],
  },
  {
    version: "1.0",
    date: "2026-01-15",
    summary: "Initial launch. Eight core accessibility features, email auth, and basic analytics.",
    changes: [
      { type: "new", text: "Eight core features: Text Resizing, High Contrast, Dyslexia Font, Cursor Enhancement, Keyboard Navigation, Reading Guide, Screen Reader Hints, Pause Animations." },
      { type: "new", text: "Email and password authentication with verification." },
      { type: "new", text: "Dashboard with site management and widget configuration." },
      { type: "new", text: "LemonSqueezy billing — Free, Pro, and Business plans with Turkish Lira support." },
      { type: "new", text: "API key management for programmatic event access." },
      { type: "new", text: "Basic event analytics with daily trend chart." },
    ],
  },
];

const TYPE_STYLES: Record<ChangeType, { label: string; classes: string }> = {
  new: { label: "New", classes: "bg-blue-100 text-blue-700" },
  improved: { label: "Improved", classes: "bg-green-100 text-green-700" },
  fixed: { label: "Fixed", classes: "bg-yellow-100 text-yellow-700" },
  security: { label: "Security", classes: "bg-red-100 text-red-700" },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-gray-900 text-lg">Inculva</a>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/docs" className="hover:text-gray-900 transition-colors">API Docs</a>
            <a href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href={`${APP_URL}/register`} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-sm font-semibold text-blue-600 mb-2">Product Updates</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Changelog</h1>
          <p className="text-lg text-gray-500">
            New features, improvements, and fixes — in plain language.
          </p>
        </div>

        <div className="space-y-16">
          {RELEASES.map((release) => (
            <div key={release.version} className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-8 bottom-0 w-px bg-gray-100" />

              <div className="pl-8">
                {/* Dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 -translate-x-[3px]" />

                {/* Header */}
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">v{release.version}</h2>
                  <time className="text-sm text-gray-400">
                    {new Date(release.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <p className="text-gray-600 mb-5 text-sm">{release.summary}</p>

                <ul className="space-y-3">
                  {release.changes.map((change, i) => {
                    const style = TYPE_STYLES[change.type];
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${style.classes}`}
                        >
                          {style.label}
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">{change.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Stay up to date — digests are emailed to all active users every Monday.
          </p>
          <a
            href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Get started free →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-8">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Inculva</span>
          <div className="flex gap-6">
            <a href="/" className="hover:text-gray-600">Home</a>
            <a href="/pricing" className="hover:text-gray-600">Pricing</a>
            <a href="/docs" className="hover:text-gray-600">API Docs</a>
            <a href="/privacy" className="hover:text-gray-600">Privacy</a>
            <a href="/terms" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
