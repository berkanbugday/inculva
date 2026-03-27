"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarLink, SiteGroup, SettingsGroup } from "./sidebar-parts";
import { GridIcon } from "./sidebar-icons";
import { signOut } from "@/lib/auth-client";
import { useDashboard } from "./dashboard-layout-content";

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface Props {
  sites: Site[];
  userName: string | null;
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  sites,
  userName,
  userEmail,
  isOpen,
  onClose,
}: Props) {
  const pathname = usePathname();
  const { messages: t } = useDashboard();
  const [expandedSites, setExpandedSites] = useState<Set<string>>(() => {
    const matched = sites.find((s) => pathname.includes(s.id));
    return matched ? new Set([matched.id]) : new Set();
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const signOutBtnRef = useRef<HTMLButtonElement>(null);

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

  async function handleSignOut() {
    await signOut();
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!popupOpen) return;

    function onMouseDown(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPopupOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    signOutBtnRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popupOpen]);

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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-64 shrink-0 bg-white dark:bg-[#1a1a2e] border-r border-[#e8eaf0] dark:border-[#2a2a3e] h-[calc(100vh-3.5rem)] fixed top-14 left-0 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <SidebarLink
            href="/dashboard"
            active={pathname === "/dashboard"}
            icon={<GridIcon />}
            label={t.nav.sites}
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

          <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] mx-2 my-3" />

          <SettingsGroup isActive={isActive} />
        </nav>

        {/* Pinned user area */}
        <div
          className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 py-4 relative"
          ref={popupRef}
        >
          {popupOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
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
                </div>
              </div>
              <button
                ref={signOutBtnRef}
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              >
                {t.header.signOut}
              </button>
            </div>
          )}

          <button
            onClick={() => setPopupOpen((v) => !v)}
            aria-expanded={popupOpen}
            aria-label="Account menu"
            className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 text-left">
              {userName && (
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {userName}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
