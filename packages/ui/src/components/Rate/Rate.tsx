import React from 'react'
import './Rate.css'
import { withPrefix } from '../../config/classPrefix'
import type { RateProps } from '../../types/rate'

export default function Rate({
  count = 5,
  value,
  defaultValue = 0,
  allowHalf = false,
  disabled = false,
  readOnly = false,
  character,
  onChange,
  className = '',
  style
}: RateProps) {
  const [inner, setInner] = React.useState<number>(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const rootValue = typeof value === 'number' ? value : inner
  const rootClasses = [withPrefix('rate'), className].filter(Boolean).join(' ')

  function setValue(next: number) {
    if (disabled || readOnly) return
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  function calcStarValue(e: React.MouseEvent, index: number) {
    if (!allowHalf) return index
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const half = x <= rect.width / 2 ? 0.5 : 1
    return index - (half === 0.5 ? 0.5 : 0) + (half === 1 ? 0 : 0)
  }

  function onStarMouseMove(e: React.MouseEvent, index: number) {
    if (disabled || readOnly) return
    const next = calcStarValue(e, index)
    setHover(next)
  }

  function onStarMouseLeave() {
    setHover(null)
  }

  function onStarClick(e: React.MouseEvent, index: number) {
    if (disabled || readOnly) return
    const next = allowHalf ? calcStarValue(e, index) : index
    setValue(next)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled || readOnly) return
    if (e.key === 'ArrowRight') {
      const step = allowHalf ? 0.5 : 1
      const next = Math.min(count, rootValue + step)
      setValue(next)
    } else if (e.key === 'ArrowLeft') {
      const step = allowHalf ? 0.5 : 1
      const next = Math.max(0, rootValue - step)
      setValue(next)
    }
  }

  const displayValue = hover ?? rootValue

  return (
    <div className={rootClasses} style={style} role="radiogroup" aria-disabled={disabled || undefined} onKeyDown={onKeyDown} tabIndex={disabled ? -1 : 0}>
      {Array.from({ length: count }, (_, i) => {
        const index = i + 1
        const full = displayValue >= index
        const half = allowHalf && displayValue >= index - 0.5 && displayValue < index
        const starClasses = [
          withPrefix('rate-star'),
          full ? withPrefix('rate-star-full') : '',
          half ? withPrefix('rate-star-half') : '',
          !full && !half ? withPrefix('rate-star-empty') : '',
          disabled || readOnly ? withPrefix('rate-star-disabled') : ''
        ].filter(Boolean).join(' ')
        const icon = character ?? '★'
        const emptyIcon = character ?? '☆'
        return (
          <button
            key={index}
            type="button"
            className={starClasses}
            aria-checked={full || half}
            aria-label={`Rate ${index}`}
            disabled={disabled}
            onMouseMove={(e) => onStarMouseMove(e, index)}
            onMouseLeave={onStarMouseLeave}
            onClick={(e) => onStarClick(e, index)}
          >
            <span className={withPrefix('rate-star-base')}>{emptyIcon}</span>
            <span className={withPrefix('rate-star-fill')}>{icon}</span>
          </button>
        )
      })}
    </div>
  )
}

