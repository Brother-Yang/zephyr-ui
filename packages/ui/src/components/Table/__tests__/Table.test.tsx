import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Table from '../Table'
import { ConfigProvider, enUS } from '../../../config'

type Row = { id: string; name: string; age: number; disabled?: boolean }
const data: Row[] = [
  { id: '1', name: 'Alice', age: 28 },
  { id: '2', name: 'Bob', age: 34, disabled: true },
  { id: '3', name: 'Charlie', age: 22 },
]
const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
]

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Table', () => {
  it('hides header selection in radio mode', () => {
    render(wrap(<Table<Row>
      dataSource={data}
      columns={columns}
      rowKey="id"
      rowSelection={{ type: 'radio' }}
    />))
    const thead = screen.getByRole('table').querySelector('thead')!
    const inputs = within(thead).queryAllByRole('checkbox')
    expect(inputs.length).toBe(0)
  })

  it('header checkbox is indeterminate when partial selection', () => {
    render(wrap(<Table<Row>
      dataSource={data}
      columns={columns}
      rowKey="id"
      rowSelection={{ type: 'checkbox', selectedRowKeys: ['1'] }}
    />))
    const thead = screen.getByRole('table').querySelector('thead')!
    const headerCb = within(thead).getByRole('checkbox') as HTMLInputElement
    expect(headerCb.indeterminate).toBe(true)
  })

  it('select all ignores disabled rows', () => {
    render(wrap(<Table<Row>
      dataSource={data}
      columns={columns}
      rowKey="id"
      rowSelection={{
        type: 'checkbox',
        getCheckboxProps: (r) => ({ disabled: r.disabled })
      }}
    />))
    const thead = screen.getByRole('table').querySelector('thead')!
    const headerCb = within(thead).getByRole('checkbox') as HTMLInputElement
    fireEvent.click(headerCb)
    const tbody = screen.getByRole('table').querySelector('tbody')!
    const checkedRows = within(tbody).getAllByRole('checkbox').filter((el: any) => (el as HTMLInputElement).checked)
    expect(checkedRows.length).toBe(2) // one disabled row excluded
  })

  it('aria-sort toggles on sortable header click', () => {
    render(wrap(<Table<Row> dataSource={data} columns={columns} rowKey="id" />))
    const nameTh = screen.getByText('Name').closest('th')!
    expect(nameTh).toHaveAttribute('aria-sort', 'none')
    fireEvent.click(nameTh)
    expect(nameTh).toHaveAttribute('aria-sort', 'ascending')
    fireEvent.click(nameTh)
    expect(nameTh).toHaveAttribute('aria-sort', 'descending')
  })

  it('expand button reflects aria-expanded', () => {
    render(wrap(<Table<Row>
      dataSource={data}
      columns={columns}
      rowKey="id"
      expandable={{
        expandedRowRender: (r) => <div>Details {r.name}</div>
      }}
    />))
    const tbody = screen.getByRole('table').querySelector('tbody')!
    const btn = within(tbody).getAllByRole('button')[0]
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })
})
