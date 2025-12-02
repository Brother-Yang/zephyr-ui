import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

interface LayoutProps {
  children?: React.ReactNode;
  selectedComponent?: string;
  onComponentSelect?: (component: string) => void;
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
}

export default function Layout({ 
  children, 
  selectedComponent, 
  onComponentSelect,
  theme,
  language,
  onToggleTheme,
  onToggleLanguage
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header theme={theme} language={language} onToggleTheme={onToggleTheme} onToggleLanguage={onToggleLanguage} />
      <div className="flex">
        <Sidebar 
          selectedComponent={selectedComponent}
          onComponentSelect={onComponentSelect}
        />
        <Content>
          {children}
        </Content>
      </div>
    </div>
  );
}
