import React from 'react';

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Content({ className = '', children }: ContentProps) {
  return (
    <main className={`flex-1 p-6 pt-20 lg:pt-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}