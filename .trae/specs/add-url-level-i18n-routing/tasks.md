# Tasks

* [x] Task 1: 明确 URL 级 i18n 路由范围与映射规则

  * [x] 盘点所有公开页面，确定英文无前缀 URL 与中文 `/zh/...` URL 的一一映射

  * [x] 明确不纳入本次 URL 级 i18n 的页面或状态，并记录兼容策略

  * [x] 定义从当前路径推导目标语言路径的统一规则，覆盖首页、普通页面、博客列表和博客详情

* [x] Task 2: 重构 i18n 上下文为 URL 驱动

  * [x] 调整 `AppI18nShell` / `I18nProvider`，让 locale 由当前路由提供

  * [x] 保留 `localStorage` 作为兼容同步，不再作为页面首屏语言主来源

  * [x] 确保 `<html lang>`、翻译上下文与当前 URL 首屏一致

* [x] Task 3: 建立中文镜像路由并复用现有页面组件

  * [x] 为首页、guideline、privacy、terms、changelog、author、3 个 SEO 落地页、blog 列表和 3 篇 blog 文章提供 `/zh/...` 路由

  * [x] 复用现有页面组件与内容源，避免复制业务逻辑

  * [x] 保证静态导出可生成全部语言路由

* [x] Task 4: 让导航与语言切换跳转到对应语言 URL

  * [x] 更新 `LanguageSwitcher`，切换时导航到当前页另一语言路径

  * [x] 更新 `TitleBar`、`FooterBar`、博客上下篇链接、返回首页/博客链接等内部链接，使其在当前语言下保持一致

  * [x] 验证英文页不会误跳到中文页，中文页不会回落到英文无前缀链接

* [x] Task 5: 按语言输出 metadata、canonical、alternates 与结构化数据

  * [x] 更新各公开路由 `generateMetadata()`，使 title、description、OG、Twitter 按 URL locale 输出

  * [x] 输出正确的 `canonical` 与 `alternates.languages`

  * [x] 检查与博客、作者页、法律页相关的 JSON-LD 是否需要按语言 URL 同步调整

* [x] Task 6: 更新 sitemap 与可抓取入口

  * [x] 让 `sitemap.xml` 同时输出英文和中文 URL 条目

  * [x] 校验 `robots.txt` 引用不需要额外变更，或补充必要说明

  * [x] 确认站内重要入口可以发现中文页面而不依赖客户端切换

* [x] Task 7: 完成验证并补充回归检查

  * 验收备注（2026-07-06）：已重新执行 `npm run lint` 与 `npm run build`，两者均通过；并复核 `TitleBar`、`out/index.html`、`out/blog.html`、`out/author.html`、`out/privacy.html`，确认英文页已恢复为当前 DeepSeek 仓库 GitHub 入口，且不再包含 Agnes 仓库 GitHub 链接。

  * [x] 对中英文首页、博客列表、至少 1 篇博客详情页做页面与 metadata 验证

  * [x] 运行静态检查与构建，确认静态导出成功

  * [x] 检查 sitemap、canonical、alternates、语言切换和关键内部链接是否符合 spec

* [x] Task 8: 修复最终构建阻塞并重新生成 URL 级 i18n 导出产物

  * [x] 修复 `src/app/**/page.tsx` 中不符合 Next.js 16 page entry 约束的额外命名导出，消除 `buildArticleCachingMetadata` 这类导出导致的类型检查失败

  * [x] 重新运行 `npm run build`，确保 `out/` 基于当前源码完整刷新

  * [x] 复核 `/zh/blog`、`/zh/blog/deepseek-context-caching-guide`、`/zh/author`、`/zh/privacy` 等中文页面导出结果，确认 title、canonical、alternates 与内部链接均指向中文 URL

  * [x] 复核 `out/sitemap.xml`，确认同时包含英文无前缀 URL 与中文 `/zh/...` URL

  * [x] 完成后重新执行 Task 7 的全部验收项

* [x] Task 9: 修复最终验收暴露的 URL 级 i18n 残留问题

  * [x] 修复 `/zh` 静态导出页的 `<html lang>` 仍为 `en` 的问题，确保中文镜像路由首屏输出正确语言属性

  * [x] 修复中文博客详情正文中的站内 CTA 仍指向英文 `/` 的问题，确保中文页关键内部链接保持 `/zh` 路径

  * [x] 修复 `/zh/blog/*` 镜像页沿用英文 BlogPosting JSON-LD 的问题，确保 `url`、`mainEntityOfPage`、`inLanguage` 与作者链接按中文 URL 输出

  * [x] 重新运行 `npm run build`，并复核 `/zh`、`/zh/blog` 与至少 1 篇 `/zh/blog/*` 导出结果

* [x] Task 10: 修复英文页 GitHub 入口兼容性回归

  * [x] 修复 `TitleBar` 中桌面端与移动端 GitHub 图标链接，确保其继续指向当前 DeepSeek 仓库而不是 Agnes 仓库

  * [x] 重新构建并抽查英文首页、博客页、作者页等导出产物，确认英文公开页 GitHub 外链恢复兼容

  * [x] 复验 `checklist.md` 中“现有英文外链与分享链接保持兼容”条目并回写结果

# Task Dependencies

* Task 2 依赖 Task 1

* Task 3 依赖 Task 1、Task 2

* Task 4 依赖 Task 2、Task 3

* Task 5 依赖 Task 3

* Task 6 依赖 Task 3、Task 5

* Task 7 依赖 Task 4、Task 5、Task 6

* Task 10 依赖 Task 7 的二次验收结论
