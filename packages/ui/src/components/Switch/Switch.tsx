import React, { useState } from 'react';
import type { SwitchProps } from '../../types/switch';
import styles from './Switch.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

export default function Switch({
  checked,
  defaultChecked,
  disabled,
  size = 'medium',
  onChange,
  label,
  readOnly,
  status,
  name,
  value,
  onContent,
  offContent,
  className = '',
  style,
  ...rest
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked || false);
  const current = isControlled ? checked! : internal;

  const rootClasses = [
    styles[withPrefix('switch')],
    styles[withPrefix(size)],
    disabled ? styles[withPrefix('disabled')] : '',
    readOnly ? styles[withPrefix('readonly')] : '',
    status ? styles[withPrefix(status)] : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
  const buttonClasses = [styles[withPrefix('button')], current ? styles[withPrefix('checked')] : ''].filter(Boolean).join(' ');
  const { onContent: _oc, offContent: _of, status: _st, readOnly: _ro, name: _nm, value: _val, label: _lb, ...btnProps } = rest as any;

  const toggle = () => {
    if (disabled || readOnly) return;
    const next = !current;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label className={rootClasses} style={style}>
      {name && (
        <input type="checkbox" name={name} value={value ?? 'on'} checked={current} readOnly style={{ display: 'none' }} />
      )}
      <button
        type="button"
        role="switch"
        aria-checked={current}
        aria-disabled={!!disabled}
        aria-readonly={readOnly || undefined}
        className={buttonClasses}
        onClick={toggle}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        }}
        disabled={disabled}
        {...btnProps}
      >
        <span className={styles[withPrefix('thumb')]} />
      </button>
      {label && <span className={styles[withPrefix('label')]}>{label}</span>}
    </label>
  );
}
