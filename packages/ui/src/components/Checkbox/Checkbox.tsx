import React, { useEffect, useRef, useState } from 'react';
import type { CheckboxProps } from '../../types/checkbox';
import styles from './Checkbox.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

export default function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled,
  label,
  onChange,
  size = 'medium',
  className = '',
  style,
  ...rest
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked || false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate && !(isControlled ? checked! : internalChecked);
  }, [indeterminate, checked, internalChecked, isControlled]);

  const currentChecked = isControlled ? checked! : internalChecked;

  const rootClasses = [styles[withPrefix('checkbox')], styles[withPrefix(`checkbox-${size}`)], disabled ? styles[withPrefix('disabled')] : '', className].filter(Boolean).join(' ');
  const boxClasses = [styles[withPrefix('box')], currentChecked ? styles[withPrefix('checked')] : '', indeterminate ? styles[withPrefix('indeterminate')] : '']
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label
      className={rootClasses}
      style={style}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : currentChecked}
      aria-disabled={disabled || undefined}
    >
      <span className={boxClasses}>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles[withPrefix('input')]}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        {(currentChecked || indeterminate) && <span className={styles[withPrefix('tick')]}>{indeterminate ? '−' : '✓'}</span>}
      </span>
      {label && <span className={styles[withPrefix('label')]}>{label}</span>}
    </label>
  );
}
