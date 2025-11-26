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
            <Input value={inputValue} onChange={setInputValue} placeholder="Input" />
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
