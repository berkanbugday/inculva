import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/api/auth", "/banned", "/s/"];
const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

// Per-IP rate limiter for auth endpoints: 20 attempts per 15 minutes
// Protects against brute-force on sign-in and password reset
const AUTH_RATE_PATHS = ["/api/auth/sign-in", "/api/auth/forgot-password", "/api/auth/reset-password"];
const authRateMap = new Map<string, number[]>();
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_PER_WINDOW = 20;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkAuthRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (authRateMap.get(ip) ?? []).filter((t) => now - t < AUTH_WINDOW_MS);
  if (timestamps.length >= AUTH_MAX_PER_WINDOW) return false;
  timestamps.push(now);
  authRateMap.set(ip, timestamps);
  // Evict old entries to prevent unbounded growth
  if (authRateMap.size > 10_000) {
    const firstKey = authRateMap.keys().next().value;
    if (firstKey !== undefined) authRateMap.delete(firstKey);
  }
  return true;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Rate-limit auth endpoints before any other checks
  if (AUTH_RATE_PATHS.some((p) => pathname.startsWith(p))) {
    const ip = getClientIp(request);
    if (!checkAuthRateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many attempts — try again in 15 minutes" }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "900" } }
      );
    }
  }

  const session = getSessionCookie(request);

  // If already authenticated, prevent access to auth pages.
  // This avoids confusing UX where a logged-in user can navigate back to /login.
  if (session && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    // Only set callbackUrl for safe relative paths (prevent open redirect)
    if (pathname.startsWith("/") && !pathname.startsWith("//")) {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
