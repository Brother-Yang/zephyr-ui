import React from 'react';
import type { ButtonProps } from '../../types/button';
import styles from './Button.module.css';
import { withPrefix } from '../../config/classPrefix';
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
    styles[withPrefix('button')],
    styles[withPrefix(`button-${variant}`)],
    styles[withPrefix(`button-${size}`)],
    block ? styles[withPrefix('button-block')] : '',
    rounded ? styles[withPrefix('button-rounded')] : '',
    iconOnly ? styles[withPrefix('button-icon-only')] : '',
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
      {loading && <span className={styles[withPrefix('button-spinner')]} aria-hidden />}
      {!loading && icon}
      {children}
    </button>
  );
}
