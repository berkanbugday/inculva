import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { logAudit } from "@/lib/audit";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const hook = await db.webhook.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });
  if (!hook) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.webhook.delete({ where: { id } });

  logAudit({
    userId: session.user.id,
    action: "webhook.deleted",
    resource: "webhook",
    resourceId: id,
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const hook = await db.webhook.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });
  if (!hook) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { enabled } = body as { enabled?: unknown };
  if (typeof enabled !== "boolean") {
    return NextResponse.json({ error: "enabled must be boolean" }, { status: 400 });
  }

  const updated = await db.webhook.update({
    where: { id },
    data: { enabled },
    select: { id: true, url: true, events: true, enabled: true },
  });

  return NextResponse.json({ success: true, data: updated });
}
