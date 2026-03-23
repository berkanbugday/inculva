import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function StruggleScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // line1: springs up at frame 0
  const s1 = spring({ frame, fps, config: { damping: 20, stiffness: 180, mass: 0.8 } });
  const y1 = interpolate(s1, [0, 1], [50, 0]);

  // line2: springs up at frame 30
  const s2 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, stiffness: 180, mass: 0.8 } });
  const y2 = interpolate(s2, [0, 1], [50, 0]);

  // line3: slams in at frame 60 — high stiffness, low damping = snap, no float
  const s3 = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14, stiffness: 300, mass: 0.6 } });
  const y3 = interpolate(s3, [0, 1], [40, 0]);
  const op3 = interpolate(s3, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16,
      padding: "0 48px",
    }}>
      <div style={{ transform: `translateY(${y1}px)`, opacity: s1 }}>
        <span style={{ color: "#ffffff", fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em" }}>
          {t[lang].struggle.line1}
        </span>
      </div>
      <div style={{ transform: `translateY(${y2}px)`, opacity: s2 }}>
        <span style={{ color: "#ffffff", fontSize: 56, fontWeight: 800, letterSpacing: "-0.03em" }}>
          {t[lang].struggle.line2}
        </span>
      </div>
      <div style={{ transform: `translateY(${y3}px)`, opacity: op3 }}>
        <span style={{ color: "#ef4444", fontSize: 88, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
          {t[lang].struggle.line3}
        </span>
      </div>
    </div>
  );
}
