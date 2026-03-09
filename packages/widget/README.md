# @inculva/widget — Embeddable Accessibility Widget

A self-contained, framework-agnostic JavaScript accessibility widget. Embed it on any website with a single `<script>` tag to give visitors a floating panel with 16 WCAG-compliant accessibility features.

## Overview

The widget is built as an **IIFE (Immediately Invoked Function Expression)** — it has zero runtime dependencies and works on any website regardless of tech stack (React, Vue, Angular, WordPress, plain HTML, etc.).

**How it works:**
1. Script loads and auto-initializes via `DOMContentLoaded`
2. Reads `data-site-id` from the `<script>` tag
3. Fetches widget configuration from the Inculva API
4. Renders a floating accessibility button in the configured position
5. User clicks button → panel opens with 16 feature toggles
6. User toggles features → DOM manipulation applied instantly
7. Interaction events sent to the API via `navigator.sendBeacon`
8. Preferences persisted in `localStorage`

## Embed Snippet

```html
<script
  src="https://cdn.inculva.com/widget.js"
  data-site-id="YOUR_SITE_ID"
  async
></script>
```

Replace `YOUR_SITE_ID` with your site's ID from the Inculva dashboard.

## Accessibility Features (16)

| Feature | WCAG Reference | Description |
|---|---|---|
| `textResizing` | 1.4.4 | Increases all font sizes by 15% |
| `highContrast` | 1.4.3 | Applies `contrast(1.5)` CSS filter |
| `dyslexiaFont` | 3.1.5 | Loads OpenDyslexic font via Google Fonts |
| `cursorEnhancement` | — | Replaces cursor with large SVG circle |
| `keyboardNavigation` | 2.1.1 | Enhances `:focus-visible` outlines |
| `readingGuide` | 1.4.8 | Yellow horizontal line follows mouse |
| `screenReader` | 1.1.1 | Highlights images missing `alt` text |
| `pauseAnimations` | 2.3.1 | Sets `animation-play-state: paused` |
| `textSpacing` | 1.4.12 | Increases line-height and letter/word spacing |
| `highlightLinks` | 1.4.1 | Bolds, underlines, and outlines all links |
| `colorBlindMode` | 1.4.1 | Applies deuteranopia SVG color matrix |
| `largeClickTargets` | 2.5.8 | Sets `min-width/height: 44px` on interactive elements |
| `focusHighlight` | 2.4.11/2.4.13 | Orange 3px focus ring with glow |
| `grayscale` | 1.4.3 | Applies `filter: grayscale(100%)` |
| `skipNavigation` | 2.4.1 | Injects "Skip to main content" fixed link |
| `muteMedia` | 1.4.2 | Mutes and pauses all audio/video; watches for new media |

All features default to **enabled** — site owners can disable individual features in the dashboard.

## Languages

The widget panel supports **41 languages** served from the API. Language is configured per-site in the dashboard.

Supported scripts: Latin, CJK (Chinese/Japanese/Korean), Cyrillic, Arabic (RTL), Hebrew (RTL), Farsi (RTL), Urdu (RTL).

RTL languages automatically apply `dir="rtl"` to the widget panel.

## Development

```bash
# Watch mode — rebuilds on file change
pnpm dev

# Production build (widget.iife.js → copies to apps/web/public/widget.js)
pnpm build

# CDN build only (no copy step — used by GitHub Actions)
pnpm build:cdn
```

### Local testing

The `pnpm build` command copies `dist/widget.iife.js` to `apps/web/public/widget.js`. The local Next.js dev server serves this at `http://localhost:3000/widget.js`.

Test HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Widget Test</title>
</head>
<body>
  <h1>Test Page</h1>
  <p>Some content here.</p>
  <img src="test.jpg"> <!-- No alt — screenReader feature will highlight this -->

  <script
    src="http://localhost:3000/widget.js"
    data-site-id="YOUR_LOCAL_SITE_ID"
  ></script>
</body>
</html>
```

## Source Structure

```
src/
├── index.ts              ← InculvaWidget class + auto-init (reads data-site-id, fetches config)
├── features/
│   └── index.ts          ← All 16 feature handlers (DOM manipulation functions)
├── ui/
│   ├── panel.ts          ← Widget panel HTML generation (button + panel markup)
│   └── styles.ts         ← All widget CSS (scoped with .inculva- prefix)
└── utils/
    ├── session.ts        ← Per-session UUID generation (persisted in sessionStorage)
    └── storage.ts        ← localStorage preference read/write helpers
```

## Build Configuration

`vite.config.ts` builds an IIFE with:
- **Format**: `iife` (self-executing, no module system required)
- **Name**: `InculvaWidget` (global variable name)
- **Target**: `es2018` (broad browser compatibility)
- **Minifier**: `esbuild`
- **Output**: `dist/widget.iife.js`

## Event Schema

Events sent to `POST /api/widget/events`:

```typescript
interface WidgetEvent {
  siteId: string;
  sessionId: string;       // Per-session UUID from sessionStorage
  event: "opened" | "closed" | "feature_enabled" | "feature_disabled";
  feature?: string;        // Feature key for feature_enabled/disabled
  timestamp: string;       // ISO 8601
}
```

Events are sent with `navigator.sendBeacon` — non-blocking, fires even when the page unloads.

## CDN Deployment

On push to `main` (when `packages/widget/src/**` changes), GitHub Actions:
1. Builds `dist/widget.iife.js`
2. Uploads to Cloudflare R2 bucket as `widget.js`
3. Sets `Cache-Control: public, max-age=300` (5-minute CDN TTL)

The CDN URL is: `https://cdn.inculva.com/widget.js`

## Security Notes

- The widget does not execute any user-supplied code
- All configuration comes from the Inculva API (controlled by site owner)
- No `innerHTML` with untrusted data
- Domain allowlist enforced server-side (not bypassable on the client)
- `navigator.sendBeacon` respects CORS — the API's `Access-Control-Allow-Origin: *` header is required
