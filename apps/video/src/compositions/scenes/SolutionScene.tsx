// apps/video/src/compositions/scenes/SolutionScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig, staticFile } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

const SCRIPT_TAG = `<script src="cdn.inculva.com/widget.js"\n  data-site-id="your-id">`;

export function SolutionScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 360;

  const logoProgress = spring({ frame, fps, config: { damping: 18, stiffness: 90, mass: 1 } });
  const logoY = interpolate(logoProgress, [0, 1], [50, 0]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  const taglineProgress = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 18, stiffness: 90, mass: 1 } });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);

  const typewriterStart = 80;
  const charsVisible = Math.floor(Math.max(0, frame - typewriterStart) / 3);
  const visibleCode = SCRIPT_TAG.slice(0, charsVisible);
  const codeOpacity = frame >= typewriterStart ? 1 : 0;

  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        gap: 20,
        opacity: exitOpacity,
      }}
    >
      <div style={{ opacity: logoOpacity, transform: `translateY(${logoY}px)` }}>
        <img src={staticFile("logo.png")} style={{ height: 48 }} alt="Inculva" />
      </div>
      <p style={{ color: "#fff", fontSize: 32, fontWeight: 700, textAlign: "center", opacity: taglineOpacity, margin: 0 }}>
        {t[lang].solution}
      </p>
      <div
        style={{
          opacity: codeOpacity,
          background: "#1e293b",
          borderRadius: 12,
          padding: "14px 20px",
          width: "100%",
          border: "1px solid #334155",
        }}
      >
        <pre style={{ color: "#3493ff", fontSize: 13, margin: 0, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {visibleCode}
          <span style={{ opacity: frame % 40 < 20 ? 1 : 0, color: "#fff" }}>|</span>
        </pre>
      </div>
    </div>
  );
}
