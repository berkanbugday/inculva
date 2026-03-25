"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  GlobeIcon,
  UserIcon,
  CreditCardIcon,
  ListIcon,
} from "./sidebar-icons";

export function SidebarLink({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl mx-1 text-sm font-semibold transition-colors relative cursor-pointer ${
        active
          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export function SiteGroup({
  site,
  expanded,
  onToggle,
  isActive,
  pathname,
}: {
  site: { id: string; name: string; domain: string };
  expanded: boolean;
  onToggle: () => void;
  isActive: (href: string) => boolean;
  pathname: string;
}) {
  const siteActive = pathname.includes(site.id);
  const subItems = [
    { label: "Customize", href: `/dashboard/sites/${site.id}` },
    { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
    { label: "WCAG Scan", href: `/dashboard/sites/${site.id}/scan` },
    { label: "Statement", href: `/dashboard/sites/${site.id}/statement` },
  ];

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mx-1 text-sm font-semibold transition-colors text-left cursor-pointer ${
          siteActive
            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        <GlobeIcon />
        <span className="flex-1 truncate text-xs">{site.domain}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M4 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {expanded && (
        <div className="ml-8 mt-0.5 space-y-0.5">
          {subItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isActive(item.href)
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold"
                  : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const SETTINGS_LINKS = [
  { href: "/dashboard/settings", label: "Account", icon: <UserIcon /> },
  {
    href: "/dashboard/settings/billing",
    label: "Billing",
    icon: <CreditCardIcon />,
  },
  {
    href: "/dashboard/settings/audit-log",
    label: "Audit Log",
    icon: <ListIcon />,
  },
] as const;

export function SettingsGroup({
  isActive,
}: {
  isActive: (href: string) => boolean;
}) {
  const pathname = usePathname();
  return (
    <div>
      <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
        Settings
      </p>
      {SETTINGS_LINKS.map((item) => {
        const active =
          item.href === "/dashboard/settings"
            ? pathname === "/dashboard/settings"
            : isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl mx-1 text-sm font-semibold transition-colors relative cursor-pointer ${
              active
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
