import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { NotificationsClient } from "./notifications-client";

export const metadata = { title: "Notifications — Inculva" };

interface Props {
  searchParams: Promise<{ page?: string; filter?: string }>;
}

export default async function NotificationsPage({ searchParams }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const filter = params.filter === "unread" ? "unread" : "all";
  const take = 50;
  const skip = (page - 1) * take;

  const where = {
    userId: session.user.id,
    ...(filter === "unread" ? { readAt: null } : {}),
  };

  const [notifications, total] = await Promise.all([
    db.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      select: {
        id: true,
        type: true,
        title: true,
        body: true,
        href: true,
        readAt: true,
        createdAt: true,
      },
    }),
    db.notification.count({ where }),
  ]);

  const unreadCount = await db.notification.count({
    where: { userId: session.user.id, readAt: null },
  });

  const pages = Math.ceil(total / take);

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm font-semibold rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <NotificationsClient.MarkAllRead />
          )}
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">
            <a
              href="/dashboard/notifications?filter=all"
              className={`px-3 py-1.5 transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              All
            </a>
            <a
              href="/dashboard/notifications?filter=unread"
              className={`px-3 py-1.5 transition-colors border-l border-gray-200 dark:border-gray-700 ${
                filter === "unread"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Unread
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationsClient.Item
              key={n.id}
              id={n.id}
              type={n.type}
              title={n.title}
              body={n.body}
              href={n.href ?? null}
              readAt={n.readAt?.toISOString() ?? null}
              createdAt={n.createdAt.toISOString()}
            />
          ))
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {pages} · {total} total
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`/dashboard/notifications?${new URLSearchParams({ filter, page: String(page - 1) })}`}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </a>
            )}
            {page < pages && (
              <a
                href={`/dashboard/notifications?${new URLSearchParams({ filter, page: String(page + 1) })}`}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
