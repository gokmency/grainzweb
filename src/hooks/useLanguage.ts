import { useState, useEffect } from 'react';

export const setGlobalLanguage = (newLang: 'en' | 'tr') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('grainz_language_pref', newLang);
    window.dispatchEvent(new CustomEvent('grainz_language_change', { detail: newLang }));
  }
};

export const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'tr'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grainz_language_pref');
      if (saved === 'en' || saved === 'tr') return saved;

      const nav = navigator as unknown as { userLanguage?: string };
      const browserLang = navigator.language || nav.userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('tr')) return 'tr';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    const checkAndSetLanguage = () => {
      if (localStorage.getItem('grainz_language_pref')) return;
      const nav = navigator as unknown as { userLanguage?: string };
      const browserLang = navigator.language || nav.userLanguage;
      const newLang = browserLang && browserLang.toLowerCase().startsWith('tr') ? 'tr' : 'en';
      setLang(newLang);
    };

    window.addEventListener('languagechange', checkAndSetLanguage);
    window.addEventListener('grainz_language_change', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languagechange', checkAndSetLanguage);
      window.removeEventListener('grainz_language_change', handleLanguageChange as EventListener);
    };
  }, []);

  return lang;
};
