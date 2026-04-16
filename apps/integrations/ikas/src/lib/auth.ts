import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { env } from "./env";

interface JWTPayload {
  storeId: string;
  siteId: string;
}

function getSecret() {
  return new TextEncoder().encode(env.secretKey);
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getSecret());
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    storeId: payload.storeId as string,
    siteId: payload.siteId as string,
  };
}

export async function verifyAuth(
  request: Request,
): Promise<JWTPayload | NextResponse> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    return await verifyJWT(authHeader.slice(7));
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}
