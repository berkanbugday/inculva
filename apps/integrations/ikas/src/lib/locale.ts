import { headers } from "next/headers";

export type Locale = "tr" | "en";

export async function detectLocale(): Promise<Locale> {
  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  return accept.toLowerCase().includes("tr") ? "tr" : "en";
}
