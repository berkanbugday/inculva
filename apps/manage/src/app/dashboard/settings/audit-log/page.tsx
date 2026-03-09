import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  "site.created":         { label: "Site created",         color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  "site.renamed":         { label: "Site renamed",         color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  "site.deleted":         { label: "Site deleted",         color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  "site.config_updated":  { label: "Config updated",       color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  "api_key.created":      { label: "API key created",      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
  "api_key.revoked":      { label: "API key revoked",      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
  "webhook.created":      { label: "Webhook created",      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
  "webhook.deleted":      { label: "Webhook deleted",      color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function AuditLogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();

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
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and API access.</p>
      </div>

      {/* Settings sub-nav */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <a
          href="/dashboard/settings"
          className="px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
        >
          Account
        </a>
        <a
          href="/dashboard/settings/billing"
          className="px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
        >
          Billing
        </a>
        <span className="px-4 py-1.5 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white shadow-sm">
          Audit Log
        </span>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Audit Log</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Last 100 actions on your account.
            </p>
          </div>
          {logs.length > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-600">{logs.length} entries</span>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-600">No activity recorded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {logs.map((log) => {
              const style = ACTION_LABELS[log.action] ?? {
                label: log.action,
                color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
              };
              const meta = log.meta as Record<string, string | number | boolean> | null;

              // Build a short description from meta
              let detail = "";
              if (meta?.domain) detail = String(meta.domain);
              else if (meta?.name) detail = String(meta.name);
              else if (meta?.url) detail = String(meta.url);
              else if (log.resourceId) detail = log.resourceId.slice(0, 12) + "…";

              return (
                <div key={log.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style.color}`}>
                        {style.label}
                      </span>
                      {detail && (
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate max-w-xs">
                          {detail}
                        </span>
                      )}
                    </div>
                    {log.ip && (
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 font-mono">{log.ip}</p>
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
