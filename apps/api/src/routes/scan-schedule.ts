import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { db } from "@inculva/db";
import { PLAN_LIMITS, type Plan, type ScanFrequency } from "@inculva/types";

interface SiteParams {
  siteId: string;
}

interface UpdateScheduleBody {
  frequency: ScanFrequency;
  enabled: boolean;
}

const FREQUENCY_INTERVALS_MS: Record<ScanFrequency, number> = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

const FREQUENCY_ORDER: Record<ScanFrequency, number> = {
  daily: 1,
  weekly: 2,
  monthly: 3,
};

function isFrequencyAllowed(requested: ScanFrequency, planMax: ScanFrequency): boolean {
  return FREQUENCY_ORDER[requested] >= FREQUENCY_ORDER[planMax];
}

function computeNextRunAt(frequency: ScanFrequency): Date {
  return new Date(Date.now() + FREQUENCY_INTERVALS_MS[frequency]);
}

export async function scanScheduleRoutes(app: FastifyInstance): Promise<void> {
  // GET /sites/:siteId/schedule
  app.get<{ Params: SiteParams }>(
    "/sites/:siteId/schedule",
    { preHandler: [app.verifyInternalAuth] },
    async (request: FastifyRequest<{ Params: SiteParams }>, reply: FastifyReply) => {
      const { siteId } = request.params;

      const schedule = await db.scanSchedule.findUnique({ where: { siteId } });

      if (!schedule) {
        return reply.send({ success: true, data: null });
      }

      return reply.send({ success: true, data: schedule });
    },
  );

  // PUT /sites/:siteId/schedule
  app.put<{ Params: SiteParams; Body: UpdateScheduleBody }>(
    "/sites/:siteId/schedule",
    { preHandler: [app.verifyInternalAuth] },
    async (
      request: FastifyRequest<{ Params: SiteParams; Body: UpdateScheduleBody }>,
      reply: FastifyReply,
    ) => {
      const { siteId } = request.params;
      const { frequency, enabled } = request.body;

      if (!frequency || typeof enabled !== "boolean") {
        return reply.status(400).send({ success: false, error: "frequency and enabled are required" });
      }

      // Validate site exists and get plan
      const site = await db.site.findUnique({
        where: { id: siteId },
        include: { owner: { select: { plan: true } } },
      });

      if (!site) {
        return reply.status(404).send({ success: false, error: "Site not found" });
      }

      const plan = (site.owner?.plan ?? "free") as Plan;
      const limits = PLAN_LIMITS[plan];

      if (!isFrequencyAllowed(frequency, limits.scanFrequency)) {
        return reply.status(403).send({
          success: false,
          error: `${frequency} scans not available on ${plan} plan (max: ${limits.scanFrequency})`,
        });
      }

      const nextRunAt = enabled ? computeNextRunAt(frequency) : null;

      const schedule = await db.scanSchedule.upsert({
        where: { siteId },
        create: { siteId, frequency, enabled, nextRunAt },
        update: { frequency, enabled, nextRunAt },
      });

      return reply.send({ success: true, data: schedule });
    },
  );

  // DELETE /sites/:siteId/schedule
  app.delete<{ Params: SiteParams }>(
    "/sites/:siteId/schedule",
    { preHandler: [app.verifyInternalAuth] },
    async (request: FastifyRequest<{ Params: SiteParams }>, reply: FastifyReply) => {
      const { siteId } = request.params;

      await db.scanSchedule.deleteMany({ where: { siteId } });

      return reply.send({ success: true });
    },
  );
}
