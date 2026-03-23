// apps/video/src/components/WidgetFeatureStep.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import type { FeatureKey, Lang } from "../types";
import { t } from "../translations";
import { MockWebsite } from "./MockWebsite";
import { WidgetPanel } from "./WidgetPanel";

interface WidgetFeatureStepProps {
  featureKey: FeatureKey;
  startFrame: number;
  durationInFrames: number;
  lang: Lang;
}

const ACTIVATE_AT = 25; // local frame when feature turns on

export function WidgetFeatureStep({ featureKey, startFrame, durationInFrames, lang }: WidgetFeatureStepProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  // Feature activates at local frame 25
  const isActive = local >= ACTIVATE_AT;
  const activeFeature: FeatureKey | null = isActive ? featureKey : null;

  // Flash overlay: brief white flash when feature activates
  const flashOpacity = interpolate(
    local,
    [ACTIVATE_AT, ACTIVATE_AT + 6, ACTIVATE_AT + 18],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Badge slides down from top after activation
  const badgeSpring = spring({ frame: Math.max(0, local - ACTIVATE_AT), fps, config: { damping: 14, stiffness: 180, mass: 0.6 } });
  const badgeY = interpolate(badgeSpring, [0, 1], [-40, 0]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);

  // Panel pop scale
  const panelSpring = spring({ frame: local, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
  const panelScale = interpolate(panelSpring, [0, 1], [0.9, 1]);

  // Website scale: subtle bounce on activation
  const siteSpring = spring({ frame: Math.max(0, local - ACTIVATE_AT), fps, config: { damping: 12, stiffness: 160, mass: 0.7 } });
  const siteScale = interpolate(siteSpring, [0, 1], [0.97, 1]);

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 20, padding: "0 8px",
    }}>
      {/* Website — left side */}
      <div style={{ flex: 1.2, height: "86%", transform: `scale(${siteScale})`, position: "relative" }}>
        <MockWebsite activeFeature={activeFeature} mode="broken" />
        {/* Flash overlay on activation */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 14,
          background: "#ffffff",
          opacity: flashOpacity,
          pointerEvents: "none",
        }} />
      </div>

      {/* Widget panel — right side, prominent */}
      <div style={{ transform: `scale(${panelScale})`, flexShrink: 0 }}>
        <WidgetPanel activeFeature={activeFeature} lang={lang} />
      </div>

      {/* Feature activated badge */}
      <div style={{
        position: "absolute", top: 12, left: "50%",
        transform: `translateX(-50%) translateY(${badgeY}px)`,
        opacity: badgeOpacity,
        background: "linear-gradient(135deg, #0066cc, #3493ff)",
        color: "#fff",
        borderRadius: 24,
        padding: "8px 20px",
        fontSize: 14, fontWeight: 700,
        boxShadow: "0 4px 16px rgba(0,102,204,0.5)",
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}>
        ✓ {t[lang].features[featureKey]}
      </div>
    </div>
  );
}
