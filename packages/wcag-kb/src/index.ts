/**
 * Maps axe-core rule IDs to inculva knowledge base WCAG article slugs (Sanity wcagRule).
 * Built from apps/studio/seed/axe-rule-mapping.json + WCAG seed slug rules in helpers.mjs.
 * Only rules present here should surface a doc link in the dashboard — no Deque fallbacks.
 *
 * Kept in a standalone package so Next.js client bundles never import `@inculva/scanner` (Crawlee/Node).
 */
export const AXE_RULE_KB_SLUG: Record<string, string> = {
  accesskeys: "4-1-1-parsing",
  "area-alt": "1-1-1-non-text-content",
  "aria-allowed-attr": "4-1-2-name-role-value",
  "aria-allowed-role": "4-1-2-name-role-value",
  "aria-hidden-body": "4-1-2-name-role-value",
  "aria-hidden-focus": "4-1-2-name-role-value",
  "aria-label": "4-1-2-name-role-value",
  "aria-labelledby": "4-1-2-name-role-value",
  "aria-required-children": "1-3-1-info-and-relationships",
  "aria-required-parent": "1-3-1-info-and-relationships",
  "aria-roles": "4-1-2-name-role-value",
  "aria-valid-attr": "4-1-2-name-role-value",
  "aria-valid-attr-value": "4-1-2-name-role-value",
  "audio-caption": "1-2-1-audio-only-and-video-only-prerecorded",
  "autocomplete-valid": "1-3-5-identify-input-purpose",
  blink: "2-2-2-pause-stop-hide",
  bypass: "2-4-1-bypass-blocks",
  "button-name": "4-1-2-name-role-value",
  "color-contrast": "1-4-3-contrast-minimum",
  "color-contrast-enhanced": "1-4-6-contrast-enhanced",
  "definition-list": "1-3-1-info-and-relationships",
  dlitem: "1-3-1-info-and-relationships",
  "document-title": "2-4-2-page-titled",
  "duplicate-id": "4-1-1-parsing",
  "duplicate-id-active": "4-1-1-parsing",
  "duplicate-id-aria": "4-1-1-parsing",
  "empty-heading": "1-3-1-info-and-relationships",
  "focus-order-semantics": "2-4-3-focus-order",
  "focus-visible": "2-4-7-focus-visible",
  "form-field-multiple-labels": "1-3-1-info-and-relationships",
  "frame-title": "2-4-1-bypass-blocks",
  "frame-title-unique": "2-4-1-bypass-blocks",
  "heading-order": "1-3-1-info-and-relationships",
  "html-has-lang": "3-1-1-language-of-page",
  "html-lang-valid": "3-1-1-language-of-page",
  "html-xml-lang-mismatch": "3-1-1-language-of-page",
  "identical-links-same-purpose": "2-4-9-link-purpose-link-only",
  "image-alt": "1-1-1-non-text-content",
  "image-redundant-alt": "1-1-1-non-text-content",
  "input-button-name": "1-3-1-info-and-relationships",
  "input-image-alt": "1-1-1-non-text-content",
  label: "1-3-1-info-and-relationships",
  "landmark-banner-is-top-level": "1-3-1-info-and-relationships",
  "landmark-contentinfo-is-top-level": "1-3-1-info-and-relationships",
  "landmark-main-is-top-level": "1-3-1-info-and-relationships",
  "landmark-no-duplicate-banner": "1-3-1-info-and-relationships",
  "landmark-no-duplicate-contentinfo": "1-3-1-info-and-relationships",
  "landmark-one-main": "1-3-1-info-and-relationships",
  "link-in-text-block": "1-4-1-use-of-color",
  "link-name": "2-4-4-link-purpose-in-context",
  list: "1-3-1-info-and-relationships",
  listitem: "1-3-1-info-and-relationships",
  marquee: "2-2-2-pause-stop-hide",
  "meta-viewport": "1-4-4-resize-text",
  "meta-viewport-large": "1-4-4-resize-text",
  "no-autoplay-audio": "1-4-2-audio-control",
  "object-alt": "1-1-1-non-text-content",
  "p-as-heading": "1-3-1-info-and-relationships",
  "page-has-heading-one": "2-4-6-headings-and-labels",
  region: "1-3-1-info-and-relationships",
  "role-img-alt": "1-1-1-non-text-content",
  "scrollable-region-focusable": "2-1-1-keyboard",
  "select-name": "1-3-1-info-and-relationships",
  "server-side-image-map": "2-1-1-keyboard",
  "skip-link": "2-4-1-bypass-blocks",
  "scope-attr-valid": "1-3-1-info-and-relationships",
  "svg-img-alt": "1-1-1-non-text-content",
  "table-duplicate-name": "1-3-1-info-and-relationships",
  "table-fake-caption": "1-3-1-info-and-relationships",
  tabindex: "2-4-3-focus-order",
  "target-size": "2-5-8-target-size-minimum",
  "td-headers-attr": "1-3-1-info-and-relationships",
  "th-has-data-cells": "1-3-1-info-and-relationships",
  "valid-lang": "3-1-2-language-of-parts",
  "video-caption": "1-2-2-captions-prerecorded",
};

export type KbLocale = "en" | "tr";

/**
 * Absolute URL to the inculva KB article for an axe rule, or null when we have no matching doc.
 */
export function wcagKbArticleUrl(
  ruleId: string,
  options: { baseUrl: string; locale?: KbLocale },
): string | null {
  const slug = AXE_RULE_KB_SLUG[ruleId];
  if (!slug) return null;
  const base = options.baseUrl.replace(/\/$/, "");
  const prefix = options.locale === "tr" ? "/tr" : "";
  return `${base}${prefix}/kb/wcag/${slug}/`;
}
