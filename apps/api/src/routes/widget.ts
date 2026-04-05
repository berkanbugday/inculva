import type { FastifyInstance, FastifyRequest } from "fastify";
import { db } from "@inculva/db";
import type { WidgetEvent, WidgetProfiles } from "@inculva/types";
import {
  sendEmail,
  usageWarningTemplate,
  usageLimitTemplate,
} from "@inculva/email";

function extractDomain(request: FastifyRequest): string | null {
  const origin = request.headers.origin;
  if (origin) {
    try {
      return new URL(origin).hostname;
    } catch {
      /* ignore */
    }
  }
  const referer = request.headers.referer;
  if (referer) {
    try {
      return new URL(referer).hostname;
    } catch {
      /* ignore */
    }
  }
  return null;
}

const isDev = process.env["NODE_ENV"] !== "production";

/**
 * Returns true when `requestDomain` is permitted to embed the widget.
 * Matches the site's primary domain exactly.
 * In development only, localhost/127.0.0.1 is also allowed.
 */
function isDomainAllowed(
  requestDomain: string,
  primaryDomain: string,
): boolean {
  if (
    isDev &&
    (requestDomain === "localhost" ||
      requestDomain === "127.0.0.1" ||
      requestDomain === "::1")
  ) {
    return true;
  }
  return requestDomain.toLowerCase() === primaryDomain.toLowerCase();
}

async function sendUsageAlert(
  ownerId: string,
  level: 80 | 100,
  used: number,
  limit: number,
  plan: string,
): Promise<void> {
  const user = await db.user.findUnique({
    where: { id: ownerId },
    select: { email: true, name: true },
  });
  if (!user) return;

  const now = new Date();
  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );

  // Atomically claim the send slot — prevents double-send under concurrent load
  let claimed = false;
  if (level === 80) {
    const { count } = await db.user.updateMany({
      where: {
        id: ownerId,
        OR: [
          { usageAlertSent80: null },
          { usageAlertSent80: { lt: monthStart } },
        ],
      },
      data: { usageAlertSent80: now },
    });
    claimed = count > 0;
  } else {
    const { count } = await db.user.updateMany({
      where: {
        id: ownerId,
        OR: [
          { usageAlertSent100: null },
          { usageAlertSent100: { lt: monthStart } },
        ],
      },
      data: { usageAlertSent100: now },
    });
    claimed = count > 0;
  }

  if (!claimed) return; // Another concurrent request already sent this alert

  const template =
    level === 80
      ? usageWarningTemplate(user.name ?? "", plan, used, limit, "en")
      : usageLimitTemplate(user.name ?? "", plan, limit, "en");
  const { html, subject } = template;

  const notificationTitle =
    level === 80 ? `80% of monthly events used` : `Monthly event limit reached`;

  const notificationBody =
    level === 80
      ? `You've used ${used.toLocaleString()} of ${limit.toLocaleString()} events this month. Upgrade to avoid interruptions.`
      : `New events are being dropped. Upgrade your plan to restore tracking.`;

  await Promise.all([
    sendEmail({ to: user.email, subject, html }),
    db.notification.create({
      data: {
        userId: ownerId,
        type: level === 80 ? "usage_warning" : "usage_limit",
        title: notificationTitle,
        body: notificationBody,
        href: "/dashboard/settings/billing",
      },
    }),
  ]);
}

// Per-site sliding window rate limiter: max 60 events per siteId per minute
// Cap map size at 5000 entries — evict oldest-accessed on overflow
const siteEventTimestamps = new Map<string, number[]>();
const RATE_MAP_MAX_SIZE = 5_000;

const VALID_FEATURES = new Set([
  // Phase 1
  "textResizing",
  "dyslexiaFont",
  "cursorEnhancement",
  "keyboardNavigation",
  "readingGuide",
  "screenReader",
  "pauseAnimations",
  "textSpacing",
  "highlightLinks",
  "colorBlindMode",
  "largeClickTargets",
  "focusHighlight",
  "skipNavigation",
  "muteMedia",
  "readingMask",
  "textAlign",
  "saturation",
  // Phase 2
  "blueLightFilter",
  "hideImages",
  "darkMode",
  "contentMagnifier",
  "lineHeight",
  "highlightTitles",
  "toolTips",
  "sustainabilityMode",
  "slowCursor",
  "dictionary",
  // Profiles
  "profileAdhd",
  "profileBlind",
  "profileLowVision",
  "profileColorBlind",
  "profileDyslexia",
  "profileMotorImpaired",
]);

const VALID_EVENTS = new Set([
  "opened",
  "closed",
  "feature_enabled",
  "feature_disabled",
  "profile_activated",
]);

function checkSiteRateLimit(siteId: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxPerWindow = 60;

  const timestamps = siteEventTimestamps.get(siteId) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxPerWindow) {
    siteEventTimestamps.set(siteId, recent); // update with pruned array
    return false;
  }

  recent.push(now);

  // Evict oldest entry if map exceeds cap (simple FIFO eviction)
  if (siteEventTimestamps.size >= RATE_MAP_MAX_SIZE) {
    const firstKey = siteEventTimestamps.keys().next().value;
    if (firstKey !== undefined) siteEventTimestamps.delete(firstKey);
  }

  siteEventTimestamps.set(siteId, recent);
  return true;
}

export async function widgetRoutes(app: FastifyInstance): Promise<void> {
  // GET /widget/config/:siteId — served to the embeddable widget
  app.get<{ Params: { siteId: string } }>(
    "/config/:siteId",
    async (request, reply) => {
      const { siteId } = request.params;

      const config = await db.widgetConfig.findUnique({
        where: { siteId },
        include: {
          site: { select: { domain: true, owner: { select: { plan: true } } } },
        },
      });

      if (!config) {
        return reply
          .status(404)
          .send({ success: false, error: "Site not found" });
      }

      const ownerPlan = config.site.owner.plan;

      // Domain enforcement — request origin/referer must match the site's registered domain.
      const domain = extractDomain(request);
      if (!domain || !isDomainAllowed(domain, config.site.domain)) {
        return reply
          .status(403)
          .send({ success: false, error: "Domain not authorized" });
      }

      // Record load asynchronously — fire and forget (daily aggregation)
      if (domain) {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        db.widgetLoad
          .upsert({
            where: { siteId_domain_date: { siteId, domain, date: today } },
            create: { siteId, domain, date: today, count: 1 },
            update: { count: { increment: 1 } },
          })
          .catch(() => {});
      }

      return {
        success: true,
        data: {
          position: config.position,
          theme: config.theme,
          primaryColor: config.primaryColor,
          language: config.language,
          features: {
            textResizing: config.textResizing,
            dyslexiaFont: config.dyslexiaFont,
            cursorEnhancement: config.cursorEnhancement,
            keyboardNavigation: config.keyboardNavigation,
            readingGuide: config.readingGuide,
            screenReader: config.screenReader,
            pauseAnimations: config.pauseAnimations,
            textSpacing: config.textSpacing,
            highlightLinks: config.highlightLinks,
            colorBlindMode: config.colorBlindMode,
            largeClickTargets: config.largeClickTargets,
            focusHighlight: config.focusHighlight,
            skipNavigation: config.skipNavigation,
            muteMedia: config.muteMedia,
            readingMask: config.readingMask,
            textAlign: config.textAlign,
            saturation: config.saturation,
            // Phase 2
            blueLightFilter: config.blueLightFilter,
            hideImages: config.hideImages,
            darkMode: config.darkMode,
            contentMagnifier: config.contentMagnifier,
            toolTips: config.toolTips,
            sustainabilityMode: config.sustainabilityMode,
            slowCursor: config.slowCursor,
            dictionary: config.dictionary,
            lineHeight: config.lineHeight,
            highlightTitles: config.highlightTitles,
          },
          profiles: {
            profileAdhd: config.profileAdhd,
            profileBlind: config.profileBlind,
            profileLowVision: config.profileLowVision,
            profileColorBlind: config.profileColorBlind,
            profileDyslexia: config.profileDyslexia,
            profileMotorImpaired: config.profileMotorImpaired,
          } satisfies WidgetProfiles,
          ...(config.accessibilityStatementUrl
            ? {
                accessibilityStatementUrl: (() => {
                  try {
                    const url = new URL(config.accessibilityStatementUrl);
                    if (!url.searchParams.has("lang")) {
                      url.searchParams.set("lang", config.language);
                    }
                    return url.toString();
                  } catch {
                    // If URL parsing fails, append manually
                    const sep = config.accessibilityStatementUrl.includes("?")
                      ? "&"
                      : "?";
                    return `${config.accessibilityStatementUrl}${sep}lang=${config.language}`;
                  }
                })(),
              }
            : {}),
          // Trigger button: available to all plans
          buttonSize: config.buttonSize,
          buttonIcon: config.buttonIcon,
          // White-label: Large plan only
          ...(ownerPlan === "large"
            ? {
                whiteLabelText: config.whiteLabelText ?? null,
              }
            : {}),
        },
      };
    },
  );

  // POST /widget/events — receives beacon events from the widget
  app.post<{ Body: WidgetEvent }>("/events", async (request, reply) => {
    const { siteId, sessionId, event, feature } = request.body;

    // Input validation
    if (
      typeof siteId !== "string" ||
      siteId.length === 0 ||
      siteId.length > 64 ||
      typeof sessionId !== "string" ||
      sessionId.length === 0 ||
      sessionId.length > 128 ||
      typeof event !== "string" ||
      event.length === 0 ||
      event.length > 64
    ) {
      return reply
        .status(400)
        .send({ success: false, error: "Invalid request body" });
    }
    if (feature !== undefined && feature !== null) {
      if (typeof feature !== "string" || !VALID_FEATURES.has(feature)) {
        return reply
          .status(400)
          .send({ success: false, error: "Invalid feature value" });
      }
    }
    // Client timestamps are intentionally ignored — use server time to prevent quota bypass and data backdating

    if (!VALID_EVENTS.has(event)) {
      return reply
        .status(400)
        .send({ success: false, error: "Unknown event type" });
    }

    // Per-site rate limiting: 60 events / minute
    if (!checkSiteRateLimit(siteId)) {
      return reply
        .status(429)
        .send({ success: false, error: "Rate limit exceeded for this site" });
    }

    // Validate the site exists and fetch owner's plan + domain info for quota + auth checks
    const site = await db.site.findUnique({
      where: { id: siteId },
      select: {
        id: true,
        domain: true,
        ownerId: true,
        owner: { select: { plan: true } },
      },
    });

    if (!site) {
      return reply.status(404).send({ success: false, error: "Unknown site" });
    }

    // Domain enforcement — origin must match the site's registered domain.
    const eventDomain = extractDomain(request);
    if (!eventDomain || !isDomainAllowed(eventDomain, site.domain)) {
      return reply
        .status(403)
        .send({ success: false, error: "Domain not authorized" });
    }

    // Enforce monthly event quota per plan — atomically to prevent concurrent bypasses
    const planLimits: Record<string, number> = {
      free: 10_000,
      small: 100_000,
      medium: 300_000,
      large: 1_000_000,
    };
    const plan = site.owner.plan;
    const limit = planLimits[plan] ?? Infinity;

    const createdAt = new Date(); // always server time — client timestamps rejected

    if (isFinite(limit)) {
      const startOfMonth = new Date();
      startOfMonth.setUTCDate(1);
      startOfMonth.setUTCHours(0, 0, 0, 0);

      let quotaExceeded = false;
      let monthCount = 0;

      try {
        await db.$transaction(async (tx) => {
          monthCount = await tx.widgetEvent.count({
            where: {
              site: { ownerId: site.ownerId },
              createdAt: { gte: startOfMonth },
            },
          });

          if (monthCount >= limit) {
            quotaExceeded = true;
            throw new Error("quota_exceeded");
          }

          await tx.widgetEvent.create({
            data: {
              siteId,
              sessionId,
              event,
              feature: feature ?? null,
              createdAt,
            },
          });
        });
      } catch (err) {
        if (err instanceof Error && err.message === "quota_exceeded") {
          void sendUsageAlert(site.ownerId, 100, monthCount, limit, plan).catch(
            () => {},
          );
          return reply
            .status(429)
            .send({ success: false, error: "Monthly event quota exceeded" });
        }
        throw err;
      }

      // Fire 80% warning alert (once per month) — outside transaction, non-blocking
      if (monthCount >= limit * 0.8) {
        void sendUsageAlert(site.ownerId, 80, monthCount, limit, plan).catch(
          () => {},
        );
      }
    } else {
      await db.widgetEvent.create({
        data: { siteId, sessionId, event, feature: feature ?? null, createdAt },
      });
    }

    return reply.status(204).send();
  });
}
