interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface Column {
  title: string;
  links: NavLink[];
}

const columns: Column[] = [
  {
    title: "Product",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/#features", label: "Features" },
      { href: "/changelog", label: "Changelog" },
      { href: "/docs", label: "API Docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/contact", label: "Contact" },
      { href: "mailto:support@inculva.com", label: "support@inculva.com" },
    ],
  },
  {
    title: "Standards",
    links: [
      { href: "https://www.w3.org/WAI/WCAG21/quickref/", label: "WCAG 2.1 AA", external: true },
      { href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019L0882", label: "EAA 2025", external: true },
      { href: "https://www.ada.gov/", label: "ADA Title III", external: true },
      { href: "https://www.section508.gov/", label: "Section 508", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                {col.title}
              </p>
              <ul className="space-y-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Inculva. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Hybrid accessibility — automation + human expertise.
          </p>
        </div>
      </div>
    </footer>
  );
}
