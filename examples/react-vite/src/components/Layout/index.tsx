import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

interface LayoutProps {
  children?: React.ReactNode;
  selectedComponent?: string;
  onComponentSelect?: (component: string) => void;
}

export default function Layout({ 
  children, 
  selectedComponent, 
  onComponentSelect 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
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