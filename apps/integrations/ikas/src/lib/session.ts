import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";

export interface SessionData {
  ikasStoreId?: string;
  ikasStoreName?: string;
  siteId?: string;
  accessToken?: string;
}

const sessionOptions: SessionOptions = {
  password: env.cookiePassword,
  cookieName: "ikas_session",
  cookieOptions: {
    secure: process.env["NODE_ENV"] === "production",
    httpOnly: true,
    sameSite: "none" as const,
    maxAge: 60 * 60 * 24 * 7,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSession() {
  const cookieStore = await cookies();
  // iron-session types lag behind Next.js 15 cookie API — safe cast
  return getIronSession<SessionData>(cookieStore as any, sessionOptions);
}
