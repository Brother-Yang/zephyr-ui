# Zephyr UI

下一代超轻量、性能炸裂的 React 组件库：一行引入、即刻上手。覆盖表单、数据展示、反馈与导航全场景，内置暗黑主题与国际化，开箱即用。
从 Button/Input/Select/Form 到 Table/Tabs/Timeline/Tree，再到 Modal/Drawer/Tooltip/Progress/DatePicker，一套搞定常用组件；可访问性与键盘交互、受控/非受控、半选级联、动画过渡等细节全部到位。设计令牌驱动、类名前缀可定制、零外部依赖、TypeScript 全量类型与单测护航，助你从 MVP 直抵企业级交付。

## 安装与使用

```bash
pnpm add zephyr-react-ui react react-dom
```

```tsx
import {
  ConfigProvider,
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
  Modal,
  Progress,
  Tree,
  Drawer
} from 'zephyr-react-ui'

export default function App() {
  return (
    <ConfigProvider theme="light">
      <Button>Primary</Button>
    </ConfigProvider>
  )
}
```

## 组件一览

- 基础：`Button`、`Empty`、`Tooltip`
- 表单：`Input`、`Checkbox`/`CheckboxGroup`、`Radio`/`RadioGroup`、`Select`、`Switch`、`Form`/`FormItem`、`DatePicker`
- 数据展示：`Table`、`Tabs`、`Collapse`、`Timeline`、`Rate`、`Progress`、`Tree`
- 反馈：`Modal`、`Drawer`

组件入口位于 `packages/ui/src/components`，统一从包根 `zephyr-react-ui` 导出。

## 配置与主题

`ConfigProvider` 提供主题/本地化/类名前缀：

- `theme`：`light | dark | system`
- `locale`：内置 `enUS`、`zhCN`，可部分覆写
- `classPrefix`：设置全局类名前缀（默认 `zephyr-`）

```tsx
import { ConfigProvider, zhCN } from 'zephyr-react-ui'

<ConfigProvider theme="dark" locale={zhCN} classPrefix="app">
  {/* children */}
</ConfigProvider>
```

## 使用示例

### Modal 对话框

```tsx
import { Modal, Button } from 'zephyr-react-ui'

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        title="标题"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        centered
        confirmLoading={false}
      >
        内容区域
      </Modal>
    </>
  )
}
```

### Drawer 抽屉

```tsx
import { Drawer, Button } from 'zephyr-react-ui'

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="标题" placement="right" width={360}>
        抽屉内容
      </Drawer>
    </>
  )
}
```

### Progress 进度条

```tsx
import { Progress } from 'zephyr-react-ui'

<>
  <Progress type="line" percent={60} />
  <Progress type="circle" percent={75} />
  <Progress type="dashboard" percent={50} />
</>
```

### Tree 树形组件

```tsx
import { Tree } from 'zephyr-react-ui'

const data = [
  { key: 'a', title: 'A', children: [ { key: 'a1', title: 'A1' } ] },
  { key: 'b', title: 'B' }
]

<Tree
  treeData={data}
  defaultExpandedKeys={[ 'a' ]}
  selectable
  checkable
/>
```

## 开发与测试

- 构建：`pnpm -C packages/ui build`
- 测试：`pnpm -C packages/ui test`
- 示例：`pnpm -C examples/react-vite dev`，访问 `http://localhost:5173/`

## 目录结构

```
packages/ui/src/
  components/      组件实现与样式
  types/           组件类型定义
  config.tsx       ConfigProvider 与本地化/主题
  config/classPrefix.ts 类名前缀工具
  styles/variables.css 设计令牌
```

## 设计令牌

在 `styles/variables.css` 中定义颜色、间距、圆角、阴影等变量，可通过 `ConfigProvider` 的 `tokens` 进行覆写应用到文档根。
