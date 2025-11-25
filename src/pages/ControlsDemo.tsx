import React, { useState } from 'react';
import { Button, Input, Select, Checkbox, Tabs, Switch } from '../components';

export default function ControlsDemo() {
  const [text, setText] = useState('Hello');
  const [single, setSingle] = useState<string>('apple');
  const [multi, setMulti] = useState<string[]>(['apple']);
  const [checked, setChecked] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(true);

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange', disabled: true },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--color-text)' }}>Controls Demo</h2>
      <div style={{ display: 'grid', gap: 20 }}>
        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Tabs</h3>
          <Tabs
            items={[
              { key: 'general', label: 'General', content: <div style={{ color: 'var(--color-text-secondary)' }}>General settings content</div> },
              { key: 'advanced', label: 'Advanced', content: <div style={{ color: 'var(--color-text-secondary)' }}>Advanced settings content</div> },
              { key: 'disabled', label: 'Disabled', disabled: true, content: <div>Disabled</div> },
            ]}
            defaultActiveKey="general"
          />
        </section>
        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Button</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="small">Small</Button>
            <Button size="large" loading>Loading</Button>
            <Button block style={{ maxWidth: 200 }}>Block</Button>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Input</h3>
          <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <Input placeholder="Enter text" value={text} onChange={setText} allowClear />
            <Input size="small" defaultValue="Small" prefix={<span>🔎</span>} />
            <Input size="large" status="error" defaultValue="Error state" />
            <Input disabled defaultValue="Disabled" />
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Select</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Select options={options} value={single} onChange={(v) => setSingle(v as string)} />
            <Select options={options} size="large" multiple value={multi} onChange={(v) => setMulti(v as string[])} />
            <Select options={options} disabled placeholder="Disabled" />
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Checkbox</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <Checkbox checked={checked} onChange={setChecked} label="Checked" />
            <Checkbox indeterminate label="Indeterminate" />
            <Checkbox disabled label="Disabled" />
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Switch</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Switch checked={toggle} onChange={setToggle} />
            <Switch size="small" />
            <Switch size="large" />
            <Switch disabled label="Disabled" />
          </div>
        </section>
      </div>
    </div>
  );
}
