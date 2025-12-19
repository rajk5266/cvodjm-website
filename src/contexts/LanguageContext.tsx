"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const SUPPORTED_LANGUAGES = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    dir: "ltr",
  },
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type LanguageConfig = typeof SUPPORTED_LANGUAGES[Language];

interface LanguageContextType {
  language: Language;
  languageConfig: LanguageConfig;
  setLanguage: (lang: Language) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale: string;
}

export const LanguageProvider = ({ children, defaultLocale }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(
    defaultLocale in SUPPORTED_LANGUAGES ? (defaultLocale as Language) : "en"
  );

  // Update <html dir=""> on language change
  useEffect(() => {
    document.documentElement.dir = SUPPORTED_LANGUAGES[language].dir;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Optional: sync with URL
    window.history.pushState({}, "", `/${lang}`);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        languageConfig: SUPPORTED_LANGUAGES[language],
        setLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
