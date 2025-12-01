import React, { useMemo, useState, useRef } from 'react';
import {
  ConfigProvider,
  enUS,
  zhCN,
  Button,
  Modal,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Table,
  Tabs,
  Form,
  FormItem,
  Empty,
  DatePicker,
  Collapse,
  Timeline,
  Tooltip,
  Rate
} from '@zephyr-ui/ui';

export default function App() {
  const [dark, setDark] = useState(false);
  const [localeKey, setLocaleKey] = useState<'en' | 'zh'>('en');
  const locale = useMemo(() => (localeKey === 'en' ? enUS : zhCN), [localeKey]);

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<'a' | 'b' | 'c'>('a');
  const [selectValue, setSelectValue] = useState<string | number>('');
  const [multiValues, setMultiValues] = useState<Array<string | number>>([]);
  const [switchOn, setSwitchOn] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const apiRef = useRef<any>(null);
  const [lastChange, setLastChange] = useState<string>('');

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
    { key: 'address', title: 'Address' }
  ] as const;
  const data = [
    { name: 'Alice', age: 28, address: 'Seattle' },
    { name: 'Bob', age: 34, address: 'San Francisco' },
    { name: 'Charlie', age: 22, address: 'New York' }
  ];

  const bigData = useMemo(() => (
    Array.from({ length: 42 }, (_, i) => ({
      id: String(i + 1),
      name: ['Alice', 'Bob', 'Charlie'][i % 3],
      age: 20 + (i % 50),
      address: ['Seattle', 'San Francisco', 'New York'][i % 3]
    }))
  ), []);

  const [tablePage, setTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [checkboxSelected, setCheckboxSelected] = useState<string[]>([]);
  const [radioSelected, setRadioSelected] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tabsActive, setTabsActive] = useState<string>('a1');
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);
  const [dpSingle, setDpSingle] = useState<Date | null>(null);
  const [dpRange, setDpRange] = useState<[Date, Date] | null>(null);
  const [rateValue, setRateValue] = useState<number>(2.5);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const [modalCentered, setModalCentered] = useState(false);
  const [modalCustomFooter, setModalCustomFooter] = useState(false);
  const [modalNoFooter, setModalNoFooter] = useState(false);
  const [modalMaskFalse, setModalMaskFalse] = useState(false);
  const [modalKeyboardFalse, setModalKeyboardFalse] = useState(false);
  const [modalDestroyOnHidden, setModalDestroyOnHidden] = useState(false);
  const [modalLarge, setModalLarge] = useState(false);
  const [modalCloseIcon, setModalCloseIcon] = useState(false);
  const [modalHighZ, setModalHighZ] = useState(false);
  const [modalLoadingOpen, setModalLoadingOpen] = useState(false);
  const [okLoading, setOkLoading] = useState(false);
  

  return (
    <ConfigProvider theme={dark ? 'dark' : 'light'} locale={locale}>
      <div style={{ padding: 24, display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button onClick={() => setDark(v => !v)}>{dark ? 'Light' : 'Dark'}</Button>
          <Button variant="secondary" onClick={() => setLocaleKey(k => (k === 'en' ? 'zh' : 'en'))}>
            {localeKey === 'en' ? '中文' : 'English'}
          </Button>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <Input
              value={inputValue}
              onChange={setInputValue}
              placeholder="Input"
              allowClear
              prefix={<span>🔍</span>}
              suffix={<span>{inputValue?.length || 0}</span>}
              onPressEnter={(v) => console.log('enter', v)}
            />
          </div>
          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Input Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Input size="small" allowClear placeholder="Small" />
                <Input size="medium" allowClear placeholder="Medium" />
                <Input size="large" allowClear placeholder="Large" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Input status="default" placeholder="Default" />
                <Input status="error" placeholder="Error" />
                <Input status="success" placeholder="Success" />
                <Input status="warning" placeholder="Warning" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Input disabled placeholder="Disabled" />
                <Input readOnly defaultValue="Readonly" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Input allowClear prefix={<span>🔍</span>} suffix={<span>kg</span>} placeholder="Prefix/Suffix" onPressEnter={(v) => console.log('enter affix', v)} />
                <Input value={inputValue} onChange={setInputValue} allowClear placeholder="Controlled" onPressEnter={(v) => console.log('enter controlled', v)} />
              </div>
            </div>
          </div>
          <div>
            <Checkbox checked={checked} onChange={setChecked} label="Checkbox" />
          </div>
          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Checkbox Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Checkbox size="small" label="Small" />
                <Checkbox size="medium" label="Medium" />
                <Checkbox size="large" label="Large" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Checkbox label="Indeterminate" indeterminate />
                <Checkbox label="Disabled" disabled />
              </div>
              <div>
                <CheckboxGroup
                  options={[
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana', disabled: true },
                    { label: 'Cherry', value: 'cherry' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div>
            <RadioGroup
              options={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' }
              ]}
              value={radioValue}
              onChange={setRadioValue}
            />
          </div>
          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Radio Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Radio label="Small" defaultChecked size="small" />
                <Radio label="Medium" defaultChecked size="medium" />
                <Radio label="Large" defaultChecked size="large" />
              </div>
              <div>
                <RadioGroup
                  options={[
                    { label: 'Seattle', value: 'seattle' },
                    { label: 'San Francisco', value: 'sf', disabled: true },
                    { label: 'New York', value: 'ny' }
                  ]}
                  defaultValue={'seattle'}
                  direction="vertical"
                  name="city"
                />
              </div>
              <div>
                Tip: Focus the group and use Arrow keys to navigate.
              </div>
            </div>
          </div>
          <div>
            <Select
              options={[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry', disabled: true }
              ]}
              value={selectValue}
              onChange={setSelectValue}
              placeholder={locale.select.placeholder}
            />
          </div>
          <div>
            <Select
              options={[
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' }
              ]}
              value={multiValues}
              onChange={setMultiValues}
              multiple
              placeholder={locale.select.placeholderMultiple}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Select
              options={[
                { label: 'Seattle', value: 'seattle' },
                { label: 'San Francisco', value: 'sf' },
                { label: 'New York', value: 'ny' }
              ]}
              placeholder={locale.select.placeholder}
            />
            <Select
              options={[]}
              placeholder={locale.select.placeholder}
            />
            <Select
              options={[
                { label: 'Alpha', value: 'a' },
                { label: 'Beta', value: 'b' },
                { label: 'Gamma', value: 'g' }
              ]}
              multiple
              value={['a', 'b']}
              onChange={setMultiValues as any}
              placeholder={locale.select.placeholderMultiple}
            />
          </div>
          <div>
            <Switch checked={switchOn} onChange={setSwitchOn} label={switchOn ? 'On' : 'Off'} />
          </div>
          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Switch Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Switch size="small" checked={switchA} onChange={setSwitchA} label={`Small ${switchA ? 'On' : 'Off'}`} />
                <Switch size="medium" checked={switchB} onChange={setSwitchB} label={`Medium ${switchB ? 'On' : 'Off'}`} />
                <Switch size="large" defaultChecked label="Large Default On" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Switch disabled label="Disabled" />
                <Switch defaultChecked disabled label="Disabled On" />
                <Switch readOnly defaultChecked label="ReadOnly" />
                <Switch status="error" label="Error State" />
                <Switch status="success" label="Success State" defaultChecked />
                <Switch status="warning" label="Warning State" />
              </div>
            </div>
          </div>
          <div>
            <Table
              dataSource={data}
              columns={columns as any}
              pagination={{ pageSize: 5, showTotal: true }}
              bordered
              striped
            />
          </div>
          <div>
            <Table
              dataSource={[]}
              columns={columns as any}
              pagination={{ pageSize: 5, showTotal: true }}
              bordered
              striped
            />
          </div>

          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Empty Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <Empty>Empty</Empty>
              <Empty icon={<span>📦</span>} description="No items found" />
              <Empty size="large" icon={<span>🗂️</span>} description="Nothing here yet" actions={<Button onClick={() => alert('Create')}>Create</Button>} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
            <h3 style={{ margin: '8px 0' }}>Table Examples</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Table dataSource={bigData.slice(0, 5)} columns={columns as any} size="small" />
                <Table dataSource={bigData.slice(0, 5)} columns={columns as any} size="medium" />
                <Table dataSource={bigData.slice(0, 5)} columns={columns as any} size="large" />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Table dataSource={bigData.slice(0, 5)} columns={columns as any} bordered />
                <Table dataSource={bigData.slice(0, 5)} columns={columns as any} striped />
              </div>
              <div>
                <Table
                  dataSource={bigData}
                  columns={columns as any}
                  pagination={{ pageSize: 10, showTotal: true, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
                  onSortChange={(field, order) => console.log('sort change', field, order)}
                />
              </div>
              <div>
                <Table
                  dataSource={bigData}
                  columns={columns as any}
                  rowKey="id"
                  rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: checkboxSelected,
                    onChange: (keys) => setCheckboxSelected(keys),
                    getCheckboxProps: (rec: any) => ({ disabled: rec.name === 'Bob' })
                  }}
                />
              </div>
              <div>
                <Table
                  dataSource={bigData}
                  columns={columns as any}
                  rowKey="id"
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: radioSelected ? [radioSelected] : [],
                    onChange: (keys) => setRadioSelected(keys[0] || null)
                  }}
                />
              </div>
              <div>
                <Table
                  dataSource={bigData}
                  columns={columns as any}
                  rowKey="id"
                  expandable={{
                    expandedRowKeys: expandedKeys,
                    onExpand: (expanded, rec: any) => {
                      setExpandedKeys(prev => expanded ? [...prev, rec.id] : prev.filter(k => k !== rec.id));
                    },
                    expandedRowRender: (rec: any) => (
                      <div style={{ padding: 8 }}>
                        <div><strong>Name:</strong> {rec.name}</div>
                        <div><strong>Age:</strong> {rec.age}</div>
                        <div><strong>Address:</strong> {rec.address}</div>
                      </div>
                    )
                  }}
                />
              </div>
              <div>
                <Table
                  dataSource={bigData}
                  columns={columns as any}
                  rowKey="id"
                  pagination={{
                    current: tablePage,
                    pageSize: tablePageSize,
                    total: bigData.length,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20],
                    showTotal: true,
                    onChange: (p, ps) => { setTablePage(p); setTablePageSize(ps); }
                  }}
                />
              </div>
              <div>
                <Table
                  dataSource={bigData.slice(0, 10)}
                  columns={columns as any}
                  loading={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Button Examples</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="link">Link</Button>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button icon={<span>★</span>}>With Icon</Button>
              <Button loading icon={<span>★</span>}>Loading Icon</Button>
              <Button iconOnly aria-label="Star" icon={<span>★</span>} />
            </div>
            <div>
              <Button block>Block</Button>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button rounded>Rounded</Button>
              <Button type="button">Type Button</Button>
              <Button type="reset" variant="secondary">Type Reset</Button>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            </div>
          </div>
          <Modal
            open={modalOpen}
            title="确认操作"
            onCancel={() => setModalOpen(false)}
            onOk={() => {
              setModalOpen(false)
            }}
            centered
          >
            <div>这是一个示例弹窗内容。</div>
          </Modal>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Form Example</h3>
          <Form
            initialValues={{ username: '', agree: false, fruit: '', colors: [], newsletter: false }}
            onFinish={(vals) => console.log('form submit', vals)}
          >
            <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
              <Input placeholder="Enter username" />
            </FormItem>

            <FormItem name="newsletter" label="Subscribe" valuePropName="checked">
              <Switch label="Subscribe to newsletter" />
            </FormItem>

            <FormItem name="agree" label="Agreement" required valuePropName="checked" rules={[{ required: true, message: 'Please accept' }]}>
              <Checkbox label="I agree to the terms" />
            </FormItem>

            <FormItem name="fruit" label="Favorite Fruit" required>
              <Select
                options={[
                  { label: 'Apple', value: 'apple' },
                  { label: 'Banana', value: 'banana' },
                  { label: 'Cherry', value: 'cherry' },
                ]}
                placeholder="Select one"
              />
            </FormItem>

            <FormItem name="colors" label="Colors (multiple)" required>
              <Select
                options={[
                  { label: 'Red', value: 'red' },
                  { label: 'Green', value: 'green' },
                  { label: 'Blue', value: 'blue' },
                ]}
                multiple
                placeholder="Select colors"
              />
            </FormItem>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="secondary">Reset</Button>
            </div>
          </Form>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Form Examples</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <h4 style={{ margin: '4px 0' }}>Blur Validation</h4>
              <Form
                initialValues={{ email: '', age: '', agree: false }}
                validateOnChange={false}
                validateOnBlur
                onFinish={(vals) => console.log('blur form submit', vals)}
                onValuesChange={(vals, changed) => setLastChange(`${changed.name}: ${String(changed.value)}`)}
              >
                <FormItem name="email" label="Email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }]}>
                  <Input placeholder="Enter email" />
                </FormItem>
                <FormItem name="age" label="Age" required rules={[{ pattern: /^\d+$/, message: 'Digits only' }]}>
                  <Input placeholder="Enter age" />
                </FormItem>
                <FormItem name="agree" label="Agreement" required valuePropName="checked">
                  <Checkbox label="I agree" />
                </FormItem>
                <div>Last change: {lastChange}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button type="submit">Submit</Button>
                  <Button type="reset" variant="secondary">Reset</Button>
                </div>
              </Form>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Horizontal Layout</h4>
              <Form layout="horizontal" initialValues={{ company: '', subscribe: false }}>
                <FormItem name="company" label="Company" required>
                  <Input placeholder="Enter company" />
                </FormItem>
                <FormItem name="subscribe" label="Subscribe" valuePropName="checked">
                  <Switch label="Receive updates" />
                </FormItem>
              </Form>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Disabled Form</h4>
              <Form disabled initialValues={{ name: 'Disabled', agree: true }}>
                <FormItem name="name" label="Name">
                  <Input />
                </FormItem>
                <FormItem name="agree" label="Agreement" valuePropName="checked">
                  <Checkbox label="Agreed" />
                </FormItem>
              </Form>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Form API</h4>
              <Form
                formRef={apiRef}
                initialValues={{ username: '', city: '' }}
                validateOnChange={false}
                onValuesChange={(vals, changed) => console.log('values change', changed)}
              >
                <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
                  <Input placeholder="Enter username" />
                </FormItem>
                <FormItem name="city" label="City" required>
                  <Select
                    options={[
                      { label: 'Seattle', value: 'seattle' },
                      { label: 'San Francisco', value: 'sf' },
                      { label: 'New York', value: 'ny' }
                    ]}
                    placeholder="Select city"
                  />
                </FormItem>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button onClick={() => apiRef.current?.setFieldsValue({ username: 'Alice', city: 'seattle' })}>Fill</Button>
                  <Button onClick={() => console.log('validate', apiRef.current?.validateFields())}>Validate</Button>
                  <Button onClick={() => apiRef.current?.resetFields()} variant="secondary">Reset</Button>
                  <Button onClick={() => apiRef.current?.submit()}>Submit</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Tabs Examples</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Tabs items={[{ key: 's1', label: 'Small 1', children: 'Small Content 1' }, { key: 's2', label: 'Small 2', children: 'Small Content 2' }]} size="small" />
              <Tabs items={[{ key: 'm1', label: 'Medium 1', children: 'Medium Content 1' }, { key: 'm2', label: 'Medium 2', children: 'Medium Content 2' }]} size="medium" />
              <Tabs items={[{ key: 'l1', label: 'Large 1', children: 'Large Content 1' }, { key: 'l2', label: 'Large 2', children: 'Large Content 2' }]} size="large" />
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Tabs items={[{ key: 'b1', label: 'Bordered 1', children: 'Bordered' }, { key: 'b2', label: 'Bordered 2', children: 'Bordered' }]} bordered />
              <Tabs items={[{ key: 'nb1', label: 'NoBorder 1', children: 'No Border' }, { key: 'nb2', label: 'NoBorder 2', children: 'No Border' }]} bordered={false} />
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Tabs
                items={[
                  { key: 'd1', label: 'Enabled', children: 'Enabled Content' },
                  { key: 'd2', label: 'Disabled', children: 'Disabled Content', disabled: true }
                ]}
                defaultActiveKey="d1"
              />
              <Tabs
                items={[
                  { key: 'x1', label: 'Mount/Unmount', children: <div>Active Only</div> },
                  { key: 'x2', label: 'Another', children: <div>Other Content</div> }
                ]}
                destroyInactiveTabPane
              />
            </div>

            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <Button onClick={() => setTabsActive('a1')}>Activate A1</Button>
                <Button onClick={() => setTabsActive('a2')}>Activate A2</Button>
              </div>
              <Tabs
                items={[
                  { key: 'a1', label: 'A1', children: 'Controlled Content 1' },
                  { key: 'a2', label: 'A2', children: 'Controlled Content 2' }
                ]}
                activeKey={tabsActive}
                onChange={setTabsActive}
              />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>DatePicker Examples</h3>
          <div style={{ display: 'grid', gap: 24 }}>
            <div>
              <h4 style={{ margin: '4px 0' }}>Single (controlled)</h4>
              <DatePicker
                mode="single"
                value={dpSingle}
                onChange={setDpSingle}
                placeholder="选择日期"
              />
              <div style={{ marginTop: 8 }}>
                Selected: {dpSingle ? dpSingle.toLocaleDateString() : 'None'}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Range (controlled)</h4>
              <DatePicker
                mode="range"
                value={dpRange}
                onChange={setDpRange}
                placeholder="选择日期范围"
              />
              <div style={{ marginTop: 8 }}>
                Selected: {dpRange && dpRange[0] && dpRange[1] ? `${dpRange[0].toLocaleDateString()} ~ ${dpRange[1].toLocaleDateString()}` : 'None'}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Disabled Past Dates</h4>
              <DatePicker
                mode="single"
                disabledDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                placeholder="不可选择过去日期"
              />
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Custom Styled + Prefix</h4>
              <ConfigProvider classPrefix="dp">
                <DatePicker
                  mode="single"
                  cssVariables={{
                    '--cal-primary-color': '#7c3aed',
                    '--cal-primary-hover': '#6d28d9',
                    '--cal-font-size': '16px',
                    '--cal-day-size': '36px'
                  }}
                />
              </ConfigProvider>
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Custom Format</h4>
              <DatePicker
                mode="single"
                format={(v) => {
                  if (!v || Array.isArray(v)) return '';
                  const d = v as Date;
                  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
                }}
                placeholder="YYYY年MM月DD日"
              />
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Disabled Picker</h4>
              <DatePicker disabled placeholder="Disabled" />
            </div>

            <div>
              <h4 style={{ margin: '4px 0' }}>Default Month</h4>
              <DatePicker defaultMonth={new Date(2025, 0, 1)} />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Collapse Examples</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <h4 style={{ margin: '4px 0' }}>Basic</h4>
              <Collapse
                items={[
                  { key: 'a', label: 'Item A', content: <div style={{ padding: 8 }}>Content A</div> },
                  { key: 'b', label: 'Item B', content: <div style={{ padding: 8 }}>Content B</div> },
                  { key: 'c', label: 'Item C', content: <div style={{ padding: 8 }}>Content C</div> }
                ]}
                defaultActiveKeys={['a']}
              />
            </div>
            <div>
              <h4 style={{ margin: '4px 0' }}>Accordion</h4>
              <Collapse
                accordion
                items={[
                  { key: 'x', label: 'Section X', content: <div style={{ padding: 8 }}>Details X</div> },
                  { key: 'y', label: 'Section Y', content: <div style={{ padding: 8 }}>Details Y</div> },
                  { key: 'z', label: 'Section Z (Disabled)', content: <div style={{ padding: 8 }}>Details Z</div>, disabled: true }
                ]}
              />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Timeline Examples</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <h4 style={{ margin: '4px 0' }}>Default</h4>
              <Timeline
                items={[
                  { key: 't1', label: '09:00', content: 'Start' },
                  { key: 't2', label: '11:00', content: 'Checkpoint' },
                  { key: 't3', label: '13:00', content: 'Break' }
                ]}
              />
            </div>
            <div>
              <h4 style={{ margin: '4px 0' }}>Status</h4>
              <Timeline
                items={[
                  { key: 'ts1', content: 'Deploy', status: 'success' },
                  { key: 'ts2', content: 'Metrics warning', status: 'warning' },
                  { key: 'ts3', content: 'Error event', status: 'error' }
                ]}
              />
            </div>
            <div>
              <h4 style={{ margin: '4px 0' }}>Status</h4>
              <Timeline
                orientation="horizontal"
                items={[
                  { key: 'ts1', content: 'Deploy', status: 'success' },
                  { key: 'ts2', content: 'Metrics warning', status: 'warning' },
                  { key: 'ts3', content: 'Error event', status: 'error' }
                ]}
              />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Tooltip Examples</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tooltip title="Top tip" placement="top"><Button>Top</Button></Tooltip>
            <Tooltip title="Bottom tip" placement="bottom"><Button>Bottom</Button></Tooltip>
            <Tooltip title="Left tip" placement="left"><Button>Left</Button></Tooltip>
            <Tooltip title="Right tip" placement="right"><Button>Right</Button></Tooltip>
            <Tooltip title={<span>Rich tip ✨</span>} placement="top"><span style={{ padding: 8, border: '1px solid var(--dui-border)', borderRadius: 6 }}>Hover me</span></Tooltip>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Modal Examples</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button onClick={() => setModalBasic(true)}>Basic</Button>
            <Button onClick={() => setModalCentered(true)}>Centered</Button>
            <Button onClick={() => setModalCustomFooter(true)}>Custom Footer</Button>
            <Button onClick={() => setModalNoFooter(true)}>No Footer</Button>
            <Button onClick={() => setModalMaskFalse(true)}>Mask Not Closable</Button>
            <Button onClick={() => setModalKeyboardFalse(true)}>Keyboard Off</Button>
            <Button onClick={() => setModalDestroyOnHidden(true)}>Destroy On Hidden</Button>
            <Button onClick={() => setModalLarge(true)}>Width 720</Button>
            <Button onClick={() => setModalCloseIcon(true)}>Custom Close Icon</Button>
            <Button onClick={() => setModalHighZ(true)}>High zIndex</Button>
            <Button onClick={() => { setOkLoading(false); setModalLoadingOpen(true); }}>Confirm Loading</Button>
          </div>

          <Modal
            open={modalBasic}
            title="基础弹窗"
            onCancel={() => setModalBasic(false)}
            onOk={() => setModalBasic(false)}
          >
            <div>这是一个基础弹窗。</div>
          </Modal>

          <Modal
            open={modalCentered}
            title="垂直居中"
            centered
            onCancel={() => setModalCentered(false)}
            onOk={() => setModalCentered(false)}
          >
            <div>弹窗垂直居中显示。</div>
          </Modal>

          <Modal
            open={modalCustomFooter}
            title="自定义底部"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setModalCustomFooter(false)}>取消</Button>
                <Button onClick={() => setModalCustomFooter(false)}>确定</Button>
              </div>
            }
            onCancel={() => setModalCustomFooter(false)}
          >
            <div>底部按钮自定义。</div>
          </Modal>

          <Modal
            open={modalNoFooter}
            title="隐藏底部"
            footer={null}
            onCancel={() => setModalNoFooter(false)}
          >
            <div>不显示底部区域。</div>
          </Modal>

          <Modal
            open={modalMaskFalse}
            title="遮罩不可关闭"
            maskClosable={false}
            onCancel={() => setModalMaskFalse(false)}
            onOk={() => setModalMaskFalse(false)}
          >
            <div>点击遮罩不会关闭。</div>
          </Modal>

          <Modal
            open={modalKeyboardFalse}
            title="禁用键盘关闭"
            keyboard={false}
            onCancel={() => setModalKeyboardFalse(false)}
            onOk={() => setModalKeyboardFalse(false)}
          >
            <div>按 Esc 不会关闭。</div>
          </Modal>

          <Modal
            open={modalDestroyOnHidden}
            title="关闭销毁子元素"
            destroyOnHidden
            onCancel={() => setModalDestroyOnHidden(false)}
            onOk={() => setModalDestroyOnHidden(false)}
          >
            <Input placeholder="关闭后再次打开将重置内容" />
          </Modal>

          <Modal
            open={modalLarge}
            title="宽度 720"
            width={720}
            onCancel={() => setModalLarge(false)}
            onOk={() => setModalLarge(false)}
          >
            <div>更大的对话框宽度。</div>
          </Modal>

          <Modal
            open={modalCloseIcon}
            title="自定义关闭图标"
            closeIcon={<span>✖️</span>}
            onCancel={() => setModalCloseIcon(false)}
            onOk={() => setModalCloseIcon(false)}
          >
            <div>右上角图标自定义。</div>
          </Modal>

          <Modal
            open={modalHighZ}
            title="高 zIndex"
            zIndex={2000}
            onCancel={() => setModalHighZ(false)}
            onOk={() => setModalHighZ(false)}
          >
            <div>更高的层级覆盖。</div>
          </Modal>

          <Modal
            open={modalLoadingOpen}
            title="确定加载"
            confirmLoading={okLoading}
            onCancel={() => { setModalLoadingOpen(false); setOkLoading(false); }}
            onOk={() => {
              setOkLoading(true)
              setTimeout(() => { setOkLoading(false); setModalLoadingOpen(false) }, 1000)
            }}
          >
            <div>点击确定后显示加载并延迟关闭。</div>
          </Modal>
        </div>

        <div style={{ borderTop: '1px solid var(--dui-border)', paddingTop: 16 }}>
          <h3 style={{ margin: '8px 0' }}>Rate Examples</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ margin: '4px 0' }}>Basic</h4>
                <Rate />
              </div>
              <div>
                <h4 style={{ margin: '4px 0' }}>Count 10</h4>
                <Rate count={10} />
              </div>
              <div>
                <h4 style={{ margin: '4px 0' }}>Allow Half</h4>
                <Rate allowHalf />
              </div>
              <div>
                <h4 style={{ margin: '4px 0' }}>Disabled</h4>
                <Rate disabled defaultValue={3} />
              </div>
              <div>
                <h4 style={{ margin: '4px 0' }}>ReadOnly</h4>
                <Rate readOnly value={4} />
              </div>
              <div>
                <h4 style={{ margin: '4px 0' }}>Custom Character</h4>
                <Rate character={<span>❤️</span>} />
              </div>
            </div>
            <div>
              <h4 style={{ margin: '4px 0' }}>Controlled (allowHalf)</h4>
              <Rate allowHalf value={rateValue} onChange={setRateValue} />
              <div style={{  marginTop: 8 }}>Value: {rateValue}</div>
            </div>
            <div>
              Tip: Use Arrow keys to adjust when focused.
            </div>
          </div>
        </div>

        
      </div>
    </ConfigProvider>
  );
}
