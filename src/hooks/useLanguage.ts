import { useState, useEffect } from 'react';

const LANGUAGE_KEY = 'grainz_language_pref';

let currentLang: 'en' | 'tr' = 'en';
const listeners = new Set<(lang: 'en' | 'tr') => void>();

const getInitialLanguage = (): 'en' | 'tr' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'tr') {
      return saved;
    }
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
      return 'tr';
    }
  }
  return 'en';
};

currentLang = getInitialLanguage();

export const setGlobalLanguage = (lang: 'en' | 'tr') => {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, lang);
  }
  listeners.forEach(listener => listener(currentLang));
};

export const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'tr'>(currentLang);

  useEffect(() => {
    const checkAndSetLanguage = () => {
      if (!localStorage.getItem(LANGUAGE_KEY)) {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        setGlobalLanguage(browserLang && browserLang.toLowerCase().startsWith('tr') ? 'tr' : 'en');
      }
    };

    window.addEventListener('languagechange', checkAndSetLanguage);
    listeners.add(setLang);

    return () => {
      window.removeEventListener('languagechange', checkAndSetLanguage);
      listeners.delete(setLang);
    };
  }, []);

  return lang;
};
