import { db } from "@inculva/db";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

const FREE_TRIAL_DAYS = 7;

export async function getUserPlan(userId: string): Promise<Plan> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });
  return (user?.plan ?? "free") as Plan;
}

/** Returns the trial end date for a free-plan user based on their first site creation. */
export async function getFreeTrialEnd(userId: string): Promise<Date | null> {
  const firstSite = await db.site.findFirst({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });
  if (!firstSite) return null;
  return new Date(firstSite.createdAt.getTime() + FREE_TRIAL_DAYS * 24 * 60 * 60 * 1000);
}

export async function canCreateSite(_userId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  return { allowed: true };
}

export async function canTrackEvent(siteId: string): Promise<boolean> {
  const site = await db.site.findUnique({
    where: { id: siteId },
    select: { ownerId: true },
  });
  if (!site) return false;

  const plan = await getUserPlan(site.ownerId);

  // Free plan: 7-day trial from first site creation
  if (plan === "free") {
    const trialEnd = await getFreeTrialEnd(site.ownerId);
    if (!trialEnd) return false;
    return Date.now() < trialEnd.getTime();
  }

  const limits = PLAN_LIMITS[plan];
  if (limits.pageviewsPerMonth === Infinity) return true;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const eventCount = await db.widgetEvent.count({
    where: {
      site: { ownerId: site.ownerId },
      createdAt: { gte: startOfMonth },
    },
  });

  return eventCount < limits.pageviewsPerMonth;
}
