import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useConfig } from '../../config';
import type { SelectProps } from '../../types/select';
import styles from './Select.module.css';
import '../../styles/variables.css';

export default function Select<T extends string | number = string | number>({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  multiple = false,
  size = 'medium',
  className = '',
  style,
  ...rest
}: SelectProps<T>) {
  const { locale } = useConfig();
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T | T[] | undefined>(isControlled ? value : (multiple ? [] : undefined));
  useEffect(() => { if (isControlled) setInternal(value); }, [isControlled, value]);

  const currentSingle = (!multiple ? (internal as T | undefined) : undefined);
  const currentMulti = (multiple ? (internal as T[] | undefined) || [] : []);

  const classes = [styles.select, styles[`select-${size}`], disabled ? styles.disabled : '', multiple ? styles.multiple : '', className]
    .filter(Boolean)
    .join(' ');

  const setValue = (next: T | T[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  // Single select (native)
  const handleSingleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const str = e.target.value;
    const found = options.find(opt => String(opt.value) === str);
    setValue((found ? found.value : (str as unknown)) as T);
  };

  // Multi select (custom chips + dropdown)
  const [open, setOpen] = useState(false);
  const selectedOptions = useMemo(() => options.filter(opt => currentMulti.includes(opt.value as T)), [options, currentMulti]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleOption = (opt: typeof options[number]) => {
    if (opt.disabled) return;
    const exists = currentMulti.some(v => String(v) === String(opt.value));
    const next = exists ? currentMulti.filter(v => String(v) !== String(opt.value)) : [...currentMulti, opt.value as T];
    setValue(next);
  };

  if (multiple) {
    return (
      <div ref={rootRef} className={classes} style={{ position: 'relative', ...style }}>
        <div className={styles.chips} onClick={() => !disabled && setOpen(o => !o)}>
          {selectedOptions.length === 0 && (
            <span className={styles.placeholder}>{placeholder || locale.select.placeholderMultiple}</span>
          )}
          {selectedOptions.map(opt => (
            <span key={String(opt.value)} className={styles.chip}>
              {opt.label}
              <button type="button" aria-label="Remove" onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}>×</button>
            </span>
          ))}
        </div>
        <button type="button" className={styles.caret} onClick={() => !disabled && setOpen(o => !o)} disabled={disabled}>▾</button>
        {open && (
          <div className={styles.dropdown} role="listbox" aria-multiselectable>
            {options.map(opt => {
              const selected = currentMulti.some(v => String(v) === String(opt.value));
              return (
                <div
                  key={String(opt.value)}
                  role="option"
                  aria-selected={selected}
                  className={`${styles.item} ${selected ? styles.selected : ''} ${opt.disabled ? styles.disabled : ''}`}
                  onClick={() => toggleOption(opt)}
                >
                  <input type="checkbox" checked={selected} readOnly />
                  <span>{opt.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      <select
        className={styles.native}
        disabled={disabled}
        value={currentSingle === undefined ? '' : String(currentSingle)}
        onChange={handleSingleChange}
        {...rest}
      >
        {placeholder && <option value="" disabled>{placeholder || locale.select.placeholder}</option>}
        {options.map(opt => (
          <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
