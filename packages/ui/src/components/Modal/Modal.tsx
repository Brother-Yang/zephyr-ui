import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { withPrefix } from '../../config/classPrefix'
import '../../styles/variables.css'
import type { ModalProps } from '../../types/modal'
import { useConfig } from '../../config'
import { Button } from '../Button'

export default function Modal({
  open,
  title,
  children,
  footer,
  okText,
  cancelText,
  onOk,
  onCancel,
  confirmLoading = false,
  maskClosable = true,
  keyboard = true,
  closable = true,
  closeIcon,
  centered = false,
  width = 520,
  zIndex = 1000,
  destroyOnHidden = false,
  className = '',
  style
}: ModalProps) {
  const { locale } = useConfig()
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const titleId = React.useMemo(() => `modal-title-${Math.random().toString(36).slice(2)}`, [])

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return
      if (keyboard && e.key === 'Escape') {
        onCancel?.(e as any)
      }
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
    if (e.target === e.currentTarget) onCancel?.(e)
  }

  const root = (
    <div className={`${withPrefix('modal-root')} ${open ? withPrefix('open') : withPrefix('hidden')} ${className}`.trim()} style={{ zIndex }}>
      <div className={withPrefix('modal-mask')} onClick={handleMaskClick} />
      <div
        className={`${withPrefix('modal-wrapper')} ${centered ? withPrefix('centered') : ''}`}
        style={style}
        tabIndex={-1}
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <div className={withPrefix('modal')} style={{ width }}>
          {(title !== undefined || closable) && (
            <div className={withPrefix('modal-header')}>
              {title !== undefined && (
                <div className={withPrefix('modal-title')} id={titleId}>{title}</div>
              )}
              {closable && (
                <button
                  className={withPrefix('modal-close')}
                  aria-label={locale?.modal?.closeAriaLabel ?? locale?.common?.close}
                  onClick={(e) => onCancel?.(e as any)}
                >
                  {closeIcon ?? <span>&times;</span>}
                </button>
              )}
            </div>
          )}
          <div className={withPrefix('modal-body')}>
            {open || !destroyOnHidden ? children : null}
          </div>
          {footer !== null && (
            <div className={withPrefix('modal-footer')}>
              {footer !== undefined ? (
                footer
              ) : (
                <>
                  <Button variant="secondary" onClick={(e) => onCancel?.(e as any)}>{cancelText ?? locale?.modal?.cancelText  }</Button>
                    <Button variant="primary" onClick={(e) => onOk?.(e as any)} loading={confirmLoading}>{okText ?? locale?.modal?.okText}</Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(root, document.body)
}
