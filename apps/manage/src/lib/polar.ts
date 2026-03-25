import { Polar } from "@polar-sh/sdk";

// Log error unconditionally (not gated on NODE_ENV) so missing token is visible in dev too
if (!process.env["POLAR_ACCESS_TOKEN"]) {
  console.error("[polar] POLAR_ACCESS_TOKEN is not set — billing routes will return 503");
}

export const polar = new Polar({
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
  server: (process.env["POLAR_SERVER"] ?? "sandbox") as "sandbox" | "production",
});

/** Returns true if POLAR_ACCESS_TOKEN is configured. Use this guard in every billing route. */
export function isPolarConfigured(): boolean {
  return Boolean(process.env["POLAR_ACCESS_TOKEN"]);
}
