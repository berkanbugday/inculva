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

export async function canCreateSite(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const plan = await getUserPlan(userId);
  const limit = PLAN_LIMITS[plan].maxSites;

  const siteCount = await db.site.count({
    where: { ownerId: userId },
  });

  if (siteCount >= limit) {
    return {
      allowed: false,
      reason: `Your ${plan} plan allows up to ${limit} site${limit === 1 ? "" : "s"}. Please remove an existing site or upgrade your plan.`,
    };
  }

  return { allowed: true };
}
