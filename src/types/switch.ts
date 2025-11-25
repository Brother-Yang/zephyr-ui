import React from 'react';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

