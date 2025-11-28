import React from 'react';
import styles from './Empty.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

export interface EmptyProps {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Empty({ icon, description, actions, size = 'medium', className = '', style, children }: EmptyProps) {
  const classes = [styles[withPrefix('empty')], styles[withPrefix(size)], className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={style} role="status" aria-live="polite">
      {icon && <div className={styles[withPrefix('icon')]} aria-hidden>{icon}</div>}
      <div className={styles[withPrefix('text')]}>{children ?? description ?? 'Empty'}</div>
      {actions && <div className={styles[withPrefix('actions')]}>{actions}</div>}
    </div>
  );
}
