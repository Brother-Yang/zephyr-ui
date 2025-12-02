import React from 'react';
import { Button } from '@zephyr/ui';
import { Sun, Moon, Languages } from 'lucide-react';

interface HeaderProps {
  className?: string;
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
}

export default function Header({ className = '', theme, language, onToggleTheme, onToggleLanguage }: HeaderProps) {

  return (
    <header className={`h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between ${className}`}>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Zephyr UI</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="small"
          onClick={onToggleTheme}
          className="flex items-center gap-2"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          <span className="hidden sm:inline">
            {theme === 'light' ? '深色' : '浅色'}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="small"
          onClick={onToggleLanguage}
          className="flex items-center gap-2"
        >
          <Languages size={16} />
          <span className="hidden sm:inline">
            {language === 'zh' ? '中文' : 'EN'}
          </span>
        </Button>
      </div>
    </header>
  );
}
