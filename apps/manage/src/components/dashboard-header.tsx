"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMessages } from "@/i18n/messages";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";

interface Props {
  email: string;
  name: string | null;
  locale: string;
  isAdmin?: boolean;
  gravatarUrl?: string;
  pendingInviteCount?: number;
}

export function DashboardHeader({ email, name, locale, isAdmin, gravatarUrl, pendingInviteCount = 0 }: Props) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = getMessages(locale);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  }

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : email[0]?.toUpperCase() ?? "?";

  const showGravatar = gravatarUrl && !avatarError;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white">Inculva</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          <a href="/dashboard" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {t.nav.sites}
          </a>
          <a href="/dashboard/teams" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {t.nav.teams}
          </a>
          <a href="/dashboard/invites" className="relative px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Invites
            {pendingInviteCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {pendingInviteCount > 9 ? "9+" : pendingInviteCount}
              </span>
            )}
          </a>
          <a href="/dashboard/settings" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {t.nav.settings}
          </a>
          <a href="/dashboard/settings/billing" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {t.nav.pricing}
          </a>
          <a href="mailto:support@inculva.com" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Help
          </a>
          {isAdmin && (
            <a href="/admin" className="px-3 py-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-lg transition-colors font-medium">
              Admin
            </a>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* User menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
          <NotificationBell />

          <div className="flex items-center gap-2 ml-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
              {showGravatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gravatarUrl}
                  alt={name ?? email}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                initials
              )}
            </div>
            <div className="hidden sm:block text-right">
              {name && <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-none">{name}</p>}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{email}</p>
            </div>
          </div>

          <button
            onClick={() => void handleSignOut()}
            disabled={signingOut}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            {signingOut ? t.header.signingOut : t.header.signOut}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          {[
            { href: "/dashboard", label: t.nav.sites },
            { href: "/dashboard/teams", label: t.nav.teams },
            { href: "/dashboard/invites", label: pendingInviteCount > 0 ? `Invites (${pendingInviteCount})` : "Invites" },
            { href: "/dashboard/settings", label: t.nav.settings },
            { href: "/dashboard/settings/billing", label: t.nav.pricing },
            { href: "mailto:support@inculva.com", label: "Help & Support" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {isAdmin && (
            <a
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950 font-medium transition-colors"
            >
              Admin
            </a>
          )}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => void handleSignOut()}
              disabled={signingOut}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors disabled:opacity-50"
            >
              {signingOut ? t.header.signingOut : t.header.signOut}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
