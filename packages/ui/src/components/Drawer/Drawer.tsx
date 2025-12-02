import React from 'react'
import ReactDOM from 'react-dom'
import './Drawer.css'
import { withPrefix } from '../../config/classPrefix'
import '../../styles/variables.css'
import type { DrawerProps } from '../../types/drawer'
import { useConfig } from '../../config'

export default function Drawer({
  open,
  title,
  placement = 'right',
  width = 360,
  height = 240,
  zIndex = 1000,
  maskClosable = true,
  keyboard = true,
  closable = true,
  closeIcon,
  destroyOnHidden = false,
  extra,
  className = '',
  style,
  onClose,
  children
}: DrawerProps) {
  const { locale } = useConfig()
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const titleId = React.useMemo(() => `drawer-title-${Math.random().toString(36).slice(2)}`, [])

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return
      if (keyboard && e.key === 'Escape') onClose?.(e)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, keyboard])

  React.useEffect(() => {
    if (open) {
      const el = wrapperRef.current
      el?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleMaskClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!maskClosable) return
    if (e.target === e.currentTarget) onClose?.(e)
  }

  const sizeStyle = placement === 'left' || placement === 'right' ? { width } : { height }

  const root = (
    <div className={`${withPrefix('drawer-root')} ${open ? withPrefix('open') : withPrefix('hidden')} ${className}`.trim()} style={{ zIndex }}>
      <div className={withPrefix('drawer-mask')} onClick={handleMaskClick} />
      <div
        className={`${withPrefix('drawer-wrapper')} ${withPrefix(`drawer-${placement}`)} ${open ? withPrefix('enter') : withPrefix('leave')}`}
        style={style}
        tabIndex={-1}
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <div className={withPrefix('drawer')} style={sizeStyle}>
          {(title !== undefined || closable || extra) && (
            <div className={withPrefix('drawer-header')}>
              {title !== undefined && (
                <div className={withPrefix('drawer-title')} id={titleId}>{title}</div>
              )}
              <div className={withPrefix('drawer-actions')}>
                {extra}
                {closable && (
                  <button
                    className={withPrefix('drawer-close')}
                    aria-label={locale?.modal?.closeAriaLabel ?? locale?.common?.close}
                    onClick={(e) => onClose?.(e)}
                  >
                    {closeIcon ?? <span>&times;</span>}
                  </button>
                )}
              </div>
            </div>
          )}
          <div className={withPrefix('drawer-body')}>
            {open || !destroyOnHidden ? children : null}
          </div>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(root, document.body)
}
