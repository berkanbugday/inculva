import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { env } from "./env";

interface JWTPayload {
  storeId: string;
  siteId: string;
}

export interface SetupJWTPayload {
  purpose: "setup";
  merchantId: string;
  storeName: string;
  accessToken: string;
  refreshToken: string | null;
  expiresIn: number;
  storefrontId: string;
  defaultDomain: string;
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

export async function signSetupJWT(payload: SetupJWTPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function verifySetupJWT(token: string): Promise<SetupJWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  if (payload.purpose !== "setup") {
    throw new Error("Invalid token purpose");
  }
  return {
    purpose: "setup",
    merchantId: payload.merchantId as string,
    storeName: payload.storeName as string,
    accessToken: payload.accessToken as string,
    refreshToken: (payload.refreshToken as string) ?? null,
    expiresIn: payload.expiresIn as number,
    storefrontId: payload.storefrontId as string,
    defaultDomain: payload.defaultDomain as string,
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
