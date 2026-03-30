import { NextResponse } from "next/server";
import { db } from "@inculva/db";
import { PLAN_LIMITS, type Plan } from "@inculva/types";

export const maxDuration = 300;

const API_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";
const INTERNAL_API_SECRET = process.env["INTERNAL_API_SECRET"] ?? "";

const FREQUENCY_INTERVALS_MS: Record<string, number> = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

export async function GET(req: Request) {
  const secret = process.env["CRON_SECRET"];
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Find all due schedules
  const dueSchedules = await db.scanSchedule.findMany({
    where: {
      enabled: true,
      nextRunAt: { lte: new Date() },
    },
    include: {
      site: {
        select: {
          id: true,
          domain: true,
          owner: { select: { plan: true } },
        },
      },
    },
  });

  let triggered = 0;
  let errors = 0;

  for (const schedule of dueSchedules) {
    try {
      const plan = (schedule.site.owner?.plan ?? "free") as Plan;
      const limits = PLAN_LIMITS[plan];

      // Normalize domain to full URL
      const domain = schedule.site.domain;
      const startUrl = domain.startsWith("http") ? domain : `https://${domain}`;

      // Trigger site scan via Fastify API
      const res = await fetch(`${API_URL}/scans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${INTERNAL_API_SECRET}`,
        },
        body: JSON.stringify({
          siteId: schedule.site.id,
          url: startUrl,
          wcagLevel: "AA",
          maxPages: limits.maxPagesPerScan,
          type: "site",
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        errors++;
        continue;
      }

      // Update schedule timing
      const intervalMs = FREQUENCY_INTERVALS_MS[schedule.frequency] ?? FREQUENCY_INTERVALS_MS["monthly"]!;
      await db.scanSchedule.update({
        where: { id: schedule.id },
        data: {
          lastRunAt: new Date(),
          nextRunAt: new Date(Date.now() + intervalMs),
        },
      });

      triggered++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({
    success: true,
    due: dueSchedules.length,
    triggered,
    errors,
  });
}
