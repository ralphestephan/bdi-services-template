export const languages = ['en', 'ar'] as const;
export type Language = typeof languages[number];

export const defaultLanguage = 'en';

export const languageNames = {
  en: 'English',
  ar: 'العربية',
} as const;

export const languageDirections = {
  en: 'ltr',
  ar: 'rtl',
} as const;

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split('/');
  const langSegment = segments[1];
  return languages.includes(langSegment as Language) 
    ? langSegment as Language 
    : defaultLanguage;
}

export function getLanguagePath(path: string, lang: Language): string {
  if (lang === defaultLanguage) return path;
  return `/${lang}${path}`;
}