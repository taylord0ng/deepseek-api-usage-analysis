# Tasks

- [x] Task 1: 创建 robots.ts 文件（用户已在处理）
  - [x] 确认 `src/app/robots.ts` 存在且内容正确：Allow `/`、User-agent `*`、Sitemap 引用

- [x] Task 2: 修复 TitleBar 中重复 H1
  - [x] 将 TitleBar.tsx 中的 `<h1>` 改为 `<span>`，保留样式
  - [x] 验证 Landing 页 Hero 中 `<h1>` 为页面唯一 H1

- [x] Task 3: 将 JSON-LD 结构化数据移至服务端 layout.tsx
  - [x] 在 layout.tsx 的 `<body>` 中直接插入 `<script type="application/ld+json">`（en + zh 双版本）
  - [x] 从 `LandingPage.tsx` 中移除 `softwareAppJsonLd` 和 `faqJsonLd` 的客户端注入逻辑
  - [x] 移除未使用的 `useMemo`、`locale` 解构、schema 导入

- [x] Task 4: 添加 canonical URL 到 metadata
  - [x] 在 `layout.tsx` 的 `generateMetadata()` 的 `alternates` 中添加 `canonical: SITE_URL`

- [x] Task 5: Landing 页内容改为服务端渲染
  - [x] 创建 `src/components/LandingContent.tsx`（服务端组件），用 `<noscript>` 包裹 How It Works、FAQ、About 英文内容
  - [x] LandingPage.tsx 导入并渲染 `LandingContent`
  - [x] 验证 `next build` 静态导出后，HTML 中包含完整文字内容

- [x] Task 6: Dashboard 视图添加隐藏 H1
  - [x] 在 `Dashboard.tsx` 的数据已加载分支中添加 `<h1 className="sr-only">` 显示应用标题

- [x] Task 7: OG 图片 WebP 格式备选
  - [x] 在 `generateMetadata()` 的 `openGraph.images` 中明确添加 `type: "image/png"`

- [x] Task 8: 清理 public/ 冗余文件
  - [x] 删除 `public/landing/notion_sketch_chart_light_old.png`
  - [x] 删除 `public/landing/notion_sketch_chart_dark_preview.png`
  - [x] 删除 `public/landing/notion_sketch_csv_dark_preview.png`

# Task Dependencies
- Task 3 依赖 Task 1、Task 2（无实际依赖，可并行）
- Task 4 与 Task 1-3 无依赖，可并行
- Task 5 需要先完成 Task 2（H1 层级确立后再拆分组件）
- Task 6 依赖 Task 2（统一 H1 策略）
- Task 7、Task 8 独立，可并行
