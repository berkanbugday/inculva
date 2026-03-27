import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

function detectLocale(cookieValue: string | undefined, acceptLang: string | null): Locale {
  if (cookieValue && SUPPORTED_LOCALES.includes(cookieValue as Locale)) {
    return cookieValue as Locale;
  }
  if (acceptLang) {
    const parts = acceptLang.split(",");
    for (const part of parts) {
      const code = part.trim().split(";")[0].split("-")[0].toLowerCase();
      if (SUPPORTED_LOCALES.includes(code as Locale)) {
        return code as Locale;
      }
    }
  }
  return "en";
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name, emailVerified } = session.user;
    const cookieLocale = (await cookies()).get("locale")?.value;
    const acceptLang = (await headers()).get("accept-language");
    const locale = detectLocale(cookieLocale, acceptLang);

    const [user, sites] = await Promise.all([
      db.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, bannedAt: true, plan: true },
      }),
      db.site.findMany({
        where: { ownerId: session.user.id },
        select: { id: true, name: true, domain: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.bannedAt) {
      return NextResponse.json({ error: "User banned" }, { status: 403 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email,
        name,
        emailVerified,
        bannedAt: user.bannedAt,
        plan: user.plan ?? "free",
      },
      sites,
      locale,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
