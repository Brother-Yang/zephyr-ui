import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useConfig } from '../../config';
import type { SelectProps } from '../../types/select';
import styles from './Select.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

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
  const idRef = useRef(`select-${Math.random().toString(36).slice(2)}`);
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T | T[] | undefined>(isControlled ? value : (multiple ? [] : undefined));
  useEffect(() => { if (isControlled) setInternal(value); }, [isControlled, value]);

  const currentSingle = (!multiple ? (internal as T | undefined) : undefined);
  const currentMulti = (multiple ? (internal as T[] | undefined) || [] : []);

  const classes = [
    styles[withPrefix('select')],
    styles[withPrefix(`select-${size}`)],
    disabled ? styles[withPrefix('disabled')] : '',
    multiple ? styles[withPrefix('multiple')] : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const setValue = (next: T | T[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  // Single select (custom dropdown)
  const selectedLabel = useMemo(() => {
    if (currentSingle === undefined || currentSingle === '') return undefined;
    return options.find(opt => String(opt.value) === String(currentSingle))?.label;
  }, [options, currentSingle]);

  // Dropdown state (used for both single and multiple)
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
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
        <div className={styles[withPrefix('chips')]} onClick={() => !disabled && setOpen(o => !o)}>
          {selectedOptions.length === 0 && (
            <span className={styles[withPrefix('placeholder')]}>{placeholder || locale.select.placeholderMultiple}</span>
          )}
          {selectedOptions.map(opt => (
            <span key={String(opt.value)} className={styles[withPrefix('chip')]}
            >
              {opt.label}
              <button type="button" aria-label={locale.select.remove || 'Remove'} onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}>×</button>
            </span>
          ))}
        </div>
        <button type="button" className={styles[withPrefix('caret')]} onClick={() => !disabled && setOpen(o => !o)} disabled={disabled}>▾</button>
        {open && (
          <div className={styles[withPrefix('dropdown')]} role="listbox" aria-multiselectable id={`${idRef.current}-listbox`}>
            {options.length === 0 && (
              <div className={styles[withPrefix('item')]} aria-disabled>{locale.select.noOptions || 'No options'}</div>
            )}
            {options.map(opt => {
              const selected = currentMulti.some(v => String(v) === String(opt.value));
              return (
                <div
                  key={String(opt.value)}
                  role="option"
                  aria-selected={selected}
                  className={`${styles[withPrefix('item')]} ${selected ? styles[withPrefix('selected')] : ''} ${opt.disabled ? styles[withPrefix('disabled')] : ''}`}
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
    <div
      ref={rootRef}
      className={classes}
      style={{ position: 'relative', ...style }}
      role="combobox"
      aria-expanded={open}
      aria-controls={`${idRef.current}-listbox`}
      aria-haspopup="listbox"
      aria-activedescendant={open && activeIndex >= 0 ? `${idRef.current}-option-${activeIndex}` : undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={() => { if (!disabled) setOpen(o => !o); }}
      onKeyDown={(e) => {
        if (disabled) return;
        const nextIndex = (dir: number) => {
          const len = options.length;
          if (len === 0) return -1;
          const selectedIdx = options.findIndex(o => String(o.value) === String(currentSingle));
          let idx = activeIndex;
          if (idx < 0) {
            if (selectedIdx >= 0) idx = selectedIdx; else idx = -1;
          }
          let ni = idx < 0 ? (dir > 0 ? 0 : len - 1) : idx + dir;
          if (ni < 0) ni = len - 1;
          if (ni >= len) ni = 0;
          setActiveIndex(ni);
        };
        if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); nextIndex(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); nextIndex(-1); }
        else if (e.key === 'Enter') {
          if (open && activeIndex >= 0 && !options[activeIndex].disabled) {
            setValue(options[activeIndex].value as T);
            setOpen(false);
          } else {
            setOpen(o => !o);
          }
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      }}
      {...rest}
    >
      <div
        className={styles[withPrefix('display')]}
        onClick={(e) => { e.stopPropagation(); if (!disabled) setOpen(o => !o); }}
      >
        {selectedLabel === undefined ? (
          <span className={styles[withPrefix('placeholder')]}>{placeholder || locale.select.placeholder}</span>
        ) : (
          <span className={styles[withPrefix('value')]}>{selectedLabel}</span>
        )}
      </div>
      <button
        type="button"
        className={styles[withPrefix('caret')]}
        onClick={(e) => { e.stopPropagation(); if (!disabled) setOpen(o => !o); }}
        disabled={disabled}
      >
        ▾
      </button>
      {open && (
        <div className={styles[withPrefix('dropdown')]} role="listbox" id={`${idRef.current}-listbox`}>
          {options.length === 0 && (
            <div className={styles[withPrefix('item')]} aria-disabled>{locale.select.noOptions || 'No options'}</div>
          )}
          {options.map((opt, i) => {
            const selected = String(opt.value) === String(currentSingle);
            return (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={selected}
                id={`${idRef.current}-option-${i}`}
                className={`${styles[withPrefix('item')]} ${selected ? styles[withPrefix('selected')] : ''} ${opt.disabled ? styles[withPrefix('disabled')] : ''} ${activeIndex === i ? styles[withPrefix('active')] : ''}`}
                onClick={() => {
                  if (opt.disabled) return;
                  setValue(opt.value as T);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
