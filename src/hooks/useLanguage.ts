import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    // Only access navigator in browser environment
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
        setLang('tr');
      } else {
        setLang('en');
      }
    }
  }, []);

  return lang;
};
