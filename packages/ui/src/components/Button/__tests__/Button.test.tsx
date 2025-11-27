import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('defaults type to button', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button', { name: 'Click' })
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    const btn = screen.getByRole('button', { name: 'Loading' })
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(btn).toBeDisabled()
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    let btn = screen.getByRole('button', { name: 'Small' })
    expect(btn.className).toMatch('button-small')
    rerender(<Button size="large">Large</Button>)
    btn = screen.getByRole('button', { name: 'Large' })
    expect(btn.className).toMatch('button-large')
  })

  it('supports new variants', () => {
    const { rerender } = render(<Button variant="danger">Danger</Button>)
    let btn = screen.getByRole('button', { name: 'Danger' })
    expect(btn.className).toMatch('button-danger')
    rerender(<Button variant="success">Success</Button>)
    btn = screen.getByRole('button', { name: 'Success' })
    expect(btn.className).toMatch('button-success')
    rerender(<Button variant="warning">Warning</Button>)
    btn = screen.getByRole('button', { name: 'Warning' })
    expect(btn.className).toMatch('button-warning')
    rerender(<Button variant="link">Link</Button>)
    btn = screen.getByRole('button', { name: 'Link' })
    expect(btn.className).toMatch('button-link')
  })

  it('icon-only requires aria-label', () => {
    render(<Button iconOnly aria-label="Star" icon={<span>★</span>} />)
    const btn = screen.getByRole('button', { name: 'Star' })
    expect(btn).toHaveAttribute('aria-label', 'Star')
  })
})
