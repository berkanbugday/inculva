import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

interface Params {
  params: Promise<{ id: string; inviteId: string }>;
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: teamId, inviteId } = await params;

  const invite = await db.teamInvite.findFirst({
    where: {
      id: inviteId,
      teamId,
      team: { members: { some: { userId: session.user.id, role: "admin" } } },
    },
  });

  if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.teamInvite.delete({ where: { id: inviteId } });
  return NextResponse.json({ success: true });
}
