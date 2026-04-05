import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { PLAN_LIMITS, type Plan } from "@inculva/types";

export const maxDuration = 60;

// Per-user scan rate limit (in-memory, resets on restart)
const scanRateMap = new Map<string, number[]>();
const SCAN_WINDOW_MS = 10 * 60 * 1000;
const SCAN_MAX_PER_WINDOW = 5;

function checkScanRateLimit(userId: string): boolean {
  const now = Date.now();
  const timestamps = (scanRateMap.get(userId) ?? []).filter(
    (t) => now - t < SCAN_WINDOW_MS,
  );
  if (timestamps.length === 0) {
    scanRateMap.delete(userId);
  }
  if (timestamps.length >= SCAN_MAX_PER_WINDOW) return false;
  timestamps.push(now);
  scanRateMap.set(userId, timestamps);
  return true;
}

interface Params {
  params: Promise<{ id: string }>;
}

const API_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";
const INTERNAL_API_SECRET = process.env["INTERNAL_API_SECRET"] ?? "";

export async function POST(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!checkScanRateLimit(session.user.id)) {
    return NextResponse.json(
      { error: "Too many scans — try again in a few minutes" },
      { status: 429 },
    );
  }

  const { id } = await params;
  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    include: { owner: { select: { plan: true } } },
  });
  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as {
    url?: string;
    wcagLevel?: string;
    type?: "page" | "site";
    contentLocale?: string;
  };
  const scanType = body.type ?? "page";

  if (!body.url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // Only allow http(s) URLs that match this site's domain
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(body.url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("only http/https allowed");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const normalize = (h: string) =>
    h
      .toLowerCase()
      .replace(/^www\./, "")
      .replace(/:\d+$/, "");
  const requestedHost = normalize(parsedUrl.hostname);
  const siteHost = normalize(
    site.domain.replace(/^https?:\/\//, "").split("/")[0]!,
  );

  if (requestedHost !== siteHost) {
    return NextResponse.json(
      { error: "URL must match this site's domain" },
      { status: 400 },
    );
  }

  const plan = (site.owner?.plan ?? "free") as Plan;
  const limits = PLAN_LIMITS[plan];
  const wcagLevel =
    body.wcagLevel === "A" || body.wcagLevel === "AAA" ? body.wcagLevel : "AA";
  const contentLocale = body.contentLocale === "tr" ? "tr" : "en";

  // Enforce daily scan limit per plan
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const todayScans = await db.scan.count({
    where: { siteId: id, createdAt: { gte: startOfDay } },
  });
  if (todayScans >= limits.maxScansPerDay) {
    return NextResponse.json(
      { error: "Daily scan limit reached" },
      { status: 429 },
    );
  }

  // Forward to Fastify API for async scanning via BullMQ
  try {
    const res = await fetch(`${API_URL}/scans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INTERNAL_API_SECRET}`,
      },
      body: JSON.stringify({
        siteId: id,
        url: parsedUrl.href,
        wcagLevel,
        maxPages: limits.maxPagesPerScan,
        type: scanType,
        contentLocale,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: result.error ?? "Scan failed" },
        { status: res.status },
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    // If Fastify API is unreachable, create scan directly in DB and return scanId
    // The scan will be processed when the worker comes online
    try {
      const scan = await db.scan.create({
        data: {
          siteId: id,
          status: "pending",
          trigger: "manual",
          maxPages: limits.maxPagesPerScan,
          wcagLevel,
          pages: { create: { url: parsedUrl.href } },
        },
      });
      return NextResponse.json({
        success: true,
        data: { scanId: scan.id, status: "pending" },
      });
    } catch (dbErr) {
      const message =
        dbErr instanceof Error ? dbErr.message : "Scan service unavailable";
      return NextResponse.json({ error: message }, { status: 503 });
    }
  }
}

// GET — Query scan data directly from DB (no Fastify dependency)
export async function GET(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
  });
  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const scanId = request.nextUrl.searchParams.get("scanId");

  if (scanId) {
    // Get specific scan with issues
    const scan = await db.scan.findUnique({
      where: { id: scanId },
      include: {
        pages: { orderBy: { createdAt: "asc" } },
        issues: { orderBy: [{ impact: "asc" }, { ruleId: "asc" }] },
        passedRules: { orderBy: [{ category: "asc" }, { ruleId: "asc" }] },
        incompleteRules: { orderBy: [{ impact: "asc" }, { ruleId: "asc" }] },
      },
    });

    if (!scan || scan.siteId !== id) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    const pagesScanned = scan.pages.filter(
      (p) => p.status === "completed" || p.status === "failed",
    ).length;

    return NextResponse.json({
      success: true,
      data: {
        ...scan,
        progress: { pagesScanned, pagesTotal: scan.pages.length },
      },
    });
  }

  // List scans for site
  const limit = Math.min(
    Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? "20")),
    100,
  );
  const offset = Math.max(
    0,
    Number(request.nextUrl.searchParams.get("offset") ?? "0"),
  );

  const [scans, total] = await Promise.all([
    db.scan.findMany({
      where: { siteId: id },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        _count: { select: { issues: true, pages: true } },
      },
    }),
    db.scan.count({ where: { siteId: id } }),
  ]);

  return NextResponse.json({
    success: true,
    data: { scans, total, limit, offset },
  });
}
