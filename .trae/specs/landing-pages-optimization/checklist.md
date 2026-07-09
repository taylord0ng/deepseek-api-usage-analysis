# Checklist

- [x] `CostTrackerPage.tsx` 使用了 `src/lib/affiliates.ts` 中的推荐工具链接，而不是硬编码。
- [x] `PricingCalculatorPage.tsx` 使用了 `src/lib/affiliates.ts` 中的 Vultr 联盟链接，而不是硬编码。
- [x] `PricingCalculatorPage.tsx` 中的 `<label>` 正确使用了 `htmlFor` 绑定了 `<input>` 的 `id`，改善了无障碍访问。
- [x] `PricingCalculatorPage.tsx` 的交互计算器区域拥有合理的 `<h2>` 层级标题，修复了大纲断层。
- [x] `CostTrackerPage.tsx` 包含了指向缓存分析页面（`/deepseek-cache-hit-rate-analyzer`）的内部链接。
- [x] `CacheAnalyzerPage.tsx` 包含了指向缓存博客文章的内部链接。
- [x] `PricingCalculatorPage.tsx` 包含了指向价格对比博客文章的内部链接。
- [x] 成功创建 `CostTrackerContent.tsx`，并在 `CostTrackerPage.tsx` 中通过 `<noscript>` 引入。
- [x] 成功创建 `PricingCalculatorContent.tsx`，并在 `PricingCalculatorPage.tsx` 中通过 `<noscript>` 引入。
- [x] 成功创建 `CacheAnalyzerContent.tsx`，并在 `CacheAnalyzerPage.tsx` 中通过 `<noscript>` 引入。
- [x] `src/lib/schema.ts` 中新增了生成这三个页面专属 JSON-LD 的函数。
- [x] `CostTrackerPage.tsx`、`PricingCalculatorPage.tsx`、`CacheAnalyzerPage.tsx` 各自成功注入了专属的 JSON-LD 结构化数据。
