import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"] ?? "https://app.inculva.com";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { code?: string };
  const code = typeof body.code === "string" ? body.code.trim() : "";

  if (!code) {
    return NextResponse.json({ error: "Missing referral code" }, { status: 400 });
  }

  const referredId = session.user.id;

  // Find referrer by code
  const referrer = await db.user.findUnique({
    where: { referralCode: code },
    select: { id: true },
  });

  if (!referrer) {
    return NextResponse.json({ error: "Invalid referral code" }, { status: 404 });
  }

  // Cannot use own referral code
  if (referrer.id === referredId) {
    return NextResponse.json({ error: "Cannot use your own referral code" }, { status: 400 });
  }

  // Check if already referred
  const existing = await db.referral.findUnique({ where: { referredId } });
  if (existing) {
    return NextResponse.json({ error: "Referral already applied" }, { status: 409 });
  }

  // Create referral record + notify referrer
  await db.$transaction([
    db.referral.create({
      data: { referrerId: referrer.id, referredId },
    }),
    db.notification.create({
      data: {
        userId: referrer.id,
        type: "referral",
        title: "Someone used your referral link!",
        body: "A new user signed up using your referral link.",
        href: `${APP_URL}/dashboard/settings`,
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}
