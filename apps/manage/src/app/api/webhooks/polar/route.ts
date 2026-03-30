import { NextRequest, NextResponse } from "next/server";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { db } from "@inculva/db";
import { sendEmail, planUpgradedTemplate, paymentFailedTemplate } from "@inculva/email";
import type { Plan } from "@inculva/types";

const PRODUCT_TO_PLAN: Record<string, Plan> = {
  [process.env["POLAR_SMALL_MONTHLY_PRODUCT_ID"] ?? "~sm"]:  "small",
  [process.env["POLAR_SMALL_ANNUAL_PRODUCT_ID"] ?? "~sma"]:  "small",
  [process.env["POLAR_MEDIUM_MONTHLY_PRODUCT_ID"] ?? "~mm"]: "medium",
  [process.env["POLAR_MEDIUM_ANNUAL_PRODUCT_ID"] ?? "~mma"]: "medium",
  [process.env["POLAR_LARGE_MONTHLY_PRODUCT_ID"] ?? "~lm"]:  "large",
  [process.env["POLAR_LARGE_ANNUAL_PRODUCT_ID"] ?? "~lma"]:  "large",
};

const ALLOWED_STATUSES = new Set([
  "active", "trialing", "past_due", "canceled",
  "incomplete", "incomplete_expired", "unpaid",
]);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env["POLAR_WEBHOOK_SECRET"];
  if (!secret) {
    console.error("[polar webhook] POLAR_WEBHOOK_SECRET is not set — rejecting all requests");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => { headers[key] = value; });

  let event: ReturnType<typeof validateEvent>;
  try {
    event = validateEvent(rawBody, headers, secret);
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    console.error("[polar webhook] Validation error:", err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "subscription.created": {
        const sub = event.data;
        const plan = PRODUCT_TO_PLAN[sub.productId];
        if (!plan) return NextResponse.json({ error: "Unknown product" }, { status: 400 });

        const customerId = sub.customerId;
        const rawUserId = (sub.metadata as Record<string, unknown>)?.userId;
        const userId = typeof rawUserId === "string" ? rawUserId : undefined;
        let user = await db.user.findFirst({ where: { polarCustomerId: customerId } });
        if (!user && userId) {
          user = await db.user.update({ where: { id: userId }, data: { polarCustomerId: customerId } });
        }
        if (!user) break;

        const interval = sub.recurringInterval === "year" ? "year" : "month";
        const periodEnd = sub.currentPeriodEnd
          ? new Date(sub.currentPeriodEnd)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const subData = {
          userId: user.id,
          polarSubscriptionId: sub.id,
          polarProductId: sub.productId,
          plan, interval, status: sub.status,
          currentPeriodStart: sub.currentPeriodStart ? new Date(sub.currentPeriodStart) : new Date(),
          currentPeriodEnd: periodEnd,
        };

        await db.$transaction([
          db.user.update({ where: { id: user.id }, data: { plan } }),
          db.subscription.upsert({ where: { userId: user.id }, create: subData, update: subData }),
        ]);
        break;
      }

      case "subscription.active": {
        const sub = event.data;
        const plan = PRODUCT_TO_PLAN[sub.productId];
        if (!plan) return NextResponse.json({ error: "Unknown product" }, { status: 400 });

        const user = await db.user.findFirst({ where: { polarCustomerId: sub.customerId } });
        if (!user) break;

        await db.$transaction([
          db.user.update({ where: { id: user.id }, data: { plan } }),
          db.subscription.updateMany({ where: { userId: user.id }, data: { status: "active" } }),
        ]);

        const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
        const { html, subject } = planUpgradedTemplate(user.name ?? "", plan, "en");
        void Promise.all([
          sendEmail({ to: user.email, subject, html }),
          db.notification.create({
            data: {
              userId: user.id,
              type: "plan_upgraded",
              title: `You're now on the ${planLabel} plan`,
              body: "Your upgrade was successful. Enjoy your expanded limits.",
              href: "/dashboard/settings/billing",
            },
          }),
        ]).catch(console.error);
        break;
      }

      case "subscription.updated": {
        const sub = event.data;
        const user = await db.user.findFirst({ where: { polarCustomerId: sub.customerId } });
        if (!user) break;

        if (!ALLOWED_STATUSES.has(sub.status)) {
          console.warn("[polar webhook] Unknown status received, skipping DB write:", sub.status);
          break;
        }

        const periodEnd = sub.currentPeriodEnd
          ? new Date(sub.currentPeriodEnd)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await db.subscription.updateMany({
          where: { userId: user.id },
          data: { status: sub.status, currentPeriodEnd: periodEnd },
        });
        break;
      }

      case "subscription.past_due": {
        const sub = event.data;
        const plan = PRODUCT_TO_PLAN[sub.productId];
        if (!plan) return NextResponse.json({ error: "Unknown product" }, { status: 400 });

        const user = await db.user.findFirst({ where: { polarCustomerId: sub.customerId } });
        if (!user) break;

        await db.subscription.updateMany({
          where: { userId: user.id },
          data: { status: "past_due" },
        });

        const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
        const { html, subject } = paymentFailedTemplate(user.name ?? "", plan, "en");
        void Promise.all([
          sendEmail({ to: user.email, subject, html }),
          db.notification.create({
            data: {
              userId: user.id,
              type: "payment_failed",
              title: "Payment failed",
              body: `We couldn't process your ${planLabel} plan payment. Please update your billing details.`,
              href: "/dashboard/settings/billing",
            },
          }),
        ]).catch(console.error);
        break;
      }

      case "subscription.canceled": {
        const sub = event.data;
        const user = await db.user.findFirst({ where: { polarCustomerId: sub.customerId } });
        if (!user) break;

        await db.subscription.updateMany({
          where: { userId: user.id },
          data: { canceledAt: new Date() },
        });
        break;
      }

      case "subscription.revoked": {
        const sub = event.data;
        const user = await db.user.findFirst({ where: { polarCustomerId: sub.customerId } });
        if (!user) break;

        await db.$transaction([
          db.user.update({ where: { id: user.id }, data: { plan: "free" } }),
          db.subscription.updateMany({
            where: { userId: user.id },
            data: { status: "canceled", canceledAt: new Date() },
          }),
        ]);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[polar webhook] Handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
