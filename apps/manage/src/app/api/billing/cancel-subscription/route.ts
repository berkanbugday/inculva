import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { cancelSubscription } from "@/lib/lemonsqueezy";
import { headers } from "next/headers";

export async function POST(_req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const sub = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { lsSubscriptionId: true, status: true },
  });

  if (!sub) {
    return NextResponse.json({ ok: false, error: "No active subscription" }, { status: 400 });
  }

  if (sub.status === "canceled") {
    return NextResponse.json({ ok: false, error: "Already canceled" }, { status: 400 });
  }

  const { error } = await cancelSubscription(sub.lsSubscriptionId);
  if (error) {
    console.error("[cancel-subscription]", error);
    return NextResponse.json({ ok: false, error: "Cancellation failed" }, { status: 500 });
  }

  // Webhook fires subscription_cancelled to handle plan downgrade — optimistically mark here
  await db.subscription.update({
    where: { userId: session.user.id },
    data: { status: "canceled", canceledAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
