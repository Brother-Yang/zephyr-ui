import React, { useState } from 'react';
import { componentData } from '../../utils/componentData';
import { highlightCode, copyToClipboard } from '../../utils/codeExamples';
import { Copy, Check } from 'lucide-react';
import { Button } from 'zephyr-react-ui';

interface ComponentCardProps {
  componentName: string;
}

export default function ComponentCard({ componentName }: ComponentCardProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const component = componentData.find(c => c.name === componentName);
  
  if (!component) {
    return <div className="text-gray-500">组件未找到</div>;
  }

  const handleCopyCode = async (code: string, exampleIndex: number) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCode(`${componentName}-${exampleIndex}`);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Component Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {component.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {component.description}
        </p>
      </div>

      {/* Component Examples */}
      {component.examples.map((example, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Example Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {example.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {example.description}
            </p>
          </div>

          {/* Example Demo */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-32 flex items-center justify-center">
            <example.component />
          </div>

          {/* Code Block */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">代码示例</h4>
              <Button
                size="small"
                variant="ghost"
                onClick={() => handleCopyCode(example.code, index)}
                className="flex items-center gap-2"
              >
                {copiedCode === `${componentName}-${index}` ? (
                  <>
                    <Check size={14} />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    复制
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 bg-gray-900 text-gray-100 rounded-b-lg overflow-x-auto">
              <pre className="text-sm">
                <code 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightCode(example.code) 
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
      ))}

      {/* Props Documentation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          属性说明
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">属性名</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">类型</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">默认值</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">说明</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">必填</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map((prop, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">
                    {prop.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {prop.type}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {prop.defaultValue}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {prop.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      prop.required 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {prop.required ? '是' : '否'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
