# DeepSeek 用量仪表盘

一款纯浏览器端的 DeepSeek API 用量分析仪表盘。将月度 CSV 导出文件拖拽到页面，即刻获取费用图表、各 Key 用量明细、缓存分析和用量趋势 — 所有数据均在浏览器本地处理。无需服务器、无需上传、无需注册。

> [English version](README.md)

## 使用方式

1. 前往 [DeepSeek 平台](https://platform.deepseek.com) → 用量 → 导出月度 CSV
2. 每月会得到两个文件：`amount-{年份}-{月份}.csv` 和 `cost-{年份}-{月份}.csv`
3. 将所有文件拖拽到仪表盘（单月或多月均可，自动配对）
4. 图表即刻渲染 — 数据不会离开你的浏览器

## 功能特性

- **总览** — KPI 大数字展示（费用、Token 数、缓存命中率、活跃 Key）+ 每日费用柱状图 + 各 Key 费用环形图
- **按 Key** — 详细表格，展示每个 Key 的 Token 数、费用、颜色标记的缓存命中率（绿色 > 40% / 琥珀色 20–40% / 红色 < 20%）、请求次数及内嵌用量条
- **缓存** — 大字号命中率展示、每日缓存命中率趋势折线图、各 Key 缓存命中/未命中堆叠柱状图
- **趋势** — 可切换多指标折线图（费用 / Token / 缓存命中率 / 请求次数），顶部大数字动态跟随指标切换
- **深色模式** — 完整的浅色/深色双主题，基于 CSS 自定义属性；自动检测系统偏好，手动切换持久化至 localStorage
- **多语言** — 英文和中文，根据浏览器语言自动检测；手动切换持久化至 localStorage
- **模型筛选** — 分段控件胶囊按钮，按模型过滤所有视图；仅在检测到 ≥2 个模型时显示
- **多月支持** — 一次拖入多个月份文件；根据文件名模式自动配对并拼接
- **Apple 极简设计** — 冷灰纸质感底、大量留白、「无卡片」通栏模块布局、细横线分割、5rem Hero 大数字、弥散阴影
- **100% 隐私** — 所有 CSV 解析（Papa Parse）和费用计算均在浏览器客户端完成

## CSV 格式

DeepSeek 平台标准导出格式：

### `amount-{年份}-{月份}.csv`

| 列名             | 说明                                                                                 |
| -------------- | ---------------------------------------------------------------------------------- |
| `utc_date`     | 使用日期                                                                               |
| `model`        | 模型名称，如 `deepseek-chat`、`deepseek-reasoner`                                         |
| `api_key_name` | API Key 标签                                                                         |
| `api_key`      | Key（脱敏）                                                                            |
| `type`         | `request_count`、`output_tokens`、`input_cache_hit_tokens`、`input_cache_miss_tokens` |
| `price`        | 单价（人民币）                                                                            |
| `amount`       | Token 或请求数量                                                                        |

### `cost-{年份}-{月份}.csv`

| 列名         | 说明        |
| ---------- | --------- |
| `utc_date` | 扣费日期      |
| `model`    | 模型名称      |
| `cost`     | 金额（负数为扣费） |
| `currency` | 币种（CNY）   |

## 本地开发

```bash
npm install
npm run dev        # 开发服务器 → localhost:3000
npm run build      # 静态导出 → out/
npm run lint       # ESLint
```

### 技术栈

| 层级     | 技术                                 |
| ------ | ---------------------------------- |
| 框架     | Next.js 16（App Router，静态导出）        |
| UI     | React 19                           |
| 图表     | ECharts 6 + echarts-for-react      |
| CSV 解析 | Papa Parse 5                       |
| 样式     | Tailwind CSS v4 + CSS 自定义属性        |
| 字体     | Hubot Sans（本地 WOFF2）+ Geist Mono（next/font/google） |
| 语言     | TypeScript 5（strict 严格模式）          |

### 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局、元数据、Provider
│   ├── page.tsx            # 入口 → <Dashboard />
│   ├── globals.css         # Tailwind v4 + Hubot Sans @font-face + CSS 变量 + 渐显/手风琴 + 基础样式
│   └── AppI18nShell.tsx    # i18n 外壳 + <html lang> 同步
├── components/
│   ├── TitleBar.tsx         # 共享顶部导航栏（Logo + 应用名 + GitHub + 语言 + 主题）
│   ├── FooterBar.tsx        # 共享页脚（版权 + GitHub 链接 + 版本号）
│   ├── LandingPage.tsx      # 落地页（Hero + 上传 + 使用说明 + 手风琴FAQ + 关于，滚动渐显）
│   ├── Dashboard.tsx        # 路由：落地页 / 仪表盘视图切换
│   ├── DropZone.tsx         # 拖拽或点击上传区（多文件）
│   ├── KPICards.tsx         # 摘要指标卡片
│   ├── OverviewView.tsx     # Hero 费用 + 日柱状图 + 环形图
│   ├── KeyView.tsx          # Hero Key 数量 + 详细表格
│   ├── CacheView.tsx        # Hero 命中率 + 趋势 + 堆叠图
│   ├── TrendsView.tsx       # Hero 动态指标 + 折线图
│   ├── ErrorDisplay.tsx     # 解析错误 & 警告横幅
│   ├── LanguageSwitcher.tsx # EN / 中文 切换（胶囊分段控件）
│   └── ThemeSwitcher.tsx    # 浅色 / 深色 切换（SVG 图标按钮）
├── i18n/
│   ├── index.ts            # 统一导出
│   ├── I18nProvider.tsx    # React 上下文 + useTranslation Hook
│   └── translations.ts     # 全部 UI 文案（en + zh）
└── lib/
    ├── types.ts            # TypeScript 接口与类型定义
    ├── parser.ts           # CSV 解析管线
    ├── concatFiles.ts      # 多月 CSV 配对与拼接
    ├── format.ts           # 本地化格式函数
    ├── DataContext.tsx      # 数据状态 + 模型筛选
    └── ThemeContext.tsx     # 主题状态 + useTheme Hook
```

## 设计系统

仪表盘遵循 **Apple 极简主义** 设计语言，完全由 CSS 自定义属性驱动：

- **30+ 主题色值** — 背景、文字（3 级）、边框、强调色、语义色（正向/危险/警告）、错误/警告横幅、图表色、拖拽区状态色
- **浅色主题**：`#F5F5F7` 冷灰纸质感底，`#1D1D1F` 哑光黑文字
- **深色主题**：`#000000` 纯黑底，`#F5F5F7` 白色文字
- **字体**：Hubot Sans，正文 400 字重 / 标题 500–700 字重，紧凑字间距
- **Hero 模式**：总览/Key/缓存/趋势视图中 `5rem` 粗体大数字 — 数据优先的视觉呈现
- **无卡片布局**：通栏模块，以 `1px solid var(--border)` 细线分割
- **微交互**：细腻的 hover 过渡（200ms）、淡入/上滑动画、Intersection Observer 滚动渐显、手风琴折叠面板
- **自定义滚动条**：6px 细条，透明轨道，主题色滑块
- **无障碍**：遵循 `prefers-reduced-motion`、`color-scheme` 原生 UI、`focus-visible` 轮廓、`aria-expanded`/`aria-controls` 交互属性

## 部署

静态输出，可部署到任何静态托管服务：

```bash
npm run build
# out/ → Vercel, Netlify, GitHub Pages, Cloudflare Pages 等
```

## 更新日志

### v0.2.3

**新增：**

- 新增落地页明暗主题图片背景，为页面提供一点灵动感。
- 新增语义化隐藏 H1、规范 URL 和多语言 JSON-LD 结构化数据，抽离服务端渲染的落地页内容。
- 添加 robots.txt 和 sitemap.xml 文件，优化搜索引擎索引和导航。

**改进：**

- 更新 DropZone 组件背景样式，优化拖拽交互效果。
- 其他 SEO 优化。

### v0.2.2

**新增：**

- 新增 Logo 图标和 favicon.ico 文件 — 在 TitleBar 和浏览器标签页中展示品牌标识。
- 替换项目英文默认字体为本地 Hubot Sans WOFF2 文件（3 个字重：400/500/700）。

**改进：**

- 重新设计语言切换器为 Apple 风格胶囊分段控件，支持 `role="radio"` 无障碍属性。
- 重新设计主题切换器为 SVG 太阳/月亮图标按钮，hover 时显示圆形背景。
- TitleBar 新增 GitHub 图标链接，方便快速访问代码仓库。
- FooterBar 新增版本号显示，与版权信息和 GitHub 链接并列。
- DropZone 拖拽区新增主题化背景色（`--dropzone-bg`），替换原先的透明背景。
- Landing 页面内容容器从 `max-w-3xl` 扩宽至 `max-w-6xl`，视觉更平衡。
- Landing 页面新增滚动渐显动画（Intersection Observer 驱动的淡入 + 上滑效果）。
- 常见问题区域新增手风琴展开/折叠动画。
- FooterBar 新增移动端友好的 flex-wrap 布局，小屏幕下文字自动换行。
- 更新中英双语文案，完善上传区域的提示文本，修正省略号格式。
- 添加全局无障碍样式：平滑滚动、`prefers-reduced-motion` 适配、`color-scheme` 原生 UI、`focus-visible` 焦点轮廓。

### v0.2.1

**新增：**

- 构建完整的上传前落地页，包含 Hero 区、上传区、使用说明、常见问题和关于等模块。

### v0.2.0

**新增：**

- 实现完整的明暗主题切换功能，重构全局 CSS 样式，使用 CSS 变量统一管理双主题配色。
- 新增模型筛选功能，在 Dashboard 添加 Apple 风格分段胶囊过滤器，优化 UI 与数据展示。

**改进：**

- 优化整体 UI 交互与视觉样式。
- 重构所有视图组件，改用过滤后的数据渲染，新增顶部 Hero 大数字汇总模块。

### v0.1.0

**新增：**

- 搭建 DeepSeek API 使用分析仪表盘，实现 CSV 解析、多月份文件合并与错误校验逻辑，所有数据处理均在浏览器端完成。
- 开发拖拽上传组件、数据上下文与多维度可视化仪表盘页面。
- 新增完整多语言支持与语言切换功能，并重构数值格式化工具函数，适配不同语言的单位展示规则。

## 开源协议

MIT
