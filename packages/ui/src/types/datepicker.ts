export type DatePickerMode = 'single' | 'range'

export interface DatePickerProps {
  mode?: DatePickerMode
  value?: Date | [Date, Date] | null
  defaultMonth?: Date
  disabledDate?: (date: Date) => boolean
  onChange?: (value: Date | [Date, Date] | null) => void
  style?: React.CSSProperties
  cssVariables?: Record<string, string>
  placeholder?: string
  disabled?: boolean
  format?: (value: Date | [Date, Date] | null) => string
  className?: string
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isRangeMiddle: boolean
}

export interface CalendarState {
  currentMonth: Date
  selectedValue: Date | [Date, Date] | null
  rangeTempValue: Date | null
  selectionPhase: 'start' | 'end'
}
