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

  // Cascade deletes handle: Session, Account, Site, WidgetConfig, WidgetEvent,
  // ApiKey, Subscription
  await db.user.delete({ where: { id: userId } });

  // Sign out — invalidate cookies
  await auth.api.signOut({ headers: await headers() });

  return NextResponse.json({ ok: true });
}
