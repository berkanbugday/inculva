export const widgetStyles = `
  :root {
    --inculva-border-radius: 8px;
    --inculva-button-size: 52px;
    --inculva-font: inherit;
  }
  #inculva-widget-btn {
    position: fixed !important;
    z-index: 999999 !important;
    width: var(--inculva-button-size, 52px);
    height: var(--inculva-button-size, 52px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    transition: transform 0.2s, box-shadow 0.2s;
    outline: none;
  }
  #inculva-widget-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(0,0,0,0.24);
  }
  #inculva-widget-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }
  #inculva-widget-panel {
    position: fixed !important;
    z-index: 999999 !important;
    width: 320px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: var(--inculva-border-radius, 16px);
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    padding: 0;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: 14px;
    display: none;
  }
  #inculva-widget-panel.open {
    display: block;
  }
  .inculva-panel-header {
    padding: 16px 20px;
    font-weight: 700;
    font-size: 16px;
    border-radius: 16px 16px 0 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .inculva-panel-body {
    padding: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .inculva-feature-btn {
    border: none;
    border-radius: 10px;
    padding: 12px 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    transition: opacity 0.15s, transform 0.15s;
    outline: none;
  }
  .inculva-feature-btn:hover {
    opacity: 0.85;
  }
  .inculva-feature-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  .inculva-feature-btn.active {
    font-weight: 700;
  }
  .inculva-feature-icon {
    font-size: 22px;
    line-height: 1;
  }
  .inculva-panel-footer {
    padding: 10px 20px;
    font-size: 11px;
    text-align: center;
    border-radius: 0 0 16px 16px;
    opacity: 0.6;
  }

  /* Themes */
  [data-inculva-theme="light"] #inculva-widget-panel {
    background: #ffffff;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-panel-header {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="light"] .inculva-feature-btn {
    background: #f4f4f5;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="light"] .inculva-panel-footer {
    background: #f4f4f5;
    color: #555;
  }

  [data-inculva-theme="dark"] #inculva-widget-panel {
    background: #1a1a2e;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-panel-header {
    background: #16213e;
    color: #fff;
    border-bottom: 1px solid #0f3460;
  }
  [data-inculva-theme="dark"] .inculva-feature-btn {
    background: #16213e;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="dark"] .inculva-panel-footer {
    background: #16213e;
    color: #999;
  }

  /* RTL layout */
  #inculva-widget-panel[dir="rtl"] .inculva-panel-header {
    flex-direction: row-reverse;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-feature-btn {
    text-align: right;
  }

  /* EAA accessibility statement link */
  .inculva-a11y-link {
    display: inline-block;
    margin-top: 4px;
    font-size: 10px;
    text-decoration: underline;
    color: inherit;
    opacity: 0.8;
  }
  .inculva-a11y-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Color blind mode sub-selector */
  .inculva-cbm-selector {
    grid-column: 1 / -1;
    display: none;
    flex-wrap: wrap;
    gap: 6px;
    padding: 4px 0 2px;
  }
  .inculva-cbm-selector.visible {
    display: flex;
  }
  .inculva-cbm-btn {
    flex: 1 1 auto;
    border: none;
    border-radius: 8px;
    padding: 6px 4px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition: opacity 0.15s;
  }
  .inculva-cbm-btn:hover { opacity: 0.8; }
  .inculva-cbm-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  [data-inculva-theme="light"] .inculva-cbm-btn {
    background: #e8e8ea;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    font-weight: 700;
  }
  [data-inculva-theme="dark"] .inculva-cbm-btn {
    background: #0f3460;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    font-weight: 700;
  }

  /* Screen-reader-only live region */
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


