"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarLink, SiteGroup } from "./sidebar-parts";
import { GridIcon, ChartIcon, SettingsIcon, PlusIcon } from "./sidebar-icons";

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface Props {
  sites: Site[];
  userName: string | null;
  userEmail: string;
}

export function Sidebar({ sites, userName, userEmail }: Props) {
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

  const initials = userName
    ? userName
        .split(" ")
        .filter((n) => n.length > 0)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (userEmail[0]?.toUpperCase() ?? "?");

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#1a1a2e] border-r border-[#e8eaf0] dark:border-[#2a2a3e] min-h-[calc(100vh-56px)] flex flex-col overflow-y-auto">
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <SidebarLink
          href="/dashboard"
          active={pathname === "/dashboard"}
          icon={<GridIcon />}
          label="My Websites"
        />

        {sites.map((site) => (
          <SiteGroup
            key={site.id}
            site={site}
            expanded={expandedSites.has(site.id)}
            onToggle={() => toggleSite(site.id)}
            isActive={isActive}
            pathname={pathname}
          />
        ))}

        <a
          href="/dashboard/sites/new"
          className="flex items-center justify-center gap-2 mx-3 mt-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
        >
          <PlusIcon />
          Add new site
        </a>

        <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] mx-2 my-3" />

        <SidebarLink
          href="/dashboard/statistics"
          active={isActive("/dashboard/statistics")}
          icon={<ChartIcon />}
          label="Statistics"
        />
        <SidebarLink
          href="/dashboard/settings"
          active={isActive("/dashboard/settings")}
          icon={<SettingsIcon />}
          label="Settings"
        />
      </nav>

      <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 py-4">
        <a
          href="/dashboard/settings"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            {userName && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {userName}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
        </a>
      </div>
    </aside>
  );
}
