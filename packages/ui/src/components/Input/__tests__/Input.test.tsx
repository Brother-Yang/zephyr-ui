import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../Input'
import { ConfigProvider, enUS } from '../../../config'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Input', () => {
  it('shows clear button with type=button and localized aria-label', () => {
    render(wrap(<Input defaultValue="abc" allowClear />))
    const clearBtn = screen.getByRole('button', { name: 'Clear' })
    expect(clearBtn).toBeInTheDocument()
    expect(clearBtn).toHaveAttribute('type', 'button')
  })

  it('clear triggers onClear and onChange with empty string (uncontrolled)', () => {
    const onClear = vi.fn()
    const onChange = vi.fn()
    render(wrap(<Input defaultValue="abc" allowClear onClear={onClear} onChange={onChange} />))
    const clearBtn = screen.getByRole('button', { name: 'Clear' })
    fireEvent.click(clearBtn)
    expect(onClear).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('sets aria-invalid when status=error', () => {
    render(wrap(<Input status="error" />))
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies size classes on wrapper', () => {
    const { rerender } = render(wrap(<Input size="small" />))
    // wrapper has size class
    let wrapper = screen.getByRole('textbox').parentElement!
    expect(wrapper.className).toMatch('input-small')
    rerender(wrap(<Input size="large" />))
    wrapper = screen.getByRole('textbox').parentElement!
    expect(wrapper.className).toMatch('input-large')
  })

  it('supports onPressEnter and Esc to clear', () => {
    const onPressEnter = vi.fn()
    const onChange = vi.fn()
    render(wrap(<Input defaultValue="abc" allowClear onPressEnter={onPressEnter} onChange={onChange} />))
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onPressEnter).toHaveBeenCalledWith('abc')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onChange).toHaveBeenCalledWith('')
  })
})
