import React from 'react';

export type TabsSize = 'small' | 'medium' | 'large';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  size?: TabsSize;
  bordered?: boolean;
  destroyInactiveTabPane?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

