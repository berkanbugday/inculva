"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";
import { getMessages } from "@/i18n/messages";
import type { DashboardMessages } from "@/i18n/messages";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

interface Props {
  locale: string;
  canAddSite: boolean;
  onMenuClick?: () => void;
}

export function DashboardHeader({ locale, canAddSite, onMenuClick }: Props) {
  const pathname = usePathname();
  const t = getMessages(locale);
  const label = getPageLabel(pathname, t);

  return (
    <header className="h-14 bg-white dark:bg-[#1a1a2e] border-b border-[#e8eaf0] dark:border-[#2a2a3e] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label={t.header.toggleMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
        )}
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
              className="hidden sm:inline text-gray-300 dark:text-gray-700 text-sm"
              aria-hidden="true"
            >
              /
            </span>
            <span className="hidden sm:inline text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {canAddSite && (
          <a
            href="/dashboard/sites/new"
            className="flex items-center gap-1.5 px-3 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
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
            <span className="hidden sm:inline">{t.dashboard.newSite}</span>
          </a>
        )}
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
        <NotificationBell />
      </div>
    </header>
  );
}

function getPageLabel(pathname: string, t: DashboardMessages): string | null {
  if (pathname === "/dashboard") return null;
  if (pathname.includes("/analytics")) return t.nav.analytics;
  if (pathname.includes("/scan")) return t.nav.wcagScan;
  if (pathname.includes("/statement")) return t.nav.statement;
  if (pathname.includes("/delete")) return t.nav.deleteSite;
  if (pathname.includes("/sites/new")) return t.nav.newSite;
  if (pathname.includes("/sites/")) return t.nav.customize;
  if (pathname.includes("/billing")) return t.settings.billing;
  if (pathname.includes("/audit-log")) return t.settings.auditLog;
  if (pathname.includes("/settings")) return t.nav.settings;
  if (pathname.includes("/statistics")) return t.nav.statistics;
  if (pathname.includes("/notifications")) return t.nav.notifications;
  return null;
}
