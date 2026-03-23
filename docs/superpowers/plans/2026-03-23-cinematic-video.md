# Cinematic Welcome Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing 5-scene welcome video with a 45-second cinematic manifesto-style video (pure typography, no UI demos) in both TR and EN.

**Architecture:** Delete 4 existing scenes (Problem, Solution, WidgetDemo, CTA), create 5 new scenes (Struggle, Places, Reality, Turn, Brand), redesign translations interface, and update Root.tsx to 30fps/1350 frames.

**Tech Stack:** Remotion, React, TypeScript — no new dependencies required.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `apps/video/src/Root.tsx` | FPS 60→30, DURATION 1740→1350 |
| Modify | `apps/video/src/translations.ts` | Full interface redesign for new 5-scene script |
| Modify | `apps/video/src/compositions/WelcomeVideo.tsx` | New Sequence layout (5 scenes), Audio ramp updated |
| Create | `apps/video/src/compositions/scenes/StruggleScene.tsx` | Scene 1: "1.3 milyar / Her gün / Engellere çarpıyor" |
| Create | `apps/video/src/compositions/scenes/PlacesScene.tsx` | Scene 2: "Sokakta / İşte / Hatta internette" |
| Create | `apps/video/src/compositions/scenes/RealityScene.tsx` | Scene 3: "%96 / erişilebilir değil" |
| Create | `apps/video/src/compositions/scenes/TurnScene.tsx` | Scene 4: pivot — "düzeltemeyiz / düzeltebiliriz" |
| Create | `apps/video/src/compositions/scenes/BrandScene.tsx` | Scene 5: logo + inculva.com |
| Delete | `apps/video/src/compositions/scenes/ProblemScene.tsx` | Removed |
| Delete | `apps/video/src/compositions/scenes/SolutionScene.tsx` | Removed |
| Delete | `apps/video/src/compositions/scenes/WidgetDemoScene.tsx` | Removed |
| Delete | `apps/video/src/compositions/scenes/CtaScene.tsx` | Removed |

---

## Task 1: Update Root.tsx — FPS and Duration

**Files:**
- Modify: `apps/video/src/Root.tsx:6-7`

- [ ] **Step 1: Update constants**

Change lines 6–7 from:
```ts
const DURATION = 1740; // 29s × 60fps
const FPS = 60;
```
To:
```ts
const DURATION = 1350; // 45s × 30fps
const FPS = 30;
```

- [ ] **Step 2: Verify in Remotion Studio**

Run: `cd apps/video && pnpm dev` (opens on port 3003)
Expected: All 4 compositions now show 45s duration in the Studio timeline.

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/Root.tsx
git commit -m "chore(video): set fps=30, duration=1350 for social ad format"
```

---

## Task 2: Redesign translations.ts

**Files:**
- Modify: `apps/video/src/translations.ts`

- [ ] **Step 1: Replace file content entirely**

```ts
// apps/video/src/translations.ts
import type { Lang } from "./types";

interface Translations {
  struggle: { line1: string; line2: string; line3: string };
  places: { line1: string; line2: string; line3: string };
  reality: { line1: string; line2: string };
  turn: { line1: string; line2: string; line3: string };
  brand: { domain: string };
}

export const t: Record<Lang, Translations> = {
  tr: {
    struggle: {
      line1: "1,3 milyar insan.",
      line2: "Her gün.",
      line3: "Engellere çarpıyor.",
    },
    places: {
      line1: "Sokakta.",
      line2: "İşte.",
      line3: "Hatta internette.",
    },
    reality: {
      line1: "Web sitelerinin %96'sı",
      line2: "erişilebilir değil.",
    },
    turn: {
      line1: "Sokakları düzeltemeyiz.",
      line2: "Ama web sitenizi",
      line3: "düzeltebiliriz.",
    },
    brand: {
      domain: "inculva.com",
    },
  },
  en: {
    struggle: {
      line1: "1.3 billion people.",
      line2: "Every day.",
      line3: "Hit barriers.",
    },
    places: {
      line1: "On the streets.",
      line2: "At work.",
      line3: "Even online.",
    },
    reality: {
      line1: "96% of websites",
      line2: "are inaccessible.",
    },
    turn: {
      // NOTE: Intentionally split across two lines to mirror TR's two-line rhythm.
      // TR: "Ama web sitenizi" / "düzeltebiliriz."
      // EN: "But we can fix" / "your website."
      line1: "We can't fix the streets.",
      line2: "But we can fix",
      line3: "your website.",
    },
    brand: {
      domain: "inculva.com",
    },
  },
};
```

- [ ] **Step 2: Update types.ts — remove FeatureKey (no longer used)**

Open `apps/video/src/types.ts`. Remove the `FeatureKey` type (it was only used by WidgetDemoScene which is being deleted):

```ts
// apps/video/src/types.ts
export type Lang = "en" | "tr";
export type AspectRatio = "portrait" | "landscape";

export interface SceneProps {
  lang: Lang;
  aspectRatio: AspectRatio;
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/translations.ts apps/video/src/types.ts
git commit -m "feat(video): redesign translations for 5-scene manifesto script"
```

---

## Task 3: Create StruggleScene

**Files:**
- Create: `apps/video/src/compositions/scenes/StruggleScene.tsx`

Timing (300 frames total at 30fps):
- line1 springs in at frame 0
- line2 springs in at frame 30
- line3 slams in at frame 60 (high stiffness = impact, no bounce)
- Hard cut exit at frame 300 (no fade — caller handles transition)

- [ ] **Step 1: Create the file**

```tsx
// apps/video/src/compositions/scenes/StruggleScene.tsx
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
```

- [ ] **Step 2: Preview in Remotion Studio**

Verify in Studio: Scene 1 (frames 0–299). "Engellere çarpıyor." should slam in with snap feel, not float.

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/compositions/scenes/StruggleScene.tsx
git commit -m "feat(video): add StruggleScene — manifesto opening"
```

---

## Task 4: Create PlacesScene

**Files:**
- Create: `apps/video/src/compositions/scenes/PlacesScene.tsx`

Timing (300 frames total):
- "Sokakta." → frame 0, holds 45f, cuts at frame 45
- "İşte." → frame 45, holds 45f, cuts at frame 90
- "Hatta internette." → frame 90, holds 90f (longer — it's the one we can fix)
- After frame 180, all three lines visible together until end
- No fade in/out — hard cuts handled by WelcomeVideo Sequence

- [ ] **Step 1: Create the file**

```tsx
// apps/video/src/compositions/scenes/PlacesScene.tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function PlacesScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();

  // Visibility windows — hard cuts (no spring, just opacity 0/1)
  const show1 = frame >= 0;
  const show2 = frame >= 45;
  const show3 = frame >= 90;

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
```

- [ ] **Step 2: Preview frames 300–599 in Remotion Studio**

Expected: "Sokakta." appears first, then "İşte." at 1.5s, then "Hatta internette." in red at 3s. Lines accumulate — they don't replace each other.

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/compositions/scenes/PlacesScene.tsx
git commit -m "feat(video): add PlacesScene — hard-cut word rhythm"
```

---

## Task 5: Create RealityScene

**Files:**
- Create: `apps/video/src/compositions/scenes/RealityScene.tsx`

Timing (300 frames total):
- line1 floats up at frame 0 (gentle spring)
- line2 floats up at frame 30, red with underline
- Both hold together
- Fade out last 20 frames

- [ ] **Step 1: Create the file**

```tsx
// apps/video/src/compositions/scenes/RealityScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function RealityScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 300;

  const s1 = spring({ frame, fps, config: { damping: 22, stiffness: 80, mass: 1 } });
  const y1 = interpolate(s1, [0, 1], [40, 0]);

  const s2 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 22, stiffness: 80, mass: 1 } });
  const y2 = interpolate(s2, [0, 1], [40, 0]);

  const exitOpacity = interpolate(frame, [DURATION - 20, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 12,
      padding: "0 48px",
      opacity: exitOpacity,
    }}>
      <div style={{ transform: `translateY(${y1}px)`, opacity: s1 }}>
        <span style={{ color: "#ffffff", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", display: "block" }}>
          {t[lang].reality.line1}
        </span>
      </div>
      <div style={{ transform: `translateY(${y2}px)`, opacity: s2 }}>
        <span style={{
          color: "#ef4444",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          textDecoration: "underline",
          textDecorationColor: "#ef4444",
          textDecorationThickness: "4px",
          display: "block",
          textAlign: "center",
        }}>
          {t[lang].reality.line2}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Preview frames 600–899 in Remotion Studio**

Expected: Stat floats in gently, red underlined line appears 1s later. Both visible together. Fades out at end.

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/compositions/scenes/RealityScene.tsx
git commit -m "feat(video): add RealityScene — 96% stat with red underline"
```

---

## Task 6: Create TurnScene

**Files:**
- Create: `apps/video/src/compositions/scenes/TurnScene.tsx`

This is the emotional pivot. Pacing slows dramatically. Frame breakdown:
- 0–60f: "Sokakları düzeltemeyiz." springs in (weighted, slow spring)
- 60–105f: 45 frames of pure black — silence
- 105–150f: blue line ("Ama web sitenizi") slides in from left
- 150–210f: white line ("düzeltebiliriz.") springs up large
- 210–270f: both lines hold together
- 270–390f: slow fade to black

- [ ] **Step 1: Create the file**

```tsx
// apps/video/src/compositions/scenes/TurnScene.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function TurnScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 390;

  // line1: heavy, weighted spring — feels like a statement, not a bounce
  const s1 = spring({ frame, fps, config: { damping: 28, stiffness: 60, mass: 1.2 } });
  const y1 = interpolate(s1, [0, 1], [60, 0]);
  // line1 visible frames 0–60, then fades out before silence
  const line1Opacity = interpolate(frame, [0, 8, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Silence: frames 60–105 — nothing rendered (opacity 0)

  // line2 (blue): slides in from left at frame 105
  const s2 = spring({ frame: Math.max(0, frame - 105), fps, config: { damping: 20, stiffness: 120, mass: 0.9 } });
  const x2 = interpolate(s2, [0, 1], [-80, 0]);
  const op2 = frame >= 105 ? interpolate(s2, [0, 1], [0, 1]) : 0;

  // line3 (white, large): springs up at frame 150
  const s3 = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 18, stiffness: 140, mass: 0.8 } });
  const y3 = interpolate(s3, [0, 1], [50, 0]);
  const op3 = frame >= 150 ? interpolate(s3, [0, 1], [0, 1]) : 0;

  // Slow fade out: frames 270–390
  const exitOpacity = interpolate(frame, [270, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 8,
      padding: "0 48px",
      opacity: exitOpacity,
    }}>
      {/* line1: fades out before silence */}
      <div style={{ opacity: line1Opacity, transform: `translateY(${y1}px)`, position: "absolute" }}>
        <span style={{ color: "#ffffff", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center" }}>
          {t[lang].turn.line1}
        </span>
      </div>

      {/* lines 2+3: appear after silence, stacked */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ opacity: op2, transform: `translateX(${x2}px)` }}>
          <span style={{ color: "#3493ff", fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {t[lang].turn.line2}
          </span>
        </div>
        <div style={{ opacity: op3, transform: `translateY(${y3}px)` }}>
          <span style={{ color: "#ffffff", fontSize: 80, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {t[lang].turn.line3}
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Preview frames 900–1289 in Remotion Studio**

Key checks:
- line1 should feel heavy/weighted — not bouncy
- Silence at ~frame 960–1005 should be pure black
- Blue line slides in from left (not from bottom)
- White large line snaps up after blue
- Fade out is slow (4 seconds)

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/compositions/scenes/TurnScene.tsx
git commit -m "feat(video): add TurnScene — emotional pivot with silence beat"
```

---

## Task 7: Create BrandScene

**Files:**
- Create: `apps/video/src/compositions/scenes/BrandScene.tsx`

Timing (60 frames total):
- Logo fades in over 20 frames
- Domain appears at frame 20
- Fades to black last 10 frames

- [ ] **Step 1: Create the file**

```tsx
// apps/video/src/compositions/scenes/BrandScene.tsx
import React from "react";
import { useCurrentFrame, interpolate, staticFile } from "remotion";
import type { SceneProps } from "../../types";
import { t } from "../../translations";

export function BrandScene({ lang }: SceneProps) {
  const frame = useCurrentFrame();
  const DURATION = 60;

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const domainOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [DURATION - 10, DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16,
      opacity: exitOpacity,
    }}>
      <img
        src={staticFile("logo.png")}
        style={{ height: 56, opacity: logoOpacity }}
        alt="Inculva"
      />
      <span style={{
        color: "#3493ff",
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        opacity: domainOpacity,
      }}>
        {t[lang].brand.domain}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/video/src/compositions/scenes/BrandScene.tsx
git commit -m "feat(video): add BrandScene — logo + domain outro"
```

---

## Task 8: Rewrite WelcomeVideo.tsx

**Files:**
- Modify: `apps/video/src/compositions/WelcomeVideo.tsx`

New sequence layout (all at 30fps):
| Scene | from | durationInFrames |
|---|---|---|
| StruggleScene | 0 | 300 |
| PlacesScene | 300 | 300 |
| RealityScene | 600 | 300 |
| TurnScene | 900 | 390 |
| BrandScene | 1290 | 60 |

Audio volume ramp updated to 1350 frame total.

- [ ] **Step 1: Replace WelcomeVideo.tsx**

```tsx
// apps/video/src/compositions/WelcomeVideo.tsx
import React from "react";
import { Sequence, Audio, staticFile, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import type { Lang, AspectRatio } from "../types";
import { StruggleScene } from "./scenes/StruggleScene";
import { PlacesScene } from "./scenes/PlacesScene";
import { RealityScene } from "./scenes/RealityScene";
import { TurnScene } from "./scenes/TurnScene";
import { BrandScene } from "./scenes/BrandScene";

loadFont();

type WelcomeVideoProps = {
  lang: Lang;
  aspectRatio: AspectRatio;
};

export function WelcomeVideo({ lang, aspectRatio }: WelcomeVideoProps) {
  return (
    <div style={{ width: "100%", height: "100%", fontFamily: "Inter, sans-serif", background: "#000000" }}>
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 30, 1290, 1350], [0, 0.7, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={0} durationInFrames={300} style={{ position: "absolute", inset: 0 }}>
        <StruggleScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={300} durationInFrames={300} style={{ position: "absolute", inset: 0 }}>
        <PlacesScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={600} durationInFrames={300} style={{ position: "absolute", inset: 0 }}>
        <RealityScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={900} durationInFrames={390} style={{ position: "absolute", inset: 0 }}>
        <TurnScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={1290} durationInFrames={60} style={{ position: "absolute", inset: 0 }}>
        <BrandScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
    </div>
  );
}
```

- [ ] **Step 2: Preview full video in Remotion Studio**

Scrub through all 1350 frames. Check:
- No gaps between scenes (check frame 299→300, 599→600, 899→900, 1289→1290)
- Audio fades in and out correctly
- TR and EN compositions both work

- [ ] **Step 3: Commit**

```bash
git add apps/video/src/compositions/WelcomeVideo.tsx
git commit -m "feat(video): wire up 5-scene manifesto video in WelcomeVideo"
```

---

## Task 9: Delete Old Scene Files

**Files:**
- Delete: `apps/video/src/compositions/scenes/ProblemScene.tsx`
- Delete: `apps/video/src/compositions/scenes/SolutionScene.tsx`
- Delete: `apps/video/src/compositions/scenes/WidgetDemoScene.tsx`
- Delete: `apps/video/src/compositions/scenes/CtaScene.tsx`

Also delete unused components that were only used by deleted scenes:
- Delete: `apps/video/src/components/MockWebsite.tsx`
- Delete: `apps/video/src/components/WidgetPanel.tsx`
- Delete: `apps/video/src/components/WidgetFeatureStep.tsx`
- Delete: `apps/video/src/components/ComplianceBadge.tsx`

- [ ] **Step 1: Delete files**

```bash
rm apps/video/src/compositions/scenes/ProblemScene.tsx
rm apps/video/src/compositions/scenes/SolutionScene.tsx
rm apps/video/src/compositions/scenes/WidgetDemoScene.tsx
rm apps/video/src/compositions/scenes/CtaScene.tsx
rm apps/video/src/components/MockWebsite.tsx
rm apps/video/src/components/WidgetPanel.tsx
rm apps/video/src/components/WidgetFeatureStep.tsx
rm apps/video/src/components/ComplianceBadge.tsx
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
cd apps/video && pnpm tsc --noEmit
```

Expected: 0 errors. If any errors appear, a deleted file is still imported somewhere — find and fix.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(video): remove old scenes and unused components"
```

---

## Done

All 4 compositions (TR/EN × Portrait/Landscape) now render the 45-second cinematic manifesto video. Open Remotion Studio at port 3003 and preview each composition.
