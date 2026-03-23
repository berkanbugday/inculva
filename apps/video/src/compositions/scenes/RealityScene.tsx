import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function RealityScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 300;

  const s1 = spring({ frame, fps, config: { damping: 22, stiffness: 80, mass: 1 } });
  const y1 = interpolate(s1, [0, 1], [40, 0]);

  const s2 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 22, stiffness: 80, mass: 1 } });
  const y2 = interpolate(s2, [0, 1], [40, 0]);

  const exitOpacity = interpolate(frame, [DURATION - 20, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 12,
      padding: "0 48px",
      opacity: exitOpacity,
    }}>
      <div style={{ transform: `translateY(${y1}px)`, opacity: s1 }}>
        <span style={{ color: "#ffffff", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", display: "block" }}>
          {t[lang].reality.line1}
        </span>
      </div>
      <div style={{ transform: `translateY(${y2}px)`, opacity: s2 }}>
        <span style={{
          color: "#ef4444",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          textDecoration: "underline",
          textDecorationColor: "#ef4444",
          textDecorationThickness: "4px",
          display: "block",
          textAlign: "center",
        }}>
          {t[lang].reality.line2}
        </span>
      </div>
    </div>
  );
}
