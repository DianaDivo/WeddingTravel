import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'weddingtravel_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Simplified language initialization for faster startup
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'ru';
    
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'ru' || stored === 'en' || stored === 'be') {
        return stored;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    
    return 'ru'; // Default
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (e) {
      // Ignore errors
    }
  };

  // Optimized translation function
  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }
      
      return typeof value === 'string' ? value : key;
    } catch (e) {
      return key;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
}
