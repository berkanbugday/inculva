import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { token } = await params;

  const invite = await db.teamInvite.findUnique({
    where: { token },
    select: { id: true, email: true, acceptedAt: true },
  });

  if (!invite) return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  if (invite.email.toLowerCase() !== session.user.email.toLowerCase()) {
    return NextResponse.json({ error: "This invite is for a different email address" }, { status: 403 });
  }

  await db.teamInvite.delete({ where: { id: invite.id } });

  return NextResponse.json({ success: true });
}
