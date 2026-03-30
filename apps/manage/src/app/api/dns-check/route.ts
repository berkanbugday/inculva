import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dns from "node:dns/promises";

const DOMAIN_RE =
  /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    domain?: string;
  } | null;

  const raw = body?.domain?.trim().toLowerCase();
  if (!raw || !DOMAIN_RE.test(raw)) {
    return NextResponse.json(
      { ok: false, error: "Invalid domain format" },
      { status: 400 },
    );
  }

  try {
    const addresses = await dns.resolve4(raw).catch(() => null);
    const addresses6 = addresses
      ? null
      : await dns.resolve6(raw).catch(() => null);
    const cname =
      !addresses && !addresses6
        ? await dns.resolveCname(raw).catch(() => null)
        : null;

    if (addresses || addresses6 || cname) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({
      ok: false,
      error: "NO_DNS_RECORDS",
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: "DNS_LOOKUP_FAILED",
    });
  }
}
