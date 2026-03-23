import React from "react";
import { useCurrentFrame, interpolate, staticFile } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function BrandScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const DURATION = 75;

  const logoOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const domainOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [DURATION - 10, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        opacity: exitOpacity,
      }}
    >
      <img
        src={staticFile("logo.png")}
        style={{ height: 130, opacity: logoOpacity }}
        alt="Inculva"
      />
      <span
        style={{
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          opacity: domainOpacity,
        }}
      >
        {t[lang].brand.tagline}
      </span>
    </div>
  );
}
