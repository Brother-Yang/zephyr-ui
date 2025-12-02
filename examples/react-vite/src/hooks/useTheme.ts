import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('zephyr-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('zephyr-theme', newTheme);
  };
  
  return { theme, toggleTheme };
};