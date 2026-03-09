import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { sendEmail, planUpgradedTemplate, paymentFailedTemplate } from "@inculva/email";
import crypto from "crypto";
import type { Plan } from "@inculva/types";

const VARIANT_TO_PLAN: Record<string, Plan> = {
  [process.env["LS_PRO_VARIANT_ID"] ?? "~"]: "pro",
  [process.env["LS_PRO_ANNUAL_VARIANT_ID"] ?? "~~"]: "pro",
  [process.env["LS_BUSINESS_VARIANT_ID"] ?? "~~~"]: "business",
  [process.env["LS_BUSINESS_ANNUAL_VARIANT_ID"] ?? "~~~~"]: "business",
};

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const sig = Buffer.from(signature, "utf8");
  if (digest.length !== sig.length) return false;
  return crypto.timingSafeEqual(digest, sig);
}

type LsAttrs = {
  customer_id: number;
  variant_id: number;
  status: string;
  cancelled: boolean;
  renews_at: string | null;
  ends_at: string | null;
  urls: { customer_portal: string };
};

type LsPayload = {
  meta: { event_name: string; custom_data?: { userId?: string } };
  data: { id: string; attributes: LsAttrs };
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const signature = request.headers.get("x-signature") ?? "";
  const rawBody = await request.text();
  const secret = process.env["LEMONSQUEEZY_WEBHOOK_SECRET"];

  // Reject ALL webhook requests if the secret env var is not configured
  if (!secret) {
    console.error("[webhook] LEMONSQUEEZY_WEBHOOK_SECRET is not set — rejecting all requests");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  if (!verifySignature(rawBody, signature, secret!)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as LsPayload;
  const { event_name, custom_data } = payload.meta;
  const attrs = payload.data.attributes;
  const variantId = String(attrs.variant_id);
  const plan = VARIANT_TO_PLAN[variantId] ?? "free";

  try {
    switch (event_name) {
      case "subscription_created":
      case "subscription_updated": {
        const customerId = String(attrs.customer_id);
        let user = await db.user.findFirst({ where: { lsCustomerId: customerId } });

        if (!user && custom_data?.userId) {
          user = await db.user.update({
            where: { id: custom_data.userId },
            data: { lsCustomerId: customerId },
          });
        }
        if (!user) break;

        const periodEnd = attrs.renews_at
          ? new Date(attrs.renews_at)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await db.$transaction([
          db.user.update({ where: { id: user.id }, data: { plan } }),
          db.subscription.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              lsSubscriptionId: payload.data.id,
              lsVariantId: variantId,
              plan,
              status: attrs.status,
              currentPeriodStart: new Date(),
              currentPeriodEnd: periodEnd,
              lsCustomerPortalUrl: attrs.urls.customer_portal,
            },
            update: {
              lsSubscriptionId: payload.data.id,
              lsVariantId: variantId,
              plan,
              status: attrs.status,
              currentPeriodEnd: periodEnd,
              lsCustomerPortalUrl: attrs.urls.customer_portal,
              ...(attrs.cancelled && attrs.ends_at
                ? { canceledAt: new Date(attrs.ends_at) }
                : {}),
            },
          }),
        ]);

        // Payment failed / past due — notify user
        if (event_name === "subscription_updated" && attrs.status === "past_due") {
          const planLabel = plan === "business" ? "Business" : "Pro";
          void Promise.all([
            sendEmail({
              to: user.email,
              subject: "Payment failed — action required",
              html: paymentFailedTemplate(user.name ?? "", plan),
            }),
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

        if (event_name === "subscription_created" && attrs.status === "active") {
          const planLabel = plan === "business" ? "Business" : "Pro";
          void Promise.all([
            sendEmail({
              to: user.email,
              subject: `You're now on the ${planLabel} plan 🎉`,
              html: planUpgradedTemplate(user.name ?? "", plan),
            }),
            db.notification.create({
              data: {
                userId: user.id,
                type: "plan_upgraded",
                title: `You're now on the ${planLabel} plan`,
                body: `Your upgrade was successful. Enjoy your expanded limits.`,
                href: "/dashboard/settings/billing",
              },
            }),
          ]).catch(console.error);
        }
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        const customerId = String(attrs.customer_id);
        const user = await db.user.findFirst({ where: { lsCustomerId: customerId } });
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
    console.error("[ls webhook] Handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
