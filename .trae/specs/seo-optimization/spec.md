# SEO 优化 Spec

## Why
SEO 审计发现当前项目存在若干技术 SEO 差距：robots.txt 缺失、结构化数据通过客户端注入导致爬虫不可见、重复 H1 标签、canonical URL 缺失等问题。本 spec 系统性地修复所有审计中发现的问题，提升搜索引擎可见性和排名信号。

## What Changes

### 高优先级
- 创建 `robots.ts`，声明允许所有爬虫并引用 sitemap（用户已在处理中）
- 将 JSON-LD 结构化数据（SoftwareApplication + FAQPage）从 `LandingPage.tsx` 客户端组件移至 `layout.tsx` 服务端组件
- 修复 TitleBar 中 H1 与 LandingPage Hero H1 重复的问题

### 中优先级
- 在 `generateMetadata()` 中添加 `alternates.canonical`
- Landing 页面的 How It Works、FAQ、About 文字内容改为服务端渲染组件
- Dashboard 视图中添加隐藏 H1（SEO 语义结构）

### 低优先级
- OG 图片添加 WebP 格式备选
- 清理 `public/landing/` 中未使用的旧图片文件
- 清理 `public/` 中的 `_preview.png` 冗余文件

## Impact
- Affected specs: N/A（新 spec）
- Affected code:
  - `src/app/robots.ts`（用户已创建）
  - `src/app/layout.tsx`（JSON-LD + canonical + WebP OG）
  - `src/components/TitleBar.tsx`（H1 → span）
  - `src/components/LandingPage.tsx`（移除 JSON-LD，抽出服务端内容组件）
  - `src/components/Dashboard.tsx`（添加隐藏 H1）
  - `public/landing/`（清理旧文件）

## ADDED Requirements

### Requirement: Robots.txt 生成
系统 SHALL 在构建时生成 `/robots.txt`，允许所有爬虫访问全部路径，并引用 sitemap。

#### Scenario: 静态导出生成 robots.txt
- **WHEN** 执行 `next build`（`output: "export"`）
- **THEN** `/robots.txt` 包含 `Allow: /`、`User-agent: *`、`Sitemap: <SITE_URL>/sitemap.xml`

### Requirement: 服务端结构化数据输出
系统 SHALL 在 `<head>` 中直接输出 `SoftwareApplication` 和 `FAQPage` JSON-LD，不依赖客户端 JS 执行。

#### Scenario: 爬虫抓取时可见结构化数据
- **WHEN** 搜索引擎爬虫请求页面 HTML
- **THEN** `<script type="application/ld+json">` 包含完整的 SoftwareApplication schema（多语言 en/zh 各一份）和 FAQPage schema

### Requirement: 页面仅有一个 H1
系统 SHALL 确保 Landing 页面只有 Hero 区域包含一个 `<h1>`，TitleBar 中的标题使用非语义元素。

#### Scenario: Landing 页标题结构
- **WHEN** 用户访问 Landing 页
- **THEN** Hero 区域有唯一 `<h1>` 显示应用标题，TitleBar 中的应用名使用 `<span>` 或 `<div>`

### Requirement: Canonical URL
系统 SHALL 在页面 `<head>` 中包含 `<link rel="canonical">` 指向站点主 URL。

#### Scenario: 爬虫读取 canonical
- **WHEN** 搜索引擎爬虫请求任意页面
- **THEN** `<link rel="canonical" href="<SITE_URL>">` 存在

### Requirement: Landing 页服务端渲染内容
系统 SHALL 将 Landing 页的 How It Works、FAQ、About 区域中的文字内容通过服务端组件渲染，确保不依赖客户端 JS 即可被爬虫解析。

#### Scenario: 禁用 JS 时内容可见
- **WHEN** 用户代理禁用 JavaScript 请求 Landing 页面
- **THEN** How It Works、FAQ、About 文字内容在原始 HTML 中可见（忽略 IntersectionObserver 动画效果）

### Requirement: Dashboard 视图语义 H1
系统 SHALL 在 Dashboard 视图（数据已加载后）中放置一个视觉隐藏但语义存在的 H1。

#### Scenario: 仪表盘页标题结构
- **WHEN** 用户已上传数据，浏览仪表盘视图
- **THEN** Dashboard 视图中存在 `<h1 className="sr-only">` 或类似隐藏 H1

### Requirement: OG 图片 WebP 格式
系统 SHALL 在 OpenGraph metadata 中提供 WebP 格式的 Logo 备选图片。

#### Scenario: 社交媒体分享时选择最佳格式
- **WHEN** 社交平台抓取 OG 图片
- **THEN** `og:image` 和 `og:image:type` 提供 PNG 512x512，同时提供 WebP 备选 `images` 数组中的第二项

### Requirement: 冗余文件清理
系统 SHALL 移除 `public/landing/` 中未使用的旧图片和预览文件。

#### Scenario: 构建产物不包含废弃文件
- **WHEN** 执行 `next build` 静态导出
- **THEN** 构建产物中不包含 `notion_sketch_chart_light_old.png`、`notion_sketch_chart_dark_preview.png`、`notion_sketch_csv_dark_preview.png`
