export const widgetStyles = `
  /* ── Trigger Button ─────────────────────────────────────────────────── */
  #inculva-widget-btn {
    position: fixed !important;
    z-index: 2147483645 !important;
    width: var(--inculva-button-size, 56px);
    height: var(--inculva-button-size, 56px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.24), 0 2px 6px rgba(0,0,0,0.14);
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
    outline: none;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  #inculva-widget-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 28px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.16);
  }
  #inculva-widget-btn:active { transform: scale(0.95); }
  #inculva-widget-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.24), 0 0 0 6px rgba(255,255,255,0.3);
  }
  #inculva-widget-btn[aria-expanded="true"] { transform: scale(1.05); }

  /* Active features badge */
  #inculva-widget-badge {
    position: absolute !important;
    top: -4px;
    right: -4px;
    background: #ef4444;
    color: #fff;
    border-radius: 50%;
    min-width: 19px;
    height: 19px;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    padding: 0 3px;
    line-height: 1;
    pointer-events: none;
    z-index: 1;
  }
  #inculva-widget-badge.visible { display: flex; }

  /* ── Backdrop ────────────────────────────────────────────────────────── */
  #inculva-widget-backdrop {
    position: fixed !important;
    inset: 0;
    z-index: 2147483644 !important;
    display: none;
    background: transparent;
  }
  #inculva-widget-backdrop.open { display: block; }

  /* ── Widget Panel ────────────────────────────────────────────────────── */
  #inculva-widget-panel {
    position: fixed !important;
    z-index: 2147483645 !important;
    width: 380px;
    max-height: calc(100vh - 110px);
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.10);
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif);
    font-size: 14px;
    line-height: 1.4;
    background: #f7f7f7;
    color: #1a1a2e;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px) scale(0.98);
    transition: opacity 0.2s ease, visibility 0.2s, transform 0.24s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
  }
  #inculva-widget-panel.open {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  @media (max-width: 575px) {
    #inculva-widget-panel {
      width: 96vw !important;
      border-radius: 16px !important;
    }
  }

  /* ── Panel Header (clean white) ──────────────────────────────────────── */
  .inculva-panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    height: 52px;
    flex-shrink: 0;
    background: #fff;
    color: #111827;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    cursor: default;
    user-select: none;
  }
  .inculva-panel-header-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--inculva-primary, #0066cc);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .inculva-panel-title {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #111827;
    font-family: inherit;
  }
  .inculva-active-count {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .inculva-header-actions {
    display: flex;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
  }
  .inculva-header-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: rgba(0,0,0,0.04);
    color: #6b7280;
    transition: background 0.12s, color 0.12s, transform 0.1s;
    outline: none;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-header-btn:hover { background: rgba(0,0,0,0.09); color: #111827; }
  .inculva-header-btn:active { transform: scale(0.9); }
  .inculva-header-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }

  /* ── Profile Section ─────────────────────────────────────────────────── */
  .inculva-profiles-section {
    margin: 8px 10px 0;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    flex-shrink: 0;
  }
  .inculva-profiles-toggle {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 12px;
    background: #fff;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background 0.12s;
  }
  .inculva-profiles-toggle:hover { background: #f9fafb; }
  .inculva-profiles-toggle:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-profiles-toggle > span:nth-child(2) { flex: 1; }
  .inculva-profiles-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color: #9ca3af;
  }
  .inculva-profiles-toggle[aria-expanded="true"] .inculva-profiles-arrow {
    transform: rotate(180deg);
  }
  /* Profile card grid */
  .inculva-profiles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    padding: 6px 8px 8px;
    border-top: 1px solid rgba(0,0,0,0.07);
    background: #fafafa;
  }
  .inculva-profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 4px 7px;
    border: 1.5px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 10.5px;
    font-weight: 500;
    color: #374151;
    text-align: center;
    line-height: 1.25;
    transition: all 0.12s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    word-break: break-word;
    hyphens: auto;
  }
  .inculva-profile-card:hover { background: #f5f5f7; border-color: rgba(0,0,0,0.15); }
  .inculva-profile-card:active { transform: scale(0.96); }
  .inculva-profile-card:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-profile-card.active {
    background: var(--inculva-primary, #0066cc);
    border-color: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  .inculva-profile-card.active .inculva-card-icon svg path,
  .inculva-profile-card.active .inculva-card-icon svg circle,
  .inculva-profile-card.active .inculva-card-icon svg rect { stroke: #fff; }
  .inculva-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .inculva-card-label { font-size: 10.5px; line-height: 1.2; }

  /* ── Category Tab Bar ────────────────────────────────────────────────── */
  .inculva-tab-bar {
    display: flex;
    align-items: stretch;
    flex-shrink: 0;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    padding: 0 6px;
  }
  .inculva-tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 4px 9px;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 500;
    color: #9ca3af;
    transition: color 0.15s, border-color 0.15s;
    outline: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    margin-bottom: -1px;
    position: relative;
  }
  .inculva-tab-btn:hover { color: #374151; }
  .inculva-tab-btn.active {
    color: var(--inculva-primary, #0066cc);
    border-bottom-color: var(--inculva-primary, #0066cc);
    font-weight: 600;
  }
  .inculva-tab-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; border-radius: 4px; }
  .inculva-tab-label { pointer-events: none; }
  .inculva-tab-count {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-radius: 8px;
    min-width: 16px;
    height: 16px;
    font-size: 10px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    line-height: 1;
    flex-shrink: 0;
  }
  .inculva-tab-btn:not(.active) .inculva-tab-count {
    background: #6b7280;
  }

  /* ── Panel Body (scrollable) ─────────────────────────────────────────── */
  .inculva-panel-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 10px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.14) transparent;
    background: #f7f7f7;
  }
  .inculva-panel-body::-webkit-scrollbar { width: 4px; }
  .inculva-panel-body::-webkit-scrollbar-track { background: transparent; }
  .inculva-panel-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.13); border-radius: 4px; }

  /* ── Feature Grid ────────────────────────────────────────────────────── */
  .inculva-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
    margin-bottom: 10px;
  }

  /* Tab filtering — CSS hides features not in the active tab */
  .inculva-feature-grid[data-active-tab="vision"]  [data-category]:not([data-category="vision"])  { display: none !important; }
  .inculva-feature-grid[data-active-tab="reading"] [data-category]:not([data-category="reading"]) { display: none !important; }
  .inculva-feature-grid[data-active-tab="motor"]   [data-category]:not([data-category="motor"])   { display: none !important; }
  .inculva-feature-grid[data-active-tab="calm"]    [data-category]:not([data-category="calm"])    { display: none !important; }

  /* ── Feature Button ──────────────────────────────────────────────────── */
  .inculva-feature-btn {
    border: 1.5px solid rgba(54,54,54,0.10);
    border-radius: var(--inculva-border-radius, 14px);
    padding: 12px 6px 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25;
    text-align: center;
    background: #fff;
    color: #374151;
    transition: border-color 0.12s, background 0.12s, transform 0.1s, box-shadow 0.12s;
    outline: none;
    min-height: 88px;
    word-break: break-word;
    hyphens: auto;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }
  @media (min-width: 785px) {
    .inculva-feature-btn:hover {
      border-color: var(--inculva-primary, #0066cc);
      background: #fafbff;
      transition: all 0.1s;
    }
  }
  .inculva-feature-btn:active { transform: scale(0.96); }
  .inculva-feature-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
    box-shadow: 0 2px 8px rgba(0,102,204,0.25) !important;
  }
  .inculva-feature-btn.active .inculva-feature-icon-box {
    background: rgba(255,255,255,0.18) !important;
    border-color: transparent !important;
  }
  .inculva-feature-btn.active .inculva-feature-icon-box svg path,
  .inculva-feature-btn.active .inculva-feature-icon-box svg rect,
  .inculva-feature-btn.active .inculva-feature-icon-box svg circle {
    stroke: #fff;
    fill: none;
  }
  .inculva-feature-btn.active .inculva-feature-icon-box svg [data-fill="1"] {
    fill: #fff;
    stroke: none;
  }

  /* Icon box */
  .inculva-feature-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 11px;
    background: #f4f4f6;
    border: 1px solid rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.12s;
  }
  .inculva-feature-icon-box svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: block;
  }
  .inculva-feature-label {
    font-size: 11.5px;
    font-weight: 500;
    line-height: 1.25;
    font-family: inherit;
  }

  /* ── Level Indicator (segmented bar below label) ─────────────────────── */
  .inculva-feature-levels {
    display: flex;
    gap: 3px;
    width: calc(100% - 16px);
    margin-top: 1px;
  }
  .inculva-level-dot {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(67,67,80,0.13);
    transition: background 0.15s;
  }
  [data-level="1"] .inculva-level-dot:nth-child(1),
  [data-level="2"] .inculva-level-dot:nth-child(-n+2),
  [data-level="3"] .inculva-level-dot:nth-child(-n+3),
  [data-level="4"] .inculva-level-dot:nth-child(-n+4) {
    background: var(--inculva-primary, #0066cc);
  }
  .inculva-feature-btn.active .inculva-level-dot {
    background: rgba(255,255,255,0.3);
  }
  .inculva-feature-btn.active[data-level="1"] .inculva-level-dot:nth-child(1),
  .inculva-feature-btn.active[data-level="2"] .inculva-level-dot:nth-child(-n+2),
  .inculva-feature-btn.active[data-level="3"] .inculva-level-dot:nth-child(-n+3),
  .inculva-feature-btn.active[data-level="4"] .inculva-level-dot:nth-child(-n+4) {
    background: rgba(255,255,255,0.95);
  }

  /* ── Color Blind Sub-Selector ────────────────────────────────────────── */
  .inculva-cbm-selector {
    grid-column: 1 / -1;
    display: none;
    flex-wrap: wrap;
    gap: 5px;
    padding: 2px 0 4px;
  }
  .inculva-cbm-selector.visible { display: flex; }
  .inculva-cbm-btn {
    flex: 1 1 auto;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 5px 6px;
    font-size: 10.5px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition: all 0.15s;
    text-align: center;
    background: #fff;
    color: #374151;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-cbm-btn:hover { opacity: 0.85; }
  .inculva-cbm-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-color: var(--inculva-primary, #0066cc);
    font-weight: 700;
  }

  /* ── Reset Row ───────────────────────────────────────────────────────── */
  .inculva-reset-row { padding-bottom: 10px; }
  .inculva-reset-btn {
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 10px 14px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: #fff;
    color: #6b7280;
    transition: opacity 0.15s, background 0.15s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid rgba(0,0,0,0.09);
  }
  .inculva-reset-btn:hover { background: #f9fafb; color: #374151; }
  .inculva-reset-btn:active { transform: scale(0.98); }
  .inculva-reset-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }

  /* ── Mini Mode ───────────────────────────────────────────────────────── */
  #inculva-widget-panel[data-size="mini"] {
    width: 82px !important;
    border-radius: 16px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-header,
  #inculva-widget-panel[data-size="mini"] .inculva-profiles-section,
  #inculva-widget-panel[data-size="mini"] .inculva-tab-bar,
  #inculva-widget-panel[data-size="mini"] .inculva-reset-row,
  #inculva-widget-panel[data-size="mini"] .inculva-panel-footer {
    display: none !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-body {
    padding: 8px 6px 0;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid {
    grid-template-columns: 1fr !important;
    gap: 6px !important;
  }
  /* Show all non-disabled features in mini mode regardless of active tab */
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid [data-category]:not(.inculva-hidden) {
    display: flex !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn {
    min-height: 60px !important;
    padding: 0 !important;
    border-radius: 12px !important;
    border: none !important;
    background: #fff !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-icon-box {
    width: 100% !important;
    height: 100% !important;
    min-height: 60px !important;
    border-radius: 12px !important;
    background: transparent !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-label { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-cbm-selector  { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-levels { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-mini-actions  { display: flex !important; }

  /* Mini actions bar */
  .inculva-mini-actions {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 0 0 16px 16px;
    padding: 18px 14px;
    height: 155px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    flex-shrink: 0;
  }
  .inculva-mini-btn {
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
    color: #fff;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }
  .inculva-mini-btn:hover { opacity: 0.75; }
  .inculva-mini-btn:focus-visible { outline: 1px solid rgba(255,255,255,0.7); border-radius: 8px; }
  .inculva-mini-btn svg { width: 22px; height: 22px; }
  /* Header mini btn — NOT the mini-actions version */
  .inculva-panel-header .inculva-mini-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(0,0,0,0.04);
    color: #6b7280;
    padding: 0;
  }
  .inculva-panel-header .inculva-mini-btn svg { width: 14px; height: 14px; }
  .inculva-panel-header .inculva-mini-btn:hover { background: rgba(0,0,0,0.09); color: #111827; }
  @media (max-width: 1024px) {
    #inculva-widget-panel[data-size="mini"] { padding-bottom: 164px; }
  }

  /* ── Panel Footer (clean, minimal) ──────────────────────────────────── */
  .inculva-panel-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    flex-shrink: 0;
    background: #f9fafb;
    border-top: 1px solid rgba(0,0,0,0.07);
    gap: 8px;
    min-height: 44px;
  }
  .inculva-footer-brand {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    color: #9ca3af;
    font-family: inherit;
  }
  .inculva-a11y-link {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #6b7280;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-a11y-link:hover { color: #374151; }
  .inculva-a11y-link:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; border-radius: 2px; }

  /* ── RTL Support ─────────────────────────────────────────────────────── */
  #inculva-widget-panel[dir="rtl"] .inculva-panel-header   { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-header-actions { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-profiles-toggle { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-tab-bar         { flex-direction: row-reverse; }

  /* ── Reduced Motion ──────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    #inculva-widget-btn,
    #inculva-widget-panel,
    .inculva-feature-btn,
    .inculva-header-btn,
    .inculva-feature-icon-box,
    .inculva-tab-btn,
    .inculva-profile-card {
      transition: none !important;
      animation: none !important;
    }
  }

  /* ── Hidden utility (site-owner-disabled features) ──────────────────── */
  .inculva-hidden { display: none !important; }

  /* ── Screen Reader Only ──────────────────────────────────────────────── */
  .inculva-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }
`;
