// apps/video/src/compositions/scenes/WidgetDemoScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { FeatureKey, SceneProps } from "../../types";
import { WidgetFeatureStep } from "../../components/WidgetFeatureStep";

const STEPS: Array<{ key: FeatureKey; start: number; duration: number }> = [
  { key: "highContrast", start: 30,  duration: 240 },
  { key: "largerText",   start: 270, duration: 240 },
  { key: "dyslexiaFont", start: 510, duration: 240 },
  { key: "colorBlind",   start: 750, duration: 180 },
];

export function WidgetDemoScene({ lang, aspectRatio }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelIn = spring({ frame, fps, config: { damping: 14, stiffness: 160, mass: 0.8 } });
  const panelOut = spring({ frame: Math.max(0, frame - 930), fps, config: { damping: 14, stiffness: 160, mass: 0.8 } });
  const panelOpacity = frame < 930
    ? interpolate(panelIn, [0, 1], [0, 1])
    : interpolate(panelOut, [0, 1], [1, 0]);

  const activeStep = STEPS.find((s) => frame >= s.start && frame < s.start + s.duration) ?? null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        opacity: panelOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: aspectRatio === "portrait" ? "24px 16px" : "32px 48px",
      }}
    >
      {activeStep && (
        <WidgetFeatureStep
          featureKey={activeStep.key}
          startFrame={activeStep.start}
          durationInFrames={activeStep.duration}
          lang={lang}
        />
      )}
    </div>
  );
}
