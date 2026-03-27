"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessages } from "@/i18n/useMessages";

const TYPE_ICON: Record<string, React.ReactNode> = {
  usage_warning: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-500"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  usage_limit: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  payment_failed: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
      aria-hidden="true"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  health_degraded: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-500"
      aria-hidden="true"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
    aria-hidden="true"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

function NotificationItem({
  id,
  type,
  title,
  body,
  href,
  readAt,
  createdAt,
}: {
  id: string;
  type: string;
  title: string;
  body: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
}) {
  const router = useRouter();
  const t = useMessages();
  const [isRead, setIsRead] = useState(!!readAt);

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return t.timeAgo.justNow;
    if (mins < 60) return `${mins}${t.timeAgo.minutesAgo}`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}${t.timeAgo.hoursAgo}`;
    return `${Math.floor(hours / 24)}${t.timeAgo.daysAgo}`;
  }

  async function markRead() {
    if (isRead) return;
    const response = await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
    }).catch(() => null);
    if (response?.ok) {
      setIsRead(true);
      router.refresh();
    }
  }

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      onClick={() => void markRead()}
      className={`flex gap-4 px-6 py-4 transition-colors cursor-pointer ${
        isRead
          ? "hover:bg-gray-50 dark:hover:bg-gray-800/50"
          : "bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50"
      }`}
    >
      <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {TYPE_ICON[type] ?? DEFAULT_ICON}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-medium leading-snug ${
              isRead
                ? "text-gray-700 dark:text-gray-300"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {title}
          </p>
          {!isRead && (
            <span
              className="shrink-0 mt-1 w-2 h-2 rounded-full bg-blue-600"
              aria-label="Unread"
            />
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
          {body}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
          {timeAgo(createdAt)}
        </p>
      </div>
    </Wrapper>
  );
}

function MarkAllRead() {
  const router = useRouter();
  const t = useMessages();
  const [busy, setBusy] = useState(false);

  async function markAll() {
    setBusy(true);
    try {
      await fetch("/api/notifications", { method: "PATCH" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={() => void markAll()}
      disabled={busy}
      className="px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full font-semibold transition-colors disabled:opacity-50"
    >
      {t.notificationsPage.markAllRead}
    </button>
  );
}

export const NotificationsClient = {
  Item: NotificationItem,
  MarkAllRead,
};
