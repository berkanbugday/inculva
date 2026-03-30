import { NextResponse } from "next/server";
import { db } from "@inculva/db";
import { sendEmail, healthDegradedTemplate } from "@inculva/email";
import { checkSiteHealth } from "@/lib/health-check";

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

  const sites = await db.site.findMany({
    select: {
      id: true,
      domain: true,
      healthStatus: true,
      owner: { select: { id: true, email: true, name: true } },
    },
  });

  let checked = 0;
  let alerts = 0;
  let errors = 0;

  for (const site of sites) {
    try {
      const result = await checkSiteHealth(site.domain, site.id);
      const newStatus = result.installed ? "healthy" : "degraded";
      const previousStatus = site.healthStatus;

      await db.site.update({
        where: { id: site.id },
        data: { healthStatus: newStatus, lastHealthCheck: new Date() },
      });

      // Only alert on healthy/null → degraded transition (no duplicate alerts)
      if (newStatus === "degraded" && previousStatus !== "degraded") {
        const { html, subject } = healthDegradedTemplate(
          site.owner.name ?? "",
          site.domain,
          site.id,
          "en",
        );
        await Promise.allSettled([
          sendEmail({ to: site.owner.email, subject, html }),
          db.notification.create({
            data: {
              userId: site.owner.id,
              type: "health_degraded",
              title: `Widget offline on ${site.domain}`,
              body: "The inculva widget was not detected on your site. Check your embed snippet.",
              href: `/dashboard/sites/${site.id}`,
            },
          }),
        ]);
        alerts++;
      }

      checked++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({
    success: true,
    checked,
    alerts,
    errors,
    total: sites.length,
  });
}
