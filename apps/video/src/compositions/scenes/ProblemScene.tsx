// apps/video/src/compositions/scenes/ProblemScene.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { MockWebsite } from "../../components/MockWebsite";

const WARNINGS = [
  { top: "18%", left: "12%", label: "Low contrast" },
  { top: "52%", left: "60%", label: "Tiny text" },
  { top: "72%", left: "20%", label: "No alt text" },
];

export function ProblemScene({ lang: _lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 210;

  // Fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  // Fade out last 25f
  const fadeOut = interpolate(frame, [DURATION - 25, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Aggressive shake: every 20f
  const cycle = frame % 20;
  const shakeX = cycle < 5 ? interpolate(cycle, [0, 2, 4, 5], [-6, 6, -3, 0]) : 0;
  const shakeY = cycle < 5 ? interpolate(cycle, [0, 2, 4, 5], [0, -3, 2, 0]) : 0;
  const glitchFilter = cycle < 3 ? "hue-rotate(180deg) saturate(2) contrast(1.8)" : "none";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0f172a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 28,
      opacity: fadeIn * fadeOut,
    }}>
      <div style={{
        width: "88%", height: "78%",
        position: "relative",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        filter: glitchFilter,
      }}>
        <MockWebsite activeFeature={null} mode="broken" />
        {/* Warning badges pop in one by one */}
        {WARNINGS.map((w, i) => {
          const badgeSpring = spring({ frame: Math.max(0, frame - 30 - i * 20), fps, config: { damping: 12, stiffness: 200, mass: 0.5 } });
          const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              position: "absolute",
              top: w.top, left: w.left,
              transform: `scale(${badgeScale})`,
              background: "#ef4444",
              color: "#fff",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(239,68,68,0.6)",
            }}>
              ⚠ {w.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
