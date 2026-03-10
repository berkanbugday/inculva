import type { ColorBlindType, WidgetFeatures } from "@inculva/types";
import {
  OPENDYSLEXIC_REGULAR_B64,
  OPENDYSLEXIC_BOLD_B64,
} from "virtual:opendyslexic-fonts";

type FeatureHandler = {
  /** level is 1-based (1 = minimum, N = maximum). Omit for binary features. */
  enable: (level?: number) => void;
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
    { b64: OPENDYSLEXIC_BOLD_B64, weight: "700" },
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

/** Like injectStyle but always overwrites existing content (needed for leveled features). */
function replaceStyle(id: string, css: string): void {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

function removeStyle(id: string): void {
  document.getElementById(id)?.remove();
}

// ── Feature level counts ──────────────────────────────────────────────────────
// Features listed here support incremental levels (1 = min, N = max).
// Clicking the button cycles 0 → 1 → 2 → … → N → 0 (off).
export const FEATURE_LEVELS: Partial<Record<keyof WidgetFeatures, number>> = {
  textResizing: 4,
  lineHeight: 4,
  textSpacing: 4,
  contentMagnifier: 4,
  saturation: 4,
  colorBlindMode: 4, // L1=deuteranopia L2=protanopia L3=tritanopia L4=achromatopsia
  textAlign: 3,      // L1=left L2=center L3=right
  readingGuide: 3,   // L1=thin(3px) L2=medium(6px) L3=thick(12px)
  cursorEnhancement: 3, // L1=medium(32px) L2=large(48px) L3=XL(64px)
  slowCursor: 3,     // L1=slight(α=0.25) L2=medium(α=0.15) L3=heavy(α=0.08)
  screenReader: 3,   // L1=alt hints  L2=read on hover  L3=read on tap
};

/** Level → ColorBlindType mapping (exported so index.ts can derive display labels). */
export const CBM_CYCLE_TYPES: ColorBlindType[] = [
  "deuteranopia",
  "protanopia",
  "tritanopia",
  "achromatopsia",
];

// ── Composited html-level filter manager ─────────────────────────────────────
//
// Multiple features can all want to set a CSS `filter` on <html>.  Because only
// ONE `filter` declaration wins per element (even with !important, the last
// injected <style> wins in cascade order), enabling a second filter would
// silently overwrite the first.
//
// Solution: every feature that touches html's filter goes through this registry.
// The registry re-builds a single <style id="inculva-html-filter"> whose value
// is the space-joined list of all active filter functions.  Adding or removing
// any entry re-flushes the merged rule in place.

const _htmlFilters = new Map<string, string>();

function _flushHtmlFilter(): void {
  const id = "inculva-html-filter";
  const parts = [..._htmlFilters.values()];

  let el = document.getElementById(id);
  if (parts.length === 0) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = `body { filter: ${parts.join(" ")} !important; }`;
}

function setHtmlFilter(key: string, value: string): void {
  _htmlFilters.set(key, value);
  _flushHtmlFilter();
}

function removeHtmlFilter(key: string): void {
  _htmlFilters.delete(key);
  _flushHtmlFilter();
}

// ── Color blind mode state & helpers ─────────────────────────────────────────

let activeColorBlindType: ColorBlindType = "deuteranopia";

const COLOR_BLIND_FILTERS: Record<ColorBlindType, string> = {
  // Machado et al. (2009) color matrix values
  deuteranopia:
    "0.367 0.861 -0.228 0 0  0.280 0.673  0.047 0 0 -0.012 0.043  0.969 0 0  0 0 0 1 0",
  protanopia:
    "0.152 1.053 -0.205 0 0  0.115 0.786  0.099 0 0 -0.004 -0.048 1.052 0 0  0 0 0 1 0",
  tritanopia:
    "1.256 -0.077 -0.179 0 0 -0.078 0.931 0.148 0 0  0.005 0.691  0.304 0 0  0 0 0 1 0",
  achromatopsia:
    "0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0 0 0 1 0",
};

/** Create / update the hidden SVG <filter> element used by colorBlindMode. */
function _applyColorBlindSvg(type: ColorBlindType): void {
  injectStyle(
    "inculva-color-blind-filter-def",
    `body::before { content: ''; position: fixed; width: 0; height: 0; }`,
  );
  let svg = document.getElementById("inculva-color-blind-svg");
  if (!svg) {
    svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    ) as unknown as HTMLElement;
    svg.id = "inculva-color-blind-svg";
    (svg as unknown as SVGElement).setAttribute(
      "style",
      "position:absolute;width:0;height:0;overflow:hidden",
    );
    document.body.insertBefore(svg, document.body.firstChild);
  }
  svg.innerHTML = `<defs><filter id="inculva-cbf"><feColorMatrix type="matrix" values="${COLOR_BLIND_FILTERS[type]}"/></filter></defs>`;
}

export function getColorBlindType(): ColorBlindType {
  return activeColorBlindType;
}

export function setColorBlindType(type: ColorBlindType): void {
  activeColorBlindType = type;
  // Only update SVG if colorBlindMode is currently active
  if (_htmlFilters.has("colorBlind")) {
    _applyColorBlindSvg(type);
    // url(#inculva-cbf) reference in the compositor never changes — no flush needed
  }
}

// ── Screen Reader / TTS helpers ───────────────────────────────────────────────
//
// Resolves the most readable text for a given DOM element by walking up the
// ancestor chain: aria-label → aria-labelledby → img alt → form label/placeholder
// → innerText.  Stops after 4 hops so we never read the whole page body.

function _getReadableText(target: Element): string {
  let el: Element | null = target;
  for (let i = 0; i < 4 && el && el !== document.documentElement; i++) {
    const htmlEl = el as HTMLElement;
    // Skip widget own UI
    if (htmlEl.id?.startsWith("inculva") || htmlEl.className?.includes?.("inculva")) return "";

    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel?.trim()) return ariaLabel.trim();

    const labelledBy = el.getAttribute("aria-labelledby");
    if (labelledBy) {
      const lbText = document.getElementById(labelledBy)?.textContent?.trim();
      if (lbText) return lbText;
    }

    if (el instanceof HTMLImageElement) {
      return el.alt?.trim() || "Image with no description";
    }

    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      const elId = htmlEl.id;
      const lblText = elId
        ? document.querySelector<HTMLElement>(`label[for="${elId}"]`)?.textContent?.trim()
        : undefined;
      if (lblText) return lblText;
      if (el instanceof HTMLInputElement && el.placeholder) return el.placeholder;
    }

    const text = (htmlEl.innerText ?? "").trim();
    if (text.length >= 2 && text.length <= 500) return text;
    el = el.parentElement;
  }
  return "";
}

let _srHoverTimer: ReturnType<typeof setTimeout> | null = null;
let _srLang = "";

/** Map widget 2-letter language codes → BCP 47 tags for natural TTS voice selection. */
const LANG_BCP47: Record<string, string> = {
  en: "en-US", tr: "tr-TR", de: "de-DE", fr: "fr-FR", es: "es-ES",
  it: "it-IT", pt: "pt-PT", nl: "nl-NL", ar: "ar-SA", he: "he-IL",
  zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", ru: "ru-RU", pl: "pl-PL",
};

/** Called by the widget on init and when the user changes the language selector (fallback only). */
export function setSrLang(lang: string): void {
  _srLang = lang;
}

/**
 * Walk up the DOM from `el` looking for a `lang` attribute.
 * Falls back to document.documentElement.lang, then to the widget language.
 * Returns a BCP 47 tag ready to assign to SpeechSynthesisUtterance.lang.
 */
function _detectLang(el: Element): string {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const lang = node.getAttribute("lang");
    if (lang) return LANG_BCP47[lang.toLowerCase().slice(0, 2)] ?? lang;
    node = node.parentElement;
  }
  // Fall back to page-level lang, then widget UI language
  const pageLang = document.documentElement.lang;
  const fallback = pageLang || _srLang || "en";
  return LANG_BCP47[fallback.toLowerCase().slice(0, 2)] ?? fallback;
}

function _speak(text: string, fromEl?: Element): void {
  if (!("speechSynthesis" in window) || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text.trim().slice(0, 350));
  utt.rate = 1.05;
  utt.lang = fromEl ? _detectLang(fromEl) : (LANG_BCP47[_srLang] ?? _srLang ?? "en-US");
  window.speechSynthesis.speak(utt);
}

/** Tears down all screen-reader state for any level (called before switching levels or on disable). */
function _cleanupScreenReader(): void {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (_srHoverTimer !== null) { clearTimeout(_srHoverTimer); _srHoverTimer = null; }

  // Run the per-level cleanup closure (removes event listeners)
  const w = window as Window & { __inculvaSrCleanup?: () => void };
  w.__inculvaSrCleanup?.();
  delete w.__inculvaSrCleanup;

  removeStyle("inculva-screen-reader");

  // Remove TTS outline markers
  for (const el of document.querySelectorAll<HTMLElement>("[data-inculva-tts-hover],[data-inculva-tts-tap]")) {
    delete el.dataset["inculvaTtsHover"];
    delete el.dataset["inculvaTtsTap"];
  }
  // Unwrap alt-badge wrappers, restoring <img> to original position
  for (const wrap of document.querySelectorAll<HTMLElement>("[data-inculva-sr-wrap]")) {
    const img = wrap.querySelector("img");
    if (img) wrap.parentNode?.insertBefore(img, wrap);
    wrap.remove();
  }
  // Remove alt-hint markers and red outlines
  for (const img of document.querySelectorAll<HTMLImageElement>("[data-inculva-sr]")) {
    img.classList.remove("inculva-no-alt");
    delete img.dataset["inculvaSr"];
  }
}

/** Exported so index.ts can build per-level button label strings. */
export const SR_MODE_LABELS = ["", "Alt hints", "Read on hover", "Read on tap"] as const;

// Runtime scale value read by the contentMagnifier move handler on every event,
// so changing the level takes effect immediately without recreating the lens.
let _magnifierScale = 1.25;

export const featureHandlers: Record<keyof WidgetFeatures, FeatureHandler> = {
  // 4 incremental levels: 110% → 125% → 140% → 155%
  textResizing: {
    enable: (level = 1) => {
      const sizes = ["110%", "125%", "140%", "155%"];
      replaceStyle(
        "inculva-text-resize",
        `html { font-size: ${sizes[level - 1] ?? "110%"} !important; }`,
      );
    },
    disable: () => removeStyle("inculva-text-resize"),
  },

  // Contrast filter goes on <html> (not body) so position:fixed widget keeps
  // the viewport as its containing block. body-level filter breaks fixed pos.
  highContrast: {
    enable: () => {
      setHtmlFilter("highContrast", "contrast(1.55)");
      injectStyle(
        "inculva-high-contrast-links",
        `body a { color: #ffff00 !important; }`,
      );
    },
    disable: () => {
      removeHtmlFilter("highContrast");
      removeStyle("inculva-high-contrast-links");
    },
  },

  dyslexiaFont: {
    enable: () => {
      // Register the font via the JS FontFace API (ArrayBuffer path — no URL,
      // no font-src CSP check), then apply it via a plain CSS font-family rule.
      loadDyslexiaFonts();
      injectStyle(
        "inculva-dyslexia-font",
        `body * { font-family: 'OpenDyslexic', sans-serif !important; }`,
      );
    },
    disable: () => {
      removeStyle("inculva-dyslexia-font");
      unloadDyslexiaFonts();
    },
  },

  cursorEnhancement: {
    // Three cursor sizes — standard arrow cursor shape (white fill, black outline).
    // Hotspot coordinates reference the pointer tip (top-left of the arrow).
    enable: (level = 1) => {
      // [size_px, hotspot_x, hotspot_y] — hotspot in CSS pixels at rendered size
      const cfg: [number, number, number][] = [[32, 6, 3], [48, 9, 4], [64, 12, 6]];
      const [sz, hx, hy] = cfg[Math.min(level, 3) - 1] ?? cfg[0];
      // Classic arrow cursor path in a 24×24 viewBox.
      // IMPORTANT: all SVG attributes use double quotes so encodeURIComponent
      // encodes them as safe %22 sequences — single quotes are NOT encoded by
      // encodeURIComponent (they are in the unreserved set), so a single-quoted
      // SVG inside url('...') would prematurely close the CSS string.
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24">`
        + `<path d="M5 2 L5 20 L9 16 L12 22.5 L15 21 L12 14.5 L18.5 14.5 Z" `
        + `fill="white" stroke="black" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke fill"/>`
        + `</svg>`;
      replaceStyle(
        "inculva-cursor",
        `body *:not([id^="inculva"]):not([class*="inculva"]) { cursor: url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hx} ${hy}, auto !important; }`,
      );
    },
    disable: () => removeStyle("inculva-cursor"),
  },

  keyboardNavigation: {
    enable: () =>
      injectStyle(
        "inculva-keyboard-nav",
        `:focus-visible { outline: 3px solid #0066cc !important; outline-offset: 3px !important; }`,
      ),
    disable: () => removeStyle("inculva-keyboard-nav"),
  },

  readingGuide: {
    // 3 levels of prominence: thin (3 px) / medium (6 px) / thick (12 px).
    // The element is always recreated on enable so level changes take effect immediately.
    enable: (level = 1) => {
      // Clean up any existing guide before (re-)creating at new level
      const prev = document.getElementById("inculva-reading-guide") as
        | (HTMLElement & { _moveHandler?: (e: MouseEvent) => void })
        | null;
      if (prev?._moveHandler)
        document.removeEventListener("mousemove", prev._moveHandler);
      prev?.remove();

      const heights = [3, 6, 12];
      const h = heights[level - 1] ?? 3;

      const guide = document.createElement("div");
      guide.id = "inculva-reading-guide";
      guide.style.cssText = [
        "position:fixed",
        "left:0",
        "right:0",
        `height:${h}px`,
        "background:var(--inculva-primary,#0066cc)",
        "opacity:0.85",
        "pointer-events:none",
        "z-index:2147483642",
        "top:0",
      ].join(";");
      document.documentElement.appendChild(guide);
      const move = (e: MouseEvent) => {
        guide.style.top = `${e.clientY - Math.floor(h / 2)}px`;
      };
      document.addEventListener("mousemove", move);
      (
        guide as HTMLElement & { _moveHandler?: (e: MouseEvent) => void }
      )._moveHandler = move;
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

  // Screen Reader — 3 levels:
  //   L1: Alt hints   — red outline on images with missing alt; badge showing alt text on others
  //   L2: Read on hover — Web Speech API reads element text ~400 ms after cursor settles
  //   L3: Read on tap  — Web Speech API reads element text on click/tap
  screenReader: {
    enable: (level = 1) => {
      // Always tear down the previous level before re-applying
      _cleanupScreenReader();

      if (level === 1) {
        // ── L1: Alt text hints ───────────────────────────────────────────────
        injectStyle(
          "inculva-screen-reader",
          `img.inculva-no-alt { outline: 3px solid #dc2626 !important; outline-offset: 3px !important; }
           .inculva-alt-wrap { position: relative !important; display: inline-block !important; vertical-align: bottom; }
           .inculva-alt-badge {
             position: absolute; bottom: 0; left: 0; right: 0;
             background: rgba(0,0,0,0.78); color: #fff;
             font-size: 10px; line-height: 1.3; font-family: system-ui, sans-serif;
             padding: 2px 5px; pointer-events: none; z-index: 2147483640;
             overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
             border-top: 2px solid var(--inculva-primary, #0066cc);
           }`,
        );

        function processImg(img: HTMLImageElement): void {
          if (img.dataset["inculvaSr"]) return;
          if (img.closest("#inculva-widget-panel,#inculva-widget-btn")) return;
          img.dataset["inculvaSr"] = "1";
          const alt = img.getAttribute("alt");
          const hasAlt = alt !== null && alt.trim() !== "";
          if (!hasAlt) { img.classList.add("inculva-no-alt"); return; }
          const parent = img.parentNode;
          if (!parent) return;
          const wrap = document.createElement("span");
          wrap.className = "inculva-alt-wrap";
          wrap.setAttribute("data-inculva-sr-wrap", "1");
          parent.insertBefore(wrap, img);
          wrap.appendChild(img);
          const badge = document.createElement("span");
          badge.className = "inculva-alt-badge";
          badge.textContent = alt;
          wrap.appendChild(badge);
        }

        for (const img of document.querySelectorAll<HTMLImageElement>("img")) processImg(img);

        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const node of m.addedNodes) {
              if (node instanceof HTMLImageElement) processImg(node);
              else if (node instanceof HTMLElement) {
                for (const img of node.querySelectorAll<HTMLImageElement>("img")) processImg(img);
              }
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        (window as Window & { __inculvaSrCleanup?: () => void }).__inculvaSrCleanup = () => observer.disconnect();

      } else if (level === 2) {
        // ── L2: Read on hover ────────────────────────────────────────────────
        // A dashed primary-colour outline appears on the element being read.
        injectStyle(
          "inculva-screen-reader",
          `[data-inculva-tts-hover] {
             outline: 2px dashed var(--inculva-primary, #0066cc) !important;
             outline-offset: 3px !important;
           }`,
        );

        let lastEl: Element | null = null;

        const onOver = (e: MouseEvent): void => {
          const target = e.target as Element | null;
          if (!target || target === lastEl) return;
          if (target.closest("#inculva-widget-panel,#inculva-widget-btn")) return;
          lastEl = target;
          // Clear any pending timer and remove the previous outline
          if (_srHoverTimer !== null) { clearTimeout(_srHoverTimer); _srHoverTimer = null; }
          for (const el of document.querySelectorAll<HTMLElement>("[data-inculva-tts-hover]")) {
            delete el.dataset["inculvaTtsHover"];
          }
          // Wait 400 ms of stillness before reading — avoids reading every element
          // as the cursor sweeps across the page.
          _srHoverTimer = setTimeout(() => {
            const text = _getReadableText(target);
            if (text) {
              (target as HTMLElement).dataset["inculvaTtsHover"] = "1";
              _speak(text, target);
            }
          }, 400);
        };

        const onOut = (): void => {
          if (_srHoverTimer !== null) { clearTimeout(_srHoverTimer); _srHoverTimer = null; }
        };

        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);
        (window as Window & { __inculvaSrCleanup?: () => void }).__inculvaSrCleanup = () => {
          document.removeEventListener("mouseover", onOver);
          document.removeEventListener("mouseout", onOut);
        };

      } else {
        // ── L3: Read on tap / click ──────────────────────────────────────────
        // A solid primary-colour outline briefly marks the element just read.
        injectStyle(
          "inculva-screen-reader",
          `[data-inculva-tts-tap] {
             outline: 2px solid var(--inculva-primary, #0066cc) !important;
             outline-offset: 3px !important;
           }`,
        );

        let lastTapEl: Element | null = null;

        const onTap = (e: MouseEvent): void => {
          const target = e.target as Element | null;
          if (!target) return;
          if (target.closest("#inculva-widget-panel,#inculva-widget-btn")) return;
          // Remove outline from previously tapped element
          if (lastTapEl) { delete (lastTapEl as HTMLElement).dataset["inculvaTtsTap"]; }
          const text = _getReadableText(target);
          if (!text) return;
          lastTapEl = target;
          (target as HTMLElement).dataset["inculvaTtsTap"] = "1";
          _speak(text, target);
          // Auto-remove the outline after ~2.5 s (generous for long phrases)
          setTimeout(() => {
            if (lastTapEl === target) {
              delete (target as HTMLElement).dataset["inculvaTtsTap"];
              lastTapEl = null;
            }
          }, 2500);
        };

        document.addEventListener("click", onTap);
        (window as Window & { __inculvaSrCleanup?: () => void }).__inculvaSrCleanup = () => {
          document.removeEventListener("click", onTap);
        };
      }
    },
    disable: () => _cleanupScreenReader(),
  },

  pauseAnimations: {
    enable: () =>
      injectStyle(
        "inculva-pause-animations",
        `body *, body *::before, body *::after { animation-play-state: paused !important; transition: none !important; }`,
      ),
    disable: () => removeStyle("inculva-pause-animations"),
  },

  // WCAG 2.1 — 1.4.12 Text Spacing — 4 levels of increasing spacing
  textSpacing: {
    enable: (level = 1) => {
      const cfg = [
        { lh: "1.5", ls: "0.06em", ws: "0.10em" },
        { lh: "1.7", ls: "0.12em", ws: "0.16em" },
        { lh: "1.9", ls: "0.16em", ws: "0.20em" },
        { lh: "2.1", ls: "0.20em", ws: "0.24em" },
      ];
      const { lh, ls, ws } = cfg[level - 1] ?? cfg[0]!;
      replaceStyle(
        "inculva-text-spacing",
        `body * { line-height: ${lh} !important; letter-spacing: ${ls} !important; word-spacing: ${ws} !important; }
         body p { margin-bottom: 2em !important; }`,
      );
    },
    disable: () => removeStyle("inculva-text-spacing"),
  },

  // WCAG 2.0 — 1.4.1 Highlight Links
  highlightLinks: {
    enable: () =>
      injectStyle(
        "inculva-highlight-links",
        `body a, body a:visited { text-decoration: underline !important; font-weight: bold !important; outline: 2px solid currentColor !important; outline-offset: 1px !important; }`,
      ),
    disable: () => removeStyle("inculva-highlight-links"),
  },

  // WCAG 2.0 — 1.4.1 Color Blind Mode — 4 levels, one per filter type
  colorBlindMode: {
    enable: (level = 1) => {
      const type = CBM_CYCLE_TYPES[level - 1] ?? "deuteranopia";
      activeColorBlindType = type;
      _applyColorBlindSvg(type);
      setHtmlFilter("colorBlind", "url(#inculva-cbf)");
    },
    disable: () => {
      removeHtmlFilter("colorBlind");
      removeStyle("inculva-color-blind-filter-def");
      document.getElementById("inculva-color-blind-svg")?.remove();
      activeColorBlindType = "deuteranopia";
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
        }`,
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
        }`,
      ),
    disable: () => removeStyle("inculva-focus-highlight"),
  },

  // WCAG 1.4.3 / photosensitivity — Grayscale
  grayscale: {
    enable: () => setHtmlFilter("grayscale", "grayscale(100%)"),
    disable: () => removeHtmlFilter("grayscale"),
  },

  // WCAG 2.4.1 A — Skip Navigation (Bypass Blocks)
  skipNavigation: {
    enable: () => {
      if (document.getElementById("inculva-skip-nav")) return;
      const skip = document.createElement("a");
      skip.id = "inculva-skip-nav";
      const main = document.querySelector<HTMLElement>(
        "main, [role='main'], #main, #content, .main-content",
      );
      if (main) {
        if (!main.id) main.id = "inculva-main-content";
        skip.href = `#${main.id}`;
      } else {
        skip.href = "#";
      }
      skip.textContent = "Skip to main content";
      skip.style.cssText = [
        "position:fixed",
        "top:-100px",
        "left:16px",
        "z-index:9999999",
        "background:#000",
        "color:#fff",
        "padding:8px 16px",
        "border-radius:0 0 8px 8px",
        "font-weight:bold",
        "font-size:14px",
        "font-family:system-ui,sans-serif",
        "text-decoration:none",
        "transition:top 0.15s",
        "border:2px solid #fff",
      ].join(";");
      skip.addEventListener("focus", () => {
        skip.style.top = "0";
      });
      skip.addEventListener("blur", () => {
        skip.style.top = "-100px";
      });
      document.body.insertBefore(skip, document.body.firstChild);
    },
    disable: () => {
      document.getElementById("inculva-skip-nav")?.remove();
    },
  },

  // Reading Mask — dims the entire page except a clear "window" around the cursor.
  // Unlike readingGuide (a thin pointer line), this is a full-page focus overlay
  // that eliminates distractions by darkening everything outside the reading window.
  readingMask: {
    enable: () => {
      if (document.getElementById("inculva-reading-mask")) return;
      const mask = document.createElement("div");
      mask.id = "inculva-reading-mask";
      // The div itself is transparent (the "window"). box-shadow creates the dark overlay
      // that fills the rest of the viewport — a CSS-only approach with no extra elements.
      mask.style.cssText = [
        "position:fixed",
        "left:0",
        "right:0",
        "height:80px",
        "background:transparent",
        "border-top:3px solid var(--inculva-primary,#0066cc)",
        "border-bottom:3px solid var(--inculva-primary,#0066cc)",
        "box-shadow:0 0 0 9999px rgba(0,0,0,0.65)",
        "pointer-events:none",
        "z-index:2147483640",
        "top:0",
      ].join(";");
      document.documentElement.appendChild(mask);
      const move = (e: MouseEvent) => {
        mask.style.top = `${e.clientY - 40}px`;
      };
      document.addEventListener("mousemove", move);
      (
        mask as HTMLElement & { _moveHandler?: (e: MouseEvent) => void }
      )._moveHandler = move;
    },
    disable: () => {
      const mask = document.getElementById("inculva-reading-mask") as
        | (HTMLElement & { _moveHandler?: (e: MouseEvent) => void })
        | null;
      if (mask?._moveHandler)
        document.removeEventListener("mousemove", mask._moveHandler);
      mask?.remove();
    },
  },

  // Text Alignment — 3 levels: left / center / right
  textAlign: {
    enable: (level = 1) => {
      const aligns = ["left", "center", "right"] as const;
      const align = aligns[level - 1] ?? "left";
      replaceStyle(
        "inculva-text-align",
        `p, li, td, th, label, h1, h2, h3, h4, h5, h6 { text-align: ${align} !important; }`,
      );
    },
    disable: () => removeStyle("inculva-text-align"),
  },

  // Saturation — boosts colour saturation — 4 levels
  saturation: {
    enable: (level = 1) => {
      const vals = [1.4, 1.8, 2.4, 3.0];
      setHtmlFilter("saturation", `saturate(${vals[level - 1] ?? 1.4})`);
    },
    disable: () => removeHtmlFilter("saturation"),
  },

  // WCAG 1.4.2 A — Audio Control (mute autoplaying media)
  muteMedia: {
    enable: () => {
      for (const el of document.querySelectorAll<HTMLMediaElement>(
        "audio, video",
      )) {
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
      (
        window as Window & { __inculvaMuteObserver?: MutationObserver }
      ).__inculvaMuteObserver = observer;
    },
    disable: () => {
      removeStyle("inculva-mute-media-state");
      for (const el of document.querySelectorAll<HTMLMediaElement>(
        "audio, video",
      )) {
        el.muted = false;
      }
      (
        window as Window & { __inculvaMuteObserver?: MutationObserver }
      ).__inculvaMuteObserver?.disconnect();
      delete (window as Window & { __inculvaMuteObserver?: MutationObserver })
        .__inculvaMuteObserver;
    },
  },

  // ── Fully implemented Phase 2 features ─────────────────────────────────────

  // Blue Light Filter — warm sepia tint reduces blue channel fatigue
  blueLightFilter: {
    enable: () =>
      setHtmlFilter("blueLight", "sepia(0.25) saturate(0.85) brightness(0.95)"),
    disable: () => removeHtmlFilter("blueLight"),
  },

  // Hide Images — makes images invisible while preserving page layout
  hideImages: {
    enable: () =>
      injectStyle(
        "inculva-hide-images",
        `img, picture, [role="img"]:not(svg):not(#inculva-widget-btn svg) {
         visibility: hidden !important;
       }
       #inculva-widget-btn img, #inculva-widget-panel img { visibility: visible !important; }`,
      ),
    disable: () => removeStyle("inculva-hide-images"),
  },

  // Dark Mode — CSS invert + hue-rotate trick; media elements are counter-inverted
  // so photos/videos keep their original colours on the dark background.
  darkMode: {
    enable: () => {
      setHtmlFilter("darkMode", "invert(1) hue-rotate(180deg)");
      injectStyle(
        "inculva-dark-mode-media",
        `img, video, iframe, canvas { filter: invert(1) hue-rotate(180deg) !important; }`,
      );
    },
    disable: () => {
      removeHtmlFilter("darkMode");
      removeStyle("inculva-dark-mode-media");
    },
  },

  // Content Magnifier — circular lens that scales hovered elements — 4 levels
  contentMagnifier: {
    enable: (level = 1) => {
      const scales = [1.15, 1.25, 1.35, 1.5];
      _magnifierScale = scales[level - 1] ?? 1.15;

      // If lens already exists, only the scale variable needs updating —
      // the mousemove closure reads _magnifierScale on every event.
      if (document.getElementById("inculva-magnifier")) return;

      injectStyle(
        "inculva-magnifier-cursor",
        `:not([id^="inculva"]):not([class*="inculva"]) { cursor: zoom-in !important; }`,
      );

      const lens = document.createElement("div");
      lens.id = "inculva-magnifier";
      lens.style.cssText = [
        "position:fixed",
        "width:200px",
        "height:200px",
        "border-radius:50%",
        "border:3px solid rgba(0,102,204,0.85)",
        "box-shadow:0 0 0 3px rgba(255,255,255,0.85),0 8px 28px rgba(0,0,0,0.3)",
        "pointer-events:none",
        "z-index:2147483643",
        "top:-9999px",
        "left:-9999px",
        "background:rgba(200,220,255,0.06)",
      ].join(";");
      document.documentElement.appendChild(lens);

      let prevEl: HTMLElement | null = null;

      const move = (e: MouseEvent) => {
        lens.style.left = `${e.clientX - 100}px`;
        lens.style.top = `${e.clientY - 100}px`;

        const target = document.elementFromPoint(
          e.clientX,
          e.clientY,
        ) as HTMLElement | null;
        if (
          !target ||
          target === lens ||
          target.closest?.("#inculva-widget-panel,#inculva-widget-btn")
        )
          return;

        if (prevEl && prevEl !== target) {
          prevEl.style.removeProperty("transform");
          prevEl.style.removeProperty("z-index");
          prevEl.style.removeProperty("transition");
          prevEl.style.removeProperty("position");
        }
        if (target !== prevEl) {
          // Read _magnifierScale dynamically so level changes take effect immediately
          target.style.setProperty(
            "transform",
            `scale(${_magnifierScale})`,
            "important",
          );
          target.style.setProperty("z-index", "99998", "important");
          target.style.setProperty(
            "transition",
            "transform 0.12s ease",
            "important",
          );
          target.style.setProperty("position", "relative", "important");
          prevEl = target;
        }
      };

      document.addEventListener("mousemove", move);
      (lens as HTMLElement & { _moveHandler?: typeof move })._moveHandler =
        move;
    },
    disable: () => {
      removeStyle("inculva-magnifier-cursor");
      const lens = document.getElementById("inculva-magnifier") as
        | (HTMLElement & { _moveHandler?: (e: MouseEvent) => void })
        | null;
      if (lens?._moveHandler)
        document.removeEventListener("mousemove", lens._moveHandler);
      lens?.remove();
      for (const el of document.querySelectorAll<HTMLElement>("[style]")) {
        if (el.style.transform?.startsWith("scale(")) {
          el.style.removeProperty("transform");
          el.style.removeProperty("z-index");
          el.style.removeProperty("transition");
          el.style.removeProperty("position");
        }
      }
    },
  },

  // Line Height — WCAG 1.4.12 — 4 increasing levels
  lineHeight: {
    enable: (level = 1) => {
      const vals = [1.6, 1.9, 2.2, 2.6];
      replaceStyle(
        "inculva-line-height",
        `body * { line-height: ${vals[level - 1] ?? 1.6} !important; }`,
      );
    },
    disable: () => removeStyle("inculva-line-height"),
  },

  // Highlight Titles — outlines all headings to help users identify page structure
  highlightTitles: {
    enable: () =>
      injectStyle(
        "inculva-highlight-titles",
        `h1, h2, h3, h4, h5, h6 {
         outline: 2px solid currentColor !important;
         outline-offset: 3px !important;
         padding: 2px 6px !important;
       }`,
      ),
    disable: () => removeStyle("inculva-highlight-titles"),
  },

  // Slow Cursor — smooths cursor movement via lerp for users with motor tremors.
  // Creates a virtual cursor element that follows the real mouse with exponential
  // moving average (EMA): vX += alpha * (realX - vX) per animation frame.
  // Lower alpha = more smoothing = slower apparent cursor motion.
  // Level 1=slight(α=0.25) Level 2=medium(α=0.15) Level 3=heavy(α=0.08)
  slowCursor: {
    enable: (level = 1) => {
      const alphas = [0.25, 0.15, 0.08];
      const alpha = alphas[(level - 1)] ?? 0.25;

      // Update alpha dynamically — frame loop reads it on every tick,
      // so changing levels takes effect immediately without recreating everything.
      (window as Window & { __inculvaSlowAlpha?: number }).__inculvaSlowAlpha = alpha;

      // If virtual cursor already exists just updating alpha is sufficient.
      if (document.getElementById("inculva-slow-cursor")) return;

      // Hide the OS cursor on all page elements (but keep it on widget itself).
      injectStyle(
        "inculva-slow-cursor-hide",
        `body *:not([id^="inculva"]):not([class*="inculva"]) { cursor: none !important; }`
      );

      // Virtual cursor element — classic white-fill / black-stroke arrow.
      const sz = 36;
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24">` +
        `<path d="M5 2 L5 20 L9 16 L12 22.5 L15 21 L12 14.5 L18.5 14.5 Z" ` +
        `fill="white" stroke="black" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke fill"/>` +
        `</svg>`;

      const cursor = document.createElement("div");
      cursor.id = "inculva-slow-cursor";
      cursor.style.cssText = [
        "position:fixed",
        "pointer-events:none",
        "z-index:2147483647",
        "top:0",
        "left:0",
        `width:${sz}px`,
        `height:${sz}px`,
        "will-change:left,top",
        "transition:none",
      ].join(";");
      cursor.innerHTML = svg;
      document.documentElement.appendChild(cursor);

      // Separate real pointer position (updated instantly) from virtual/rendered position.
      let realX = window.innerWidth / 2;
      let realY = window.innerHeight / 2;
      let vX = realX;
      let vY = realY;

      const onMove = (e: MouseEvent) => {
        realX = e.clientX;
        realY = e.clientY;
      };
      document.addEventListener("mousemove", onMove);

      let rafId = 0;
      const el = document.getElementById("inculva-slow-cursor");

      function frame() {
        const a = (window as Window & { __inculvaSlowAlpha?: number }).__inculvaSlowAlpha ?? 0.25;
        // Hotspot offset: top-left of SVG arrow is at ~(6px, 3px) within the 36px viewbox.
        const hx = 6 * (sz / 24);
        const hy = 3 * (sz / 24);
        vX += (realX - vX) * a;
        vY += (realY - vY) * a;
        if (el) {
          el.style.left = `${vX - hx}px`;
          el.style.top = `${vY - hy}px`;
        }
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);

      (window as Window & { __inculvaSlowCursorCleanup?: () => void }).__inculvaSlowCursorCleanup = () => {
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(rafId);
      };
    },
    disable: () => {
      removeStyle("inculva-slow-cursor-hide");
      (window as Window & { __inculvaSlowCursorCleanup?: () => void }).__inculvaSlowCursorCleanup?.();
      delete (window as Window & { __inculvaSlowCursorCleanup?: () => void }).__inculvaSlowCursorCleanup;
      delete (window as Window & { __inculvaSlowAlpha?: number }).__inculvaSlowAlpha;
      document.getElementById("inculva-slow-cursor")?.remove();
    },
  },

  // ── Hidden stubs (not shown in grid, reserved for future phases) ─────────────
  toolTips: { enable: () => {}, disable: () => {} },
  sustainabilityMode: { enable: () => {}, disable: () => {} },
  dictionary: { enable: () => {}, disable: () => {} },
};
