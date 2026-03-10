import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ id: string }>;
}

async function deleteSite(siteId: string): Promise<void> {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const site = await db.site.findFirst({
    where: { id: siteId, ownerId: session.user.id },
  });

  if (!site) redirect("/dashboard");

  await db.$transaction([
    db.widgetEvent.deleteMany({ where: { siteId } }),
    db.widgetConfig.deleteMany({ where: { siteId } }),
    db.site.delete({ where: { id: siteId } }),
  ]);

  redirect("/dashboard");
}

export default async function DeleteSitePage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const site = await db.site.findFirst({
    where: { id, ownerId: session!.user.id },
  });

  if (!site) notFound();

  const deleteSiteWithId = deleteSite.bind(null, id);

  return (
    <main className="max-w-lg mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/dashboard" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
          Dashboard
        </a>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-300 dark:text-gray-700" aria-hidden="true">
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <a href={`/dashboard/sites/${id}`} className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors truncate max-w-[120px]">
          {site.name}
        </a>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-300 dark:text-gray-700" aria-hidden="true">
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-red-500 font-medium">Delete</span>
      </nav>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 overflow-hidden">
        {/* Warning header */}
        <div className="bg-red-50 dark:bg-red-950/50 px-6 py-5 border-b border-red-200 dark:border-red-900 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-600 dark:text-red-400" aria-hidden="true">
              <path d="M12 9v4M12 17v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-red-900 dark:text-red-200">Delete site permanently</h2>
            <p className="text-sm text-red-700 dark:text-red-400 mt-0.5">This action cannot be undone.</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            You are about to permanently delete{" "}
            <strong className="text-gray-900 dark:text-white">{site.name}</strong>
            {site.domain !== site.name && (
              <> (<code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{site.domain}</code>)</>
            )}
            {" "}and all associated data.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Data that will be deleted</p>
            <ul className="space-y-1.5 mt-2">
              {["Site configuration & widget settings", "All analytics events", "Widget load history", "WCAG scan results"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-red-400" aria-hidden="true">
                    <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <form action={deleteSiteWithId}>
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Yes, delete this site
            </button>
          </form>
          <a
            href={`/dashboard/sites/${id}`}
            className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </a>
        </div>
      </div>
    </main>
  );
}
