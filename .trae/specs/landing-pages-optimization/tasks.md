# Tasks

- [x] Task 1: 集中管理联盟链接
  - [x] SubTask 1.1: 在 `CostTrackerPage.tsx` 中引入 `recommendedTools`（Portkey, Helicone）替代硬编码
  - [x] SubTask 1.2: 在 `PricingCalculatorPage.tsx` 中引入 `vultrAffiliate` 替代硬编码

- [x] Task 2: 修复表单 a11y 与大纲层级
  - [x] SubTask 2.1: 在 `PricingCalculatorPage.tsx` 中为三个 `input[type="range"]` 添加 `id`，并使用 `htmlFor` 绑定对应的 `<label>`
  - [x] SubTask 2.2: 在 `PricingCalculatorPage.tsx` 的交互计算器区域添加 `<h2>` 标题（可使用 `sr-only` 或可见样式）完善大纲

- [x] Task 3: 增加内部交叉链接 (Internal Linking)
  - [x] SubTask 3.1: 在 `CostTrackerPage.tsx` 提及缓存处添加指向 `/deepseek-cache-hit-rate-analyzer` 的链接
  - [x] SubTask 3.2: 在 `CacheAnalyzerPage.tsx` 优化策略区添加指向博客文章 `/blog/deepseek-context-caching-guide` 的内链
  - [x] SubTask 3.3: 在 `PricingCalculatorPage.tsx` 竞品对比区添加指向博客文章 `/blog/openai-vs-deepseek-cost-comparison` 的内链

- [x] Task 4: 创建 `<noscript>` SSR 爬虫托底组件
  - [x] SubTask 4.1: 创建 `CostTrackerContent.tsx`，渲染 FAQ 等文本内容
  - [x] SubTask 4.2: 创建 `PricingCalculatorContent.tsx`，渲染计费模型等文本内容
  - [x] SubTask 4.3: 创建 `CacheAnalyzerContent.tsx`，渲染缓存机制等文本内容
  - [x] SubTask 4.4: 在对应的 Page 组件中引入并使用 `<noscript>` 包裹这些 Content 组件

- [x] Task 5: 添加页面专属 JSON-LD 结构化数据
  - [x] SubTask 5.1: 在 `src/lib/schema.ts` 中新增为这三个页面生成专属 JSON-LD 的函数（例如 FAQPage、SoftwareApplication 等）
  - [x] SubTask 5.2: 在各页面组件中调用生成函数并注入 `<script type="application/ld+json">`

# Task Dependencies
- Task 4 依赖对应的页面组件的内容提取。
- Task 5 依赖 `src/lib/schema.ts` 的扩展。
- 各个任务可相对独立并行执行。
