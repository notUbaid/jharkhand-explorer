import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en-comprehensive.json';
import hi from '../locales/hi-comprehensive.json';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Force reload and clear cache
    initImmediate: false,
    load: 'languageOnly',
    saveMissing: true,

    interpolation: {
      escapeValue: false,
    },
  });

// Clear translation cache on load
if (typeof window !== 'undefined') {
  localStorage.removeItem('i18nextLng');
  localStorage.removeItem('i18next');
}

export default i18n;

