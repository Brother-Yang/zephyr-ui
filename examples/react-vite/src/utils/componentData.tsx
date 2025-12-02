import React, { useState } from 'react';
import type { ComponentConfig } from '../types';
import {
  Button,
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
  Rate,
  Progress,
  Modal,
  Drawer,
  Tree
} from '@zephyr/ui';

export const componentData: ComponentConfig[] = [
  {
    name: 'Form',
    category: '数据录入',
    description: '表单组件用于数据收集与校验',
    examples: [
      {
        title: '基础表单',
        description: '必填与长度规则，提交打印值',
        code: `
<Form initialValues={{ username: '', agree: false }} onFinish={(vals)=>console.log('submit', vals)}>
  <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
    <Input placeholder="Enter username" />
  </FormItem>
  <FormItem name="agree" label="Agreement" required valuePropName="checked">
    <Checkbox label="I agree" />
  </FormItem>
  <div style={{ display:'flex', gap:12 }}>
    <Button type="submit">Submit</Button>
    <Button type="reset" variant="secondary">Reset</Button>
  </div>
</Form>`,
        component: () => (
          <Form initialValues={{ username: '', agree: false }} onFinish={(vals)=>console.log('submit', vals)}>
            <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
              <Input placeholder="Enter username" />
            </FormItem>
            <FormItem name="agree" label="Agreement" required valuePropName="checked">
              <Checkbox label="I agree" />
            </FormItem>
            <div style={{ display:'flex', gap:12 }}>
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="secondary">Reset</Button>
            </div>
          </Form>
        )
      },
      {
        title: 'Blur 校验',
        description: '仅在失焦时校验，正则与数字规则',
        code: `
<Form initialValues={{ email:'', age:'', agree:false }} validateOnChange={false} validateOnBlur onFinish={(vals)=>console.log('blur submit', vals)}>
  <FormItem name="email" label="Email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }]}>
    <Input placeholder="Enter email" />
  </FormItem>
  <FormItem name="age" label="Age" required rules={[{ pattern: /^\d+$/, message: 'Digits only' }]}>
    <Input placeholder="Enter age" />
  </FormItem>
  <FormItem name="agree" label="Agreement" required valuePropName="checked">
    <Checkbox label="I agree" />
  </FormItem>
  <div style={{ display:'flex', gap:12 }}>
    <Button type="submit">Submit</Button>
    <Button type="reset" variant="secondary">Reset</Button>
  </div>
</Form>`,
        component: () => (
          <Form initialValues={{ email:'', age:'', agree:false }} validateOnChange={false} validateOnBlur onFinish={(vals)=>console.log('blur submit', vals)}>
            <FormItem name="email" label="Email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }]}>
              <Input placeholder="Enter email" />
            </FormItem>
            <FormItem name="age" label="Age" required rules={[{ pattern: /^\d+$/, message: 'Digits only' }]}>
              <Input placeholder="Enter age" />
            </FormItem>
            <FormItem name="agree" label="Agreement" required valuePropName="checked">
              <Checkbox label="I agree" />
            </FormItem>
            <div style={{ display:'flex', gap:12 }}>
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="secondary">Reset</Button>
            </div>
          </Form>
        )
      },
      {
        title: '水平布局',
        description: 'layout="horizontal" 展示标签与控件并排',
        code: `
<Form layout="horizontal" initialValues={{ company:'', subscribe:false }}>
  <FormItem name="company" label="Company" required>
    <Input placeholder="Enter company" />
  </FormItem>
  <FormItem name="subscribe" label="Subscribe" valuePropName="checked">
    <Switch label="Receive updates" />
  </FormItem>
</Form>`,
        component: () => (
          <Form layout="horizontal" initialValues={{ company:'', subscribe:false }}>
            <FormItem name="company" label="Company" required>
              <Input placeholder="Enter company" />
            </FormItem>
            <FormItem name="subscribe" label="Subscribe" valuePropName="checked">
              <Switch label="Receive updates" />
            </FormItem>
          </Form>
        )
      },
      {
        title: '禁用表单',
        description: '整个表单禁用控件交互',
        code: `
<Form disabled initialValues={{ name:'Disabled', agree:true }}>
  <FormItem name="name" label="Name"><Input /></FormItem>
  <FormItem name="agree" label="Agreement" valuePropName="checked"><Checkbox label="Agreed" /></FormItem>
</Form>`,
        component: () => (
          <Form disabled initialValues={{ name:'Disabled', agree:true }}>
            <FormItem name="name" label="Name"><Input /></FormItem>
            <FormItem name="agree" label="Agreement" valuePropName="checked"><Checkbox label="Agreed" /></FormItem>
          </Form>
        )
      },
      {
        title: '表单 API',
        description: '使用 formRef 调用 set/reset/validate/submit',
        code: `
const apiRef = useRef<any>(null)
<Form formRef={apiRef} initialValues={{ username:'', city:'' }} validateOnChange={false}>
  <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
    <Input placeholder="Enter username" />
  </FormItem>
  <FormItem name="city" label="City" required>
    <Select options={[{label:'Seattle',value:'seattle'},{label:'San Francisco',value:'sf'},{label:'New York',value:'ny'}]} placeholder="Select city" />
  </FormItem>
  <div style={{ display:'flex', gap:12 }}>
    <Button onClick={()=>apiRef.current?.setFieldsValue({ username:'Alice', city:'seattle' })}>Fill</Button>
    <Button onClick={()=>console.log('validate', apiRef.current?.validateFields())}>Validate</Button>
    <Button onClick={()=>apiRef.current?.resetFields()} variant="secondary">Reset</Button>
    <Button onClick={()=>apiRef.current?.submit()}>Submit</Button>
  </div>
</Form>`,
        component: () => {
          const apiRef = React.useRef<any>(null)
          return (
            <Form formRef={apiRef} initialValues={{ username:'', city:'' }} validateOnChange={false}>
              <FormItem name="username" label="Username" required rules={[{ min: 3, message: 'Min 3 chars' }]}>
                <Input placeholder="Enter username" />
              </FormItem>
              <FormItem name="city" label="City" required>
                <Select options={[{label:'Seattle',value:'seattle'},{label:'San Francisco',value:'sf'},{label:'New York',value:'ny'}]} placeholder="Select city" />
              </FormItem>
              <div style={{ display:'flex', gap:12 }}>
                <Button onClick={()=>apiRef.current?.setFieldsValue({ username:'Alice', city:'seattle' })}>Fill</Button>
                <Button onClick={()=>console.log('validate', apiRef.current?.validateFields())}>Validate</Button>
                <Button onClick={()=>apiRef.current?.resetFields()} variant="secondary">Reset</Button>
                <Button onClick={()=>apiRef.current?.submit()}>Submit</Button>
              </div>
            </Form>
          )
        }
      }
    ],
    props: [
      { name: 'initialValues', type: 'Record<string, any>', defaultValue: '-', description: '初始表单值', required: false },
      { name: 'onFinish', type: '(values) => void', defaultValue: '-', description: '提交成功回调', required: false },
      { name: 'onReset', type: '() => void', defaultValue: '-', description: '重置回调', required: false },
      { name: 'layout', type: "'vertical'|'horizontal'", defaultValue: 'vertical', description: '表单布局', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用态', required: false },
      { name: 'validateOnChange', type: 'boolean', defaultValue: 'true', description: '变更时校验', required: false },
      { name: 'validateOnBlur', type: 'boolean', defaultValue: 'true', description: '失焦时校验', required: false },
      { name: 'onValuesChange', type: '(values, changed) => void', defaultValue: '-', description: '值变更回调', required: false },
      { name: 'formRef', type: 'MutableRefObject<FormApi|null>', defaultValue: '-', description: '表单 API 引用', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },{
    name: 'Button',
    category: '基础组件',
    description: '按钮组件用于触发操作或事件',
    examples: [
      {
        title: '基础按钮',
        description: '最常用的按钮类型',
        code: `<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
<Button type="danger">危险按钮</Button>`,
        component: () => (
          <div className="flex gap-2">
            <Button type="primary">主要按钮</Button>
            <Button type="secondary">次要按钮</Button>
            <Button type="danger">危险按钮</Button>
          </div>
        )
      },
      {
        title: '按钮尺寸',
        description: '不同尺寸的按钮',
        code: `<Button size="small">小按钮</Button>
<Button size="medium">中按钮</Button>
<Button size="large">大按钮</Button>`,
        component: () => (
          <div className="flex gap-2 items-center">
            <Button size="small">小按钮</Button>
            <Button size="medium">中按钮</Button>
            <Button size="large">大按钮</Button>
          </div>
        )
      },
      {
        title: '外观变体',
        description: '不同 variant 的视觉样式',
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="link">Link</Button>`,
        component: () => (
          <div className="flex flex-wrap gap-2 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="link">Link</Button>
          </div>
        )
      },
      {
        title: '加载状态与图标',
        description: '展示 loading、图标与组合用法',
        code: `<Button loading>Loading</Button>
<Button loading icon={<span>★</span>}>Loading Icon</Button>
<Button icon={<span>★</span>}>With Icon</Button>
<Button iconOnly aria-label="Star" icon={<span>★</span>} />`,
        component: () => (
          <div className="flex flex-wrap gap-2 items-center">
            <Button loading>Loading</Button>
            <Button loading icon={<span>★</span>}>Loading Icon</Button>
            <Button icon={<span>★</span>}>With Icon</Button>
            <Button iconOnly aria-label="Star" icon={<span>★</span>} />
          </div>
        )
      },
      {
        title: '禁用与圆角、通栏',
        description: '禁用态、圆角与通栏按纽',
        code: `<Button disabled>Disabled</Button>
<Button rounded>Rounded</Button>
<Button block>Block</Button>`,
        component: () => (
          <div className="flex flex-col gap-3 w-64">
            <div className="flex gap-2 items-center">
              <Button disabled>Disabled</Button>
              <Button rounded>Rounded</Button>
            </div>
            <Button block>Block</Button>
          </div>
        )
      },
      {
        title: 'Type 属性',
        description: '不同 type 的按钮行为',
        code: `<Button type="button">Type Button</Button>
<Button type="reset" variant="secondary">Type Reset</Button>
<Button type="submit">Type Submit</Button>`,
        component: () => (
          <form className="flex gap-2 items-center" onSubmit={(e) => { e.preventDefault(); alert('Submit'); }}>
            <Button type="button">Type Button</Button>
            <Button type="reset" variant="secondary">Type Reset</Button>
            <Button type="submit">Type Submit</Button>
          </form>
        )
      }
    ],
    props: [
      { name: 'variant', type: "'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'|'warning'|'link'", defaultValue: 'primary', description: '外观变体', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'block', type: 'boolean', defaultValue: 'false', description: '通栏按钮', required: false },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: '加载状态', required: false },
      { name: 'rounded', type: 'boolean', defaultValue: 'false', description: '圆角外观', required: false },
      { name: 'iconOnly', type: 'boolean', defaultValue: 'false', description: '仅图标按钮', required: false },
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: '图标内容', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'type', type: "'button'|'submit'|'reset'", defaultValue: 'button', description: '原生按钮类型', required: false },
      { name: 'onClick', type: '(e) => void', defaultValue: '-', description: '点击事件', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Input',
    category: '数据录入',
    description: '输入框组件用于用户输入',
    examples: [
      {
        title: '基础输入框',
        description: '最常用的输入框类型',
        code: `<Input placeholder="请输入内容" />
<Input placeholder="禁用状态" disabled />`,
        component: () => (
          <div className="flex flex-col gap-2 w-64">
            <Input placeholder="请输入内容" />
            <Input placeholder="禁用状态" disabled />
          </div>
        )
      },
      {
        title: '尺寸与状态',
        description: '不同尺寸与状态样式',
        code: `<Input size="small" placeholder="Small" />
<Input size="medium" placeholder="Medium" />
<Input size="large" placeholder="Large" />
<Input status="error" placeholder="Error" />
<Input status="success" placeholder="Success" />
<Input status="warning" placeholder="Warning" />`,
        component: () => (
          <div className="grid gap-2 w-80">
            <div className="flex gap-2 items-center flex-wrap">
              <Input size="small" placeholder="Small" />
              <Input size="medium" placeholder="Medium" />
              <Input size="large" placeholder="Large" />
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <Input status="default" placeholder="Default" />
              <Input status="error" placeholder="Error" />
              <Input status="success" placeholder="Success" />
              <Input status="warning" placeholder="Warning" />
            </div>
          </div>
        )
      },
      {
        title: '前后缀与清除',
        description: '前缀/后缀与允许清除',
        code: `<Input allowClear prefix={<span>🔍</span>} suffix={<span>kg</span>} placeholder="Prefix/Suffix" />`,
        component: () => (
          <div className="flex gap-2 items-center">
            <Input allowClear prefix={<span>🔍</span>} suffix={<span>kg</span>} placeholder="Prefix/Suffix" />
          </div>
        )
      },
      {
        title: '受控与回车事件',
        description: '受控输入与回车触发',
        code: `const [val, setVal] = useState('')
<Input value={val} onChange={setVal} allowClear onPressEnter={(v)=>console.log('enter', v)} />`,
        component: () => {
          const [val, setVal] = useState('')
          return (
            <div className="grid gap-2 w-80">
              <Input value={val} onChange={setVal} allowClear placeholder="受控输入" onPressEnter={(v)=>console.log('enter', v)} />
              <div className="text-sm text-gray-500">Value: {val}</div>
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'value', type: 'string', defaultValue: '-', description: '受控值', required: false },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: '默认值', required: false },
      { name: 'onChange', type: '(value: string) => void', defaultValue: '-', description: '值变化回调', required: false },
      { name: 'onClear', type: '() => void', defaultValue: '-', description: '清除事件', required: false },
      { name: 'onPressEnter', type: '(value: string) => void', defaultValue: '-', description: '回车事件', required: false },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: '占位符', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'allowClear', type: 'boolean', defaultValue: 'false', description: '显示清除按钮', required: false },
      { name: 'prefix', type: 'ReactNode', defaultValue: '-', description: '前缀内容', required: false },
      { name: 'suffix', type: 'ReactNode', defaultValue: '-', description: '后缀内容', required: false },
      { name: 'status', type: "'default'|'error'|'success'|'warning'", defaultValue: 'default', description: '状态样式', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Checkbox',
    category: '数据录入',
    description: '复选框组件用于多选',
    examples: [
      {
        title: '基础复选框',
        description: '单个复选框',
        code: `<Checkbox label="选项" />
<Checkbox label="选中状态" checked />`,
        component: () => (
          <div className="flex flex-col gap-2">
            <Checkbox label="选项" />
            <Checkbox label="选中状态" checked />
          </div>
        )
      },
      {
        title: '尺寸与半选',
        description: '不同尺寸与半选状态',
        code: `<Checkbox size="small" label="Small" />
<Checkbox size="medium" label="Medium" />
<Checkbox size="large" label="Large" />
<Checkbox indeterminate label="半选" />`,
        component: () => (
          <div className="flex gap-3 items-center flex-wrap">
            <Checkbox size="small" label="Small" />
            <Checkbox size="medium" label="Medium" />
            <Checkbox size="large" label="Large" />
            <Checkbox indeterminate label="半选" />
          </div>
        )
      },
      {
        title: '禁用与只读',
        description: '禁用状态',
        code: `<Checkbox label="Disabled" disabled />`,
        component: () => (
          <Checkbox label="Disabled" disabled />
        )
      },
      {
        title: '复选组（垂直/水平）',
        description: '复选组布局与受控',
        code: `<CheckboxGroup options={[{label:'A',value:'a'},{label:'B',value:'b',disabled:true},{label:'C',value:'c'}]} />`,
        component: () => {
          const [vals, setVals] = useState<string[]>(['a'])
          return (
            <div className="grid gap-4">
              <CheckboxGroup options={[{label:'A',value:'a'},{label:'B',value:'b',disabled:true},{label:'C',value:'c'}]} />
              <CheckboxGroup layout="horizontal" options={[{label:'Apple',value:'apple'},{label:'Banana',value:'banana'},{label:'Cherry',value:'cherry'}]} value={vals} onChange={setVals} />
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: '受控选中', required: false },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: '默认选中', required: false },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: '半选状态', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: '标签文本', required: false },
      { name: 'onChange', type: '(checked: boolean) => void', defaultValue: '-', description: '变化回调', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Radio',
    category: '数据录入',
    description: '单选框组件用于单选',
    examples: [
      {
        title: '基础单选框',
        description: '单选框组',
        code: `<RadioGroup
  options={[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ]}
  defaultValue={'1'}
/>`,
        component: () => (
          <RadioGroup
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' }
            ]}
            defaultValue={'1'}
          />
        )
      },
      {
        title: '方向与尺寸',
        description: '垂直排列与尺寸展示',
        code: `<RadioGroup direction="vertical" options={[{label:'A',value:'a'},{label:'B',value:'b',disabled:true},{label:'C',value:'c'}]} />
<div><Radio label="Small" defaultChecked size="small" /> <Radio label="Medium" defaultChecked size="medium" /> <Radio label="Large" defaultChecked size="large" /></div>`,
        component: () => (
          <div className="grid gap-3">
            <RadioGroup direction="vertical" options={[{label:'A',value:'a'},{label:'B',value:'b',disabled:true},{label:'C',value:'c'}]} />
            <div className="flex gap-2 items-center flex-wrap">
              <Radio label="Small" defaultChecked size="small" />
              <Radio label="Medium" defaultChecked size="medium" />
              <Radio label="Large" defaultChecked size="large" />
            </div>
          </div>
        )
      },
      {
        title: '受控与禁用',
        description: '受控切换与禁用选项',
        code: `const [v,setV]=useState('seattle')
<RadioGroup options={[{label:'Seattle',value:'seattle'},{label:'San Francisco',value:'sf',disabled:true},{label:'New York',value:'ny'}]} value={v} onChange={setV} />`,
        component: () => {
          const [v,setV]=useState('seattle')
          return (
            <RadioGroup options={[{label:'Seattle',value:'seattle'},{label:'San Francisco',value:'sf',disabled:true},{label:'New York',value:'ny'}]} value={v} onChange={setV} />
          )
        }
      }
    ],
    props: [
      { name: 'options', type: 'Array<{ label: ReactNode; value: string; disabled?: boolean }>', defaultValue: '[]', description: '选项列表', required: true },
      { name: 'value', type: 'string', defaultValue: '-', description: '受控值', required: false },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: '默认值', required: false },
      { name: 'onChange', type: '(value: string) => void', defaultValue: '-', description: '值变化回调', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: '只读状态', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'direction', type: "'horizontal'|'vertical'", defaultValue: 'horizontal', description: '排列方向', required: false },
      { name: 'name', type: 'string', defaultValue: '-', description: '原生 name', required: false },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: '组标签（用于无障碍）', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Select',
    category: '数据录入',
    description: '选择器组件用于下拉选择',
    examples: [
      {
        title: '基础选择器',
        description: '下拉选择',
        code: `<Select
  placeholder="请选择"
  options={[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ]}
/>`,
        component: () => (
          <Select
            placeholder="请选择"
            style={{ width: 200 }}
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' }
            ]}
          />
        )
      },
      {
        title: '多选与受控',
        description: '多选 chips 与受控值',
        code: `const [vals,setVals]=useState<string[]>(['1'])
<Select multiple value={vals} onChange={setVals} options={[{label:'一',value:'1'},{label:'二',value:'2'},{label:'三',value:'3'}]} />`,
        component: () => {
          const [vals,setVals]=useState<string[]>(['1'])
          return (
            <div className="grid gap-2 w-[360px]">
              <Select multiple value={vals} onChange={setVals} placeholder="请选择多个" options={[{label:'一',value:'1'},{label:'二',value:'2'},{label:'三',value:'3'}]} />
              <div className="text-sm text-gray-500">选中: {vals.join(', ') || '无'}</div>
            </div>
          )
        }
      },
      {
        title: '尺寸与禁用',
        description: '不同尺寸与禁用态',
        code: `<Select size="small" options={[{label:'A',value:'a'}]} />
<Select size="medium" options={[{label:'A',value:'a'}]} />
<Select size="large" options={[{label:'A',value:'a'}]} />
<Select disabled placeholder="Disabled" options={[{label:'A',value:'a'}]} />`,
        component: () => (
          <div className="flex gap-2 items-center flex-wrap">
            <Select size="small" options={[{label:'A',value:'a'}]} />
            <Select size="medium" options={[{label:'A',value:'a'}]} />
            <Select size="large" options={[{label:'A',value:'a'}]} />
            <Select disabled placeholder="Disabled" options={[{label:'A',value:'a'}]} />
          </div>
        )
      },
      {
        title: '空选项提示',
        description: '无选项时展示占位',
        code: `<Select options={[]} placeholder="请选择" />`,
        component: () => (
          <Select options={[]} placeholder="请选择" />
        )
      }
    ],
    props: [
      { name: 'options', type: 'Array<{ label: string; value: string|number; disabled?: boolean }>', defaultValue: '[]', description: '选项列表', required: true },
      { name: 'value', type: 'string | number | Array<string|number>', defaultValue: '-', description: '受控值（支持多选）', required: false },
      { name: 'onChange', type: '(value: string|number|Array<string|number>) => void', defaultValue: '-', description: '值变化回调', required: false },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: '占位符', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'multiple', type: 'boolean', defaultValue: 'false', description: '是否多选', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Switch',
    category: '数据录入',
    description: '开关组件用于切换状态',
    examples: [
      {
        title: '基础开关',
        description: '开关状态切换',
        code: `<Switch />
<Switch checked />`,
        component: () => (
          <div className="flex gap-4">
            <Switch />
            <Switch checked />
          </div>
        )
      },
      {
        title: '尺寸与文案',
        description: '不同尺寸与标签文案',
        code: `<Switch size="small" label="Small" />
<Switch size="medium" label="Medium" />
<Switch size="large" label="Large" defaultChecked />`,
        component: () => (
          <div className="flex gap-3 items-center flex-wrap">
            <Switch size="small" label="Small" />
            <Switch size="medium" label="Medium" />
            <Switch size="large" label="Large" defaultChecked />
          </div>
        )
      },
      {
        title: '状态与禁用',
        description: '错误/成功/警告与禁用/只读',
        code: `<Switch status="error" label="Error" />
<Switch status="success" label="Success" defaultChecked />
<Switch status="warning" label="Warning" />
<Switch disabled label="Disabled" />
<Switch readOnly defaultChecked label="ReadOnly" />`,
        component: () => (
          <div className="flex gap-3 items-center flex-wrap">
            <Switch status="error" label="Error" />
            <Switch status="success" label="Success" defaultChecked />
            <Switch status="warning" label="Warning" />
            <Switch disabled label="Disabled" />
            <Switch readOnly defaultChecked label="ReadOnly" />
          </div>
        )
      },
      {
        title: '开关内容',
        description: '开启/关闭显示内容',
        code: `<Switch onContent={<span>ON</span>} offContent={<span>OFF</span>} />`,
        component: () => (
          <Switch onContent={<span>ON</span>} offContent={<span>OFF</span>} />
        )
      }
    ],
    props: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: '受控值', required: false },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: '默认值', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用状态', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'onChange', type: '(checked: boolean) => void', defaultValue: '-', description: '变化回调', required: false },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: '标签文本', required: false },
      { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: '只读状态', required: false },
      { name: 'status', type: "'error'|'success'|'warning'", defaultValue: '-', description: '状态样式', required: false },
      { name: 'name', type: 'string', defaultValue: '-', description: '原生 name', required: false },
      { name: 'value', type: 'string', defaultValue: '-', description: '原生 value', required: false },
      { name: 'onContent', type: 'ReactNode', defaultValue: '-', description: '开启时展示内容', required: false },
      { name: 'offContent', type: 'ReactNode', defaultValue: '-', description: '关闭时展示内容', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Table',
    category: '数据展示',
    description: '表格组件用于数据展示',
    examples: [
      {
        title: '基础表格',
        description: '简单数据表格',
        code: `<Table 
  columns={[
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
    { key: 'address', title: '地址' }
  ]}
  dataSource={[
    { name: '张三', age: 25, address: '北京' },
    { name: '李四', age: 30, address: '上海' }
  ]}
/>`,
        component: () => (
          <Table 
            columns={[
              { key: 'name', title: '姓名' },
              { key: 'age', title: '年龄' },
              { key: 'address', title: '地址' }
            ]}
            dataSource={[
              { name: '张三', age: 25, address: '北京' },
              { name: '李四', age: 30, address: '上海' }
            ]}
          />
        )
      },
      {
        title: '尺寸展示',
        description: 'small/medium/large 三种尺寸',
        code: `<div>
  <Table size="small" dataSource={data.slice(0,5)} columns={cols} />
  <Table size="medium" dataSource={data.slice(0,5)} columns={cols} />
  <Table size="large" dataSource={data.slice(0,5)} columns={cols} />
</div>`,
        component: () => {
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 8 }, (_, i) => ({ name: `用户${i+1}`, age: 20 + i, address: i % 2 ? '上海' : '北京' }))
          return (
            <div className="grid gap-8">
              <Table size="small" dataSource={data.slice(0,5)} columns={cols} />
              <Table size="medium" dataSource={data.slice(0,5)} columns={cols} />
              <Table size="large" dataSource={data.slice(0,5)} columns={cols} />
            </div>
          )
        }
      },
      {
        title: '边框与斑马纹',
        description: 'bordered 与 striped',
        code: `<Table bordered dataSource={data} columns={cols} />
<Table striped dataSource={data} columns={cols} />`,
        component: () => {
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 6 }, (_, i) => ({ name: `用户${i+1}`, age: 20 + i, address: i % 2 ? '广州' : '深圳' }))
          return (
            <div className="grid gap-8">
              <Table bordered dataSource={data} columns={cols} />
              <Table striped dataSource={data} columns={cols} />
            </div>
          )
        }
      },
      {
        title: '排序与回调',
        description: '列头点击排序，带回调 onSortChange',
        code: `<Table 
  dataSource={data}
  columns={[
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true, sorter: (a,b)=>a.age-b.age },
    { key: 'address', title: '地址' }
  ]}
  onSortChange={(field, order)=>console.log('sort', field, order)}
/>`,
        component: () => {
          const data = Array.from({ length: 7 }, (_, i) => ({ name: ['Alice','Bob','Charlie'][i%3], age: 18 + i, address: ['北京','上海','杭州'][i%3] }))
          const cols = [
            { key: 'name', title: '姓名', sortable: true },
            { key: 'age', title: '年龄', sortable: true, sorter: (a:any,b:any)=>a.age-b.age },
            { key: 'address', title: '地址' }
          ]
          return <Table dataSource={data} columns={cols as any} onSortChange={(f,o)=>console.log('sort', f, o)} />
        }
      },
      {
        title: '行选择（复选框）',
        description: '可选择多行，支持禁用行',
        code: `<Table 
  dataSource={data}
  rowKey="id"
  columns={cols}
  rowSelection={{
    type: 'checkbox',
    selectedRowKeys,
    onChange: (keys)=>setSelectedRowKeys(keys),
    getCheckboxProps: (rec)=>({ disabled: rec.name==='Bob' })
  }}
/>`,
        component: () => {
          const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 6 }, (_, i) => ({ id: String(i+1), name: ['Alice','Bob','Charlie'][i%3], age: 20 + i, address: ['北京','上海','深圳'][i%3] }))
          return (
            <div className="grid gap-2">
              <Table 
                dataSource={data}
                rowKey="id"
                columns={cols as any}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys),
                  getCheckboxProps: (rec:any) => ({ disabled: rec.name === 'Bob' })
                }}
              />
              <div className="text-sm text-gray-500">已选行: {selectedRowKeys.join(', ') || '无'}</div>
            </div>
          )
        }
      },
      {
        title: '行选择（单选）',
        description: '单选当前行',
        code: `<Table 
  dataSource={data}
  rowKey="id"
  columns={cols}
  rowSelection={{ type: 'radio', selectedRowKeys, onChange:(keys)=>setSelectedRowKeys(keys) }}
/>`,
        component: () => {
          const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 5 }, (_, i) => ({ id: String(i+1), name: `Row${i+1}`, age: 25 + i, address: '成都' }))
          return (
            <div className="grid gap-2">
              <Table dataSource={data} rowKey="id" columns={cols as any} rowSelection={{ type: 'radio', selectedRowKeys, onChange:(keys)=>setSelectedRowKeys(keys) }} />
              <div className="text-sm text-gray-500">当前选择: {selectedRowKeys[0] || '无'}</div>
            </div>
          )
        }
      },
      {
        title: '可展开行',
        description: '点击箭头展开显示更多详情',
        code: `<Table 
  dataSource={data}
  rowKey="id"
  columns={cols}
  expandable={{
    expandedRowKeys,
    onExpand: (expanded, rec)=> setExpandedRowKeys(prev=> expanded ? [...prev, rec.id] : prev.filter(k=>k!==rec.id)),
    expandedRowRender: (rec)=> (<div style={{padding:8}}><div><strong>姓名:</strong> {rec.name}</div><div><strong>年龄:</strong> {rec.age}</div><div><strong>地址:</strong> {rec.address}</div></div>)
  }}
/>`,
        component: () => {
          const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 6 }, (_, i) => ({ id: String(i+1), name: ['Alice','Bob','Charlie'][i%3], age: 20 + i, address: ['西安','苏州','厦门'][i%3] }))
          return (
            <Table 
              dataSource={data}
              rowKey="id"
              columns={cols as any}
              expandable={{
                expandedRowKeys,
                onExpand: (expanded:boolean, rec:any) => setExpandedRowKeys(prev => expanded ? [...prev, rec.id] : prev.filter(k => k !== rec.id)),
                expandedRowRender: (rec:any) => (
                  <div style={{ padding: 8 }}>
                    <div><strong>姓名:</strong> {rec.name}</div>
                    <div><strong>年龄:</strong> {rec.age}</div>
                    <div><strong>地址:</strong> {rec.address}</div>
                  </div>
                )
              }}
            />
          )
        }
      },
      {
        title: '分页展示',
        description: '显示总数与页大小切换',
        code: `<Table 
  dataSource={data}
  columns={cols}
  pagination={{ pageSize: 5, showTotal: true, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
/>`,
        component: () => {
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data = Array.from({ length: 42 }, (_, i) => ({ name: `User ${i+1}`, age: 20 + (i % 50), address: ['北京','上海','深圳'][i%3] }))
          return <Table dataSource={data} columns={cols as any} pagination={{ pageSize: 5, showTotal: true, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }} />
        }
      },
      {
        title: '加载中',
        description: 'loading 状态占位',
        code: `<Table dataSource={data} columns={cols} loading={true} />`,
        component: () => {
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄' },
            { key: 'address', title: '地址' }
          ]
          const data: any[] = Array.from({ length: 10 }, (_, i) => ({ name: `加载行${i+1}`, age: 20 + i, address: '...' }))
          return <Table dataSource={data} columns={cols as any} loading={true} />
        }
      },
      {
        title: '自定义渲染',
        description: '使用 render 自定义单元格',
        code: `<Table 
  dataSource={data}
  columns={[
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄', render: (v)=> <span style={{padding:'2px 6px',borderRadius:6,background:'#eef',fontSize:12}}>{String(v)}</span> },
    { key: 'address', title: '地址' }
  ]}
/>`,
        component: () => {
          const data = Array.from({ length: 6 }, (_, i) => ({ name: `用户${i+1}`, age: 20 + i, address: ['北京','上海','南京'][i%3] }))
          const cols = [
            { key: 'name', title: '姓名' },
            { key: 'age', title: '年龄', render: (v:any)=> <span style={{padding:'2px 6px',borderRadius:6,background:'#eef',fontSize:12}}>{String(v)}</span> },
            { key: 'address', title: '地址' }
          ]
          return <Table dataSource={data} columns={cols as any} />
        }
      }
    ],
    props: [
      { name: 'columns', type: 'Array<{ key: keyof T; title: string; ... }>', defaultValue: '-', description: '列配置', required: true },
      { name: 'dataSource', type: 'Array<T>', defaultValue: '[]', description: '数据源', required: true },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: '加载状态', required: false },
      { name: 'pagination', type: 'PaginationConfig | false', defaultValue: 'false', description: '分页配置', required: false },
      { name: 'rowKey', type: 'keyof T | (record) => string', defaultValue: '-', description: '行唯一键', required: false },
      { name: 'rowSelection', type: "{ type: 'checkbox'|'radio'; selectedRowKeys?: string[]; onChange?: (keys, rows) => void }", defaultValue: '-', description: '行选择', required: false },
      { name: 'expandable', type: "{ expandedRowRender: (record) => ReactNode; expandedRowKeys?: string[]; onExpand?: (expanded, record) => void }", defaultValue: '-', description: '可展开行', required: false },
      { name: 'onRowClick', type: '(record, index) => void', defaultValue: '-', description: '行点击', required: false },
      { name: 'onSortChange', type: '(field, order) => void', defaultValue: '-', description: '排序变化', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'bordered', type: 'boolean', defaultValue: 'false', description: '显示边框', required: false },
      { name: 'striped', type: 'boolean', defaultValue: 'false', description: '斑马纹', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Tabs',
    category: '数据展示',
    description: '标签页组件用于内容切换',
    examples: [
      {
        title: '基础标签页',
        description: '标签页切换',
        code: `<Tabs
  items={[
    { key: '1', label: '标签1', children: '内容1' },
    { key: '2', label: '标签2', children: '内容2' },
    { key: '3', label: '标签3', children: '内容3' }
  ]}
/>`,
        component: () => (
          <Tabs
            items={[
              { key: '1', label: '标签1', children: '内容1' },
              { key: '2', label: '标签2', children: '内容2' },
              { key: '3', label: '标签3', children: '内容3' }
            ]}
          />
        )
      },
      {
        title: '尺寸展示',
        description: 'small/medium/large 三种尺寸',
        code: `<Tabs items={[{ key:'s1', label:'Small 1', children:'Small 1' }, { key:'s2', label:'Small 2', children:'Small 2' }]} size="small" />
<Tabs items={[{ key:'m1', label:'Medium 1', children:'Medium 1' }, { key:'m2', label:'Medium 2', children:'Medium 2' }]} size="medium" />
<Tabs items={[{ key:'l1', label:'Large 1', children:'Large 1' }, { key:'l2', label:'Large 2', children:'Large 2' }]} size="large" />`,
        component: () => (
          <div className="flex flex-wrap gap-12 items-start">
            <Tabs items={[{ key:'s1', label:'Small 1', children:'Small 1' }, { key:'s2', label:'Small 2', children:'Small 2' }]} size="small" />
            <Tabs items={[{ key:'m1', label:'Medium 1', children:'Medium 1' }, { key:'m2', label:'Medium 2', children:'Medium 2' }]} size="medium" />
            <Tabs items={[{ key:'l1', label:'Large 1', children:'Large 1' }, { key:'l2', label:'Large 2', children:'Large 2' }]} size="large" />
          </div>
        )
      },
      {
        title: '边框与无边框',
        description: 'bordered 开关',
        code: `<Tabs items={[{ key:'b1', label:'有边框 1', children:'Bordered' }, { key:'b2', label:'有边框 2', children:'Bordered' }]} bordered />
<Tabs items={[{ key:'nb1', label:'无边框 1', children:'No Border' }, { key:'nb2', label:'无边框 2', children:'No Border' }]} bordered={false} />`,
        component: () => (
          <div className="flex flex-wrap gap-12 items-start">
            <Tabs items={[{ key:'b1', label:'有边框 1', children:'Bordered' }, { key:'b2', label:'有边框 2', children:'Bordered' }]} bordered />
            <Tabs items={[{ key:'nb1', label:'无边框 1', children:'No Border' }, { key:'nb2', label:'无边框 2', children:'No Border' }]} bordered={false} />
          </div>
        )
      },
      {
        title: '禁用与默认激活',
        description: '包含禁用项并设置默认激活',
        code: `<Tabs items={[{ key:'d1', label:'启用', children:'Enabled Content' }, { key:'d2', label:'禁用', children:'Disabled Content', disabled:true }]} defaultActiveKey="d1" />`,
        component: () => (
          <Tabs items={[{ key:'d1', label:'启用', children:'Enabled Content' }, { key:'d2', label:'禁用', children:'Disabled Content', disabled:true }]} defaultActiveKey="d1" />
        )
      },
      {
        title: '卸载非激活面板',
        description: 'destroyInactiveTabPane=true',
        code: `<Tabs items={[{ key:'x1', label:'仅激活渲染', children:<div>Active Only</div> }, { key:'x2', label:'另一个', children:<div>Other</div> }]} destroyInactiveTabPane />`,
        component: () => (
          <Tabs items={[{ key:'x1', label:'仅激活渲染', children:<div>Active Only</div> }, { key:'x2', label:'另一个', children:<div>Other</div> }]} destroyInactiveTabPane />
        )
      },
      {
        title: '受控模式',
        description: '通过 activeKey/onChange 控制',
        code: `const [active,setActive]=useState('a1')
<div style={{ display:'flex', gap:8, marginBottom:8 }}>
  <Button onClick={()=>setActive('a1')}>激活 A1</Button>
  <Button onClick={()=>setActive('a2')}>激活 A2</Button>
</div>
<Tabs items={[{ key:'a1', label:'A1', children:'内容 1' }, { key:'a2', label:'A2', children:'内容 2' }]} activeKey={active} onChange={setActive} />`,
        component: () => {
          const [active,setActive]=useState('a1')
          return (
            <div>
              <div style={{ display:'flex', gap:8, marginBottom:8 }}>
                <Button onClick={()=>setActive('a1')}>激活 A1</Button>
                <Button onClick={()=>setActive('a2')}>激活 A2</Button>
              </div>
              <Tabs items={[{ key:'a1', label:'A1', children:'内容 1' }, { key:'a2', label:'A2', children:'内容 2' }]} activeKey={active} onChange={setActive} />
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'items', type: 'Array<{ key: string; label: ReactNode; disabled?: boolean; children?: ReactNode }>', defaultValue: '[]', description: '标签项', required: true },
      { name: 'activeKey', type: 'string', defaultValue: '-', description: '受控激活 key', required: false },
      { name: 'defaultActiveKey', type: 'string', defaultValue: '-', description: '默认激活 key', required: false },
      { name: 'onChange', type: '(key: string) => void', defaultValue: '-', description: '切换事件', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'bordered', type: 'boolean', defaultValue: 'true', description: '显示边框', required: false },
      { name: 'destroyInactiveTabPane', type: 'boolean', defaultValue: 'false', description: '非激活面板卸载', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Modal',
    category: '反馈组件',
    description: '模态框组件用于重要信息展示',
    examples: [
      {
        title: '基础模态框',
        description: '弹出模态框',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>打开模态框</Button>
<Modal 
  title="标题"
  open={open}
  onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
>
  模态框内容
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false);
          return (
            <div>
              <Button onClick={() => setOpen(true)}>打开模态框</Button>
              <Modal 
                title="标题"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              >
                模态框内容
              </Modal>
            </div>
          );
        }
      },
      {
        title: '垂直居中',
        description: '居中显示模态框',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Centered</Button>
<Modal open={open} title="垂直居中" centered onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>弹窗垂直居中显示。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Centered</Button>
              <Modal open={open} title="垂直居中" centered onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>弹窗垂直居中显示。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '自定义底部',
        description: '自定义 footer 内容',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Custom Footer</Button>
<Modal open={open} title="自定义底部" onCancel={() => setOpen(false)}
  footer={<div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
    <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
    <Button onClick={() => setOpen(false)}>确定</Button>
  </div>}
>
  <div>底部按钮自定义。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Custom Footer</Button>
              <Modal open={open} title="自定义底部" onCancel={() => setOpen(false)}
                footer={<div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                  <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
                  <Button onClick={() => setOpen(false)}>确定</Button>
                </div>}
              >
                <div>底部按钮自定义。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '隐藏底部',
        description: 'footer=null 隐藏底部区域',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>No Footer</Button>
<Modal open={open} title="隐藏底部" footer={null} onCancel={() => setOpen(false)}>
  <div>不显示底部区域。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>No Footer</Button>
              <Modal open={open} title="隐藏底部" footer={null} onCancel={() => setOpen(false)}>
                <div>不显示底部区域。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '遮罩不可关闭',
        description: 'maskClosable=false',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Mask Not Closable</Button>
<Modal open={open} title="遮罩不可关闭" maskClosable={false} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>点击遮罩不会关闭。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Mask Not Closable</Button>
              <Modal open={open} title="遮罩不可关闭" maskClosable={false} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>点击遮罩不会关闭。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '禁用键盘关闭',
        description: 'keyboard=false 禁用 Esc 关闭',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Keyboard Off</Button>
<Modal open={open} title="禁用键盘关闭" keyboard={false} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>按 Esc 不会关闭。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Keyboard Off</Button>
              <Modal open={open} title="禁用键盘关闭" keyboard={false} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>按 Esc 不会关闭。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '关闭销毁内容',
        description: 'destroyOnHidden=true',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Destroy On Hidden</Button>
<Modal open={open} title="关闭销毁子元素" destroyOnHidden onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <Input placeholder="关闭后再次打开将重置内容" />
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Destroy On Hidden</Button>
              <Modal open={open} title="关闭销毁子元素" destroyOnHidden onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <Input placeholder="关闭后再次打开将重置内容" />
              </Modal>
            </div>
          )
        }
      },
      {
        title: '自定义宽度',
        description: 'width=720',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Width 720</Button>
<Modal open={open} title="宽度 720" width={720} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>更大的对话框宽度。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Width 720</Button>
              <Modal open={open} title="宽度 720" width={720} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>更大的对话框宽度。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '自定义关闭图标',
        description: 'closeIcon 自定义',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Custom Close Icon</Button>
<Modal open={open} title="自定义关闭图标" closeIcon={<span>✖️</span>} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>右上角图标自定义。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>Custom Close Icon</Button>
              <Modal open={open} title="自定义关闭图标" closeIcon={<span>✖️</span>} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>右上角图标自定义。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '高 zIndex',
        description: '提升层级覆盖',
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>High zIndex</Button>
<Modal open={open} title="高 zIndex" zIndex={2000} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
  <div>更高的层级覆盖。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          return (
            <div>
              <Button onClick={() => setOpen(true)}>High zIndex</Button>
              <Modal open={open} title="高 zIndex" zIndex={2000} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                <div>更高的层级覆盖。</div>
              </Modal>
            </div>
          )
        }
      },
      {
        title: '确定加载',
        description: 'confirmLoading 模式',
        code: `const [open, setOpen] = useState(false);
const [okLoading, setOkLoading] = useState(false);

<Button onClick={() => { setOpen(true); setOkLoading(false); }}>Confirm Loading</Button>
<Modal 
  open={open}
  title="确定加载"
  confirmLoading={okLoading}
  onCancel={() => { setOpen(false); setOkLoading(false); }}
  onOk={() => { setOkLoading(true); setTimeout(() => { setOkLoading(false); setOpen(false); }, 1000); }}
>
  <div>点击确定后显示加载并延迟关闭。</div>
</Modal>`,
        component: () => {
          const [open, setOpen] = useState(false)
          const [okLoading, setOkLoading] = useState(false)
          return (
            <div>
              <Button onClick={() => { setOpen(true); setOkLoading(false); }}>Confirm Loading</Button>
              <Modal 
                open={open}
                title="确定加载"
                confirmLoading={okLoading}
                onCancel={() => { setOpen(false); setOkLoading(false); }}
                onOk={() => { setOkLoading(true); setTimeout(() => { setOkLoading(false); setOpen(false); }, 1000); }}
              >
                <div>点击确定后显示加载并延迟关闭。</div>
              </Modal>
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '是否显示', required: true },
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: '标题', required: false },
      { name: 'footer', type: 'ReactNode | null', defaultValue: '-', description: '底部区域（null 隐藏）', required: false },
      { name: 'okText', type: 'ReactNode', defaultValue: '-', description: '确认按钮文案', required: false },
      { name: 'cancelText', type: 'ReactNode', defaultValue: '-', description: '取消按钮文案', required: false },
      { name: 'onOk', type: '(e) => void', defaultValue: '-', description: '确认事件', required: false },
      { name: 'onCancel', type: '(e) => void', defaultValue: '-', description: '取消事件', required: false },
      { name: 'confirmLoading', type: 'boolean', defaultValue: 'false', description: '确认按钮加载', required: false },
      { name: 'maskClosable', type: 'boolean', defaultValue: 'true', description: '点击遮罩关闭', required: false },
      { name: 'keyboard', type: 'boolean', defaultValue: 'true', description: 'Esc 关闭', required: false },
      { name: 'closable', type: 'boolean', defaultValue: 'true', description: '显示右上角关闭', required: false },
      { name: 'closeIcon', type: 'ReactNode', defaultValue: '-', description: '自定义关闭图标', required: false },
      { name: 'centered', type: 'boolean', defaultValue: 'false', description: '垂直居中', required: false },
      { name: 'width', type: 'number | string', defaultValue: '520', description: '宽度', required: false },
      { name: 'zIndex', type: 'number', defaultValue: '1050', description: '层级', required: false },
      { name: 'destroyOnHidden', type: 'boolean', defaultValue: 'false', description: '关闭后销毁内容', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Progress',
    category: '反馈组件',
    description: '进度条组件用于展示进度',
    examples: [
      {
        title: '基础进度条',
        description: '进度展示',
        code: `<Progress percent={30} />
<Progress percent={60} />
<Progress percent={90} />`,
        component: () => (
          <div className="flex flex-col gap-2">
            <Progress percent={30} />
            <Progress percent={60} />
            <Progress percent={90} />
          </div>
        )
      },
      {
        title: '类型与状态',
        description: 'line / circle / dashboard 及状态展示',
        code: `<div>
  <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
    <Progress type="line" percent={30} />
    <Progress type="line" percent={50} status="active" />
    <Progress type="line" percent={60} status="success" />
    <Progress type="line" percent={60} status="exception" />
  </div>
  <div style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap', marginTop:12 }}>
    <Progress type="circle" percent={75} />
    <Progress type="dashboard" percent={60} />
    <Progress type="circle" percent={90} format={(p)=>\`\${p}% Done\`} />
  </div>
</div>`,
        component: () => (
          <div className="grid gap-3">
            <div className="flex gap-4 items-center flex-wrap">
              <Progress type="line" percent={30} />
              <Progress type="line" percent={50} status="active" />
              <Progress type="line" percent={60} status="success" />
              <Progress type="line" percent={60} status="exception" />
            </div>
            <div className="flex gap-6 items-center flex-wrap">
              <Progress type="circle" percent={75} />
              <Progress type="dashboard" percent={60} />
              <Progress type="circle" percent={90} format={(p)=>`${p}% Done`} />
            </div>
          </div>
        )
      },
      {
        title: '信息隐藏与分段',
        description: 'showInfo=false 与 steps 分段',
        code: `<Progress type="line" percent={60} showInfo={false} />
<Progress type="line" percent={60} steps={10} />`,
        component: () => (
          <div className="flex gap-4 items-center flex-wrap">
            <Progress type="line" percent={60} showInfo={false} />
            <Progress type="line" percent={60} steps={10} />
          </div>
        )
      },
      {
        title: '尺寸与线帽',
        description: 'size=small/default/large 与 strokeLinecap',
        code: `<div>
  <Progress type="line" percent={40} size="small" />
  <Progress type="line" percent={40} size="default" />
  <Progress type="line" percent={40} size="large" />
  <Progress type="line" percent={40} strokeLinecap="butt" />
  <Progress type="line" percent={40} strokeLinecap="square" />
</div>`,
        component: () => (
          <div className="flex gap-4 items-center flex-wrap">
            <Progress type="line" percent={40} size="small" />
            <Progress type="line" percent={40} size="default" />
            <Progress type="line" percent={40} size="large" />
            <Progress type="line" percent={40} strokeLinecap="butt" />
            <Progress type="line" percent={40} strokeLinecap="square" />
          </div>
        )
      },
      {
        title: '颜色与成功进度',
        description: 'strokeColor/railColor 与 success.percent',
        code: `<Progress type="line" percent={50} strokeColor="#1f6feb" railColor="#e5e7eb" />
<Progress type="line" percent={70} success={{ percent: 30, strokeColor: '#10b981' }} />`,
        component: () => (
          <div className="flex gap-4 items-center flex-wrap">
            <Progress type="line" percent={50} strokeColor="#1f6feb" railColor="#e5e7eb" />
            <Progress type="line" percent={70} success={{ percent: 30, strokeColor: '#10b981' }} />
          </div>
        )
      }
    ],
    props: [
      { name: 'type', type: "'line'|'circle'|'dashboard'", defaultValue: 'line', description: '进度类型', required: false },
      { name: 'percent', type: 'number', defaultValue: '0', description: '进度百分比', required: false },
      { name: 'status', type: "'success'|'exception'|'normal'|'active'", defaultValue: 'normal', description: '状态', required: false },
      { name: 'showInfo', type: 'boolean', defaultValue: 'true', description: '显示文案', required: false },
      { name: 'format', type: '(percent) => ReactNode', defaultValue: '-', description: '文案格式化', required: false },
      { name: 'strokeColor', type: 'string', defaultValue: '-', description: '轨道颜色', required: false },
      { name: 'railColor', type: 'string', defaultValue: '-', description: '背景轨道颜色', required: false },
      { name: 'strokeLinecap', type: "'round'|'butt'|'square'", defaultValue: 'round', description: '线帽风格', required: false },
      { name: 'size', type: "'small'|'default'|'large'|number", defaultValue: 'default', description: '尺寸', required: false },
      { name: 'steps', type: 'number', defaultValue: '-', description: '分段进度', required: false },
      { name: 'success', type: '{ percent?: number; strokeColor?: string }', defaultValue: '-', description: '成功进度', required: false },
      { name: 'gapDegree', type: 'number', defaultValue: '-', description: '圆形缺口角度', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Empty',
    category: '数据展示',
    description: '空状态组件用于无数据展示',
    examples: [
      {
        title: '基础空状态',
        description: '无数据展示',
        code: `<Empty description="暂无数据" />`,
        component: () => <Empty description="暂无数据" />
      },
      {
        title: '不同尺寸',
        description: 'small / medium / large 三种大小',
        code: `<div>
  <Empty size="small" description="Small" />
  <Empty size="medium" description="Medium" />
  <Empty size="large" description="Large" />
</div>`,
        component: () => (
          <div className="flex gap-12 items-start">
            <Empty size="small" description="Small" />
            <Empty size="medium" description="Medium" />
            <Empty size="large" description="Large" />
          </div>
        )
      },
      {
        title: '使用图标',
        description: '传入自定义图标进行展示',
        code: `<Empty icon={<span>📦</span>} description="暂无数据" />`,
        component: () => <Empty icon={<span>📦</span>} description="暂无数据" />
      },
      {
        title: '自定义操作',
        description: '在空状态下提供操作按钮',
        code: `<Empty 
  icon={<span>🗂️</span>} 
  description="Nothing here yet" 
  actions={<Button onClick={()=>alert('Create')}>Create</Button>} 
/>`,
        component: () => (
          <Empty 
            icon={<span>🗂️</span>} 
            description="Nothing here yet" 
            actions={<Button onClick={()=>alert('Create')}>Create</Button>} 
          />
        )
      },
      {
        title: '使用 children',
        description: '优先使用 children 作为展示文案',
        code: `<Empty>自定义文案（children）</Empty>`,
        component: () => <Empty>自定义文案（children）</Empty>
      }
    ],
    props: [
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: '图标', required: false },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: '描述文字', required: false },
      { name: 'actions', type: 'ReactNode', defaultValue: '-', description: '操作区', required: false },
      { name: 'size', type: "'small'|'medium'|'large'", defaultValue: 'medium', description: '尺寸', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  }
  ,
  {
    name: 'DatePicker',
    category: '数据录入',
    description: '日期选择器用于选择单日或范围',
    examples: [
      {
        title: '单选（受控）',
        description: 'mode="single" 受控值',
        code: `const [val,setVal]=useState<Date|null>(null)
<DatePicker mode="single" value={val} onChange={setVal} placeholder="选择日期" />`,
        component: () => {
          const [val,setVal]=useState<Date|null>(null)
          return (
            <div>
              <DatePicker mode="single" value={val} onChange={setVal} placeholder="选择日期" />
              <div style={{ marginTop: 8 }}>Selected: {val ? val.toLocaleDateString() : 'None'}</div>
            </div>
          )
        }
      },
      {
        title: '范围（受控）',
        description: 'mode="range" 受控范围',
        code: `const [rng,setRng]=useState<[Date,Date]|null>(null)
<DatePicker mode="range" value={rng} onChange={setRng} placeholder="选择日期范围" />`,
        component: () => {
          const [rng,setRng]=useState<[Date,Date]|null>(null)
          return (
            <div>
              <DatePicker mode="range" value={rng} onChange={setRng} placeholder="选择日期范围" />
              <div style={{ marginTop: 8 }}>Selected: {rng && rng[0] && rng[1] ? `${rng[0].toLocaleDateString()} ~ ${rng[1].toLocaleDateString()}` : 'None'}</div>
            </div>
          )
        }
      },
      {
        title: '禁用过去日期',
        description: 'disabledDate 控制可选范围',
        code: `<DatePicker mode="single" disabledDate={(d)=> d < new Date(new Date().setHours(0,0,0,0))} placeholder="不可选择过去日期" />`,
        component: () => (
          <DatePicker mode="single" disabledDate={(d)=> d < new Date(new Date().setHours(0,0,0,0))} placeholder="不可选择过去日期" />
        )
      },
      {
        title: '默认月份与样式变量',
        description: 'defaultMonth 与 cssVariables 自定义',
        code: `<DatePicker defaultMonth={new Date(2025,0,1)} cssVariables={{ '--cal-primary-color': '#7c3aed' }} />`,
        component: () => (
          <DatePicker defaultMonth={new Date(2025,0,1)} cssVariables={{ '--cal-primary-color': '#7c3aed', '--cal-primary-hover': '#6d28d9' }} />
        )
      }
    ],
    props: [
      { name: 'mode', type: "'single'|'range'", defaultValue: 'single', description: '选择模式', required: false },
      { name: 'value', type: 'Date | [Date,Date] | null', defaultValue: '-', description: '受控值', required: false },
      { name: 'defaultMonth', type: 'Date', defaultValue: '-', description: '默认展示月份', required: false },
      { name: 'disabledDate', type: '(date: Date) => boolean', defaultValue: '-', description: '禁用日期判断', required: false },
      { name: 'onChange', type: '(value) => void', defaultValue: '-', description: '值变化回调', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false },
      { name: 'cssVariables', type: 'Record<string,string>', defaultValue: '-', description: '样式变量', required: false },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: '占位符', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用态', required: false },
      { name: 'format', type: '(value) => string', defaultValue: '-', description: '值格式化', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false }
    ]
  },
  {
    name: 'Collapse',
    category: '数据展示',
    description: '折叠面板用于收纳与展开内容',
    examples: [
      {
        title: '基础',
        description: '默认展开部分面板',
        code: `<Collapse items={[{key:'a',label:'A',content:<div>A</div>},{key:'b',label:'B',content:<div>B</div>},{key:'c',label:'C',content:<div>C</div>}]} defaultActiveKeys={['a']} />`,
        component: () => (
          <Collapse items={[{key:'a',label:'A',content:<div style={{padding:8}}>A</div>},{key:'b',label:'B',content:<div style={{padding:8}}>B</div>},{key:'c',label:'C',content:<div style={{padding:8}}>C</div>}]} defaultActiveKeys={['a']} />
        )
      },
      {
        title: '手风琴',
        description: '只能展开一个面板',
        code: `<Collapse accordion items={[{key:'x',label:'X',content:<div>X</div>},{key:'y',label:'Y',content:<div>Y</div>},{key:'z',label:'Z',content:<div>Z</div>}]} />`,
        component: () => (
          <Collapse accordion items={[{key:'x',label:'X',content:<div style={{padding:8}}>X</div>},{key:'y',label:'Y',content:<div style={{padding:8}}>Y</div>},{key:'z',label:'Z',content:<div style={{padding:8}}>Z</div>}]} />
        )
      }
    ],
    props: [
      { name: 'items', type: 'Array<{ key:string; label:ReactNode; content:ReactNode; disabled?:boolean }>', defaultValue: '[]', description: '面板项', required: true },
      { name: 'defaultActiveKeys', type: 'string[]', defaultValue: '[]', description: '默认展开项', required: false },
      { name: 'accordion', type: 'boolean', defaultValue: 'false', description: '手风琴模式', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false },
      { name: 'onChange', type: '(activeKeys:string[])=>void', defaultValue: '-', description: '展开项变化', required: false },
      { name: 'iconRender', type: '(opened:boolean)=>ReactNode', defaultValue: '-', description: '自定义图标', required: false },
      { name: 'iconPosition', type: "'left'|'right'", defaultValue: 'left', description: '图标位置', required: false }
    ]
  },
  {
    name: 'Timeline',
    category: '数据展示',
    description: '时间轴用于展示事件序列',
    examples: [
      {
        title: '默认纵向',
        description: '基础时间轴',
        code: `<Timeline items={[{key:'t1',label:'09:00',content:'Start'},{key:'t2',label:'11:00',content:'Checkpoint'},{key:'t3',label:'13:00',content:'Break'}]} />`,
        component: () => (
          <Timeline items={[{key:'t1',label:'09:00',content:'Start'},{key:'t2',label:'11:00',content:'Checkpoint'},{key:'t3',label:'13:00',content:'Break'}]} />
        )
      },
      {
        title: '状态与横向',
        description: '状态颜色与横向布局',
        code: `<Timeline orientation="horizontal" items={[{key:'s1',content:'Deploy',status:'success'},{key:'s2',content:'Warning',status:'warning'},{key:'s3',content:'Error',status:'error'}]} />`,
        component: () => (
          <Timeline orientation="horizontal" items={[{key:'s1',content:'Deploy',status:'success'},{key:'s2',content:'Warning',status:'warning'},{key:'s3',content:'Error',status:'error'}]} />
        )
      }
    ],
    props: [
      { name: 'items', type: 'Array<{ key:string; label?:ReactNode; content:ReactNode; status?:"default"|"success"|"warning"|"error" }>', defaultValue: '[]', description: '时间轴项', required: true },
      { name: 'orientation', type: "'vertical'|'horizontal'", defaultValue: 'vertical', description: '方向', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Tooltip',
    category: '反馈组件',
    description: '文字提示用于鼠标悬浮辅助信息',
    examples: [
      {
        title: '不同方向',
        description: 'top/bottom/left/right 展示',
        code: `<Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
<Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
<Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>`,
        component: () => (
          <div className="flex gap-12 items-center flex-wrap">
            <Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
            <Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
            <Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
            <Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>
          </div>
        )
      },
      {
        title: '富文本提示',
        description: '支持 ReactNode 文案',
        code: `<Tooltip title={<span>Rich tip ✨</span>} placement="top"><span>Hover me</span></Tooltip>`,
        component: () => (
          <Tooltip title={<span>Rich tip ✨</span>} placement="top"><span style={{ padding: 8, borderRadius: 6 }}>Hover me</span></Tooltip>
        )
      }
    ],
    props: [
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: '提示内容', required: true },
      { name: 'placement', type: "'top'|'bottom'|'left'|'right'", defaultValue: 'top', description: '方向', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Rate',
    category: '数据录入',
    description: '评分组件用于分值选择',
    examples: [
      {
        title: '基础与数量',
        description: '默认与 count=10',
        code: `<Rate />
<Rate count={10} />`,
        component: () => (
          <div className="flex gap-6 items-center flex-wrap"><Rate /><Rate count={10} /></div>
        )
      },
      {
        title: '半星与禁用/只读',
        description: 'allowHalf/disabled/readOnly',
        code: `<Rate allowHalf />
<Rate disabled defaultValue={3} />
<Rate readOnly value={4} />`,
        component: () => (
          <div className="flex gap-6 items-center flex-wrap"><Rate allowHalf /><Rate disabled defaultValue={3} /><Rate readOnly value={4} /></div>
        )
      },
      {
        title: '自定义字符与受控',
        description: 'character 与受控值',
        code: `const [v,setV]=useState(2.5)
<Rate character={<span>❤️</span>} />
<Rate allowHalf value={v} onChange={setV} />`,
        component: () => {
          const [v,setV]=useState(2.5)
          return (
            <div className="grid gap-2">
              <div className="flex gap-6 items-center"><Rate character={<span>❤️</span>} /></div>
              <div><Rate allowHalf value={v} onChange={setV} /> <span style={{ marginLeft: 8 }}>Value: {v}</span></div>
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'count', type: 'number', defaultValue: '5', description: '星星数量', required: false },
      { name: 'value', type: 'number', defaultValue: '-', description: '受控值', required: false },
      { name: 'defaultValue', type: 'number', defaultValue: '-', description: '默认值', required: false },
      { name: 'allowHalf', type: 'boolean', defaultValue: 'false', description: '允许半星', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用', required: false },
      { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: '只读', required: false },
      { name: 'character', type: 'ReactNode', defaultValue: '-', description: '自定义字符', required: false },
      { name: 'onChange', type: '(value:number)=>void', defaultValue: '-', description: '变化回调', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  },
  {
    name: 'Drawer',
    category: '反馈组件',
    description: '抽屉用于侧边或上下滑出内容',
    examples: [
      {
        title: '四个方向',
        description: 'right/left/top/bottom 展示',
        code: `const [r,setR]=useState(false); const [l,setL]=useState(false); const [t,setT]=useState(false); const [b,setB]=useState(false)
<div style={{ display:'flex', gap:8 }}>
  <Button onClick={()=>setR(true)}>Right</Button>
  <Button onClick={()=>setL(true)}>Left</Button>
  <Button onClick={()=>setT(true)}>Top</Button>
  <Button onClick={()=>setB(true)}>Bottom</Button>
</div>
<Drawer open={r} title="Right" onClose={()=>setR(false)} placement="right" width={360}><div>右侧抽屉内容。</div></Drawer>
<Drawer open={l} title="Left" onClose={()=>setL(false)} placement="left" width={360}><div>左侧抽屉内容。</div></Drawer>
<Drawer open={t} title="Top" onClose={()=>setT(false)} placement="top" height={240}><div>顶部抽屉内容。</div></Drawer>
<Drawer open={b} title="Bottom" onClose={()=>setB(false)} placement="bottom" height={240}><div>底部抽屉内容。</div></Drawer>`,
        component: () => {
          const [r,setR]=useState(false); const [l,setL]=useState(false); const [t,setT]=useState(false); const [b,setB]=useState(false)
          return (
            <div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <Button onClick={()=>setR(true)}>Right</Button>
                <Button onClick={()=>setL(true)}>Left</Button>
                <Button onClick={()=>setT(true)}>Top</Button>
                <Button onClick={()=>setB(true)}>Bottom</Button>
              </div>
              <Drawer open={r} title="Right" onClose={()=>setR(false)} placement="right" width={360}><div>右侧抽屉内容。</div></Drawer>
              <Drawer open={l} title="Left" onClose={()=>setL(false)} placement="left" width={360}><div>左侧抽屉内容。</div></Drawer>
              <Drawer open={t} title="Top" onClose={()=>setT(false)} placement="top" height={240}><div>顶部抽屉内容。</div></Drawer>
              <Drawer open={b} title="Bottom" onClose={()=>setB(false)} placement="bottom" height={240}><div>底部抽屉内容。</div></Drawer>
            </div>
          )
        }
      },
      {
        title: '不可遮罩关闭与键盘关闭',
        description: 'maskClosable=false keyboard=false',
        code: `const [open,setOpen]=useState(false)
<Button onClick={()=>setOpen(true)}>Open</Button>
<Drawer open={open} title="限制关闭" onClose={()=>setOpen(false)} maskClosable={false} keyboard={false}><div>Esc 和点击遮罩不会关闭。</div></Drawer>`,
        component: () => {
          const [open,setOpen]=useState(false)
          return (
            <div>
              <Button onClick={()=>setOpen(true)}>Open</Button>
              <Drawer open={open} title="限制关闭" onClose={()=>setOpen(false)} maskClosable={false} keyboard={false}><div>Esc 和点击遮罩不会关闭。</div></Drawer>
            </div>
          )
        }
      }
    ],
    props: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '是否显示', required: true },
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: '标题', required: false },
      { name: 'placement', type: "'left'|'right'|'top'|'bottom'", defaultValue: 'right', description: '抽屉方向', required: false },
      { name: 'width', type: 'number | string', defaultValue: '360', description: '宽度（左右）', required: false },
      { name: 'height', type: 'number | string', defaultValue: '240', description: '高度（上下）', required: false },
      { name: 'zIndex', type: 'number', defaultValue: '1000', description: '层级', required: false },
      { name: 'maskClosable', type: 'boolean', defaultValue: 'true', description: '点击遮罩关闭', required: false },
      { name: 'keyboard', type: 'boolean', defaultValue: 'true', description: 'Esc 关闭', required: false },
      { name: 'closable', type: 'boolean', defaultValue: 'true', description: '显示关闭按钮', required: false },
      { name: 'closeIcon', type: 'ReactNode', defaultValue: '-', description: '自定义关闭图标', required: false },
      { name: 'destroyOnHidden', type: 'boolean', defaultValue: 'false', description: '关闭后销毁内容', required: false },
      { name: 'extra', type: 'ReactNode', defaultValue: '-', description: '右上角额外区域', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false },
      { name: 'onClose', type: '(e)=>void', defaultValue: '-', description: '关闭回调', required: false }
    ]
  },
  {
    name: 'Tree',
    category: '数据展示',
    description: '树形控件用于层级数据的展示与选择',
    examples: [
      {
        title: '基础（默认展开）',
        description: '默认展开第一层',
        code: `<Tree treeData={[{key:'0-0',title:'Parent 1',children:[{key:'0-0-0',title:'Leaf 0-0-0'}]},{key:'0-1',title:'Parent 2'}]} defaultExpandedKeys={["0-0"]} />`,
        component: () => (
          <Tree treeData={[{key:'0-0',title:'Parent 1',children:[{key:'0-0-0',title:'Leaf 0-0-0'}]},{key:'0-1',title:'Parent 2'}]} defaultExpandedKeys={["0-0"]} />
        )
      },
      {
        title: '可选（单选/多选）',
        description: '选择节点（受控）',
        code: `const [sel,setSel]=useState<string[]>([])
<Tree treeData={data} selectable selectedKeys={sel} onSelect={setSel} />
<Tree treeData={data} selectable multiple selectedKeys={sel} onSelect={setSel} />`,
        component: () => {
          const data = [
            { key:'0-0', title:'Parent 1', children:[{ key:'0-0-0', title:'Leaf 0-0-0' }, { key:'0-0-1', title:'Leaf 0-0-1' }]},
            { key:'0-1', title:'Parent 2' }
          ]
          const [sel,setSel]=useState<string[]>([])
          return (
            <div className="grid gap-6">
              <Tree treeData={data} selectable selectedKeys={sel} onSelect={setSel as any} />
              <Tree treeData={data} selectable multiple selectedKeys={sel} onSelect={setSel as any} />
              <div className="text-sm text-gray-500">Selected: {sel.join(', ') || 'None'}</div>
            </div>
          )
        }
      },
      {
        title: '可勾选（级联）',
        description: '显示复选并级联',
        code: `<Tree treeData={data} checkable defaultExpandedKeys={["0-0"]} />`,
        component: () => (
          <Tree treeData={[{ key:'0-0', title:'Parent 1', children:[{ key:'0-0-0', title:'Leaf 0-0-0' }, { key:'0-0-1', title:'Leaf 0-0-1' }]}]} checkable defaultExpandedKeys={["0-0"]} />
        )
      },
      {
        title: '受控展开/勾选',
        description: '外部控制 expandedKeys/checkedKeys',
        code: `const [exp,setExp]=useState<string[]>(['0-0']); const [chk,setChk]=useState<string[]>([])
<div style={{ display:'flex', gap:8 }}>
  <Button onClick={()=>setExp(['0-0','0-1'])}>Expand All</Button>
  <Button onClick={()=>setExp([])} variant="secondary">Collapse All</Button>
  <Button onClick={()=>setChk(['0-0','0-0-0'])}>Check Some</Button>
  <Button onClick={()=>setChk([])} variant="secondary">Uncheck All</Button>
</div>
<Tree treeData={data} checkable expandedKeys={exp} onExpand={setExp} checkedKeys={chk} onCheck={(keys)=>setChk(keys)} />`,
        component: () => {
          const data = [
            { key:'0-0', title:'Parent 1', children:[{ key:'0-0-0', title:'Leaf 0-0-0' }, { key:'0-0-1', title:'Leaf 0-0-1' }]},
            { key:'0-1', title:'Parent 2' }
          ]
          const [exp,setExp]=useState<string[]>(['0-0']); const [chk,setChk]=useState<string[]>([])
          return (
            <div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:8 }}>
                <Button onClick={()=>setExp(['0-0','0-1'])}>Expand All</Button>
                <Button onClick={()=>setExp([])} variant="secondary">Collapse All</Button>
                <Button onClick={()=>setChk(['0-0','0-0-0'])}>Check Some</Button>
                <Button onClick={()=>setChk([])} variant="secondary">Uncheck All</Button>
              </div>
              <Tree treeData={data} checkable expandedKeys={exp} onExpand={setExp} checkedKeys={chk} onCheck={(keys)=>setChk(keys)} />
              <div className="text-sm text-gray-500" style={{ marginTop:8 }}>Checked: {chk.join(', ') || 'None'}</div>
            </div>
          )
        }
      },
      {
        title: '自定义图标',
        description: '使用 iconRender 以文件夹/文件图标展示',
        code: `<Tree showIcon iconRender={(node)=> <span aria-hidden>{node.children?.length ? '📁' : '📄'}</span>} treeData={data} defaultExpandedKeys={["0-0"]} />`,
        component: () => (
          <Tree showIcon iconRender={(node)=> <span aria-hidden>{node.children?.length ? '📁' : '📄'}</span>} treeData={[{ key:'0-0', title:'Parent 1', children:[{ key:'0-0-0', title:'Leaf 0-0-0' }]}]} defaultExpandedKeys={["0-0"]} />
        )
      }
    ],
    props: [
      { name: 'treeData', type: 'Array<{ key:string; title:ReactNode; children?:Array<any>; disabled?:boolean }>', defaultValue: '[]', description: '数据源', required: true },
      { name: 'defaultExpandedKeys', type: 'string[]', defaultValue: '[]', description: '默认展开', required: false },
      { name: 'expandedKeys', type: 'string[]', defaultValue: '-', description: '受控展开', required: false },
      { name: 'onExpand', type: '(keys:string[])=>void', defaultValue: '-', description: '展开回调', required: false },
      { name: 'selectable', type: 'boolean', defaultValue: 'false', description: '允许选择', required: false },
      { name: 'multiple', type: 'boolean', defaultValue: 'false', description: '多选', required: false },
      { name: 'selectedKeys', type: 'string[]', defaultValue: '-', description: '受控选中', required: false },
      { name: 'defaultSelectedKeys', type: 'string[]', defaultValue: '[]', description: '默认选中', required: false },
      { name: 'onSelect', type: '(keys:string[], node)=>void', defaultValue: '-', description: '选择回调', required: false },
      { name: 'checkable', type: 'boolean', defaultValue: 'false', description: '显示复选', required: false },
      { name: 'checkedKeys', type: 'string[]', defaultValue: '-', description: '受控勾选', required: false },
      { name: 'defaultCheckedKeys', type: 'string[]', defaultValue: '[]', description: '默认勾选', required: false },
      { name: 'onCheck', type: '(keys:string[], node, info)=>void', defaultValue: '-', description: '勾选回调', required: false },
      { name: 'showIcon', type: 'boolean', defaultValue: 'false', description: '显示图标', required: false },
      { name: 'iconRender', type: '(node)=>ReactNode', defaultValue: '-', description: '图标渲染', required: false },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁用', required: false },
      { name: 'className', type: 'string', defaultValue: '-', description: '类名', required: false },
      { name: 'style', type: 'CSSProperties', defaultValue: '-', description: '行内样式', required: false }
    ]
  }
];

export const categories = [
  { key: '基础组件', name: '基础组件', components: ['Button'] },
  { key: '数据录入', name: '数据录入', components: ['Input', 'Checkbox', 'Radio', 'Select', 'Switch', 'Form', 'DatePicker', 'Rate'] },
  { key: '数据展示', name: '数据展示', components: ['Table', 'Tabs', 'Empty', 'Collapse', 'Timeline', 'Tree'] },
  { key: '反馈组件', name: '反馈组件', components: ['Modal', 'Progress', 'Tooltip', 'Drawer'] }
];
