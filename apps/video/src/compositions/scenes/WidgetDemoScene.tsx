// apps/video/src/compositions/scenes/WidgetDemoScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { FeatureKey, SceneProps } from "../../types";
import { WidgetFeatureStep } from "../../components/WidgetFeatureStep";

const STEPS: Array<{ key: FeatureKey; start: number; duration: number }> = [
  { key: "highContrast", start: 30,  duration: 180 },
  { key: "largerText",   start: 210, duration: 180 },
  { key: "dyslexiaFont", start: 390, duration: 180 },
  { key: "colorBlind",   start: 570, duration: 270 },
];

export function WidgetDemoScene({ lang, aspectRatio }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel fades in quickly (0-30f) and out (840-900f)
  const panelIn = spring({ frame, fps, config: { damping: 12, stiffness: 180, mass: 0.7 } });
  const panelOut = spring({ frame: Math.max(0, frame - 840), fps, config: { damping: 12, stiffness: 180, mass: 0.7 } });
  const panelOpacity = frame < 840
    ? interpolate(panelIn, [0, 1], [0, 1])
    : interpolate(panelOut, [0, 1], [1, 0]);

  const activeStep = STEPS.find((s) => frame >= s.start && frame < s.start + s.duration) ?? null;
  // After last step ends (780+), keep showing last feature until close
  const lastStep = frame >= 570 && frame < 840 ? STEPS[3] : null;
  const displayStep = activeStep ?? lastStep;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0f172a",
      opacity: panelOpacity,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: aspectRatio === "portrait" ? "20px 12px" : "24px 40px",
    }}>
      {displayStep && (
        <WidgetFeatureStep
          featureKey={displayStep.key}
          startFrame={displayStep.start}
          durationInFrames={displayStep.duration}
          lang={lang}
        />
      )}
    </div>
  );
}
