import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    select: { id: true, domain: true },
  });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const url = new URL(req.url);
  const rawDays = parseInt(url.searchParams.get("days") ?? "30", 10);
  const days = [7, 14, 30, 90].includes(rawDays) ? rawDays : 30;

  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setUTCHours(0, 0, 0, 0);

  const events = await db.widgetEvent.findMany({
    where: { siteId: id, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 10_000,
    select: { id: true, createdAt: true, event: true, feature: true, sessionId: true },
  });

  const lines: string[] = [
    "id,date,event,feature,sessionId",
    ...events.map((e) =>
      [
        e.id,
        new Date(e.createdAt).toISOString(),
        e.event,
        e.feature ?? "",
        e.sessionId,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  const csv = lines.join("\n");
  const filename = `${site.domain}-events-${days}d.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
