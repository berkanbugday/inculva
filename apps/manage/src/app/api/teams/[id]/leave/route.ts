import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { sendEmail } from "@inculva/email";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: teamId } = await params;
  const userId = session.user.id;

  const team = await db.team.findUnique({ where: { id: teamId } });
  if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

  if (team.ownerId === userId) {
    return NextResponse.json(
      { error: "Team owner cannot leave. Transfer ownership or delete the team." },
      { status: 400 },
    );
  }

  const membership = await db.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!membership) return NextResponse.json({ error: "Not a member" }, { status: 404 });

  await db.teamMember.delete({ where: { id: membership.id } });

  // Notify the team owner in-app and via email
  const leavingUser = await db.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });
  const owner = await db.user.findUnique({
    where: { id: team.ownerId },
    select: { id: true, name: true, email: true },
  });

  if (owner && owner.id !== userId) {
    const displayName = leavingUser?.name ?? leavingUser?.email ?? "A team member";
    void Promise.all([
      db.notification.create({
        data: {
          userId: owner.id,
          type: "info",
          title: `${displayName} left ${team.name}`,
          body: `${displayName} has left your team.`,
          href: `/dashboard/teams/${teamId}`,
        },
      }),
      sendEmail({
        to: owner.email,
        subject: `${displayName} left your team — Inculva`,
        html: `<p>Hi ${owner.name ?? "there"},</p><p><strong>${displayName}</strong> has left your team <strong>${team.name}</strong> on Inculva.</p><p><a href="${process.env["BETTER_AUTH_URL"] ?? "https://app.inculva.com"}/dashboard/teams/${teamId}">View your team →</a></p>`,
      }),
    ]).catch(console.error);
  }

  return NextResponse.json({ success: true });
}
