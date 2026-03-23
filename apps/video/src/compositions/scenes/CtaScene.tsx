// apps/video/src/compositions/scenes/CtaScene.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";
import { ComplianceBadge } from "../../components/ComplianceBadge";
import { MockWebsite } from "../../components/MockWebsite";

export function CtaScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 480;

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const taglineSpring = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 18, stiffness: 90, mass: 1 } });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  const domainSpring = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 18, stiffness: 90, mass: 1 } });
  const domainOpacity = interpolate(domainSpring, [0, 1], [0, 1]);

  const exitOpacity = interpolate(frame, [DURATION - 40, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        padding: "0 32px",
        gap: 28,
        opacity: fadeIn * exitOpacity,
      }}
    >
      <div style={{ width: "80%", height: "28%" }}>
        <MockWebsite activeFeature={null} mode="fixed" />
      </div>
      <Sequence from={60}>
        <ComplianceBadge lang={lang} />
      </Sequence>
      <p
        style={{
          color: "#e2e8f0",
          fontSize: 22,
          fontWeight: 600,
          textAlign: "center",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          margin: 0,
        }}
      >
        {t[lang].ctaTagline}
      </p>
      <p
        style={{
          color: "#3493ff",
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          opacity: domainOpacity,
          margin: 0,
        }}
      >
        {t[lang].ctaDomain}
      </p>
    </div>
  );
}
