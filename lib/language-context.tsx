'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Language } from './types';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const t = useCallback((en: string, hi: string) => (lang === 'hi' ? hi : en), [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
