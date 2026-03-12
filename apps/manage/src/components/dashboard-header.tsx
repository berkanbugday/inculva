"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";

interface Props {
  email: string;
  name: string | null;
  locale: string;
  isAdmin?: boolean;
}

export function DashboardHeader({ email, name, locale }: Props) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (email[0]?.toUpperCase() ?? "?");

  return (
    <header className="h-[52px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-5 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* Logo */}
      <a href="/dashboard" className="flex items-center gap-2.5 group">
        <img src="/logo.png" alt="Inculva" className="h-7 w-auto" />
      </a>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <a
          href="/dashboard/sites/new"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
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

        {/* User dropdown */}
        <div ref={dropdownRef} className="relative ml-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 hidden sm:block">
              My account
            </p>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg py-1 z-50">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                {name && (
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {name}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                  {email}
                </p>
              </div>
              <a
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Settings
              </a>
              <a
                href="/dashboard/settings/billing"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="3"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.5" />
                  <rect
                    x="3"
                    y="9"
                    width="3"
                    height="1.5"
                    rx="0.75"
                    fill="currentColor"
                  />
                </svg>
                Billing
              </a>
              <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                <button
                  onClick={() => void handleSignOut()}
                  disabled={signingOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors disabled:opacity-50"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
