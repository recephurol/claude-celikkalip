export const locales = ["tr", "en", "de", "ru", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Turkce",
  en: "English",
  de: "Deutsch",
  ru: "Russkiy",
  fr: "Francais",
};

export const localeFlags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  ru: "🇷🇺",
  fr: "🇫🇷",
};
