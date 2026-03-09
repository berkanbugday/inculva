import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { logAudit } from "@/lib/audit";

interface Params {
  params: Promise<{ id: string }>;
}

// DELETE /api/keys/:id — revoke an API key
export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const key = await db.apiKey.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!key) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.apiKey.update({
    where: { id },
    data: { revokedAt: new Date() },
  });

  logAudit({
    userId: session.user.id,
    action: "api_key.revoked",
    resource: "api_key",
    resourceId: id,
    meta: { name: key.name, keyPrefix: key.keyPrefix },
  });

  return NextResponse.json({ success: true });
}
