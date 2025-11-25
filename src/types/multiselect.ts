import React from 'react';
import type { SelectOption, SelectSize } from './select';

export interface MultiSelectProps<T extends string | number = string | number> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption<T>[];
  value?: T[];
  onChange?: (value: T[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: SelectSize;
  className?: string;
  style?: React.CSSProperties;
}

