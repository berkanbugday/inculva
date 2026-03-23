// apps/video/src/components/MockWebsite.tsx
import React from "react";
import type { FeatureKey } from "../types";

interface MockWebsiteProps {
  activeFeature: FeatureKey | null;
  mode: "broken" | "fixed";
}

const FEATURE_STYLES: Record<FeatureKey, React.CSSProperties> = {
  highContrast: { filter: "contrast(3) invert(1)", background: "#000" },
  largerText: { fontSize: "1.5em" },
  dyslexiaFont: { fontFamily: "OpenDyslexic, Georgia, serif", letterSpacing: "0.1em" },
  colorBlind: { filter: "grayscale(1) sepia(0.3)" },
};

export function MockWebsite({ activeFeature, mode }: MockWebsiteProps) {
  const featureStyle = activeFeature ? FEATURE_STYLES[activeFeature] : {};

  const baseStyle: React.CSSProperties =
    mode === "broken"
      ? { background: "#e0d8c0", color: "#b0a090", fontSize: "10px" }
      : { background: "#ffffff", color: "#1a1a1a", fontSize: "14px" };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: mode === "broken" ? "1px solid #ccc" : "2px solid #0066cc",
        ...baseStyle,
        ...featureStyle,
        fontFamily: activeFeature === "dyslexiaFont" ? featureStyle.fontFamily : "Inter, sans-serif",
      }}
    >
      {/* Nav bar */}
      <div style={{ padding: "8px 16px", background: mode === "broken" ? "#c8b89a" : "#0066cc", display: "flex", gap: 8 }}>
        <div style={{ width: 60, height: 10, background: "rgba(255,255,255,0.7)", borderRadius: 4 }} />
        <div style={{ width: 40, height: 10, background: "rgba(255,255,255,0.4)", borderRadius: 4, marginLeft: "auto" }} />
        <div style={{ width: 40, height: 10, background: "rgba(255,255,255,0.4)", borderRadius: 4 }} />
      </div>
      {/* Hero */}
      <div style={{ padding: "20px 16px" }}>
        <div style={{ height: mode === "broken" ? 8 : 16, width: "70%", background: mode === "broken" ? "#c0b0a0" : "#1a1a1a", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: mode === "broken" ? 6 : 12, width: "90%", background: mode === "broken" ? "#d0c0b0" : "#555", borderRadius: 4, marginBottom: 4 }} />
        <div style={{ height: mode === "broken" ? 6 : 12, width: "60%", background: mode === "broken" ? "#d0c0b0" : "#555", borderRadius: 4, marginBottom: 16 }} />
        <div
          style={{
            display: "inline-block",
            padding: mode === "broken" ? "2px 6px" : "8px 16px",
            background: mode === "broken" ? "#a09080" : "#0066cc",
            color: "#fff",
            borderRadius: mode === "broken" ? 2 : 8,
            fontSize: mode === "broken" ? "8px" : "12px",
          }}
        >
          {mode === "broken" ? "btn" : "Get Started"}
        </div>
      </div>
    </div>
  );
}
