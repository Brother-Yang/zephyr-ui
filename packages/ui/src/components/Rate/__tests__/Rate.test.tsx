import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Rate from '../Rate'

describe('Rate', () => {
  it('renders and changes value on click', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(<Rate count={5} onChange={onChange} />)
    const third = getByLabelText('Rate 3')
    fireEvent.click(third)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('honors disabled', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(<Rate count={5} disabled onChange={onChange} />)
    const second = getByLabelText('Rate 2')
    fireEvent.click(second)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('custom character remains clickable', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(<Rate count={5} character={<span>❤️</span>} onChange={onChange} />)
    const fourth = getByLabelText('Rate 4')
    fireEvent.click(fourth)
    expect(onChange).toHaveBeenCalledWith(4)
  })
})
