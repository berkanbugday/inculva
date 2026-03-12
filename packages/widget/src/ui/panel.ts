import type { ColorBlindType, WidgetFeatures } from "@inculva/types";
import { FEATURE_LEVELS } from "../features/index.js";
import { LOGO_PNG } from "virtual:logo-svg";
import { LOGO_ICON_PNG } from "virtual:logo-icon-svg";
import { TRANSLATIONS } from "./translations.js";

const ICON_CDN_URL = "https://cdn.inculva.com/icons";

/** Helper to create an img tag that loads icon from CDN */
function loadIcon(
  name: string,
  width: number,
  height: number,
  extraAttrs = "",
): string {
  const iconUrl = `${ICON_CDN_URL}/${name}.svg`;
  return `<img src="${iconUrl}" width="${width}" height="${height}" aria-hidden="true" ${extraAttrs} alt="" style="display:block;" />`;
}

/** Renders the brand logo PNG at the given size (square 1:1 ratio). */
function logoImg(size: number): string {
  return `<img src="${LOGO_PNG}" width="${size}" height="${size}" alt="" aria-hidden="true" style="display:block;border-radius:4px;">`;
}
function logoIconImg(size: number): string {
  return `<img src="${LOGO_ICON_PNG}" width="${size}" height="${size}" alt="" aria-hidden="true" style="display:block;border-radius:4px;">`;
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
    "darkMode",
    "blueLightFilter",
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
const ICON_TRIGGER = loadIcon(
  "universal-access",
  50,
  50,
  'style="filter: brightness(0) invert(1);"',
);

// ---------------------------------------------------------------------------
// SVG icon set — stroke-based (20×20 or 18×18), aria-hidden
// Feature icons are always black (both selected and unselected)
// ---------------------------------------------------------------------------
const ICON_DARK_MODE = loadIcon("moon", 20, 20);
const ICON_BLUE_LIGHT = loadIcon("sun-bright", 20, 20);
const ICON_TEXT_RESIZE = loadIcon("text-size", 20, 20);
const ICON_TEXT_ALIGN = loadIcon("align-left", 20, 20);
const ICON_LINE_HEIGHT = loadIcon("line-height", 20, 20);
const ICON_TEXT_SPACING = loadIcon("arrows-left-right", 20, 20);
const ICON_SCREEN_READER = loadIcon("waveform", 20, 20);
const ICON_DYSLEXIA = loadIcon("df", 20, 20);
const ICON_READING_MASK = loadIcon("square-poll-horizontal", 20, 20);
const ICON_READING_GUIDE = loadIcon("file-dashed-line", 20, 20);
const ICON_MAGNIFIER = loadIcon("magnifying-glass-plus", 20, 20);
const ICON_HIGHLIGHT_LINKS = loadIcon("link-simple", 20, 20);
const ICON_HIGHLIGHT_TITLES = loadIcon("square-dashed", 20, 20);
const ICON_HIDE_IMAGES = loadIcon("image-slash", 20, 20);
const ICON_PAUSE = loadIcon("circle-pause", 20, 20);
const ICON_CURSOR = loadIcon("arrow-pointer", 20, 20);
const ICON_SLOW_CURSOR = loadIcon("computer-mouse-scrollwheel", 20, 20);
const ICON_COLOR_BLIND = loadIcon("bring-forward", 20, 20);
const ICON_FOCUS = loadIcon("brackets-square", 20, 20);
const ICON_TARGET = loadIcon("bullseye-pointer", 20, 20);
const ICON_SKIP = loadIcon("forward-step", 20, 20);
const ICON_MUTE = loadIcon("volume-slash", 20, 20);
const ICON_KEYBOARD = loadIcon("keyboard", 20, 20);

// UI icons — close and reset are always white
const ICON_CLOSE = loadIcon(
  "x",
  18,
  18,
  'style="filter: brightness(0) invert(1);"',
);
const ICON_RESET = loadIcon(
  "arrows-rotate",
  20,
  20,
  'style="filter: brightness(0) invert(1);"',
);
const ICON_EXPAND = loadIcon(
  "arrow-left",
  20,
  20,
  'style="filter: brightness(0) invert(1);"',
);
const ICON_PERSON = loadIcon("user", 15, 15);
const ICON_ARROW_DOWN = loadIcon("chevron-down", 15, 15);
const ICON_SATURATION = loadIcon("circle-half-stroke", 20, 20);

// Profile icons (18×18)
const ICON_P_BLIND = loadIcon("eye-slash", 30, 30);
const ICON_P_LOW_VISION = loadIcon("eye-low-vision", 30, 30);
const ICON_P_COLOR_BLIND = loadIcon("bring-forward", 30, 30);
const ICON_P_DYSLEXIA = loadIcon("df", 30, 30);
const ICON_P_MOTOR = loadIcon("wheelchair", 30, 30);
const ICON_P_ATTENTION = loadIcon("puzzle-piece", 30, 30);

// ---------------------------------------------------------------------------
// Feature list — ordered for display in the panel
// ---------------------------------------------------------------------------
const FEATURES: FeatureConfig[] = [
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
      "saturation",
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
  saturation: "Contrast+",
  focusHighlight: "Focus Indicator",
  largeClickTargets: "Large Targets",
  slowCursor: "Slow Cursor",
  skipNavigation: "Skip to Main",
  muteMedia: "Mute Media",
  keyboardNavigation: "Keyboard Nav",
  accessibilityStatement: "Accessibility Statement",
  languageLabel: "Select language",
  sizeSmall: "Mini",
  sizeMedium: "Regular",
  sizeLarge: "Large",
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
  active: "Active",
};

/** Merge EN_LABELS with translations for the given language code. */
export function getLabels(lang: string): Record<string, string> {
  return { ...EN_LABELS, ...(TRANSLATIONS[lang] ?? {}) };
}

const COLOR_BLIND_TYPES: ColorBlindType[] = [
  "deuteranopia",
  "protanopia",
  "tritanopia",
  "achromatopsia",
];
const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

export const SUPPORTED_LANGUAGES: readonly {
  code: string;
  label: string;
  flag: string;
  en: string;
}[] = [
  { code: "en", label: "English", flag: "🇬🇧", en: "English" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", en: "Turkish" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", en: "German" },
  { code: "fr", label: "Français", flag: "🇫🇷", en: "French" },
  { code: "es", label: "Español", flag: "🇪🇸", en: "Spanish" },
  { code: "it", label: "Italiano", flag: "🇮🇹", en: "Italian" },
  { code: "pt", label: "Português", flag: "🇵🇹", en: "Portuguese" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", en: "Dutch" },
  { code: "ar", label: "العربية", flag: "🇸🇦", en: "Arabic" },
  { code: "he", label: "עברית", flag: "🇮🇱", en: "Hebrew" },
  { code: "zh", label: "中文", flag: "🇨🇳", en: "Chinese" },
  { code: "ja", label: "日本語", flag: "🇯🇵", en: "Japanese" },
  { code: "ko", label: "한국어", flag: "🇰🇷", en: "Korean" },
  { code: "ru", label: "Русский", flag: "🇷🇺", en: "Russian" },
  { code: "pl", label: "Polski", flag: "🇵🇱", en: "Polish" },
  { code: "cs", label: "Čeština", flag: "🇨🇿", en: "Czech" },
  { code: "da", label: "Dansk", flag: "🇩🇰", en: "Danish" },
  { code: "fi", label: "Suomi", flag: "🇫🇮", en: "Finnish" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷", en: "Greek" },
  { code: "hu", label: "Magyar", flag: "🇭🇺", en: "Hungarian" },
  { code: "ro", label: "Română", flag: "🇷🇴", en: "Romanian" },
  { code: "sk", label: "Slovenčina", flag: "🇸🇰", en: "Slovak" },
  { code: "sv", label: "Svenska", flag: "🇸🇪", en: "Swedish" },
  { code: "uk", label: "Українська", flag: "🇺🇦", en: "Ukrainian" },
  { code: "bg", label: "Български", flag: "🇧🇬", en: "Bulgarian" },
  { code: "hr", label: "Hrvatski", flag: "🇭🇷", en: "Croatian" },
  { code: "lt", label: "Lietuvių", flag: "🇱🇹", en: "Lithuanian" },
  { code: "lv", label: "Latviešu", flag: "🇱🇻", en: "Latvian" },
  { code: "et", label: "Eesti", flag: "🇪🇪", en: "Estonian" },
  { code: "sl", label: "Slovenščina", flag: "🇸🇮", en: "Slovenian" },
  { code: "sr", label: "Srpski", flag: "🇷🇸", en: "Serbian" },
  { code: "no", label: "Norsk", flag: "🇳🇴", en: "Norwegian" },
  { code: "fa", label: "فارسی", flag: "🇮🇷", en: "Persian" },
  { code: "ur", label: "اردو", flag: "🇵🇰", en: "Urdu" },
  { code: "th", label: "ภาษาไทย", flag: "🇹🇭", en: "Thai" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", en: "Vietnamese" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩", en: "Indonesian" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾", en: "Malay" },
  { code: "ca", label: "Català", flag: "🇪🇸", en: "Catalan" },
  { code: "sq", label: "Shqip", flag: "🇦🇱", en: "Albanian" },
  { code: "sw", label: "Kiswahili", flag: "🇹🇿", en: "Swahili" },
];

// ---------------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------------

function _buildHeader(labels: Record<string, string>): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "inculva-panel-header";

  const iconBox = document.createElement("div");
  iconBox.className = "inculva-panel-header-icon";
  iconBox.innerHTML = logoIconImg(22);

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

  // Top row: language dropdown trigger + size group
  const row = document.createElement("div");
  row.className = "inculva-controls-row";

  // ── Custom language dropdown ──────────────────────────────────────────
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) ??
    SUPPORTED_LANGUAGES[0]!;

  const langDropdown = document.createElement("div");
  langDropdown.className = "inculva-lang-dropdown";

  const langTrigger = document.createElement("button");
  langTrigger.className = "inculva-lang-trigger";
  langTrigger.setAttribute("type", "button");
  langTrigger.setAttribute(
    "aria-label",
    labels["languageLabel"] ?? "Select language",
  );
  langTrigger.setAttribute("aria-expanded", "false");
  langTrigger.setAttribute("aria-haspopup", "listbox");
  langTrigger.dataset["inculvaAction"] = "lang-dropdown-toggle";

  const currentFlag = document.createElement("span");
  currentFlag.className = "inculva-lang-current-flag";
  currentFlag.textContent = currentLang.flag;

  const currentLabel = document.createElement("span");
  currentLabel.className = "inculva-lang-current-label";
  currentLabel.textContent = currentLang.label;

  const chevronSpan = document.createElement("span");
  chevronSpan.className = "inculva-lang-chevron";
  chevronSpan.setAttribute("aria-hidden", "true");
  chevronSpan.innerHTML = ICON_ARROW_DOWN;

  langTrigger.appendChild(currentFlag);
  langTrigger.appendChild(currentLabel);
  langTrigger.appendChild(chevronSpan);

  // Dropdown list
  const langList = document.createElement("div");
  langList.className = "inculva-lang-list";
  langList.setAttribute("role", "listbox");
  langList.setAttribute("aria-label", labels["languageLabel"] ?? "Language");

  // Search input
  const searchWrap = document.createElement("div");
  searchWrap.className = "inculva-lang-search-wrap";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "inculva-lang-search";
  searchInput.placeholder = "🔍 Search...";
  searchInput.setAttribute("autocomplete", "off");
  searchInput.setAttribute("spellcheck", "false");
  searchInput.setAttribute("aria-label", "Search language");
  searchWrap.appendChild(searchInput);
  langList.appendChild(searchWrap);

  for (const lang of SUPPORTED_LANGUAGES) {
    const opt = document.createElement("button");
    opt.className =
      "inculva-lang-option" + (lang.code === language ? " active" : "");
    opt.setAttribute("type", "button");
    opt.setAttribute("role", "option");
    opt.setAttribute(
      "aria-selected",
      lang.code === language ? "true" : "false",
    );
    opt.dataset["inculvaAction"] = "set-language";
    opt.dataset["langCode"] = lang.code;

    opt.dataset["enName"] = lang.en;

    const flagSpan = document.createElement("span");
    flagSpan.className = "inculva-lang-flag";
    flagSpan.textContent = lang.flag;

    const nameSpan = document.createElement("span");
    nameSpan.className = "inculva-lang-name";
    nameSpan.textContent = lang.label;

    const enSpan = document.createElement("span");
    enSpan.className = "inculva-lang-en-name";
    enSpan.textContent = lang.en !== lang.label ? lang.en : "";
    enSpan.setAttribute("aria-hidden", "true");

    opt.appendChild(flagSpan);
    opt.appendChild(nameSpan);
    opt.appendChild(enSpan);
    langList.appendChild(opt);
  }

  langDropdown.appendChild(langTrigger);
  langDropdown.appendChild(langList);

  // ── Size toggle group ─────────────────────────────────────────────────
  const sizeGroup = document.createElement("div");
  sizeGroup.className = "inculva-size-group";

  const sizeDefs: [string, string][] = [
    ["mini", labels["sizeSmall"] ?? "Mini"],
    ["regular", labels["sizeMedium"] ?? "Regular"],
    ["large", labels["sizeLarge"] ?? "Large"],
  ];
  for (const [sizeVal, sizeLabel] of sizeDefs) {
    const btn = document.createElement("button");
    btn.className = `inculva-ctrl-btn inculva-size-btn${sizeVal === "regular" ? " active" : ""}`;
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-label", sizeLabel);
    btn.dataset["size"] = sizeVal;
    btn.textContent = sizeLabel;
    sizeGroup.appendChild(btn);
  }

  row.appendChild(langDropdown);
  row.appendChild(sizeGroup);
  bar.appendChild(row);
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

  const brand = document.createElement("span");
  brand.className = "inculva-footer-logo";
  brand.innerHTML = logoImg(120);
  footer.appendChild(brand);

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
  const labels = getLabels(language);

  const panel = document.createElement("div");
  panel.id = "inculva-widget-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");
  panel.dataset["size"] = "regular";
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

  // Sync custom language dropdown to current language
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  if (currentLangObj) {
    const flagEl = panel.querySelector<HTMLElement>(
      ".inculva-lang-current-flag",
    );
    const labelEl = panel.querySelector<HTMLElement>(
      ".inculva-lang-current-label",
    );
    if (flagEl) flagEl.textContent = currentLangObj.flag;
    if (labelEl) labelEl.textContent = currentLangObj.label;
    for (const opt of panel.querySelectorAll<HTMLElement>(
      ".inculva-lang-option",
    )) {
      const isSelected = opt.dataset["langCode"] === language;
      opt.classList.toggle("active", isSelected);
      opt.setAttribute("aria-selected", String(isSelected));
    }
  }

  // Update size button text and aria-labels
  const sizeLabelMap: Record<string, string> = {
    mini: labels["sizeSmall"] ?? "Mini",
    regular: labels["sizeMedium"] ?? "Regular",
    large: labels["sizeLarge"] ?? "Large",
  };
  for (const [sizeVal, sizeLabel] of Object.entries(sizeLabelMap)) {
    const sizeBtn = panel.querySelector<HTMLElement>(
      `.inculva-size-btn[data-size="${sizeVal}"]`,
    );
    if (sizeBtn) {
      sizeBtn.setAttribute("aria-label", sizeLabel);
      sizeBtn.textContent = sizeLabel;
    }
  }

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
    const logo = document.createElement("span");
    logo.className = "inculva-footer-logo";
    logo.innerHTML = logoImg(120);
    footer.appendChild(logo);
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
