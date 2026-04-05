import type { Page } from "playwright";
import type { AxeResults } from "axe-core";
import axeCore from "axe-core";
import axeTrPartial from "./locales/axe-tr-partial.json" with { type: "json" };

export type ScanContentLocale = "en" | "tr";

/**
 * Injects axe-core, applies optional Turkish check messages (free in-repo copy),
 * and runs analysis on the main document (iframes included per axe defaults).
 */
export async function runAxeInPage(
  page: Page,
  options?: { contentLocale?: ScanContentLocale },
): Promise<AxeResults> {
  const contentLocale = options?.contentLocale ?? "en";
  const source = axeCore.source as string;
  await page.evaluate(source);

  const trLocale = contentLocale === "tr" ? axeTrPartial : null;

  await page.evaluate(
    (payload: { tr: Record<string, unknown> | null }) => {
      const w = window as unknown as {
        axe: {
          configure: (spec: Record<string, unknown>) => void;
        };
      };
      const spec: Record<string, unknown> = {
        allowedOrigins: ["<unsafe_all_origins>"],
        branding: { application: "inculva" },
      };
      if (payload.tr) spec["locale"] = payload.tr;
      w.axe.configure(spec);
    },
    { tr: trLocale as unknown as Record<string, unknown> | null },
  );

  return page.evaluate(async () => {
    const w = window as unknown as {
      axe: { run: (ctx: Document) => Promise<AxeResults> };
    };
    return w.axe.run(document);
  });
}
