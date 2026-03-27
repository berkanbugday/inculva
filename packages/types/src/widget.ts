export type WidgetPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type ColorBlindType =
  | "deuteranopia"
  | "protanopia"
  | "tritanopia"
  | "achromatopsia";

export type WidgetTheme = "light" | "dark" | "auto";

export interface WidgetConfig {
  siteId: string;
  position: WidgetPosition;
  theme: WidgetTheme;
  primaryColor: string;
  language: string;
  features: WidgetFeatures;
  /** EAA Article 13 — URL to the site's accessibility statement page */
  accessibilityStatementUrl?: string;
  /** White-label (Large plan only). null=show "Powered by Inculva", ""=hide, string=show custom */
  whiteLabelText?: string | null;
  buttonSize?: "small" | "medium" | "large";
  buttonIcon?: string;
  profiles?: WidgetProfiles;
  /** Custom background color for the panel header (hex/rgb/hsl string) */
  headerBgColor?: string;
  /** Custom background color for the panel footer (hex/rgb/hsl string) */
  footerBgColor?: string;
}

export interface WidgetFeatures {
  // Core
  textResizing: boolean;
  dyslexiaFont: boolean;
  cursorEnhancement: boolean;
  keyboardNavigation: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  pauseAnimations: boolean;
  // WCAG 2.1 / 2.2 additions
  textSpacing: boolean;
  highlightLinks: boolean;
  colorBlindMode: boolean;
  largeClickTargets: boolean;
  focusHighlight: boolean;
  // WCAG 2.4.1 A + 1.4.2 A (ADA/EAA)
  skipNavigation: boolean;
  muteMedia: boolean;
  // P1 — additional accessibility aids
  readingMask: boolean;
  textAlign: boolean;
  saturation: boolean;
  // Phase 2 — extended feature set
  blueLightFilter: boolean;
  hideImages: boolean;
  darkMode: boolean;
  contentMagnifier: boolean;
  toolTips: boolean;
  sustainabilityMode: boolean;
  slowCursor: boolean;
  dictionary: boolean;
  lineHeight: boolean;
  highlightTitles: boolean;
}

export interface WidgetProfiles {
  profileAdhd: boolean;
  profileBlind: boolean;
  profileLowVision: boolean;
  profileColorBlind: boolean;
  profileDyslexia: boolean;
  profileMotorImpaired: boolean;
}

export interface WidgetEvent {
  siteId: string;
  sessionId: string;
  event: WidgetEventType;
  feature?: keyof WidgetFeatures;
  timestamp: string;
}

export type WidgetEventType =
  | "opened"
  | "closed"
  | "feature_enabled"
  | "feature_disabled";
