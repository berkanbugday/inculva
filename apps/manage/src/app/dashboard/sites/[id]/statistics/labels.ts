import { getMessages } from "@/i18n/messages";
import type { DashboardMessages } from "@/i18n/messages";

export function getProfileLabels(t: DashboardMessages): Record<string, string> {
  return {
    profileAdhd: t.statisticsPage.profileAdhd,
    profileBlind: t.statisticsPage.profileBlind,
    profileLowVision: t.statisticsPage.profileLowVision,
    profileColorBlind: t.statisticsPage.profileColorBlind,
    profileDyslexia: t.statisticsPage.profileDyslexia,
    profileMotorImpaired: t.statisticsPage.profileMotorImpaired,
  };
}

export function getAllFeatureLabels(t: DashboardMessages): Record<string, string> {
  return {
    textResizing: t.statisticsPage.featureTextResizing,
    dyslexiaFont: t.statisticsPage.featureDyslexiaFont,
    cursorEnhancement: t.statisticsPage.featureCursorEnhancement,
    keyboardNavigation: t.statisticsPage.featureKeyboardNavigation,
    readingGuide: t.statisticsPage.featureReadingGuide,
    screenReader: t.statisticsPage.featureScreenReader,
    pauseAnimations: t.statisticsPage.featurePauseAnimations,
    textSpacing: t.statisticsPage.featureTextSpacing,
    highlightLinks: t.statisticsPage.featureHighlightLinks,
    colorBlindMode: t.statisticsPage.featureColorBlindMode,
    largeClickTargets: t.statisticsPage.featureLargeClickTargets,
    focusHighlight: t.statisticsPage.featureFocusHighlight,
    skipNavigation: t.statisticsPage.featureSkipNavigation,
    muteMedia: t.statisticsPage.featureMuteMedia,
    readingMask: t.statisticsPage.featureReadingMask,
    textAlign: t.statisticsPage.featureTextAlign,
    saturation: t.statisticsPage.featureSaturation,
    blueLightFilter: t.statisticsPage.featureBlueLightFilter,
    hideImages: t.statisticsPage.featureHideImages,
    darkMode: t.statisticsPage.featureDarkMode,
    contentMagnifier: t.statisticsPage.featureContentMagnifier,
    slowCursor: t.statisticsPage.featureSlowCursor,
    lineHeight: t.statisticsPage.featureLineHeight,
    highlightTitles: t.statisticsPage.featureHighlightTitles,
  };
}

export function getFeatureLabel(t: ReturnType<typeof getMessages>, key: string): string {
  switch (key) {
    case "textResizing":
      return t.statisticsPage.featureTextResizing;
    case "dyslexiaFont":
      return t.statisticsPage.featureDyslexiaFont;
    case "cursorEnhancement":
      return t.statisticsPage.featureCursorEnhancement;
    case "keyboardNavigation":
      return t.statisticsPage.featureKeyboardNavigation;
    case "readingGuide":
      return t.statisticsPage.featureReadingGuide;
    case "screenReader":
      return t.statisticsPage.featureScreenReader;
    case "pauseAnimations":
      return t.statisticsPage.featurePauseAnimations;
    case "textSpacing":
      return t.statisticsPage.featureTextSpacing;
    case "highlightLinks":
      return t.statisticsPage.featureHighlightLinks;
    case "colorBlindMode":
      return t.statisticsPage.featureColorBlindMode;
    case "largeClickTargets":
      return t.statisticsPage.featureLargeClickTargets;
    case "focusHighlight":
      return t.statisticsPage.featureFocusHighlight;
    case "skipNavigation":
      return t.statisticsPage.featureSkipNavigation;
    case "muteMedia":
      return t.statisticsPage.featureMuteMedia;
    case "readingMask":
      return t.statisticsPage.featureReadingMask;
    case "textAlign":
      return t.statisticsPage.featureTextAlign;
    case "saturation":
      return t.statisticsPage.featureSaturation;
    case "blueLightFilter":
      return t.statisticsPage.featureBlueLightFilter;
    case "hideImages":
      return t.statisticsPage.featureHideImages;
    case "darkMode":
      return t.statisticsPage.featureDarkMode;
    case "contentMagnifier":
      return t.statisticsPage.featureContentMagnifier;
    case "slowCursor":
      return t.statisticsPage.featureSlowCursor;
    case "lineHeight":
      return t.statisticsPage.featureLineHeight;
    case "highlightTitles":
      return t.statisticsPage.featureHighlightTitles;
    default:
      return key;
  }
}

export function getEventLabel(
  t: ReturnType<typeof getMessages>,
  event: string,
): string {
  switch (event) {
    case "opened":
      return t.statistics.eventOpened;
    case "closed":
      return t.statistics.eventClosed;
    case "feature_enabled":
      return t.statistics.eventFeatureEnabled;
    case "feature_disabled":
      return t.statistics.eventFeatureDisabled;
    case "profile_activated":
      return t.statistics.eventProfileActivated;
    default:
      return event;
  }
}

export function getEventContextLabel(
  t: ReturnType<typeof getMessages>,
  event: string,
  value: string | null,
): string {
  if (event === "opened" || event === "closed") return "Widget";
  if (!value) return "—";
  if (event === "feature_enabled" || event === "feature_disabled") {
    return getFeatureLabel(t, value);
  }
  if (event === "profile_activated") {
    const labels = getProfileLabels(t);
    return labels[value] ?? value;
  }
  return "—";
}
