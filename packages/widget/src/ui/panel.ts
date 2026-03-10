import type { ColorBlindType, WidgetFeatures } from "@inculva/types";
import { FEATURE_LEVELS } from "../features/index.js";
import { BRAND_LOGO_PNG } from "virtual:brand-svg";

/** Renders the brand logo PNG at the given size (square 1:1 ratio). */
function brandImg(size: number): string {
  return `<img src="${BRAND_LOGO_PNG}" width="${size}" height="${size}" alt="" aria-hidden="true" style="display:block;border-radius:4px;">`;
}

type FeatureConfig = {
  key: keyof WidgetFeatures;
  icon: string;
};

export type ProfileDef = {
  key: string;
  label: string;
  icon: string;
  features: (keyof WidgetFeatures)[];
};

// ---------------------------------------------------------------------------
// Feature categories — maps each feature to a panel tab
// ---------------------------------------------------------------------------
export const FEATURE_CATEGORIES: Readonly<
  Record<string, readonly (keyof WidgetFeatures)[]>
> = {
  vision: [
    "highContrast",
    "darkMode",
    "blueLightFilter",
    "grayscale",
    "colorBlindMode",
    "saturation",
    "highlightLinks",
    "highlightTitles",
    "hideImages",
  ],
  reading: [
    "textResizing",
    "textSpacing",
    "textAlign",
    "lineHeight",
    "dyslexiaFont",
    "readingGuide",
    "readingMask",
    "contentMagnifier",
    "screenReader",
  ],
  motor: [
    "keyboardNavigation",
    "focusHighlight",
    "largeClickTargets",
    "cursorEnhancement",
    "slowCursor",
    "skipNavigation",
  ],
  calm: ["pauseAnimations", "muteMedia"],
};

export function getFeatureCategory(feature: keyof WidgetFeatures): string {
  for (const [cat, feats] of Object.entries(FEATURE_CATEGORIES)) {
    if ((feats as readonly string[]).includes(feature as string)) return cat;
  }
  return "vision";
}

// ---------------------------------------------------------------------------
// Trigger icon — International Symbol of Access (person, arms extended)
// ---------------------------------------------------------------------------
const ICON_TRIGGER = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="4.5" r="2.2" fill="white"/><path d="M5.5 10h13" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M12 8.5v5" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M9 20l2-5.5M15 20l-2-5.5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`;

// ---------------------------------------------------------------------------
// Tab icons (14×14)
// ---------------------------------------------------------------------------
const ICON_TAB_VISION = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/></svg>`;
const ICON_TAB_READING = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="12" height="14" rx="1.5"/><path d="M7 8h6M7 11h5M7 14h4"/></svg>`;
const ICON_TAB_MOTOR = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="6" r="2"/><path d="M10 9v4l-2.5 4M10 13l2.5 4M6 11h3M11 11h3"/></svg>`;
const ICON_TAB_CALM = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 12c2.3-2.5 4.7-2.5 7 0s4.7 2.5 7 0M3 7c2.3-2.5 4.7-2.5 7 0s4.7 2.5 7 0"/></svg>`;

// Size mode icons
const ICON_COMPRESS = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17 3v14"/><path d="M13 7l-4 3 4 3"/></svg>`;
const ICON_SIZE_MINI = `<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1.5"/></svg>`;
const ICON_SIZE_REGULAR = `<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="2"/></svg>`;
const ICON_SIZE_LARGE = `<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="1" y="1" width="18" height="18" rx="3"/><path d="M1 1h18v18H1z" fill="currentColor" opacity="0.07"/></svg>`;
const ICON_GLOBE = `<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 2.5c-2.5 2.5-2.5 12.5 0 15M10 2.5c2.5 2.5 2.5 12.5 0 15M2.5 10h15"/></svg>`;

// ---------------------------------------------------------------------------
// SVG icon set — stroke-based (20×20 or 18×18), aria-hidden
// ---------------------------------------------------------------------------
const ICON_HIGH_CONTRAST = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 3a7 7 0 0 0 0 14z" fill="currentColor"/></svg>`;
const ICON_DARK_MODE = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5A7 7 0 0 1 6.5 3a7 7 0 1 0 10.5 10.5z"/></svg>`;
const ICON_BLUE_LIGHT = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3.5"/><path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.4 4.4l1 1M14.6 14.6l1 1M4.4 15.6l1-1M14.6 5.4l1-1"/></svg>`;
const ICON_TEXT_RESIZE = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M10 5v11M7 16h6"/></svg>`;
const ICON_TEXT_ALIGN = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M3 9h14M3 13h14M3 17h10"/></svg>`;
const ICON_LINE_HEIGHT = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 5h9M8 10h9M8 15h9"/><path d="M4 4v12M2 6l2-2 2 2M2 14l2 2 2-2"/></svg>`;
const ICON_TEXT_SPACING = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h14M3 10h14M3 14h10"/><path d="M15 12l2.5 2-2.5 2"/></svg>`;
const ICON_SCREEN_READER = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/></svg>`;
const ICON_DYSLEXIA = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 16L8.5 4l5 12M5.5 12h6"/></svg>`;
const ICON_READING_MASK = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="16" height="3.5" rx="1" fill="currentColor" stroke="none" opacity="0.4" data-fill="1"/><path d="M2 9h16M2 11h16"/><rect x="2" y="13.5" width="16" height="3.5" rx="1" fill="currentColor" stroke="none" opacity="0.4" data-fill="1"/></svg>`;
const ICON_READING_GUIDE = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h14M3 10.5h14M3 14h10"/></svg>`;
const ICON_MAGNIFIER = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5L17 17"/><path d="M9 6.5v5M6.5 9h5"/></svg>`;
const ICON_HIGHLIGHT_LINKS = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 12.5l-2 2a2.5 2.5 0 0 1-3.5-3.5l2-2a2.5 2.5 0 0 1 3.5 0"/><path d="M12.5 7.5l2-2a2.5 2.5 0 0 1 3.5 3.5l-2 2a2.5 2.5 0 0 1-3.5 0"/><path d="M8.5 11.5l3-3"/></svg>`;
const ICON_HIGHLIGHT_TITLES = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h12M4 10h8"/><path d="M4 15h12" stroke-width="3" stroke-linecap="round" opacity="0.4"/></svg>`;
const ICON_HIDE_IMAGES = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="14" height="10" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="M3 14l4-4 3 3 2-2 5 5"/><path d="M2.5 2.5l15 15"/></svg>`;
const ICON_PAUSE = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="4.5" width="3" height="11" rx="1.5" fill="currentColor" data-fill="1"/><rect x="11.5" y="4.5" width="3" height="11" rx="1.5" fill="currentColor" data-fill="1"/></svg>`;
const ICON_CURSOR = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l10 6.5-4.5 1.5-2 5L5 3z"/></svg>`;
const ICON_SLOW_CURSOR = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4 2l9 6-4 1.5-1.5 4.5L4 2z"/><circle cx="15.5" cy="14.5" r="3"/><path d="M15.5 13v1.5l1 1"/></svg>`;
const ICON_COLOR_BLIND = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/><path d="M3.5 3.5l13 13"/></svg>`;
const ICON_GRAYSCALE = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 3a7 7 0 0 0 0 14z" fill="currentColor" opacity="0.45" data-fill="1"/></svg>`;
const ICON_SATURATION = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M10 2l6.5 9.5a6.5 6.5 0 0 1-13 0L10 2z"/></svg>`;
const ICON_FOCUS = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="3"/></svg>`;
const ICON_TARGET = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3"/><circle cx="10" cy="10" r="7"/></svg>`;
const ICON_SKIP = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5l8 5-8 5V5z"/><path d="M16.5 5v10"/></svg>`;
const ICON_MUTE = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 6.5L5.5 10H2.5v2h3l4 3V6.5z"/><path d="M13 8l4 5M17 8l-4 5"/></svg>`;
const ICON_KEYBOARD = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M5 9h1.5M9 9h2M13.5 9h1.5M5 12.5h10"/></svg>`;

// UI icons
const ICON_CLOSE = `<svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 2l10 10M12 2L2 12"/></svg>`;
const ICON_RESET = `<svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4 10a6 6 0 1 0 1-3.5M4 6.5V10H8"/></svg>`;
const ICON_PERSON = `<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="6" r="3"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
const ICON_ARROW_DOWN = `<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5l4 4 4-4"/></svg>`;
const ICON_EXPAND = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14M10 4l6 6-6 6"/></svg>`;

// Profile icons (18×18)
const ICON_P_BLIND = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/><path d="M3 3l14 14"/></svg>`;
const ICON_P_LOW_VISION = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/></svg>`;
const ICON_P_COLOR_BLIND = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="10" r="4.5"/><circle cx="13" cy="10" r="4.5"/></svg>`;
const ICON_P_DYSLEXIA = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 16L8.5 4l5 12M5.5 12h6"/></svg>`;
const ICON_P_MOTOR = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="5" r="2"/><path d="M10 8v5l-3 4.5M10 13l3 4.5M7 12h6"/></svg>`;
const ICON_P_COGNITIVE = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3.5C4.5 4.5 3 7 3 10s1.5 5.5 4 6.5h6C15.5 15.5 17 13 17 10S15.5 4.5 13 3.5z"/><path d="M10 7v3l2 2"/></svg>`;
const ICON_P_ATTENTION = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M10 6v5M10 14v.5"/></svg>`;
const ICON_P_EPILEPSY = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L6 11h5l-3 6 8-10h-5l2-4z"/></svg>`;
const ICON_P_PARKINSONS = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13c1.5-3 4-4 5-4s3.5 1 5 4"/><circle cx="10" cy="7" r="2"/></svg>`;

// ---------------------------------------------------------------------------
// Feature list — ordered for display in the panel
// ---------------------------------------------------------------------------
const FEATURES: FeatureConfig[] = [
  { key: "highContrast", icon: ICON_HIGH_CONTRAST },
  { key: "darkMode", icon: ICON_DARK_MODE },
  { key: "blueLightFilter", icon: ICON_BLUE_LIGHT },
  { key: "textResizing", icon: ICON_TEXT_RESIZE },
  { key: "textAlign", icon: ICON_TEXT_ALIGN },
  { key: "lineHeight", icon: ICON_LINE_HEIGHT },
  { key: "textSpacing", icon: ICON_TEXT_SPACING },
  { key: "screenReader", icon: ICON_SCREEN_READER },
  { key: "dyslexiaFont", icon: ICON_DYSLEXIA },
  { key: "readingMask", icon: ICON_READING_MASK },
  { key: "readingGuide", icon: ICON_READING_GUIDE },
  { key: "contentMagnifier", icon: ICON_MAGNIFIER },
  { key: "highlightLinks", icon: ICON_HIGHLIGHT_LINKS },
  { key: "highlightTitles", icon: ICON_HIGHLIGHT_TITLES },
  { key: "hideImages", icon: ICON_HIDE_IMAGES },
  { key: "pauseAnimations", icon: ICON_PAUSE },
  { key: "cursorEnhancement", icon: ICON_CURSOR },
  { key: "colorBlindMode", icon: ICON_COLOR_BLIND },
  { key: "grayscale", icon: ICON_GRAYSCALE },
  { key: "saturation", icon: ICON_SATURATION },
  { key: "focusHighlight", icon: ICON_FOCUS },
  { key: "largeClickTargets", icon: ICON_TARGET },
  { key: "slowCursor", icon: ICON_SLOW_CURSOR },
  { key: "skipNavigation", icon: ICON_SKIP },
  { key: "muteMedia", icon: ICON_MUTE },
  { key: "keyboardNavigation", icon: ICON_KEYBOARD },
];

// ---------------------------------------------------------------------------
// Accessibility profiles — preset feature combos
// ---------------------------------------------------------------------------
export const PROFILES: ProfileDef[] = [
  {
    key: "blind",
    label: "Blind",
    icon: ICON_P_BLIND,
    features: [
      "screenReader",
      "keyboardNavigation",
      "skipNavigation",
      "textResizing",
    ],
  },
  {
    key: "lowVision",
    label: "Low Vision",
    icon: ICON_P_LOW_VISION,
    features: [
      "textResizing",
      "highContrast",
      "cursorEnhancement",
      "largeClickTargets",
    ],
  },
  {
    key: "dyslexia",
    label: "Dyslexia",
    icon: ICON_P_DYSLEXIA,
    features: ["dyslexiaFont", "textSpacing", "readingGuide"],
  },
  {
    key: "colorBlind",
    label: "Color Blind",
    icon: ICON_P_COLOR_BLIND,
    features: ["colorBlindMode"],
  },
  {
    key: "motorImpaired",
    label: "Motor",
    icon: ICON_P_MOTOR,
    features: ["keyboardNavigation", "largeClickTargets", "focusHighlight"],
  },
  {
    key: "attention",
    label: "ADHD",
    icon: ICON_P_ATTENTION,
    features: ["readingGuide", "pauseAnimations", "readingMask"],
  },
];

// ---------------------------------------------------------------------------
// Labels (EN fallback)
// ---------------------------------------------------------------------------
const EN_LABELS: Record<string, string> = {
  title: "Accessibility",
  poweredBy: "Powered by Inculva",
  resetAll: "Reset All",
  profilesTitle: "Profiles",
  closeMenu: "Close accessibility menu",
  // Category tabs
  categoryVision: "Vision",
  categoryReading: "Reading",
  categoryMotor: "Motor",
  categoryCalm: "Calm",
  // Features
  highContrast: "Contrast Mode",
  darkMode: "Dark Mode",
  blueLightFilter: "Blue Light Filter",
  textResizing: "Larger Text",
  textAlign: "Text Alignment",
  lineHeight: "Line Height",
  textSpacing: "Text Spacing",
  screenReader: "Screen Reader",
  dyslexiaFont: "Dyslexia Mode",
  readingMask: "Reading Mask",
  readingGuide: "Reading Guide",
  contentMagnifier: "Magnifier",
  highlightLinks: "Link Selection",
  highlightTitles: "Highlight Titles",
  hideImages: "Hide Images",
  pauseAnimations: "Stop Animation",
  cursorEnhancement: "Cursor",
  colorBlindMode: "Color Blind",
  grayscale: "Grayscale",
  saturation: "Saturation",
  focusHighlight: "Focus Indicator",
  largeClickTargets: "Large Targets",
  slowCursor: "Slow Cursor",
  skipNavigation: "Skip to Main",
  muteMedia: "Mute Media",
  keyboardNavigation: "Keyboard Nav",
  accessibilityStatement: "Accessibility Statement",
  resetSettings: "Reset settings",
  switchWidgetLeft: "Switch widget to left",
  switchWidgetRight: "Switch widget to right",
  // Color blind sub-types
  deuteranopia: "Deuteranopia",
  protanopia: "Protanopia",
  tritanopia: "Tritanopia",
  achromatopsia: "Achromatopsia",
  // Profile labels
  profile_blind: "Blind",
  profile_lowVision: "Low Vision",
  profile_colorBlind: "Color Blind",
  profile_dyslexia: "Dyslexia",
  profile_motorImpaired: "Motor",
  profile_attention: "ADHD",
};

const COLOR_BLIND_TYPES: ColorBlindType[] = [
  "deuteranopia",
  "protanopia",
  "tritanopia",
  "achromatopsia",
];
const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

export const SUPPORTED_LANGUAGES: readonly { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "ar", label: "العربية" },
  { code: "he", label: "עברית" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ru", label: "Русский" },
  { code: "pl", label: "Polski" },
];

// ---------------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------------

function _buildHeader(labels: Record<string, string>): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "inculva-panel-header";

  const iconBox = document.createElement("div");
  iconBox.className = "inculva-panel-header-icon";
  iconBox.innerHTML = brandImg(22);

  const titleWrap = document.createElement("div");
  titleWrap.className = "inculva-panel-title-wrap";

  const title = document.createElement("span");
  title.className = "inculva-panel-title";
  title.textContent = labels["title"] ?? "Accessibility";

  const activeCount = document.createElement("span");
  activeCount.className = "inculva-active-count";
  activeCount.hidden = true;

  titleWrap.appendChild(title);
  titleWrap.appendChild(activeCount);

  const actions = document.createElement("div");
  actions.className = "inculva-header-actions";

  const resetBtn = document.createElement("button");
  resetBtn.className = "inculva-header-btn";
  resetBtn.setAttribute("type", "button");
  resetBtn.setAttribute("aria-label", labels["resetAll"] ?? "Reset All");
  resetBtn.dataset["inculvaAction"] = "reset";
  resetBtn.innerHTML = ICON_RESET;

  const closeBtn = document.createElement("button");
  closeBtn.className = "inculva-header-btn inculva-panel-close";
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute(
    "aria-label",
    labels["closeMenu"] ?? "Close accessibility menu",
  );
  closeBtn.dataset["inculvaAction"] = "close";
  closeBtn.innerHTML = ICON_CLOSE;

  actions.appendChild(resetBtn);
  actions.appendChild(closeBtn);

  header.appendChild(iconBox);
  header.appendChild(titleWrap);
  header.appendChild(actions);
  return header;
}

function _buildControlsBar(
  language: string,
  labels: Record<string, string>,
): HTMLDivElement {
  const bar = document.createElement("div");
  bar.className = "inculva-controls-bar";

  // Language selector — fills all available space so the select is as wide as possible
  const langWrap = document.createElement("div");
  langWrap.className = "inculva-lang-wrap";
  const globeIcon = document.createElement("span");
  globeIcon.className = "inculva-lang-globe";
  globeIcon.setAttribute("aria-hidden", "true");
  globeIcon.innerHTML = ICON_GLOBE;
  langWrap.appendChild(globeIcon);
  const langSelect = document.createElement("select");
  langSelect.className = "inculva-lang-select";
  langSelect.setAttribute("aria-label", labels["languageLabel"] ?? "Language");
  langSelect.dataset["inculvaAction"] = "set-language";
  for (const lang of SUPPORTED_LANGUAGES) {
    const opt = document.createElement("option");
    opt.value = lang.code;
    opt.textContent = lang.label;
    if (lang.code === language) opt.selected = true;
    langSelect.appendChild(opt);
  }
  langWrap.appendChild(langSelect);

  // 3-way size toggle — text labels: Small / Medium / Large
  const sizeGroup = document.createElement("div");
  sizeGroup.className = "inculva-size-group";

  const sizeDefs: [string, string][] = [
    ["mini", "Small"],
    ["regular", "Medium"],
    ["large", "Large"],
  ];
  for (const [sizeVal, sizeLabel] of sizeDefs) {
    const btn = document.createElement("button");
    btn.className = `inculva-ctrl-btn inculva-size-btn${sizeVal === "large" ? " active" : ""}`;
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-label", `${sizeLabel} size`);
    btn.dataset["size"] = sizeVal;
    btn.textContent = sizeLabel;
    sizeGroup.appendChild(btn);
  }

  bar.appendChild(langWrap);
  bar.appendChild(sizeGroup);
  return bar;
}

function _buildProfileSection(labels: Record<string, string>): HTMLDivElement {
  const section = document.createElement("div");
  section.className = "inculva-profiles-section";

  // Accordion toggle button
  const toggle = document.createElement("button");
  toggle.className = "inculva-profiles-toggle";
  toggle.setAttribute("type", "button");
  toggle.setAttribute("aria-expanded", "false");
  toggle.dataset["inculvaAction"] = "toggle-profiles";
  toggle.innerHTML = `${ICON_PERSON}<span>${labels["profilesTitle"] ?? "Profiles"}</span><span class="inculva-profiles-arrow">${ICON_ARROW_DOWN}</span>`;
  section.appendChild(toggle);

  // Card grid — hidden until accordion is opened
  const grid = document.createElement("div");
  grid.className = "inculva-profiles-grid";
  grid.hidden = true;

  for (const profile of PROFILES) {
    const card = document.createElement("button");
    card.className = "inculva-profile-card";
    card.setAttribute("type", "button");
    card.setAttribute("aria-pressed", "false");
    card.dataset["profile"] = profile.key;

    const iconWrap = document.createElement("span");
    iconWrap.className = "inculva-profile-card-icon";
    iconWrap.setAttribute("aria-hidden", "true");
    iconWrap.innerHTML = profile.icon;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = labels[`profile_${profile.key}`] ?? profile.label;

    card.appendChild(iconWrap);
    card.appendChild(labelSpan);
    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}

function _buildCategoryTabs(labels: Record<string, string>): HTMLDivElement {
  const bar = document.createElement("div");
  bar.className = "inculva-tab-bar";
  bar.setAttribute("role", "tablist");
  bar.setAttribute("aria-label", "Feature categories");

  const tabs = [
    {
      key: "vision",
      icon: ICON_TAB_VISION,
      label: labels["categoryVision"] ?? "Vision",
    },
    {
      key: "reading",
      icon: ICON_TAB_READING,
      label: labels["categoryReading"] ?? "Reading",
    },
    {
      key: "motor",
      icon: ICON_TAB_MOTOR,
      label: labels["categoryMotor"] ?? "Motor",
    },
    {
      key: "calm",
      icon: ICON_TAB_CALM,
      label: labels["categoryCalm"] ?? "Calm",
    },
  ];

  for (const tab of tabs) {
    const btn = document.createElement("button");
    btn.className = `inculva-tab-btn${tab.key === "vision" ? " active" : ""}`;
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", tab.key === "vision" ? "true" : "false");
    btn.dataset["inculvaTab"] = tab.key;

    const iconSpan = document.createElement("span");
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.innerHTML = tab.icon;

    const labelSpan = document.createElement("span");
    labelSpan.className = "inculva-tab-label";
    labelSpan.textContent = tab.label;

    const countSpan = document.createElement("span");
    countSpan.className = "inculva-tab-count";
    countSpan.hidden = true;

    btn.appendChild(iconSpan);
    btn.appendChild(labelSpan);
    btn.appendChild(countSpan);
    bar.appendChild(btn);
  }

  return bar;
}

function _buildFeatureGrid(
  features: WidgetFeatures,
  labels: Record<string, string>,
): HTMLDivElement {
  const grid = document.createElement("div");
  grid.className = "inculva-feature-grid";
  grid.dataset["activeTab"] = "all";

  for (const feature of FEATURES) {
    const enabled = features[feature.key] !== false;
    const category = getFeatureCategory(feature.key);

    const btn = document.createElement("button");
    btn.className = "inculva-feature-btn";
    btn.setAttribute("type", "button");
    btn.dataset["feature"] = feature.key;
    btn.dataset["category"] = category;
    btn.dataset["tooltip"] = labels[feature.key] ?? feature.key;
    btn.setAttribute("aria-pressed", "false");
    if (!enabled) btn.classList.add("inculva-hidden");

    const iconBox = document.createElement("div");
    iconBox.className = "inculva-feature-icon-box";
    iconBox.setAttribute("aria-hidden", "true");
    iconBox.innerHTML = feature.icon;

    const labelSpan = document.createElement("span");
    labelSpan.className = "inculva-feature-label";
    labelSpan.textContent = labels[feature.key] ?? feature.key;

    btn.appendChild(iconBox);
    btn.appendChild(labelSpan);

    const maxLevels = FEATURE_LEVELS[feature.key];
    if (maxLevels) {
      btn.dataset["levelCount"] = String(maxLevels);
      const levelBar = document.createElement("span");
      levelBar.className = "inculva-feature-levels";
      levelBar.setAttribute("aria-hidden", "true");
      for (let i = 0; i < maxLevels; i++) {
        const dot = document.createElement("span");
        dot.className = "inculva-level-dot";
        levelBar.appendChild(dot);
      }
      btn.appendChild(levelBar);
    }

    grid.appendChild(btn);

    if (feature.key === "colorBlindMode") {
      const selector = document.createElement("div");
      selector.className = "inculva-cbm-selector";
      selector.dataset["category"] = "vision";
      selector.setAttribute("role", "group");
      selector.setAttribute("aria-label", "Color blind type");
      for (const type of COLOR_BLIND_TYPES) {
        const typeBtn = document.createElement("button");
        typeBtn.setAttribute("type", "button");
        typeBtn.className =
          "inculva-cbm-btn" + (type === "deuteranopia" ? " active" : "");
        typeBtn.dataset["cbmType"] = type;
        typeBtn.setAttribute(
          "aria-pressed",
          type === "deuteranopia" ? "true" : "false",
        );
        typeBtn.textContent = labels[type] ?? type;
        selector.appendChild(typeBtn);
      }
      grid.appendChild(selector);
    }
  }

  return grid;
}

function _buildMiniActions(): HTMLDivElement {
  const actions = document.createElement("div");
  actions.className = "inculva-mini-actions";

  const expandBtn = document.createElement("button");
  expandBtn.className = "inculva-mini-btn";
  expandBtn.setAttribute("type", "button");
  expandBtn.setAttribute("aria-label", "Expand widget");
  expandBtn.dataset["size"] = "large";
  expandBtn.innerHTML = ICON_EXPAND;

  const resetBtn = document.createElement("button");
  resetBtn.className = "inculva-mini-btn";
  resetBtn.setAttribute("type", "button");
  resetBtn.setAttribute("aria-label", "Reset all");
  resetBtn.dataset["inculvaAction"] = "reset";
  resetBtn.innerHTML = ICON_RESET;

  const closeBtn = document.createElement("button");
  closeBtn.className = "inculva-mini-btn";
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("aria-label", "Close widget");
  closeBtn.dataset["inculvaAction"] = "close";
  closeBtn.innerHTML = ICON_CLOSE;

  actions.appendChild(expandBtn);
  actions.appendChild(resetBtn);
  actions.appendChild(closeBtn);
  return actions;
}

function _buildBody(
  features: WidgetFeatures,
  labels: Record<string, string>,
): HTMLDivElement {
  const body = document.createElement("div");
  body.className = "inculva-panel-body";
  body.appendChild(_buildFeatureGrid(features, labels));
  return body;
}

function _buildPreFooter(
  labels: Record<string, string>,
  isOnLeft: boolean,
  accessibilityStatementUrl?: string,
): HTMLDivElement {
  const pre = document.createElement("div");
  pre.className = "inculva-prefooter";

  // Reset settings — dark pill button
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("type", "button");
  resetBtn.className = "inculva-prefooter-reset";
  resetBtn.dataset["inculvaAction"] = "reset";
  resetBtn.setAttribute("aria-label", labels["resetAll"] ?? "Reset All");
  resetBtn.textContent = labels["resetSettings"] ?? "Reset settings";
  pre.appendChild(resetBtn);

  // Accessibility Statement — outline pill button (only when URL is configured)
  if (accessibilityStatementUrl) {
    const a11yBtn = document.createElement("a");
    a11yBtn.className = "inculva-prefooter-a11y";
    a11yBtn.href = accessibilityStatementUrl;
    a11yBtn.target = "_blank";
    a11yBtn.rel = "noopener noreferrer";
    a11yBtn.textContent =
      labels["accessibilityStatement"] ?? "Accessibility Statement";
    pre.appendChild(a11yBtn);
  }

  // Switch widget side — label + toggle
  const switchRow = document.createElement("div");
  switchRow.className = "inculva-prefooter-switch";

  const switchLabel = document.createElement("span");
  switchLabel.className = "inculva-switch-label";
  switchLabel.textContent = isOnLeft
    ? (labels["switchWidgetRight"] ?? "Switch widget to right")
    : (labels["switchWidgetLeft"] ?? "Switch widget to left");

  const toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("type", "button");
  toggleBtn.className = `inculva-switch-track${isOnLeft ? " active" : ""}`;
  toggleBtn.dataset["inculvaAction"] = "switch-side";
  toggleBtn.setAttribute("role", "switch");
  toggleBtn.setAttribute("aria-checked", String(isOnLeft));
  toggleBtn.setAttribute("aria-label", switchLabel.textContent);

  const toggleThumb = document.createElement("span");
  toggleThumb.className = "inculva-switch-thumb";
  toggleBtn.appendChild(toggleThumb);

  switchRow.appendChild(switchLabel);
  switchRow.appendChild(toggleBtn);
  pre.appendChild(switchRow);

  return pre;
}

function _buildFooter(
  labels: Record<string, string>,
  whiteLabelText?: string | null,
): HTMLDivElement {
  const footer = document.createElement("div");
  footer.className = "inculva-panel-footer";

  const poweredByText =
    whiteLabelText === undefined || whiteLabelText === null
      ? (labels["poweredBy"] ?? "Powered by Inculva")
      : whiteLabelText;

  if (poweredByText !== "") {
    const brand = document.createElement("span");
    brand.className = "inculva-footer-brand";
    brand.innerHTML = `${brandImg(14)}<span>${poweredByText}</span>`;
    footer.appendChild(brand);
  }

  return footer;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function createPanel(
  features: WidgetFeatures,
  language: string,
  accessibilityStatementUrl?: string,
  whiteLabelText?: string | null,
  isOnLeft = false,
): HTMLDivElement {
  const labels = EN_LABELS;

  const panel = document.createElement("div");
  panel.id = "inculva-widget-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");
  panel.dataset["size"] = "large";
  if (RTL_LANGS.has(language)) panel.setAttribute("dir", "rtl");

  panel.appendChild(_buildHeader(labels));
  panel.appendChild(_buildProfileSection(labels));
  panel.appendChild(_buildControlsBar(language, labels));
  panel.appendChild(_buildBody(features, labels));
  panel.appendChild(_buildMiniActions());
  panel.appendChild(
    _buildPreFooter(labels, isOnLeft, accessibilityStatementUrl),
  );
  panel.appendChild(_buildFooter(labels, whiteLabelText));

  return panel;
}

/** Patch an existing panel after remote config is fetched. */
export function updatePanel(
  panel: HTMLDivElement,
  features: WidgetFeatures,
  language: string,
  remoteLabels?: Record<string, string>,
  accessibilityStatementUrl?: string,
  whiteLabelText?: string | null,
): void {
  const labels: Record<string, string> = remoteLabels
    ? { ...EN_LABELS, ...remoteLabels }
    : EN_LABELS;

  if (RTL_LANGS.has(language)) {
    panel.setAttribute("dir", "rtl");
  } else {
    panel.removeAttribute("dir");
  }

  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");

  const titleEl = panel.querySelector<HTMLElement>(".inculva-panel-title");
  if (titleEl) titleEl.textContent = labels["title"] ?? "Accessibility";

  const closeBtn = panel.querySelector<HTMLElement>(".inculva-panel-close");
  if (closeBtn)
    closeBtn.setAttribute(
      "aria-label",
      labels["closeMenu"] ?? "Close accessibility menu",
    );

  // Sync language select to current language
  const langSelect = panel.querySelector<HTMLSelectElement>(
    ".inculva-lang-select",
  );
  if (langSelect && language) langSelect.value = language;

  // Update feature button labels, tooltips and visibility
  for (const feature of FEATURES) {
    const btn = panel.querySelector<HTMLElement>(
      `[data-feature="${feature.key}"]`,
    );
    if (!btn) continue;
    const enabled = features[feature.key] !== false;
    btn.classList.toggle("inculva-hidden", !enabled);
    const labelText = labels[feature.key] ?? feature.key;
    const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
    if (labelEl) labelEl.textContent = labelText;
    btn.dataset["tooltip"] = labelText;
  }

  // Update color blind sub-selector labels
  const selector = panel.querySelector<HTMLElement>(".inculva-cbm-selector");
  if (selector) {
    for (const type of COLOR_BLIND_TYPES) {
      const typeBtn = selector.querySelector<HTMLElement>(
        `[data-cbm-type="${type}"]`,
      );
      if (typeBtn) typeBtn.textContent = labels[type] ?? type;
    }
  }

  // Update profile card labels
  for (const profile of PROFILES) {
    const card = panel.querySelector<HTMLElement>(
      `[data-profile="${profile.key}"]`,
    );
    if (!card) continue;
    // The last span in the card is the text label
    const spans = card.querySelectorAll<HTMLElement>("span");
    const labelEl = spans[spans.length - 1];
    if (labelEl && !labelEl.classList.contains("inculva-profile-card-icon"))
      labelEl.textContent = labels[`profile_${profile.key}`] ?? profile.label;
  }

  // Update profiles accordion toggle label
  const profilesToggleLabel = panel.querySelector<HTMLElement>(
    ".inculva-profiles-toggle > span:nth-child(2)",
  );
  if (profilesToggleLabel)
    profilesToggleLabel.textContent = labels["profilesTitle"] ?? "Profiles";

  // Update pre-footer — rebuild with current state
  const prePre = panel.querySelector<HTMLElement>(".inculva-prefooter");
  if (prePre) {
    const isOnLeft = panel.getAttribute("data-panel-side") === "left";
    const newPre = _buildPreFooter(labels, isOnLeft, accessibilityStatementUrl);
    prePre.replaceWith(newPre);
  }

  // Update footer brand text
  const footer = panel.querySelector<HTMLElement>(".inculva-panel-footer");
  if (footer) {
    const poweredByText =
      whiteLabelText === undefined || whiteLabelText === null
        ? (labels["poweredBy"] ?? "Powered by Inculva")
        : whiteLabelText;
    footer.innerHTML = "";
    if (poweredByText !== "") {
      const brand = document.createElement("span");
      brand.className = "inculva-footer-brand";
      brand.innerHTML = `${brandImg(14)}<span>${poweredByText}</span>`;
      footer.appendChild(brand);
    }
  }
}

/** Update the pre-footer switch side label and toggle state after a side change. */
export function updatePreFooterSide(
  panel: HTMLDivElement,
  isOnLeft: boolean,
  labels: Record<string, string>,
): void {
  const switchLabel = panel.querySelector<HTMLElement>(".inculva-switch-label");
  const toggleBtn = panel.querySelector<HTMLElement>(".inculva-switch-track");
  if (switchLabel) {
    const text = isOnLeft
      ? (labels["switchWidgetRight"] ?? "Switch widget to right")
      : (labels["switchWidgetLeft"] ?? "Switch widget to left");
    switchLabel.textContent = text;
  }
  if (toggleBtn) {
    toggleBtn.classList.toggle("active", isOnLeft);
    toggleBtn.setAttribute("aria-checked", String(isOnLeft));
  }
}

// ---------------------------------------------------------------------------

export function createTriggerButton(color: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = "inculva-widget-btn";
  btn.setAttribute("aria-label", "Open Accessibility Menu");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-haspopup", "dialog");
  btn.style.backgroundColor = color;
  btn.innerHTML = `${ICON_TRIGGER}<span id="inculva-widget-badge" aria-hidden="true"></span>`;
  return btn;
}

// ---------------------------------------------------------------------------

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export function applyPosition(el: HTMLElement, position: Position): void {
  const offset = "20px";
  el.style.bottom = position.includes("bottom") ? offset : "auto";
  el.style.top = position.includes("top") ? offset : "auto";
  el.style.right = position.includes("right") ? offset : "auto";
  el.style.left = position.includes("left") ? offset : "auto";
}

export function applyPanelPosition(
  panel: HTMLElement,
  btn: HTMLElement,
  position: Position,
): void {
  const btnRect = btn.getBoundingClientRect();
  const gap = 12;
  const edge = 8;

  panel.style.bottom = "auto";
  panel.style.top = "auto";
  panel.style.right = "auto";
  panel.style.left = "auto";

  if (position.includes("bottom")) {
    const bottomOffset = window.innerHeight - btnRect.top + gap;
    panel.style.bottom = `${bottomOffset}px`;
    panel.style.maxHeight = `${window.innerHeight - bottomOffset - edge}px`;
  } else {
    const topOffset = btnRect.bottom + gap;
    panel.style.top = `${topOffset}px`;
    panel.style.maxHeight = `${window.innerHeight - topOffset - edge}px`;
  }

  if (position.includes("right")) {
    panel.style.right = "20px";
  } else {
    panel.style.left = "20px";
  }
}
