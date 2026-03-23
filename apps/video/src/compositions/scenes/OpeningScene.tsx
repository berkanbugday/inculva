// apps/video/src/compositions/scenes/OpeningScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function OpeningScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 150;

  // Line 1: big stat — slides up fast
  const line1Spring = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.8 } });
  const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1]);

  // Line 2: "Until now." — appears at frame 35, brand blue
  const line2Spring = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 18, stiffness: 120, mass: 0.8 } });
  const line2Y = interpolate(line2Spring, [0, 1], [30, 0]);
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1]);

  // Exit: fast fade-out last 20f
  const exitOpacity = interpolate(frame, [DURATION - 20, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Split opening text into two visual lines
  const [line1, line2stat] = t[lang].opening.split("\n");

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 48px",
      opacity: exitOpacity,
    }}>
      {/* Stat lines */}
      <div style={{
        opacity: line1Opacity,
        transform: `translateY(${line1Y}px)`,
        textAlign: "center",
        marginBottom: 4,
      }}>
        <div style={{ color: "#ffffff", fontSize: 52, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em" }}>
          {line1}
        </div>
        <div style={{ color: "#f87171", fontSize: 52, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em" }}>
          {line2stat}
        </div>
      </div>
      {/* "Until now." — brand blue accent */}
      <div style={{
        opacity: line2Opacity,
        transform: `translateY(${line2Y}px)`,
        marginTop: 20,
      }}>
        <span style={{
          color: "#3493ff",
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          borderBottom: "3px solid #0066cc",
          paddingBottom: 2,
        }}>
          {t[lang].openingSub}
        </span>
      </div>
    </div>
  );
}
