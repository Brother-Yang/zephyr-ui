import React, { useState } from 'react';
import type { SwitchProps } from '../../types/switch';
import styles from './Switch.module.css';
import '../../styles/variables.css';

export default function Switch({
  checked,
  defaultChecked,
  disabled,
  size = 'medium',
  onChange,
  label,
  className = '',
  style,
  ...rest
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked || false);
  const current = isControlled ? checked! : internal;

  const rootClasses = [styles.switch, styles[size], disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');
  const buttonClasses = [styles.button, current ? styles.checked : ''].filter(Boolean).join(' ');

  const toggle = () => {
    if (disabled) return;
    const next = !current;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label className={rootClasses} style={style}>
      <button
        type="button"
        role="switch"
        aria-checked={current}
        aria-disabled={!!disabled}
        className={buttonClasses}
        onClick={toggle}
        disabled={disabled}
        {...rest}
      >
        <span className={styles.thumb} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

