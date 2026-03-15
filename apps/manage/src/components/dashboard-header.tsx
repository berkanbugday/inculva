"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

interface Props {
  locale: string;
}

export function DashboardHeader({ locale }: Props) {
  const pathname = usePathname();
  const label = getPageLabel(pathname);

  return (
    <header className="h-14 bg-white dark:bg-[#1a1a2e] border-b border-[#e8eaf0] dark:border-[#2a2a3e] px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-3">
        <a href="/dashboard">
          <img
            src={`${CDN_URL}/logos/logo-dark.png`}
            alt="Inculva"
            className="h-7 w-auto"
          />
        </a>
        {label && (
          <>
            <span
              className="text-gray-300 dark:text-gray-700 text-sm"
              aria-hidden="true"
            >
              /
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/dashboard/sites/new"
          className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 1v10M1 6h10"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          New site
        </a>
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
        <NotificationBell />
      </div>
    </header>
  );
}

function getPageLabel(pathname: string): string | null {
  if (pathname === "/dashboard") return null;
  if (pathname.includes("/analytics")) return "Analytics";
  if (pathname.includes("/scan")) return "WCAG Scan";
  if (pathname.includes("/statement")) return "Statement";
  if (pathname.includes("/delete")) return "Delete Site";
  if (pathname.includes("/sites/new")) return "New Site";
  if (pathname.includes("/sites/")) return "Customize";
  if (pathname.includes("/billing")) return "Billing";
  if (pathname.includes("/audit-log")) return "Audit Log";
  if (pathname.includes("/settings")) return "Settings";
  if (pathname.includes("/statistics")) return "Statistics";
  if (pathname.includes("/notifications")) return "Notifications";
  return null;
}
