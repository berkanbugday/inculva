import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { scanUrl } from "@/lib/scanner";

// Allow up to 60 seconds for scanning slow sites
export const maxDuration = 60;

// Per-user scan rate limit: 5 scans per 10 minutes (in-memory, resets on restart)
const scanRateMap = new Map<string, number[]>();
const SCAN_WINDOW_MS = 10 * 60 * 1000;
const SCAN_MAX_PER_WINDOW = 5;

function checkScanRateLimit(userId: string): boolean {
  const now = Date.now();
  const timestamps = (scanRateMap.get(userId) ?? []).filter(
    (t) => now - t < SCAN_WINDOW_MS
  );
  if (timestamps.length >= SCAN_MAX_PER_WINDOW) return false;
  timestamps.push(now);
  scanRateMap.set(userId, timestamps);
  return true;
}

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 5 scans per 10 minutes per user
  if (!checkScanRateLimit(session.user.id)) {
    return NextResponse.json(
      { error: "Too many scans — try again in a few minutes" },
      { status: 429 }
    );
  }

  const { id } = await params;
  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
  });
  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as { url?: string };
  if (!body.url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // Only allow http(s) URLs that match this site's domain (SSRF prevention)
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(body.url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("only http/https allowed");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Strip www. and normalize both hostnames for comparison
  const normalize = (h: string) => h.toLowerCase().replace(/^www\./, "");
  const requestedHost = normalize(parsedUrl.hostname);
  const siteHost = normalize(site.domain.replace(/^https?:\/\//, "").split("/")[0]);

  if (requestedHost !== siteHost) {
    return NextResponse.json(
      { error: "URL must match this site's domain" },
      { status: 400 }
    );
  }

  try {
    const result = await scanUrl(parsedUrl.href);

    // Persist scan result so the WCAG badge can reflect actual state
    await db.widgetConfig.updateMany({
      where: { siteId: id },
      data: {
        lastScanViolations: result.violations.length,
        lastScanAt: new Date(result.scannedAt),
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scan failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
