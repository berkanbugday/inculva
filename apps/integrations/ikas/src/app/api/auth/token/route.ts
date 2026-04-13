import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getSession } from "@/lib/session";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string };
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const secret = new TextEncoder().encode(env.ikasClientSecret);
    const { payload } = await jwtVerify(token, secret);

    const storeName = payload["store"] as string | undefined;
    if (!storeName) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }

    const session = await getSession();
    session.ikasStoreId = storeName;
    session.ikasStoreName = storeName;
    await session.save();

    return NextResponse.json({ ok: true, store: storeName });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
