import React, { createContext, useContext, useEffect, useMemo } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

type Locale = {
  select: {
    placeholder: string;
    placeholderMultiple: string;
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
};

export const enUS: Locale = {
  select: {
    placeholder: 'Please select',
    placeholderMultiple: 'Select options'
  },
  table: {
    noData: 'No data',
    pagination: { prev: 'Prev', next: 'Next', items: 'items' }
  },
  input: { clear: 'Clear' }
};

export const zhCN: Locale = {
  select: {
    placeholder: '请选择',
    placeholderMultiple: '选择多个选项'
  },
  table: {
    noData: '暂无数据',
    pagination: { prev: '上一页', next: '下一页', items: '条' }
  },
  input: { clear: '清除' }
};

type ConfigContextValue = {
  theme: ThemeMode;
  locale: Locale;
};

const ConfigContext = createContext<ConfigContextValue>({ theme: 'light', locale: enUS });

function mergeLocale(base: Locale, overrides: Partial<Locale> | Locale): Locale {
  const o = overrides as any;
  return {
    select: {
      placeholder: o?.select?.placeholder ?? base.select.placeholder,
      placeholderMultiple: o?.select?.placeholderMultiple ?? base.select.placeholderMultiple
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

export function ConfigProvider({ theme = 'light', locale = enUS, children }: { theme?: ThemeMode; locale?: Partial<Locale> | Locale; children: React.ReactNode }) {
  const resolvedLocale = useMemo(() => mergeLocale(enUS, locale), [locale]);

  useEffect(() => {
    applyThemeClass(theme);
    let media: MediaQueryList | null = null;
    let handler: ((ev: MediaQueryListEvent) => void) | null = null;
    if (theme === 'system' && window.matchMedia) {
      media = window.matchMedia('(prefers-color-scheme: dark)');
      handler = () => applyThemeClass('system');
      media.addEventListener?.('change', handler);
    }
    return () => {
      if (media && handler) media.removeEventListener?.('change', handler);
    };
  }, [theme]);

  return (
    <ConfigContext.Provider value={{ theme, locale: resolvedLocale }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
