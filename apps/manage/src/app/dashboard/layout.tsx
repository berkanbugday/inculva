import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import crypto from "crypto";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { email, name, emailVerified } = session.user;
  const locale = (await cookies()).get("locale")?.value ?? "en";

  const [user, pendingInviteCount] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, bannedAt: true },
    }),
    db.teamInvite.count({
      where: {
        email: { equals: email, mode: "insensitive" },
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
    }),
  ]);
  if (user?.bannedAt) redirect("/banned");
  const isAdmin = user?.role === "admin";

  const emailHash = crypto
    .createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=80&d=404`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader email={email} name={name ?? null} locale={locale} isAdmin={isAdmin} gravatarUrl={gravatarUrl} pendingInviteCount={pendingInviteCount} />
      {!emailVerified && <VerificationBanner email={email} />}
      {children}
    </div>
  );
}
