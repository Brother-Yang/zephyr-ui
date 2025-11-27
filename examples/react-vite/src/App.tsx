import React, { useMemo, useState } from 'react';
import {
  ConfigProvider,
  enUS,
  zhCN,
  Button,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Table,
  Tabs,
  Form,
  FormItem
} from '@demo/ui';

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
          <div>
            <Switch checked={switchOn} onChange={setSwitchOn} label={switchOn ? 'On' : 'Off'} />
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
            </div>
          </div>
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

        <Tabs
          items={[
            { key: 'tab1', label: 'Tab 1', children: 'Content 1' },
            { key: 'tab2', label: 'Tab 2', children: 'Content 2' }
          ]}
        />
      </div>
    </ConfigProvider>
  );
}
