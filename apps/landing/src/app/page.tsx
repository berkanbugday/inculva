import type { ReactNode } from "react";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;
const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

export default function HomePage() {
  const register = `${APP_URL}/register`;
  const login = `${APP_URL}/login`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo-dark.png" alt="Inculva" className="h-10 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <a
              href="/pricing"
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#features"
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Features
            </a>
            <a
              href="#why"
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Why Inculva
            </a>
            <a
              href="#faq"
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              FAQ
            </a>
            <a
              href="/widget-test"
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Widget Test
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={login}
              className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Sign in
            </a>
            <a
              href={register}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      {/* ── EAA urgency banner ───────────────────────────────────────────── */}
      <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800 px-6 py-2.5 text-center text-sm">
        <span className="text-amber-800 dark:text-amber-200">
          The <strong>European Accessibility Act</strong> took effect 28 June
          2025 — fines up to €500,000 for non-compliant digital products.{" "}
          <a
            href={register}
            className="underline font-semibold text-amber-900 dark:text-amber-100 hover:text-amber-700 dark:hover:text-amber-300"
          >
            Get compliant today
          </a>
        </span>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-14">
            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                Accessibility widget for every website
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-gray-900 dark:text-white mb-5">
                One script tag.
                <br />
                <span className="text-blue-600">Thousands of users</span>
                <br />
                who can finally use your site.
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                Inculva adds 25 real accessibility features to any website in
                under 5 minutes. No developer required after the initial
                install. WCAG 2.1 AA, EAA 2025 compliant.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={register}
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-base text-center"
                >
                  Start for free — no card needed
                </a>
                <a
                  href="/pricing"
                  className="px-7 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-base text-center"
                >
                  See pricing
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="block w-2 h-2 rounded-full bg-green-500" />
                  </span>
                  Free plan forever
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="block w-2 h-2 rounded-full bg-green-500" />
                  </span>
                  41 languages including RTL
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="block w-2 h-2 rounded-full bg-green-500" />
                  </span>
                  Works on any tech stack
                </span>
              </div>
            </div>

            {/* Right: code block */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-gray-950 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-800 bg-gray-900">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">
                    index.html
                  </span>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed">
                  <p className="text-gray-600">
                    &lt;!-- Add before &lt;/body&gt; --&gt;
                  </p>
                  <p className="text-blue-400 mt-2">
                    &lt;<span className="text-green-400">script</span>
                  </p>
                  <p className="text-gray-400 pl-4">
                    src=
                    <span className="text-amber-300">
                      &quot;{`${CDN_URL}/widget.js`}&quot;
                    </span>
                  </p>
                  <p className="text-gray-400 pl-4">
                    data-site-id=
                    <span className="text-amber-300">
                      &quot;your-site-id&quot;
                    </span>
                  </p>
                  <p className="text-gray-400 pl-4">defer</p>
                  <p className="text-blue-400">
                    &gt;&lt;/<span className="text-green-400">script</span>&gt;
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-600">
                      That&apos;s the entire install. Your widget goes live in
                      seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats below code */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { value: "24KB", label: "bundle size" },
                  { value: "41", label: "languages" },
                  { value: "25", label: "features" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 text-center border border-gray-100 dark:border-gray-800"
                  >
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof bar ─────────────────────────────────────────────── */}
      <div className="border-y border-gray-100 dark:border-gray-800 px-6 py-5 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map(
                (c, i) => (
                  <div
                    key={i}
                    style={{ background: c }}
                    className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center text-white text-[9px] font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ),
              )}
            </div>
            <span>
              Trusted by{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                1,200+
              </strong>{" "}
              sites
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="#f59e0b"
              >
                <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10l-3.6 1.9.7-4L1.2 5.2l4-.6L7 1z" />
              </svg>
            ))}
            <span>
              <strong className="text-gray-700 dark:text-gray-200">4.9</strong>{" "}
              / 5 avg rating
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-green-500"
            >
              <path
                d="M2 8l4 4 8-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>EAA 2025 &amp; WCAG 2.1 AA ready</span>
          </div>
        </div>
      </div>

      {/* ── Compliance strip ─────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest font-medium mb-5">
            Designed around these standards
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "WCAG 2.1 AA", sub: "Full coverage" },
              { label: "WCAG 2.2 AA", sub: "New criteria" },
              { label: "EAA 2025", sub: "EU compliance" },
              { label: "ADA", sub: "US law" },
              { label: "Section 508", sub: "Federal" },
              { label: "EN 301 549", sub: "EU standard" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Not a band-aid. Actual features.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Every feature is built to specification — tested against real
              assistive technology, not just automated scanners. Here&apos;s
              what your visitors get.
            </p>
          </div>

          <div className="space-y-10">
            {/* Vision */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-violet-600 dark:text-violet-400"
                  >
                    <path
                      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Vision
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M12 3v18M3 12h9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "High Contrast",
                    desc: "Boosts contrast ratio beyond 7:1 for severe low vision",
                    wcag: "1.4.3",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M12 3a9 9 0 0 1 0 18"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          fill="currentColor"
                          fillOpacity="0.15"
                        />
                      </svg>
                    ),
                    title: "Grayscale",
                    desc: "Removes all color to reduce visual noise and fatigue",
                    wcag: "1.4.3",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle
                          cx="16"
                          cy="8"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeOpacity="0.5"
                        />
                        <circle
                          cx="12"
                          cy="15"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeOpacity="0.25"
                        />
                      </svg>
                    ),
                    title: "Color Blind Mode",
                    desc: "4 modes: deuteranopia, protanopia, tritanopia, achromatopsia",
                    wcag: "1.4.1",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 8h16M4 12h10M4 16h13"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "Highlight Links",
                    desc: "Forces underline + bold on every link regardless of CSS",
                    wcag: "1.4.1",
                  },
                ].map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>

            {/* Reading */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="10"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 6h6M5 9h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Reading &amp; Text
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 6h16M4 10h16M4 14h8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16 17l2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Text Resizing",
                    desc: "Scales fonts up to 200% without breaking the layout",
                    wcag: "1.4.4",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <text
                          x="2"
                          y="17"
                          fontSize="16"
                          fontWeight="bold"
                          fill="currentColor"
                          fontFamily="serif"
                        >
                          A
                        </text>
                      </svg>
                    ),
                    title: "Dyslexia Font",
                    desc: "OpenDyslexic — weighted bottoms reduce letter confusion",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "Text Spacing",
                    desc: "Line height, letter spacing, and word spacing — all adjustable",
                    wcag: "1.4.12",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="10"
                          width="20"
                          height="4"
                          rx="1"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4 6h16M4 18h16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeOpacity="0.4"
                        />
                      </svg>
                    ),
                    title: "Reading Guide",
                    desc: "Horizontal highlight bar tracks where you are on the page",
                  },
                ].map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>

            {/* Motor */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-emerald-600 dark:text-emerald-400"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="5"
                      height="5"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="2"
                      width="5"
                      height="5"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="2"
                      y="9"
                      width="5"
                      height="5"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="9"
                      width="5"
                      height="5"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Motor &amp; Keyboard
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="4"
                          width="20"
                          height="16"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M7 9h2M11 9h2M15 9h2M7 13h10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "Keyboard Navigation",
                    desc: "3px focus outline on every interactive element",
                    wcag: "2.1.1",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="16"
                          height="16"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeDasharray="3 2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    ),
                    title: "Focus Highlight",
                    desc: "High-visibility orange focus ring — impossible to miss",
                    wcag: "2.4.11",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="7"
                          width="18"
                          height="10"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    ),
                    title: "Large Click Targets",
                    desc: "Enforces 44×44px minimum touch target size",
                    wcag: "2.5.8",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 3l12 9-5 1-3 5L6 3z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Cursor Enhancement",
                    desc: "Enlarged SVG cursor for motor control difficulties",
                  },
                ].map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>

            {/* Calm */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-amber-600 dark:text-amber-400"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 7h4M6 9h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Cognitive &amp; Sensory
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="6"
                          y="4"
                          width="4"
                          height="16"
                          rx="2"
                          fill="currentColor"
                          fillOpacity="0.8"
                        />
                        <rect
                          x="14"
                          y="4"
                          width="4"
                          height="16"
                          rx="2"
                          fill="currentColor"
                          fillOpacity="0.8"
                        />
                      </svg>
                    ),
                    title: "Pause Animations",
                    desc: "Stops all CSS animations — critical for vestibular disorders",
                    wcag: "2.3.3",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s3.5-7 11-7 11 7 11 7-3.5 7-11 7S1 12 1 12z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "Screen Reader Hints",
                    desc: "Flags images with missing alt text so they can be fixed",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M14 7l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Skip Navigation",
                    desc: "Jump directly to main content — standard keyboard UX",
                    wcag: "2.4.1",
                  },
                  {
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11 5L6 9H2v6h4l5 4V5z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 9l-4 6M13 9l4 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    title: "Mute Media",
                    desc: "Silences all autoplaying audio and video instantly",
                    wcag: "1.4.2",
                  },
                ].map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Inculva ──────────────────────────────────────────────────── */}
      <section id="why" className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                We won&apos;t tell you an overlay is a full fix. No one should.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                In January 2025, the FTC fined a major accessibility overlay
                company $1 million for claiming automated tools provide full
                WCAG compliance. They don&apos;t. Nothing does that
                automatically.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                What Inculva does: it gives your users real, functional controls
                for how they experience your site — right now, without waiting
                for a full code audit. It&apos;s a meaningful improvement for
                the 1 in 6 people who live with a disability. It&apos;s not a
                substitute for building accessibly from the ground up.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                We think being honest about that is the only way to build
                something worth trusting.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Open source widget",
                  desc: "The widget code is auditable. No hidden scripts, no session recording, no data harvesting from your visitors.",
                },
                {
                  title: "No per-user pricing",
                  desc: "You pay for sites and events — not per disabled user who uses the widget. That incentive structure felt wrong to us.",
                },
                {
                  title: "Works offline",
                  desc: "The widget loads from a CDN with a 24KB bundle. If our API is down, your users still get the features they had before.",
                },
                {
                  title: "GDPR by default",
                  desc: "The widget stores preferences only in localStorage. No cookies, no cross-site tracking, no third-party data sharing.",
                },
                {
                  title: "41 languages including RTL",
                  desc: "Arabic, Hebrew, Persian, Urdu — all supported with proper right-to-left layout. Because accessibility isn't just for English speakers.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Live in under 5 minutes
          </h2>
          <p className="text-center text-gray-400 dark:text-gray-500 mb-14 text-sm">
            No sales call. No implementation fee. No waiting.
          </p>

          <div className="relative">
            <div className="absolute left-5 top-10 bottom-10 w-px bg-gray-100 dark:bg-gray-800 hidden sm:block" />
            <ol className="space-y-10">
              {[
                {
                  n: "1",
                  title: "Create your free account",
                  desc: "Email and password. That's it. No credit card, no company size, no discovery call. Your first site is on the free plan indefinitely.",
                },
                {
                  n: "2",
                  title: "Register your site domain",
                  desc: "Add your domain (e.g. yourcompany.com). We generate a unique site ID and your embed code is ready immediately.",
                },
                {
                  n: "3",
                  title: "Paste one script tag",
                  desc: "Add it before </body> in your HTML — or drop it into your CMS, tag manager, or frontend framework. The widget appears within seconds.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-6 relative">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 z-10">
                    {item.n}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              Pricing that scales with you
            </h2>
            <p className="text-gray-400 text-sm">
              All plans include the full widget with every feature. No feature
              gating.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                plan: "Free",
                price: "$0",
                period: "forever",
                desc: "For personal projects and small sites that need to cover the basics.",
                limits: ["1 site", "10,000 events / month", "1 team member"],
                cta: "Get started",
                href: register,
                highlight: false,
              },
              {
                plan: "Pro",
                price: "$19",
                period: "/ month",
                desc: "For agencies and growing businesses managing multiple client sites.",
                limits: [
                  "10 sites",
                  "100,000 events / month",
                  "5 team members",
                ],
                cta: "Start Pro",
                href: register,
                highlight: true,
              },
              {
                plan: "Business",
                price: "$49",
                period: "/ month",
                desc: "For companies with enterprise compliance requirements and SLA needs.",
                limits: [
                  "Unlimited sites",
                  "Unlimited events",
                  "Unlimited team members",
                  "White-label widget",
                  "Priority support + SLA",
                ],
                cta: "Start Business",
                href: register,
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-2xl p-7 border ${p.highlight ? "bg-blue-600 border-blue-500 text-white" : "bg-gray-900 border-gray-800 text-white"}`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-2 ${p.highlight ? "text-blue-200" : "text-gray-500"}`}
                >
                  {p.plan}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span
                    className={`text-sm ${p.highlight ? "text-blue-200" : "text-gray-500"}`}
                  >
                    {p.period}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed mb-6 ${p.highlight ? "text-blue-100" : "text-gray-400"}`}
                >
                  {p.desc}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {p.limits.map((l) => (
                    <li
                      key={l}
                      className={`flex items-center gap-2 text-sm ${p.highlight ? "text-blue-100" : "text-gray-300"}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke={p.highlight ? "white" : "#60a5fa"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {l}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${p.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"}`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mt-8">
            Turkish pricing available —{" "}
            <a
              href="/pricing"
              className="text-gray-400 hover:text-white underline"
            >
              see full pricing page
            </a>{" "}
            for TRY rates.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Frequently asked
          </h2>
          <div className="space-y-1">
            {[
              {
                q: "Does adding this widget make my site fully WCAG compliant?",
                a: "No — and anyone who tells you otherwise is selling you something you shouldn't buy. The widget gives your users meaningful tools to improve their experience, but WCAG compliance also requires semantic HTML, proper heading structure, accessible forms, keyboard-navigable components, and more. The widget is a real improvement, not a legal shield.",
              },
              {
                q: "What happens when the 10,000 free event limit is hit?",
                a: "New events stop recording for the rest of the month. The widget itself keeps working — your visitors aren't affected. You'll get an email warning at 80% so you have time to upgrade before you hit the limit.",
              },
              {
                q: "Will this slow down my website?",
                a: "The widget is 24KB (7KB gzip) loaded asynchronously from a global CDN. It doesn't block rendering and has no impact on your Lighthouse performance score.",
              },
              {
                q: "Does the widget collect data about my visitors?",
                a: "We record anonymized events (widget opened, feature enabled) tied to a random session ID — not a user ID, not an IP address. Accessibility preferences are stored only in the visitor's browser localStorage. We have no way to track individual visitors across sessions.",
              },
              {
                q: "Can I remove the 'Powered by Inculva' branding?",
                a: "Yes — on the Business plan you can replace it with your own text or remove it entirely. The free and Pro plans display the Inculva branding in the widget footer.",
              },
              {
                q: "What's the EAA and does this help me comply?",
                a: "The European Accessibility Act (Directive 2019/882) requires digital products and services sold to EU consumers to meet accessibility standards, with fines up to €500,000 for non-compliance. It references WCAG 2.1 AA. Inculva helps satisfy several of those requirements — particularly the user-facing controls mandate — but full compliance still requires accessible underlying code and a published accessibility statement.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group border-b border-gray-100 dark:border-gray-800 py-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                  <span className="font-medium text-gray-900 dark:text-white text-sm leading-snug">
                    {item.q}
                  </span>
                  <span className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200 text-lg leading-none">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed pr-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Every person deserves to use the web.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            15% of the world lives with a disability. Most websites make their
            experience worse, not better. Five minutes and one script tag is all
            it takes to change that for your site.
          </p>
          <a
            href={register}
            className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-base"
          >
            Start for free — no card needed
          </a>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
            Free plan includes 1 site and 10,000 events per month. Always.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 px-6 py-10 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="mb-2">
                <img
                  src="/logo-dark.png"
                  alt="Inculva"
                  className="h-14 w-auto"
                />
              </div>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Web accessibility tools for developers and teams who care about
                every user.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
              <a
                href="/pricing"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#features"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#faq"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="/docs"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                API Docs
              </a>
              <a
                href="/changelog"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Changelog
              </a>
              <a
                href={login}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Sign in
              </a>
              <a
                href={register}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Register
              </a>
            </nav>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-600">
            <p>© {new Date().getFullYear()} Inculva. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="/privacy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="mailto:support@inculva.com"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  wcag,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  wcag?: string;
}) {
  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
          {icon}
        </div>
        {wcag && (
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            {wcag}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
