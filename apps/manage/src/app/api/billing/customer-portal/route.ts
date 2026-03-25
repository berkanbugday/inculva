import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { polar, isPolarConfigured } from "@/lib/polar";
import { db } from "@inculva/db";
import { headers } from "next/headers";

export async function GET(_req: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isPolarConfigured()) {
    console.error("[customer-portal] POLAR_ACCESS_TOKEN is not configured");
    return NextResponse.json({ error: "Billing service is not configured" }, { status: 503 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { polarCustomerId: true },
  });

  if (!user?.polarCustomerId) {
    return NextResponse.json({ error: "No billing account found" }, { status: 404 });
  }

  try {
    const customerSession = await polar.customerSessions.create({
      customerId: user.polarCustomerId,
    });

    return NextResponse.redirect(customerSession.customerPortalUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const body = (err as Record<string, unknown>)?.body;
    const statusCode = (err as Record<string, unknown>)?.statusCode;
    console.error("[customer-portal] error:", message, "| status:", statusCode, "| body:", body);
    let detail: unknown = message;
    if (typeof body === "string") {
      try { detail = JSON.parse(body); } catch { detail = body; }
    }
    return NextResponse.json({ error: "Failed to generate portal link", detail, statusCode }, { status: 500 });
  }
}
