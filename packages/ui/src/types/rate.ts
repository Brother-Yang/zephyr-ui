export interface RateProps {
  count?: number
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  disabled?: boolean
  readOnly?: boolean
  character?: React.ReactNode
  onChange?: (value: number) => void
  className?: string
  style?: React.CSSProperties
}
