import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

export default async function AuditLogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();

  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);

  const ACTION_LABELS: Record<string, { label: string; color: string }> = {
    "site.created": {
      label: t.auditLog.siteCreated,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    "site.renamed": {
      label: t.auditLog.siteRenamed,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    "site.deleted": {
      label: t.auditLog.siteDeleted,
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
    "site.config_updated": {
      label: t.auditLog.configUpdated,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    "api_key.created": {
      label: t.auditLog.apiKeyCreated,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    "api_key.revoked": {
      label: t.auditLog.apiKeyRevoked,
      color:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    },
    "webhook.created": {
      label: t.auditLog.webhookCreated,
      color:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    },
    "webhook.deleted": {
      label: t.auditLog.webhookDeleted,
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
  };

  function timeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return t.timeAgo.justNow;
    if (mins < 60) return `${mins}${t.timeAgo.minutesAgo}`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}${t.timeAgo.hoursAgo}`;
    return `${Math.floor(hours / 24)}${t.timeAgo.daysAgo}`;
  }

  const logs = await db.auditLog.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      action: true,
      resource: true,
      resourceId: true,
      meta: true,
      ip: true,
      createdAt: true,
    },
  });

  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          {t.auditLog.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t.auditLog.description}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm overflow-hidden">
        {logs.length > 0 && (
          <div className="px-6 py-3 border-b border-[#e8eaf0] dark:border-[#2a2a3e] flex items-center justify-end">
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {logs.length} {t.auditLog.entries}
            </span>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-600">
              {t.auditLog.noActivity}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e]">
            {logs.map((log) => {
              const style = ACTION_LABELS[log.action] ?? {
                label: log.action,
                color:
                  "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
              };
              const meta = log.meta as Record<
                string,
                string | number | boolean
              > | null;

              // Build a short description from meta
              let detail = "";
              if (meta?.domain) detail = String(meta.domain);
              else if (meta?.name) detail = String(meta.name);
              else if (meta?.url) detail = String(meta.url);
              else if (log.resourceId)
                detail = log.resourceId.slice(0, 12) + "…";

              return (
                <div key={log.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style.color}`}
                      >
                        {style.label}
                      </span>
                      {detail && (
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate max-w-xs">
                          {detail}
                        </span>
                      )}
                    </div>
                    {log.ip && (
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 font-mono">
                        {log.ip}
                      </p>
                    )}
                  </div>
                  <time
                    className="text-xs text-gray-400 dark:text-gray-600 shrink-0 whitespace-nowrap"
                    title={log.createdAt.toISOString()}
                  >
                    {timeAgo(log.createdAt)}
                  </time>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
