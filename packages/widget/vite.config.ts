import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

const managePublicDir = resolve(__dirname, "../../apps/manage/public");

export default defineConfig({
  plugins: [
    {
      name: "copy-to-manage-public",
      closeBundle() {
        try {
          mkdirSync(managePublicDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "dist/widget.iife.js"),
            resolve(managePublicDir, "widget.js"),
          );
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
