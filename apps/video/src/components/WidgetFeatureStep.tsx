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

export function WidgetFeatureStep({ featureKey, startFrame, durationInFrames, lang }: WidgetFeatureStepProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Badge fade-in during first 20 frames of this step
  const badgeOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Feature is "active" for the full duration of this step
  const isActive = localFrame >= 0 && localFrame < durationInFrames;
  const activeFeature: FeatureKey | null = isActive ? featureKey : null;

  // Toggle spring pop animation
  const toggleScale = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 200, mass: 0.5 } });
  const clampedScale = interpolate(toggleScale, [0, 1], [0.8, 1]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
      {/* Mock website behind */}
      <div style={{ flex: 1, height: "100%", maxWidth: "50%" }}>
        <MockWebsite activeFeature={activeFeature} mode="broken" />
      </div>
      {/* Widget panel */}
      <div style={{ transform: `scale(${clampedScale})` }}>
        <WidgetPanel activeFeature={activeFeature} lang={lang} />
      </div>
      {/* Feature badge overlay */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: badgeOpacity,
          background: "#0066cc",
          color: "#fff",
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 13,
          fontWeight: 600,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {t[lang].features[featureKey]}
      </div>
    </div>
  );
}
