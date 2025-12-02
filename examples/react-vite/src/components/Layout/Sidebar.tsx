import React, { useState } from 'react';
import { categories } from '../../utils/componentData.tsx';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';

interface SidebarProps {
  className?: string;
  selectedComponent?: string;
  onComponentSelect?: (component: string) => void;
}

export default function Sidebar({ 
  className = '', 
  selectedComponent, 
  onComponentSelect 
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['基础组件', '数据录入', '数据展示', '反馈组件']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleComponentClick = (componentName: string) => {
    onComponentSelect?.(componentName);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-280px bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${className}
      `}>
        <div className="p-4 pt-16 lg:pt-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">组件导航</h2>
          
          <nav className="space-y-2">
            {categories.map(category => (
              <div key={category.key}>
                <button
                  onClick={() => toggleCategory(category.key)}
                  className="w-full flex items-center justify-between p-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <span className="font-medium">{category.name}</span>
                  {expandedCategories.includes(category.key) ? 
                    <ChevronDown size={16} /> : <ChevronRight size={16} />
                  }
                </button>
                
                {expandedCategories.includes(category.key) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.components.map(componentName => (
                      <button
                        key={componentName}
                        onClick={() => handleComponentClick(componentName)}
                        className={`
                          w-full text-left p-2 rounded-md transition-colors
                          ${selectedComponent === componentName 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {componentName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}