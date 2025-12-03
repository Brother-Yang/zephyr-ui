import React from 'react';
import { Button } from 'zephyr-react-ui';
import { ArrowRight, Palette, Code, Zap } from 'lucide-react';

interface HomeProps {
  onGetStarted?: () => void;
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          欢迎使用 <span className="text-blue-600 dark:text-blue-400">Zephyr UI</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          现代化的 React 组件库，提供丰富的基础组件和完善的类型支持，
          帮助开发者快速构建美观、易用的用户界面。
        </p>
        <Button 
          type="primary" 
          size="large"
          onClick={onGetStarted}
          className="inline-flex items-center gap-2"
        >
          开始使用
          <ArrowRight size={20} />
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            精美设计
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            精心设计的组件，遵循现代设计原则，提供一致的用户体验。
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            TypeScript 支持
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            完整的 TypeScript 类型定义，提供优秀的开发体验和代码提示。
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            易于使用
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            简洁的 API 设计，丰富的文档和示例，让开发变得简单高效。
          </p>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          快速开始
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              安装
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <code className="text-sm">npm install zephyr-react-ui</code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              使用
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`import { Button } from 'zephyr-react-ui';

function App() {
  return <Button type="primary">点击我</Button>;
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
