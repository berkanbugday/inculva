import { defineConfig, type Plugin } from "vite";
import { resolve } from "path";
import { copyFileSync, cpSync, mkdirSync } from "fs";

const isCdn = process.env["BUILD_TARGET"] === "cdn";

const managePublicDir = resolve(__dirname, "../../apps/manage/public");
const fontsDir = resolve(__dirname, "public/fonts");
const iconsDir = resolve(__dirname, "public/icons");

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
        return `export const LOGO_PNG = "https://cdn.inculva.com/logos/logo.png";`;
      if (id === "\0virtual:logo-icon-svg")
        return `export const LOGO_ICON_PNG = "https://cdn.inculva.com/logos/logo-icon.png";`;
    },
  };
}

export default defineConfig({
  plugins: [
    logoCdnPlugin(),
    {
      name: "copy-to-manage-public",
      closeBundle() {
        try {
          mkdirSync(managePublicDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "dist/widget.js"),
            resolve(managePublicDir, "widget.js"),
          );
          cpSync(fontsDir, resolve(managePublicDir, "fonts"), {
            recursive: true,
          });
          cpSync(iconsDir, resolve(managePublicDir, "icons"), {
            recursive: true,
          });
        } catch {
          // non-fatal: manage app may not be present in all environments
        }
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "InculvaWidget",
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
