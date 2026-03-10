"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface Props {
  sites: Site[];
  isAdmin?: boolean;
}

export function Sidebar({ sites, isAdmin }: Props) {
  const pathname = usePathname();
  const [expandedSites, setExpandedSites] = useState<Set<string>>(() => {
    const matched = sites.find((s) => pathname.includes(s.id));
    return matched ? new Set([matched.id]) : new Set();
  });

  function toggleSite(id: string) {
    setExpandedSites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <aside className="w-56 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-52px)] overflow-y-auto flex flex-col">
      <nav className="p-3 space-y-0.5 flex-1">
        {/* Section header */}
        <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
          Websites
        </p>

        {/* My websites */}
        <a href="/dashboard" className={linkClass(pathname === "/dashboard")}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          My websites
        </a>

        {/* Site list */}
        {sites.map((site) => {
          const isExpanded = expandedSites.has(site.id);
          const sitePathActive = pathname.includes(site.id);

          const subItems = [
            { label: "Customize", href: `/dashboard/sites/${site.id}` },
            { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
            { label: "WCAG Scan", href: `/dashboard/sites/${site.id}/scan` },
            { label: "Statement", href: `/dashboard/sites/${site.id}/statement` },
          ];

          return (
            <div key={site.id}>
              <button
                onClick={() => toggleSite(site.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  sitePathActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1.5 8h13M8 1.5C6.5 3.5 5.5 5.7 5.5 8s1 4.5 2.5 6.5M8 1.5C9.5 3.5 10.5 5.7 10.5 8s-1 4.5-2.5 6.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="flex-1 truncate text-xs">{site.domain}</span>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                >
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isExpanded && (
                <div className="ml-5 mt-0.5 space-y-0.5 pl-2 border-l border-gray-200 dark:border-gray-700">
                  {subItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive(item.href)
                          ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {sites.length === 0 ? (
          <a
            href="/dashboard/sites/new"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Add first site
          </a>
        ) : (
          <a
            href="/dashboard/sites/new"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Add new site
          </a>
        )}

        <div className="my-2 border-t border-gray-100 dark:border-gray-800 !mt-3" />

        {/* Statistics */}
        <a href="/dashboard/statistics" className={linkClass(isActive("/dashboard/statistics"))}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="6.5" y="5" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="1" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Statistics
        </a>

        {/* Customize widget */}
        <a
          href={sites.length > 0 ? `/dashboard/sites/${sites[0]!.id}` : "/dashboard"}
          className={linkClass(
            sites.length > 0 &&
              pathname.startsWith(`/dashboard/sites/${sites[0]!.id}`) &&
              !pathname.includes("/analytics") &&
              !pathname.includes("/scan") &&
              !pathname.includes("/statement") &&
              !pathname.includes("/delete")
          )}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6.5 1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1a5 5 0 011.7.98l.87-.5a.5.5 0 01.68.18l1 1.73a.5.5 0 01-.18.68l-.87.5A5.02 5.02 0 0113 7.5v1a5.02 5.02 0 01-.28 1.63l.87.5a.5.5 0 01.18.68l-1 1.73a.5.5 0 01-.68.18l-.87-.5A5 5 0 019.5 13.5v1a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1a5 5 0 01-1.7-.98l-.87.5a.5.5 0 01-.68-.18l-1-1.73a.5.5 0 01.18-.68l.87-.5A5.02 5.02 0 013 8.5v-1a5.02 5.02 0 01.28-1.63l-.87-.5a.5.5 0 01-.18-.68l1-1.73a.5.5 0 01.68-.18l.87.5A5 5 0 016.5 2.5v-1z" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          Customize widget
        </a>

        {/* Settings */}
        <a href="/dashboard/settings" className={linkClass(isActive("/dashboard/settings"))}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Settings
        </a>

        {isAdmin && (
          <>
            <div className="my-2 border-t border-gray-100 dark:border-gray-800" />
            <a
              href="/admin"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "bg-amber-500 text-white"
                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1L2 5.4l4.2-.8L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Admin
            </a>
          </>
        )}
      </nav>
    </aside>
  );
}
