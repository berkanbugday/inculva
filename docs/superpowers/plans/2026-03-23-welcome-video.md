# Welcome Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 42-second Remotion welcome video for inculva in 4 compositions (EN/TR × portrait/landscape) with 5 scenes, spring transitions, and Pixabay background music with fade-in/out.

**Architecture:** New `apps/video` pnpm workspace with Remotion 4. A single `WelcomeVideo` composition accepts `lang` and `aspectRatio` props and sequences 5 scene components. Shared UI components (`MockWebsite`, `WidgetPanel`, `WidgetFeatureStep`, `ComplianceBadge`) are composed inside scenes. All components stay under 150 lines.

**Tech Stack:** Remotion 4, React 18, TypeScript, `@remotion/google-fonts` (Inter), `@remotion/cli`

---

## File Map

| File                                                     | Responsibility                                                |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| `apps/video/package.json`                                | Workspace package, Remotion scripts                           |
| `apps/video/remotion.config.ts`                          | Entry point config                                            |
| `apps/video/src/index.ts`                                | `registerRoot(Root)`                                          |
| `apps/video/src/Root.tsx`                                | Registers 4 `<Composition>` entries                           |
| `apps/video/src/types.ts`                                | `FeatureKey`, `Lang`, `AspectRatio` shared types              |
| `apps/video/src/translations.ts`                         | EN/TR string map                                              |
| `apps/video/src/compositions/WelcomeVideo.tsx`           | Top-level composition, sequences all 5 scenes                 |
| `apps/video/src/compositions/scenes/OpeningScene.tsx`    | Scene 1 — headline text fade-in (0–300f)                      |
| `apps/video/src/compositions/scenes/ProblemScene.tsx`    | Scene 2 — broken mock site + glitch (300–720f)                |
| `apps/video/src/compositions/scenes/SolutionScene.tsx`   | Scene 3 — logo + script tag typewriter (720–1080f)            |
| `apps/video/src/compositions/scenes/WidgetDemoScene.tsx` | Scene 4 — widget panel + 4 features (1080–2040f)              |
| `apps/video/src/compositions/scenes/CtaScene.tsx`        | Scene 5 — badge + CTA + domain (2040–2520f)                   |
| `apps/video/src/components/MockWebsite.tsx`              | Fake website UI, driven by `activeFeature` + `mode` props     |
| `apps/video/src/components/WidgetPanel.tsx`              | inculva widget panel recreation, highlights active toggle     |
| `apps/video/src/components/WidgetFeatureStep.tsx`        | One feature's activation cycle (toggle + badge + site update) |
| `apps/video/src/components/ComplianceBadge.tsx`          | Animated "WCAG 2.1 AA Compliant ✓" badge                      |
| `apps/video/public/music.mp3`                            | Pixabay CC0 music file (downloaded manually in Task 2)        |
| `apps/video/public/logo.png`                             | Copied from `apps/landing/public/logo.png`                    |

---

## Task 1: Bootstrap `apps/video` workspace

**Files:**

- Create: `apps/video/package.json`
- Create: `apps/video/remotion.config.ts`
- Create: `apps/video/src/index.ts`
- Create: `apps/video/tsconfig.json`

- [ ] **Step 1: Create package.json**

```json
// apps/video/package.json
{
  "name": "@inculva/video",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "studio": "remotion studio",
    "render:en-portrait": "remotion render WelcomeVideo-EN-Portrait out/welcome-en-portrait.mp4",
    "render:tr-portrait": "remotion render WelcomeVideo-TR-Portrait out/welcome-tr-portrait.mp4",
    "render:en-landscape": "remotion render WelcomeVideo-EN-Landscape out/welcome-en-landscape.mp4",
    "render:tr-landscape": "remotion render WelcomeVideo-TR-Landscape out/welcome-tr-landscape.mp4",
    "render:all": "pnpm render:en-portrait && pnpm render:tr-portrait && pnpm render:en-landscape && pnpm render:tr-landscape",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "@remotion/google-fonts": "^4.0.0",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create remotion.config.ts**

```ts
// apps/video/remotion.config.ts
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

- [ ] **Step 3: Create tsconfig.json**

```json
// apps/video/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create src/index.ts**

```ts
// apps/video/src/index.ts
import { registerRoot } from "remotion";
import { Root } from "./Root";

registerRoot(Root);
```

- [ ] **Step 5: Install dependencies**

Note: `pnpm-workspace.yaml` already has `packages: ["apps/*"]` so `apps/video` is automatically included.

```bash
cd /Users/berkan/Projects/inculva
pnpm install
```

Expected: No errors. `apps/video/node_modules` created.

- [ ] **Step 6: Verify typecheck passes (empty src — will fail until Root exists, skip for now)**

Note: Proceed to Task 2 before running typecheck.

---

## Task 2: Download music + copy logo

**Files:**

- Create: `apps/video/public/music.mp3` (manual download)
- Create: `apps/video/public/logo.png` (copy)

- [ ] **Step 1: Create public directory**

```bash
mkdir -p /Users/berkan/Projects/inculva/apps/video/public
mkdir -p /Users/berkan/Projects/inculva/apps/video/out
```

- [ ] **Step 2: Download music from Pixabay**

Go to [pixabay.com/music](https://pixabay.com/music/) and search for **"uplifting ambient"** or **"inspiring corporate"**. Filter by:

- Duration: 45–120 seconds
- License: Free (all Pixabay music is CC0)

Recommended searches:

- "ambient uplifting"
- "inspiring light electronic"
- "positive corporate background"

Download the MP3 and save it to:

```
apps/video/public/music.mp3
```

**Important:** The track must be at least **45 seconds long** — the fade-out runs frames 2400–2520 (seconds 40–42). A shorter clip will cut before the fade completes.

- [ ] **Step 3: Copy logo**

```bash
cp /Users/berkan/Projects/inculva/apps/landing/public/logo.png \
   /Users/berkan/Projects/inculva/apps/video/public/logo.png
```

- [ ] **Step 4: Verify files exist**

```bash
ls -la /Users/berkan/Projects/inculva/apps/video/public/
```

Expected output: `music.mp3` and `logo.png` present.

---

## Task 3: Shared types and translations

**Files:**

- Create: `apps/video/src/types.ts`
- Create: `apps/video/src/translations.ts`

- [ ] **Step 1: Create types.ts**

```ts
// apps/video/src/types.ts
export type FeatureKey =
  | "highContrast"
  | "largerText"
  | "dyslexiaFont"
  | "colorBlind";
export type Lang = "en" | "tr";
export type AspectRatio = "portrait" | "landscape";

export interface SceneProps {
  lang: Lang;
  aspectRatio: AspectRatio;
}
```

- [ ] **Step 2: Create translations.ts**

```ts
// apps/video/src/translations.ts
import type { FeatureKey, Lang } from "./types";

interface Translations {
  opening: string;
  solution: string;
  ctaBadge: string;
  ctaTagline: string;
  ctaDomain: string;
  features: Record<FeatureKey, string>;
}

export const t: Record<Lang, Translations> = {
  en: {
    opening: "The web wasn't built for everyone.",
    solution: "One line of code.",
    ctaBadge: "WCAG 2.1 AA Compliant ✓",
    ctaTagline: "Make your website accessible to everyone.",
    ctaDomain: "inculva.com",
    features: {
      highContrast: "High Contrast",
      largerText: "Larger Text",
      dyslexiaFont: "Dyslexia Font",
      colorBlind: "Color Blind Mode",
    },
  },
  tr: {
    opening: "İnternet herkes için tasarlanmadı.",
    solution: "Tek satır kod.",
    ctaBadge: "WCAG 2.1 AA Uyumlu ✓",
    ctaTagline: "Web sitenizi herkese erişilebilir yapın.",
    ctaDomain: "inculva.com",
    features: {
      highContrast: "Yüksek Kontrast",
      largerText: "Büyük Yazı",
      dyslexiaFont: "Disleksi Fontu",
      colorBlind: "Renk Körlüğü Modu",
    },
  },
};
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/berkan/Projects/inculva/apps/video
pnpm typecheck
```

Expected: May fail on missing `Root` import — that's fine. Should not fail on `types.ts` or `translations.ts`.

---

## Task 4: MockWebsite component

**Files:**

- Create: `apps/video/src/components/MockWebsite.tsx`

This component renders a fake website. In `mode: "broken"` it looks inaccessible (low contrast, tiny text, chaotic). In `mode: "fixed"` it looks clean. When `activeFeature` is set, it applies the corresponding CSS transformation.

- [ ] **Step 1: Create MockWebsite.tsx**

```tsx
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
  dyslexiaFont: {
    fontFamily: "OpenDyslexic, Georgia, serif",
    letterSpacing: "0.1em",
  },
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
        fontFamily:
          activeFeature === "dyslexiaFont"
            ? featureStyle.fontFamily
            : "Inter, sans-serif",
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          padding: "8px 16px",
          background: mode === "broken" ? "#c8b89a" : "#0066cc",
          display: "flex",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 60,
            height: 10,
            background: "rgba(255,255,255,0.7)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            width: 40,
            height: 10,
            background: "rgba(255,255,255,0.4)",
            borderRadius: 4,
            marginLeft: "auto",
          }}
        />
        <div
          style={{
            width: 40,
            height: 10,
            background: "rgba(255,255,255,0.4)",
            borderRadius: 4,
          }}
        />
      </div>
      {/* Hero */}
      <div style={{ padding: "20px 16px" }}>
        <div
          style={{
            height: mode === "broken" ? 8 : 16,
            width: "70%",
            background: mode === "broken" ? "#c0b0a0" : "#1a1a1a",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: mode === "broken" ? 6 : 12,
            width: "90%",
            background: mode === "broken" ? "#d0c0b0" : "#555",
            borderRadius: 4,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            height: mode === "broken" ? 6 : 12,
            width: "60%",
            background: mode === "broken" ? "#d0c0b0" : "#555",
            borderRadius: 4,
            marginBottom: 16,
          }}
        />
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
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd /Users/berkan/Projects/inculva/apps/video
npx tsc --noEmit --skipLibCheck 2>&1 | head -30
```

Expected: Only errors about missing `Root.tsx` (not yet created) — MockWebsite itself should be clean.

---

## Task 5: WidgetPanel component

**Files:**

- Create: `apps/video/src/components/WidgetPanel.tsx`

Renders the inculva accessibility widget panel. Shows 4 toggle rows. The `activeFeature` toggle is highlighted with the primary blue color.

- [ ] **Step 1: Create WidgetPanel.tsx**

```tsx
// apps/video/src/components/WidgetPanel.tsx
import React from "react";
import type { FeatureKey, Lang } from "../types";
import { t } from "../translations";

interface WidgetPanelProps {
  activeFeature: FeatureKey | null;
  lang: Lang;
}

const FEATURES: FeatureKey[] = [
  "highContrast",
  "largerText",
  "dyslexiaFont",
  "colorBlind",
];

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <img src="logo.png" style={{ width: 20, height: 20 }} alt="inculva" />
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
          Accessibility
        </span>
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
            <span
              style={{
                fontSize: 14,
                width: 20,
                textAlign: "center",
                color: isActive ? "#3493ff" : "#94a3b8",
              }}
            >
              {ICONS[key]}
            </span>
            <span
              style={{
                flex: 1,
                color: isActive ? "#fff" : "#94a3b8",
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
              }}
            >
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
```

---

## Task 6: WidgetFeatureStep component

**Files:**

- Create: `apps/video/src/components/WidgetFeatureStep.tsx`

Handles the per-frame animation for one feature activation. Uses `useCurrentFrame` relative to `startFrame`. Fades in a feature label badge at the top when the feature is active.

- [ ] **Step 1: Create WidgetFeatureStep.tsx**

```tsx
// apps/video/src/components/WidgetFeatureStep.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import type { FeatureKey, Lang } from "../types";
import { t } from "../translations";
import { MockWebsite } from "./MockWebsite";
import { WidgetPanel } from "./WidgetPanel";

interface WidgetFeatureStepProps {
  featureKey: FeatureKey;
  startFrame: number;
  durationInFrames: number;
  lang: Lang;
}

export function WidgetFeatureStep({
  featureKey,
  startFrame,
  durationInFrames,
  lang,
}: WidgetFeatureStepProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Badge fade-in during first 20 frames of this step
  const badgeOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Feature is "active" for the full duration of this step
  const isActive = localFrame >= 0 && localFrame < durationInFrames;
  const activeFeature: FeatureKey | null = isActive ? featureKey : null;

  // Toggle spring pop animation
  const toggleScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });
  const clampedScale = interpolate(toggleScale, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Mock website behind */}
      <div style={{ flex: 1, height: "100%", maxWidth: "50%" }}>
        <MockWebsite activeFeature={activeFeature} mode="broken" />
      </div>
      {/* Widget panel */}
      <div style={{ transform: `scale(${clampedScale})` }}>
        <WidgetPanel activeFeature={activeFeature} lang={lang} />
      </div>
      {/* Feature badge overlay */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: badgeOpacity,
          background: "#0066cc",
          color: "#fff",
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 13,
          fontWeight: 600,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {t[lang].features[featureKey]}
      </div>
    </div>
  );
}
```

---

## Task 7: ComplianceBadge component

**Files:**

- Create: `apps/video/src/components/ComplianceBadge.tsx`

- [ ] **Step 1: Create ComplianceBadge.tsx**

```tsx
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

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.6 },
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

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
```

---

## Task 8: Scene 1 — OpeningScene

**Files:**

- Create: `apps/video/src/compositions/scenes/OpeningScene.tsx`

Frames 0–300 (5s). Text fades in, holds, then slides left on exit (handled by parent `<Sequence>`).

- [ ] **Step 1: Create OpeningScene.tsx**

```tsx
// apps/video/src/compositions/scenes/OpeningScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function OpeningScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 300; // 5s at 60fps

  // Fade + slide up entrance
  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  // Fade out last 30 frames
  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
          opacity: opacity * exitOpacity,
          transform: `translateY(${translateY}px)`,
          letterSpacing: "-0.02em",
        }}
      >
        {t[lang].opening}
      </h1>
    </div>
  );
}
```

---

## Task 9: Scene 2 — ProblemScene

**Files:**

- Create: `apps/video/src/compositions/scenes/ProblemScene.tsx`

Frames 0–420 (7s inside Sequence). Shows broken MockWebsite with glitch/shake animation.

- [ ] **Step 1: Create ProblemScene.tsx**

```tsx
// apps/video/src/compositions/scenes/ProblemScene.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { SceneProps } from "../../types";
import { MockWebsite } from "../../components/MockWebsite";

export function ProblemScene({ lang: _lang }: SceneProps) {
  const frame = useCurrentFrame();
  const DURATION = 420;

  // Periodic shake: every 30 frames, shake for 6 frames
  const shakeCycle = frame % 30;
  const shakeX =
    shakeCycle < 6 ? interpolate(shakeCycle, [0, 3, 6], [-4, 4, 0]) : 0;

  // Fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Fade out
  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch flicker on shake frames
  const glitchFilter =
    shakeCycle < 3 ? "hue-rotate(90deg) contrast(1.5)" : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        opacity: opacity * exitOpacity,
      }}
    >
      <div
        style={{
          width: "85%",
          height: "70%",
          transform: `translateX(${shakeX}px)`,
          filter: glitchFilter,
        }}
      >
        <MockWebsite activeFeature={null} mode="broken" />
      </div>
    </div>
  );
}
```

---

## Task 10: Scene 3 — SolutionScene

**Files:**

- Create: `apps/video/src/compositions/scenes/SolutionScene.tsx`

Frames 0–360 (6s inside Sequence). Logo slides up, tagline appears, then script tag types out character by character.

- [ ] **Step 1: Create SolutionScene.tsx**

```tsx
// apps/video/src/compositions/scenes/SolutionScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

const SCRIPT_TAG = `<script src="cdn.inculva.com/widget.js"\n  data-site-id="your-id">`;

export function SolutionScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 360;

  // Logo + tagline: spring slide up starting frame 0
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });
  const logoY = interpolate(logoProgress, [0, 1], [50, 0]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Tagline appears at frame 40
  const taglineProgress = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);

  // Typewriter: starts frame 80, 1 char per 3 frames
  const typewriterStart = 80;
  const charsVisible = Math.floor(Math.max(0, frame - typewriterStart) / 3);
  const visibleCode = SCRIPT_TAG.slice(0, charsVisible);
  const codeOpacity = frame >= typewriterStart ? 1 : 0;

  // Exit fade
  const exitOpacity = interpolate(frame, [DURATION - 30, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Logo */}
      <div
        style={{ opacity: logoOpacity, transform: `translateY(${logoY}px)` }}
      >
        <img src="logo.png" style={{ height: 48 }} alt="inculva" />
      </div>
      {/* Tagline */}
      <p
        style={{
          color: "#fff",
          fontSize: 32,
          fontWeight: 700,
          textAlign: "center",
          opacity: taglineOpacity,
          margin: 0,
        }}
      >
        {t[lang].solution}
      </p>
      {/* Typewriter code block */}
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
        <pre
          style={{
            color: "#3493ff",
            fontSize: 13,
            margin: 0,
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {visibleCode}
          <span style={{ opacity: frame % 40 < 20 ? 1 : 0, color: "#fff" }}>
            |
          </span>
        </pre>
      </div>
    </div>
  );
}
```

---

## Task 11: Scene 4 — WidgetDemoScene

**Files:**

- Create: `apps/video/src/compositions/scenes/WidgetDemoScene.tsx`

Frames 0–960 (16s inside Sequence). Delegates to `WidgetFeatureStep` for each of the 4 features.

Frame schedule (relative to this scene's local frame 0):

- 0–30: panel slide-in
- 30–270: Feature 1 (highContrast)
- 270–510: Feature 2 (largerText)
- 510–750: Feature 3 (dyslexiaFont)
- 750–930: Feature 4 (colorBlind)
- 930–960: panel slide-out

- [ ] **Step 1: Create WidgetDemoScene.tsx**

```tsx
// apps/video/src/compositions/scenes/WidgetDemoScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { FeatureKey, SceneProps } from "../../types";
import { WidgetFeatureStep } from "../../components/WidgetFeatureStep";

const STEPS: Array<{ key: FeatureKey; start: number; duration: number }> = [
  { key: "highContrast", start: 30, duration: 240 },
  { key: "largerText", start: 270, duration: 240 },
  { key: "dyslexiaFont", start: 510, duration: 240 },
  { key: "colorBlind", start: 750, duration: 180 },
];

export function WidgetDemoScene({ lang, aspectRatio }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel slide-in (0–30f) and slide-out (930–960f)
  const panelIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });
  const panelOut = spring({
    frame: Math.max(0, frame - 930),
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });
  const panelOpacity =
    frame < 930
      ? interpolate(panelIn, [0, 1], [0, 1])
      : interpolate(panelOut, [0, 1], [1, 0]);

  // Determine active step
  const activeStep =
    STEPS.find((s) => frame >= s.start && frame < s.start + s.duration) ?? null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        opacity: panelOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: aspectRatio === "portrait" ? "24px 16px" : "32px 48px",
      }}
    >
      {activeStep && (
        <WidgetFeatureStep
          featureKey={activeStep.key}
          startFrame={activeStep.start}
          durationInFrames={activeStep.duration}
          lang={lang}
        />
      )}
    </div>
  );
}
```

---

## Task 12: Scene 5 — CtaScene

**Files:**

- Create: `apps/video/src/compositions/scenes/CtaScene.tsx`

Frames 0–480 (8s inside Sequence). Shows clean MockWebsite briefly, then ComplianceBadge animates in, then tagline, then domain. Fades to black at end.

- [ ] **Step 1: Create CtaScene.tsx**

```tsx
// apps/video/src/compositions/scenes/CtaScene.tsx
import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";
import { ComplianceBadge } from "../../components/ComplianceBadge";
import { MockWebsite } from "../../components/MockWebsite";

export function CtaScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 480;

  // Fade in
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline spring: starts at frame 120 (2s after start)
  const taglineSpring = spring({
    frame: Math.max(0, frame - 120),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // Domain: starts at frame 200
  const domainSpring = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });
  const domainOpacity = interpolate(domainSpring, [0, 1], [0, 1]);

  // Fade to black last 40 frames
  const exitOpacity = interpolate(frame, [DURATION - 40, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Mini clean website preview */}
      <div style={{ width: "80%", height: "28%" }}>
        <MockWebsite activeFeature={null} mode="fixed" />
      </div>

      {/* WCAG compliance badge — starts at frame 60 */}
      <Sequence from={60}>
        <ComplianceBadge lang={lang} />
      </Sequence>

      {/* Tagline */}
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

      {/* Domain */}
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
```

---

## Task 13: WelcomeVideo composition

**Files:**

- Create: `apps/video/src/compositions/WelcomeVideo.tsx`

Top-level composition. Uses `<Sequence>` to place scenes at the right frame offsets. Includes music with fade.

Scene offsets (absolute frames):

- Scene 1: 0–300 (300f)
- Scene 2: 300–720 (420f)
- Scene 3: 720–1080 (360f)
- Scene 4: 1080–2040 (960f)
- Scene 5: 2040–2520 (480f)

- [ ] **Step 1: Create WelcomeVideo.tsx**

```tsx
// apps/video/src/compositions/WelcomeVideo.tsx
import React from "react";
import {
  Sequence,
  Audio,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import type { Lang, AspectRatio } from "../types";
import { OpeningScene } from "./scenes/OpeningScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { WidgetDemoScene } from "./scenes/WidgetDemoScene";
import { CtaScene } from "./scenes/CtaScene";

loadFont();

interface WelcomeVideoProps {
  lang: Lang;
  aspectRatio: AspectRatio;
}

export function WelcomeVideo({ lang, aspectRatio }: WelcomeVideoProps) {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "Inter, sans-serif",
        background: "#0f172a",
      }}
    >
      {/* Music with fade-in / fade-out */}
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 120, 2400, 2520], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Scene 1 — Opening (0–300f) */}
      <Sequence
        from={0}
        durationInFrames={300}
        style={{ position: "absolute", inset: 0 }}
      >
        <OpeningScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>

      {/* Scene 2 — Problem (300–720f) */}
      <Sequence
        from={300}
        durationInFrames={420}
        style={{ position: "absolute", inset: 0 }}
      >
        <ProblemScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>

      {/* Scene 3 — Solution (720–1080f) */}
      <Sequence
        from={720}
        durationInFrames={360}
        style={{ position: "absolute", inset: 0 }}
      >
        <SolutionScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>

      {/* Scene 4 — Widget Demo (1080–2040f) */}
      <Sequence
        from={1080}
        durationInFrames={960}
        style={{ position: "absolute", inset: 0 }}
      >
        <WidgetDemoScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>

      {/* Scene 5 — CTA (2040–2520f) */}
      <Sequence
        from={2040}
        durationInFrames={480}
        style={{ position: "absolute", inset: 0 }}
      >
        <CtaScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
    </div>
  );
}
```

---

## Task 14: Root.tsx — Register all 4 compositions

**Files:**

- Create: `apps/video/src/Root.tsx`

- [ ] **Step 1: Create Root.tsx**

```tsx
// apps/video/src/Root.tsx
import React from "react";
import { Composition } from "remotion";
import { WelcomeVideo } from "./compositions/WelcomeVideo";

const DURATION = 2520; // 42s × 60fps
const FPS = 60;

export function Root() {
  return (
    <>
      {/* Portrait 9:16 */}
      <Composition
        id="WelcomeVideo-EN-Portrait"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ lang: "en" as const, aspectRatio: "portrait" as const }}
      />
      <Composition
        id="WelcomeVideo-TR-Portrait"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ lang: "tr" as const, aspectRatio: "portrait" as const }}
      />
      {/* Landscape 16:9 */}
      <Composition
        id="WelcomeVideo-EN-Landscape"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          lang: "en" as const,
          aspectRatio: "landscape" as const,
        }}
      />
      <Composition
        id="WelcomeVideo-TR-Landscape"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          lang: "tr" as const,
          aspectRatio: "landscape" as const,
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Run full typecheck**

```bash
cd /Users/berkan/Projects/inculva/apps/video
pnpm typecheck
```

Expected: 0 errors.

---

## Task 15: Open Remotion Studio and verify visually

- [ ] **Step 1: Start Remotion Studio**

```bash
cd /Users/berkan/Projects/inculva/apps/video
pnpm studio
```

Expected: Browser opens at `http://localhost:3000`. Four compositions visible in sidebar.

- [ ] **Step 2: Preview each composition**

Check each of the 4 compositions in Remotion Studio:

1. Select `WelcomeVideo-EN-Portrait` → scrub through all 2520 frames
2. Verify Scene 1 (text fade-in), Scene 2 (broken site + glitch), Scene 3 (logo + typewriter), Scene 4 (widget + 4 features), Scene 5 (badge + CTA)
3. Repeat for TR, and both landscape compositions
4. Verify music starts and the audio timeline shows the track

- [ ] **Step 3: Check component line counts**

```bash
for f in /Users/berkan/Projects/inculva/apps/video/src/**/*.tsx; do
  count=$(wc -l < "$f")
  if [ "$count" -gt 150 ]; then
    echo "OVER LIMIT ($count lines): $f"
  fi
done
```

Expected: No files over 150 lines.

---

## Task 16: Render all 4 videos

- [ ] **Step 1: Render EN portrait**

```bash
cd /Users/berkan/Projects/inculva/apps/video
pnpm render:en-portrait
```

Expected: `out/welcome-en-portrait.mp4` created (~50–100MB). No errors.

- [ ] **Step 2: Render TR portrait**

```bash
pnpm render:tr-portrait
```

Expected: `out/welcome-tr-portrait.mp4` created.

- [ ] **Step 3: Render EN landscape**

```bash
pnpm render:en-landscape
```

Expected: `out/welcome-en-landscape.mp4` created.

- [ ] **Step 4: Render TR landscape**

```bash
pnpm render:tr-landscape
```

Expected: `out/welcome-tr-landscape.mp4` created.

- [ ] **Step 5: Verify all outputs**

```bash
ls -lh /Users/berkan/Projects/inculva/apps/video/out/
```

Expected: 4 MP4 files, each non-zero size.

- [ ] **Step 6: Play and review each video**

```bash
open /Users/berkan/Projects/inculva/apps/video/out/welcome-en-portrait.mp4
```

Verify:

- Music fades in at start and out at end
- All 5 scenes present with smooth transitions
- 4 widget features activate with visible mock site changes
- WCAG badge and CTA appear clearly in final scene

---

## Notes

- `apps/video/out/` should be added to `.gitignore` (rendered MP4s are large binary files)
- `apps/video/public/music.mp3` should also be in `.gitignore` or LFS if committing
- If rendering is slow, use `--concurrency` flag: `npx remotion render ... --concurrency 4`
- If a scene needs visual adjustment, edit the component and re-preview in Studio before re-rendering
