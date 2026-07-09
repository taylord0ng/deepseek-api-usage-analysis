# Checklist

- [x] `src/lib/affiliates.ts` 成功重构为统一的 `affiliatesRegistry`，每个项目均拥有唯一 `id` 和 `isActive` 状态。
- [x] 成功创建 `src/components/AffiliateWall.tsx` 组件，并支持通过 `ids` 数组渲染对应的联盟卡片。
- [x] `CostTrackerPage.tsx` 成功使用 `AffiliateWall` 组件替换了原有的工具循环渲染逻辑。
- [x] `PricingCalculatorPage.tsx` 成功适配了新的注册表结构来获取 Vultr 链接。
- [x] 所有关联页面的外部链接依然保留了正确的 `rel="sponsored nofollow"` 或 `rel="noopener noreferrer"` 属性。
- [x] 外部点击追踪（`trackOutboundClick`）在重构后依然正常工作。
- [x] `npm run lint` 无报错。
- [x] `npm run build` 成功。
