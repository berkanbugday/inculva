import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { checkSiteHealth } from "@/lib/health-check";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const { id } = await params;

  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    select: { domain: true, id: true },
  });

  if (!site) return NextResponse.json({ ok: false }, { status: 404 });

  const result = await checkSiteHealth(site.domain, site.id);
  return NextResponse.json(result);
}
