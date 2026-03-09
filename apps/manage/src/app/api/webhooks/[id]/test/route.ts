import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { deliverWebhooks } from "@/lib/webhooks";
import { headers } from "next/headers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const hook = await db.webhook.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, events: true, url: true, secret: true, enabled: true },
  });
  if (!hook) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Send a test ping using the first subscribed event type
  const testEvent = (hook.events[0] ?? "site.config_updated") as
    | "site.config_updated"
    | "usage.warning"
    | "usage.limit"
    | "payment.failed";

  // Temporarily ensure enabled for test delivery
  const wasEnabled = hook.enabled;
  if (!wasEnabled) {
    await db.webhook.update({ where: { id }, data: { enabled: true } });
  }

  try {
    await deliverWebhooks(session.user.id, testEvent, {
      test: true,
      message: "This is a test payload from Inculva.",
      webhookId: id,
    });
    return NextResponse.json({ success: true, event: testEvent });
  } finally {
    if (!wasEnabled) {
      await db.webhook.update({ where: { id }, data: { enabled: false } });
    }
  }
}
