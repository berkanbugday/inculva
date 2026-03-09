import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { logAudit } from "@/lib/audit";

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

// GET /api/keys — list all API keys for user
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await db.apiKey.findMany({
    where: { userId: session.user.id, revokedAt: null },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: keys });
}

// POST /api/keys — create a new API key
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { name?: string; expiresInDays?: number };
  const name = body.name?.trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (name.length > 100) return NextResponse.json({ error: "Name too long (max 100 chars)" }, { status: 400 });

  // Enforce plan-based API key limit
  const KEY_LIMITS: Record<string, number> = { free: 5, pro: 20 }; // business = unlimited
  const userPlan = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });
  const maxKeys = KEY_LIMITS[userPlan?.plan ?? "free"] ?? 5;
  if (isFinite(maxKeys)) {
    const keyCount = await db.apiKey.count({
      where: { userId: session.user.id, revokedAt: null },
    });
    if (keyCount >= maxKeys) {
      return NextResponse.json(
        { error: `Your plan allows up to ${maxKeys} active API keys` },
        { status: 403 }
      );
    }
  }

  // Generate key: "ink_" prefix + 32 random hex bytes
  const rawKey = `ink_${randomBytes(32).toString("hex")}`;
  const keyHash = hashKey(rawKey);
  const keyPrefix = rawKey.slice(0, 12); // "ink_" + first 8 chars

  if (
    body.expiresInDays !== undefined &&
    (typeof body.expiresInDays !== "number" ||
      body.expiresInDays < 1 ||
      body.expiresInDays > 3650)
  ) {
    return NextResponse.json(
      { error: "expiresInDays must be between 1 and 3650" },
      { status: 400 }
    );
  }

  const expiresAt =
    body.expiresInDays
      ? new Date(Date.now() + body.expiresInDays * 24 * 60 * 60 * 1000)
      : null;

  await db.apiKey.create({
    data: {
      userId: session.user.id,
      name,
      keyHash,
      keyPrefix,
      ...(expiresAt ? { expiresAt } : {}),
    },
  });

  logAudit({
    userId: session.user.id,
    action: "api_key.created",
    resource: "api_key",
    meta: { name, keyPrefix },
  });

  // Return the raw key ONCE — it cannot be retrieved again
  return NextResponse.json({ success: true, data: { key: rawKey, name, keyPrefix } });
}
