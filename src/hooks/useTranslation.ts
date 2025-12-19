// hooks/useTranslation.ts
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function useTranslation(section: string) {
  const { language } = useLanguage();
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTranslation() {
      try {
        // Dynamic import based on language and section
        const translationModule = await import(`@/locales/${language}/${section}.json`);
        if (isMounted) setT(translationModule.default);
      } catch (err) {
        console.error('Translation not found, fallback to English', err);
        const fallback = await import(`@/locales/en/${section}.json`);
        if (isMounted) setT(fallback.default);
      }
    }

    loadTranslation();

    return () => {
      isMounted = false;
    };
  }, [language, section]);

  return t;
}
