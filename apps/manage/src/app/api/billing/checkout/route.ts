import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { createCheckout, LS_STORE_ID } from "@/lib/lemonsqueezy";
import { headers } from "next/headers";
import { LS_PRODUCTS } from "@inculva/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as { variantId?: string };
  const { variantId } = body;

  if (!variantId || typeof variantId !== "string") {
    return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
  }

  // Verify billing is configured — missing env vars produce empty variantIds
  if (!LS_STORE_ID) {
    console.error("[checkout] LS_STORE_ID is not configured");
    return NextResponse.json({ error: "Billing service is not configured" }, { status: 503 });
  }

  // Verify the variantId is one of our known products (not a placeholder)
  const product = LS_PRODUCTS.find((p) => p.variantId === variantId && p.variantId !== "");
  if (!product) {
    // Could be a valid-looking ID that doesn't match any product, OR an env var placeholder
    const isPlaceholder = LS_PRODUCTS.some((p) => p.variantId === "" && !variantId);
    return NextResponse.json(
      { error: isPlaceholder ? "Billing service is not configured" : "Invalid plan" },
      { status: isPlaceholder ? 503 : 400 }
    );
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { lsCustomerId: true },
  });

  const { data, error } = await createCheckout(LS_STORE_ID, variantId, {
    checkoutOptions: {
      embed: false,
      media: false,
    },
    checkoutData: {
      email: session.user.email,
      name: session.user.name ?? undefined,
      custom: { userId: session.user.id },
      ...(user?.lsCustomerId ? { customerId: parseInt(user.lsCustomerId, 10) } : {}),
    },
    productOptions: {
      redirectUrl: `${process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000"}/dashboard/settings/billing`,
    },
  });

  if (error || !data?.data.attributes.url) {
    console.error("[checkout]", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }

  return NextResponse.json({ url: data.data.attributes.url });
}
