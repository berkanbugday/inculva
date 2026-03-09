import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { sendEmail, teamInviteTemplate } from "@inculva/email";
import { randomBytes } from "crypto";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: teamId } = await params;

  const team = await db.team.findFirst({
    where: {
      id: teamId,
      members: { some: { userId: session.user.id, role: "admin" } },
    },
    include: {
      members: true,
      owner: { select: { plan: true } },
    },
  });

  if (!team) return NextResponse.json({ error: "Not found or not admin" }, { status: 404 });

  // Check plan limits
  const plan = (team.owner.plan ?? "free") as Plan;
  const limits = PLAN_LIMITS[plan];
  if (limits.teamMembers !== Infinity && team.members.length >= limits.teamMembers) {
    return NextResponse.json(
      { error: `Your ${plan} plan allows up to ${limits.teamMembers} team members. Upgrade to add more.` },
      { status: 403 }
    );
  }

  const body = (await request.json()) as { email?: string; role?: string };
  const email = body.email?.trim().toLowerCase();
  const role = body.role === "admin" ? "admin" : "member";

  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  // Check if already a member
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    const alreadyMember = team.members.some((m) => m.userId === existingUser.id);
    if (alreadyMember) {
      return NextResponse.json({ error: "This user is already a team member" }, { status: 409 });
    }
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const invite = await db.teamInvite.create({
    data: { teamId, email, role, token, expiresAt },
  });

  void sendEmail({
    to: email,
    subject: `You've been invited to join ${team.name} on Inculva`,
    html: teamInviteTemplate(session.user.name ?? session.user.email, team.name, role, token),
  }).catch(console.error);

  // Create in-app notification if invitee already has an account
  if (existingUser) {
    void db.notification.create({
      data: {
        userId: existingUser.id,
        type: "team_invite",
        title: `You've been invited to join ${team.name}`,
        body: `${session.user.name ?? session.user.email} invited you as ${role}. Check your email to accept.`,
        href: `/invites/${token}`,
      },
    }).catch(console.error);
  }

  return NextResponse.json({
    success: true,
    data: {
      id: invite.id,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
    },
  });
}
