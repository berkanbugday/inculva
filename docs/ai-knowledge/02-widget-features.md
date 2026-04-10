# inculva Widget — Features Reference

## Overview

The inculva accessibility widget is an embeddable overlay that provides 24 WCAG-compliant accessibility features organized into four categories. It works with any website regardless of tech stack (React, Vue, Angular, WordPress, plain HTML, etc.). The widget is lightweight (~30kb minified), loads asynchronously, and does not slow down your website.

## Installation

Add this single line to your website:

```html
<script src="https://cdn.inculva.com/widget.js" data-site-id="YOUR_SITE_ID" async></script>
```

No dependencies, no build step, no framework required.

## Feature Categories

### Vision (7 features)

| Feature | Description | Levels |
|---------|-------------|--------|
| **Dark Mode** | Applies a dark color scheme to reduce eye strain and improve readability in low-light environments. | On/Off |
| **Blue Light Filter** | Adds a warm-toned overlay to reduce blue light emission from the screen, helping reduce eye fatigue. | On/Off |
| **Color Blind Mode** | Applies color correction filters for different types of color vision deficiency using Machado et al. color matrices. | 4 levels: Deuteranopia, Protanopia, Tritanopia, Achromatopsia |
| **Saturation (Contrast+)** | Increases color saturation and contrast to make content more distinguishable. Level 1 activates high contrast mode with yellow links. | 5 levels |
| **Highlight Links** | Adds visual emphasis to all links on the page so they stand out from surrounding text. | On/Off |
| **Highlight Titles** | Adds visual emphasis to all headings on the page for improved content scanning. | On/Off |
| **Hide Images** | Removes all images from the page for a text-only reading experience. | On/Off |

### Reading (9 features)

| Feature | Description | Levels |
|---------|-------------|--------|
| **Text Resizing** | Increases the base font size across the entire page. | 4 levels: 110%, 125%, 140%, 155% |
| **Text Spacing** | Increases letter and word spacing for improved readability. | 4 levels |
| **Text Align** | Changes text alignment across the page. | 3 levels: Left, Center, Right |
| **Line Height** | Increases line spacing between text lines. | 4 levels |
| **Dyslexia Font** | Switches all text to OpenDyslexic, a typeface designed to increase readability for readers with dyslexia. Fonts are loaded from CDN. | On/Off |
| **Reading Guide** | A horizontal bar that follows the mouse cursor to help maintain focus on the current line of text. Includes a chevron indicator. | 3 levels: Narrow (50vw), Wide (75vw), Full width (100vw) |
| **Reading Mask** | Dims the page except for a focused area around the cursor, reducing visual distractions. | On/Off |
| **Content Magnifier** | Magnifies content in the area around the cursor for users with low vision. | 4 levels |
| **Screen Reader** | Built-in text-to-speech that reads page content aloud using the browser's Web Speech API. Resolves readable text via aria-label, aria-labelledby, alt text, form labels, and innerText. | 3 levels: Alt text hints, Read on hover, Read on tap |

### Motor (6 features)

| Feature | Description | Levels |
|---------|-------------|--------|
| **Keyboard Navigation** | Enhances keyboard focus indicators with visible outlines and box shadows for easier tab navigation. | On/Off |
| **Focus Highlight** | Adds a prominent highlight ring around the currently focused element. | On/Off |
| **Large Click Targets** | Increases the size of clickable elements (buttons, links) to make them easier to interact with. | On/Off |
| **Cursor Enhancement** | Enlarges the mouse cursor with a custom SVG arrow for users who have difficulty tracking the standard cursor. | 3 levels: Medium (32px), Large (48px), Extra Large (64px) |
| **Slow Cursor** | Adds a trailing visual effect to the cursor, making it easier to track on screen. | 3 levels |
| **Skip Navigation** | Adds a "Skip to Content" link that allows keyboard users to bypass repetitive navigation. | On/Off |

### Calm (2 features)

| Feature | Description | Levels |
|---------|-------------|--------|
| **Pause Animations** | Stops all CSS animations, transitions, and GIFs on the page to reduce motion for users with vestibular disorders. | On/Off |
| **Mute Media** | Mutes all audio and video elements on the page. | On/Off |

## Accessibility Profiles

Pre-configured profiles that activate multiple features at once, tailored for specific needs:

| Profile | Features Activated |
|---------|-------------------|
| **Blind** | Screen Reader, Keyboard Navigation, Skip Navigation, Text Resizing |
| **Low Vision** | Text Resizing, Saturation/Contrast, Cursor Enhancement, Large Click Targets |
| **Dyslexia** | Dyslexia Font, Text Spacing, Reading Guide |
| **Color Blind** | Color Blind Mode |
| **Motor Impaired** | Keyboard Navigation, Large Click Targets, Focus Highlight |
| **ADHD** | Reading Guide, Pause Animations, Reading Mask |

Each profile can be individually enabled or disabled by the site owner through the dashboard.

## Widget Customization

Site owners can customize the widget through the dashboard:

- **Position** — Bottom-left or bottom-right of the screen
- **Button Size** — Small, Medium, or Large
- **Button Icon** — Choose from multiple accessibility icon styles
- **Language** — 41 languages supported including RTL (Arabic, Hebrew, Farsi, Urdu)
- **Header/Footer Colors** — Match your brand colors
- **Feature Toggles** — Enable or disable any individual feature
- **Profile Toggles** — Enable or disable any accessibility profile
- **Accessibility Statement URL** — Link to your accessibility statement page
- **White Label** — Remove or customize "Powered by inculva" branding (Large plan only)

## Multi-Language Support

The widget panel supports 41 languages:
Turkish, German, French, Spanish, Italian, Portuguese, Dutch, Arabic, Hebrew, Farsi, Urdu, Chinese (Simplified), Japanese, Korean, Russian, Polish, Czech, Danish, Finnish, Greek, Hungarian, Romanian, Swedish, Ukrainian, Slovak, Bulgarian, Croatian, Lithuanian, Latvian, Estonian, Slovenian, Serbian, Norwegian, Thai, Vietnamese, Indonesian, Malay, Catalan, Albanian, Swahili, and English.

RTL (Right-to-Left) languages are fully supported — the widget panel automatically applies `dir="rtl"` when an RTL language is active.

## Technical Details

- **Bundle size:** ~30kb minified
- **Format:** Self-contained IIFE (Immediately Invoked Function Expression)
- **Browser support:** ES2018+ (all modern browsers)
- **No dependencies:** Zero framework dependencies on the host site
- **CSS isolation:** Widget styles are scoped and do not affect the host site
- **Performance:** Loads asynchronously, non-blocking
- **Preferences:** Saved in `localStorage` so visitors keep their settings across visits
- **Analytics:** Sends interaction events via `navigator.sendBeacon` (non-blocking)
- **CDN:** Served from Cloudflare R2 with 5-minute cache
