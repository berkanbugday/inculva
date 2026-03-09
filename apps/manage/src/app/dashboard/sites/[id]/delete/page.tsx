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

  // Cascade delete: WidgetEvents → WidgetConfig → Site
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
    <main className="max-w-xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600">Dashboard</a>
        <span className="text-gray-300">/</span>
        <a href={`/dashboard/sites/${id}`} className="text-gray-400 hover:text-gray-600">
          {site.name}
        </a>
        <span className="text-gray-300">/</span>
        <span className="text-red-600 font-medium">Delete</span>
      </nav>

      <div className="bg-white rounded-2xl border border-red-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-red-600 text-lg">⚠</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Delete site</h2>
            <p className="text-sm text-gray-500 mt-1">
              This will permanently delete{" "}
              <strong className="text-gray-900">{site.name}</strong> (
              <span className="font-mono text-xs">{site.domain}</span>) and all
              associated widget events. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6 text-sm text-red-700 space-y-1">
          <p>The following data will be permanently deleted:</p>
          <ul className="list-disc list-inside mt-2 space-y-0.5 text-red-600">
            <li>Site configuration</li>
            <li>Widget settings</li>
            <li>All analytics events</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <form action={deleteSiteWithId}>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Yes, delete this site
            </button>
          </form>
          <a
            href={`/dashboard/sites/${id}`}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </a>
        </div>
      </div>
    </main>
  );
}
