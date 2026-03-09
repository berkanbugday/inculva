import type { ColorBlindType, WidgetFeatures } from "@inculva/types";

type FeatureConfig = {
  key: keyof WidgetFeatures;
  icon: string;
};

const FEATURES: FeatureConfig[] = [
  { key: "textResizing", icon: "Aa" },
  { key: "highContrast", icon: "◑" },
  { key: "dyslexiaFont", icon: "𝖠" },
  { key: "cursorEnhancement", icon: "⊕" },
  { key: "keyboardNavigation", icon: "⌨" },
  { key: "readingGuide", icon: "▬" },
  { key: "screenReader", icon: "👁" },
  { key: "pauseAnimations", icon: "⏸" },
  { key: "textSpacing", icon: "↔" },
  { key: "highlightLinks", icon: "🔗" },
  { key: "colorBlindMode", icon: "🎨" },
  { key: "largeClickTargets", icon: "◎" },
  { key: "focusHighlight", icon: "⬡" },
  { key: "grayscale", icon: "◫" },
  { key: "skipNavigation", icon: "⏭" },
  { key: "muteMedia", icon: "🔇" },
  { key: "readingMask", icon: "▬" },
  { key: "textAlign", icon: "≡" },
  { key: "saturation", icon: "◈" },
];

// Bundled EN fallback — other languages served by API
const EN_LABELS: Record<string, string> = {
  title: "Accessibility",
  poweredBy: "Powered by Inculva",
  textResizing: "Bigger Text",
  highContrast: "High Contrast",
  dyslexiaFont: "Dyslexia Font",
  cursorEnhancement: "Big Cursor",
  keyboardNavigation: "Keyboard Nav",
  readingGuide: "Reading Guide",
  screenReader: "Screen Reader",
  pauseAnimations: "Pause Motion",
  textSpacing: "Text Spacing",
  highlightLinks: "Highlight Links",
  colorBlindMode: "Color Blind",
  largeClickTargets: "Large Targets",
  focusHighlight: "Focus Highlight",
  grayscale: "Grayscale",
  skipNavigation: "Skip to Main",
  muteMedia: "Mute Media",
  readingMask: "Reading Mask",
  textAlign: "Text Align",
  saturation: "Saturation",
  accessibilityStatement: "Accessibility Statement",
  // Color blind sub-type labels (short names — same in all languages)
  deuteranopia: "Deuteranopia",
  protanopia: "Protanopia",
  tritanopia: "Tritanopia",
  achromatopsia: "Achromatopsia",
};

const COLOR_BLIND_TYPES: ColorBlindType[] = ["deuteranopia", "protanopia", "tritanopia", "achromatopsia"];

const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

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
  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");
  panel.setAttribute("aria-modal", "false");
  if (RTL_LANGS.has(language)) panel.setAttribute("dir", "rtl");

  const header = document.createElement("div");
  header.className = "inculva-panel-header";
  const headerIcon = document.createElement("span");
  headerIcon.setAttribute("aria-hidden", "true");
  headerIcon.textContent = "♿";
  header.appendChild(headerIcon);
  header.appendChild(document.createTextNode(` ${labels["title"] ?? "Accessibility"}`));

  const body = document.createElement("div");
  body.className = "inculva-panel-body";

  for (const feature of FEATURES) {
    const enabled = features[feature.key] !== false;
    const btn = document.createElement("button");
    btn.className = "inculva-feature-btn";
    btn.dataset["feature"] = feature.key;
    btn.setAttribute("aria-pressed", "false");
    if (!enabled) btn.style.display = "none";
    const iconSpan = document.createElement("span");
    iconSpan.className = "inculva-feature-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = feature.icon;
    const labelSpan = document.createElement("span");
    labelSpan.className = "inculva-feature-label";
    labelSpan.textContent = labels[feature.key] ?? feature.key;
    btn.appendChild(iconSpan);
    btn.appendChild(labelSpan);
    body.appendChild(btn);

    // Inject color blind type sub-selector after the colorBlindMode button
    if (feature.key === "colorBlindMode") {
      const selector = document.createElement("div");
      selector.className = "inculva-cbm-selector";
      selector.setAttribute("role", "group");
      selector.setAttribute("aria-label", "Color blind type");
      for (const type of COLOR_BLIND_TYPES) {
        const typeBtn = document.createElement("button");
        typeBtn.className = "inculva-cbm-btn" + (type === "deuteranopia" ? " active" : "");
        typeBtn.dataset["cbmType"] = type;
        typeBtn.setAttribute("aria-pressed", type === "deuteranopia" ? "true" : "false");
        typeBtn.textContent = labels[type] ?? type;
        selector.appendChild(typeBtn);
      }
      body.appendChild(selector);
    }
  }

  const footer = document.createElement("div");
  footer.className = "inculva-panel-footer";

  // whiteLabelText: null/undefined=default branding, ""=hide, string=custom
  const poweredByText = whiteLabelText === undefined || whiteLabelText === null
    ? (labels["poweredBy"] ?? "Powered by Inculva")
    : whiteLabelText;
  if (poweredByText) footer.textContent = poweredByText;

  if (accessibilityStatementUrl) {
    const a = document.createElement("a");
    a.className = "inculva-a11y-link";
    a.href = accessibilityStatementUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = labels["accessibilityStatement"] ?? "Accessibility Statement";
    footer.appendChild(document.createElement("br"));
    footer.appendChild(a);
  }

  panel.appendChild(header);
  panel.appendChild(body);
  panel.appendChild(footer);

  return panel;
}

/** Called after remote config is fetched to update feature visibility, language, labels, and a11y statement. */
export function updatePanel(
  panel: HTMLDivElement,
  features: WidgetFeatures,
  language: string,
  remoteLabels?: Record<string, string>,
  accessibilityStatementUrl?: string,
  whiteLabelText?: string | null,
): void {
  // Merge remote labels over EN_LABELS so missing keys (e.g. cbm type names) fall back to English
  const labels: Record<string, string> = remoteLabels
    ? { ...EN_LABELS, ...remoteLabels }
    : EN_LABELS;

  // Set RTL direction based on language
  if (RTL_LANGS.has(language)) {
    panel.setAttribute("dir", "rtl");
  } else {
    panel.removeAttribute("dir");
  }

  // Update header text + aria-label — use DOM manipulation, NOT innerHTML (XSS prevention)
  const header = panel.querySelector(".inculva-panel-header");
  if (header) {
    header.textContent = "";
    const headerIcon = document.createElement("span");
    headerIcon.setAttribute("aria-hidden", "true");
    headerIcon.textContent = "♿";
    header.appendChild(headerIcon);
    header.appendChild(document.createTextNode(` ${labels["title"] ?? "Accessibility"}`));
  }
  panel.setAttribute("aria-label", labels["title"] ?? "Accessibility");

  // Update footer — poweredBy text + optional a11y statement link
  const footer = panel.querySelector(".inculva-panel-footer");
  if (footer) {
    const poweredByText = whiteLabelText === undefined || whiteLabelText === null
      ? (labels["poweredBy"] ?? "Powered by Inculva")
      : whiteLabelText;
    footer.textContent = poweredByText || "";
    if (accessibilityStatementUrl) {
      let a = footer.querySelector<HTMLAnchorElement>(".inculva-a11y-link");
      if (!a) {
        a = document.createElement("a");
        a.className = "inculva-a11y-link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        footer.appendChild(document.createElement("br"));
        footer.appendChild(a);
      }
      a.href = accessibilityStatementUrl;
      a.textContent = labels["accessibilityStatement"] ?? "Accessibility Statement";
    } else {
      footer.querySelector(".inculva-a11y-link")?.previousSibling?.remove();
      footer.querySelector(".inculva-a11y-link")?.remove();
    }
  }

  // Update each feature button
  for (const feature of FEATURES) {
    const btn = panel.querySelector<HTMLElement>(`[data-feature="${feature.key}"]`);
    if (!btn) continue;

    const enabled = features[feature.key] !== false;
    btn.style.display = enabled ? "" : "none";

    const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
    if (labelEl) labelEl.textContent = labels[feature.key] ?? feature.key;
  }

  // Update color blind sub-selector type labels
  const selector = panel.querySelector<HTMLElement>(".inculva-cbm-selector");
  if (selector) {
    for (const type of COLOR_BLIND_TYPES) {
      const typeBtn = selector.querySelector<HTMLElement>(`[data-cbm-type="${type}"]`);
      if (typeBtn) typeBtn.textContent = labels[type] ?? type;
    }
  }
}

export function createTriggerButton(color: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = "inculva-widget-btn";
  btn.setAttribute("aria-label", "Open Accessibility Menu");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-haspopup", "dialog");
  btn.style.backgroundColor = color;
  // Accessibility person icon (standard wheelchair/person-circle)
  btn.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="4.5" r="2"/>
      <path d="M12 8c-1.1 0-2 .9-2 2v4.5H7l-1.5 4h1.6l1-2.5H10v3h4v-3h1.9l1 2.5H18.5L17 14.5H14V10c0-1.1-.9-2-2-2z"/>
    </svg>
  `;
  return btn;
}

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
  position: Position
): void {
  const btnRect = btn.getBoundingClientRect();
  const gap = 12;

  panel.style.bottom = "auto";
  panel.style.top = "auto";
  panel.style.right = "auto";
  panel.style.left = "auto";

  if (position.includes("bottom")) {
    panel.style.bottom = `${window.innerHeight - btnRect.top + gap}px`;
  } else {
    panel.style.top = `${btnRect.bottom + gap}px`;
  }

  if (position.includes("right")) {
    panel.style.right = "20px";
  } else {
    panel.style.left = "20px";
  }
}
