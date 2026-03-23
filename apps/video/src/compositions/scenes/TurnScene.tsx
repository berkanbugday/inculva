import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function TurnScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 105;

  // line1: heavy spring — feels like a statement
  const s1 = spring({ frame, fps, config: { damping: 28, stiffness: 100, mass: 1.0 } });
  const y1 = interpolate(s1, [0, 1], [60, 0]);
  // line1 visible frames 0–22, fades out before silence
  const line1Opacity = interpolate(frame, [0, 4, 16, 22], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Silence: frames 22–38 (0.53s) — pure black

  // line2 (blue): slides in from left at frame 38
  const s2 = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 20, stiffness: 200, mass: 0.7 } });
  const x2 = interpolate(s2, [0, 1], [-80, 0]);
  const op2 = frame >= 38 ? interpolate(s2, [0, 1], [0, 1]) : 0;

  // line3 (white, large): springs up at frame 52
  const s3 = spring({ frame: Math.max(0, frame - 52), fps, config: { damping: 18, stiffness: 220, mass: 0.6 } });
  const y3 = interpolate(s3, [0, 1], [50, 0]);
  const op3 = frame >= 52 ? interpolate(s3, [0, 1], [0, 1]) : 0;

  // Fade out: frames 80–105
  const exitOpacity = interpolate(frame, [80, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 8,
      padding: "0 48px",
      opacity: exitOpacity,
      position: "relative",
    }}>
      {/* line1: fades out before silence — position:absolute relative to this container */}
      <div style={{ opacity: line1Opacity, transform: `translateY(${y1}px)`, position: "absolute" }}>
        <span style={{ color: "#ffffff", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center" }}>
          {t[lang].turn.line1}
        </span>
      </div>

      {/* lines 2+3: appear after silence, stacked */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ opacity: op2, transform: `translateX(${x2}px)` }}>
          <span style={{ color: "#3493ff", fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {t[lang].turn.line2}
          </span>
        </div>
        <div style={{ opacity: op3, transform: `translateY(${y3}px)` }}>
          <span style={{ color: "#ffffff", fontSize: 80, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {t[lang].turn.line3}
          </span>
        </div>
      </div>
    </div>
  );
}
