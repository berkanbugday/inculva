import { defineConfig, type Plugin } from "vite";
import { resolve } from "path";
import { readFileSync, copyFileSync, cpSync, mkdirSync, readdirSync } from "fs";

const managePublicDir = resolve(__dirname, "../../apps/manage/public");
const fontsDir = resolve(__dirname, "public/fonts");

/**
 * Embeds OpenDyslexic Regular + Bold WOFF2 binary data into a virtual module
 * as base64 strings. The runtime uses these with the FontFace JavaScript API
 * (ArrayBuffer path) — no URL is ever involved, so font-src CSP on customer
 * sites is completely bypassed regardless of how strict their policy is.
 *
 * CSS @font-face with data: URIs was NOT sufficient because browsers still
 * check data: against font-src and customer sites don't include data: there.
 */
function openDyslexicFontsPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:opendyslexic-fonts";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;

  return {
    name: "opendyslexic-fonts",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;

      const regular = readFileSync(
        resolve(fontsDir, "OpenDyslexic-Regular.woff2"),
      ).toString("base64");
      const bold = readFileSync(
        resolve(fontsDir, "OpenDyslexic-Bold.woff2"),
      ).toString("base64");

      return [
        `export const OPENDYSLEXIC_REGULAR_B64 = ${JSON.stringify(regular)};`,
        `export const OPENDYSLEXIC_BOLD_B64    = ${JSON.stringify(bold)};`,
      ].join("\n");
    },
  };
}

/**
 * Loads brand-logo.png at build time, encodes it as a base64 data URI, and
 * exposes it via a virtual module. Keeps the widget fully self-contained —
 * no external URL is ever needed at runtime on customer sites.
 */
function brandSvgPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:brand-svg";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  const pngSrc = resolve(__dirname, "../../apps/landing/public/brand-logo.png");

  return {
    name: "brand-svg",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const b64 = readFileSync(pngSrc).toString("base64");
      const dataUri = `data:image/png;base64,${b64}`;
      return `export const BRAND_LOGO_PNG = ${JSON.stringify(dataUri)};`;
    },
  };
}

/**
 * Embeds all SVG icons from public/icons directory as inline SVG strings.
 * This keeps the widget fully self-contained without needing external icon files.
 */
function iconsPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:icons";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  const iconsDir = resolve(__dirname, "public/icons");

  return {
    name: "icons",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;

      const iconFiles = readdirSync(iconsDir).filter((f) => f.endsWith(".svg"));
      const icons: Record<string, string> = {};

      for (const file of iconFiles) {
        const name = file.replace(".svg", "");
        const content = readFileSync(resolve(iconsDir, file), "utf-8");
        icons[name] = content;
      }

      return `export const ICONS = ${JSON.stringify(icons, null, 2)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    openDyslexicFontsPlugin(),
    brandSvgPlugin(),
    iconsPlugin(),
    {
      name: "copy-to-manage-public",
      closeBundle() {
        try {
          mkdirSync(managePublicDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "dist/widget.iife.js"),
            resolve(managePublicDir, "widget.js"),
          );
          // Keep static font files for direct CDN delivery (e.g. non-widget usage)
          cpSync(fontsDir, resolve(managePublicDir, "fonts"), {
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
      },
    },
    minify: "esbuild",
    sourcemap: true,
    target: "es2018",
  },
});
