// apps/video/src/components/WidgetPanel.tsx
import React from "react";
import { staticFile } from "remotion";
import type { FeatureKey, Lang } from "../types";
import { t } from "../translations";

interface WidgetPanelProps {
  activeFeature: FeatureKey | null;
  lang: Lang;
}

const FEATURES: FeatureKey[] = ["highContrast", "largerText", "dyslexiaFont", "colorBlind"];

const ICONS: Record<FeatureKey, string> = {
  highContrast: "◑",
  largerText: "A↑",
  dyslexiaFont: "Aa",
  colorBlind: "◉",
};

export function WidgetPanel({ activeFeature, lang }: WidgetPanelProps) {
  return (
    <div
      style={{
        width: 240,
        background: "#1e293b",
        borderRadius: 16,
        padding: "16px 12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        border: "1px solid #334155",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <img src={staticFile("logo.png")} style={{ width: 20, height: 20 }} alt="Inculva" />
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Accessibility</span>
      </div>
      {/* Toggles */}
      {FEATURES.map((key) => {
        const isActive = key === activeFeature;
        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 10,
              marginBottom: 4,
              background: isActive ? "rgba(0,102,204,0.25)" : "transparent",
              border: isActive ? "1px solid #0066cc" : "1px solid transparent",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 14, width: 20, textAlign: "center", color: isActive ? "#3493ff" : "#94a3b8" }}>
              {ICONS[key]}
            </span>
            <span style={{ flex: 1, color: isActive ? "#fff" : "#94a3b8", fontSize: 11, fontWeight: isActive ? 600 : 400 }}>
              {t[lang].features[key]}
            </span>
            <div
              style={{
                width: 28,
                height: 16,
                borderRadius: 8,
                background: isActive ? "#0066cc" : "#334155",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: isActive ? 14 : 2,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  background: "#fff",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
