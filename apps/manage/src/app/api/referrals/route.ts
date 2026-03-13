import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { generateReferralCode } from "@/lib/referral";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;
const LANDING_URL = process.env["NEXT_PUBLIC_LANDING_URL"]!;

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  // Lazy-generate referral code on first access
  let user = await db.user.findUnique({
    where: { id: userId },
    select: { referralCode: true },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  let code = user.referralCode;
  if (!code) {
    // Generate a unique code (retry on collision — extremely rare)
    let attempts = 0;
    while (!code && attempts < 5) {
      const candidate = generateReferralCode();
      try {
        await db.user.update({
          where: { id: userId },
          data: { referralCode: candidate },
        });
        code = candidate;
      } catch {
        // Unique constraint violation — try again
        attempts++;
      }
    }
  }

  if (!code) {
    return NextResponse.json({ error: "Could not generate referral code" }, { status: 500 });
  }

  const referralCount = await db.referral.count({ where: { referrerId: userId } });

  return NextResponse.json({
    code,
    shareUrl: `${LANDING_URL}/r/${code}`,
    registerUrl: `${APP_URL}/register?ref=${code}`,
    referralCount,
  });
}
