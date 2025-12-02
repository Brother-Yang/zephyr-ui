export interface ComponentProp {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  required: boolean;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  component: React.ComponentType;
}

export interface ComponentConfig {
  name: string;
  category: string;
  description: string;
  examples: ComponentExample[];
  props: ComponentProp[];
}

export type Theme = 'light' | 'dark';
export type Language = 'zh' | 'en';

export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
}