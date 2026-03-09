import type { ColorBlindType, WidgetConfig, WidgetFeatures } from "@inculva/types";
import { featureHandlers, getColorBlindType, setColorBlindType, FEATURE_LEVELS, CBM_CYCLE_TYPES } from "./features/index.js";
import {
  createPanel,
  updatePanel,
  createTriggerButton,
  applyPosition,
  applyPanelPosition,
  PROFILES,
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
    highContrast: true,
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
    grayscale: true,
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
    slowCursor: false,
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
  private apiBase: string;
  /** Labels from the last successful remote config fetch (used for aria-live announcements). */
  private labels: Record<string, string> = {};

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
    this.restorePrefs();
    this.applyConfigToDOM();
  }

  private injectStyles(): void {
    const style = document.createElement("style");
    style.id = "inculva-styles";
    style.textContent = widgetStyles.replace(
      /var\(--inculva-primary,\s*#0066cc\)/g,
      `var(--inculva-primary, ${this.config.primaryColor})`
    );
    document.head.appendChild(style);

    document.documentElement.style.setProperty(
      "--inculva-primary",
      this.config.primaryColor
    );
  }

  private applyTheme(): void {
    // Widget uses its own visual style (corpowid-style light panel).
    // data-inculva-theme is still set for any custom theme overrides.
    const theme = this.config.theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : this.config.theme;
    document.documentElement.setAttribute("data-inculva-theme", theme);

    // Apply panel-side hint so border-radius flips correctly
    const isLeft = this.config.position.includes("left");
    if (isLeft) this.panel?.setAttribute("data-panel-side", "left");
  }

  private renderWidget(): void {
    this.btn = createTriggerButton(this.config.primaryColor);
    // Badge is injected into the button by createTriggerButton
    this.badge = this.btn.querySelector<HTMLSpanElement>("#inculva-widget-badge")!;

    this.panel = createPanel(
      this.config.features,
      this.config.language,
      this.config.accessibilityStatementUrl,
      this.config.whiteLabelText,
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
      const actionTarget = (e.target as HTMLElement).closest("[data-inculva-action]") as HTMLElement | null;
      if (actionTarget) {
        const action = actionTarget.dataset["inculvaAction"];
        if (action === "close") { this.closePanel(); return; }
        if (action === "reset") { this.resetAll(); return; }
        if (action === "toggle-profiles") { this.toggleProfiles(); return; }
      }
      // Size mode switch (Mini / Regular / XL)
      // Must match ONLY the size-bar pills or mini-expand button — NOT the panel
      // itself, which carries data-size="regular" as a layout flag and would
      // intercept every click via closest() if used as the selector.
      const sizeTarget = (e.target as HTMLElement).closest(
        ".inculva-size-btn, .inculva-mini-btn"
      ) as HTMLElement | null;
      if (sizeTarget?.dataset["size"]) {
        this.switchSize(sizeTarget.dataset["size"] as "mini" | "regular" | "xl");
        return;
      }
      // Profile activation
      const profileTarget = (e.target as HTMLElement).closest("[data-profile]") as HTMLElement | null;
      if (profileTarget?.dataset["profile"]) {
        this.activateProfile(profileTarget.dataset["profile"]);
        return;
      }
      // Color blind type selector click
      const cbmTypeTarget = (e.target as HTMLElement).closest("[data-cbm-type]") as HTMLElement | null;
      if (cbmTypeTarget?.dataset["cbmType"]) {
        this.selectColorBlindType(cbmTypeTarget.dataset["cbmType"] as ColorBlindType);
        return;
      }
      // Feature toggle / cycle click
      const target = (e.target as HTMLElement).closest("[data-feature]") as HTMLElement | null;
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
      if (e.key === "Escape" && this.isOpen) {
        this.closePanel();
        return;
      }
      // WCAG 2.1.2 — focus trap: keep Tab/Shift+Tab within the dialog
      if (e.key === "Tab" && this.isOpen) {
        this.trapFocus(e);
      }
    });

    // Mount widget elements on <html> (outside <body>) so that any CSS filter
    // applied to <body> by accessibility features (dark mode, grayscale, etc.)
    // never affects the widget UI. position:fixed on these elements is always
    // relative to the viewport when they are not descendants of a filtered element.
    document.documentElement.appendChild(this.backdrop);
    document.documentElement.appendChild(this.btn);
    document.documentElement.appendChild(this.panel);
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
        'button:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    });
  }

  /** WCAG 2.4.3 — focus returns to trigger button on close */
  private closePanel(): void {
    this.isOpen = false;
    this.panel.classList.remove("open");
    this.backdrop.classList.remove("open");
    this.btn.setAttribute("aria-expanded", "false");
    this.trackEvent("closed");
    this.btn.focus();
  }

  /** WCAG 2.1.2 — cycle Tab/Shift+Tab within the open dialog */
  private trapFocus(e: KeyboardEvent): void {
    const focusable = Array.from(
      this.panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
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

    const btn = this.panel.querySelector<HTMLElement>(`[data-feature="${feature}"]`);
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
          : (this.labels["colorBlindMode"] ?? "Color Blind");
      }
    }

    const featureName = this.labels[feature] ?? feature;
    this.announce(`${featureName} ${!isActive ? "enabled" : "disabled"}`);

    this.updateActiveBadge();
    this.saveCurrentPrefs();
  }

  /** Cycle a leveled feature: Off → L1 → L2 → … → Lmax → Off */
  private cycleFeatureLevel(feature: keyof WidgetFeatures): void {
    const maxLevels = FEATURE_LEVELS[feature];
    if (!maxLevels) { this.toggleFeature(feature); return; }

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

    const btn = this.panel.querySelector<HTMLElement>(`[data-feature="${feature}"]`);
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
        labelEl.textContent = nextLevel > 0
          ? this._cbmTypeName(nextLevel)
          : (this.labels["colorBlindMode"] ?? "Color Blind");
      }
    }

    const featureName = this.labels[feature] ?? feature;
    const announcement = feature === "colorBlindMode" && nextLevel > 0
      ? `${featureName}: ${this._cbmTypeName(nextLevel)}`
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
      const btn = this.panel.querySelector<HTMLElement>(`[data-feature="${feature}"]`);
      if (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
        delete btn.dataset["level"];
        // Restore colorBlindMode label to default
        if (feature === "colorBlindMode") {
          const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
          if (labelEl) labelEl.textContent = this.labels["colorBlindMode"] ?? "Color Blind";
        }
      }
    }
    this.featureLevels.clear();

    // Clear active profiles
    for (const profileKey of [...this.activeProfiles]) {
      const item = this.panel.querySelector<HTMLElement>(`[data-profile="${profileKey}"]`);
      item?.classList.remove("active");
      item?.setAttribute("aria-pressed", "false");
    }
    this.activeProfiles.clear();

    // Hide color blind sub-selector
    const selector = this.panel.querySelector<HTMLElement>(".inculva-cbm-selector");
    selector?.classList.remove("visible");

    this.updateActiveBadge();
    this.saveCurrentPrefs();
    this.announce("All accessibility features reset");
  }

  /** Switch between Mini / Regular / XL size modes. */
  private switchSize(size: "mini" | "regular" | "xl"): void {
    this.panel.dataset["size"] = size;
    for (const btn of this.panel.querySelectorAll<HTMLElement>("[data-size]")) {
      // Only toggle size-bar buttons (not the mini expand button which shares data-size)
      if (btn.classList.contains("inculva-size-btn")) {
        btn.classList.toggle("active", btn.dataset["size"] === size);
      }
    }
    // Recalculate panel position after size change
    applyPanelPosition(this.panel, this.btn, this.config.position);
  }

  /** Show / hide the profiles list. */
  private toggleProfiles(): void {
    const toggle = this.panel.querySelector<HTMLElement>(".inculva-profiles-toggle");
    const list   = this.panel.querySelector<HTMLElement>(".inculva-profiles-list");
    if (!toggle || !list) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    list.hidden = expanded;
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
    const item = this.panel.querySelector<HTMLElement>(`[data-profile="${profileKey}"]`);
    item?.classList.toggle("active", !isActive);
    item?.setAttribute("aria-pressed", String(!isActive));

    this.announce(`Profile ${profile.label} ${!isActive ? "activated" : "deactivated"}`);
  }

  /** Sync the red badge count on the trigger button. */
  private updateActiveBadge(): void {
    const count = this.activeFeatures.size;
    if (this.badge) {
      this.badge.textContent = String(count);
      this.badge.classList.toggle("visible", count > 0);
    }
    // Sync header active-count pill
    const countEl = this.panel.querySelector<HTMLElement>(".inculva-active-count");
    if (countEl) {
      countEl.textContent = `${count} active`;
      countEl.hidden = count === 0;
    }
  }

  /** Returns the localised display name for a colorBlindMode level (1-based). */
  private _cbmTypeName(level: number): string {
    const key = CBM_CYCLE_TYPES[level - 1];
    if (!key) return this.labels["colorBlindMode"] ?? "Color Blind";
    return this.labels[key] ?? (key.charAt(0).toUpperCase() + key.slice(1));
  }

  private selectColorBlindType(type: ColorBlindType): void {
    setColorBlindType(type);

    // If colorBlindMode isn't already active, enable it
    if (!this.activeFeatures.has("colorBlindMode")) {
      this.toggleFeature("colorBlindMode");
      return; // toggleFeature handles pref saving
    }

    // Update active state on type buttons
    const selector = this.panel.querySelector(".inculva-cbm-selector");
    if (selector) {
      for (const btn of selector.querySelectorAll<HTMLElement>("[data-cbm-type]")) {
        const isThis = btn.dataset["cbmType"] === type;
        btn.classList.toggle("active", isThis);
        btn.setAttribute("aria-pressed", String(isThis));
      }
    }

    this.announce(`Color blind mode: ${type}`);
    this.saveCurrentPrefs();
  }

  private saveCurrentPrefs(): void {
    const prefs: Record<string, boolean | string | number> = {};
    for (const feature of this.activeFeatures) {
      // Save the current level for leveled features (otherwise just true)
      prefs[feature] = this.featureLevels.get(feature) ?? true;
    }
    prefs["colorBlindType"] = getColorBlindType();
    savePrefs(prefs);
  }

  private restorePrefs(): void {
    const prefs = loadPrefs();
    for (const [feature, value] of Object.entries(prefs)) {
      if (feature === "colorBlindType") continue; // legacy key — ignored; type is now baked into level
      if (!(feature in featureHandlers)) continue;
      const feat = feature as keyof WidgetFeatures;
      const maxLevels = FEATURE_LEVELS[feat];

      if (maxLevels && typeof value === "number" && value >= 1 && value <= maxLevels) {
        // Restore leveled feature at its saved level
        featureHandlers[feat].enable(value);
        this.activeFeatures.add(feat);
        this.featureLevels.set(feat, value);
        const btn = this.panel.querySelector<HTMLElement>(`[data-feature="${feat}"]`);
        if (btn) {
          btn.classList.add("active");
          btn.setAttribute("aria-pressed", "true");
          btn.dataset["level"] = String(value);
          // Restore colorBlindMode type label
          if (feat === "colorBlindMode") {
            const labelEl = btn.querySelector<HTMLElement>(".inculva-feature-label");
            if (labelEl) labelEl.textContent = this._cbmTypeName(value);
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
        `${this.apiBase}/widget/config/${this.config.siteId}`
      );

      if (res.status === 404 || res.status === 403) {
        console.warn(
          `[Inculva] Widget disabled — ${res.status === 404 ? "site not found" : "domain not authorized"}.`
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
      const remote = body.data ?? (body as Partial<WidgetConfig> & {
        labels?: Record<string, string>;
        accessibilityStatementUrl?: string;
      });

      if (remote.primaryColor) this.config.primaryColor = remote.primaryColor;
      if (remote.features) this.config.features = { ...this.config.features, ...remote.features };
      if (remote.language) this.config.language = remote.language;
      if (remote.position) this.config.position = remote.position;
      if (remote.theme) this.config.theme = remote.theme;
      if (remote.accessibilityStatementUrl !== undefined) this.config.accessibilityStatementUrl = remote.accessibilityStatementUrl;
      if (remote.whiteLabelText !== undefined) this.config.whiteLabelText = remote.whiteLabelText;
      if (remote.borderRadius !== undefined) this.config.borderRadius = remote.borderRadius;
      if (remote.buttonSize !== undefined) this.config.buttonSize = remote.buttonSize;
      if (remote.fontFamily !== undefined) this.config.fontFamily = remote.fontFamily;
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
        `${this.config.borderRadius}px`
      );
    }
    if (this.config.buttonSize !== undefined) {
      document.documentElement.style.setProperty(
        "--inculva-button-size",
        this.config.buttonSize === "small" ? "44px" : this.config.buttonSize === "large" ? "64px" : "52px"
      );
    }
    // Set the CSS custom property only — no external font request is made.
    // If the font is already present on the customer's site it will render;
    // otherwise the stack falls back to sans-serif. This keeps the widget
    // fully compatible with strict font-src CSP policies.
    if (this.config.fontFamily !== undefined && this.config.fontFamily !== "system") {
      document.documentElement.style.setProperty(
        "--inculva-font",
        this.getFontStack(this.config.fontFamily)
      );
    }

    // Apply remote labels to panel text (localization strings from API)
    if (Object.keys(this.labels).length > 0) {
      updatePanel(
        this.panel,
        this.config.features,
        this.config.language,
        this.labels,
        this.config.accessibilityStatementUrl,
        this.config.whiteLabelText,
      );
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
    feature?: keyof WidgetFeatures
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
    (
      (window as Window & { __INCULVA_PREVIEW_CONFIG__?: PreviewConfig })
        .__INCULVA_PREVIEW_CONFIG__?.siteId
    );

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
(window as unknown as { InculvaWidget: typeof InculvaWidget }).InculvaWidget = InculvaWidget;
