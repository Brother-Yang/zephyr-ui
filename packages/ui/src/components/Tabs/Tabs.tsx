import React, { useMemo, useRef, useState } from 'react';
import type { TabsProps } from '../../types/tabs';
import styles from './Tabs.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

export default function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  size = 'medium',
  bordered = true,
  destroyInactiveTabPane = false,
  className = '',
  style,
  ...rest
}: TabsProps) {
  const firstKey = useMemo(() => items.find(i => !i.disabled)?.key, [items]);
  const [internal, setInternal] = useState<string>(defaultActiveKey || firstKey || (items[0]?.key ?? ''));
  const isControlled = activeKey !== undefined;
  const current = isControlled ? activeKey! : internal;
  const idRef = useRef(`tabs-${Math.random().toString(36).slice(2)}`);

  const rootClasses = [
    styles[withPrefix('tabs')],
    styles[withPrefix(`tabs-${size}`)],
    bordered ? styles[withPrefix('bordered')] : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (key: string) => {
    const target = items.find(i => i.key === key);
    if (!target || target.disabled) return;
    if (!isControlled) setInternal(key);
    onChange?.(key);
  };

  const focusTab = (idx: number) => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(`#${idRef.current}-tablist [role="tab"]`);
    const el = buttons[idx];
    el?.focus();
  };

  const currentIndex = items.findIndex(i => i.key === current);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const len = items.length;
    const move = (dir: 1 | -1) => {
      let ni = currentIndex;
      if (ni < 0) ni = dir > 0 ? 0 : len - 1;
      else ni = (ni + dir + len) % len;
      // skip disabled
      let tries = 0;
      while (items[ni]?.disabled && tries < len) { ni = (ni + dir + len) % len; tries++; }
      const nextKey = items[ni]?.key;
      if (nextKey) { handleChange(nextKey); focusTab(ni); }
    };
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Home') { e.preventDefault(); const ni = items.findIndex(i => !i.disabled); if (ni >= 0) { handleChange(items[ni].key); focusTab(ni); } }
    else if (e.key === 'End') { e.preventDefault(); const ni = [...items].reverse().findIndex(i => !i.disabled); if (ni >= 0) { const idx = items.length - 1 - ni; handleChange(items[idx].key); focusTab(idx); } }
  };

  return (
    <div className={rootClasses} style={style} {...rest}>
      <div
        id={`${idRef.current}-tablist`}
        className={styles[withPrefix('nav')]}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {items.map((item, idx) => (
          <button
            key={item.key}
            id={`${idRef.current}-tab-${item.key}`}
            role="tab"
            aria-selected={current === item.key}
            aria-disabled={!!item.disabled}
            aria-controls={`${idRef.current}-panel-${item.key}`}
            className={`${styles[withPrefix('tab')]} ${current === item.key ? styles[withPrefix('active')] : ''} ${item.disabled ? styles[withPrefix('disabled')] : ''}`}
            onClick={() => handleChange(item.key)}
            disabled={item.disabled}
            type="button"
            tabIndex={(function(){
              const focusIdx = currentIndex >= 0 ? currentIndex : (items.findIndex(i => !i.disabled) >= 0 ? items.findIndex(i => !i.disabled) : 0);
              return idx === focusIdx ? 0 : -1;
            })()}
          >
            {item.label}
            {current === item.key && <span className={styles[withPrefix('ink')]} aria-hidden />}
          </button>
        ))}
      </div>
      {items.map(item => {
        const active = current === item.key;
        if (!active && destroyInactiveTabPane) return null;
        return (
          <div
            key={item.key}
            id={`${idRef.current}-panel-${item.key}`}
            role="tabpanel"
            aria-labelledby={`${idRef.current}-tab-${item.key}`}
            style={{ display: active ? 'block' : 'none', padding: 'var(--spacing-md)' }}
          >
            {item.children}
          </div>
        );
      })}
    </div>
  );
}
