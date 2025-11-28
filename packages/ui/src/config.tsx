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
  input: { clear: 'Clear' }
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
  input: { clear: '清除' }
};

type DesignTokens = Record<string, string | number>;

type ConfigContextValue = {
  theme: ThemeMode;
  locale: Locale;
  tokens?: DesignTokens;
};

const ConfigContext = createContext<ConfigContextValue>({ theme: 'light', locale: enUS });

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

export function ConfigProvider({ theme = 'light', locale = enUS, tokens, children }: { theme?: ThemeMode; locale?: Partial<Locale> | Locale; tokens?: DesignTokens; children: React.ReactNode }) {
  const resolvedLocale = useMemo(() => mergeLocale(enUS, locale), [locale]);

  useEffect(() => {
    applyThemeClass(theme);
    applyDesignTokens(tokens);
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
  }, [theme, tokens && JSON.stringify(tokens)]);

  return (
    <ConfigContext.Provider value={{ theme, locale: resolvedLocale, tokens }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
