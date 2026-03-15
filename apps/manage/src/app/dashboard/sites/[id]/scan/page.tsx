import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { ScannerClient } from "./scanner-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ScanPage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const site = await db.site.findFirst({
    where: { id, ownerId: session!.user.id },
  });

  if (!site) notFound();

  return (
    <main className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <a
          href="/dashboard"
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          Dashboard
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <a
          href={`/dashboard/sites/${site.id}`}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          {site.name}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          WCAG Scan
        </span>
      </nav>

      {/* Sub-nav */}
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { label: "Config", href: `/dashboard/sites/${site.id}` },
          { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
          {
            label: "WCAG Scan",
            href: `/dashboard/sites/${site.id}/scan`,
            active: true,
          },
          { label: "Statement", href: `/dashboard/sites/${site.id}/statement` },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              tab.active
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <ScannerClient siteId={site.id} domain={site.domain} />
    </main>
  );
}
