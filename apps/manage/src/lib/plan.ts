import { db } from "@inculva/db";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

export async function getUserPlan(userId: string): Promise<Plan> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });
  return (user?.plan ?? "free") as Plan;
}

export async function canCreateSite(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const plan = await getUserPlan(userId);
  const limits = PLAN_LIMITS[plan];

  if (limits.sites === Infinity) return { allowed: true };

  const siteCount = await db.site.count({ where: { ownerId: userId } });

  if (siteCount >= limits.sites) {
    return {
      allowed: false,
      reason: `Your ${plan} plan allows up to ${limits.sites} site${limits.sites === 1 ? "" : "s"}. Upgrade to add more.`,
    };
  }

  return { allowed: true };
}

export async function canTrackEvent(siteId: string): Promise<boolean> {
  const site = await db.site.findUnique({
    where: { id: siteId },
    select: { ownerId: true },
  });
  if (!site) return false;

  const plan = await getUserPlan(site.ownerId);
  const limits = PLAN_LIMITS[plan];

  if (limits.eventsPerMonth === Infinity) return true;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Count events across all sites owned by this user this month
  const eventCount = await db.widgetEvent.count({
    where: {
      site: { ownerId: site.ownerId },
      createdAt: { gte: startOfMonth },
    },
  });

  return eventCount < limits.eventsPerMonth;
}
