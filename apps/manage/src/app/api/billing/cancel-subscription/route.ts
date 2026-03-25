import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { polar, isPolarConfigured } from "@/lib/polar";
import { db } from "@inculva/db";
import { headers } from "next/headers";

export async function POST(_req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  if (!isPolarConfigured()) {
    return NextResponse.json({ ok: false, error: "Billing service is not configured" }, { status: 503 });
  }

  const [sub, user] = await Promise.all([
    db.subscription.findUnique({
      where: { userId: session.user.id },
      select: { polarSubscriptionId: true, status: true, canceledAt: true },
    }),
    db.user.findUnique({
      where: { id: session.user.id },
      select: { polarCustomerId: true },
    }),
  ]);

  if (!sub) {
    return NextResponse.json({ ok: false, error: "No active subscription" }, { status: 400 });
  }

  if (sub.status === "canceled" || sub.canceledAt) {
    return NextResponse.json({ ok: false, error: "Already canceled" }, { status: 400 });
  }

  try {
    // Resolve the real Polar subscription ID — the stored ID may be a checkout ID
    // if the webhook hasn't fired yet. Look up via customer ID to get the real one.
    let polarSubId = sub.polarSubscriptionId;

    if (user?.polarCustomerId) {
      const pages = await polar.subscriptions.list({
        customerId: user.polarCustomerId,
        active: true,
      });
      for await (const page of pages) {
        const activeSub = page.result.items[0];
        if (activeSub) {
          polarSubId = activeSub.id;
          // Sync the real subscription ID into the DB
          await db.subscription.update({
            where: { userId: session.user.id },
            data: { polarSubscriptionId: activeSub.id },
          });
        }
        break; // only need first page
      }
    }

    await polar.subscriptions.update({
      id: polarSubId,
      subscriptionUpdate: { cancelAtPeriodEnd: true },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const body = (err as Record<string, unknown>)?.body;
    console.error("[cancel-subscription] error:", message, "| body:", body);
    return NextResponse.json({ ok: false, error: "Cancellation failed", detail: message }, { status: 500 });
  }

  await db.subscription.update({
    where: { userId: session.user.id },
    data: { canceledAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
