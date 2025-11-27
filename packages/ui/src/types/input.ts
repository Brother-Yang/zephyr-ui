import React from 'react';

export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix' | 'suffix'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onPressEnter?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  status?: InputStatus;
  className?: string;
  style?: React.CSSProperties;
}
