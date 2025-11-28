import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { FormProps, FormItemProps, FormRule, FormApi } from '../../types/form';
import styles from './Form.module.css';
import '../../styles/variables.css';
import { withPrefix } from '../../config/classPrefix';

type AnyValues = Record<string, any>;

interface FieldMeta {
  name: string;
  rules: FormRule[];
  valuePropName: 'value' | 'checked';
  el?: HTMLElement | null;
}

interface FormContextType {
  values: AnyValues;
  errors: Record<string, string | null>;
  setFieldValue: (name: string, value: any) => void;
  getFieldValue: (name: string) => any;
  registerField: (meta: FieldMeta) => void;
  unregisterField: (name: string) => void;
  validateField: (name: string) => string | null;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  layout: 'vertical' | 'horizontal';
  disabled: boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export default function Form<TValues extends AnyValues = AnyValues>({
  initialValues,
  onFinish,
  onReset,
  layout = 'vertical',
  disabled = false,
  validateOnChange = true,
  validateOnBlur = true,
  onValuesChange,
  formRef,
  className = '',
  style,
  children,
  ...rest
}: FormProps<TValues>) {
  const [values, setValues] = useState<AnyValues>({ ...(initialValues || {}) });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const fields = useRef<Map<string, FieldMeta>>(new Map());

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => {
      const next = { ...prev, [name]: value };
      onValuesChange?.(next as TValues, { name: name as any, value });
      return next;
    });
  }, [onValuesChange]);

  const getFieldValue = useCallback((name: string) => values[name], [values]);

  const registerField = useCallback((meta: FieldMeta) => {
    fields.current.set(meta.name, meta);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fields.current.delete(name);
  }, []);

  const runRules = (name: string, value: any): string | null => {
    const meta = fields.current.get(name);
    const rules = meta?.rules || [];
    for (const rule of rules) {
      if (rule.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        return rule.message || 'This field is required';
      }
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        return rule.message || 'Invalid format';
      }
      if (typeof value === 'string') {
        if (rule.min !== undefined && value.length < rule.min) return rule.message || `Minimum ${rule.min} characters`;
        if (rule.max !== undefined && value.length > rule.max) return rule.message || `Maximum ${rule.max} characters`;
      }
      if (rule.validator) {
        const msg = rule.validator(value, values);
        if (msg) return msg;
      }
    }
    return null;
  };

  const validateField = useCallback((name: string) => {
    const err = runRules(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: err }));
    return err;
  }, [values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string | null> = {};
    for (const name of fields.current.keys()) {
      nextErrors[name] = runRules(name, values[name]);
    }
    setErrors(nextErrors);
    const hasError = Object.values(nextErrors).some(Boolean);
    if (!hasError) {
      onFinish?.(values as TValues);
    } else {
      const firstErrorName = Array.from(fields.current.keys()).find(n => nextErrors[n]);
      if (firstErrorName) {
        const el = fields.current.get(firstErrorName)?.el;
        if (el) {
          const focusable = el.querySelector('input,textarea,button,[tabindex]') as HTMLElement | null;
          (focusable || el).focus?.();
          el.scrollIntoView?.({ block: 'center' });
        }
      }
    }
  };

  const handleReset = () => {
    setValues({ ...(initialValues || {}) });
    setErrors({});
    onReset?.();
  };

  const ctx = useMemo<FormContextType>(() => ({
    values,
    errors,
    setFieldValue,
    getFieldValue,
    registerField,
    unregisterField,
    validateField,
    validateOnChange,
    validateOnBlur,
    layout,
    disabled,
  }), [values, errors, setFieldValue, getFieldValue, registerField, unregisterField, validateField, validateOnChange, validateOnBlur, layout, disabled]);

  const classes = [styles[withPrefix('form')], layout === 'horizontal' ? styles[withPrefix('form-horizontal')] : '', disabled ? styles[withPrefix('disabled')] : '', className]
    .filter(Boolean)
    .join(' ');

  const api: FormApi<TValues> = {
    getFieldsValue: () => values as TValues,
    setFieldsValue: (next) => {
      setValues(prev => ({ ...prev, ...(next || {}) }));
    },
    resetFields: () => {
      setValues({ ...(initialValues || {}) });
      setErrors({});
    },
    validateFields: () => {
      const nextErrors: Record<string, string | null> = {};
      for (const name of fields.current.keys()) {
        nextErrors[name] = runRules(name, values[name]);
      }
      setErrors(nextErrors);
      return nextErrors;
    },
    submit: () => {
      const fakeEvent = { preventDefault: () => {} } as any;
      handleSubmit(fakeEvent);
    }
  };

  if (formRef) formRef.current = api;

  return (
    <form className={classes} style={style} onSubmit={handleSubmit} onReset={handleReset} {...rest}>
      <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
    </form>
  );
}

export function FormItem<TValues extends AnyValues = AnyValues>({
  name,
  label,
  required,
  rules = [],
  valuePropName = 'value',
  help,
  className = '',
  style,
  children,
}: FormItemProps<TValues>) {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('FormItem must be used within Form');

  const mergedRules = required ? [{ required: true } as FormRule].concat(rules) : rules;

  const itemRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    ctx.registerField({ name, rules: mergedRules, valuePropName, el: itemRef.current });
    return () => ctx.unregisterField(name);
  }, [name, JSON.stringify(mergedRules), valuePropName]);

  const value = ctx.getFieldValue(name);
  const error = ctx.errors[name] || null;
  const helpId = `form-help-${name}`;

  const childProps: Record<string, any> = {
    [valuePropName]: value,
    onChange: (v: any) => {
      ctx.setFieldValue(name, v);
      if (ctx.validateOnChange) ctx.validateField(name);
    },
    onBlur: () => { if (ctx.validateOnBlur) ctx.validateField(name); },
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error || help ? helpId : undefined,
    disabled: ctx.disabled || undefined,
  };

  const control = React.cloneElement(children, childProps);

  const itemClasses = [styles[withPrefix('item')], error ? styles[withPrefix('has-error')] : '', className].filter(Boolean).join(' ');

  return (
    <div ref={itemRef} className={itemClasses} style={style}>
      {label && (
        <div className={styles[withPrefix('label')]}> 
          {label}
          {required && <span className={styles[withPrefix('asterisk')]}>*</span>}
        </div>
      )}
      <div className={styles[withPrefix('control')]}>{control}</div>
      <div className={styles[withPrefix('help')]} id={helpId}>{error || help || null}</div>
    </div>
  );
}
