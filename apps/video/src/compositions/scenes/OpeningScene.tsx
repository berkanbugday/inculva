// apps/video/src/compositions/scenes/OpeningScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function OpeningScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 300;

  const progress = spring({ frame, fps, config: { damping: 20, stiffness: 80, mass: 1 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);
  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
          opacity: opacity * exitOpacity,
          transform: `translateY(${translateY}px)`,
          letterSpacing: "-0.02em",
        }}
      >
        {t[lang].opening}
      </h1>
    </div>
  );
}
