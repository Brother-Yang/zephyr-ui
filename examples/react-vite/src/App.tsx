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
  Tabs
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

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <Input value={inputValue} onChange={setInputValue} placeholder="Input" />
            <Checkbox checked={checked} onChange={setChecked} label="Checkbox" />
            <RadioGroup
              options={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' }
              ]}
              value={radioValue}
              onChange={setRadioValue}
            />
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
            <Switch checked={switchOn} onChange={setSwitchOn} label={switchOn ? 'On' : 'Off'} />
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <Table
              dataSource={data}
              columns={columns as any}
              pagination={{ pageSize: 5, showTotal: true }}
              bordered
              striped
            />
          </div>
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
