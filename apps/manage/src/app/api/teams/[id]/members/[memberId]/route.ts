import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

interface Params {
  params: Promise<{ id: string; memberId: string }>;
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: teamId, memberId } = await params;

  const team = await db.team.findFirst({
    where: {
      id: teamId,
      members: { some: { userId: session.user.id, role: "admin" } },
    },
  });

  if (!team) return NextResponse.json({ error: "Not found or not admin" }, { status: 404 });

  const member = await db.teamMember.findFirst({
    where: { id: memberId, teamId },
  });

  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (member.userId === team.ownerId) {
    return NextResponse.json({ error: "Cannot remove team owner" }, { status: 400 });
  }

  // Non-owner admins cannot remove other admins — only the team owner can
  const isRequesterOwner = session.user.id === team.ownerId;
  if (!isRequesterOwner && member.role === "admin") {
    return NextResponse.json({ error: "Only the team owner can remove admins" }, { status: 403 });
  }

  await db.teamMember.delete({ where: { id: memberId } });
  return NextResponse.json({ success: true });
}
