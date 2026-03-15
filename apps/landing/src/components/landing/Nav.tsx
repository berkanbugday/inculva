"use client";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "#features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export function Nav({ cdnUrl, appUrl }: { cdnUrl: string; appUrl: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src={`${cdnUrl}/logos/logo-dark.png`}
            alt="Inculva - Web Accessibility Tools"
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${appUrl}/login`}
            className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
          >
            Sign in
          </a>
          <a
            href={`${appUrl}/register`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}
