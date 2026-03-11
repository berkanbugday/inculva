"use client";

/* ─────────────────────────────────────────────────────────
   Inline SVG icon primitives  (Lucide-compatible, 24 × 24)
   ───────────────────────────────────────────────────────── */
type IconProps = { size?: number; color?: string; strokeWidth?: number };

const ic = (path: string) =>
  function SvgIcon({ size = 20, color = "currentColor", strokeWidth = 2 }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    );
  };

// ── Accessibility / widget feature icons ──────────────────
const IconSun            = ic("M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z");
const IconMoon           = ic("M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z");
const IconWarmFilter     = ic("M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M1 12h1M22 12h1M4.22 19.78l.71-.71M19.07 4.93l.71-.71M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z");
const IconTextLarge      = ic("M4 7V4h16v3M9 20h6M12 4v16");
const IconAlignLeft      = ic("M3 6h18M3 12h12M3 18h15");
const IconLineHeight     = ic("M3 6h18M3 18h18M8 12h8M12 9v6");
const IconTextSpacing    = ic("M4 6h16M4 12h16M4 18h16M9 3l3-3 3 3M9 21l3 3 3-3");
const IconScreenReader   = ic("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z");
const IconDyslexia       = ic("M4 20V4h4l4 4 4-4h4v16M8 12h8");
const IconReadingMask    = ic("M2 3h20v5H2zM2 16h20v5H2z");
const IconReadingGuide   = ic("M3 12h18M3 8h18M3 16h18");
const IconMagnifier      = ic("M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM21 21l-4.35-4.35");
const IconHighlightLinks = ic("M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.7");
const IconHighlightH     = ic("M4 6h16M4 12h8M4 18h16M13 9l4 9M17 9l-4 9");
const IconHideImages     = ic("M3 3l18 18M10.94 6.08A6 6 0 0 1 12 6c3.18 0 6 2.5 7.68 6a15.23 15.23 0 0 1-1.67 2.34M6.61 6.61A13.526 13.526 0 0 0 4.32 12c1.68 3.5 4.5 6 7.68 6a13.45 13.45 0 0 0 5.39-1.61");
const IconPauseAnim      = ic("M10 9v6M14 9v6M12 1a11 11 0 1 0 0 22A11 11 0 0 0 12 1z");
const IconCursor         = ic("M4 4l7.07 17 2.51-7.39L21 11.07z");
const IconColorBlind     = ic("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M3 3l18 18");
const IconGrayscale      = ic("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4a8 8 0 0 1 0 16z");
const IconSaturation     = ic("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v12M8 9l8 6M8 15l8-6");
const IconFocusRing      = ic("M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z M12 8v4l3 3");
const IconLargeTargets   = ic("M3 9l4-4 4 4M7 5v14M15 9l4-4 4 4M19 5v14M3 15l4 4 4-4M15 15l4 4 4-4");
const IconSlowCursor     = ic("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2");
const IconSkipLink       = ic("M9 18l6-6-6-6");
const IconMuteMedia      = ic("M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6");
const IconKeyboard       = ic("M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM8 10h2M8 14h8M14 10h2");
// ── Icon button icons ─────────────────────────────────────
const IconHome           = ic("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10");
const IconSearch         = ic("M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM21 21l-4.35-4.35");
const IconSettings       = ic("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z");
const IconBell           = ic("M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0");
const IconMail           = ic("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6");
const IconHeart          = ic("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
const IconStar           = ic("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z");
const IconTrash          = ic("M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6");
// ── General UI icons ──────────────────────────────────────
const IconAccessibility  = ic("M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M12 8c-4 0-7 2-7 4l2 8h10l2-8c0-2-3-4-7-4z M9 12l-1 6M15 12l1 6");

export default function WidgetTestPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ── Test page base ────────────────────────────── */
            *, *::before, *::after { box-sizing: border-box; }
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #f9fafb; color: #111827; }
            .wt-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }

            /* ── Nav ───────────────────────────────────────── */
            .wt-nav { background: #1a1a2e; color: #fff; padding: 14px 24px; display: flex; align-items: center; gap: 16px; }
            .wt-nav-logo { font-size: 18px; font-weight: 800; letter-spacing: -0.03em; color: #fff; text-decoration: none; }
            .wt-nav-badge { background: #0066cc; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
            .wt-nav-links { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
            .wt-nav-link { color: rgba(255,255,255,0.7); font-size: 13px; text-decoration: none; padding: 4px 10px; border-radius: 6px; transition: all 0.15s; }
            .wt-nav-link:hover { color: #fff; background: rgba(255,255,255,0.1); }

            /* ── Sections ──────────────────────────────────── */
            .wt-section { padding: 48px 0; border-bottom: 1px solid #e5e7eb; }
            .wt-section:last-child { border-bottom: none; }
            .wt-section-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin: 0 0 6px; letter-spacing: -0.02em; display: flex; align-items: center; gap: 10px; }
            .wt-section-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px; background: #f0f0f5; color: #6b7280; }
            .wt-section-desc { font-size: 14px; color: #6b7280; margin: 0 0 28px; }
            .wt-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; margin-bottom: 16px; }

            /* ── Hero ──────────────────────────────────────── */
            .wt-hero { background: linear-gradient(135deg, #0066cc 0%, #7c3aed 50%, #db2777 100%); color: #fff; padding: 72px 24px; text-align: center; }
            .wt-hero h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 900; margin: 0 0 16px; letter-spacing: -0.04em; line-height: 1.1; }
            .wt-hero p { font-size: 18px; opacity: 0.88; margin: 0 0 28px; max-width: 560px; margin-left: auto; margin-right: auto; }
            .wt-hero-cta { display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
            .wt-btn-primary { background: #fff; color: #0066cc; padding: 12px 28px; border-radius: 100px; font-size: 15px; font-weight: 700; text-decoration: none; display: inline-block; transition: transform 0.15s, box-shadow 0.15s; }
            .wt-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
            .wt-btn-outline { background: transparent; color: #fff; padding: 12px 28px; border-radius: 100px; font-size: 15px; font-weight: 700; text-decoration: none; display: inline-block; border: 2px solid rgba(255,255,255,0.6); }

            /* ── Typography ────────────────────────────────── */
            .wt-prose h1 { font-size: 36px; font-weight: 900; margin: 0 0 12px; letter-spacing: -0.03em; color: #111827; }
            .wt-prose h2 { font-size: 28px; font-weight: 800; margin: 24px 0 10px; color: #1f2937; }
            .wt-prose h3 { font-size: 22px; font-weight: 700; margin: 20px 0 8px; color: #374151; }
            .wt-prose h4 { font-size: 18px; font-weight: 700; margin: 16px 0 6px; color: #4b5563; }
            .wt-prose h5 { font-size: 15px; font-weight: 700; margin: 12px 0 4px; color: #6b7280; }
            .wt-prose h6 { font-size: 13px; font-weight: 700; margin: 10px 0 4px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; }
            .wt-prose p { font-size: 16px; line-height: 1.75; color: #374151; margin: 0 0 16px; }
            .wt-prose blockquote { border-left: 4px solid #0066cc; margin: 20px 0; padding: 12px 20px; background: #f0f7ff; border-radius: 0 8px 8px 0; font-style: italic; color: #1e40af; }
            .wt-prose code { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 2px 7px; border-radius: 5px; font-size: 13.5px; font-family: 'SF Mono', 'Cascadia Code', monospace; color: #dc2626; }
            .wt-prose pre { background: #1e1e2e; color: #cdd6f4; padding: 20px; border-radius: 12px; overflow-x: auto; font-size: 13.5px; margin: 16px 0; line-height: 1.6; }
            .wt-prose a { color: #0066cc; text-decoration: underline; }
            .wt-prose a:hover { color: #0044aa; }
            .wt-prose ul, .wt-prose ol { padding-left: 24px; margin: 0 0 16px; }
            .wt-prose li { font-size: 16px; line-height: 1.75; color: #374151; margin-bottom: 4px; }
            .wt-prose strong { font-weight: 700; color: #111827; }
            .wt-prose em { font-style: italic; }
            .wt-prose mark { background: #fef08a; padding: 1px 3px; border-radius: 3px; }

            /* ── Images ────────────────────────────────────── */
            .wt-img-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
            .wt-img-item { border-radius: 12px; overflow: hidden; aspect-ratio: 4/3; position: relative; }
            .wt-img-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .wt-img-item.missing-alt img { border: 3px dashed #ef4444; }
            .wt-img-caption { font-size: 12px; color: #6b7280; margin-top: 6px; text-align: center; }

            /* ── Video ─────────────────────────────────────── */
            .wt-video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
            .wt-video-wrap { border-radius: 12px; overflow: hidden; background: #111; position: relative; }
            .wt-video-wrap video { width: 100%; display: block; max-height: 220px; background: #000; }
            .wt-video-label { background: rgba(0,0,0,0.85); color: #fff; font-size: 12px; padding: 6px 12px; }

            /* ── Animations ────────────────────────────────── */
            @keyframes wt-spin { to { transform: rotate(360deg); } }
            @keyframes wt-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-28px); } }
            @keyframes wt-pulse { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:0.5; transform: scale(0.88); } }
            @keyframes wt-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-10px); } 40% { transform: translateX(10px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
            @keyframes wt-colorshift { 0% { background: #ef4444; } 25% { background: #f59e0b; } 50% { background: #22c55e; } 75% { background: #3b82f6; } 100% { background: #ef4444; } }
            @keyframes wt-float { 0%,100% { transform: translateY(0) rotate(0deg); } 33% { transform: translateY(-20px) rotate(6deg); } 66% { transform: translateY(-10px) rotate(-4deg); } }
            @keyframes wt-orbit { to { transform: rotate(360deg) translateX(50px) rotate(-360deg); } }
            @keyframes wt-wave { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(2); } }
            .wt-anim-grid { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-end; }
            .wt-anim-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
            .wt-anim-label { font-size: 12px; color: #6b7280; font-weight: 500; text-align: center; }
            .wt-spin { width: 64px; height: 64px; border-radius: 14px; background: linear-gradient(135deg, #0066cc, #7c3aed); animation: wt-spin 1.4s linear infinite; }
            .wt-bounce { width: 56px; height: 56px; border-radius: 50%; background: #f59e0b; animation: wt-bounce 1s ease-in-out infinite; }
            .wt-pulse { width: 72px; height: 72px; border-radius: 50%; background: #22c55e; animation: wt-pulse 1.2s ease-in-out infinite; }
            .wt-shake { width: 60px; height: 60px; border-radius: 12px; background: #ef4444; animation: wt-shake 0.8s ease-in-out infinite; }
            .wt-colorshift { width: 64px; height: 64px; border-radius: 50%; animation: wt-colorshift 2s linear infinite; }
            .wt-float { width: 64px; height: 64px; border-radius: 16px; background: #db2777; animation: wt-float 3s ease-in-out infinite; }
            .wt-orbit-wrap { width: 80px; height: 80px; position: relative; display: flex; align-items: center; justify-content: center; }
            .wt-orbit-center { width: 20px; height: 20px; border-radius: 50%; background: #0066cc; }
            .wt-orbit-dot { width: 12px; height: 12px; border-radius: 50%; background: #7c3aed; position: absolute; top: 50%; left: 50%; margin: -6px; animation: wt-orbit 2s linear infinite; }
            .wt-wave-wrap { display: flex; align-items: flex-end; gap: 4px; height: 48px; }
            .wt-wave-bar { width: 8px; border-radius: 4px 4px 0 0; }
            .wt-wave-bar:nth-child(1) { height: 24px; background: #0066cc; animation: wt-wave 1s ease-in-out infinite; }
            .wt-wave-bar:nth-child(2) { height: 36px; background: #3b82f6; animation: wt-wave 1s ease-in-out 0.1s infinite; }
            .wt-wave-bar:nth-child(3) { height: 48px; background: #7c3aed; animation: wt-wave 1s ease-in-out 0.2s infinite; }
            .wt-wave-bar:nth-child(4) { height: 36px; background: #3b82f6; animation: wt-wave 1s ease-in-out 0.3s infinite; }
            .wt-wave-bar:nth-child(5) { height: 24px; background: #0066cc; animation: wt-wave 1s ease-in-out 0.4s infinite; }

            /* ── Colors ────────────────────────────────────── */
            .wt-color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 10px; }
            .wt-color-swatch { border-radius: 10px; aspect-ratio: 1; display: flex; align-items: flex-end; padding: 8px; font-size: 11px; font-weight: 600; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
            .wt-gradient-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-top: 16px; }
            .wt-gradient-card { height: 90px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }

            /* ── Forms ─────────────────────────────────────── */
            .wt-form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
            .wt-field { display: flex; flex-direction: column; gap: 6px; }
            .wt-field label { font-size: 13px; font-weight: 600; color: #374151; }
            .wt-field input, .wt-field select, .wt-field textarea { padding: 10px 14px; border: 1.5px solid #d1d5db; border-radius: 9px; font-size: 14px; font-family: inherit; color: #111827; background: #fff; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
            .wt-field input:focus, .wt-field select:focus, .wt-field textarea:focus { border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0,102,204,0.14); }
            .wt-field textarea { resize: vertical; min-height: 90px; }
            .wt-radio-group, .wt-checkbox-group { display: flex; flex-direction: column; gap: 8px; }
            .wt-radio-label, .wt-checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151; cursor: pointer; }
            .wt-range { width: 100%; accent-color: #0066cc; }

            /* ── Buttons ───────────────────────────────────── */
            .wt-btn-grid { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
            .wt-button { border: none; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: 600; transition: opacity 0.15s, transform 0.1s; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; }
            .wt-button:hover { opacity: 0.85; }
            .wt-button:active { transform: scale(0.97); }
            .wt-button-xs { padding: 6px 12px; font-size: 12px; }
            .wt-button-sm { padding: 8px 16px; font-size: 13px; }
            .wt-button-md { padding: 11px 22px; font-size: 15px; }
            .wt-button-lg { padding: 14px 28px; font-size: 17px; border-radius: 10px; }
            .wt-button-xl { padding: 18px 36px; font-size: 19px; border-radius: 12px; }
            .wt-button-blue { background: #0066cc; color: #fff; }
            .wt-button-green { background: #16a34a; color: #fff; }
            .wt-button-red { background: #dc2626; color: #fff; }
            .wt-button-purple { background: #7c3aed; color: #fff; }
            .wt-button-outline-blue { background: transparent; color: #0066cc; border: 2px solid #0066cc; }
            .wt-button-outline-dark { background: transparent; color: #1a1a2e; border: 2px solid #1a1a2e; }

            /* ── Table ─────────────────────────────────────── */
            .wt-table-wrap { overflow-x: auto; }
            .wt-table { width: 100%; border-collapse: collapse; font-size: 14px; }
            .wt-table th { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 10px 14px; text-align: left; font-weight: 700; color: #374151; white-space: nowrap; }
            .wt-table td { border: 1px solid #e5e7eb; padding: 10px 14px; color: #374151; }
            .wt-table tr:nth-child(even) td { background: #f9fafb; }
            .wt-table-badge { display: inline-flex; padding: 3px 8px; border-radius: 100px; font-size: 11px; font-weight: 700; }
            .wt-badge-green { background: #dcfce7; color: #16a34a; }
            .wt-badge-yellow { background: #fef9c3; color: #a16207; }
            .wt-badge-red { background: #fee2e2; color: #dc2626; }

            /* ── Progress ──────────────────────────────────── */
            .wt-progress-list { display: flex; flex-direction: column; gap: 14px; }
            .wt-progress-item { display: flex; flex-direction: column; gap: 6px; }
            .wt-progress-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #374151; }
            .wt-progress-track { height: 10px; background: #e5e7eb; border-radius: 100px; overflow: hidden; }
            .wt-progress-bar { height: 100%; border-radius: 100px; transition: width 1s ease; }

            /* ── Feature guide ──────────────────────────────── */
            .wt-guide-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
            .wt-guide-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
            .wt-guide-icon { width: 36px; height: 36px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; background: #f0f4ff; border-radius: 8px; color: #0066cc; flex-shrink: 0; }
            .wt-guide-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 4px; }
            .wt-guide-desc { font-size: 12.5px; color: #6b7280; line-height: 1.5; }

            /* ── Audio ─────────────────────────────────────── */
            .wt-audio-wrap audio { width: 100%; border-radius: 10px; }

            /* ── Focus test ─────────────────────────────────── */
            .wt-focus-items { display: flex; flex-wrap: wrap; gap: 10px; }
            .wt-focus-item { padding: 10px 18px; background: #fff; border: 1.5px solid #d1d5db; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #374151; text-decoration: none; transition: border-color 0.15s; }
            .wt-focus-item:hover { border-color: #0066cc; color: #0066cc; }
            .wt-focus-item:focus { outline: 3px solid #0066cc; outline-offset: 2px; }

            /* ── Print/info ─────────────────────────────────── */
            .wt-info-box { background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 12px; padding: 16px 20px; display: flex; gap: 12px; align-items: flex-start; }
            .wt-info-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
            .wt-info-text { font-size: 14px; color: #1e40af; line-height: 1.6; }
            .wt-info-text strong { font-weight: 700; }
          `,
        }}
      />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="wt-nav">
        <a href="/" className="wt-nav-logo">
          Inculva
        </a>
        <span className="wt-nav-badge">Widget Test Page</span>
        <div className="wt-nav-links">
          <a href="#typography" className="wt-nav-link">
            Typography
          </a>
          <a href="#images" className="wt-nav-link">
            Images
          </a>
          <a href="#media" className="wt-nav-link">
            Media
          </a>
          <a href="#animations" className="wt-nav-link">
            Animations
          </a>
          <a href="#colors" className="wt-nav-link">
            Colors
          </a>
          <a href="#forms" className="wt-nav-link">
            Forms
          </a>
          <a href="#interactive" className="wt-nav-link">
            Interactive
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="wt-hero">
        <div>
          <h1>Widget Feature Test</h1>
          <p>
            This page contains rich content for QA testing every Inculva
            accessibility feature. Open the widget and try each control.
          </p>
          <div className="wt-hero-cta">
            <a href="#typography" className="wt-btn-primary">
              Explore Content
            </a>
            <a href="/" className="wt-btn-outline">
              Back to Home
            </a>
          </div>
        </div>
      </section>

      <main id="main" className="wt-container">
        {/* ── Info box ───────────────────────────────────────────────── */}
        <div style={{ marginTop: 32 }}>
          <div className="wt-info-box">
            <span className="wt-info-icon" style={{ color: "#1e40af" }}><IconAccessibility size={22} /></span>
            <p className="wt-info-text">
              <strong>Testing guide:</strong> Open the accessibility widget
              (bottom-right button), then try each feature category. This page
              has typography, images, videos, CSS animations, color swatches,
              forms and interactive elements specifically designed to test every
              widget feature.
            </p>
          </div>
        </div>

        {/* ── Feature Guide ──────────────────────────────────────────── */}
        <section className="wt-section">
          <h2 className="wt-section-title">
            Feature Overview
            <span className="wt-section-badge">26 features</span>
          </h2>
          <p className="wt-section-desc">
            Quick reference: what each feature does and where to observe its
            effect.
          </p>
          <div className="wt-guide-grid">
            {([
              { Icon: IconSun,           title: "High Contrast",    desc: "Boosts contrast across all elements. Observe headings and body text change." },
              { Icon: IconMoon,          title: "Dark Mode",         desc: "Inverts page colours. Images get counter-inverted. Check the image section." },
              { Icon: IconWarmFilter,    title: "Blue Light Filter", desc: "Applies warm overlay. Observe colour shift on white backgrounds." },
              { Icon: IconTextLarge,     title: "Larger Text",       desc: "Increases font size up to 4 levels. Watch paragraphs and headings grow." },
              { Icon: IconAlignLeft,     title: "Text Alignment",    desc: "Cycles Left → Centre → Right. Observe all paragraph text reflow." },
              { Icon: IconLineHeight,    title: "Line Height",       desc: "Increases line spacing. Long paragraphs become more readable." },
              { Icon: IconTextSpacing,   title: "Text Spacing",      desc: "Increases letter and word spacing. Check the dense paragraph text." },
              { Icon: IconScreenReader,  title: "Screen Reader",     desc: "Outlines images with missing alt text. Observe dashed red borders on images below." },
              { Icon: IconDyslexia,      title: "Dyslexia Font",     desc: "Switches to OpenDyslexic. All paragraph and heading text changes font." },
              { Icon: IconReadingMask,   title: "Reading Mask",      desc: "Dims page above/below a horizontal window. Move your mouse." },
              { Icon: IconReadingGuide,  title: "Reading Guide",     desc: "Highlights current line with an amber bar following your cursor." },
              { Icon: IconMagnifier,     title: "Magnifier",         desc: "Circular zoom lens follows your cursor. Move over text and images." },
              { Icon: IconHighlightLinks,title: "Highlight Links",   desc: "Underlines all links with bold colour. Check paragraph links below." },
              { Icon: IconHighlightH,    title: "Highlight Titles",  desc: "Underlines headings. Check the typography section." },
              { Icon: IconHideImages,    title: "Hide Images",       desc: "Replaces images with blank boxes. Check the image grid." },
              { Icon: IconPauseAnim,     title: "Stop Animations",   desc: "Pauses all CSS animations. Check the animations section." },
              { Icon: IconCursor,        title: "Cursor",            desc: "Enlarges the cursor. Move your mouse around the page." },
              { Icon: IconColorBlind,    title: "Color Blind",       desc: "Applies colour-blindness simulation. Check the colour swatches." },
              { Icon: IconGrayscale,     title: "Grayscale",         desc: "Removes all colour. Observe the gradient hero and swatches." },
              { Icon: IconSaturation,    title: "Saturation",        desc: "Boosts colour saturation. Swatches and gradients become vivid." },
              { Icon: IconFocusRing,     title: "Focus Indicator",   desc: "Shows visible focus ring. Tab through form elements." },
              { Icon: IconLargeTargets,  title: "Large Targets",     desc: "Enlarges click areas. Observe button spacing change." },
              { Icon: IconSlowCursor,    title: "Slow Cursor",       desc: "Smoothly lags cursor movement. Move mouse quickly." },
              { Icon: IconSkipLink,      title: "Skip to Main",      desc: "Injects a skip link. Press Tab to reveal it." },
              { Icon: IconMuteMedia,     title: "Mute Media",        desc: "Mutes all audio/video. Open the media section and check." },
              { Icon: IconKeyboard,      title: "Keyboard Nav",      desc: "Enables custom keyboard navigation hints." },
            ] as const).map(({ Icon, title, desc }) => (
              <div key={title} className="wt-guide-card">
                <div className="wt-guide-icon"><Icon size={18} /></div>
                <div className="wt-guide-title">{title}</div>
                <div className="wt-guide-desc">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Typography ─────────────────────────────────────────────── */}
        <section id="typography" className="wt-section">
          <h2 className="wt-section-title">
            Typography
            <span className="wt-section-badge">Text features</span>
          </h2>
          <p className="wt-section-desc">
            Test text resizing, alignment, line height, text spacing, dyslexia
            font, and link highlighting.
          </p>
          <div className="wt-card wt-prose">
            <h1>H1 — Main Page Heading</h1>
            <h2>H2 — Section Level Heading</h2>
            <h3>H3 — Sub-section Heading</h3>
            <h4>H4 — Component Heading</h4>
            <h5>H5 — Minor Heading</h5>
            <h6>H6 — Caption Level</h6>

            <h3>Long-form paragraph (test text spacing &amp; line height)</h3>
            <p>
              The Web Content Accessibility Guidelines (WCAG) are part of a
              series of web accessibility guidelines published by the Web
              Accessibility Initiative (WAI) of the World Wide Web Consortium
              (W3C), the main international standards organisation for the
              internet. They consist of a set of recommendations for making web
              content more accessible, primarily to people with disabilities—but
              also to all user agents, including highly limited devices, such as
              mobile phones.
            </p>
            <p>
              Accessibility is not just about people with disabilities — it
              benefits everyone. Good accessibility practices improve usability,
              SEO rankings, legal compliance, and the overall user experience.
              When you build accessible websites, you are also building{" "}
              <a href="#typography">better websites for everyone</a>, including
              elderly users, users on slow connections, and users in noisy or
              bright environments.
            </p>

            <blockquote>
              "The power of the Web is in its universality. Access by everyone
              regardless of disability is an essential aspect." — Tim
              Berners-Lee, W3C Director and inventor of the World Wide Web.
            </blockquote>

            <h3>Code and preformatted text</h3>
            <p>
              Use <code>aria-label</code> to provide accessible names for
              elements that lack visible text. The <code>role="button"</code>{" "}
              attribute tells assistive technology this element is interactive.
            </p>
            <pre>{`// Accessible button example
<button
  type="button"
  aria-label="Close navigation menu"
  aria-expanded="false"
>
  <svg aria-hidden="true">...</svg>
</button>`}</pre>

            <h3>Lists</h3>
            <ul>
              <li>
                Screen readers announce list items with position context (e.g.,
                "item 1 of 5")
              </li>
              <li>
                Semantic list markup improves navigation for keyboard and AT
                users
              </li>
              <li>
                <strong>Bold text</strong> draws attention to key information
              </li>
              <li>
                <em>Italic text</em> is used for emphasis and foreign words
              </li>
              <li>
                <mark>Highlighted text</mark> can mark search results or
                important terms
              </li>
            </ul>
            <ol>
              <li>
                Perceivable — information must be presentable to users in ways
                they can perceive
              </li>
              <li>
                Operable — interface components and navigation must be operable
              </li>
              <li>
                Understandable — information and operation must be
                understandable
              </li>
              <li>
                Robust — content must be interpretable by a wide variety of
                assistive technologies
              </li>
            </ol>

            <h3>More links (test link highlighting)</h3>
            <p>
              Visit the{" "}
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WCAG guidelines
              </a>{" "}
              for the full specification. The{" "}
              <a
                href="https://www.w3.org/TR/WCAG22/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WCAG 2.2 document
              </a>{" "}
              was published in October 2023 and adds 9 new success criteria to
              the existing standard. You can also read about the{" "}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WCAG 2.1 additions
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Images ─────────────────────────────────────────────────── */}
        <section id="images" className="wt-section">
          <h2 className="wt-section-title">
            Images
            <span className="wt-section-badge">
              Hide Images · Screen Reader
            </span>
          </h2>
          <p className="wt-section-desc">
            Enable <strong>Hide Images</strong> to replace all images with
            placeholders. Enable <strong>Screen Reader</strong> to see dashed
            red borders on images missing alt text.
          </p>
          <div className="wt-img-grid">
            <div className="wt-img-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%230066cc'/%3E%3Ctext x='160' y='100' text-anchor='middle' font-size='18' fill='white' font-family='system-ui'%3EScenery%3C/text%3E%3Ctext x='160' y='130' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3EMountain landscape%3C/text%3E%3Ccircle cx='80' cy='180' r='30' fill='%23004499'/%3E%3Ccircle cx='160' cy='160' r='40' fill='%23003388'/%3E%3Ccircle cx='240' cy='175' r='25' fill='%23004499'/%3E%3C/svg%3E"
                alt="Mountain landscape — blue scenic view"
              />
              <p className="wt-img-caption">With alt text ✓</p>
            </div>
            <div className="wt-img-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%2316a34a'/%3E%3Ctext x='160' y='100' text-anchor='middle' font-size='18' fill='white' font-family='system-ui'%3ENature%3C/text%3E%3Ctext x='160' y='130' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3EGreen forest%3C/text%3E%3Crect x='40' y='160' width='20' height='60' fill='%23166534'/%3E%3Crect x='100' y='140' width='20' height='80' fill='%23166534'/%3E%3Crect x='200' y='150' width='20' height='70' fill='%23166534'/%3E%3Crect x='260' y='155' width='20' height='65' fill='%23166534'/%3E%3C/svg%3E"
                alt="Green forest with tall trees"
              />
              <p className="wt-img-caption">With alt text ✓</p>
            </div>
            <div className="wt-img-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%23f59e0b'/%3E%3Ctext x='160' y='100' text-anchor='middle' font-size='18' fill='white' font-family='system-ui'%3ESunset%3C/text%3E%3Ctext x='160' y='130' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3EGolden hour%3C/text%3E%3Ccircle cx='160' cy='90' r='35' fill='%23fbbf24'/%3E%3Crect x='0' y='180' width='320' height='60' fill='%23b45309'/%3E%3C/svg%3E"
                alt="Golden sunset with circular sun"
              />
              <p className="wt-img-caption">With alt text ✓</p>
            </div>
            <div className="wt-img-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%237c3aed'/%3E%3Ctext x='160' y='100' text-anchor='middle' font-size='18' fill='white' font-family='system-ui'%3EAbstract%3C/text%3E%3Ctext x='160' y='130' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3EGeometric art%3C/text%3E%3Cpolygon points='160,40 220,180 100,180' fill='%235b21b6'/%3E%3Ccircle cx='80' cy='80' r='30' fill='%234c1d95'/%3E%3Cpolygon points='240,60 280,140 200,140' fill='%235b21b6'/%3E%3C/svg%3E"
                alt="Abstract geometric purple art"
              />
              <p className="wt-img-caption">With alt text ✓</p>
            </div>
            <div className="wt-img-item missing-alt">
              {/* Intentionally missing alt — for Screen Reader feature test */}
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%23ef4444'/%3E%3Ctext x='160' y='110' text-anchor='middle' font-size='16' fill='white' font-family='system-ui'%3ENo Alt Text!%3C/text%3E%3Ctext x='160' y='140' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3EScreen Reader test%3C/text%3E%3C/svg%3E" />
              <p className="wt-img-caption">
                Missing alt (Screen Reader shows border)
              </p>
            </div>
            <div className="wt-img-item missing-alt">
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%23dc2626'/%3E%3Ctext x='160' y='110' text-anchor='middle' font-size='16' fill='white' font-family='system-ui'%3ENo Alt Text!%3C/text%3E%3Ctext x='160' y='140' text-anchor='middle' font-size='13' fill='rgba(255,255,255,0.8)' font-family='system-ui'%3ESR border test%3C/text%3E%3C/svg%3E" />
              <p className="wt-img-caption">
                Missing alt (Screen Reader shows border)
              </p>
            </div>
          </div>
        </section>

        {/* ── Media ──────────────────────────────────────────────────── */}
        <section id="media" className="wt-section">
          <h2 className="wt-section-title">
            Video &amp; Audio
            <span className="wt-section-badge">Mute Media</span>
          </h2>
          <p className="wt-section-desc">
            Enable <strong>Mute Media</strong> to silence all video and audio.
            Use <strong>Pause Animations</strong> to pause video playback.
          </p>

          <div className="wt-video-grid" style={{ marginBottom: 24 }}>
            <div className="wt-video-wrap">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                autoPlay
                muted
                loop
                playsInline
                aria-label="Animated gradient loop — autoplay test video"
                style={{
                  width: "100%",
                  height: 200,
                  background: "linear-gradient(135deg, #0066cc, #7c3aed)",
                }}
              >
                <source src="/sample-video.mp4" type="video/mp4" />
                <p
                  style={{
                    padding: 16,
                    color: "#fff",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Autoplay muted video — browser support or test file required
                </p>
              </video>
              <div className="wt-video-label">
                Autoplay + Muted — loops continuously
              </div>
            </div>
            <div className="wt-video-wrap">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                controls
                aria-label="Manual play test video with controls"
                style={{ width: "100%", height: 200, background: "#1a1a2e" }}
              >
                <source src="/sample-video.mp4" type="video/mp4" />
                <p
                  style={{
                    padding: 16,
                    color: "#888",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Manual video with controls — press play to test mute feature
                </p>
              </video>
              <div className="wt-video-label">
                Manual play — click to play then test Mute Media
              </div>
            </div>
          </div>

          <div className="wt-card">
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Audio Player
            </h3>
            <div className="wt-audio-wrap">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                controls
                aria-label="Test audio player for Mute Media feature"
              >
                <source src="/sample-audio.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Enable <strong>Mute Media</strong> in the widget to instantly
              silence this audio player.
            </p>
          </div>
        </section>

        {/* ── Animations ─────────────────────────────────────────────── */}
        <section id="animations" className="wt-section">
          <h2 className="wt-section-title">
            Animations
            <span className="wt-section-badge">Pause Animations</span>
          </h2>
          <p className="wt-section-desc">
            Enable <strong>Stop Animation</strong> in the widget — all CSS
            animations below should freeze instantly.
          </p>
          <div className="wt-card">
            <div className="wt-anim-grid">
              <div className="wt-anim-item">
                <div className="wt-spin" aria-hidden="true" />
                <span className="wt-anim-label">
                  Spinning
                  <br />
                  gradient box
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-bounce" aria-hidden="true" />
                <span className="wt-anim-label">
                  Bouncing
                  <br />
                  ball
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-pulse" aria-hidden="true" />
                <span className="wt-anim-label">
                  Pulsing
                  <br />
                  circle
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-shake" aria-hidden="true" />
                <span className="wt-anim-label">
                  Shaking
                  <br />
                  box
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-colorshift" aria-hidden="true" />
                <span className="wt-anim-label">
                  Colour
                  <br />
                  shifting
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-float" aria-hidden="true" />
                <span className="wt-anim-label">
                  Floating
                  <br />
                  card
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-orbit-wrap" aria-hidden="true">
                  <div className="wt-orbit-center" />
                  <div className="wt-orbit-dot" />
                </div>
                <span className="wt-anim-label">
                  Orbiting
                  <br />
                  dot
                </span>
              </div>
              <div className="wt-anim-item">
                <div className="wt-wave-wrap" aria-hidden="true">
                  <div className="wt-wave-bar" />
                  <div className="wt-wave-bar" />
                  <div className="wt-wave-bar" />
                  <div className="wt-wave-bar" />
                  <div className="wt-wave-bar" />
                </div>
                <span className="wt-anim-label">
                  Audio
                  <br />
                  wave bars
                </span>
              </div>
            </div>
          </div>

          {/* CSS transition test */}
          <div className="wt-card" style={{ marginTop: 16 }}>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              CSS Transitions (hover to activate)
            </h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Scale", "Fade", "Slide", "Rotate", "Skew"].map((name) => (
                <div
                  key={name}
                  style={{
                    padding: "14px 24px",
                    background: "#0066cc",
                    color: "#fff",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "default",
                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  className={`wt-transition-${name.toLowerCase()}`}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Colors ─────────────────────────────────────────────────── */}
        <section id="colors" className="wt-section">
          <h2 className="wt-section-title">
            Colours &amp; Contrast
            <span className="wt-section-badge">
              Color Blind · Grayscale · Saturation
            </span>
          </h2>
          <p className="wt-section-desc">
            Test colour-blindness simulation, grayscale, and saturation boost on
            these swatches.
          </p>
          <div className="wt-card">
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Solid colour swatches
            </h3>
            <div className="wt-color-grid">
              {[
                { bg: "#ef4444", label: "Red" },
                { bg: "#f97316", label: "Orange" },
                { bg: "#f59e0b", label: "Amber" },
                { bg: "#eab308", label: "Yellow" },
                { bg: "#84cc16", label: "Lime" },
                { bg: "#22c55e", label: "Green" },
                { bg: "#10b981", label: "Emerald" },
                { bg: "#14b8a6", label: "Teal" },
                { bg: "#06b6d4", label: "Cyan" },
                { bg: "#3b82f6", label: "Blue" },
                { bg: "#6366f1", label: "Indigo" },
                { bg: "#8b5cf6", label: "Violet" },
                { bg: "#a855f7", label: "Purple" },
                { bg: "#ec4899", label: "Pink" },
                { bg: "#f43f5e", label: "Rose" },
                { bg: "#78716c", label: "Stone" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="wt-color-swatch"
                  style={{ background: s.bg }}
                >
                  {s.label}
                </div>
              ))}
            </div>
            <h3
              style={{
                margin: "24px 0 16px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Gradient cards
            </h3>
            <div className="wt-gradient-grid">
              {[
                {
                  bg: "linear-gradient(135deg, #0066cc, #7c3aed)",
                  label: "Blue → Purple",
                },
                {
                  bg: "linear-gradient(135deg, #f59e0b, #ef4444)",
                  label: "Amber → Red",
                },
                {
                  bg: "linear-gradient(135deg, #10b981, #3b82f6)",
                  label: "Green → Blue",
                },
                {
                  bg: "linear-gradient(135deg, #ec4899, #f97316)",
                  label: "Pink → Orange",
                },
              ].map((g) => (
                <div
                  key={g.label}
                  className="wt-gradient-card"
                  style={{ background: g.bg }}
                >
                  {g.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Forms ──────────────────────────────────────────────────── */}
        <section id="forms" className="wt-section">
          <h2 className="wt-section-title">
            Form Elements
            <span className="wt-section-badge">
              Focus · Large Targets · Keyboard Nav
            </span>
          </h2>
          <p className="wt-section-desc">
            Test focus indicator, large click targets, and keyboard navigation
            on these form controls.
          </p>
          <div className="wt-card">
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="wt-form-grid" style={{ marginBottom: 20 }}>
                <div className="wt-field">
                  <label htmlFor="wt-name">Full name</label>
                  <input
                    id="wt-name"
                    type="text"
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </div>
                <div className="wt-field">
                  <label htmlFor="wt-email">Email address</label>
                  <input
                    id="wt-email"
                    type="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </div>
                <div className="wt-field">
                  <label htmlFor="wt-phone">Phone number</label>
                  <input
                    id="wt-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </div>
                <div className="wt-field">
                  <label htmlFor="wt-date">Date of birth</label>
                  <input id="wt-date" type="date" />
                </div>
                <div className="wt-field">
                  <label htmlFor="wt-category">Category</label>
                  <select id="wt-category">
                    <option value="">Select a category…</option>
                    <option value="vision">Vision impairment</option>
                    <option value="hearing">Hearing impairment</option>
                    <option value="motor">Motor impairment</option>
                    <option value="cognitive">Cognitive impairment</option>
                  </select>
                </div>
                <div className="wt-field">
                  <label htmlFor="wt-website">Website URL</label>
                  <input
                    id="wt-website"
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="wt-field" style={{ marginBottom: 20 }}>
                <label htmlFor="wt-message">Message</label>
                <textarea
                  id="wt-message"
                  placeholder="Describe your accessibility needs or feedback…"
                  rows={4}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                  marginBottom: 20,
                }}
              >
                <div className="wt-field">
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Preferred contact
                  </span>
                  <div className="wt-radio-group">
                    {["Email", "Phone", "Video call", "In-person"].map(
                      (opt) => (
                        <label key={opt} className="wt-radio-label">
                          <input
                            type="radio"
                            name="wt-contact"
                            value={opt.toLowerCase()}
                          />
                          {opt}
                        </label>
                      ),
                    )}
                  </div>
                </div>
                <div className="wt-field">
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Accessibility features needed
                  </span>
                  <div className="wt-checkbox-group">
                    {[
                      "Screen reader support",
                      "Keyboard navigation",
                      "High contrast mode",
                      "Large text",
                    ].map((opt) => (
                      <label key={opt} className="wt-checkbox-label">
                        <input type="checkbox" value={opt.toLowerCase()} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="wt-field" style={{ marginBottom: 24 }}>
                <label htmlFor="wt-satisfaction">
                  Satisfaction level: <strong>7 / 10</strong>
                </label>
                <input
                  id="wt-satisfaction"
                  type="range"
                  className="wt-range"
                  min={1}
                  max={10}
                  defaultValue={7}
                />
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  className="wt-button wt-button-md wt-button-blue"
                >
                  Submit Form
                </button>
                <button
                  type="reset"
                  className="wt-button wt-button-md wt-button-outline-dark"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ── Interactive ─────────────────────────────────────────────── */}
        <section id="interactive" className="wt-section">
          <h2 className="wt-section-title">
            Interactive Elements
            <span className="wt-section-badge">
              Large Targets · Cursor · Focus
            </span>
          </h2>
          <p className="wt-section-desc">
            Test cursor enlargement, large click targets, focus highlighting,
            and keyboard navigation on these elements.
          </p>

          <div className="wt-card" style={{ marginBottom: 16 }}>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Button sizes (test Large Targets)
            </h3>
            <div className="wt-btn-grid">
              <button className="wt-button wt-button-xs wt-button-blue">
                XS Button
              </button>
              <button className="wt-button wt-button-sm wt-button-green">
                Small Button
              </button>
              <button className="wt-button wt-button-md wt-button-blue">
                Medium Button
              </button>
              <button className="wt-button wt-button-lg wt-button-purple">
                Large Button
              </button>
              <button className="wt-button wt-button-xl wt-button-red">
                XL Button
              </button>
            </div>
            <div className="wt-btn-grid" style={{ marginTop: 14 }}>
              <button className="wt-button wt-button-md wt-button-outline-blue">
                Outlined Blue
              </button>
              <button className="wt-button wt-button-md wt-button-outline-dark">
                Outlined Dark
              </button>
              <button
                className="wt-button wt-button-md"
                style={{ background: "#f3f4f6", color: "#374151" }}
              >
                Ghost
              </button>
              <button
                className="wt-button wt-button-md"
                style={{
                  background: "linear-gradient(135deg, #0066cc, #7c3aed)",
                  color: "#fff",
                }}
              >
                Gradient
              </button>
            </div>
          </div>

          <div className="wt-card" style={{ marginBottom: 16 }}>
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Focusable elements (Tab through)
            </h3>
            <div className="wt-focus-items">
              {[
                "Link element",
                "Button 1",
                "Button 2",
                "Button 3",
                "Input field",
                "Anchor tag",
              ].map((item, i) =>
                item.includes("Link") || item.includes("Anchor") ? (
                  <a key={i} href="#interactive" className="wt-focus-item">
                    {item}
                  </a>
                ) : item.includes("Input") ? (
                  <input
                    key={i}
                    type="text"
                    placeholder="Input field"
                    className="wt-focus-item"
                    style={{ cursor: "text" }}
                  />
                ) : (
                  <button key={i} className="wt-focus-item">
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="wt-card">
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Icon buttons (test cursor size)
            </h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {([
                { Icon: IconHome,     label: "Home" },
                { Icon: IconSearch,   label: "Search" },
                { Icon: IconSettings, label: "Settings" },
                { Icon: IconBell,     label: "Notifications" },
                { Icon: IconMail,     label: "Email" },
                { Icon: IconHeart,    label: "Like" },
                { Icon: IconStar,     label: "Favourite" },
                { Icon: IconTrash,    label: "Delete" },
              ] as const).map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  title={label}
                  className="wt-button wt-button-md"
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    minWidth: 44,
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Data Table ──────────────────────────────────────────────── */}
        <section className="wt-section">
          <h2 className="wt-section-title">Data Table</h2>
          <p className="wt-section-desc">
            A structured data table — test how text features affect table
            content.
          </p>
          <div className="wt-card">
            <div className="wt-table-wrap">
              <table className="wt-table">
                <caption
                  style={{
                    textAlign: "left",
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#374151",
                    captionSide: "top",
                  }}
                >
                  WCAG 2.2 New Success Criteria
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Criterion</th>
                    <th scope="col">Level</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "2.4.11",
                      level: "AA",
                      desc: "Focus Not Obscured (Minimum) — focused element not entirely hidden",
                      status: "new",
                    },
                    {
                      id: "2.4.12",
                      level: "AAA",
                      desc: "Focus Not Obscured (Enhanced) — focused element fully visible",
                      status: "new",
                    },
                    {
                      id: "2.4.13",
                      level: "AAA",
                      desc: "Focus Appearance — focus indicator meets size and contrast requirements",
                      status: "new",
                    },
                    {
                      id: "2.5.7",
                      level: "AA",
                      desc: "Dragging Movements — all drag actions have a single-pointer alternative",
                      status: "new",
                    },
                    {
                      id: "2.5.8",
                      level: "AA",
                      desc: "Target Size (Minimum) — interactive targets at least 24×24 CSS pixels",
                      status: "new",
                    },
                    {
                      id: "3.2.6",
                      level: "A",
                      desc: "Consistent Help — help mechanisms appear in consistent location",
                      status: "new",
                    },
                    {
                      id: "3.3.7",
                      level: "A",
                      desc: "Redundant Entry — previously entered info auto-populated or selectable",
                      status: "new",
                    },
                    {
                      id: "3.3.8",
                      level: "AA",
                      desc: "Accessible Authentication (Minimum) — no cognitive function test required",
                      status: "new",
                    },
                    {
                      id: "3.3.9",
                      level: "AAA",
                      desc: "Accessible Authentication (Enhanced) — stronger version of 3.3.8",
                      status: "new",
                    },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{row.id}</strong>
                      </td>
                      <td>
                        <span
                          className={`wt-table-badge ${row.level === "A" ? "wt-badge-green" : row.level === "AA" ? "wt-badge-yellow" : "wt-badge-red"}`}
                        >
                          {row.level}
                        </span>
                      </td>
                      <td>{row.desc}</td>
                      <td>
                        <span className="wt-table-badge wt-badge-green">
                          New in 2.2
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Progress Bars ────────────────────────────────────────────── */}
        <section className="wt-section">
          <h2 className="wt-section-title">Progress Indicators</h2>
          <p className="wt-section-desc">
            Visual progress bars — test high contrast, grayscale and colour
            blind modes.
          </p>
          <div className="wt-card">
            <div className="wt-progress-list">
              {[
                { label: "WCAG 2.1 AA Compliance", pct: 85, color: "#0066cc" },
                { label: "EAA 2025 Readiness", pct: 72, color: "#7c3aed" },
                { label: "ADA Conformance", pct: 91, color: "#16a34a" },
                { label: "Mobile Accessibility", pct: 68, color: "#f59e0b" },
                { label: "Screen Reader Support", pct: 79, color: "#ef4444" },
              ].map((item) => (
                <div key={item.label} className="wt-progress-item">
                  <div className="wt-progress-header">
                    <span>{item.label}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="wt-progress-track">
                    <div
                      className="wt-progress-bar"
                      style={{ width: `${item.pct}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Long scrollable content ─────────────────────────────────── */}
        <section className="wt-section">
          <h2 className="wt-section-title">Long-form Article Content</h2>
          <p className="wt-section-desc">
            Dense article text for testing reading guide, reading mask and
            magnifier.
          </p>
          <div className="wt-card wt-prose">
            <h2>The History of Web Accessibility</h2>
            <p>
              Web accessibility has evolved significantly since the earliest
              days of the internet. In the 1990s, when the web was in its
              infancy, websites were largely text-based and inherently
              accessible to screen readers. As graphical browsers emerged and
              web design became more complex, accessibility concerns grew
              alongside the technology.
            </p>
            <p>
              The World Wide Web Consortium (W3C) established the Web
              Accessibility Initiative (WAI) in 1997, recognising that the web
              had the potential to remove barriers that many people with
              disabilities faced in their daily lives. However, this potential
              could only be realised if websites were designed with
              accessibility in mind from the outset.
            </p>
            <h3>WCAG 1.0 — The First Standard</h3>
            <p>
              The first Web Content Accessibility Guidelines were published in
              1999. WCAG 1.0 provided 14 guidelines with 65 checkpoints,
              organised into three priority levels. While groundbreaking at the
              time, the guidelines were difficult to interpret and apply
              consistently across different technologies and contexts.
            </p>
            <h3>WCAG 2.0 — A Technology-Neutral Approach</h3>
            <p>
              WCAG 2.0, published in 2008, took a fundamentally different
              approach. Rather than prescribing specific technologies, it
              focused on underlying principles: content must be perceivable,
              operable, understandable, and robust. This POUR framework remains
              the foundation of modern web accessibility standards.
            </p>
            <h3>WCAG 2.1 and 2.2 — Keeping Pace with Technology</h3>
            <p>
              As mobile devices and touch interfaces became dominant, WCAG 2.1
              was published in 2018 to address gaps in coverage for mobile
              users, people with cognitive disabilities, and people with low
              vision. WCAG 2.2, published in October 2023, added further
              criteria focused on cognitive accessibility and target size
              requirements.
            </p>
            <blockquote>
              "Accessibility is not a feature, it is a social trend." — Antonio
              Santos
            </blockquote>
            <p>
              Today, accessibility is increasingly treated as a legal
              requirement rather than a nice-to-have. The European Accessibility
              Act 2025, the Americans with Disabilities Act, and similar
              legislation worldwide have transformed accessibility from a
              voluntary best practice into a compliance obligation for millions
              of organisations.
            </p>
          </div>
        </section>
      </main>

        {/* ── Multilingual Screen Reader Test ─────────────────────── */}
        <section className="wt-section">
          <h2 className="wt-section-title">
            Screen Reader — Multilingual Test
            <span className="wt-section-badge">TTS</span>
          </h2>
          <p className="wt-section-desc">
            Hover or tap any element below to test the screen reader feature
            with different languages. Enable &ldquo;Screen Reader&rdquo; in
            the widget, choose&nbsp;<em>Read on hover</em> or&nbsp;<em>Read on
            tap</em>, then interact with the blocks.
          </p>

          {/* English */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇬🇧 English</h3>
            <p lang="en">Welcome to the Inculva accessibility widget test page. This paragraph tests the screen reader&apos;s ability to read English text aloud with natural intonation.</p>
            <p lang="en">The quick brown fox jumps over the lazy dog. Accessibility is about creating digital experiences that everyone can use, regardless of their abilities.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Click me</button>
            <a href="#" style={{ color: "#0066cc" }}>Visit our accessibility guide →</a>
          </div>

          {/* Turkish */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇹🇷 Türkçe</h3>
            <p lang="tr">İnculva erişilebilirlik widget&apos;ının test sayfasına hoş geldiniz. Bu paragraf, ekran okuyucunun Türkçe metni doğal tonlama ile sesli okuma yeteneğini test etmektedir.</p>
            <p lang="tr">Dijital erişilebilirlik, her kullanıcının yeteneklerinden bağımsız olarak web sitelerini ve uygulamaları kullanabilmesi anlamına gelir. Herkes için tasarım, daha iyi bir dünya yaratır.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Bana tıkla</button>
            <a href="#" style={{ color: "#0066cc" }}>Erişilebilirlik rehberimizi ziyaret edin →</a>
          </div>

          {/* German */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇩🇪 Deutsch</h3>
            <p lang="de">Willkommen auf der Testseite des Inculva-Barrierefreiheits-Widgets. Dieser Absatz testet die Fähigkeit des Bildschirmlesers, deutschen Text mit natürlicher Intonation vorzulesen.</p>
            <p lang="de">Digitale Barrierefreiheit bedeutet, dass alle Menschen unabhängig von ihren Fähigkeiten Websites und Apps nutzen können. Inklusive Gestaltung schafft eine bessere Zukunft für alle.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Klick mich</button>
            <a href="#" style={{ color: "#0066cc" }}>Barrierefreiheitsleitfaden ansehen →</a>
          </div>

          {/* French */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇫🇷 Français</h3>
            <p lang="fr">Bienvenue sur la page de test du widget d&apos;accessibilité Inculva. Ce paragraphe teste la capacité du lecteur d&apos;écran à lire du texte français à voix haute avec une intonation naturelle.</p>
            <p lang="fr">L&apos;accessibilité numérique consiste à créer des expériences en ligne utilisables par tous, quelles que soient leurs capacités. Une conception inclusive améliore la vie de chacun.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Cliquez-moi</button>
            <a href="#" style={{ color: "#0066cc" }}>Voir notre guide d&apos;accessibilité →</a>
          </div>

          {/* Spanish */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇪🇸 Español</h3>
            <p lang="es">Bienvenido a la página de prueba del widget de accesibilidad de Inculva. Este párrafo prueba la capacidad del lector de pantalla para leer texto en español en voz alta con entonación natural.</p>
            <p lang="es">La accesibilidad digital significa crear experiencias en línea que todos puedan usar, independientemente de sus capacidades. El diseño inclusivo mejora la vida de todas las personas.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Hazme clic</button>
            <a href="#" style={{ color: "#0066cc" }}>Ver nuestra guía de accesibilidad →</a>
          </div>

          {/* Arabic — RTL */}
          <div className="wt-card wt-prose" dir="rtl" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇸🇦 العربية</h3>
            <p lang="ar">مرحباً بكم في صفحة اختبار أداة إمكانية الوصول من Inculva. تختبر هذه الفقرة قدرة قارئ الشاشة على قراءة النص العربي بصوت عالٍ بنبرة طبيعية.</p>
            <p lang="ar">إمكانية الوصول الرقمية تعني إنشاء تجارب رقمية يمكن للجميع استخدامها بغض النظر عن قدراتهم. التصميم الشامل يحسّن حياة الجميع ويصنع عالماً أفضل للجميع.</p>
            <button style={{ marginLeft: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>انقر هنا</button>
            <a href="#" style={{ color: "#0066cc" }}>← زيارة دليل إمكانية الوصول</a>
          </div>

          {/* Hebrew — RTL */}
          <div className="wt-card wt-prose" dir="rtl" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇮🇱 עברית</h3>
            <p lang="he">ברוכים הבאים לדף הבדיקה של ווידג&apos;ט הנגישות של Inculva. פסקה זו בודקת את יכולת קורא המסך לקרוא טקסט עברי בקול עם נסירה טבעית.</p>
            <p lang="he">נגישות דיגיטלית פירושה יצירת חוויות מקוונות שכולם יכולים להשתמש בהן, ללא קשר ליכולותיהם. עיצוב כוללני משפר את חיי כולם.</p>
            <button style={{ marginLeft: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>לחץ עלי</button>
            <a href="#" style={{ color: "#0066cc" }}>← בקר במדריך הנגישות שלנו</a>
          </div>

          {/* Japanese */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇯🇵 日本語</h3>
            <p lang="ja">Inculvaアクセシビリティウィジェットのテストページへようこそ。この段落は、スクリーンリーダーが自然なイントネーションで日本語のテキストを読み上げる機能をテストするものです。</p>
            <p lang="ja">デジタルアクセシビリティとは、能力に関わらずすべての人がウェブサイトやアプリを利用できるようにすることです。インクルーシブデザインはより良い社会を作ります。</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>クリックしてください</button>
            <a href="#" style={{ color: "#0066cc" }}>アクセシビリティガイドを見る →</a>
          </div>

          {/* Chinese */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇨🇳 中文</h3>
            <p lang="zh">欢迎来到 Inculva 无障碍访问小部件测试页面。本段测试屏幕阅读器以自然语调朗读中文文本的能力。</p>
            <p lang="zh">数字无障碍意味着创建所有人都能使用的在线体验，无论其能力如何。包容性设计让每个人的生活都更美好，并为所有人打造更友好的数字世界。</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>点击我</button>
            <a href="#" style={{ color: "#0066cc" }}>查看我们的无障碍指南 →</a>
          </div>

          {/* Korean */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇰🇷 한국어</h3>
            <p lang="ko">Inculva 접근성 위젯 테스트 페이지에 오신 것을 환영합니다. 이 단락은 스크린 리더가 자연스러운 억양으로 한국어 텍스트를 소리 내어 읽는 기능을 테스트합니다.</p>
            <p lang="ko">디지털 접근성이란 모든 사람이 능력에 관계없이 웹사이트와 앱을 사용할 수 있도록 하는 것을 의미합니다. 포용적 디자인은 모든 사람의 삶을 개선합니다.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>클릭하세요</button>
            <a href="#" style={{ color: "#0066cc" }}>접근성 가이드 보기 →</a>
          </div>

          {/* Russian */}
          <div className="wt-card wt-prose" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🇷🇺 Русский</h3>
            <p lang="ru">Добро пожаловать на тестовую страницу виджета доступности Inculva. Этот абзац проверяет способность программы чтения с экрана читать русский текст вслух с естественной интонацией.</p>
            <p lang="ru">Цифровая доступность означает создание онлайн-опыта, которым могут пользоваться все люди, независимо от их способностей. Инклюзивный дизайн улучшает жизнь каждого человека.</p>
            <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Нажмите меня</button>
            <a href="#" style={{ color: "#0066cc" }}>Просмотр нашего руководства по доступности →</a>
          </div>

          {/* Images with alt text — for Alt Hints mode */}
          <div className="wt-card" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>🖼️ Alt Hints Mode — Images</h3>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 14px" }}>
              Switch screen reader to <strong>level 1 (Alt hints)</strong> to see overlays on images with alt text and red outlines on images without.
            </p>
            <div className="wt-img-grid">
              <div className="wt-img-item">
                <img src="https://picsum.photos/seed/a11y1/300/225" alt="A scenic mountain landscape with snow-capped peaks" />
                <p className="wt-img-caption">Has alt text ✓</p>
              </div>
              <div className="wt-img-item">
                <img src="https://picsum.photos/seed/a11y2/300/225" alt="A colorful bird perched on a tree branch in a tropical forest" />
                <p className="wt-img-caption">Has alt text ✓</p>
              </div>
              <div className="wt-img-item missing-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://picsum.photos/seed/a11y3/300/225" alt="" />
                <p className="wt-img-caption">Empty alt — decorative</p>
              </div>
              <div className="wt-img-item missing-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://picsum.photos/seed/a11y4/300/225" alt={undefined as unknown as string} />
                <p className="wt-img-caption">No alt — missing ✗</p>
              </div>
            </div>
          </div>
        </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#1a1a2e",
          color: "rgba(255,255,255,0.6)",
          padding: "32px 24px",
          textAlign: "center",
          fontSize: 13,
        }}
      >
        <p style={{ margin: 0 }}>
          Inculva Widget Test Page — for development and QA purposes only.{" "}
          <a href="/" style={{ color: "#0066cc" }}>
            ← Back to home
          </a>
        </p>
      </footer>
    </>
  );
}
