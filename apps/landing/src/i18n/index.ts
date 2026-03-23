import { en } from './en';
import { tr } from './tr';
import type { Translations } from './en';
import { type Lang, defaultLang } from './utils';

export { getLangFromUrl, getLocalizedPath, getAlternateLanguage, getPathWithoutLang, languages, defaultLang } from './utils';
export type { Lang } from './utils';
export type { Translations } from './en';

const translations: Record<Lang, Translations> = { en, tr };

export function t(lang: Lang): Translations {
  return translations[lang] ?? translations[defaultLang];
}
