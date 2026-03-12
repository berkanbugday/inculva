#!/usr/bin/env node
/**
 * Extracts translations from translations.ts and writes one JSON file per language.
 * Output: public/i18n/{lang}.json and apps/manage/public/i18n/{lang}.json
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

// Write output
const outDir = resolve(root, "public/i18n");
const manageOutDir = resolve(root, "../../apps/manage/public/i18n");

mkdirSync(outDir, { recursive: true });
mkdirSync(manageOutDir, { recursive: true });

let count = 0;
for (const [lang, data] of Object.entries(langs)) {
  const json = JSON.stringify(data);
  writeFileSync(resolve(outDir, `${lang}.json`), json);
  writeFileSync(resolve(manageOutDir, `${lang}.json`), json);
  count++;
}

console.log(`Extracted ${count} language files to public/i18n/ and apps/manage/public/i18n/`);
