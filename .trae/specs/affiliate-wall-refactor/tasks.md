# Tasks

- [x] Task 1: 重构 `src/lib/affiliates.ts`
  - [x] SubTask 1.1: 定义 `AffiliateItem` 接口，包含 `id`, `name`, `url`, `description` (双语), `commission` (双语), `condition` (双语), `category`, `isActive`, `rel` 等字段。
  - [x] SubTask 1.2: 将所有单独导出的 affiliate 对象和 `recommendedTools` 合并为一个统一的 `affiliatesRegistry` 数组或 Record 映射，并为每个项目分配唯一的 `id`（如 `portkey`, `vultr`, `aliyun-bailian` 等），设置 `isActive: true`。
  - [x] SubTask 1.3: 导出一个辅助函数 `getAffiliatesByIds(ids: string[])` 用于快速筛选活跃的推荐项目。

- [x] Task 2: 创建 `AffiliateWall.tsx` 组件
  - [x] SubTask 2.1: 在 `src/components/` 下创建 `AffiliateWall.tsx`。
  - [x] SubTask 2.2: 组件接收 `ids: string[]` 参数，调用 `getAffiliatesByIds` 获取数据。
  - [x] SubTask 2.3: 实现卡片式布局渲染，展示工具名称、双语描述/说明，并附带正确的跳转链接和 `rel` 属性。集成事件追踪（如 `trackOutboundClick`）。

- [x] Task 3: 更新现有页面以使用新架构
  - [x] SubTask 3.1: 更新 `CostTrackerPage.tsx`，移除对旧 `recommendedTools` 的引用，改为使用 `<AffiliateWall ids={["portkey", "helicone"]} />` 渲染商业化推荐模块。
  - [x] SubTask 3.2: 更新 `PricingCalculatorPage.tsx`，通过 `affiliatesRegistry` 或获取函数根据 ID (`vultr`) 提取 Vultr 链接，替换原有的 `vultrAffiliate` 引用。

- [x] Task 4: 验证与测试
  - [x] SubTask 4.1: 运行 `npm run lint` 确保没有类型错误。
  - [x] SubTask 4.2: 运行 `npm run build` 确保静态导出成功。

# Task Dependencies
- Task 2 依赖 Task 1。
- Task 3 依赖 Task 1 和 Task 2。
- Task 4 依赖所有代码修改完成。
