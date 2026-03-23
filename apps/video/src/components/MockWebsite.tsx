// apps/video/src/components/MockWebsite.tsx
import React from "react";
import type { FeatureKey } from "../types";

interface MockWebsiteProps {
  activeFeature: FeatureKey | null;
  mode: "broken" | "fixed";
}

// Each feature dramatically changes the site appearance
function getFeatureOverride(feature: FeatureKey | null): React.CSSProperties {
  if (!feature) return {};
  return {
    highContrast: {
      background: "#000000",
      color: "#ffffff",
      filter: "contrast(1.6)",
    },
    largerText: {
      fontSize: "22px",
      lineHeight: 1.6,
    },
    dyslexiaFont: {
      fontFamily: "'Comic Sans MS', 'Trebuchet MS', cursive",
      letterSpacing: "0.1em",
      lineHeight: 1.9,
      wordSpacing: "0.15em",
    },
    colorBlind: {
      filter: "grayscale(1) contrast(1.1)",
    },
  }[feature] ?? {};
}

export function MockWebsite({ activeFeature, mode }: MockWebsiteProps) {
  const isHighContrast = activeFeature === "highContrast";
  const override = getFeatureOverride(activeFeature);

  const bg = mode === "fixed" ? "#ffffff" : "#f4ede0";
  const textColor = mode === "fixed" ? "#111827" : "#c4b49a";
  const baseFontSize = mode === "fixed" ? "14px" : "11px";
  const navBg = mode === "fixed" ? "#0066cc" : "#c8b89a";
  const btnBg = mode === "fixed" ? "#0066cc" : "#b8a888";
  const btnPad = mode === "fixed" ? "10px 20px" : "3px 8px";
  const btnRadius = mode === "fixed" ? 8 : 2;
  const borderColor = mode === "fixed" ? "#0066cc" : "#d4c4aa";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 14,
        overflow: "hidden",
        border: `2px solid ${isHighContrast ? "#ffffff" : borderColor}`,
        background: bg,
        color: textColor,
        fontSize: baseFontSize,
        fontFamily: "Inter, sans-serif",
        ...override,
      }}
    >
      {/* Nav */}
      <div style={{
        padding: "10px 18px",
        background: isHighContrast ? "#111" : navBg,
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: isHighContrast ? "1px solid #fff" : "none",
      }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1em" }}>ShopNow</span>
        <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "auto" }}>Products</span>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>About</span>
      </div>
      {/* Hero */}
      <div style={{ padding: "18px 18px 12px" }}>
        <div style={{
          fontWeight: 800,
          fontSize: "1.6em",
          color: isHighContrast ? "#ffffff" : (mode === "fixed" ? "#111827" : "#c8b89a"),
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          Summer Sale
        </div>
        <div style={{
          color: isHighContrast ? "#e0e0e0" : (mode === "fixed" ? "#4b5563" : "#c4b49a"),
          marginBottom: 14,
          lineHeight: 1.5,
        }}>
          Discover our new collection of premium products at unbeatable prices this season.
        </div>
        <div style={{
          display: "inline-block",
          padding: btnPad,
          background: isHighContrast ? "#ffffff" : btnBg,
          color: isHighContrast ? "#000000" : "#fff",
          borderRadius: btnRadius,
          fontWeight: 600,
          cursor: "pointer",
        }}>
          Shop Now
        </div>
      </div>
      {/* Product row */}
      <div style={{ display: "flex", gap: 8, padding: "0 18px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1,
            borderRadius: 8,
            overflow: "hidden",
            border: isHighContrast ? "1px solid #fff" : `1px solid ${mode === "fixed" ? "#e5e7eb" : "#d4c4aa"}`,
          }}>
            <div style={{
              height: 50,
              background: isHighContrast ? "#222" : (mode === "fixed" ? "#f3f4f6" : "#e8dccc"),
            }} />
            <div style={{ padding: "6px 8px" }}>
              <div style={{ fontWeight: 600, fontSize: "0.9em" }}>Product {i}</div>
              <div style={{ color: isHighContrast ? "#aaa" : (mode === "fixed" ? "#6b7280" : "#c4b49a"), fontSize: "0.85em" }}>$29.99</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
