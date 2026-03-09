import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

async function requireAdmin(session: Awaited<ReturnType<typeof auth.api.getSession>>) {
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const adminUser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (adminUser?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

// POST /api/admin/users/[id]/ban — ban user (set bannedAt, delete sessions)
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const err = await requireAdmin(session);
  if (err) return err;

  const { id } = await params;

  if (id === session!.user.id) {
    return NextResponse.json({ error: "Cannot ban yourself" }, { status: 400 });
  }

  const target = await db.user.findUnique({
    where: { id },
    select: { id: true, role: true },
  });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (target.role === "admin") {
    return NextResponse.json({ error: "Cannot ban another admin" }, { status: 400 });
  }

  // Set bannedAt and immediately invalidate all sessions
  await db.$transaction([
    db.user.update({ where: { id }, data: { bannedAt: new Date() } }),
    db.session.deleteMany({ where: { userId: id } }),
  ]);

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/users/[id]/ban — unban user (clear bannedAt)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const err = await requireAdmin(session);
  if (err) return err;

  const { id } = await params;

  const target = await db.user.findUnique({ where: { id }, select: { id: true } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await db.user.update({ where: { id }, data: { bannedAt: null } });

  return NextResponse.json({ ok: true });
}
