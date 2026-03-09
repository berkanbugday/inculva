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
    select: { id: true, teamId: true, email: true, role: true, expiresAt: true, acceptedAt: true },
  });

  if (!invite) return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  if (invite.acceptedAt) return NextResponse.json({ error: "Invite already accepted" }, { status: 409 });
  if (invite.expiresAt < new Date()) return NextResponse.json({ error: "Invite expired" }, { status: 400 });
  if (invite.email.toLowerCase() !== session.user.email.toLowerCase()) {
    return NextResponse.json({ error: "This invite is for a different email address" }, { status: 403 });
  }

  // Check if already a member
  const existing = await db.teamMember.findUnique({
    where: { teamId_userId: { teamId: invite.teamId, userId: session.user.id } },
  });
  if (existing) return NextResponse.json({ error: "Already a team member" }, { status: 409 });

  await db.$transaction([
    db.teamMember.create({
      data: { teamId: invite.teamId, userId: session.user.id, role: invite.role },
    }),
    db.teamInvite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true, teamId: invite.teamId });
}
