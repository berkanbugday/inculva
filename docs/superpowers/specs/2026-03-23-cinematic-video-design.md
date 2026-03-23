# Cinematic Welcome Video — Design Spec

**Date:** 2026-03-23
**Platform:** LinkedIn / Social Media Ad
**Duration:** ~45 seconds (1350 frames @ **30fps**)
**Languages:** TR + EN (separate compositions)
**Style:** Manifesto — pure typography, no UI demos

> **FPS Decision:** Root.tsx will be updated from 60fps → 30fps. Social ads don't need 60fps and halving the frame count simplifies timing math. All frame counts below are at 30fps.

---

## Script

### Türkçe (TR)

| Satır | Renk | Sahne |
|---|---|---|
| 1.3 milyar insan. | Beyaz | Struggle |
| Her gün. | Beyaz | Struggle |
| Engellere çarpıyor. | Kırmızı (#ef4444) | Struggle |
| Sokakta. | Beyaz | Places |
| İşte. | Beyaz | Places |
| Hatta internette. | Kırmızı (#ef4444) | Places |
| Web sitelerinin %96'sı | Beyaz | Reality |
| erişilebilir değil. | Kırmızı, altı çizili | Reality |
| Sokakları düzeltemeyiz. | Beyaz | Turn |
| *(45f = 1.5s boş ekran)* | — | Turn |
| Ama web sitenizi | Mavi (#3493ff) | Turn |
| düzeltebiliriz. | Beyaz, büyük | Turn |
| *(hold 2s = 60f)* | — | Turn |
| [logo + inculva.com] | — | Brand |

### English (EN)

| Line | Color | Scene |
|---|---|---|
| 1.3 billion people. | White | Struggle |
| Every day. | White | Struggle |
| Hit barriers. | Red (#ef4444) | Struggle |
| On the streets. | White | Places |
| At work. | White | Places |
| Even online. | Red (#ef4444) | Places |
| 96% of websites | White | Reality |
| are inaccessible. | Red, underlined | Reality |
| We can't fix the streets. | White | Turn |
| *(45f = 1.5s empty screen)* | — | Turn |
| But we can fix your website. | Blue (#3493ff) | Turn |
| *(hold 2s = 60f)* | — | Turn |
| [logo + inculva.com] | — | Brand |

*Both TR and EN hold on the final line for 60f (2s) — pacing is identical.*

---

## Scene Breakdown

Frame math (30fps): 300 + 300 + 300 + 390 + 60 = **1350f = 45s** ✓

### Scene 1 — Struggle (0–10s, frames 0–299, 300f)

- Background: `#000000` (pure black)
- "1.3 milyar insan." → 48px, white, springs up (stiffness: 180, damping: 20)
- "Her gün." → 56px, white, appears at frame 30, same spring
- "Engellere çarpıyor." → 88px, red (#ef4444), slams in at frame 60 (stiffness: 300, damping: 14 — impact, no bounce)
- Exit: hard cut at frame 300

### Scene 2 — Places (10–20s, frames 300–599, 300f)

Hard cut rhythm — each word holds then hard cuts.

- "Sokakta." → 72px, white, holds 45f, hard cut
- "İşte." → 72px, white, holds 45f, hard cut
- "Hatta internette." → 72px, red (#ef4444), holds 90f — slower, audience registers this is the fixable one
- Exit: hard cut at frame 600

### Scene 3 — Reality (20–30s, frames 600–899, 300f)

- "Web sitelerinin %96'sı" → 60px, white, floats up (stiffness: 80, damping: 22), appears frame 0
- "erişilebilir değil." → 72px, red, `textDecoration: "underline"`, `textDecorationColor: "#ef4444"`, `textDecorationThickness: "4px"` — appears at frame 30
- Both hold together for 2.5s (75f)
- Exit: fade out over 20f

### Scene 4 — Turn (30–43s, frames 900–1289, 390f)

The pivot. Pacing slows dramatically.

| Frame | Content |
|---|---|
| 0–60f | "Sokakları düzeltemeyiz." springs in (stiffness: 60, damping: 28 — heavy, weighted) |
| 60–105f | 45f pure black — silence |
| 105–150f | "Ama web sitenizi" slides in from left, blue (#3493ff), 52px |
| 150–210f | "düzeltebiliriz." springs up, white, 80px bold |
| 210–270f | Hold — both lines visible together |
| 270–390f | Slow fade to black (120f) |

### Scene 5 — Brand (43–45s, frames 1290–1349, 60f)

- Inculva logo, centered, fade in over 20f
- `inculva.com` below, 24px, blue (#3493ff)
- Fade to black last 10f

---

## Technical Decisions

| Property | Value | Reason |
|---|---|---|
| FPS | 30 | Social ads standard; halves render time |
| Background | `#000000` | Pure black hits harder than `#0f172a` |
| Primary font size | 64–88px | Fills screen, readable on mobile |
| Animation style | Hard cut + spring snap | Manifesto rhythm |
| Scene transitions | Hard cut (not cross-fade) | Momentum, urgency |
| Pause before turn | 45f (1.5s) | Audience sits in the problem |
| Text underline | `textDecoration` not `borderBottom` | Remotion headless renderer compatibility |
| Widget demo | Removed | Narrative > product demo for social ads |

---

## Aspect Ratios

Keep existing 4 compositions (Portrait + Landscape for each language):

| Composition ID | Lang | Ratio | durationInFrames |
|---|---|---|---|
| WelcomeVideo-TR-Portrait | tr | 9:16 | 1350 |
| WelcomeVideo-TR-Landscape | tr | 16:9 | 1350 |
| WelcomeVideo-EN-Portrait | en | 9:16 | 1350 |
| WelcomeVideo-EN-Landscape | en | 16:9 | 1350 |

---

## File Changes

### Files to delete
- `ProblemScene.tsx`
- `SolutionScene.tsx`
- `WidgetDemoScene.tsx`
- `CtaScene.tsx`

### Files to create
- `StruggleScene.tsx`
- `PlacesScene.tsx`
- `RealityScene.tsx`
- `TurnScene.tsx`
- `BrandScene.tsx`

### Files to modify

**`translations.ts`** — full interface redesign (not a content swap):

```ts
interface Translations {
  struggle: { line1: string; line2: string; line3: string };
  places: { line1: string; line2: string; line3: string };
  reality: { line1: string; line2: string };
  turn: { line1: string; line2: string; line3: string };
  brand: { domain: string };
}
```

**`WelcomeVideo.tsx`** — new Sequence timing (5 scenes, 1350f total), Audio volume ramp updated to 1350f

**`Root.tsx`** — FPS: 60 → 30, durationInFrames: 1740 → 1350 for all 4 compositions
