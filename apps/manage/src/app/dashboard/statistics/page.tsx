import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StatisticsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const firstSite = await db.site.findFirst({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!firstSite) {
    redirect("/dashboard");
  }

  redirect(`/dashboard/sites/${firstSite.id}/statistics`);
}
