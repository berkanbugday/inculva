import type { ColorBlindType, WidgetConfig, WidgetFeatures } from "@inculva/types";
import { featureHandlers, getColorBlindType, setColorBlindType } from "./features/index.js";
import {
  createPanel,
  updatePanel,
  createTriggerButton,
  applyPosition,
  applyPanelPosition,
} from "./ui/panel.js";
import { widgetStyles } from "./ui/styles.js";
import { savePrefs, loadPrefs } from "./utils/storage.js";
import { getSessionId } from "./utils/session.js";

type PartialConfig = Partial<WidgetConfig> & { siteId: string };

const DEFAULT_CONFIG: Omit<WidgetConfig, "siteId"> = {
  position: "bottom-right",
  theme: "auto",
  primaryColor: "#0066cc",
  language: "en",
  features: {
    textResizing: true,
    highContrast: true,
    dyslexiaFont: true,
    cursorEnhancement: true,
    keyboardNavigation: true,
    readingGuide: true,
    screenReader: true,
    pauseAnimations: true,
    textSpacing: true,
    highlightLinks: true,
    colorBlindMode: true,
    largeClickTargets: true,
    focusHighlight: true,
    grayscale: true,
    skipNavigation: true,
    muteMedia: true,
    readingMask: true,
    textAlign: true,
    saturation: true,
  },
};

class InculvaWidget {
  private config: WidgetConfig;
  private activeFeatures: Set<keyof WidgetFeatures> = new Set();
  private isOpen = false;
  private btn!: HTMLButtonElement;
  private panel!: HTMLDivElement;
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
    this.injectStyles();
    this.applyTheme();
    this.renderWidget();
    this.restorePrefs();
    this.fetchRemoteConfig();
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
    this.panel = createPanel(
      this.config.features,
      this.config.language,
      this.config.accessibilityStatementUrl,
      this.config.whiteLabelText,
    );

    // WCAG 4.1.3 — aria-live region for status announcements
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("role", "status");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "inculva-sr-only";
    document.body.appendChild(this.liveRegion);

    applyPosition(this.btn, this.config.position);
    applyPosition(this.panel, this.config.position);

    this.btn.addEventListener("click", () => this.togglePanel());
    this.panel.addEventListener("click", (e) => {
      // Color blind type selector click
      const cbmTypeTarget = (e.target as HTMLElement).closest("[data-cbm-type]") as HTMLElement | null;
      if (cbmTypeTarget?.dataset["cbmType"]) {
        this.selectColorBlindType(cbmTypeTarget.dataset["cbmType"] as ColorBlindType);
        return;
      }
      // Feature toggle click
      const target = (e.target as HTMLElement).closest("[data-feature]") as HTMLElement | null;
      if (target?.dataset["feature"]) {
        this.toggleFeature(target.dataset["feature"] as keyof WidgetFeatures);
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

    document.body.appendChild(this.btn);
    document.body.appendChild(this.panel);
  }

  private togglePanel(): void {
    this.isOpen ? this.closePanel() : this.openPanel();
  }

  /** WCAG 2.4.3 — focus moves into dialog on open */
  private openPanel(): void {
    this.isOpen = true;
    this.panel.classList.add("open");
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

    if (isActive) {
      handler.disable();
      this.activeFeatures.delete(feature);
      this.trackEvent("feature_disabled", feature);
    } else {
      handler.enable();
      this.activeFeatures.add(feature);
      this.trackEvent("feature_enabled", feature);
    }

    const btn = this.panel.querySelector(`[data-feature="${feature}"]`);
    btn?.classList.toggle("active", !isActive);
    btn?.setAttribute("aria-pressed", String(!isActive));

    // Show/hide color blind type sub-selector
    if (feature === "colorBlindMode") {
      const selector = this.panel.querySelector<HTMLElement>(".inculva-cbm-selector");
      if (selector) {
        selector.classList.toggle("visible", !isActive);
      }
    }

    // WCAG 4.1.3 — announce to screen readers
    const featureName = this.labels[feature] ?? feature;
    this.announce(`${featureName} ${!isActive ? "enabled" : "disabled"}`);

    this.saveCurrentPrefs();
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
    const prefs: Record<string, boolean | string> = {};
    for (const feature of this.activeFeatures) {
      prefs[feature] = true;
    }
    // Persist color blind type alongside active features
    prefs["colorBlindType"] = getColorBlindType();
    savePrefs(prefs);
  }

  private restorePrefs(): void {
    const prefs = loadPrefs();
    // Restore color blind type before enabling the feature
    if (typeof prefs["colorBlindType"] === "string") {
      setColorBlindType(prefs["colorBlindType"] as ColorBlindType);
      // Update active button in selector
      const selector = this.panel.querySelector(".inculva-cbm-selector");
      if (selector) {
        for (const btn of selector.querySelectorAll<HTMLElement>("[data-cbm-type]")) {
          const isThis = btn.dataset["cbmType"] === prefs["colorBlindType"];
          btn.classList.toggle("active", isThis);
          btn.setAttribute("aria-pressed", String(isThis));
        }
      }
    }
    for (const [feature, active] of Object.entries(prefs)) {
      if (active === true && feature in featureHandlers) {
        this.toggleFeature(feature as keyof WidgetFeatures);
      }
    }
  }

  private async fetchRemoteConfig(): Promise<void> {
    try {
      const res = await fetch(
        `${this.apiBase}/widget/config/${this.config.siteId}`
      );
      if (!res.ok) return;

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

      if (remote.primaryColor) {
        this.config.primaryColor = remote.primaryColor;
        this.btn.style.backgroundColor = remote.primaryColor;
        document.documentElement.style.setProperty(
          "--inculva-primary",
          remote.primaryColor
        );
      }

      if (remote.features) {
        this.config.features = { ...this.config.features, ...remote.features };
      }

      if (remote.language) {
        this.config.language = remote.language;
      }

      if (remote.position) {
        this.config.position = remote.position;
        applyPosition(this.btn, this.config.position);
        applyPosition(this.panel, this.config.position);
      }

      if (remote.theme) {
        this.config.theme = remote.theme;
        this.applyTheme();
      }

      if (remote.accessibilityStatementUrl !== undefined) {
        this.config.accessibilityStatementUrl = remote.accessibilityStatementUrl;
      }

      if (remote.whiteLabelText !== undefined) {
        this.config.whiteLabelText = remote.whiteLabelText;
      }

      // Visual customization (Business plan only)
      if (remote.borderRadius !== undefined) {
        this.config.borderRadius = remote.borderRadius;
        document.documentElement.style.setProperty(
          "--inculva-border-radius",
          `${remote.borderRadius}px`
        );
      }
      if (remote.buttonSize !== undefined) {
        this.config.buttonSize = remote.buttonSize;
        document.documentElement.style.setProperty(
          "--inculva-button-size",
          remote.buttonSize === "small" ? "44px" : remote.buttonSize === "large" ? "64px" : "52px"
        );
      }
      if (remote.fontFamily !== undefined && remote.fontFamily !== "system") {
        this.config.fontFamily = remote.fontFamily;
        this.applyGoogleFont(remote.fontFamily);
        document.documentElement.style.setProperty(
          "--inculva-font",
          this.getFontStack(remote.fontFamily)
        );
      }

      // Store labels for aria-live announcements
      if (remote.labels) {
        this.labels = remote.labels;
      }

      // Update panel with new features, language, labels, a11y statement URL, and white-label text
      updatePanel(
        this.panel,
        this.config.features,
        this.config.language,
        remote.labels,
        this.config.accessibilityStatementUrl,
        this.config.whiteLabelText,
      );
    } catch {
      // Network unavailable — use defaults
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

  private applyGoogleFont(fontFamily: string): void {
    const fontNames: Record<string, string> = {
      inter: "Inter",
      roboto: "Roboto",
      opensans: "Open+Sans",
    };
    const fontName = fontNames[fontFamily];
    if (!fontName) return;

    const linkId = "inculva-google-font";
    if (document.getElementById(linkId)) return; // already loaded

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
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
