import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

const VALID_PLANS = ["free", "small", "medium", "large"] as const;
type Plan = (typeof VALID_PLANS)[number];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminUser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (adminUser?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const plan = body?.plan as Plan | undefined;

  if (!plan || !VALID_PLANS.includes(plan)) {
    return NextResponse.json(
      { error: "Invalid plan. Must be one of: free, small, medium, large" },
      { status: 400 }
    );
  }

  const target = await db.user.findUnique({
    where: { id },
    select: { id: true, subscription: true },
  });

  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await db.user.update({ where: { id }, data: { plan } });

  // If downgrading to free and user has an active subscription, mark it canceled in DB
  if (
    plan === "free" &&
    target.subscription &&
    target.subscription.status === "active"
  ) {
    await db.subscription.update({
      where: { userId: id },
      data: { status: "canceled", canceledAt: new Date() },
    });
  }

  return NextResponse.json({ ok: true });
}
