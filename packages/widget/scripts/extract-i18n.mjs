#!/usr/bin/env node
/**
 * Extracts translations from translations.ts and writes one JSON file per language.
 * Output: public/i18n/{lang}.json
 * Also copies to apps/manage/public/i18n/ for local dev (non-CDN builds only).
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Read translations.ts source
const src = readFileSync(resolve(root, "src/ui/translations.ts"), "utf-8");

// Extract languages by parsing the exported object.
// Each language entry looks like:  langCode: { key: "value", ... },
// The regex handles multi-line blocks with nested braces.
const langBlockRegex = /^\s{2}([a-z]{2}(?:-[a-z]{2})?): \{([\s\S]*?)\},?\s*$/gm;
const keyValRegex = /(\w+):\s*"((?:[^"\\]|\\.)*)"/g;

const langs = {};

let match;
while ((match = langBlockRegex.exec(src)) !== null) {
  const langCode = match[1];
  const body = match[2];
  const translations = {};
  let kv;
  keyValRegex.lastIndex = 0;
  while ((kv = keyValRegex.exec(body)) !== null) {
    translations[kv[1]] = kv[2].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (Object.keys(translations).length > 0) {
    langs[langCode] = translations;
  }
}

const isCdn = process.env["BUILD_TARGET"] === "cdn";

// Write output
const outDir = resolve(root, "public/i18n");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [lang, data] of Object.entries(langs)) {
  const json = JSON.stringify(data);
  writeFileSync(resolve(outDir, `${lang}.json`), json);
  count++;
}

// In local dev builds (non-CDN), also copy to apps/manage/public so the
// Next.js dev server can serve them at http://localhost:3000/i18n/*.json.
if (!isCdn) {
  const manageOutDir = resolve(root, "../../apps/manage/public/i18n");
  mkdirSync(manageOutDir, { recursive: true });
  for (const [lang, data] of Object.entries(langs)) {
    writeFileSync(resolve(manageOutDir, `${lang}.json`), JSON.stringify(data));
  }
  console.log(`Extracted ${count} language files to public/i18n/ and apps/manage/public/i18n/`);
} else {
  console.log(`Extracted ${count} language files to public/i18n/`);
}
