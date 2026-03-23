import type { FastifyInstance } from "fastify";
import { db } from "@inculva/db";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function makeBadge(violations: number | null): string {
  let label: string;
  let bg: string;
  let textColor = "#fff";

  if (violations === null) {
    label = "not scanned";
    bg = "#586069";
  } else if (violations === 0) {
    label = "0 issues";
    bg = "#2ea44f";
  } else if (violations <= 4) {
    label = `${violations} issue${violations === 1 ? "" : "s"}`;
    bg = "#e3b341";
    textColor = "#333";
  } else {
    label = `${violations} issues`;
    bg = "#d73a49";
  }

  const leftText = "WCAG 2.1 AA";
  const leftW = 100;
  const rightW = 80 + label.length * 6;
  const totalW = leftW + rightW;

  const safeLabel = escapeHtml(label);
  const safeLeftText = escapeHtml(leftText);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="20" role="img" aria-label="WCAG 2.1 AA: ${safeLabel}">
  <title>WCAG 2.1 AA: ${safeLabel}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalW}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftW}" height="20" fill="#555"/>
    <rect x="${leftW}" width="${rightW}" height="20" fill="${bg}"/>
    <rect width="${totalW}" height="20" fill="url(#s)"/>
  </g>
  <g fill="${textColor}" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${leftW / 2}" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true">${safeLeftText}</text>
    <text x="${leftW / 2}" y="14" fill="#fff">${safeLeftText}</text>
    <text x="${leftW + rightW / 2}" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true">${safeLabel}</text>
    <text x="${leftW + rightW / 2}" y="14" fill="${textColor}">${safeLabel}</text>
  </g>
</svg>`;
}

export async function badgeRoutes(app: FastifyInstance): Promise<void> {
  app.get<{ Params: { siteId: string } }>(
    "/:siteId.svg",
    async (request, reply) => {
      const { siteId } = request.params;

      const config = await db.widgetConfig.findUnique({
        where: { siteId },
        select: { lastScanViolations: true, lastScanAt: true },
      });

      // Return 404 for unknown sites (but still valid SVG to avoid broken images)
      const violations = config ? (config.lastScanViolations ?? null) : null;

      const svg = makeBadge(violations);

      return reply
        .header("Content-Type", "image/svg+xml")
        .header("Cache-Control", "public, max-age=300, s-maxage=300")
        .header("Access-Control-Allow-Origin", "*")
        .send(svg);
    }
  );
}
