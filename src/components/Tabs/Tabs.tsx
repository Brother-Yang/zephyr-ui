import React, { useMemo, useState } from 'react';
import type { TabsProps } from '../../types/tabs';
import styles from './Tabs.module.css';
import '../../styles/variables.css';

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

  const rootClasses = [
    styles.tabs,
    styles[`tabs-${size}`],
    bordered ? styles.bordered : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (key: string) => {
    const target = items.find(i => i.key === key);
    if (!target || target.disabled) return;
    if (!isControlled) setInternal(key);
    onChange?.(key);
  };

  return (
    <div className={rootClasses} style={style} {...rest}>
      <div className={styles.nav} role="tablist">
        {items.map(item => (
          <button
            key={item.key}
            role="tab"
            aria-selected={current === item.key}
            aria-disabled={!!item.disabled}
            className={`${styles.tab} ${current === item.key ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
            onClick={() => handleChange(item.key)}
            disabled={item.disabled}
            type="button"
          >
            {item.label}
            {current === item.key && <span className={styles.ink} aria-hidden />}
          </button>
        ))}
      </div>
      <div className={styles.content} role="tabpanel">
        {items.map(item => {
          const active = current === item.key;
          if (!active && destroyInactiveTabPane) return null;
          return (
            <div key={item.key} style={{ display: active ? 'block' : 'none' }}>
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

