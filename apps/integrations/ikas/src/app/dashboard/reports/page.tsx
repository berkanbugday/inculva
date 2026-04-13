import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export default async function ReportsPage() {
  const session = await getSession();
  if (!session.siteId) redirect("/");

  const dashboardUrl = `${env.inculvaAppUrl}/dashboard/sites/${session.siteId}`;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-lg font-semibold text-gray-900 mb-2">
        Accessibility reports
      </h1>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        View detailed WCAG compliance scans, issue reports, and accessibility
        scores on the inculva dashboard.
      </p>
      <a
        href={dashboardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Open inculva dashboard &rarr;
      </a>
    </div>
  );
}
