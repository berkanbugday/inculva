import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";
import {
  getEventLabel,
  getEventContextLabel,
} from "@/app/dashboard/sites/[id]/statistics/labels";
import ExcelJS from "exceljs";

interface Params {
  params: Promise<{ id: string }>;
}

/** Excel worksheet names: max 31 chars, no \ / * ? [ ] : */
function excelWorksheetName(raw: string): string {
  const cleaned = raw.replace(/[\\/*?:\[\]]/g, "-").trim();
  const truncated = cleaned.slice(0, 31);
  return truncated || "Sheet1";
}

export async function GET(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    select: { id: true, domain: true, name: true },
  });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";

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
    select: { id: true, createdAt: true, event: true, feature: true },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(excelWorksheetName(site.name));

  const headerRow = sheet.addRow([
    t.statistics.time,
    t.statistics.event,
    t.statistics.detail,
  ]);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF2563EB" },
    };
    cell.alignment = { vertical: "middle" };
  });
  headerRow.height = 30;

  sheet.columns = [{ width: 22 }, { width: 24 }, { width: 28 }];

  for (const e of events) {
    const time = new Date(e.createdAt).toLocaleString(dateLocale);
    const eventLabel = getEventLabel(t, e.event);
    const detail = getEventContextLabel(t, e.event, e.feature);
    sheet.addRow([time, eventLabel, detail]);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const today = new Date().toISOString().slice(0, 10);
  // Sanitize filename: strip characters that could inject HTTP headers
  const safeName = site.name.replace(/["\\\r\n;]/g, "_").slice(0, 100);
  const filename = `${safeName}_stats_${today}.xlsx`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
