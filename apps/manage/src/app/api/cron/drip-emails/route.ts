import { NextResponse } from "next/server";
import { db } from "@inculva/db";
import {
  sendEmail,
  dripDay3Template,
  dripDay7Template,
  dripDay30Template,
} from "@inculva/email";

export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env["CRON_SECRET"];
  if (!secret)
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 503 },
    );

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  const day3Cutoff = new Date(now.getTime() - 3 * dayMs);
  const day7Cutoff = new Date(now.getTime() - 7 * dayMs);
  const day30Cutoff = new Date(now.getTime() - 30 * dayMs);
  // Avoid sending to users who signed up too long ago (window: 1 day tolerance)
  const windowMs = dayMs;

  let sent = 0;
  let errors = 0;

  // ── Day 3: "Have you installed the widget?" ──────────────────────────────
  const day3Users = await db.user.findMany({
    where: {
      dripDay3Sent: false,
      createdAt: {
        gte: new Date(day3Cutoff.getTime() - windowMs),
        lte: day3Cutoff,
      },
    },
    select: { id: true, name: true, email: true },
  });

  for (const user of day3Users) {
    try {
      const { html, subject } = dripDay3Template(user.name ?? "", "en");
      await sendEmail({ to: user.email, subject, html });
      await db.user.update({
        where: { id: user.id },
        data: { dripDay3Sent: true },
      });
      sent++;
    } catch {
      errors++;
    }
  }

  // ── Day 7: "Run your free WCAG scan" (requires day 3 already sent) ──────
  const day7Users = await db.user.findMany({
    where: {
      dripDay3Sent: true,
      dripDay7Sent: false,
      createdAt: {
        gte: new Date(day7Cutoff.getTime() - windowMs),
        lte: day7Cutoff,
      },
    },
    select: { id: true, name: true, email: true },
  });

  for (const user of day7Users) {
    try {
      const { html, subject } = dripDay7Template(user.name ?? "", "en");
      await sendEmail({ to: user.email, subject, html });
      await db.user.update({
        where: { id: user.id },
        data: { dripDay7Sent: true },
      });
      sent++;
    } catch {
      errors++;
    }
  }

  // ── Day 30: "Upgrade to Pro" (free users only) ──────────────────────────
  const day30Users = await db.user.findMany({
    where: {
      dripDay30Sent: false,
      plan: "free",
      createdAt: {
        gte: new Date(day30Cutoff.getTime() - windowMs),
        lte: day30Cutoff,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      sites: {
        select: {
          widgetEvents: {
            where: { createdAt: { gte: new Date(now.getTime() - 30 * dayMs) } },
            select: { id: true },
          },
        },
      },
    },
  });

  for (const user of day30Users) {
    try {
      const eventCount = user.sites.reduce(
        (sum, s) => sum + s.widgetEvents.length,
        0,
      );
      const { html, subject } = dripDay30Template(user.name ?? "", eventCount, "en");
      await sendEmail({ to: user.email, subject, html });
      await db.user.update({
        where: { id: user.id },
        data: { dripDay30Sent: true },
      });
      sent++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({
    success: true,
    sent,
    errors,
    breakdown: {
      day3: day3Users.length,
      day7: day7Users.length,
      day30: day30Users.length,
    },
  });
}
