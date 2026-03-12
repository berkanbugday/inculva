export const widgetStyles = `
  /* ── Trigger Button ─────────────────────────────────────────────────── */
  #inculva-widget-btn {
    position: fixed !important;
    z-index: 2147483645 !important;
    width: var(--inculva-button-size, 58px);
    height: var(--inculva-button-size, 58px);
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
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    padding: 0 3px;
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
    width: 520px;
    max-height: calc(100vh - 110px);
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    box-shadow: 0 10px 48px rgba(0,0,0,0.22), 0 2px 14px rgba(0,0,0,0.12);
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
      width: calc(100vw - 16px) !important;
      border-radius: 16px !important;
      left: 8px !important;
      right: 8px !important;
    }
    .inculva-controls-bar {
      padding: 8px 10px !important;
    }
    .inculva-controls-row {
      gap: 7px !important;
    }
    .inculva-lang-trigger {
      height: 38px !important;
    }
    .inculva-panel-body {
      padding: 10px 10px 0 !important;
    }
  }

  /* ── Panel Header — uses primary color as background ────────────────── */
  .inculva-panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    height: 64px;
    flex-shrink: 0;
    background: var(--inculva-header-bg, var(--inculva-primary, #0066cc));
    color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    cursor: default;
    user-select: none;
    border-radius: 18px 18px 0 0;
  }
  .inculva-panel-header-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .inculva-panel-title-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .inculva-panel-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
    font-family: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inculva-active-count {
    background: rgba(255,255,255,0.25);
    color: #fff;
    border-radius: 12px;
    padding: 3px 9px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .inculva-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-left: 1px solid rgba(255,255,255,0.22);
    padding-left: 14px;
    margin-left: 6px;
  }
  .inculva-header-btn {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.9);
    transition: background 0.12s, color 0.12s, transform 0.1s;
    outline: none;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-header-btn:hover { background: rgba(255,255,255,0.28); color: #fff; }
  .inculva-header-btn:active { transform: scale(0.9); }
  .inculva-header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 1px; }

  /* ── Controls Bar Row ────────────────────────────────────────────────── */
  .inculva-controls-bar {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 10px 14px;
    flex-shrink: 0;
    background: #f7f7f7;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .inculva-controls-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── Custom Language Dropdown ────────────────────────────────────────── */
  .inculva-lang-dropdown {
    position: relative;
    flex: 1;
    min-width: 0;
  }
  .inculva-lang-trigger {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 10px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 9px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    color: #374151;
    outline: none;
    transition: border-color 0.12s, box-shadow 0.12s;
    -webkit-tap-highlight-color: transparent;
    text-align: start;
  }
  .inculva-lang-trigger:hover { border-color: rgba(0,0,0,0.28); }
  .inculva-lang-trigger:focus-visible {
    border-color: var(--inculva-primary, #0066cc);
    box-shadow: 0 0 0 3px rgba(var(--inculva-primary-rgb, 0,102,204), 0.18);
  }
  .inculva-lang-dropdown.open .inculva-lang-trigger {
    border-color: var(--inculva-primary, #0066cc);
    box-shadow: 0 0 0 3px rgba(var(--inculva-primary-rgb, 0,102,204), 0.18);
  }
  .inculva-lang-globe {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0.55;
    color: #4b5563;
  }
  .inculva-lang-globe svg { width: 15px; height: 15px; }
  .inculva-lang-current-flag {
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
  }
  .inculva-lang-current-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .inculva-lang-chevron {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #9ca3af;
    transition: transform 0.2s;
  }
  .inculva-lang-dropdown.open .inculva-lang-chevron { transform: rotate(180deg); }

  /* Dropdown list */
  .inculva-lang-list {
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 12px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
    max-height: 280px;
    overflow-y: auto;
    z-index: 50;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.12) transparent;
    padding: 0 4px 4px;
  }
  .inculva-lang-list::-webkit-scrollbar { width: 4px; }
  .inculva-lang-list::-webkit-scrollbar-track { background: transparent; }
  .inculva-lang-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
  .inculva-lang-dropdown.open .inculva-lang-list { display: block; }
  .inculva-lang-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 10px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    text-align: start;
    transition: background 0.1s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-lang-option:hover { background: #f3f4f6; }
  .inculva-lang-option:focus-visible { background: #f3f4f6; outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-lang-option.active {
    background: rgba(var(--inculva-primary-rgb, 0,102,204), 0.10);
    color: var(--inculva-primary, #0066cc);
    font-weight: 600;
  }
  .inculva-lang-flag {
    font-size: 22px;
    line-height: 1;
    flex-shrink: 0;
    width: 30px;
    text-align: center;
  }
  .inculva-lang-name {
    flex: 1;
    font-size: 14px;
  }
  .inculva-lang-en-name {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 400;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Language search input */
  .inculva-lang-search-wrap {
    padding: 6px 6px 4px;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .inculva-lang-search {
    width: 100%;
    height: 34px;
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 8px;
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    color: #374151;
    background: #f9fafb;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
  }
  .inculva-lang-search:focus {
    border-color: var(--inculva-primary, #0066cc);
    background: #fff;
  }
  .inculva-lang-search::-webkit-search-cancel-button { display: none; }
  .inculva-lang-option.inculva-hidden { display: none !important; }

  /* Size toggle group — full primary color pill so white text is always readable */
  .inculva-size-group {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 11px;
    padding: 3px;
  }
  .inculva-ctrl-btn {
    height: 34px;
    min-width: 34px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: transparent;
    color: rgba(255,255,255,0.72);
    transition: background 0.12s, color 0.12s, transform 0.1s;
    outline: none;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-ctrl-btn:hover {
    background: rgba(255,255,255,0.14);
    color: #fff;
  }
  .inculva-ctrl-btn:active { transform: scale(0.92); }
  .inculva-ctrl-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 1px; }
  /* Text size buttons — wider than icon buttons */
  .inculva-size-btn { padding: 0 13px; }
  .inculva-size-btn.active {
    background: #fff;
    color: var(--inculva-primary, #0066cc);
    box-shadow: 0 1px 6px rgba(0,0,0,0.20);
    font-weight: 700;
  }

  /* ── Profile Section (accordion + card grid) ────────────────────────── */
  .inculva-profiles-section {
    margin: 10px 12px 0;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    flex-shrink: 0;
  }
  .inculva-profiles-toggle {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    background: #fff;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 600;
    color: #111;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background 0.12s;
  }
  .inculva-profiles-toggle > span:nth-child(2) { flex: 1; }
  .inculva-profiles-toggle:hover { background: #f9fafb; }
  .inculva-profiles-toggle:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-profiles-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color: #9ca3af;
  }
  .inculva-profiles-toggle[aria-expanded="true"] .inculva-profiles-arrow {
    transform: rotate(180deg);
  }
  .inculva-profiles-grid {
    border-top: 1px solid rgba(0,0,0,0.07);
    padding: 10px;
  }
  /* Override — grid is the display when visible (hidden attr removed by JS) */
  .inculva-profiles-grid:not([hidden]) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
  .inculva-profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 11px 6px 9px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.10);
    border-radius: 13px;
    cursor: pointer;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 600;
    color: #374151;
    line-height: 1.25;
    text-align: center;
    transition: border-color 0.12s, background 0.12s, box-shadow 0.12s, transform 0.1s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    word-break: break-word;
    hyphens: auto;
  }
  @media (min-width: 785px) {
    .inculva-profile-card:hover {
      border-color: var(--inculva-primary, #0066cc);
      background: rgba(var(--inculva-primary-rgb, 0,102,204), 0.05);
    }
  }
  .inculva-profile-card:active { transform: scale(0.95); }
  .inculva-profile-card:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-profile-card.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
    box-shadow: 0 4px 12px rgba(0,102,204,0.28) !important;
  }
  .inculva-profile-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 9px;
    background: rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .inculva-profile-card.active .inculva-profile-card-icon {
    background: #fff;
    color: #fff;
  }

  /* ── Panel Body (scrollable) ─────────────────────────────────────────── */
  .inculva-panel-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px 12px 0;
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
    gap: 9px;
    margin-bottom: 12px;
  }

  /* ── Feature Button ──────────────────────────────────────────────────── */
  .inculva-feature-btn {
    border: 2px solid rgba(54,54,54,0.12);
    border-radius: var(--inculva-border-radius, 15px);
    padding: 16px 10px 13px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    font-size: 12.5px;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25;
    text-align: center;
    background: #fff;
    color: #000;
    transition: border-color 0.12s, background 0.12s, transform 0.1s, box-shadow 0.12s;
    outline: none;
    min-height: 108px;
    word-break: break-word;
    hyphens: auto;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }
  @media (min-width: 785px) {
    .inculva-feature-btn:hover {
      border-color: var(--inculva-primary, #0066cc);
      background: #fafbff;
      box-shadow: 0 2px 10px rgba(0,102,204,0.12);
      transition: all 0.1s;
    }
  }
  .inculva-feature-btn:active { transform: scale(0.96); }
  .inculva-feature-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
    box-shadow: 0 4px 12px rgba(0,102,204,0.32) !important;
  }
  /* Active state: icon box border matches the active button border (primary color) */
  .inculva-feature-btn.active .inculva-feature-icon-box {
    background: #fff !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }

  /* Icon box — white bg, border matches the feature button border color */
  .inculva-feature-icon-box {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: #fff;
    border: 1.5px solid rgba(54,54,54,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
  }
  .inculva-feature-icon-box svg {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    display: block;
    color: #000;
  }
  .inculva-feature-icon-box svg path,
  .inculva-feature-icon-box svg rect,
  .inculva-feature-icon-box svg circle {
    stroke: #000;
  }
  .inculva-feature-icon-box svg [data-fill="1"] {
    fill: #000;
    stroke: none;
  }
  .inculva-feature-label {
    font-size: 14px;
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
  [data-level="4"] .inculva-level-dot:nth-child(-n+4),
  [data-level="5"] .inculva-level-dot:nth-child(-n+5) {
    background: var(--inculva-primary, #0066cc);
  }
  .inculva-feature-btn.active .inculva-level-dot {
    background: rgba(255,255,255,0.3);
  }
  .inculva-feature-btn.active[data-level="1"] .inculva-level-dot:nth-child(1),
  .inculva-feature-btn.active[data-level="2"] .inculva-level-dot:nth-child(-n+2),
  .inculva-feature-btn.active[data-level="3"] .inculva-level-dot:nth-child(-n+3),
  .inculva-feature-btn.active[data-level="4"] .inculva-level-dot:nth-child(-n+4),
  .inculva-feature-btn.active[data-level="5"] .inculva-level-dot:nth-child(-n+5) {
    background: rgba(255,255,255,0.95);
  }

  /* ── Color Blind Sub-Selector ────────────────────────────────────────── */
  .inculva-cbm-selector {
    grid-column: 1 / -1;
    display: none;
    flex-wrap: wrap;
    gap: 6px;
    padding: 2px 0 4px;
  }
  .inculva-cbm-selector.visible { display: flex; }
  .inculva-cbm-btn {
    flex: 1 1 auto;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 9px;
    padding: 6px 8px;
    font-size: 11.5px;
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

  /* ── Reset Row (legacy — kept for any external references) ──────────── */
  .inculva-reset-row { display: none; }

  /* ── Mini Mode ───────────────────────────────────────────────────────── */
  #inculva-widget-panel[data-size="mini"] {
    width: 86px !important;
    border-radius: 18px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-header,
  #inculva-widget-panel[data-size="mini"] .inculva-profiles-section,
  #inculva-widget-panel[data-size="mini"] .inculva-controls-bar,
  #inculva-widget-panel[data-size="mini"] .inculva-prefooter,
  #inculva-widget-panel[data-size="mini"] .inculva-panel-footer {
    display: none !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-body {
    padding: 8px 6px 0;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid {
    grid-template-columns: 1fr !important;
    gap: 5px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid .inculva-feature-btn:not(.inculva-hidden) {
    display: flex !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn {
    min-height: 62px !important;
    padding: 7px 5px 6px !important;
    border-radius: 13px !important;
    border: 1.5px solid rgba(0,0,0,0.09) !important;
    background: #fff !important;
    gap: 3px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-icon-box {
    width: 38px !important;
    height: 38px !important;
    min-height: 0 !important;
    border-radius: 10px !important;
    border: 1.5px solid rgba(54,54,54,0.12) !important;
    background: #fff !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-icon-box svg {
    width: 20px !important;
    height: 20px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-label { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-cbm-selector  { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-levels {
    width: calc(100% - 8px) !important;
    gap: 2px !important;
    margin-top: 0 !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-level-dot { height: 2px !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-mini-actions  { display: flex !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn.active .inculva-feature-icon-box {
    background: #fff !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }

  /* ── Large Mode ──────────────────────────────────────────────────────── */
  #inculva-widget-panel[data-size="large"] .inculva-feature-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-btn {
    min-height: 128px !important;
    padding: 20px 12px 16px !important;
    gap: 11px !important;
    font-size: 14px !important;
    border-width: 2px !important;
    border-radius: 17px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-icon-box {
    width: 64px !important;
    height: 64px !important;
    border-radius: 17px !important;
    border-width: 1.5px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-icon-box svg {
    width: 32px !important;
    height: 32px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-label { font-size: 14px !important; }
  #inculva-widget-panel[data-size="large"] .inculva-feature-levels {
    width: calc(100% - 22px) !important;
    gap: 4px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-level-dot {
    height: 4px !important;
    border-radius: 2px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-header {
    height: 72px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-title {
    font-size: 18px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-body {
    padding: 14px 14px 0 !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-controls-bar {
    padding: 12px 16px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-controls-row {
    gap: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-lang-trigger {
    height: 40px !important;
    font-size: 15px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-ctrl-btn {
    height: 40px !important;
    font-size: 14px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-size-btn {
    padding: 0 16px !important;
  }
  /* Large mode — profiles section */
  #inculva-widget-panel[data-size="large"] .inculva-profiles-section {
    margin: 12px 14px 0 !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profiles-toggle {
    height: 48px !important;
    font-size: 15px !important;
    padding: 0 16px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profiles-grid {
    gap: 9px !important;
    padding: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card {
    padding: 13px 8px 11px !important;
    font-size: 12.5px !important;
    border-radius: 15px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card-icon {
    width: 40px !important;
    height: 40px !important;
    border-radius: 11px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card-icon svg {
    width: 22px !important;
    height: 22px !important;
  }
  /* Large mode — prefooter */
  #inculva-widget-panel[data-size="large"] .inculva-prefooter {
    padding: 14px 16px !important;
    gap: 10px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-prefooter-reset {
    font-size: 15px !important;
    padding: 12px 20px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-prefooter-a11y {
    font-size: 14px !important;
    padding: 11px 20px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-label {
    font-size: 14px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-track {
    width: 48px !important;
    height: 26px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-thumb {
    width: 22px !important;
    height: 22px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-track.active .inculva-switch-thumb {
    transform: translateX(22px) !important;
  }

  /* Mini actions bar */
  .inculva-mini-actions {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 0 0 18px 18px;
    padding: 18px 14px;
    height: 160px;
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
  .inculva-mini-btn svg { width: 24px; height: 24px; }
  #inculva-widget-panel[data-size="mini"] { padding-bottom: 168px; }

  /* ── Pre-footer action bar ───────────────────────────────────────────── */
  .inculva-prefooter {
    flex-shrink: 0;
    padding: 12px 14px;
    background: #fff;
    border-top: 1px solid #ececec;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .inculva-prefooter-reset {
    width: 100%;
    padding: 10px 16px;
    background: #fff;
    color: #1a1a2e;
    border: 1.5px solid #e4e4e7;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s;
    -webkit-tap-highlight-color: transparent;
    letter-spacing: 0.01em;
  }
  .inculva-prefooter-reset:hover { background: #f7f7f7; border-color: #d1d5db; }
  .inculva-prefooter-reset:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-prefooter-a11y {
    display: block;
    width: 100%;
    padding: 9px 16px;
    background: transparent;
    color: #1a1a2e;
    border: 1.5px solid #d4d4d8;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }
  .inculva-prefooter-a11y:hover { background: #f4f4f5; border-color: #a1a1aa; }
  .inculva-prefooter-a11y:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-prefooter-switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
    gap: 8px;
  }
  .inculva-switch-label {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a2e;
    font-family: inherit;
    flex: 1;
    user-select: none;
  }
  .inculva-switch-track {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 100px;
    background: #e4e4e7;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-switch-track.active { background: var(--inculva-primary, #0066cc); }
  .inculva-switch-track:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.22);
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inculva-switch-track.active .inculva-switch-thumb { transform: translateX(20px); }
  /* OFF state — show ✕ inside thumb */
  .inculva-switch-thumb::after {
    content: '✕';
    font-size: 9px;
    color: #a1a1aa;
    font-weight: 700;
    line-height: 1;
  }
  .inculva-switch-track.active .inculva-switch-thumb::after { content: ''; }

  /* ── Panel Footer — uses primary color as background ─────────────────── */
  .inculva-panel-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    flex-shrink: 0;
    background: var(--inculva-footer-bg, var(--inculva-primary, #0066cc));
    border-top: 1px solid rgba(0,0,0,0.12);
    min-height: 42px;
    border-radius: 0 0 18px 18px;
  }
  .inculva-footer-brand {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.8);
    font-family: inherit;
  }

  /* ── RTL Support ─────────────────────────────────────────────────────── */
  /* direction: rtl from dir="rtl" already reverses flex-direction:row flow. */
  /* We only need to fix directional properties (border-left→right, etc.)   */
  #inculva-widget-panel[dir="rtl"] .inculva-header-actions {
    border-left: none;
    border-right: 1px solid rgba(255,255,255,0.22);
    padding-left: 0;
    padding-right: 14px;
    margin-left: 0;
    margin-right: 6px;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-profiles-toggle { text-align: right; }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-list {
    left: 0;
    right: 0;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-trigger { text-align: right; }
  #inculva-widget-panel[dir="rtl"] .inculva-switch-thumb {
    transform: translateX(20px);
  }
  #inculva-widget-panel[dir="rtl"] .inculva-switch-track.active .inculva-switch-thumb {
    transform: translateX(0);
  }
  #inculva-widget-panel[dir="rtl"] .inculva-prefooter-switch { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-option { text-align: right; }

  /* ── Reduced Motion ──────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    #inculva-widget-btn,
    #inculva-widget-panel,
    .inculva-feature-btn,
    .inculva-header-btn,
    .inculva-ctrl-btn,
    .inculva-feature-icon-box,
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

  /* ── Feature Button Tooltip ──────────────────────────────────────────── */
  #inculva-tooltip {
    position: fixed;
    z-index: 2147483646;
    background: rgba(26,26,46,0.92);
    color: #fff;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    padding: 6px 10px;
    border-radius: 8px;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.15s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.24);
    max-width: 200px;
  }
  #inculva-tooltip.visible { opacity: 1; }
`;
