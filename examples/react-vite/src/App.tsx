import React, { useState } from 'react';
import {
  ConfigProvider,
  enUS,
  zhCN,
} from 'zephyr-react-ui';
import Layout from './components/Layout';
import Home from './pages/Home';
import Components from './pages/Components';
import ComponentCard from './components/ComponentCard/ComponentCard';
import { useTheme } from './hooks/useTheme';
import { useLocale } from './hooks/useLocale';

type Page = 'home' | 'components' | 'component';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { locale, language, toggleLanguage } = useLocale();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentPage('components');
  };

  const handleComponentSelect = (componentName: string) => {
    setSelectedComponent(componentName);
    setCurrentPage('component');
  };

  const handleBackToComponents = () => {
    setCurrentPage('components');
    setSelectedComponent('');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedComponent('');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={handleGetStarted} />;
      case 'components':
        return <Components onComponentSelect={handleComponentSelect} />;
      case 'component':
        return (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <button
                onClick={handleBackToComponents}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                ← 返回组件总览
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={handleBackToHome}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                首页
              </button>
            </div>
            <ComponentCard componentName={selectedComponent} />
          </div>
        );
      default:
        return <Home onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <ConfigProvider theme={theme} locale={locale}>
      <Layout 
        selectedComponent={selectedComponent}
        onComponentSelect={handleComponentSelect}
        theme={theme}
        language={language}
        onToggleTheme={toggleTheme}
        onToggleLanguage={toggleLanguage}
      >
        {renderContent()}
      </Layout>
    </ConfigProvider>
  );
}
