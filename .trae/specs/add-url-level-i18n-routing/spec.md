# URL 级 i18n 路由 Spec

## Why
当前项目的语言切换主要依赖客户端 `localStorage` 与浏览器语言检测，同一个 URL 只能输出一份静态 metadata。这导致中文页面虽然在客户端可切换，但浏览器标签标题、OpenGraph、Twitter 卡片和搜索引擎抓取结果无法稳定区分中英文版本。

## What Changes
- 为公开页面引入 URL 级语言路由：英文保留现有无前缀 URL，中文新增 `/zh/...` 镜像 URL
- 将语言来源调整为 URL 优先，客户端 `localStorage` 仅作为无语言路由下的回退策略或历史兼容
- 让 `generateMetadata()`、`alternates.languages`、`openGraph`、`twitter`、JSON-LD、`sitemap.xml` 与 `robots` 引用的页面集合按 URL 级 locale 输出
- 更新 `LanguageSwitcher`，切换语言时跳转到当前页面对应的另一语言 URL，而不是只改本地状态
- 为博客首页、博客文章页、作者页、落地页和法律页建立中英文可抓取的独立 URL
- 评估并处理现有内部链接、面包屑、页脚导航、分享入口和 canonical 的语言一致性

## Impact
- Affected specs: SEO metadata、多语言导航、sitemap、博客页 SEO、语言切换交互
- Affected code:
  - `src/app/layout.tsx`
  - `src/app/page.tsx` 及各公开路由 `page.tsx`
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/app/AppI18nShell.tsx`
  - `src/i18n/I18nProvider.tsx`
  - `src/components/LanguageSwitcher.tsx`
  - `src/components/TitleBar.tsx`
  - `src/components/FooterBar.tsx`
  - `src/components/BlogIndex.tsx`
  - `src/components/BlogArticlePage.tsx`
  - `src/components/BlogPostLayout.tsx`

## ADDED Requirements

### Requirement: 公开页面提供 URL 级双语入口
系统 SHALL 为所有公开可索引页面提供独立的中英文 URL。

#### Scenario: 访问英文页面
- **WHEN** 用户访问现有英文公开 URL（如 `/blog`、`/author`、`/guideline`）
- **THEN** 页面以英文内容、英文 metadata 和英文内部链接渲染

#### Scenario: 访问中文页面
- **WHEN** 用户访问对应的中文 URL（如 `/zh/blog`、`/zh/author`、`/zh/guideline`）
- **THEN** 页面以中文内容、中文 metadata 和中文内部链接渲染

### Requirement: URL 是语言的主来源
系统 SHALL 以当前 URL 中的 locale 作为页面语言的唯一主来源。

#### Scenario: 通过 URL 打开页面
- **WHEN** 用户直接打开某个带语言语义的页面 URL
- **THEN** 页面首屏渲染、`<html lang>`、翻译上下文和导航链接与该 URL 对应的 locale 保持一致

#### Scenario: 存在历史 localStorage 语言偏好
- **WHEN** 用户本地 `ds-locale` 与当前 URL locale 不一致
- **THEN** 页面仍以 URL locale 为准，并在必要时同步更新本地偏好

### Requirement: 语言切换器切换 URL
系统 SHALL 在语言切换时跳转到当前页面的另一语言等价 URL。

#### Scenario: 在博客文章页切换语言
- **WHEN** 用户位于 `/blog/deepseek-context-caching-guide` 并切换到中文
- **THEN** 跳转到 `/zh/blog/deepseek-context-caching-guide`
- **AND** 页面标题、正文、CTA、上一篇/下一篇链接与 metadata 同步为中文

#### Scenario: 在中文页切回英文
- **WHEN** 用户位于 `/zh/privacy` 并切换到英文
- **THEN** 跳转到 `/privacy`

### Requirement: metadata 按 URL locale 输出
系统 SHALL 为每个语言 URL 输出对应语言的 SEO metadata。

#### Scenario: 中文博客页 metadata
- **WHEN** 搜索引擎或社交平台抓取 `/zh/blog/deepseek-context-caching-guide`
- **THEN** `<title>`、`description`、`openGraph`、`twitter` 为中文
- **AND** `alternates.canonical` 指向该中文 URL
- **AND** `alternates.languages` 同时声明英文与中文对应 URL

#### Scenario: 英文博客页 metadata
- **WHEN** 搜索引擎或社交平台抓取 `/blog/deepseek-context-caching-guide`
- **THEN** `<title>`、`description`、`openGraph`、`twitter` 为英文
- **AND** `alternates.canonical` 指向该英文 URL

### Requirement: sitemap 包含双语 URL 集合
系统 SHALL 在站点地图中输出所有公开页面的中英文 URL。

#### Scenario: 生成 sitemap.xml
- **WHEN** 执行静态构建
- **THEN** `sitemap.xml` 同时包含英文无前缀 URL 和中文 `/zh/...` URL
- **AND** 不重复输出逻辑等价但路径相同的条目

### Requirement: 现有链接保持兼容
系统 SHALL 在不破坏现有英文外链的前提下引入中文路径。

#### Scenario: 旧英文链接继续可用
- **WHEN** 用户访问既有外部分享链接（如 `/blog` 或某篇英文文章）
- **THEN** 链接继续返回英文页面，不发生破坏性跳转

## MODIFIED Requirements

### Requirement: 客户端 i18n 初始化
系统当前通过浏览器语言和 `localStorage` 初始化 locale。修改后，系统 SHALL 优先从 URL 派生 locale，仅在无 URL 语义的上下文中使用历史偏好作为回退。

### Requirement: alternates.languages
系统当前在同一 URL 上声明 `en` 与 `zh`。修改后，系统 SHALL 在 `alternates.languages` 中分别指向英文无前缀 URL 与中文 `/zh/...` URL。

## REMOVED Requirements

### Requirement: 同一 URL 承载双语 SEO
**Reason**: 同一 URL 只能稳定输出一份静态 metadata，无法满足 URL 级多语言 SEO、社交分享卡片和可抓取标题的一致性要求。
**Migration**: 保留英文无前缀 URL 作为默认入口，新增中文 `/zh/...` 镜像 URL，并将语言切换和内部链接改为显式跳转对应路径。
