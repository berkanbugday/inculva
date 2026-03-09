import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { generateWebhookSecret } from "@/lib/webhooks";
import { logAudit } from "@/lib/audit";
import { headers } from "next/headers";

const VALID_EVENTS = [
  "site.config_updated",
  "usage.warning",
  "usage.limit",
  "payment.failed",
] as const;

const MAX_WEBHOOKS = 10;

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const webhooks = await db.webhook.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      url: true,
      events: true,
      enabled: true,
      createdAt: true,
      // secret intentionally omitted from list response
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: webhooks });
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { url, events } = body as { url?: unknown; events?: unknown };

  // Validate URL
  if (typeof url !== "string" || url.length > 500) {
    return NextResponse.json({ error: "url must be a string (max 500 chars)" }, { status: 400 });
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "url must be a valid HTTPS URL" }, { status: 400 });
  }
  if (parsed.protocol !== "https:") {
    return NextResponse.json({ error: "url must use HTTPS" }, { status: 400 });
  }

  // Validate events
  if (!Array.isArray(events) || events.length === 0) {
    return NextResponse.json({ error: "events must be a non-empty array" }, { status: 400 });
  }
  const invalidEvents = (events as string[]).filter(
    (e) => !(VALID_EVENTS as readonly string[]).includes(e),
  );
  if (invalidEvents.length > 0) {
    return NextResponse.json(
      { error: `Invalid event types: ${invalidEvents.join(", ")}` },
      { status: 400 },
    );
  }

  // Enforce per-user limit
  const count = await db.webhook.count({ where: { userId: session.user.id } });
  if (count >= MAX_WEBHOOKS) {
    return NextResponse.json(
      { error: `Maximum ${MAX_WEBHOOKS} webhooks per account` },
      { status: 422 },
    );
  }

  const secret = generateWebhookSecret();

  const webhook = await db.webhook.create({
    data: {
      userId: session.user.id,
      url,
      secret,
      events: events as string[],
    },
    select: { id: true, url: true, events: true, enabled: true, createdAt: true },
  });

  logAudit({
    userId: session.user.id,
    action: "webhook.created",
    resource: "webhook",
    resourceId: webhook.id,
    meta: { url, events },
  });

  // Return secret once — it won't be shown again
  return NextResponse.json({ success: true, data: { ...webhook, secret } }, { status: 201 });
}
