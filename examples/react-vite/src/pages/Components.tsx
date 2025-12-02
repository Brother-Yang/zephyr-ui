import React from 'react';
import { componentData } from '../utils/componentData.tsx';
import { Button } from '@zephyr/ui';
import { ArrowRight } from 'lucide-react';

interface ComponentsProps {
  onComponentSelect?: (component: string) => void;
}

export default function Components({ onComponentSelect }: ComponentsProps) {
  const categories = componentData.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof componentData>);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          组件总览
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Zephyr UI 提供了丰富的基础组件，覆盖数据录入、数据展示、反馈等多个场景，
          帮助开发者快速构建高质量的用户界面。
        </p>
      </div>

      {/* Component Categories */}
      {Object.entries(categories).map(([category, components]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {category}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <div 
                key={component.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onComponentSelect?.(component.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {component.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {component.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {component.examples.length} 个示例
                  </span>
                  <Button
                    size="small"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onComponentSelect?.(component.name);
                    }}
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          快速开始
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          选择一个组件开始探索，或直接查看组件源代码了解更多实现细节。
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            type="primary"
            onClick={() => onComponentSelect?.('Button')}
          >
            查看按钮组件
          </Button>
          <Button
            variant="ghost"
            onClick={() => onComponentSelect?.('Input')}
          >
            查看输入框组件
          </Button>
          <Button
            variant="ghost"
            onClick={() => onComponentSelect?.('Table')}
          >
            查看表格组件
          </Button>
        </div>
      </div>
    </div>
  );
}