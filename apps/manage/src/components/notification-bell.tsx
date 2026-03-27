"use client";

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/i18n/useMessages";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
};

const TYPE_ICON: Record<string, string> = {
  plan_upgraded: "⬆️",
  usage_warning: "⚠️",
  usage_limit: "🚫",
};

export function NotificationBell() {
  const t = useMessages();

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return t.timeAgo.justNow;
    if (mins < 60) return `${mins}${t.timeAgo.minutesAgo}`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}${t.timeAgo.hoursAgo}`;
    return `${Math.floor(hours / 24)}${t.timeAgo.daysAgo}`;
  }
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.readAt).length;

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setNotifications(json.data as Notification[]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleOpen() {
    setOpen((v) => !v);
    // Mark all as read when opening
    if (!open && unread > 0) {
      fetch("/api/notifications", { method: "PATCH" }).catch(() => {});
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          readAt: n.readAt ?? new Date().toISOString(),
        })),
      );
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleOpen}
        aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ""}`}
        className="relative w-9 h-9 flex items-center justify-center rounded-2xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0e0e10] transition-colors cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-3xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e8eaf0] dark:border-[#2a2a3e] flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {t.notificationsPage.title}
            </span>
            {unread === 0 && !loading && (
              <span className="text-xs text-gray-400 dark:text-gray-600">
                {t.notificationsPage.allCaughtUp}
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e]">
            {loading ? (
              <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-600">
                {t.notificationsPage.loading}
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-400 dark:text-gray-600">
                  {t.notificationsPage.noNotifications}
                </p>
              </div>
            ) : (
              notifications.map((n) => {
                const Wrapper = n.href ? "a" : "div";
                return (
                  <Wrapper
                    key={n.id}
                    {...(n.href ? { href: n.href } : {})}
                    className="flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lg shrink-0 mt-0.5">
                      {TYPE_ICON[n.type] ?? "🔔"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                        {n.body}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                  </Wrapper>
                );
              })
            )}
          </div>
          <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 py-2">
            <a
              href="/dashboard/notifications"
              onClick={() => setOpen(false)}
              className="block text-center text-xs text-blue-600 dark:text-blue-400 hover:underline py-1 cursor-pointer"
            >
              {t.notificationsPage.viewAll}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
