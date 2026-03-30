import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { polar, isPolarConfigured } from "@/lib/polar";
import { headers } from "next/headers";
import { POLAR_PRODUCTS } from "@inculva/types";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isPolarConfigured()) {
    console.error("[checkout] POLAR_ACCESS_TOKEN is not configured");
    return NextResponse.json({ error: "Billing service is not configured" }, { status: 503 });
  }

  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId || typeof productId !== "string") {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  const product = POLAR_PRODUCTS.find((p) => p.productId === productId && p.productId !== "");
  if (!product) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      allowTrial: false, // plan starts immediately — free 7-day use is on the free plan
      customerEmail: session.user.email,
      customerName: session.user.name ?? undefined,
      successUrl: `${process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000"}/dashboard/settings/billing?checkoutId={CHECKOUT_ID}`,
      metadata: { userId: session.user.id },
    });

    return NextResponse.redirect(checkout.url);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const statusCode = (err as Record<string, unknown>)?.statusCode;
    console.error("[checkout] error:", message, "| status:", statusCode);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
