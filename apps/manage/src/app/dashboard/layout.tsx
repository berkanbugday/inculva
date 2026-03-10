import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { email, name, emailVerified } = session.user;
  const locale = (await cookies()).get("locale")?.value ?? "en";

  const [user, sites] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, bannedAt: true },
    }),
    db.site.findMany({
      where: { ownerId: session.user.id },
      select: { id: true, name: true, domain: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  if (user?.bannedAt) redirect("/banned");
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <DashboardHeader email={email} name={name ?? null} locale={locale} isAdmin={isAdmin} />
      {!emailVerified && <VerificationBanner email={email} />}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sites={sites} isAdmin={isAdmin} />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
