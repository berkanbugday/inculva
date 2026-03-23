// apps/video/src/components/ComplianceBadge.tsx
import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import type { Lang } from "../types";
import { t } from "../translations";

interface ComplianceBadgeProps {
  lang: Lang;
}

export function ComplianceBadge({ lang }: ComplianceBadgeProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 180, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#0066cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#fff",
        }}
      >
        ✓
      </div>
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.01em",
        }}
      >
        {t[lang].ctaBadge}
      </span>
    </div>
  );
}
