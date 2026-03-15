import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name, emailVerified } = session.user;
    const locale = (await cookies()).get("locale")?.value ?? "en";

    const [user, sites] = await Promise.all([
      db.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, bannedAt: true },
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
