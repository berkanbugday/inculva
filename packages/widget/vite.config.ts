import { defineConfig, type Plugin } from "vite";
import { resolve } from "path";
import { readFileSync, copyFileSync, cpSync, mkdirSync, readdirSync } from "fs";

const managePublicDir = resolve(__dirname, "../../apps/manage/public");
const fontsDir = resolve(__dirname, "public/fonts");
const iconsDir = resolve(__dirname, "public/icons");

/**
 * Loads logo.png at build time, encodes it as a base64 data URI, and
 * exposes it via a virtual module. Keeps the widget fully self-contained —
 * no external URL is ever needed at runtime on customer sites.
 */
function logoSvgPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:logo-svg";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  const pngSrc = resolve(__dirname, "../../apps/landing/public/logo-dark.png");

  return {
    name: "logo-svg",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const b64 = readFileSync(pngSrc).toString("base64");
      const dataUri = `data:image/png;base64,${b64}`;
      return `export const LOGO_PNG = ${JSON.stringify(dataUri)};`;
    },
  };
}

function logoIconSvgPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:logo-icon-svg";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  const pngSrc = resolve(
    __dirname,
    "../../apps/landing/public/logo-icon-dark.png",
  );

  return {
    name: "logo-icon-svg",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const b64 = readFileSync(pngSrc).toString("base64");
      const dataUri = `data:image/png;base64,${b64}`;
      return `export const LOGO_ICON_PNG = ${JSON.stringify(dataUri)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    logoSvgPlugin(),
    logoIconSvgPlugin(),
    {
      name: "copy-to-manage-public",
      closeBundle() {
        try {
          mkdirSync(managePublicDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "dist/widget.iife.js"),
            resolve(managePublicDir, "widget.js"),
          );
          // Copy fonts and icons for CDN delivery
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
      },
    },
    minify: "esbuild",
    sourcemap: true,
    target: "es2018",
  },
});
