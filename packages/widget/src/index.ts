import type {
  ColorBlindType,
  WidgetConfig,
  WidgetFeatures,
} from "@inculva/types";
import {
  featureHandlers,
  getColorBlindType,
  setColorBlindType,
  FEATURE_LEVELS,
  CBM_CYCLE_TYPES,
  SR_MODE_LABELS,
  setSrLang,
} from "./features/index.js";
import {
  createPanel,
  updatePanel,
  updatePreFooterSide,
  createTriggerButton,
  applyPosition,
  applyPanelPosition,
  getLabels,
  PROFILES,
  FEATURE_CATEGORIES,
  SUPPORTED_LANGUAGES,
} from "./ui/panel.js";
import { widgetStyles } from "./ui/styles.js";
import { savePrefs, loadPrefs } from "./utils/storage.js";
import { getSessionId } from "./utils/session.js";

type PartialConfig = Partial<WidgetConfig> & { siteId: string };

const DEFAULT_CONFIG: Omit<WidgetConfig, "siteId"> = {
  position: "bottom-right",
  theme: "light",
  primaryColor: "#0066cc",
  language: "en",
  features: {
    // Core
    textResizing: true,
    dyslexiaFont: true,
    cursorEnhancement: true,
    keyboardNavigation: true,
    readingGuide: true,
    screenReader: true,
    pauseAnimations: true,
    // WCAG 2.1 / 2.2 additions
    textSpacing: true,
    highlightLinks: true,
    colorBlindMode: true,
    largeClickTargets: true,
    focusHighlight: true,
    // WCAG 2.4.1 A + 1.4.2 A (ADA/EAA)
    skipNavigation: true,
    muteMedia: true,
    // P1 — additional accessibility aids
    readingMask: true,
    textAlign: true,
    saturation: true,
    // Phase 2 — shown in grid (stubs; visual toggle only until implemented)
    blueLightFilter: true,
    hideImages: true,
    darkMode: true,
    contentMagnifier: true,
    toolTips: false,
    sustainabilityMode: false,
    slowCursor: true,
    dictionary: false,
    lineHeight: true,
    highlightTitles: true,
  },
};

class InculvaWidget {
  private config: WidgetConfig;
  private activeFeatures: Set<keyof WidgetFeatures> = new Set();
  private activeProfiles: Set<string> = new Set();
  /** Current level (1-N) for leveled features. 0 / absent means feature is off. */
  private featureLevels: Map<keyof WidgetFeatures, number> = new Map();
  private isOpen = false;
  private btn!: HTMLButtonElement;
  private badge!: HTMLSpanElement;
  private panel!: HTMLDivElement;
  private backdrop!: HTMLDivElement;
  private liveRegion!: HTMLElement;
  private tooltip!: HTMLDivElement;
  private apiBase: string;
  /** Remote labels override from the API config (may be empty). */
  private labels: Record<string, string> = {};
  /** Merged labels: built-in translations for the current language + remote overrides. */
  private get _labels(): Record<string, string> {
    return { ...getLabels(this.config.language), ...this.labels };
  }

  constructor(partialConfig: PartialConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...partialConfig,
      features: {
        ...DEFAULT_CONFIG.features,
        ...partialConfig.features,
      },
    };
    this.apiBase =
      (window as Window & { INCULVA_API_URL?: string }).INCULVA_API_URL ??
      "https://api.inculva.com";
    this.init();
  }

  private init(): void {
    void this.bootstrap();
  }

  /**
   * Fetch remote config first — only render the widget if the site-id is valid
   * and the domain is authorized. On 404/403 we abort silently; on network
   * errors we fail open (render with defaults) so customer sites aren't broken
   * by a transient API outage.
   */
  private async bootstrap(): Promise<void> {
    const authorized = await this.fetchRemoteConfig();
    if (!authorized) return;

    this.injectStyles();
    this.applyTheme();
    this.renderWidget();
    setSrLang(this.config.language);
    this.restorePrefs();
    this.applyConfigToDOM();
  }

  private injectStyles(): void {
    const style = document.createElement("style");
    style.id = "inculva-styles";
    style.textContent = widgetStyles.replace(
      /var\(--inculva-primary,\s*#0066cc\)/g,
      `var(--inculva-primary, ${this.config.primaryColor})`,
    );
    document.head.appendChild(style);

    document.documentElement.style.setProperty(
      "--inculva-primary",
      this.config.primaryColor,
    );
    // Set --inculva-primary-rgb for rgba() fallbacks (cross-browser color-mix alternative)
    const hex = this.config.primaryColor.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    document.documentElement.style.setProperty(
      "--inculva-primary-rgb",
      `${r},${g},${b}`,
    );
  }

  private applyTheme(): void {
    // Widget uses its own visual style (corpowid-style light panel).
    // data-inculva-theme is still set for any custom theme overrides.
    const theme =
      this.config.theme === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : this.config.theme;
    document.documentElement.setAttribute("data-inculva-theme", theme);
  }

  private renderWidget(): void {
    this.btn = createTriggerButton(this.config.primaryColor);
    // Badge is injected into the button by createTriggerButton
    this.badge = this.btn.querySelector<HTMLSpanElement>(
      "#inculva-widget-badge",
    )!;

    this.panel = createPanel(
      this.config.features,
      this.config.language,
      this.config.accessibilityStatementUrl,
      this.config.whiteLabelText,
      this.config.position.includes("left"),
    );

    // Transparent backdrop — captures click-outside-to-close without dimming
    this.backdrop = document.createElement("div");
    this.backdrop.id = "inculva-widget-backdrop";
    this.backdrop.addEventListener("click", () => this.closePanel());

    // WCAG 4.1.3 — aria-live region for status announcements
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("role", "status");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "inculva-sr-only";
    document.body.appendChild(this.liveRegion);

    applyPosition(this.btn, this.config.position);
    applyPosition(this.panel, this.config.position);
    if (this.config.position.includes("left")) {
      this.panel.setAttribute("data-panel-side", "left");
    }

    this.btn.addEventListener("click", () => this.togglePanel());
    this.panel.addEventListener("click", (e) => {
      const actionTarget = (e.target as HTMLElement).closest(
        "[data-inculva-action]",
      ) as HTMLElement | null;
      if (actionTarget) {
        const action = actionTarget.dataset["inculvaAction"];
        if (action === "close") {
          this.closePanel();
          return;
        }
        if (action === "reset") {
          this.resetAll();
          return;
        }
        if (action === "toggle-profiles") {
          this.toggleProfiles();
          return;
        }
        if (action === "switch-side") {
          this.switchSide();
          return;
        }
        if (action === "lang-dropdown-toggle") {
          this._toggleLangDropdown();
          return;
        }
        if (action === "set-language") {
          const langCode = actionTarget.dataset["langCode"];
          if (langCode) this._setLanguage(langCode);
          return;
        }
      }
      // Size mode switch (Mini / Regular / XL)
      // Must match ONLY the size-bar pills or mini-expand button — NOT the panel
      // itself, which carries data-size="regular" as a layout flag and would
      // intercept every click via closest() if used as the selector.
      const sizeTarget = (e.target as HTMLElement).closest(
        ".inculva-ctrl-btn.inculva-size-btn, .inculva-mini-btn",
      ) as HTMLElement | null;
      if (sizeTarget?.dataset["size"]) {
        this.switchSize(
          sizeTarget.dataset["size"] as "mini" | "regular" | "xl",
        );
        return;
      }
      // Category tab switch
      const tabTarget = (e.target as HTMLElement).closest(
        "[data-inculva-tab]",
      ) as HTMLElement | null;
      if (tabTarget?.dataset["inculvaTab"]) {
        this.switchTab(tabTarget.dataset["inculvaTab"]);
        return;
      }
      // Profile activation
      const profileTarget = (e.target as HTMLElement).closest(
        "[data-profile]",
      ) as HTMLElement | null;
      if (profileTarget?.dataset["profile"]) {
        this.activateProfile(profileTarget.dataset["profile"]);
        return;
      }
      // Color blind type selector click
      const cbmTypeTarget = (e.target as HTMLElement).closest(
        "[data-cbm-type]",
      ) as HTMLElement | null;
      if (cbmTypeTarget?.dataset["cbmType"]) {
        this.selectColorBlindType(
          cbmTypeTarget.dataset["cbmType"] as ColorBlindType,
        );
        return;
      }
      // Feature toggle / cycle click
      const target = (e.target as HTMLElement).closest(
        "[data-feature]",
      ) as HTMLElement | null;
      if (target?.dataset["feature"]) {
        const feat = target.dataset["feature"] as keyof WidgetFeatures;
        if (FEATURE_LEVELS[feat]) {
          this.cycleFeatureLevel(feat);
        } else {
          this.toggleFeature(feat);
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      // Alt+A global shortcut to toggle widget
      if (
        e.altKey &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        e.key === "a"
      ) {
        e.preventDefault();
        this.togglePanel();
        return;
      }
      if (e.key === "Escape" && this.isOpen) {
        // Close lang dropdown first if open
        const dropdown = this.panel.querySelector<HTMLElement>(
          ".inculva-lang-dropdown",
        );
        if (dropdown?.classList.contains("open")) {
          this._closeLangDropdown();
          return;
        }
        this.closePanel();
        return;
      }
      // Arrow key navigation within open lang dropdown
      if (this.isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        const dropdown = this.panel.querySelector<HTMLElement>(
          ".inculva-lang-dropdown",
        );
        if (dropdown?.classList.contains("open")) {
          e.preventDefault();
          const options = Array.from(
            dropdown.querySelectorAll<HTMLElement>(".inculva-lang-option"),
          );
          const focused = document.activeElement as HTMLElement;
          const currentIdx = options.indexOf(focused);
          const nextIdx =
            e.key === "ArrowDown"
              ? Math.min(currentIdx + 1, options.length - 1)
              : Math.max(currentIdx - 1, 0);
          options[nextIdx]?.focus();
          return;
        }
      }
      // WCAG 2.1.2 — focus trap: keep Tab/Shift+Tab within the dialog
      if (e.key === "Tab" && this.isOpen) {
        this.trapFocus(e);
      }
    });

    // Tooltip element — position:fixed, mounted on <html> to escape any
    // overflow:hidden ancestor and always float above panel content.
    this.tooltip = document.createElement("div");
    this.tooltip.id = "inculva-tooltip";
    document.documentElement.appendChild(this.tooltip);

    // Language search input filtering (matches native name, English name, and lang code)
    this.panel.addEventListener("input", (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("inculva-lang-search")) return;
      const query = (target as HTMLInputElement).value.toLowerCase().trim();
      const dropdown = this.panel.querySelector<HTMLElement>(
        ".inculva-lang-dropdown",
      );
      if (!dropdown) return;
      for (const opt of dropdown.querySelectorAll<HTMLElement>(
        ".inculva-lang-option",
      )) {
        if (!query) {
          opt.classList.remove("inculva-hidden");
          continue;
        }
        const nativeName =
          opt.querySelector(".inculva-lang-name")?.textContent?.toLowerCase() ??
          "";
        const englishName = (opt.dataset["enName"] ?? "").toLowerCase();
        const code = (opt.dataset["langCode"] ?? "").toLowerCase();
        const matches =
          nativeName.includes(query) ||
          englishName.includes(query) ||
          code.startsWith(query);
        opt.classList.toggle("inculva-hidden", !matches);
      }
    });

    // Tooltip hover delegation on the panel
    this.panel.addEventListener("mouseover", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-tooltip]",
      );
      if (btn) this._showTooltip(btn);
    });
    this.panel.addEventListener("mouseout", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-tooltip]",
      );
      if (btn) this._hideTooltip();
    });

    // Mount widget elements on <html> (outside <body>) so that any CSS filter
    // applied to <body> by accessibility features (dark mode, grayscale, etc.)
    // never affects the widget UI. position:fixed on these elements is always
    // relative to the viewport when they are not descendants of a filtered element.
    document.documentElement.appendChild(this.backdrop);
    document.documentElement.appendChild(this.btn);
    document.documentElement.appendChild(this.panel);
  }

  private _showTooltip(el: HTMLElement): void {
    const text = el.dataset["tooltip"];
    if (!text) return;
    this.tooltip.textContent = text;
    // Reset inline positioning so prior direction doesn't linger
    this.tooltip.style.left = "";
    this.tooltip.style.right = "";
    const rect = el.getBoundingClientRect();
    const isMini = this.panel.dataset["size"] === "mini";
    const isRightSide = this.config.position.includes("right");
    if (isMini) {
      // In mini mode tooltip floats to the OPPOSITE side of the widget
      const midY = rect.top + rect.height / 2;
      this.tooltip.style.top = `${midY}px`;
      this.tooltip.style.transform = "translateY(-50%)";
      if (isRightSide) {
        // Widget is on the right → tooltip goes LEFT
        this.tooltip.style.right = `${window.innerWidth - rect.left + 8}px`;
      } else {
        // Widget is on the left → tooltip goes RIGHT
        this.tooltip.style.left = `${rect.right + 8}px`;
      }
    } else {
      // In regular/large mode tooltip appears above the button, centered
      this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
      this.tooltip.style.top = `${rect.top - 6}px`;
      this.tooltip.style.transform = "translate(-50%, -100%)";
    }
    this.tooltip.classList.add("visible");
  }

  private _hideTooltip(): void {
    this.tooltip.classList.remove("visible");
  }

  private togglePanel(): void {
    this.isOpen ? this.closePanel() : this.openPanel();
  }

  /** WCAG 2.4.3 — focus moves into dialog on open */
  private openPanel(): void {
    this.isOpen = true;
    this.panel.classList.add("open");
    this.backdrop.classList.add("open");
    this.btn.setAttribute("aria-expanded", "true");
    applyPanelPosition(this.panel, this.btn, this.config.position);
    this.trackEvent("opened");

    // Move focus to first interactive element after the panel is visible
    requestAnimationFrame(() => {
      const first = this.panel.querySelector<HTMLElement>(
        'button:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    });
  }

  /** WCAG 2.4.3 — focus returns to trigger button on close */
  private closePanel(): void {
    this._closeLangDropdown();
    this.isOpen = false;
    this.panel.classList.remove("open");
    this.backdrop.classList.remove("open");
    this.btn.setAttribute("aria-expanded", "false");
    this._hideTooltip();
    this.trackEvent("closed");
    this.btn.focus();
  }

  /** WCAG 2.1.2 — cycle Tab/Shift+Tab within the open dialog */
  private trapFocus(e: KeyboardEvent): void {
    const focusable = Array.from(
      this.panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null); // visible only

    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /** WCAG 4.1.3 — announce state change to screen readers */
  private announce(message: string): void {
    // Clear then re-set so repeated toggles still fire (some SRs suppress duplicate content)
    this.liveRegion.textContent = "";
    requestAnimationFrame(() => {
      this.liveRegion.textContent = message;
    });
  }

  private toggleFeature(feature: keyof WidgetFeatures): void {
    const isActive = this.activeFeatures.has(feature);
    const handler = featureHandlers[feature];
    const maxLevels = FEATURE_LEVELS[feature];

    if (isActive) {
      handler.disable();
      this.activeFeatures.delete(feature);
      if (maxLevels) this.featureLevels.delete(feature);
      this.trackEvent("feature_disabled", feature);
    } else {
      // Enable at level 1 when triggered programmatically (profiles, restore)
      handler.enable(maxLevels ? 1 : undefined);
      this.activeFeatures.add(feature);
      if (maxLevels) this.featureLevels.set(feature, 1);
      this.trackEvent("feature_enabled", feature);
    }

    const btn = this.panel.querySelector<HTMLElement>(
      `[data-feature="${feature}"]`,
    );
    if (btn) {
      btn.classList.toggle("active", !isActive);
      btn.setAttribute("aria-pressed", String(!isActive));
      if (maxLevels) {
        if (!isActive) {
          btn.dataset["level"] = "1";
        } else {
          delete btn.dataset["level"];
        }
      }
    }

    // colorBlindMode: update the button label to show the active type name
    if (feature === "colorBlindMode" && btn) {
      const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
      if (labelEl) {
        labelEl.textContent = !isActive
          ? this._cbmTypeName(1)
          : (this._labels["colorBlindMode"] ?? "Color Blind");
      }
    }

    const featureName = this._labels[feature] ?? feature;
    this.announce(`${featureName} ${!isActive ? "enabled" : "disabled"}`);

    this.updateActiveBadge();
    this.saveCurrentPrefs();
  }

  /** Cycle a leveled feature: Off → L1 → L2 → … → Lmax → Off */
  private cycleFeatureLevel(feature: keyof WidgetFeatures): void {
    const maxLevels = FEATURE_LEVELS[feature];
    if (!maxLevels) {
      this.toggleFeature(feature);
      return;
    }

    const handler = featureHandlers[feature];
    const currentLevel = this.featureLevels.get(feature) ?? 0;
    const nextLevel = currentLevel >= maxLevels ? 0 : currentLevel + 1;

    if (nextLevel === 0) {
      handler.disable();
      this.activeFeatures.delete(feature);
      this.featureLevels.delete(feature);
      this.trackEvent("feature_disabled", feature);
    } else {
      handler.enable(nextLevel);
      this.activeFeatures.add(feature);
      this.featureLevels.set(feature, nextLevel);
      this.trackEvent("feature_enabled", feature);
    }

    const btn = this.panel.querySelector<HTMLElement>(
      `[data-feature="${feature}"]`,
    );
    if (btn) {
      btn.classList.toggle("active", nextLevel > 0);
      btn.setAttribute("aria-pressed", String(nextLevel > 0));
      if (nextLevel > 0) {
        btn.dataset["level"] = String(nextLevel);
      } else {
        delete btn.dataset["level"];
      }
    }

    // colorBlindMode: update button label to show the active type name
    if (feature === "colorBlindMode" && btn) {
      const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
      if (labelEl) {
        labelEl.textContent =
          nextLevel > 0
            ? this._cbmTypeName(nextLevel)
            : (this._labels["colorBlindMode"] ?? "Color Blind");
      }
    }

    // saturation level 1 = high contrast: update label accordingly
    if (feature === "saturation" && btn) {
      const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
      if (labelEl) {
        if (nextLevel === 0) {
          labelEl.textContent = this._labels["saturation"] ?? "Contrast+";
        } else if (nextLevel === 1) {
          labelEl.textContent = this._labels["highContrast"] ?? "High Contrast";
        } else {
          labelEl.textContent = this._labels["saturation"] ?? "Contrast+";
        }
      }
    }

    // screenReader: update button label to show the active mode name
    if (feature === "screenReader" && btn) {
      const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
      if (labelEl) {
        labelEl.textContent =
          nextLevel > 0
            ? (SR_MODE_LABELS[nextLevel] ?? "Screen reader")
            : (this._labels["screenReader"] ?? "Screen reader");
      }
    }

    const featureName = this._labels[feature] ?? feature;
    const announcement =
      feature === "colorBlindMode" && nextLevel > 0
        ? `${featureName}: ${this._cbmTypeName(nextLevel)}`
        : feature === "screenReader" && nextLevel > 0
          ? `${featureName}: ${SR_MODE_LABELS[nextLevel] ?? "level " + String(nextLevel)}`
          : nextLevel > 0
            ? `${featureName} level ${nextLevel} of ${maxLevels}`
            : `${featureName} disabled`;
    this.announce(announcement);

    this.updateActiveBadge();
    this.saveCurrentPrefs();
  }

  /** Disable every active feature, deactivate all profiles, and reset preferences. */
  private resetAll(): void {
    for (const feature of [...this.activeFeatures]) {
      const handler = featureHandlers[feature];
      handler.disable();
      this.activeFeatures.delete(feature);
      const btn = this.panel.querySelector<HTMLElement>(
        `[data-feature="${feature}"]`,
      );
      if (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
        delete btn.dataset["level"];
        // Restore colorBlindMode label to default
        if (feature === "colorBlindMode") {
          const labelEl = btn.querySelector<HTMLElement>(
            ".inculva-feature-label",
          );
          if (labelEl)
            labelEl.textContent =
              this._labels["colorBlindMode"] ?? "Color Blind";
        }
        // Restore screenReader label to default
        if (feature === "screenReader") {
          const labelEl = btn.querySelector<HTMLElement>(
            ".inculva-feature-label",
          );
          if (labelEl)
            labelEl.textContent =
              this._labels["screenReader"] ?? "Screen reader";
        }
      }
    }
    this.featureLevels.clear();

    // Clear active profiles
    for (const profileKey of [...this.activeProfiles]) {
      const item = this.panel.querySelector<HTMLElement>(
        `[data-profile="${profileKey}"]`,
      );
      item?.classList.remove("active");
      item?.setAttribute("aria-pressed", "false");
    }
    this.activeProfiles.clear();

    // Hide color blind sub-selector
    const selector = this.panel.querySelector<HTMLElement>(
      ".inculva-cbm-selector",
    );
    selector?.classList.remove("visible");

    this.updateActiveBadge();
    this.saveCurrentPrefs();
    this.announce("All accessibility features reset");
  }

  /** Switch the active category tab and update the feature grid. */
  private switchTab(tab: string): void {
    for (const btn of this.panel.querySelectorAll<HTMLElement>(
      ".inculva-tab-btn",
    )) {
      const isActive = btn.dataset["inculvaTab"] === tab;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    }
    const grid = this.panel.querySelector<HTMLElement>(".inculva-feature-grid");
    if (grid) grid.dataset["activeTab"] = tab;
    applyPanelPosition(this.panel, this.btn, this.config.position);
  }

  /** Switch between Mini / Regular / Large size modes. */
  private switchSize(size: "mini" | "regular" | "large" | "xl"): void {
    const normalized = size === "xl" ? "large" : size;
    this.panel.dataset["size"] = normalized;
    for (const btn of this.panel.querySelectorAll<HTMLElement>(
      ".inculva-size-btn",
    )) {
      btn.classList.toggle("active", btn.dataset["size"] === normalized);
    }
    applyPanelPosition(this.panel, this.btn, this.config.position);
    this.saveCurrentPrefs();
  }

  /** Switch the panel language (RTL/LTR + translate all UI text). */
  private _setLanguage(lang: string): void {
    this.config.language = lang;
    setSrLang(lang);
    // Close dropdown first
    this._closeLangDropdown();
    // Re-render all translatable text via updatePanel
    updatePanel(
      this.panel,
      this.config.features,
      lang,
      this._labels,
      this.config.accessibilityStatementUrl,
      this.config.whiteLabelText,
    );
    // Update active count text with new language
    this.updateActiveBadge();
    this.saveCurrentPrefs();
  }

  private _toggleLangDropdown(): void {
    const dropdown = this.panel.querySelector<HTMLElement>(
      ".inculva-lang-dropdown",
    );
    if (!dropdown) return;
    if (dropdown.classList.contains("open")) {
      this._closeLangDropdown();
    } else {
      this._openLangDropdown();
    }
  }

  private _openLangDropdown(): void {
    const dropdown = this.panel.querySelector<HTMLElement>(
      ".inculva-lang-dropdown",
    );
    if (!dropdown) return;
    dropdown.classList.add("open");
    const trigger = dropdown.querySelector<HTMLElement>(
      ".inculva-lang-trigger",
    );
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    // Reset search and show all options
    const searchInput = dropdown.querySelector<HTMLInputElement>(
      ".inculva-lang-search",
    );
    if (searchInput) {
      searchInput.value = "";
      for (const opt of dropdown.querySelectorAll<HTMLElement>(
        ".inculva-lang-option",
      )) {
        opt.classList.remove("inculva-hidden");
      }
    }
    requestAnimationFrame(() => {
      // Focus the search input for immediate typing
      searchInput?.focus();
      const active = dropdown.querySelector<HTMLElement>(
        ".inculva-lang-option.active",
      );
      active?.scrollIntoView({ block: "nearest" });
    });
  }

  private _closeLangDropdown(): void {
    const dropdown = this.panel.querySelector<HTMLElement>(
      ".inculva-lang-dropdown",
    );
    if (!dropdown) return;
    dropdown.classList.remove("open");
    const trigger = dropdown.querySelector<HTMLElement>(
      ".inculva-lang-trigger",
    );
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  /** Toggle the widget between left-side and right-side of the viewport. */
  private switchSide(): void {
    const pos = this.config.position;
    const isLeft = pos.includes("left");
    const newPos = isLeft
      ? (pos.replace("left", "right") as typeof this.config.position)
      : (pos.replace("right", "left") as typeof this.config.position);

    this.config.position = newPos;

    // Re-apply trigger button and panel positions
    applyPosition(this.btn, newPos);
    applyPosition(this.panel, newPos);

    const nowLeft = newPos.includes("left");
    if (nowLeft) {
      this.panel.setAttribute("data-panel-side", "left");
    } else {
      this.panel.removeAttribute("data-panel-side");
    }

    // Re-position the open panel immediately
    if (this.isOpen) {
      applyPanelPosition(this.panel, this.btn, newPos);
    }

    // Update pre-footer switch label + toggle state
    updatePreFooterSide(this.panel, nowLeft, this._labels);
    this.saveCurrentPrefs();
  }

  /** Show / hide the profiles accordion. */
  private toggleProfiles(): void {
    const toggle = this.panel.querySelector<HTMLElement>(
      ".inculva-profiles-toggle",
    );
    const grid = this.panel.querySelector<HTMLElement>(
      ".inculva-profiles-grid",
    );
    if (!toggle || !grid) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    grid.hidden = expanded;
  }

  /** Activate or deactivate an accessibility profile (preset feature combo). */
  private activateProfile(profileKey: string): void {
    const profile = PROFILES.find((p) => p.key === profileKey);
    if (!profile) return;

    const isActive = this.activeProfiles.has(profileKey);

    if (isActive) {
      // Deactivate: turn off features that were enabled by this profile only
      for (const feat of profile.features) {
        if (this.activeFeatures.has(feat)) {
          this.toggleFeature(feat);
        }
      }
      this.activeProfiles.delete(profileKey);
    } else {
      // Activate: enable all profile features
      for (const feat of profile.features) {
        if (!this.activeFeatures.has(feat)) {
          this.toggleFeature(feat);
        }
      }
      this.activeProfiles.add(profileKey);
    }

    // Update profile item active state
    const item = this.panel.querySelector<HTMLElement>(
      `[data-profile="${profileKey}"]`,
    );
    item?.classList.toggle("active", !isActive);
    item?.setAttribute("aria-pressed", String(!isActive));

    this.announce(
      `Profile ${profile.label} ${!isActive ? "activated" : "deactivated"}`,
    );
    this.saveCurrentPrefs();
  }

  /** Sync the red badge count on the trigger button, header pill, and per-tab counts. */
  private updateActiveBadge(): void {
    const count = this.activeFeatures.size;
    if (this.badge) {
      this.badge.textContent = String(count);
      this.badge.classList.toggle("visible", count > 0);
    }
    // Sync header active-count pill
    const countEl = this.panel.querySelector<HTMLElement>(
      ".inculva-active-count",
    );
    if (countEl) {
      const labels = getLabels(this.config.language);
      countEl.textContent = `${count} ${labels.active ?? "active"}`;
      countEl.hidden = count === 0;
    }
    // Sync per-tab count badges
    for (const [tabKey, feats] of Object.entries(FEATURE_CATEGORIES)) {
      const tabCount = (feats as readonly string[]).filter((f) =>
        this.activeFeatures.has(f as keyof WidgetFeatures),
      ).length;
      const tabBtn = this.panel.querySelector<HTMLElement>(
        `[data-inculva-tab="${tabKey}"]`,
      );
      if (!tabBtn) continue;
      const tabCountEl =
        tabBtn.querySelector<HTMLElement>(".inculva-tab-count");
      if (tabCountEl) {
        tabCountEl.textContent = String(tabCount);
        tabCountEl.hidden = tabCount === 0;
      }
    }
  }

  /** Returns the localised display name for a colorBlindMode level (1-based). */
  private _cbmTypeName(level: number): string {
    const key = CBM_CYCLE_TYPES[level - 1];
    if (!key) return this._labels["colorBlindMode"] ?? "Color Blind";
    return this._labels[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
  }

  private selectColorBlindType(type: ColorBlindType): void {
    setColorBlindType(type);

    // Update active state on type buttons immediately
    const selector = this.panel.querySelector(".inculva-cbm-selector");
    if (selector) {
      for (const btn of selector.querySelectorAll<HTMLElement>(
        "[data-cbm-type]",
      )) {
        const isThis = btn.dataset["cbmType"] === type;
        btn.classList.toggle("active", isThis);
        btn.setAttribute("aria-pressed", String(isThis));
      }
    }

    // If colorBlindMode isn't already active, enable it
    if (!this.activeFeatures.has("colorBlindMode")) {
      this.toggleFeature("colorBlindMode");
      return; // toggleFeature handles pref saving
    }

    this.announce(`Color blind mode: ${type}`);
    this.saveCurrentPrefs();
  }

  private saveCurrentPrefs(): void {
    const prefs: Record<string, boolean | string | number | string[]> = {};
    for (const feature of this.activeFeatures) {
      // Save the current level for leveled features (otherwise just true)
      prefs[feature] = this.featureLevels.get(feature) ?? true;
    }
    prefs["colorBlindType"] = getColorBlindType();
    // Persist UI state: widget size, position, and language
    prefs["widgetSize"] = this.panel.dataset["size"] ?? "regular";
    prefs["widgetPosition"] = this.config.position;
    prefs["widgetLanguage"] = this.config.language;
    // Persist selected profiles
    prefs["activeProfiles"] = Array.from(this.activeProfiles);
    savePrefs(prefs);
  }

  private restorePrefs(): void {
    const prefs = loadPrefs();

    // Restore language FIRST — so UI renders with the correct language
    const savedLang = prefs["widgetLanguage"];
    if (
      typeof savedLang === "string" &&
      SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)
    ) {
      this.config.language = savedLang;
      setSrLang(savedLang);
      // Re-render panel with saved language
      updatePanel(
        this.panel,
        this.config.features,
        savedLang,
        this._labels,
        this.config.accessibilityStatementUrl,
        this.config.whiteLabelText,
      );
    }

    // Restore position SECOND — so that when switchSize() calls saveCurrentPrefs()
    // it serialises the correct position rather than the default.
    const savedPos = prefs["widgetPosition"];
    if (
      typeof savedPos === "string" &&
      ["bottom-right", "bottom-left", "top-right", "top-left"].includes(
        savedPos,
      )
    ) {
      this.config.position = savedPos as typeof this.config.position;
      applyPosition(this.btn, this.config.position);
      applyPosition(this.panel, this.config.position);
      const nowLeft = this.config.position.includes("left");
      if (nowLeft) {
        this.panel.setAttribute("data-panel-side", "left");
      } else {
        this.panel.removeAttribute("data-panel-side");
      }
      updatePreFooterSide(this.panel, nowLeft, this._labels);
    }

    // Restore widget size (after position is set so saveCurrentPrefs() captures both)
    if (
      typeof prefs["widgetSize"] === "string" &&
      ["mini", "regular", "large"].includes(prefs["widgetSize"] as string)
    ) {
      this.switchSize(prefs["widgetSize"] as "mini" | "regular" | "large");
    }

    // Restore active profiles
    const savedProfiles = prefs["activeProfiles"];
    if (Array.isArray(savedProfiles)) {
      for (const profileKey of savedProfiles) {
        if (
          typeof profileKey === "string" &&
          PROFILES.find((p) => p.key === profileKey)
        ) {
          this.activeProfiles.add(profileKey);
          const item = this.panel.querySelector<HTMLElement>(
            `[data-profile="${profileKey}"]`,
          );
          item?.classList.add("active");
          item?.setAttribute("aria-pressed", "true");
        }
      }
    }

    for (const [feature, value] of Object.entries(prefs)) {
      if (feature === "colorBlindType") continue; // legacy key — ignored
      if (
        feature === "widgetSize" ||
        feature === "widgetPosition" ||
        feature === "widgetLanguage" ||
        feature === "activeProfiles"
      )
        continue;
      if (!(feature in featureHandlers)) continue;
      const feat = feature as keyof WidgetFeatures;
      const maxLevels = FEATURE_LEVELS[feat];

      if (
        maxLevels &&
        typeof value === "number" &&
        value >= 1 &&
        value <= maxLevels
      ) {
        // Restore leveled feature at its saved level
        featureHandlers[feat].enable(value);
        this.activeFeatures.add(feat);
        this.featureLevels.set(feat, value);
        const btn = this.panel.querySelector<HTMLElement>(
          `[data-feature="${feat}"]`,
        );
        if (btn) {
          btn.classList.add("active");
          btn.setAttribute("aria-pressed", "true");
          btn.dataset["level"] = String(value);
          // Restore colorBlindMode type label
          if (feat === "colorBlindMode") {
            const labelEl = btn.querySelector<HTMLElement>(
              ".inculva-feature-label",
            );
            if (labelEl) labelEl.textContent = this._cbmTypeName(value);
          }
          // Restore saturation label (level 1 = high contrast)
          if (feat === "saturation") {
            const labelEl = btn.querySelector<HTMLElement>(
              ".inculva-feature-label",
            );
            if (labelEl)
              labelEl.textContent =
                value === 1
                  ? (this._labels["highContrast"] ?? "High Contrast")
                  : (this._labels["saturation"] ?? "Contrast+");
          }
          // Restore screenReader mode label
          if (feat === "screenReader") {
            const labelEl = btn.querySelector<HTMLElement>(
              ".inculva-feature-label",
            );
            if (labelEl)
              labelEl.textContent =
                SR_MODE_LABELS[value] ??
                this._labels["screenReader"] ??
                "Screen reader";
          }
        }
      } else if (value === true || (typeof value === "number" && value >= 1)) {
        this.toggleFeature(feat);
      }
    }
    // Sync badge after all saved preferences are restored
    this.updateActiveBadge();
  }

  /**
   * Fetches remote config and merges it into this.config / this.labels.
   * Returns false when the widget must NOT render (404 = unknown site-id,
   * 403 = domain not authorized). Returns true on success or on transient
   * network/server errors so customer sites degrade gracefully.
   *
   * Intentionally performs NO DOM operations — all DOM work happens in
   * applyConfigToDOM() after the widget is rendered.
   */
  private async fetchRemoteConfig(): Promise<boolean> {
    try {
      const res = await fetch(
        `${this.apiBase}/widget/config/${this.config.siteId}`,
      );

      if (res.status === 404 || res.status === 403) {
        console.warn(
          `[Inculva] Widget disabled — ${res.status === 404 ? "site not found" : "domain not authorized"}.`,
        );
        return false;
      }

      if (!res.ok) {
        // Transient server error — fail open, render with defaults
        return true;
      }

      const body = (await res.json()) as {
        success?: boolean;
        data?: Partial<WidgetConfig> & {
          labels?: Record<string, string>;
          accessibilityStatementUrl?: string;
        };
      };
      const remote =
        body.data ??
        (body as Partial<WidgetConfig> & {
          labels?: Record<string, string>;
          accessibilityStatementUrl?: string;
        });

      if (remote.primaryColor) this.config.primaryColor = remote.primaryColor;
      if (remote.features)
        this.config.features = { ...this.config.features, ...remote.features };
      if (remote.language) this.config.language = remote.language;
      if (remote.position) this.config.position = remote.position;
      if (remote.theme) this.config.theme = remote.theme;
      if (remote.accessibilityStatementUrl !== undefined)
        this.config.accessibilityStatementUrl =
          remote.accessibilityStatementUrl;
      if (remote.whiteLabelText !== undefined)
        this.config.whiteLabelText = remote.whiteLabelText;
      if (remote.borderRadius !== undefined)
        this.config.borderRadius = remote.borderRadius;
      if (remote.buttonSize !== undefined)
        this.config.buttonSize = remote.buttonSize;
      if (remote.fontFamily !== undefined)
        this.config.fontFamily = remote.fontFamily;
      if ((remote as Partial<WidgetConfig>).headerBgColor !== undefined)
        this.config.headerBgColor = (
          remote as Partial<WidgetConfig>
        ).headerBgColor!;
      if ((remote as Partial<WidgetConfig>).footerBgColor !== undefined)
        this.config.footerBgColor = (
          remote as Partial<WidgetConfig>
        ).footerBgColor!;
      if (remote.labels) this.labels = remote.labels;

      return true;
    } catch {
      // Network unavailable — fail open, render with defaults
      return true;
    }
  }

  /**
   * Applies remote config values that require DOM access.
   * Called after renderWidget() so this.btn and this.panel are guaranteed to exist.
   */
  private applyConfigToDOM(): void {
    // Business plan visual customization CSS vars
    if (this.config.borderRadius !== undefined) {
      document.documentElement.style.setProperty(
        "--inculva-border-radius",
        `${this.config.borderRadius}px`,
      );
    }
    if (this.config.buttonSize !== undefined) {
      document.documentElement.style.setProperty(
        "--inculva-button-size",
        this.config.buttonSize === "small"
          ? "44px"
          : this.config.buttonSize === "large"
            ? "64px"
            : "52px",
      );
    }
    // Set the CSS custom property only — no external font request is made.
    // If the font is already present on the customer's site it will render;
    // otherwise the stack falls back to sans-serif. This keeps the widget
    // fully compatible with strict font-src CSP policies.
    if (
      this.config.fontFamily !== undefined &&
      this.config.fontFamily !== "system"
    ) {
      document.documentElement.style.setProperty(
        "--inculva-font",
        this.getFontStack(this.config.fontFamily),
      );
    }
    if (this.config.headerBgColor) {
      document.documentElement.style.setProperty(
        "--inculva-header-bg",
        this.config.headerBgColor,
      );
    }
    if (this.config.footerBgColor) {
      document.documentElement.style.setProperty(
        "--inculva-footer-bg",
        this.config.footerBgColor,
      );
    }

    // Apply labels to panel text (built-in translations + optional remote overrides)
    updatePanel(
      this.panel,
      this.config.features,
      this.config.language,
      this._labels,
      this.config.accessibilityStatementUrl,
      this.config.whiteLabelText,
    );

    // Sync panel side attribute with final config position (remote may override it)
    if (this.config.position.includes("left")) {
      this.panel.setAttribute("data-panel-side", "left");
    } else {
      this.panel.removeAttribute("data-panel-side");
    }
  }

  private getFontStack(fontFamily: string): string {
    const stacks: Record<string, string> = {
      inter: "'Inter', sans-serif",
      roboto: "'Roboto', sans-serif",
      opensans: "'Open Sans', sans-serif",
    };
    return stacks[fontFamily] ?? "inherit";
  }

  private trackEvent(
    event: "opened" | "closed" | "feature_enabled" | "feature_disabled",
    feature?: keyof WidgetFeatures,
  ): void {
    const payload = {
      siteId: this.config.siteId,
      sessionId: getSessionId(),
      event,
      feature,
      timestamp: new Date().toISOString(),
    };

    void fetch(`${this.apiBase}/widget/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  }
}

// Capture currentScript synchronously at parse time.
// document.currentScript is null inside deferred scripts and event listeners,
// so it must be read here — at module scope — before any async boundary.
const _selfScript = document.currentScript as HTMLScriptElement | null;

type PreviewConfig = Partial<WidgetConfig> & { siteId?: string };

function autoInit(): void {
  // Primary: read data-site-id from the script tag captured at parse time.
  const siteId =
    _selfScript?.dataset["siteId"] ??
    _selfScript?.getAttribute("data-site-id") ??
    // Fallback: dashboard preview iframe injects __INCULVA_PREVIEW_CONFIG__
    // with the siteId when the script is loaded via srcdoc (no currentScript).
    (window as Window & { __INCULVA_PREVIEW_CONFIG__?: PreviewConfig })
      .__INCULVA_PREVIEW_CONFIG__?.siteId;

  if (!siteId) {
    console.warn("[Inculva] Missing data-site-id attribute on script tag.");
    return;
  }

  const previewConfig = (
    window as Window & { __INCULVA_PREVIEW_CONFIG__?: PreviewConfig }
  ).__INCULVA_PREVIEW_CONFIG__;

  new InculvaWidget({ ...(previewConfig ?? {}), siteId });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoInit);
} else {
  autoInit();
}

// Allow manual init
(window as unknown as { InculvaWidget: typeof InculvaWidget }).InculvaWidget =
  InculvaWidget;
