import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { polar } from "@/lib/polar";
import { headers } from "next/headers";

export async function DELETE(_req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const userId = session.user.id;

  // Cancel any active Polar subscription first (best-effort, immediate revocation)
  const sub = await db.subscription.findUnique({
    where: { userId },
    select: { polarSubscriptionId: true, status: true },
  });

  if (sub && sub.status !== "canceled") {
    try {
      await polar.subscriptions.revoke({ id: sub.polarSubscriptionId });
    } catch {
      // Non-fatal — proceed with account deletion
    }
  }

  // Cascade deletes handle: Session, Account, Site, WidgetConfig, WidgetEvent,
  // ApiKey, Subscription
  await db.user.delete({ where: { id: userId } });

  // Sign out — invalidate cookies
  await auth.api.signOut({ headers: await headers() });

  const res = NextResponse.json({ ok: true });
  res.cookies.delete("better-auth.session_token");
  return res;
}
