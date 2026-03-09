import { db } from "@inculva/db";
import crypto from "crypto";

export type WebhookEventType =
  | "site.config_updated"
  | "usage.warning"
  | "usage.limit"
  | "payment.failed";

interface WebhookPayload {
  event: WebhookEventType;
  createdAt: string;
  data: Record<string, unknown>;
}

/** Fire-and-forget: deliver a webhook event to all matching enabled hooks for this user. */
export async function deliverWebhooks(
  userId: string,
  event: WebhookEventType,
  data: Record<string, unknown>,
): Promise<void> {
  const hooks = await db.webhook.findMany({
    where: { userId, enabled: true, events: { has: event } },
    select: { id: true, url: true, secret: true },
  });

  if (hooks.length === 0) return;

  const payload: WebhookPayload = {
    event,
    createdAt: new Date().toISOString(),
    data,
  };
  const body = JSON.stringify(payload);

  await Promise.allSettled(
    hooks.map(async (hook) => {
      const sig = crypto
        .createHmac("sha256", hook.secret)
        .update(body)
        .digest("hex");

      try {
        const res = await fetch(hook.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Inculva-Event": event,
            "X-Inculva-Signature": `sha256=${sig}`,
          },
          body,
          signal: AbortSignal.timeout(10_000), // 10s timeout
        });
        if (!res.ok) {
          console.warn(`[webhook] ${hook.id} → ${res.status} from ${hook.url}`);
        }
      } catch (err) {
        console.warn(`[webhook] ${hook.id} delivery failed:`, err);
      }
    }),
  );
}

/** Generate a new webhook secret (64-char hex). */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}
