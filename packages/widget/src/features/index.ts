import type { ColorBlindType, WidgetFeatures } from "@inculva/types";
import { OPENDYSLEXIC_REGULAR_B64, OPENDYSLEXIC_BOLD_B64 } from "virtual:opendyslexic-fonts";

type FeatureHandler = {
  enable: () => void;
  disable: () => void;
};

// ── OpenDyslexic font loading ────────────────────────────────────────────────
//
// We use the FontFace JavaScript API with raw ArrayBuffer data rather than CSS
// @font-face with a URL or data: URI. When a FontFace is constructed from
// binary (not a URL string), the browser performs NO network request and does
// NOT consult font-src CSP — there is simply no URL to check. This makes the
// dyslexia font work on any customer site regardless of how strict their CSP is.

/** Decode a base64 string into an ArrayBuffer without any URL or fetch. */
function b64ToBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

const dyslexiaFaces: FontFace[] = [];

function loadDyslexiaFonts(): void {
  if (dyslexiaFaces.length > 0) return; // already loaded

  const specs = [
    { b64: OPENDYSLEXIC_REGULAR_B64, weight: "400" },
    { b64: OPENDYSLEXIC_BOLD_B64,    weight: "700" },
  ] as const;

  for (const { b64, weight } of specs) {
    const face = new FontFace("OpenDyslexic", b64ToBuffer(b64), {
      weight,
      style: "normal",
      display: "swap",
    });
    // .load() on binary data resolves immediately (no network round-trip)
    face.load().then((loaded) => {
      document.fonts.add(loaded);
      dyslexiaFaces.push(loaded);
    });
  }
}

function unloadDyslexiaFonts(): void {
  for (const face of dyslexiaFaces) document.fonts.delete(face);
  dyslexiaFaces.length = 0;
}

function injectStyle(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

function removeStyle(id: string): void {
  document.getElementById(id)?.remove();
}

// --- Color blind mode state & helpers ---

let activeColorBlindType: ColorBlindType = "deuteranopia";

const COLOR_BLIND_FILTERS: Record<ColorBlindType, string> = {
  // Machado et al. (2009) color matrix values
  deuteranopia:   "0.367 0.861 -0.228 0 0  0.280 0.673  0.047 0 0 -0.012 0.043  0.969 0 0  0 0 0 1 0",
  protanopia:     "0.152 1.053 -0.205 0 0  0.115 0.786  0.099 0 0 -0.004 -0.048 1.052 0 0  0 0 0 1 0",
  tritanopia:     "1.256 -0.077 -0.179 0 0 -0.078 0.931 0.148 0 0  0.005 0.691  0.304 0 0  0 0 0 1 0",
  achromatopsia:  "0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0 0 0 1 0",
};

function applyColorBlindFilter(type: ColorBlindType): void {
  injectStyle(
    "inculva-color-blind-filter-def",
    `body::before { content: ''; position: fixed; width: 0; height: 0; }`
  );
  let svg = document.getElementById("inculva-color-blind-svg");
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as unknown as HTMLElement;
    svg.id = "inculva-color-blind-svg";
    (svg as unknown as SVGElement).setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    document.body.insertBefore(svg, document.body.firstChild);
  }
  svg.innerHTML = `<defs><filter id="inculva-cbf"><feColorMatrix type="matrix" values="${COLOR_BLIND_FILTERS[type]}"/></filter></defs>`;
  // Remove previous style so re-inject fires
  removeStyle("inculva-color-blind");
  injectStyle("inculva-color-blind", `html { filter: url(#inculva-cbf) !important; }`);
}

export function getColorBlindType(): ColorBlindType { return activeColorBlindType; }

export function setColorBlindType(type: ColorBlindType): void {
  activeColorBlindType = type;
  if (document.getElementById("inculva-color-blind")) {
    applyColorBlindFilter(type);
  }
}

export const featureHandlers: Record<keyof WidgetFeatures, FeatureHandler> = {
  textResizing: {
    enable: () => {
      const current = parseFloat(document.documentElement.style.fontSize || "16");
      document.documentElement.style.fontSize = `${current * 1.15}px`;
    },
    disable: () => {
      document.documentElement.style.fontSize = "";
    },
  },

  highContrast: {
    enable: () =>
      injectStyle(
        "inculva-high-contrast",
        `
        body { filter: contrast(1.5) !important; }
        a { color: #ffff00 !important; }
      `
      ),
    disable: () => removeStyle("inculva-high-contrast"),
  },

  dyslexiaFont: {
    enable: () => {
      // Register the font via the JS FontFace API (ArrayBuffer path — no URL,
      // no font-src CSP check), then apply it via a plain CSS font-family rule.
      loadDyslexiaFonts();
      injectStyle(
        "inculva-dyslexia-font",
        `* { font-family: 'OpenDyslexic', sans-serif !important; }`
      );
    },
    disable: () => {
      removeStyle("inculva-dyslexia-font");
      unloadDyslexiaFonts();
    },
  },

  cursorEnhancement: {
    enable: () =>
      injectStyle(
        "inculva-cursor",
        `* { cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="black" stroke="white" stroke-width="2"/></svg>') 16 16, auto !important; }`
      ),
    disable: () => removeStyle("inculva-cursor"),
  },

  keyboardNavigation: {
    enable: () =>
      injectStyle(
        "inculva-keyboard-nav",
        `:focus-visible { outline: 3px solid #0066cc !important; outline-offset: 3px !important; }`
      ),
    disable: () => removeStyle("inculva-keyboard-nav"),
  },

  readingGuide: {
    enable: () => {
      const guide = document.createElement("div");
      guide.id = "inculva-reading-guide";
      guide.style.cssText = `
        position: fixed; left: 0; right: 0; height: 32px;
        background: rgba(255, 255, 0, 0.2); pointer-events: none;
        z-index: 999998; top: 0; transition: top 0.05s;
      `;
      document.body.appendChild(guide);
      const move = (e: MouseEvent) => {
        guide.style.top = `${e.clientY - 16}px`;
      };
      document.addEventListener("mousemove", move);
      (guide as HTMLElement & { _moveHandler?: (e: MouseEvent) => void })._moveHandler = move;
    },
    disable: () => {
      const guide = document.getElementById("inculva-reading-guide") as
        | (HTMLElement & { _moveHandler?: (e: MouseEvent) => void })
        | null;
      if (guide?._moveHandler) {
        document.removeEventListener("mousemove", guide._moveHandler);
      }
      guide?.remove();
    },
  },

  screenReader: {
    enable: () =>
      injectStyle(
        "inculva-screen-reader",
        `
        img:not([alt]) { outline: 3px solid red !important; }
        img[alt]::after { content: attr(alt); }
      `
      ),
    disable: () => removeStyle("inculva-screen-reader"),
  },

  pauseAnimations: {
    enable: () =>
      injectStyle(
        "inculva-pause-animations",
        `*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }`
      ),
    disable: () => removeStyle("inculva-pause-animations"),
  },

  // WCAG 2.1 — 1.4.12 Text Spacing
  textSpacing: {
    enable: () =>
      injectStyle(
        "inculva-text-spacing",
        `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
         p { margin-bottom: 2em !important; }`
      ),
    disable: () => removeStyle("inculva-text-spacing"),
  },

  // WCAG 2.0 — 1.4.1 Highlight Links
  highlightLinks: {
    enable: () =>
      injectStyle(
        "inculva-highlight-links",
        `a, a:visited { text-decoration: underline !important; font-weight: bold !important; outline: 2px solid currentColor !important; outline-offset: 1px !important; }`
      ),
    disable: () => removeStyle("inculva-highlight-links"),
  },

  // WCAG 2.0 — 1.4.1 Color Blind Mode (SVG filter, type set via setColorBlindType)
  colorBlindMode: {
    enable: () => applyColorBlindFilter(activeColorBlindType),
    disable: () => {
      removeStyle("inculva-color-blind-filter-def");
      removeStyle("inculva-color-blind");
      document.getElementById("inculva-color-blind-svg")?.remove();
    },
  },

  // WCAG 2.2 — 2.5.8 Large Click Targets (44×44 px minimum)
  largeClickTargets: {
    enable: () =>
      injectStyle(
        "inculva-large-targets",
        `a, button, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [tabindex] {
          min-width: 44px !important;
          min-height: 44px !important;
        }`
      ),
    disable: () => removeStyle("inculva-large-targets"),
  },

  // WCAG 2.2 — 2.4.11/2.4.13 Focus Highlight
  focusHighlight: {
    enable: () =>
      injectStyle(
        "inculva-focus-highlight",
        `:focus, :focus-visible {
          outline: 3px solid #ff6600 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(255,102,0,0.3) !important;
          z-index: 999997 !important;
          position: relative !important;
        }`
      ),
    disable: () => removeStyle("inculva-focus-highlight"),
  },

  // WCAG 1.4.3 / photosensitivity — Grayscale
  grayscale: {
    enable: () =>
      injectStyle(
        "inculva-grayscale",
        `html { filter: grayscale(100%) !important; }`
      ),
    disable: () => removeStyle("inculva-grayscale"),
  },

  // WCAG 2.4.1 A — Skip Navigation (Bypass Blocks)
  skipNavigation: {
    enable: () => {
      if (document.getElementById("inculva-skip-nav")) return;
      const skip = document.createElement("a");
      skip.id = "inculva-skip-nav";
      const main = document.querySelector<HTMLElement>("main, [role='main'], #main, #content, .main-content");
      if (main) {
        if (!main.id) main.id = "inculva-main-content";
        skip.href = `#${main.id}`;
      } else {
        skip.href = "#";
      }
      skip.textContent = "Skip to main content";
      skip.style.cssText = [
        "position:fixed", "top:-100px", "left:16px", "z-index:9999999",
        "background:#000", "color:#fff", "padding:8px 16px",
        "border-radius:0 0 8px 8px", "font-weight:bold", "font-size:14px",
        "font-family:system-ui,sans-serif", "text-decoration:none",
        "transition:top 0.15s", "border:2px solid #fff",
      ].join(";");
      skip.addEventListener("focus", () => { skip.style.top = "0"; });
      skip.addEventListener("blur", () => { skip.style.top = "-100px"; });
      document.body.insertBefore(skip, document.body.firstChild);
    },
    disable: () => {
      document.getElementById("inculva-skip-nav")?.remove();
    },
  },

  // Reading Mask — horizontal semi-transparent band that follows cursor
  readingMask: {
    enable: () => {
      if (document.getElementById("inculva-reading-mask")) return;
      const mask = document.createElement("div");
      mask.id = "inculva-reading-mask";
      mask.style.cssText = [
        "position:fixed", "left:0", "right:0", "height:40px",
        "background:rgba(255,255,0,0.25)", "border-top:2px solid rgba(200,180,0,0.4)",
        "border-bottom:2px solid rgba(200,180,0,0.4)",
        "pointer-events:none", "z-index:999998", "top:0", "transition:top 0.04s linear",
      ].join(";");
      document.body.appendChild(mask);
      const move = (e: MouseEvent) => { mask.style.top = `${e.clientY - 20}px`; };
      document.addEventListener("mousemove", move);
      (mask as HTMLElement & { _moveHandler?: (e: MouseEvent) => void })._moveHandler = move;
    },
    disable: () => {
      const mask = document.getElementById("inculva-reading-mask") as
        | (HTMLElement & { _moveHandler?: (e: MouseEvent) => void })
        | null;
      if (mask?._moveHandler) document.removeEventListener("mousemove", mask._moveHandler);
      mask?.remove();
    },
  },

  // Text Alignment — cycles through left / center / right
  textAlign: {
    enable: () =>
      injectStyle(
        "inculva-text-align",
        `p, li, td, th, label, h1, h2, h3, h4, h5, h6 { text-align: left !important; }`
      ),
    disable: () => removeStyle("inculva-text-align"),
  },

  // Saturation — boosts colour saturation to aid low-vision users
  saturation: {
    enable: () =>
      injectStyle(
        "inculva-saturation",
        `html { filter: saturate(2) !important; }`
      ),
    disable: () => removeStyle("inculva-saturation"),
  },

  // WCAG 1.4.2 A — Audio Control (mute autoplaying media)
  muteMedia: {
    enable: () => {
      for (const el of document.querySelectorAll<HTMLMediaElement>("audio, video")) {
        el.muted = true;
        if (!el.paused) el.pause();
      }
      injectStyle("inculva-mute-media-state", ""); // sentinel style to detect enabled state
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLMediaElement) {
              node.muted = true;
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      (window as Window & { __inculvaMuteObserver?: MutationObserver }).__inculvaMuteObserver = observer;
    },
    disable: () => {
      removeStyle("inculva-mute-media-state");
      for (const el of document.querySelectorAll<HTMLMediaElement>("audio, video")) {
        el.muted = false;
      }
      (window as Window & { __inculvaMuteObserver?: MutationObserver }).__inculvaMuteObserver?.disconnect();
      delete (window as Window & { __inculvaMuteObserver?: MutationObserver }).__inculvaMuteObserver;
    },
  },
};
