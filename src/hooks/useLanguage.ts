import { useState, useEffect } from "react";

// Available locales
type Locale = "en" | "gu";

// This hook assumes you'll store current language in localStorage or URL param
export function useLanguage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<Record<string, string>>({});

  // Load messages dynamically based on locale
  useEffect(() => {
    import(`../locales/${locale}/about.json`).then((module) => {
      setMessages(module);
    });
  }, [locale]);

  function t(key: string) {
    return messages[key] || key; // fallback to key if missing
  }

  return { t, locale, setLocale };
}
