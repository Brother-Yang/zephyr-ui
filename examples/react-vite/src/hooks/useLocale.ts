import { useState, useEffect } from 'react';
import { zhCN, enUS } from '@zephyr/ui';
import type { Language } from '../types';

export const useLocale = () => {
  const [locale, setLocale] = useState(zhCN);
  const [language, setLanguage] = useState<Language>('zh');
  
  useEffect(() => {
    const savedLang = localStorage.getItem('zephyr-language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      setLocale(savedLang === 'en' ? enUS : zhCN);
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    setLocale(newLang === 'en' ? enUS : zhCN);
    localStorage.setItem('zephyr-language', newLang);
  };
  
  return { locale, language, toggleLanguage };
};