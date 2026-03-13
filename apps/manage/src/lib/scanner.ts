import * as cheerio from "cheerio";

export type ImpactLevel = "critical" | "serious" | "moderate" | "minor";

export interface ScanViolation {
  id: string;
  description: string;
  impact: ImpactLevel;
  wcag: string;
  wcagLevel: "A" | "AA" | "AAA";
  count: number;
  elements: string[];
  helpUrl: string;
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  violations: ScanViolation[];
  passCount: number;
  /** Checks that could not run (e.g. no headings on page) */
  skippedCount: number;
}

function trimStr(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function outerHtml($: cheerio.CheerioAPI, el: any): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return trimStr($.html(el) ?? "").slice(0, 200);
}

// Block private/internal IP ranges and cloud metadata hostnames
const PRIVATE_HOSTNAME_RE =
  /^(localhost|127\.|0\.0\.0\.0|::1|fd[0-9a-f]{2}:|fc[0-9a-f]{2}:|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.|100\.64\.)/i;
const BLOCKED_HOSTNAMES = new Set([
  "metadata.google.internal",
  "metadata.gcp.internal",
  "kubernetes.default",
  "kubernetes.default.svc",
]);

function assertSafeHostname(hostname: string): void {
  const h = hostname.toLowerCase();
  if (PRIVATE_HOSTNAME_RE.test(h) || BLOCKED_HOSTNAMES.has(h)) {
    throw new Error("URL resolves to a blocked host");
  }
}

export async function scanUrl(rawUrl: string): Promise<ScanResult> {
  const scannedAt = new Date().toISOString();

  // SSRF: validate initial hostname
  assertSafeHostname(new URL(rawUrl).hostname);

  // redirect: "manual" — prevents SSRF via 3xx redirect to internal hosts
  const res = await fetch(rawUrl, {
    signal: AbortSignal.timeout(15_000),
    headers: {
      "User-Agent":
        `Inculva-Scanner/1.0 (WCAG Accessibility Checker; +${process.env["NEXT_PUBLIC_LANDING_URL"]!})`,
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "manual",
  });

  // If the site redirects, refuse to follow — prevents redirect-based SSRF
  if (res.status >= 300 && res.status < 400) {
    throw new Error("Site returned a redirect — please provide the final URL");
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const violations: ScanViolation[] = [];
  const passed: string[] = [];
  const skipped: string[] = [];

  // ── 1. html-lang (WCAG 3.1.1 A) ─────────────────────────────────────────
  const htmlLang = $("html").attr("lang");
  if (!htmlLang?.trim()) {
    violations.push({
      id: "html-lang",
      description:
        'The <html> element is missing a lang attribute. Screen readers need this to announce content in the correct language.',
      impact: "serious",
      wcag: "3.1.1",
      wcagLevel: "A",
      count: 1,
      elements: ["<html> (no lang attribute)"],
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page",
    });
  } else {
    passed.push("html-lang");
  }

  // ── 2. document-title (WCAG 2.4.2 A) ────────────────────────────────────
  const titleText = trimStr($("title").text());
  if (!titleText) {
    violations.push({
      id: "document-title",
      description:
        "The page is missing a <title> or the title is empty. Each page must have a descriptive title.",
      impact: "serious",
      wcag: "2.4.2",
      wcagLevel: "A",
      count: 1,
      elements: ["<title> (missing or empty)"],
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled",
    });
  } else {
    passed.push("document-title");
  }

  // ── 3. img-alt (WCAG 1.1.1 A) ───────────────────────────────────────────
  const imgsMissingAlt: string[] = [];
  $("img").each((_, el) => {
    const $el = $(el);
    const alt = $el.attr("alt");
    const role = $el.attr("role");
    // alt="" is acceptable for decorative images with role="presentation/none"
    if (alt === undefined && role !== "presentation" && role !== "none") {
      imgsMissingAlt.push(outerHtml($, el));
    }
  });
  if (imgsMissingAlt.length > 0) {
    violations.push({
      id: "img-alt",
      description:
        "Images must have an alt attribute. Without it, screen readers cannot convey the image's content to blind users.",
      impact: "critical",
      wcag: "1.1.1",
      wcagLevel: "A",
      count: imgsMissingAlt.length,
      elements: imgsMissingAlt.slice(0, 5),
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content",
    });
  } else {
    passed.push("img-alt");
  }

  // ── 4. form-label (WCAG 1.3.1 A) ────────────────────────────────────────
  const unlabeledInputs: string[] = [];
  $(
    "input:not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']):not([type='image']), select, textarea"
  ).each((_, el) => {
    const $el = $(el);
    const id = $el.attr("id");
    const hasForLabel = id ? $(`label[for="${id}"]`).length > 0 : false;
    const hasWrappingLabel = $el.closest("label").length > 0;
    const ariaLabel = $el.attr("aria-label");
    const ariaLabelledBy = $el.attr("aria-labelledby");
    const title = $el.attr("title");
    if (!hasForLabel && !hasWrappingLabel && !ariaLabel && !ariaLabelledBy && !title) {
      unlabeledInputs.push(outerHtml($, el));
    }
  });
  if (unlabeledInputs.length > 0) {
    violations.push({
      id: "form-label",
      description:
        "Form controls must have an accessible label. Unlabeled fields are unusable for screen reader users.",
      impact: "critical",
      wcag: "1.3.1",
      wcagLevel: "A",
      count: unlabeledInputs.length,
      elements: unlabeledInputs.slice(0, 5),
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships",
    });
  } else {
    passed.push("form-label");
  }

  // ── 5. link-name (WCAG 2.4.4 A) ─────────────────────────────────────────
  const emptyLinks: string[] = [];
  $("a[href]").each((_, el) => {
    const $el = $(el);
    const text = trimStr($el.text());
    const ariaLabel = $el.attr("aria-label");
    const title = $el.attr("title");
    const imgAlt = $el.find("img[alt]").attr("alt");
    if (!text && !ariaLabel && !title && !imgAlt) {
      emptyLinks.push(outerHtml($, el));
    }
  });
  if (emptyLinks.length > 0) {
    violations.push({
      id: "link-name",
      description:
        "Links must have discernible text. Empty or icon-only links without labels are meaningless to screen reader users.",
      impact: "serious",
      wcag: "2.4.4",
      wcagLevel: "A",
      count: emptyLinks.length,
      elements: emptyLinks.slice(0, 5),
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context",
    });
  } else {
    passed.push("link-name");
  }

  // ── 6. button-name (WCAG 4.1.2 A) ───────────────────────────────────────
  const emptyButtons: string[] = [];
  $("button").each((_, el) => {
    const $el = $(el);
    const text = trimStr($el.text());
    const ariaLabel = $el.attr("aria-label");
    const ariaLabelledBy = $el.attr("aria-labelledby");
    const title = $el.attr("title");
    if (!text && !ariaLabel && !ariaLabelledBy && !title) {
      emptyButtons.push(outerHtml($, el));
    }
  });
  if (emptyButtons.length > 0) {
    violations.push({
      id: "button-name",
      description:
        "Buttons must have an accessible name. Icon buttons without labels are unusable for screen reader users.",
      impact: "critical",
      wcag: "4.1.2",
      wcagLevel: "A",
      count: emptyButtons.length,
      elements: emptyButtons.slice(0, 5),
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value",
    });
  } else {
    passed.push("button-name");
  }

  // ── 7. heading-order (WCAG 2.4.6 AA) ────────────────────────────────────
  const headingLevels: number[] = [];
  $("h1,h2,h3,h4,h5,h6").each((_, el) => {
    const tag = "tagName" in el ? (el as { tagName: string }).tagName : "";
    headingLevels.push(parseInt(tag[1] ?? "0", 10));
  });
  if (headingLevels.length > 1) {
    const skips: string[] = [];
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i]! > headingLevels[i - 1]! + 1) {
        skips.push(`h${headingLevels[i - 1]!} → h${headingLevels[i]!}`);
      }
    }
    if (skips.length > 0) {
      violations.push({
        id: "heading-order",
        description: `Heading levels are skipped (${skips.slice(0, 3).join(", ")}). Skipping heading levels breaks document structure for screen reader users navigating by heading.`,
        impact: "moderate",
        wcag: "2.4.6",
        wcagLevel: "AA",
        count: skips.length,
        elements: skips,
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels",
      });
    } else {
      passed.push("heading-order");
    }
  } else {
    skipped.push("heading-order");
  }

  // ── 8. empty-heading (WCAG 2.4.6 AA) ────────────────────────────────────
  if (headingLevels.length > 0) {
    const emptyHeadings: string[] = [];
    $("h1,h2,h3,h4,h5,h6").each((_, el) => {
      if (!trimStr($(el).text())) emptyHeadings.push(outerHtml($, el));
    });
    if (emptyHeadings.length > 0) {
      violations.push({
        id: "empty-heading",
        description:
          "Headings must not be empty. Empty headings create confusion for screen reader users navigating by headings.",
        impact: "moderate",
        wcag: "2.4.6",
        wcagLevel: "AA",
        count: emptyHeadings.length,
        elements: emptyHeadings.slice(0, 5),
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels",
      });
    } else {
      passed.push("empty-heading");
    }
  } else {
    skipped.push("empty-heading");
  }

  // ── 9. meta-viewport (WCAG 1.4.4 AA) ────────────────────────────────────
  const viewport = $("meta[name='viewport']").attr("content") ?? "";
  if (/maximum-scale\s*=\s*1/i.test(viewport) || /user-scalable\s*=\s*no/i.test(viewport)) {
    violations.push({
      id: "meta-viewport",
      description:
        "The viewport meta tag prevents users from zooming. This fails users with low vision who rely on browser zoom.",
      impact: "critical",
      wcag: "1.4.4",
      wcagLevel: "AA",
      count: 1,
      elements: [`<meta name="viewport" content="${viewport}">`],
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/resize-text",
    });
  } else {
    passed.push("meta-viewport");
  }

  // ── 10. frame-title (WCAG 4.1.2 A) ─────────────────────────────────────
  const untitledFrames: string[] = [];
  $("iframe, frame").each((_, el) => {
    const title = $(el).attr("title");
    if (!title?.trim()) untitledFrames.push(outerHtml($, el));
  });
  if (untitledFrames.length > 0) {
    violations.push({
      id: "frame-title",
      description:
        "Frames and iframes must have a title attribute. Screen readers need this to describe the frame's purpose.",
      impact: "serious",
      wcag: "4.1.2",
      wcagLevel: "A",
      count: untitledFrames.length,
      elements: untitledFrames.slice(0, 5),
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value",
    });
  } else {
    passed.push("frame-title");
  }

  // ── 11. skip-link (WCAG 2.4.1 A) ────────────────────────────────────────
  const hasSkipLink =
    $('a[href^="#"]').filter((_, el) => /skip/i.test($(el).text())).length > 0;
  const hasMainTarget = $("main, [role='main'], #main, #content").length > 0;
  if (!hasSkipLink && !hasMainTarget) {
    violations.push({
      id: "skip-link",
      description:
        "No skip navigation mechanism detected. Keyboard-only users must tab through the entire navigation on every page load.",
      impact: "moderate",
      wcag: "2.4.1",
      wcagLevel: "A",
      count: 1,
      elements: [],
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks",
    });
  } else {
    passed.push("skip-link");
  }

  // ── 12. landmark-main (WCAG best practice) ──────────────────────────────
  if ($("main, [role='main']").length === 0) {
    violations.push({
      id: "landmark-main",
      description:
        'No <main> landmark found. Screen reader users rely on landmarks to navigate directly to main content.',
      impact: "moderate",
      wcag: "1.3.6",
      wcagLevel: "AAA",
      count: 1,
      elements: [],
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/identify-purpose",
    });
  } else {
    passed.push("landmark-main");
  }

  return {
    url: rawUrl,
    scannedAt,
    violations,
    passCount: passed.length,
    skippedCount: skipped.length,
  };
}
