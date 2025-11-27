import React from 'react';
import type { ButtonProps } from '../../types/button';
import styles from './Button.module.css';
import '../../styles/variables.css';

export default function Button({
  variant = 'primary',
  size = 'medium',
  block = false,
  loading = false,
  rounded = false,
  iconOnly = false,
  icon,
  children,
  className = '',
  style,
  onClick,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    block ? styles['button-block'] : '',
    rounded ? styles['button-rounded'] : '',
    iconOnly ? styles['button-icon-only'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={(disabled || loading) || undefined}
      type={type}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden />}
      {!loading && icon}
      {children}
    </button>
  );
}
