export const languages = {
  en: 'English',
  tr: 'Türkçe',
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\/(en|tr)/, '') || '/';
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getAlternateLanguage(lang: Lang): Lang {
  return lang === 'en' ? 'tr' : 'en';
}

export function getPathWithoutLang(pathname: string): string {
  return pathname.replace(/^\/(en|tr)/, '') || '/';
}
