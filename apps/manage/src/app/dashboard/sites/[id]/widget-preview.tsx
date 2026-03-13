"use client";

import { useMemo } from "react";

interface PreviewConfig {
  siteId: string;
  position: string;
  theme: string;
  primaryColor: string;
}

interface Props {
  config: PreviewConfig;
}

function buildPreviewHtml(config: PreviewConfig): string {
  const bgColor = config.theme === "dark" ? "#1a1a2e" : "#f9fafb";
  const textColor = config.theme === "dark" ? "#eee" : "#333";

  // Must be an absolute URL — srcdoc iframes have no URL to resolve relative
  // paths against even with allow-same-origin.
  const widgetSrc = process.env.NEXT_PUBLIC_WIDGET_URL!;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

  const previewConfig = JSON.stringify({
    siteId: config.siteId,
    position: config.position,
    theme: config.theme,
    primaryColor: config.primaryColor,
  });

  return `<!DOCTYPE html>
<html lang="en" data-inculva-theme="${config.theme === "auto" ? "light" : config.theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: ${bgColor};
      color: ${textColor};
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
    }
    h1 { font-size: 18px; font-weight: 700; opacity: 0.8; }
    p { font-size: 13px; opacity: 0.5; max-width: 240px; line-height: 1.5; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: ${config.primaryColor}; display: inline-block; margin: 0 2px; animation: pulse 1.5s ease-in-out infinite; }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  </style>
</head>
<body>
  <h1>Preview</h1>
  <p>Click the accessibility button to try the widget</p>
  <div>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>

  <script>
    window.INCULVA_API_URL = ${JSON.stringify(apiUrl)};
    window.__INCULVA_PREVIEW_CONFIG__ = ${previewConfig};
  </script>
  <script src="${widgetSrc}" data-site-id="${config.siteId}"></script>
</body>
</html>`;
}

export function WidgetPreview({ config }: Props) {
  const srcdoc = useMemo(
    () => buildPreviewHtml(config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.siteId, config.position, config.theme, config.primaryColor],
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-gray-400 font-mono ml-2">Live Preview</span>
      </div>
      {/*
        allow-same-origin is required for the widget to work inside the srcdoc
        iframe: without it the document has a null/opaque origin which blocks
        sessionStorage, makes fetch CORS-preflight fail with Origin: null, and
        prevents external scripts from reading document.currentScript.
        The widget script is our own code and does not access window.parent,
        so there is no sandbox-escape risk.
      */}
      <iframe
        title="Widget Preview"
        className="w-full"
        style={{ height: "420px", border: "none" }}
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcdoc}
      />
    </div>
  );
}
