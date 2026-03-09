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
    width: 480px;
    max-height: calc(100vh - 110px); /* JS overrides this via applyPanelPosition; fallback keeps header visible */
    display: flex;
    flex-direction: column;
    border-radius: 20px 0 0 20px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.22), 0 4px 18px rgba(0,0,0,0.13);
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif);
    font-size: 14px;
    line-height: 1.4;
    background: #f7f7f7;
    color: #1a1a2e;
    opacity: 0;
    visibility: hidden;
    transform: translateX(20px) scale(0.98);
    transition: opacity 0.22s ease, visibility 0.22s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
  }
  #inculva-widget-panel.open {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  /* Panel positioned on left side */
  #inculva-widget-panel[data-panel-side="left"] {
    border-radius: 0 20px 20px 0;
    transform: translateX(-20px) scale(0.98);
  }
  #inculva-widget-panel[data-panel-side="left"].open {
    transform: none;
  }

  @media (max-width: 575px) {
    #inculva-widget-panel {
      width: 97vw !important;
      border-radius: 20px !important;
    }
  }

  /* ── XL mode: 2-column wider tiles ─────────────────────────────────── */
  #inculva-widget-panel[data-size="xl"] {
    width: 480px;
  }
  #inculva-widget-panel[data-size="xl"] .inculva-feature-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
  #inculva-widget-panel[data-size="xl"] .inculva-feature-btn {
    min-height: 120px !important;
    font-size: 13px !important;
    gap: 10px !important;
  }
  #inculva-widget-panel[data-size="xl"] .inculva-feature-icon-box {
    width: 60px !important;
    height: 60px !important;
  }
  #inculva-widget-panel[data-size="xl"] .inculva-feature-icon-box svg {
    width: 26px !important;
    height: 26px !important;
  }

  /* ── Mini mode: icon-only narrow column ─────────────────────────────── */
  #inculva-widget-panel[data-size="mini"] {
    width: 82px !important;
    border-radius: 20px 0 0 20px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-header,
  #inculva-widget-panel[data-size="mini"] .inculva-size-bar,
  #inculva-widget-panel[data-size="mini"] .inculva-profiles-section,
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
  #inculva-widget-panel[data-size="mini"] .inculva-cbm-selector { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-mini-actions { display: flex !important; }
  @media (max-width: 1024px) {
    #inculva-widget-panel[data-size="mini"] { padding-bottom: 164px; }
  }

  /* ── Panel Header (primary-color background) ─────────────────────────── */
  .inculva-panel-header {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 15px;
    height: 80px;
    flex-shrink: 0;
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    cursor: default;
    user-select: none;
  }
  .inculva-panel-header-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(255,255,255,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .inculva-panel-title {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    color: #fff;
    font-family: inherit;
  }
  .inculva-active-count {
    background: rgba(255,255,255,0.22);
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .inculva-header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .inculva-header-btn {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: rgba(255,255,255,0.18);
    color: #fff;
    transition: background 0.15s, transform 0.15s;
    outline: none;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-header-btn:hover { background: rgba(255,255,255,0.30); }
  .inculva-header-btn:active { transform: scale(0.92); }
  .inculva-header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 1px; }

  /* ── Size Bar ────────────────────────────────────────────────────────── */
  .inculva-size-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px 12px;
    flex-shrink: 0;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .inculva-size-btn {
    flex: 1;
    border: 1px solid rgba(0,0,0,0.18);
    border-radius: 18px;
    padding: 7px 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    color: #1a1a2e;
    background: transparent;
    transition: all 0.15s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    text-align: center;
  }
  .inculva-size-btn:hover { background: #f0f0f5; }
  .inculva-size-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-size-btn.active {
    background: var(--inculva-primary, #0066cc);
    border-color: var(--inculva-primary, #0066cc);
    color: #fff;
    font-weight: 600;
  }

  /* ── Panel Body (scrollable) ─────────────────────────────────────────── */
  .inculva-panel-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 11px 11px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.15) transparent;
    background: #f7f7f7;
  }
  .inculva-panel-body::-webkit-scrollbar { width: 4px; }
  .inculva-panel-body::-webkit-scrollbar-track { background: transparent; }
  .inculva-panel-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 4px; }

  /* ── Profiles Section ────────────────────────────────────────────────── */
  .inculva-profiles-section {
    margin-bottom: 12px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
  }
  .inculva-profiles-toggle {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px;
    background: #fff;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #1a1a2e;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background 0.15s;
  }
  .inculva-profiles-toggle:hover { background: #f5f5f7; }
  .inculva-profiles-toggle:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-profiles-toggle > span:first-of-type { flex: 1; }
  .inculva-profiles-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color: #6b7280;
  }
  .inculva-profiles-toggle[aria-expanded="true"] .inculva-profiles-arrow {
    transform: rotate(180deg);
  }
  .inculva-profiles-list {
    border-top: 1px solid rgba(0,0,0,0.08);
    padding: 4px 0 8px;
    background: #fff;
  }
  .inculva-profile-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    border: none;
    background: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #1a1a2e;
    text-align: left;
    transition: background 0.12s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-profile-item:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.06); }
  .inculva-profile-item:hover { background: #f5f5f7; }
  .inculva-profile-item:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-profile-item.active { background: var(--inculva-primary, #0066cc); color: #fff; }
  .inculva-profile-item.active .inculva-profile-close { color: #fff; opacity: 0.85; }
  .inculva-profile-left {
    display: flex;
    align-items: center;
    gap: 13px;
  }
  .inculva-profile-close {
    display: flex;
    align-items: center;
    opacity: 0.4;
    flex-shrink: 0;
  }

  /* ── Feature Grid ────────────────────────────────────────────────────── */
  .inculva-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }

  /* ── Feature Button ──────────────────────────────────────────────────── */
  .inculva-feature-btn {
    border: 2px solid rgba(54,54,54,0.1);
    border-radius: 16px;
    padding: 12px 6px 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25;
    text-align: center;
    background: #fff;
    color: #434350;
    transition: border-color 0.12s, background 0.12s, transform 0.1s, box-shadow 0.12s;
    outline: none;
    min-height: 90px;
    word-break: break-word;
    hyphens: auto;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }
  @media (min-width: 785px) {
    .inculva-feature-btn:hover {
      border-color: var(--inculva-primary, #0066cc);
      transition: all 0.1s;
    }
  }
  .inculva-feature-btn:active { transform: scale(0.97); }
  .inculva-feature-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
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
    width: 48px;
    height: 48px;
    border-radius: 13px;
    background: #f5f5f7;
    border: 1px solid rgba(234,233,245,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.12s;
  }
  .inculva-feature-icon-box svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    display: block;
  }
  .inculva-feature-label {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.25;
    font-family: inherit;
  }

  /* ── Level Indicator (segmented bar below label) ─────────────────────────── */
  .inculva-feature-levels {
    display: flex;
    gap: 3px;
    width: calc(100% - 16px);
    margin-top: 2px;
  }
  .inculva-level-dot {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(67,67,80,0.14);
    transition: background 0.15s;
  }
  /* Inactive button: filled dots use primary colour */
  [data-level="1"] .inculva-level-dot:nth-child(1),
  [data-level="2"] .inculva-level-dot:nth-child(-n+2),
  [data-level="3"] .inculva-level-dot:nth-child(-n+3),
  [data-level="4"] .inculva-level-dot:nth-child(-n+4) {
    background: var(--inculva-primary, #0066cc);
  }
  /* Active button: all dots baseline white/semi, filled dots solid white */
  .inculva-feature-btn.active .inculva-level-dot {
    background: rgba(255,255,255,0.35);
  }
  .inculva-feature-btn.active[data-level="1"] .inculva-level-dot:nth-child(1),
  .inculva-feature-btn.active[data-level="2"] .inculva-level-dot:nth-child(-n+2),
  .inculva-feature-btn.active[data-level="3"] .inculva-level-dot:nth-child(-n+3),
  .inculva-feature-btn.active[data-level="4"] .inculva-level-dot:nth-child(-n+4) {
    background: rgba(255,255,255,0.95);
  }
  /* Hide level bar in mini mode */
  #inculva-widget-panel[data-size="mini"] .inculva-feature-levels { display: none !important; }

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
    color: #434350;
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
  .inculva-reset-row { padding-bottom: 8px; }
  .inculva-reset-btn {
    width: 100%;
    border: none;
    border-radius: 18px;
    padding: 10px 14px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #fff;
    color: #434350;
    transition: opacity 0.15s, background 0.15s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .inculva-reset-btn:hover { opacity: 0.82; }
  .inculva-reset-btn:active { transform: scale(0.98); }
  .inculva-reset-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }

  /* ── Mini Mode Action Buttons ────────────────────────────────────────── */
  .inculva-mini-actions {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 0 0 0 20px;
    padding: 20px 15px;
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
  .inculva-mini-btn svg { width: 24px; height: 24px; }

  /* ── Panel Footer (primary-color background) ─────────────────────────── */
  .inculva-panel-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px 18px;
    flex-shrink: 0;
    background: var(--inculva-primary, #0066cc);
    color: rgba(255,255,255,0.8);
    gap: 8px;
    min-height: 64px;
  }
  .inculva-footer-brand {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    font-family: inherit;
  }
  .inculva-footer-brand svg { opacity: 0.85; }
  .inculva-a11y-link {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
    color: rgba(255,255,255,0.75);
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-a11y-link:hover { color: #fff; }
  .inculva-a11y-link:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 2px; border-radius: 2px; }

  /* ── RTL Support ─────────────────────────────────────────────────────── */
  #inculva-widget-panel[dir="rtl"] .inculva-panel-header { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-header-actions { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-profiles-toggle { flex-direction: row-reverse; }

  /* ── Reduced Motion ──────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    #inculva-widget-btn,
    #inculva-widget-panel,
    .inculva-feature-btn,
    .inculva-header-btn,
    .inculva-feature-icon-box {
      transition: none !important;
      animation: none !important;
    }
  }

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
