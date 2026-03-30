import { defineConfig, loadEnv, type Plugin } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

const isCdn = process.env["BUILD_TARGET"] === "cdn";

// Load .env from monorepo root so VITE_CDN_URL / VITE_API_URL are available
// regardless of which directory `vite build` is invoked from.
const env = loadEnv("", resolve(__dirname, "../.."), "");
const cdnUrl = env["VITE_CDN_URL"]!;
const apiUrl = env["VITE_API_URL"]!;

const managePublicDir = resolve(__dirname, "../../apps/manage/public");

/** Exposes logo URLs via virtual modules — served from CDN, not embedded. */
function logoCdnPlugin(): Plugin {
  return {
    name: "logo-cdn",
    resolveId(id) {
      if (id === "virtual:logo-svg") return "\0virtual:logo-svg";
      if (id === "virtual:logo-icon-svg") return "\0virtual:logo-icon-svg";
    },
    load(id) {
      if (id === "\0virtual:logo-svg")
        return `export const LOGO_PNG = "${cdnUrl}/logos/logo.png";`;
      if (id === "\0virtual:logo-icon-svg")
        return `export const LOGO_ICON_PNG = "${cdnUrl}/logos/logo-icon.png";`;
    },
  };
}

export default defineConfig({
  plugins: [
    logoCdnPlugin(),
    // In local dev builds (non-CDN), copy widget.js to apps/manage/public so
    // the Next.js dev server can serve it at http://localhost:3000/widget.js.
    !isCdn && {
      name: "copy-to-manage-public",
      closeBundle() {
        try {
          mkdirSync(managePublicDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "dist/widget.js"),
            resolve(managePublicDir, "widget.js"),
          );
        } catch {
          // non-fatal — manage app may not be present in CI
        }
      },
    },
  ].filter(Boolean) as Plugin[],
  define: {
    __CDN_URL__: JSON.stringify(cdnUrl),
    __API_URL__: JSON.stringify(apiUrl),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "inculvaWidget",
      fileName: "widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: "widget.js",
      },
    },
    minify: "esbuild",
    // CDN builds skip the source map — saves ~350 kB from the deployed artifact.
    // Local builds keep it for debugging.
    sourcemap: isCdn ? false : true,
    target: "es2018",
  },
});
