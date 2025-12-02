import React, { useState, useMemo, useCallback } from 'react';
import './DatePicker.css';
import { withPrefix } from '../../config/classPrefix';
import type { DatePickerProps, CalendarDay, CalendarState } from '../../types/datepicker';
import { useConfig } from '../../config';

const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'single',
  value,
  defaultMonth = new Date(),
  disabledDate,
  onChange,
  className = '',
  style,
  cssVariables,
  placeholder,
  disabled = false,
  format
}) => {
  const [state, setState] = useState<CalendarState>({
    currentMonth: defaultMonth,
    selectedValue: value || null,
    rangeTempValue: null,
    selectionPhase: 'start'
  });

  React.useEffect(() => {
    setState(prev => ({
      ...prev,
      selectedValue: value || null
    }));
  }, [value]);

  const getDaysInMonth = useCallback((date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 7 : firstDay;
  }, []);

  const isSameDay = useCallback((date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }, []);

  const isToday = useCallback((date: Date): boolean => {
    const today = new Date();
    return isSameDay(date, today);
  }, [isSameDay]);

  const isDateSelected = useCallback((date: Date): boolean => {
    if (!state.selectedValue) return false;
    if (mode === 'single' && state.selectedValue instanceof Date) {
      return isSameDay(date, state.selectedValue);
    }
    if (mode === 'range' && Array.isArray(state.selectedValue)) {
      const [start, end] = state.selectedValue;
      return isSameDay(date, start) || isSameDay(date, end);
    }
    return false;
  }, [state.selectedValue, mode, isSameDay]);

  const isDateInRange = useCallback((date: Date): boolean => {
    if (mode !== 'range' || !Array.isArray(state.selectedValue)) return false;
    const [start, end] = state.selectedValue;
    if (!start || !end) return false;
    const time = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    return time > startTime && time < endTime;
  }, [state.selectedValue, mode]);

  const isDateDisabled = useCallback((date: Date): boolean => {
    if (disabledDate) return disabledDate(date);
    return false;
  }, [disabledDate]);

  const calendarData = useMemo((): CalendarDay[][] => {
    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(state.currentMonth);
    const firstDay = getFirstDayOfMonth(state.currentMonth);
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];

    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    for (let i = firstDay - 1; i >= 1; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i + 1);
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isDateSelected(date),
        isDisabled: isDateDisabled(date),
        isRangeStart: false,
        isRangeEnd: false,
        isRangeMiddle: false
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayData: CalendarDay = {
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        isSelected: isDateSelected(date),
        isDisabled: isDateDisabled(date),
        isRangeStart: false,
        isRangeEnd: false,
        isRangeMiddle: false
      };
      if (mode === 'range' && Array.isArray(state.selectedValue)) {
        const [start, end] = state.selectedValue;
        dayData.isRangeStart = start && isSameDay(date, start);
        dayData.isRangeEnd = end && isSameDay(date, end);
        dayData.isRangeMiddle = isDateInRange(date);
      }
      currentWeek.push(dayData);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    const remainingDays = 7 - currentWeek.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isDateSelected(date),
        isDisabled: isDateDisabled(date),
        isRangeStart: false,
        isRangeEnd: false,
        isRangeMiddle: false
      });
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);
    return weeks;
  }, [state.currentMonth, state.selectedValue, mode, getDaysInMonth, getFirstDayOfMonth, isToday, isDateSelected, isDateDisabled, isDateInRange, isSameDay]);

  const handleDateClick = useCallback((date: Date) => {
    if (isDateDisabled(date)) return;
    if (mode === 'single') {
      const newValue = date;
      setState(prev => ({ ...prev, selectedValue: newValue }));
      onChange?.(newValue);
    } else if (mode === 'range') {
      if (state.selectionPhase === 'start') {
        setState(prev => ({
          ...prev,
          selectedValue: [date, date],
          rangeTempValue: date,
          selectionPhase: 'end'
        }));
      } else {
        const [start] = state.selectedValue as [Date, Date];
        const newRange: [Date, Date] = start <= date ? [start, date] : [date, start];
        setState(prev => ({
          ...prev,
          selectedValue: newRange,
          rangeTempValue: null,
          selectionPhase: 'start'
        }));
        onChange?.(newRange);
      }
    }
  }, [mode, state.selectionPhase, state.selectedValue, isDateDisabled, onChange]);

  const handleMonthChange = useCallback((direction: 'prev' | 'next') => {
    setState(prev => {
      const newMonth = new Date(prev.currentMonth);
      if (direction === 'prev') newMonth.setMonth(newMonth.getMonth() - 1);
      else newMonth.setMonth(newMonth.getMonth() + 1);
      return { ...prev, currentMonth: newMonth };
    });
  }, []);

  const { locale } = useConfig();
  const dp = locale?.datePicker;
  const weekdays = dp?.weekdays;

  const containerStyle = useMemo(() => {
    const customStyle: React.CSSProperties = { ...style };
    if (cssVariables) {
      Object.entries(cssVariables).forEach(([key, value]) => {
        (customStyle as any)[key] = value;
      });
    }
    return customStyle;
  }, [style, cssVariables]);

  const [open, setOpen] = useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onDocKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onDocKeyDown);
    };
  }, []);

  const formatted = useMemo(() => {
    if (format) return format(state.selectedValue);
    if (!state.selectedValue) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (Array.isArray(state.selectedValue)) {
      const [s, e] = state.selectedValue;
      return s && e ? `${fmt(s)} ~ ${fmt(e)}` : s ? fmt(s) : e ? fmt(e) : '';
    }
    return fmt(state.selectedValue as Date);
  }, [state.selectedValue, format]);

  return (
    <div className={`${withPrefix('datepicker-picker')} ${className}`} style={containerStyle} ref={rootRef}>
      <div
        className={withPrefix('datepicker-input')}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="dialog"
        tabIndex={disabled ? -1 : 0}
        onMouseDown={(e) => { if (disabled) return; e.stopPropagation(); setOpen(o => !o); }}
        onFocus={() => !disabled && setOpen(true)}
      >
        <span className={withPrefix('datepicker-input-text')}>
          {formatted || (placeholder ?? (mode === 'range' ? (dp?.placeholderRange) : (dp?.placeholderSingle)))}
        </span>
        <button
          type="button"
          className={withPrefix('datepicker-caret')}
          aria-label={open ? (dp?.closeAriaLabel) : (dp?.openAriaLabel)}
          onMouseDown={(e) => { e.stopPropagation(); if (!disabled) setOpen(o => !o); }}
          disabled={disabled}
        >
          ▾
        </button>
      </div>

      {open && (
      <div className={withPrefix('datepicker-panel')} role="dialog" aria-modal={false} onMouseDown={(e) => e.stopPropagation()}>
        <div className={withPrefix('datepicker-header')}>
          <button className={withPrefix('datepicker-nav-button')} onClick={() => handleMonthChange('prev')} aria-label={dp?.prevMonth}>‹</button>
          <div className={withPrefix('datepicker-title')}>
            {(dp?.monthTitle ? dp.monthTitle(state.currentMonth) : `${state.currentMonth.getFullYear()}年${state.currentMonth.getMonth() + 1}月`)}
          </div>
          <button className={withPrefix('datepicker-nav-button')} onClick={() => handleMonthChange('next')} aria-label={dp?.nextMonth}>›</button>
        </div>

        <div className={withPrefix('datepicker-weekdays')}>
          {weekdays.map(day => (
            <div key={day} className={withPrefix('datepicker-weekday')}>{day}</div>
          ))}
        </div>

        <div className={withPrefix('datepicker-days')}>
          {calendarData.map((week, weekIndex) => (
            <div key={weekIndex} className={withPrefix('datepicker-week')}>
              {week.map((day, dayIndex) => (
                <button
                  key={dayIndex}
                  className={[
                    withPrefix('datepicker-day'),
                    !day.isCurrentMonth && withPrefix('datepicker-day-other-month'),
                    day.isToday && withPrefix('datepicker-day-today'),
                    day.isSelected && withPrefix('datepicker-day-selected'),
                    day.isDisabled && withPrefix('datepicker-day-disabled'),
                    day.isRangeStart && withPrefix('datepicker-day-range-start'),
                    day.isRangeEnd && withPrefix('datepicker-day-range-end'),
                    day.isRangeMiddle && withPrefix('datepicker-day-range-middle')
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    const phase = state.selectionPhase;
                    handleDateClick(day.date);
                    if (mode === 'single') setOpen(false);
                    else if (mode === 'range' && phase === 'end') setOpen(false);
                  }}
                  disabled={day.isDisabled}
                  aria-label={(dp?.formatDayAria ? dp.formatDayAria(day.date) : `${day.date.getFullYear()}年${day.date.getMonth() + 1}月${day.date.getDate()}日`)}
                >
                  {day.date.getDate()}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default DatePicker;
