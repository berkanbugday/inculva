import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { DashboardHeader } from "@/components/dashboard-header";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "admin") redirect("/dashboard");

  const locale = (await cookies()).get("locale")?.value ?? "en";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader
        email={session.user.email}
        name={session.user.name ?? null}
        locale={locale}
        isAdmin
      />
      <AdminNav />
      {children}
    </div>
  );
}
