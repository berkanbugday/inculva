import React from "react";
import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function PlacesScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();

  // Visibility windows — hard cuts (no spring, just opacity 0/1)
  const show1 = frame >= 0;
  const show2 = frame >= 12;  // 0.4s
  const show3 = frame >= 25;  // 0.83s

  const lineStyle = (visible: boolean, color: string, size: number): React.CSSProperties => ({
    color,
    fontSize: size,
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    opacity: visible ? 1 : 0,
    transition: "none",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 20,
      padding: "0 48px",
    }}>
      <div style={lineStyle(show1, "#ffffff", 72)}>
        {t[lang].places.line1}
      </div>
      <div style={lineStyle(show2, "#ffffff", 72)}>
        {t[lang].places.line2}
      </div>
      <div style={lineStyle(show3, "#ef4444", 72)}>
        {t[lang].places.line3}
      </div>
    </div>
  );
}
