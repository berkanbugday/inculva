import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { logAudit } from "@/lib/audit";
import { Prisma } from "@inculva/db";

interface Params {
  params: Promise<{ id: string }>;
}

// Strip protocol and trailing slashes so users can paste full URLs.
// e.g. "https://example.com/" → "example.com"
function normaliseDomain(raw: string): string {
  return raw.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
}

// Allows plain hostnames, sub-domains, and optional :port
const DOMAIN_RE = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(:\d{1,5})?$/i;

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const updateData: { name?: string; domain?: string } = {};

  if ("name" in body) {
    if (typeof body.name !== "string") {
      return NextResponse.json({ error: "name must be a string" }, { status: 400 });
    }
    const name = body.name.trim();
    if (name.length < 1 || name.length > 100) {
      return NextResponse.json({ error: "name must be 1–100 characters" }, { status: 400 });
    }
    updateData.name = name;
  }

  if ("domain" in body) {
    if (typeof body.domain !== "string") {
      return NextResponse.json({ error: "domain must be a string" }, { status: 400 });
    }
    const domain = normaliseDomain(body.domain);
    if (domain.length < 1 || domain.length > 253) {
      return NextResponse.json({ error: "domain must be 1–253 characters" }, { status: 400 });
    }
    if (!DOMAIN_RE.test(domain)) {
      return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
    }
    updateData.domain = domain;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "Provide at least one of: name, domain" }, { status: 400 });
  }

  // Ownership check
  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    select: { id: true },
  });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const updated = await db.site.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, domain: true, updatedAt: true },
    });

    if (updateData.name) {
      logAudit({ userId: session.user.id, action: "site.renamed", resource: "site", resourceId: id, meta: { name: updateData.name } });
    }
    if (updateData.domain) {
      logAudit({ userId: session.user.id, action: "site.domain_updated", resource: "site", resourceId: id, meta: { domain: updateData.domain } });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: "This domain is already registered to another site" }, { status: 409 });
    }
    throw err;
  }
}
