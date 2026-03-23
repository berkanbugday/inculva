// apps/video/src/compositions/scenes/ProblemScene.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { SceneProps } from "../../types";
import { MockWebsite } from "../../components/MockWebsite";

export function ProblemScene({ lang: _lang }: SceneProps) {
  const frame = useCurrentFrame();
  const DURATION = 420;

  const shakeCycle = frame % 30;
  const shakeX = shakeCycle < 6 ? interpolate(shakeCycle, [0, 3, 6], [-4, 4, 0]) : 0;
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glitchFilter = shakeCycle < 3 ? "hue-rotate(90deg) contrast(1.5)" : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        opacity: opacity * exitOpacity,
      }}
    >
      <div
        style={{
          width: "85%",
          height: "70%",
          transform: `translateX(${shakeX}px)`,
          filter: glitchFilter,
        }}
      >
        <MockWebsite activeFeature={null} mode="broken" />
      </div>
    </div>
  );
}
