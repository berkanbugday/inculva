# Welcome Video Design Spec
**Date:** 2026-03-23
**Product:** Inculva — Web Accessibility Widget Platform
**Tool:** Remotion

---

## Overview

A 42-second welcome/marketing video for Inculva, produced in two language versions (English & Turkish). Targets landing page hero section and YouTube/social media distribution. Tone: modern & energetic + warm & human.

---

## Video Specs

| Property | Value |
|----------|-------|
| Duration | ~42 seconds |
| FPS | 60 |
| Primary format | 1080×1920 (9:16 portrait) |
| Secondary format | 1920×1080 (16:9 landscape) |
| Languages | English + Turkish (two compositions) |
| Narration | None — screen text only (silent-viewing optimized) |

---

## Narrative Approach: Problem → Solution → Result

The video follows a 3-act arc designed to create emotional resonance and clearly demonstrate product value within 42 seconds.

---

## Scene Breakdown

### Scene 1 — Opening (0–5s)
- **Background:** Dark (`#0f172a`), slight blur
- **Animation:** Text fade-in with `spring` interpolation
- **EN text:** *"The web wasn't built for everyone."*
- **TR text:** *"İnternet herkes için tasarlanmadı."*
- **Transition out:** Slide-left into Scene 2

---

### Scene 2 — Problem (5–12s)
- **Content:** Mock website component showing poor accessibility: low contrast text, tiny buttons, chaotic layout
- **Animation:** Subtle glitch/shake effect to emphasize dysfunction
- **Text:** None (visual storytelling)
- **Transition out:** Spring slide into Scene 3

---

### Scene 3 — Solution Entry (12–18s)
- **Content:**
  1. Inculva logo slides up with spring animation
  2. *"One line of code."* / *"Tek satır kod."* appears below
  3. Script tag appears with typewriter effect:
     `<script src="cdn.inculva.com/widget.js" data-site-id="...">`
- **Transition out:** Fade/slide into Scene 4

---

### Scene 4 — Widget Demo (18–34s)
- **Total:** 16 seconds = 960 frames
- **Timing breakdown:**
  - 0–30f (0.5s): Widget panel slides in (spring open animation)
  - 30–270f (4s): Feature 1 — **High Contrast** / *Yüksek Kontrast*
  - 270–510f (4s): Feature 2 — **Larger Text** / *Büyük Yazı*
  - 510–750f (4s): Feature 3 — **Dyslexia Font** / *Disleksi Fontu*
  - 750–930f (3s): Feature 4 — **Color Blind Mode** / *Renk Körlüğü Modu* *(shorter to allow close animation)*
  - 930–960f (0.5s): Widget panel slides out (spring close)
  - **Note:** Features 1–3 get 4s (240f) each; Feature 4 gets 3s (180f) to fit the close animation within 16s total.
- **Each feature:** Toggle animates on, small label badge fades in, `MockWebsite` behind panel reflects the active feature state simultaneously
- **Transition out:** Widget panel closes, slides to Scene 5

---

### Scene 5 — Result & CTA (34–42s)
- **Content:**
  1. Clean, accessible version of mock site shown briefly
  2. `ComplianceBadge` component animates in: *"WCAG 2.1 AA Compliant ✓"*
  3. Tagline appears:
     - EN: *"Make your website accessible to everyone."*
     - TR: *"Web sitenizi herkese erişilebilir yapın."*
  4. **inculva.com** fades in bold
- **Transition:** Final hold, fade to black

---

## Transcript Summary

| Scene | English | Turkish |
|-------|---------|---------|
| 1 | "The web wasn't built for everyone." | "İnternet herkes için tasarlanmadı." |
| 2 | *(no text)* | *(no text)* |
| 3 | "One line of code." + script tag | "Tek satır kod." + script tag |
| 4 | Feature labels: High Contrast, Larger Text, Dyslexia Font, Color Blind Mode | Yüksek Kontrast, Büyük Yazı, Disleksi Fontu, Renk Körlüğü Modu |
| 5 | "WCAG 2.1 AA Compliant ✓" → "Make your website accessible to everyone." → inculva.com | "WCAG 2.1 AA Uyumlu ✓" → "Web sitenizi herkese erişilebilir yapın." → inculva.com |

---

## Visual Style

| Property | Value |
|----------|-------|
| Background | `#0f172a` (dark slate) |
| Primary color | `#0066cc` |
| Accent | `#3493ff` |
| Text color | White (`#ffffff`) |
| Font | Inter (via `@remotion/google-fonts`) |
| Border radius | `0.75rem` (buttons/inputs), `1rem` (cards) |
| Transitions | `spring()` interpolation throughout — no hard cuts |

---

## Music

- **Source:** Pixabay (copyright-free, CC0)
- **Style:** Uplifting ambient / light electronic — matches energetic but warm tone
- **Implementation:** Remotion `<Audio>` component with per-frame volume function:
  ```tsx
  <Audio
    src={staticFile("music.mp3")}
    volume={(f) =>
      interpolate(f, [0, 120, 2400, 2520], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
  />
  ```
  - Fade-in: frames 0–120 (2s at 60fps)
  - Full volume: frames 120–2400
  - Fade-out: frames 2400–2520 (last 2s)

---

## Project Structure

```
apps/video/
├── src/
│   ├── index.ts                      # Entry point: import { registerRoot } from "remotion"; registerRoot(Root);
│   ├── Root.tsx                      # Registers all 4 compositions (EN/TR × portrait/landscape)
│   ├── compositions/
│   │   ├── WelcomeVideo.tsx          # Root composition, accepts lang: "en" | "tr", aspectRatio: "portrait" | "landscape"
│   │   └── scenes/
│   │       ├── OpeningScene.tsx
│   │       ├── ProblemScene.tsx
│   │       ├── SolutionScene.tsx
│   │       ├── WidgetDemoScene.tsx   # Delegates heavy logic to WidgetPanel + WidgetFeatureStep
│   │       └── CtaScene.tsx
│   └── components/
│       ├── MockWebsite.tsx           # Accepts: activeFeature: FeatureKey | null, mode: "broken" | "fixed"
│       ├── WidgetPanel.tsx           # Remotion recreation of Inculva widget UI, accepts: activeFeature prop
│       ├── WidgetFeatureStep.tsx     # Single feature activation step (toggle + badge + timing)
│       └── ComplianceBadge.tsx       # Animated WCAG compliance badge
├── public/
│   ├── music.mp3
│   └── logo.png
├── package.json
└── remotion.config.ts                # Config.setEntryPoint("./src/index.ts")
```

### Component Props Interfaces

```ts
type FeatureKey = "highContrast" | "largerText" | "dyslexiaFont" | "colorBlind";

interface MockWebsiteProps {
  /** Which feature is currently active (drives live CSS transform) */
  activeFeature: FeatureKey | null;
  /** "broken" = inaccessible state (Scene 2), "fixed" = clean state (Scene 5) */
  mode: "broken" | "fixed";
}

interface WidgetPanelProps {
  /** Which feature toggle is currently active */
  activeFeature: FeatureKey | null;
}

interface WidgetFeatureStepProps {
  featureKey: FeatureKey;
  /** Absolute frame number at which this step begins (relative to Scene 4 start) */
  startFrame: number;
  /** Duration of this step in frames */
  durationInFrames: number;
}
```

---

## Remotion Composition Registration

Four compositions registered (2 languages × 2 aspect ratios):

```tsx
// Root.tsx
// Portrait (9:16) — primary for social media
<Composition id="WelcomeVideo-EN-Portrait" component={WelcomeVideo} defaultProps={{ lang: "en", aspectRatio: "portrait" }} durationInFrames={2520} fps={60} width={1080} height={1920} />
<Composition id="WelcomeVideo-TR-Portrait" component={WelcomeVideo} defaultProps={{ lang: "tr", aspectRatio: "portrait" }} durationInFrames={2520} fps={60} width={1080} height={1920} />

// Landscape (16:9) — for YouTube and landing page embed
<Composition id="WelcomeVideo-EN-Landscape" component={WelcomeVideo} defaultProps={{ lang: "en", aspectRatio: "landscape" }} durationInFrames={2520} fps={60} width={1920} height={1080} />
<Composition id="WelcomeVideo-TR-Landscape" component={WelcomeVideo} defaultProps={{ lang: "tr", aspectRatio: "landscape" }} durationInFrames={2520} fps={60} width={1920} height={1080} />
```

`WelcomeVideo` uses `aspectRatio` prop to adjust layout: portrait stacks elements vertically, landscape uses side-by-side layout for widget demo scene.

---

## Render Commands

```bash
# Portrait versions
npx remotion render WelcomeVideo-EN-Portrait out/welcome-en-portrait.mp4
npx remotion render WelcomeVideo-TR-Portrait out/welcome-tr-portrait.mp4

# Landscape versions
npx remotion render WelcomeVideo-EN-Landscape out/welcome-en-landscape.mp4
npx remotion render WelcomeVideo-TR-Landscape out/welcome-tr-landscape.mp4
```

---

## Dependencies

```json
{
  "remotion": "^4.x",
  "@remotion/player": "^4.x",
  "@remotion/google-fonts": "^4.x",
  "@remotion/cli": "^4.x"
}
```

---

## Component Size Constraint

All components must stay under 150 lines per project conventions.

---

## Success Criteria

1. Video renders cleanly at 60fps in all 4 compositions (EN/TR × portrait/landscape)
2. All 5 scenes present with spring transitions (no hard cuts)
3. Music fades in at start (frames 0–120) and out at end (frames 2400–2520) via volume function
4. Widget panel demo shows all 4 features activating with visible mock site changes
5. WCAG badge and CTA visible in final scene
6. All components stay under 150 lines (`WidgetDemoScene` delegates to `WidgetPanel` + `WidgetFeatureStep`)
