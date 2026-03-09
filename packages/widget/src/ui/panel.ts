import type { ColorBlindType, WidgetFeatures } from "@inculva/types";
import { FEATURE_LEVELS } from "../features/index.js";

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
// SVG icon set — stroke-based (20×20 or 18×18), aria-hidden
// ---------------------------------------------------------------------------
const ICON_HIGH_CONTRAST    = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 3a7 7 0 0 0 0 14z" fill="currentColor"/></svg>`;
const ICON_DARK_MODE        = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5A7 7 0 0 1 6.5 3a7 7 0 1 0 10.5 10.5z"/></svg>`;
const ICON_BLUE_LIGHT       = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3.5"/><path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.4 4.4l1 1M14.6 14.6l1 1M4.4 15.6l1-1M14.6 5.4l1-1"/></svg>`;
const ICON_TEXT_RESIZE      = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M10 5v11M7 16h6"/></svg>`;
const ICON_TEXT_ALIGN       = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M3 9h14M3 13h14M3 17h10"/></svg>`;
const ICON_LINE_HEIGHT      = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 5h9M8 10h9M8 15h9"/><path d="M4 4v12M2 6l2-2 2 2M2 14l2 2 2-2"/></svg>`;
const ICON_TEXT_SPACING     = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h14M3 10h14M3 14h10"/><path d="M15 12l2.5 2-2.5 2"/></svg>`;
const ICON_SCREEN_READER    = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/></svg>`;
const ICON_DYSLEXIA         = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 16L8.5 4l5 12M5.5 12h6"/></svg>`;
const ICON_READING_MASK     = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="16" height="3.5" rx="1" fill="currentColor" stroke="none" opacity="0.4" data-fill="1"/><path d="M2 9h16M2 11h16"/><rect x="2" y="13.5" width="16" height="3.5" rx="1" fill="currentColor" stroke="none" opacity="0.4" data-fill="1"/></svg>`;
const ICON_READING_GUIDE    = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h14M3 10.5h14M3 14h10"/></svg>`;
const ICON_MAGNIFIER        = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5L17 17"/><path d="M9 6.5v5M6.5 9h5"/></svg>`;
const ICON_HIGHLIGHT_LINKS  = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 12.5l-2 2a2.5 2.5 0 0 1-3.5-3.5l2-2a2.5 2.5 0 0 1 3.5 0"/><path d="M12.5 7.5l2-2a2.5 2.5 0 0 1 3.5 3.5l-2 2a2.5 2.5 0 0 1-3.5 0"/><path d="M8.5 11.5l3-3"/></svg>`;
const ICON_HIGHLIGHT_TITLES = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h12M4 10h8"/><path d="M4 15h12" stroke-width="3" stroke-linecap="round" opacity="0.4"/></svg>`;
const ICON_HIDE_IMAGES      = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="14" height="10" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="M3 14l4-4 3 3 2-2 5 5"/><path d="M2.5 2.5l15 15"/></svg>`;
const ICON_PAUSE            = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="4.5" width="3" height="11" rx="1.5" fill="currentColor" data-fill="1"/><rect x="11.5" y="4.5" width="3" height="11" rx="1.5" fill="currentColor" data-fill="1"/></svg>`;
const ICON_CURSOR           = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l10 6.5-4.5 1.5-2 5L5 3z"/></svg>`;
const ICON_COLOR_BLIND      = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/><path d="M3.5 3.5l13 13"/></svg>`;
const ICON_GRAYSCALE        = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 3a7 7 0 0 0 0 14z" fill="currentColor" opacity="0.45" data-fill="1"/></svg>`;
const ICON_SATURATION       = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M10 2l6.5 9.5a6.5 6.5 0 0 1-13 0L10 2z"/></svg>`;
const ICON_FOCUS            = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="3"/></svg>`;
const ICON_TARGET           = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3"/><circle cx="10" cy="10" r="7"/></svg>`;
const ICON_SKIP             = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5l8 5-8 5V5z"/><path d="M16.5 5v10"/></svg>`;
const ICON_MUTE             = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 6.5L5.5 10H2.5v2h3l4 3V6.5z"/><path d="M13 8l4 5M17 8l-4 5"/></svg>`;
const ICON_KEYBOARD         = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M5 9h1.5M9 9h2M13.5 9h1.5M5 12.5h10"/></svg>`;

// UI icons
const ICON_CLOSE     = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2 2l10 10M12 2L2 12"/></svg>`;
const ICON_RESET     = `<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4 10a6 6 0 1 0 1-3.5M4 6.5V10H8"/></svg>`;
const ICON_HEADER    = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4.5" r="2.2"/><path fill-rule="evenodd" d="M12 8.5a2 2 0 0 0-2 2v4.5H7.5l-1.3 3.5h1.5l1-2.5H10v2.5h4v-2.5h1.3l1 2.5h1.5L16.5 15H14V10.5a2 2 0 0 0-2-2z" clip-rule="evenodd"/></svg>`;
const ICON_PERSON    = `<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="6" r="3"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
const ICON_ARROW_DOWN = `<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 5l4 4 4-4"/></svg>`;
const ICON_EXPAND    = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14M10 4l6 6-6 6"/></svg>`;

// Profile icons (18×18)
const ICON_P_BLIND        = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/><path d="M3 3l14 14"/></svg>`;
const ICON_P_LOW_VISION   = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/></svg>`;
const ICON_P_COLOR_BLIND  = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="10" r="4.5"/><circle cx="13" cy="10" r="4.5"/></svg>`;
const ICON_P_DYSLEXIA     = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 16L8.5 4l5 12M5.5 12h6"/></svg>`;
const ICON_P_MOTOR        = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="5" r="2"/><path d="M10 8v5l-3 4.5M10 13l3 4.5M7 12h6"/></svg>`;
const ICON_P_COGNITIVE    = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3.5C4.5 4.5 3 7 3 10s1.5 5.5 4 6.5h6C15.5 15.5 17 13 17 10S15.5 4.5 13 3.5z"/><path d="M10 7v3l2 2"/></svg>`;
const ICON_P_ATTENTION    = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M10 6v5M10 14v.5"/></svg>`;
const ICON_P_EPILEPSY     = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L6 11h5l-3 6 8-10h-5l2-4z"/></svg>`;
const ICON_P_PARKINSONS   = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13c1.5-3 4-4 5-4s3.5 1 5 4"/><circle cx="10" cy="7" r="2"/></svg>`;

// ---------------------------------------------------------------------------
// Feature list — ordered to match reference widget layout
// ---------------------------------------------------------------------------
const FEATURES: FeatureConfig[] = [
  { key: "highContrast",       icon: ICON_HIGH_CONTRAST },
  { key: "darkMode",           icon: ICON_DARK_MODE },
  { key: "blueLightFilter",    icon: ICON_BLUE_LIGHT },
  { key: "textResizing",       icon: ICON_TEXT_RESIZE },
  { key: "textAlign",          icon: ICON_TEXT_ALIGN },
  { key: "lineHeight",         icon: ICON_LINE_HEIGHT },
  { key: "textSpacing",        icon: ICON_TEXT_SPACING },
  { key: "screenReader",       icon: ICON_SCREEN_READER },
  { key: "dyslexiaFont",       icon: ICON_DYSLEXIA },
  { key: "readingMask",        icon: ICON_READING_MASK },
  { key: "readingGuide",       icon: ICON_READING_GUIDE },
  { key: "contentMagnifier",   icon: ICON_MAGNIFIER },
  { key: "highlightLinks",     icon: ICON_HIGHLIGHT_LINKS },
  { key: "highlightTitles",    icon: ICON_HIGHLIGHT_TITLES },
  { key: "hideImages",         icon: ICON_HIDE_IMAGES },
  { key: "pauseAnimations",    icon: ICON_PAUSE },
  { key: "cursorEnhancement",  icon: ICON_CURSOR },
  { key: "colorBlindMode",     icon: ICON_COLOR_BLIND },
  { key: "grayscale",          icon: ICON_GRAYSCALE },
  { key: "saturation",         icon: ICON_SATURATION },
  { key: "focusHighlight",     icon: ICON_FOCUS },
  { key: "largeClickTargets",  icon: ICON_TARGET },
  { key: "skipNavigation",     icon: ICON_SKIP },
  { key: "muteMedia",          icon: ICON_MUTE },
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
    features: ["screenReader", "keyboardNavigation", "skipNavigation", "textResizing"],
  },
  {
    key: "lowVision",
    label: "Low vision",
    icon: ICON_P_LOW_VISION,
    features: ["textResizing", "highContrast", "cursorEnhancement", "largeClickTargets"],
  },
  {
    key: "colorBlind",
    label: "Color blind",
    icon: ICON_P_COLOR_BLIND,
    features: ["colorBlindMode"],
  },
  {
    key: "dyslexia",
    label: "Dyslexia mode",
    icon: ICON_P_DYSLEXIA,
    features: ["dyslexiaFont", "textSpacing", "readingGuide"],
  },
  {
    key: "motorImpaired",
    label: "Motor impaired",
    icon: ICON_P_MOTOR,
    features: ["keyboardNavigation", "largeClickTargets", "cursorEnhancement"],
  },
  {
    key: "cognitive",
    label: "Cognitive impairment",
    icon: ICON_P_COGNITIVE,
    features: ["readingMask", "pauseAnimations", "textSpacing"],
  },
  {
    key: "attention",
    label: "Attention disorder",
    icon: ICON_P_ATTENTION,
    features: ["readingGuide", "pauseAnimations", "textAlign"],
  },
  {
    key: "epilepsy",
    label: "Photosensitive epilepsy",
    icon: ICON_P_EPILEPSY,
    features: ["pauseAnimations", "grayscale"],
  },
  {
    key: "parkinsons",
    label: "Parkinson's disease",
    icon: ICON_P_PARKINSONS,
    features: ["largeClickTargets", "keyboardNavigation", "textResizing"],
  },
];

// ---------------------------------------------------------------------------
// Labels (EN fallback)
// ---------------------------------------------------------------------------
const EN_LABELS: Record<string, string> = {
  title: "Accessibility",
  poweredBy: "Powered by Inculva",
  resetAll: "Reset All",
  sizeMini: "Mini",
  sizeRegular: "Regular",
  sizeXl: "XL",
  profilesTitle: "Accessibility Profiles",
  closeMenu: "Close accessibility menu",
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
  focusHighlight: "Focus Highlight",
  largeClickTargets: "Large Targets",
  skipNavigation: "Skip to Main",
  muteMedia: "Mute Media",
  keyboardNavigation: "Keyboard Nav",
  accessibilityStatement: "Accessibility Statement",
  // Color blind sub-types
  deuteranopia: "Deuteranopia",
  protanopia: "Protanopia",
  tritanopia: "Tritanopia",
  achromatopsia: "Achromatopsia",
  // Profile labels
  profile_blind: "Blind",
  profile_lowVision: "Low vision",
  profile_colorBlind: "Color blind",
  profile_dyslexia: "Dyslexia mode",
  profile_motorImpaired: "Motor impaired",
  profile_cognitive: "Cognitive impairment",
  profile_attention: "Attention disorder",
  profile_epilepsy: "Photosensitive epilepsy",
  profile_parkinsons: "Parkinson's disease",
};

const COLOR_BLIND_TYPES: ColorBlindType[] = ["deuteranopia", "protanopia", "tritanopia", "achromatopsia"];
const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

// ---------------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------------

function _buildHeader(labels: Record<string, string>): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "inculva-panel-header";

  const iconBox = document.createElement("div");
  iconBox.className = "inculva-panel-header-icon";
  iconBox.innerHTML = ICON_HEADER;

  const title = document.createElement("span");
  title.className = "inculva-panel-title";
  title.textContent = labels["title"] ?? "Accessibility";

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
  closeBtn.setAttribute("aria-label", labels["closeMenu"] ?? "Close accessibility menu");
  closeBtn.dataset["inculvaAction"] = "close";
  closeBtn.innerHTML = ICON_CLOSE;

  actions.appendChild(resetBtn);
  actions.appendChild(closeBtn);
  header.appendChild(iconBox);
  header.appendChild(title);
  header.appendChild(actions);
  return header;
}

function _buildSizeBar(labels: Record<string, string>): HTMLDivElement {
  const bar = document.createElement("div");
  bar.className = "inculva-size-bar";

  const sizes: Array<{ key: string; label: string }> = [
    { key: "mini",    label: labels["sizeMini"]    ?? "Mini" },
    { key: "regular", label: labels["sizeRegular"] ?? "Regular" },
    { key: "xl",      label: labels["sizeXl"]      ?? "XL" },
  ];

  for (const { key, label } of sizes) {
    const btn = document.createElement("button");
    btn.className = `inculva-size-btn${key === "regular" ? " active" : ""}`;
    btn.setAttribute("type", "button");
    btn.dataset["size"] = key;
    btn.textContent = label;
    bar.appendChild(btn);
  }

  return bar;
}

function _buildProfilesSection(labels: Record<string, string>): HTMLDivElement {
  const section = document.createElement("div");
  section.className = "inculva-profiles-section";

  const toggle = document.createElement("button");
  toggle.className = "inculva-profiles-toggle";
  toggle.setAttribute("type", "button");
  toggle.setAttribute("aria-expanded", "false");
  toggle.dataset["inculvaAction"] = "toggle-profiles";
  toggle.innerHTML = `${ICON_PERSON}<span>${labels["profilesTitle"] ?? "Accessibility Profiles"}</span><span class="inculva-profiles-arrow">${ICON_ARROW_DOWN}</span>`;
  section.appendChild(toggle);

  const list = document.createElement("div");
  list.className = "inculva-profiles-list";
  list.hidden = true;

  for (const profile of PROFILES) {
    const item = document.createElement("button");
    item.className = "inculva-profile-item";
    item.setAttribute("type", "button");
    item.setAttribute("aria-pressed", "false");
    item.dataset["profile"] = profile.key;

    const left = document.createElement("span");
    left.className = "inculva-profile-left";
    left.innerHTML = `${profile.icon}<span>${labels[`profile_${profile.key}`] ?? profile.label}</span>`;

    const close = document.createElement("span");
    close.className = "inculva-profile-close";
    close.setAttribute("aria-hidden", "true");
    close.innerHTML = ICON_CLOSE;

    item.appendChild(left);
    item.appendChild(close);
    list.appendChild(item);
  }

  section.appendChild(list);
  return section;
}

function _buildFeatureGrid(features: WidgetFeatures, labels: Record<string, string>): HTMLDivElement {
  const grid = document.createElement("div");
  grid.className = "inculva-feature-grid";

  for (const feature of FEATURES) {
    const enabled = features[feature.key] !== false;

    const btn = document.createElement("button");
    btn.className = "inculva-feature-btn";
    btn.setAttribute("type", "button");
    btn.dataset["feature"] = feature.key;
    btn.setAttribute("aria-pressed", "false");
    if (!enabled) btn.style.display = "none";

    const iconBox = document.createElement("div");
    iconBox.className = "inculva-feature-icon-box";
    iconBox.setAttribute("aria-hidden", "true");
    iconBox.innerHTML = feature.icon;

    const labelSpan = document.createElement("span");
    labelSpan.className = "inculva-feature-label";
    labelSpan.textContent = labels[feature.key] ?? feature.key;

    btn.appendChild(iconBox);
    btn.appendChild(labelSpan);

    // Level indicator: small segmented bar shown for multi-level features
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
      selector.setAttribute("role", "group");
      selector.setAttribute("aria-label", "Color blind type");
      for (const type of COLOR_BLIND_TYPES) {
        const typeBtn = document.createElement("button");
        typeBtn.setAttribute("type", "button");
        typeBtn.className = "inculva-cbm-btn" + (type === "deuteranopia" ? " active" : "");
        typeBtn.dataset["cbmType"] = type;
        typeBtn.setAttribute("aria-pressed", type === "deuteranopia" ? "true" : "false");
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
  expandBtn.dataset["size"] = "regular";
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

function _buildBody(features: WidgetFeatures, labels: Record<string, string>): HTMLDivElement {
  const body = document.createElement("div");
  body.className = "inculva-panel-body";

  body.appendChild(_buildProfilesSection(labels));
  body.appendChild(_buildFeatureGrid(features, labels));

  const resetRow = document.createElement("div");
  resetRow.className = "inculva-reset-row";
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("type", "button");
  resetBtn.className = "inculva-reset-btn";
  resetBtn.dataset["inculvaAction"] = "reset";
  resetBtn.setAttribute("aria-label", labels["resetAll"] ?? "Reset All");
  resetBtn.innerHTML = `${ICON_RESET}<span>${labels["resetAll"] ?? "Reset All"}</span>`;
  resetRow.appendChild(resetBtn);
  body.appendChild(resetRow);

  return body;
}

function _buildFooter(
  labels: Record<string, string>,
  accessibilityStatementUrl?: string,
  whiteLabelText?: string | null,
): HTMLDivElement {
  const footer = document.createElement("div");
  footer.className = "inculva-panel-footer";

  const poweredByText = whiteLabelText === undefined || whiteLabelText === null
    ? (labels["poweredBy"] ?? "Powered by Inculva")
    : whiteLabelText;

  const brand = document.createElement("span");
  brand.className = "inculva-footer-brand";
  brand.innerHTML = `${ICON_HEADER}<span>${poweredByText}</span>`;
  footer.appendChild(brand);

  if (accessibilityStatementUrl) {
    const a = document.createElement("a");
    a.className = "inculva-a11y-link";
    a.href = accessibilityStatementUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = labels["accessibilityStatement"] ?? "Accessibility Statement";
    footer.appendChild(a);
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
): HTMLDivElement {
  const labels = EN_LABELS;

  const panel = document.createElement("div");
  panel.id = "inculva-widget-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");
  panel.dataset["size"] = "regular";
  if (RTL_LANGS.has(language)) panel.setAttribute("dir", "rtl");

  panel.appendChild(_buildHeader(labels));
  panel.appendChild(_buildSizeBar(labels));
  panel.appendChild(_buildBody(features, labels));
  panel.appendChild(_buildMiniActions());
  panel.appendChild(_buildFooter(labels, accessibilityStatementUrl, whiteLabelText));

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
  if (closeBtn) closeBtn.setAttribute("aria-label", labels["closeMenu"] ?? "Close accessibility menu");

  // Update feature button labels and visibility
  for (const feature of FEATURES) {
    const btn = panel.querySelector<HTMLElement>(`[data-feature="${feature.key}"]`);
    if (!btn) continue;
    const enabled = features[feature.key] !== false;
    btn.style.display = enabled ? "" : "none";
    const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
    if (labelEl) labelEl.textContent = labels[feature.key] ?? feature.key;
  }

  // Update color blind sub-selector labels
  const selector = panel.querySelector<HTMLElement>(".inculva-cbm-selector");
  if (selector) {
    for (const type of COLOR_BLIND_TYPES) {
      const typeBtn = selector.querySelector<HTMLElement>(`[data-cbm-type="${type}"]`);
      if (typeBtn) typeBtn.textContent = labels[type] ?? type;
    }
  }

  // Update profile item labels
  for (const profile of PROFILES) {
    const item = panel.querySelector<HTMLElement>(`[data-profile="${profile.key}"] span:not(.inculva-profile-close) span`);
    if (item) item.textContent = labels[`profile_${profile.key}`] ?? profile.label;
  }

  // Update footer
  const footer = panel.querySelector<HTMLElement>(".inculva-panel-footer");
  if (footer) {
    const poweredByText = whiteLabelText === undefined || whiteLabelText === null
      ? (labels["poweredBy"] ?? "Powered by Inculva")
      : whiteLabelText;
    footer.innerHTML = "";
    const brand = document.createElement("span");
    brand.className = "inculva-footer-brand";
    brand.innerHTML = `${ICON_HEADER}<span>${poweredByText}</span>`;
    footer.appendChild(brand);
    if (accessibilityStatementUrl) {
      const a = document.createElement("a");
      a.className = "inculva-a11y-link";
      a.href = accessibilityStatementUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = labels["accessibilityStatement"] ?? "Accessibility Statement";
      footer.appendChild(a);
    }
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
  btn.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 512 512" fill="white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M256 16C123.42 16 16 123.418 16 256C16 388.58 123.42 496 256 496S496 388.58 496 256C496 123.418 388.58 16 256 16ZM256 80C278.092 80 296 97.908 296 120S278.092 160 256 160S216 142.092 216 120S233.908 80 256 80ZM374.594 215.062L315.344 232C311.607 233.072 307.783 233.615 304 234.402V296.719L334.641 384.062C339.031 396.562 332.453 410.25 319.953 414.656C317.312 415.562 314.641 416 312 416C302.094 416 292.812 409.812 289.359 399.938L263.514 329.287C260.951 322.285 251.049 322.285 248.486 329.287L222.641 399.938C219.188 409.812 209.906 416 200 416C197.359 416 194.688 415.562 192.047 414.656C179.547 410.25 172.969 396.562 177.359 384.062L208 296.719V234.424C204.215 233.637 200.395 233.096 196.656 232.031L137.406 215.062C124.656 211.438 117.281 198.156 120.922 185.406S137.891 165.188 150.594 168.938L209.844 185.875C240.01 194.498 271.99 194.498 302.156 185.875L361.406 168.938C374.109 165.156 387.422 172.656 391.078 185.406C394.719 198.156 387.344 211.438 374.594 215.062Z"/>
    </svg>
    <span id="inculva-widget-badge" aria-hidden="true"></span>
  `;
  return btn;
}

// ---------------------------------------------------------------------------

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export function applyPosition(el: HTMLElement, position: Position): void {
  const offset = "20px";
  el.style.bottom = position.includes("bottom") ? offset : "auto";
  el.style.top    = position.includes("top")    ? offset : "auto";
  el.style.right  = position.includes("right")  ? offset : "auto";
  el.style.left   = position.includes("left")   ? offset : "auto";
}

export function applyPanelPosition(
  panel: HTMLElement,
  btn: HTMLElement,
  position: Position,
): void {
  const btnRect = btn.getBoundingClientRect();
  const gap     = 12;
  const edge    = 8; // min breathing room from the opposite viewport edge

  panel.style.bottom    = "auto";
  panel.style.top       = "auto";
  panel.style.right     = "auto";
  panel.style.left      = "auto";

  if (position.includes("bottom")) {
    // Panel opens ABOVE the button
    const bottomOffset = window.innerHeight - btnRect.top + gap;
    panel.style.bottom  = `${bottomOffset}px`;
    // Cap height so the panel top never escapes above the viewport
    panel.style.maxHeight = `${window.innerHeight - bottomOffset - edge}px`;
  } else {
    // Panel opens BELOW the button
    const topOffset = btnRect.bottom + gap;
    panel.style.top   = `${topOffset}px`;
    // Cap height so the panel bottom never escapes below the viewport
    panel.style.maxHeight = `${window.innerHeight - topOffset - edge}px`;
  }

  if (position.includes("right")) {
    panel.style.right = "20px";
  } else {
    panel.style.left = "20px";
  }
}
