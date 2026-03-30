import { db } from "@inculva/db";
import { ChangePlanForm } from "./change-plan-form";
import { BanButton } from "../user-actions";
import { cookies } from "next/headers";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

export const metadata = { title: "Admin — Users — inculva" };

const PAGE_SIZE = 50;

async function getUsers(page: number, query: string) {
  const skip = (page - 1) * PAGE_SIZE;
  const where = query
    ? { email: { contains: query, mode: "insensitive" as const } }
    : {};

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        emailVerified: true,
        createdAt: true,
        bannedAt: true,
      },
    }),
    db.user.count({ where }),
  ]);

  return { users, total, pages: Math.ceil(total / PAGE_SIZE) };
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);

  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const query = params.q ?? "";
  const { users, total, pages } = await getUsers(page, query);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold rounded-full uppercase tracking-wide">
            {t.adminUsers.badge}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.adminUsers.title}
            <span className="ml-2 text-base font-normal text-gray-400 dark:text-gray-500">
              ({total.toLocaleString()})
            </span>
          </h1>
        </div>

        <form method="get" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder={t.adminUsers.searchPlaceholder}
            className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.adminUsers.search}
          </button>
          {query && (
            <a
              href="/admin/users"
              className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {t.adminUsers.clear}
            </a>
          )}
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colUser}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colPlan}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colVerified}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colJoined}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colChangePlan}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.adminUsers.colStatus}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    user.bannedAt ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name ?? "—"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      {user.bannedAt && (
                        <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold rounded uppercase tracking-wide">
                          {t.adminUsers.banned}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PlanBadge plan={user.plan} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium ${
                        user.emailVerified
                          ? "text-green-600 dark:text-green-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {user.emailVerified ? t.adminUsers.yes : t.adminUsers.no}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <ChangePlanForm userId={user.id} currentPlan={user.plan} />
                  </td>
                  <td className="px-4 py-3">
                    <BanButton userId={user.id} isBanned={!!user.bannedAt} />
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    {t.adminUsers.noUsersFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {pages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`/admin/users?${new URLSearchParams({
                  ...(query && { q: query }),
                  page: String(page - 1),
                })}`}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </a>
            )}
            {page < pages && (
              <a
                href={`/admin/users?${new URLSearchParams({
                  ...(query && { q: query }),
                  page: String(page + 1),
                })}`}
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

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    free: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    pro: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    business:
      "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
        styles[plan] ?? styles["free"]
      }`}
    >
      {plan}
    </span>
  );
}
