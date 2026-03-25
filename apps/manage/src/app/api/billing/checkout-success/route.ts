import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { polar, isPolarConfigured } from "@/lib/polar";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { POLAR_PRODUCTS } from "@inculva/types";
import type { Plan } from "@inculva/types";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isPolarConfigured()) {
    return NextResponse.json({ error: "Billing service is not configured" }, { status: 503 });
  }

  const checkoutId = req.nextUrl.searchParams.get("checkoutId");
  if (!checkoutId) {
    return NextResponse.json({ error: "Missing checkoutId" }, { status: 400 });
  }

  try {
    const checkout = await polar.checkouts.get({ id: checkoutId });

    if (checkout.status !== "succeeded" && checkout.status !== "confirmed") {
      return NextResponse.json({ error: "Checkout not completed", status: checkout.status }, { status: 400 });
    }

    // Find which plan this product maps to
    const productId = checkout.productId ?? checkout.products?.[0]?.id;
    if (!productId) {
      return NextResponse.json({ error: "No product on checkout" }, { status: 400 });
    }

    const product = POLAR_PRODUCTS.find((p) => p.productId === productId && p.productId !== "");
    if (!product) {
      console.error("[checkout-success] Unknown productId:", productId);
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    const plan = product.plan as Plan;

    // Link the Polar customer to this user if not already linked
    const customerId = checkout.customerId;
    if (customerId) {
      await db.user.update({
        where: { id: session.user.id },
        data: { polarCustomerId: customerId },
      });
    }

    // Upsert subscription record
    const now = new Date();
    const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await db.$transaction([
      db.user.update({ where: { id: session.user.id }, data: { plan } }),
      db.subscription.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          polarSubscriptionId: checkout.id, // will be replaced by real sub id via webhook
          polarProductId: productId,
          plan,
          interval: product.interval,
          status: "active",
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
        },
        update: {
          polarProductId: productId,
          plan,
          interval: product.interval,
          status: "active",
          currentPeriodEnd: periodEnd,
        },
      }),
    ]);

    console.log(`[checkout-success] Plan updated to ${plan} for user ${session.user.id}`);
    return NextResponse.json({ ok: true, plan });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[checkout-success] error:", message);
    return NextResponse.json({ error: "Failed to verify checkout", detail: message }, { status: 500 });
  }
}
