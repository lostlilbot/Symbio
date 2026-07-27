"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Language = "en" | "es";

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: {},
  es: {},
};

let enCache: Translations | null = null;
let esCache: Translations | null = null;

async function loadTranslations(lang: Language): Promise<Translations> {
  if (lang === "en") {
    if (enCache) return enCache;
    const mod = await import("./translations/en.json");
    enCache = mod.default || mod;
    return enCache;
  }
  if (esCache) return esCache;
  const mod = await import("./translations/es.json");
  esCache = mod.default || mod;
  return esCache;
}

function getValue(translations: Translations, key: string): string | undefined {
  return key.split(".").reduce<unknown>((acc, part) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined), translations) as string | undefined;
}

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, defaultLanguage = "en" }: { children: ReactNode; defaultLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translationsMap, setTranslationsMap] = useState<Record<Language, Translations>>({
    en: {},
    es: {},
  });

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    const data = await loadTranslations(lang);
    setTranslationsMap((prev) => ({ ...prev, [lang]: data }));
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const current = translationsMap[language];
      if (!current || Object.keys(current).length === 0) {
        return fallback || key;
      }
      const value = getValue(current, key);
      return value || fallback || key;
    },
    [language, translationsMap]
  );

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
