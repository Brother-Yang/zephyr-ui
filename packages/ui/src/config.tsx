import React, { createContext, useContext, useEffect, useMemo } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

type Locale = {
  select: {
    placeholder: string;
    placeholderMultiple: string;
    noOptions?: string;
    remove?: string;
    clearAll?: string;
  };
  table: {
    noData: string;
    pagination: {
      prev: string;
      next: string;
      items: string;
    };
  };
  input: {
    clear: string;
  };
  datePicker?: {
    weekdays?: string[];
    openAriaLabel?: string;
    closeAriaLabel?: string;
    prevMonth?: string;
    nextMonth?: string;
    placeholderSingle?: string;
    placeholderRange?: string;
    formatDayAria?: (date: Date) => string;
    monthTitle?: (date: Date) => string;
  };
  modal?: {
    okText?: string;
    cancelText?: string;
    closeAriaLabel?: string;
  };
  common?: {
    close?: string;
  };
};

export const enUS: Locale = {
  select: {
    placeholder: 'Please select',
    placeholderMultiple: 'Select options',
    noOptions: 'No options',
    remove: 'Remove',
    clearAll: 'Clear all'
  },
  table: {
    noData: 'No data',
    pagination: { prev: 'Prev', next: 'Next', items: 'items' }
  },
  input: { clear: 'Clear' },
  datePicker: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    openAriaLabel: 'Open date picker',
    closeAriaLabel: 'Close date picker',
    prevMonth: 'Prev month',
    nextMonth: 'Next month',
    placeholderSingle: 'Select date',
    placeholderRange: 'Select date range',
    formatDayAria: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    monthTitle: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  },
  modal: { okText: 'OK', cancelText: 'Cancel', closeAriaLabel: 'Close' },
  common: { close: 'Close' }
};

export const zhCN: Locale = {
  select: {
    placeholder: '请选择',
    placeholderMultiple: '选择多个选项',
    noOptions: '暂无选项',
    remove: '移除',
    clearAll: '清除全部'
  },
  table: {
    noData: '暂无数据',
    pagination: { prev: '上一页', next: '下一页', items: '条' }
  },
  input: { clear: '清除' },
  datePicker: {
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    openAriaLabel: '打开日期选择器',
    closeAriaLabel: '关闭日期选择器',
    prevMonth: '上一月',
    nextMonth: '下一月',
    placeholderSingle: '请选择日期',
    placeholderRange: '请选择日期范围',
    formatDayAria: (d) => `${d.getFullYear()}年${String(d.getMonth() + 1)}月${String(d.getDate())}日`,
    monthTitle: (d) => `${d.getFullYear()}年${d.getMonth() + 1}月`
  },
  modal: { okText: '确定', cancelText: '取消', closeAriaLabel: '关闭' },
  common: { close: '关闭' }
};

type DesignTokens = Record<string, string | number>;

type ConfigContextValue = {
  theme: ThemeMode;
  locale: Locale;
  tokens?: DesignTokens;
  classPrefix?: string;
};

const ConfigContext = createContext<ConfigContextValue>({ theme: 'light', locale: zhCN });

function mergeLocale(base: Locale, overrides: Partial<Locale> | Locale): Locale {
  const o = overrides as any;
  return {
    select: {
      placeholder: o?.select?.placeholder ?? base.select.placeholder,
      placeholderMultiple: o?.select?.placeholderMultiple ?? base.select.placeholderMultiple
      ,
      noOptions: o?.select?.noOptions ?? base.select.noOptions,
      remove: o?.select?.remove ?? base.select.remove,
      clearAll: o?.select?.clearAll ?? base.select.clearAll
    },
    table: {
      noData: o?.table?.noData ?? base.table.noData,
      pagination: {
        prev: o?.table?.pagination?.prev ?? base.table.pagination.prev,
        next: o?.table?.pagination?.next ?? base.table.pagination.next,
        items: o?.table?.pagination?.items ?? base.table.pagination.items
      }
    },
    input: {
      clear: o?.input?.clear ?? base.input.clear
    },
    datePicker: {
      weekdays: o?.datePicker?.weekdays ?? base.datePicker?.weekdays,
      openAriaLabel: o?.datePicker?.openAriaLabel ?? base.datePicker?.openAriaLabel,
      closeAriaLabel: o?.datePicker?.closeAriaLabel ?? base.datePicker?.closeAriaLabel,
      prevMonth: o?.datePicker?.prevMonth ?? base.datePicker?.prevMonth,
      nextMonth: o?.datePicker?.nextMonth ?? base.datePicker?.nextMonth,
      placeholderSingle: o?.datePicker?.placeholderSingle ?? base.datePicker?.placeholderSingle,
      placeholderRange: o?.datePicker?.placeholderRange ?? base.datePicker?.placeholderRange,
      formatDayAria: o?.datePicker?.formatDayAria ?? base.datePicker?.formatDayAria,
      monthTitle: o?.datePicker?.monthTitle ?? base.datePicker?.monthTitle
    },
    modal: {
      okText: o?.modal?.okText ?? base.modal?.okText,
      cancelText: o?.modal?.cancelText ?? base.modal?.cancelText,
      closeAriaLabel: o?.modal?.closeAriaLabel ?? base.modal?.closeAriaLabel
    },
    common: {
      close: o?.common?.close ?? base.common?.close
    }
  };
}

function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  const effective = theme === 'system'
    ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  root.setAttribute('data-theme', effective);
}

function applyDesignTokens(tokens?: DesignTokens) {
  if (!tokens) return;
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    const varName = key.startsWith('--') ? key : `--${key}`;
    root.style.setProperty(varName, String(value));
  });
}

import { setClassPrefix } from './config/classPrefix';

export function ConfigProvider({ theme = 'light', locale = enUS, tokens, classPrefix, children }: { theme?: ThemeMode; locale?: Partial<Locale> | Locale; tokens?: DesignTokens; classPrefix?: string; children: React.ReactNode }) {
  const resolvedLocale = useMemo(() => mergeLocale(enUS, locale), [locale]);

  useEffect(() => {
    applyThemeClass(theme);
    applyDesignTokens(tokens);
    if (classPrefix) setClassPrefix(classPrefix);
    let media: MediaQueryList | null = null;
    let handler: ((ev: MediaQueryListEvent) => void) | null = null;
    if (theme === 'system' && window.matchMedia) {
      media = window.matchMedia('(prefers-color-scheme: dark)');
      handler = () => applyThemeClass('system');
      media.addEventListener?.('change', handler);
    }
    return () => {
      if (media && handler) media.removeEventListener?.('change', handler);
      setClassPrefix('zephyr-');
    };
  }, [theme, tokens && JSON.stringify(tokens), classPrefix]);

  return (
    <ConfigContext.Provider value={{ theme, locale: resolvedLocale, tokens, classPrefix }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
