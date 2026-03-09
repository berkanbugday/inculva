import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { cancelSubscription } from "@/lib/lemonsqueezy";
import { headers } from "next/headers";

export async function DELETE(_req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const userId = session.user.id;

  // Cancel any active LemonSqueezy subscription first (best-effort)
  const sub = await db.subscription.findUnique({
    where: { userId },
    select: { lsSubscriptionId: true, status: true },
  });

  if (sub && sub.status === "active") {
    try {
      await cancelSubscription(sub.lsSubscriptionId);
    } catch {
      // Non-fatal — proceed with deletion
    }
  }

  // Notify team members of teams this user owns — their team will be deleted by cascade
  const ownedTeams = await db.team.findMany({
    where: { ownerId: userId },
    include: {
      members: {
        where: { userId: { not: userId } }, // exclude the owner themselves
        select: { userId: true },
      },
    },
  });

  for (const team of ownedTeams) {
    if (team.members.length > 0) {
      await db.notification.createMany({
        data: team.members.map((m) => ({
          userId: m.userId,
          type: "info",
          title: `Team "${team.name}" has been dissolved`,
          body: "The team owner has deleted their account. The team and all associated data have been removed.",
          href: "/dashboard/teams",
        })),
        skipDuplicates: true,
      });
    }
  }

  // Cascade deletes handle: Session, Account, Site, WidgetConfig, WidgetEvent,
  // ApiKey, Subscription, ownedTeams, teamMemberships
  await db.user.delete({ where: { id: userId } });

  // Sign out — invalidate cookies
  await auth.api.signOut({ headers: await headers() });

  return NextResponse.json({ ok: true });
}
