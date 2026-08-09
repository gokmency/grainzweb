import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    // Only access navigator in browser environment
    if (typeof navigator === 'undefined') return;

    const checkAndSetLanguage = () => {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
        setLang('tr');
      } else {
        setLang('en');
      }
    };

    // Initial check
    checkAndSetLanguage();

    // Listen for language changes
    window.addEventListener('languagechange', checkAndSetLanguage);

    return () => {
      window.removeEventListener('languagechange', checkAndSetLanguage);
    };
  }, []);

  return lang;
};
