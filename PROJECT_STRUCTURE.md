# Demo Monorepo 项目结构说明

## 概览
- 类型：pnpm 工作区 monorepo
- 包管理器：`pnpm@8.0.0`（根 `package.json` 的 `packageManager` 字段）
- 工作区：`packages/*`、`examples/*`（`pnpm-workspace.yaml`）
- 主要包：
  - `packages/ui`：React 组件库（Vite 构建，输出 ES/CJS/类型 + 预生成样式）
  - `examples/react-vite`：示例应用（消费组件库）

## 目录结构
```
.
├─ pnpm-workspace.yaml
├─ package.json
├─ packages/
│  └─ ui/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     ├─ style.css
│     ├─ scripts/
│     │  └─ generateCSS.ts
│     └─ src/
│        ├─ index.ts
│        ├─ theme/
│        │  └─ ThemeProvider.tsx
│        ├─ i18n/
│        │  └─ I18nProvider.tsx
│        ├─ form/
│        │  ├─ Form.tsx
│        │  └─ Fields.tsx
│        ├─ table/
│        │  └─ DataTable.tsx
│        └─ styles/
│           ├─ config.ts
│           ├─ reset.css
│           ├─ tokens.css
│           ├─ prefix.css
│           └─ components.css
├─ examples/
│  └─ react-vite/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     ├─ index.html
│     └─ src/
│        ├─ main.tsx
│        └─ App.tsx
```

## 工作区与根配置
- `pnpm-workspace.yaml`：
  ```yaml
  packages:
    - 'packages/*'
    - 'examples/*'
  ```
- 根 `package.json`：
  - `scripts.build`：`pnpm -F @zephyr-ui/ui build`
  - `scripts.dev`：`pnpm -F example dev`
  - `scripts.test`：`pnpm -F @zephyr-ui/ui test`

## 组件库（packages/ui）
- `package.json`：
  - 包名：`@zephyr-ui/ui`
  - 输出：`dist/index.es.js`、`dist/index.cjs.js`、`dist/index.d.ts`、`style.css`
  - `peerDependencies`：`react`、`react-dom`
  - `devDependencies`：`vite`、`vite-plugin-dts`、`typescript`、`vitest`、`@vitejs/plugin-react`
  - `scripts`：`build`（Vite）/ `test`（Vitest）
- 构建（`vite.config.ts`）：
  - 插件：React、`vite-plugin-dts`、自定义 `generate-prefixed-css`
  - 库构建：入口 `src/index.ts`，formats `es`/`cjs`，`external`：`react`、`react-dom`
  - 在 `buildStart` 阶段将 `src/styles/components.css` 前缀处理并写入 `dist/style.css`
- 导出入口（`src/index.ts`）：聚合导出主题、国际化、表单、表格，并引入基础样式文件
- 样式系统：
  - 前缀：默认 `dui`，可通过 `configureStyle({ prefix })` 动态覆盖（`src/styles/config.ts`）
  - 变量：`prefix.css` 定义 `--dui-prefix`，`tokens.css` 定义设计令牌（颜色、字号、间距等）
  - 组件样式：`components.css` 采用类名前缀（如 `.dui-btn`、`.dui-form`）；构建时生成 `style.css` 供使用方直接引入
- 主题（`theme/ThemeProvider.tsx`）：
  - `ThemeProvider` 根据传入的 `theme` 对象，注入 CSS 变量（如 `--color-bg`）
  - `createTheme` 用于创建令牌对象
- 国际化（`i18n/I18nProvider.tsx`）：
  - `I18nProvider` 提供 `locale`、`messages`
  - `useI18n().t(key, params)` 文本查找与插值
  - 默认消息：`defaultMessagesEn`、`defaultMessagesZh`
- 表单与表格：
  - 表单（`form/Form.tsx`、`form/Fields.tsx`）：上下文管理值与错误，`layout: stack | inline | grid`
  - 表格（`table/DataTable.tsx`）：列定义、排序、分页、密度（`compact`/`comfortable`）

## 示例应用（examples/react-vite）
- `package.json`：
  - 依赖库：`"@zephyr-ui/ui": "file:../../packages/ui"`
  - `scripts`：`dev`/`build`（Vite）
- `vite.config.ts`：React 插件，`server.port = 5173`
- 入口（`src/main.tsx`）：在渲染前调用 `configureStyle({ prefix: 'myapp' })`
- `src/App.tsx`：演示主题切换、国际化、表单与表格使用

## 迁移步骤清单（将你的项目改造成该结构）
1. 切换到 `pnpm` 并在根新增 `pnpm-workspace.yaml` 指向 `packages/*` 与 `examples/*`
2. 配置根 `package.json` 的 `packageManager` 与工作区脚本（`build/dev/test`）
3. 创建组件库包 `packages/ui`，按上述目录与文件组织；实现入口导出与样式文件
4. 在库构建中确保 `react/react-dom` 为 `external`，产出 ES/CJS/类型与 `style.css`
5. 创建示例应用 `examples/react-vite`，通过 `file:` 依赖本地库并演示使用
6. 在示例的 `main.tsx` 中调用 `configureStyle` 设置你的前缀
7. 运行 `pnpm install`，在根执行 `pnpm dev` 启动示例，`pnpm build` 构建库

## 常用命令
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm -F @zephyr-ui/ui test`

## 约定与规范
- CSS 类统一采用前缀化：`${prefix}-<component>`，默认前缀为 `dui`
- 使用 `createClassName(base, ...modifiers)` 生成类名，保证一致性
- 主题通过 CSS 变量传递，不引入运行时 CSS-in-JS
