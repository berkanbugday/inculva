import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://inculva.com",
  integrations: [tailwind(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: true,
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
