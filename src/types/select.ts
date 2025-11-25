import React from 'react';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption<T extends string | number = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectProps<T extends string | number = string | number> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size' | 'multiple' | 'value'> {
  options: SelectOption<T>[];
  value?: T | T[];
  onChange?: (value: T | T[]) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  size?: SelectSize;
  className?: string;
  style?: React.CSSProperties;
}
