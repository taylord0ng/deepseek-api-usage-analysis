"use client";

/**
 * ChangelogPage — 更新日志页面
 *
 * 展示 DeepSeek API 用量分析仪表盘自 v0.1.0 以来的所有版本变更记录。
 * 采用与 PrivacyPage / TermsPage 一致的 Apple 极简风格：
 * - TitleBar + 返回首页 + 主内容区 + FooterBar
 * - 支持中英双语切换（通过 useTranslation hook）
 * - 支持浅色/深色双主题（CSS 变量驱动）
 * - 按版本号倒序排列，每个版本按类别（新增/改进/修复/依赖）分组展示
 */

import Link from "next/link";
import { useTranslation } from "@/i18n";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";
import { useMemo } from "react";

/* ================================================================== */
/*  更新日志数据结构                                                      */
/* ================================================================== */

/** 单条变更项（双语） */
interface ChangeItem {
  en: string;
  zh: string;
}

/** 单个版本的更新条目 */
interface VersionEntry {
  version: string;
  /** 版本日期（可选，如 "2026-06-17"） */
  date?: string;
  /** 新增功能 */
  added?: ChangeItem[];
  /** 改进优化 */
  improved?: ChangeItem[];
  /** 问题修复 */
  fixed?: ChangeItem[];
  /** 依赖变更 */
  dependencies?: ChangeItem[];
}

/* ================================================================== */
/*  完整更新日志数据（与 README 同步）                                      */
/* ================================================================== */

/** 所有版本的更新日志，按版本倒序排列 */
const CHANGELOG_DATA: VersionEntry[] = [
  {
    version: "v0.5.1",
    added: [
      {
        en: "Changelog page (/changelog) — a dedicated page showcasing the complete version history from v0.1.0 to v0.5.1, in Apple-minimalist bilingual design matching privacy/terms pages. Includes JSON-LD WebPage schema, independent SEO metadata (canonical, OpenGraph, Twitter), and version entries organized by category (Added/Improved/Fixed/Dependencies) with color-coded dots.",
        zh: "更新日志页面（/changelog）— 专属页面展示 v0.1.0 至 v0.5.1 的完整版本历史，采用与隐私政策/使用条款一致的 Apple 极简双语设计。包含 JSON-LD WebPage 结构化数据、独立 SEO 元数据（canonical、OpenGraph、Twitter），版本条目按类别（新增/改进/修复/依赖）以彩色圆点分组展示。",
      },
      {
        en: "TitleBar clock icon linking to the changelog page, alongside the existing guideline book icon.",
        zh: "TitleBar 时钟图标链接至更新日志页面，与现有操作手册书籍图标并列。",
      },
      {
        en: "LandingPage About section \"View Changelog →\" link below the social link pills.",
        zh: "落地页关于区域社交链接胶囊下方新增「查看更新日志 →」链接。",
      },
    ],
    improved: [
      {
        en: "TitleBar tooltips (User Guide, Changelog) now properly support i18n, displaying localized text in both English and Chinese.",
        zh: "TitleBar 悬浮提示（操作手册、更新日志）现正确支持多语言，中英文环境下显示对应本地化文本。",
      },
      {
        en: "Sitemap (sitemap.xml) expanded with /changelog entry (priority 0.5, monthly change frequency).",
        zh: "sitemap.xml 扩展，新增 /changelog 条目（优先级 0.5，月度更新频率）。",
      },
      {
        en: "Translation system extended with changelog.* group (en + zh).",
        zh: "翻译系统扩展，新增 changelog.* 分组（中英双语）。",
      },
    ],
  },
  {
    version: "v0.5.0",
    added: [
      {
        en: "ZIP file upload support — users can now drag DeepSeek platform ZIP exports directly into the dashboard. ZIP archives containing CSV files are automatically extracted and processed in-browser. Huge thanks to @taylord0ng for this contribution.",
        zh: "ZIP 文件上传支持 — 用户现可直接将 DeepSeek 平台导出的 ZIP 压缩包拖入仪表盘，内含的 CSV 文件将在浏览器端自动解压处理。感谢 @taylord0ng 贡献此功能。",
      },
      {
        en: "Custom project grouping for API keys — a new \"By Project\" tab lets you organize API keys into user-defined project groups via drag-and-drop, with per-project cost aggregation, token usage tracking, and cache hit rate analysis. Inspired by @taylord0ng.",
        zh: "自定义项目分组管理 API 密钥 — 新增「按项目」标签页，支持通过拖拽将 API 密钥归入用户自定义的项目分组，提供按项目汇总的费用、Token 用量追踪及缓存命中率分析。灵感来自 @taylord0ng。",
      },
      {
        en: "Project configuration modal — drag-and-drop interface for assigning keys to custom projects, with local persistence via localStorage, reset-to-default, empty-state prompts, keyboard-friendly operation, and dropdown menus for unassigned keys.",
        zh: "项目配置弹窗 — 拖拽式界面，可将密钥分配至自定义项目，支持 localStorage 本地持久化、一键重置、空状态提示、键盘友好操作以及未分配密钥的下拉菜单。",
      },
      {
        en: "Reusable CopyButton component — encapsulated clipboard copy logic with hover tooltip and i18n-aware success messages. All inline copy functionality (KeyView, ProjectView) now uses this shared component.",
        zh: "通用 CopyButton 组件 — 封装剪贴板复制逻辑，含悬浮提示和国际化成功消息。KeyView 和 ProjectView 中的所有复制功能现已统一使用此共享组件。",
      },
      {
        en: "One-click cost copy — copy total cost from the Overview hero number with a single click.",
        zh: "费用一键复制 — 点击总览 Hero 区域的总费用大数字即可一键复制。",
      },
      {
        en: "50MB per-file upload size limit — protects against accidental or malicious oversized file uploads that could freeze the browser. Includes user-facing warning prompts and a dedicated FAQ entry.",
        zh: "单文件 50MB 上传大小限制 — 防止意外或恶意超大文件导致浏览器卡死，包含用户可见的警告提示和专属 FAQ 条目。",
      },
    ],
    improved: [
      {
        en: "Upload validation — file size check with clear error messaging, duplicate project name validation with inline hints, and unsaved-changes confirmation dialog when closing the project config modal.",
        zh: "上传校验增强 — 文件大小检查并给出明确错误提示、项目名称重复校验及内联提示、关闭项目配置弹窗时的未保存修改确认对话框。",
      },
      {
        en: "Keyboard accessibility — full keyboard navigation support in the project configuration modal: Enter to confirm, Escape to close, arrow keys to navigate, plus on-screen keyboard shortcut hints.",
        zh: "键盘无障碍 — 项目配置弹窗支持完整键盘导航：Enter 确认、Escape 关闭、方向键浏览，同时提供界面上可见的快捷键提示。",
      },
      {
        en: "UI polish — fixed drag highlight state glitch in project key lists, resolved React key warnings in config lists, adjusted modal layout for better visual balance.",
        zh: "UI 细节优化 — 修复项目密钥列表中拖拽高亮状态异常、解决配置列表 React key 警告、调整弹窗布局以获得更好的视觉平衡。",
      },
      {
        en: "i18n coverage — all new UI elements (project view, copy button, upload limits, config modal) fully translated in both English and Chinese.",
        zh: "国际化覆盖 — 所有新增 UI 元素（项目视图、复制按钮、上传限制、配置弹窗）均已完善中英双语文案。",
      },
      {
        en: "Fixed CopyButton timer memory leak — timers now properly cleaned up on unmount, preventing stale state updates.",
        zh: "修复 CopyButton 定时器内存泄漏 — 组件卸载时正确清理定时器，避免过期状态更新。",
      },
      {
        en: "User guide and landing page — updated FAQ (new entries for file size limits and project grouping), usage guide screenshots and documentation, and landing page copy to reflect new features.",
        zh: "用户操作手册与落地页 — 更新 FAQ（新增文件大小限制与项目分组相关条目）、使用指南截图与文档、落地页文案以反映新增功能。",
      },
    ],
    dependencies: [
      {
        en: "Added `jszip` dependency for client-side ZIP extraction.",
        zh: "新增 `jszip` 依赖，用于浏览器端 ZIP 解压。",
      },
    ],
  },
  {
    version: "v0.4.0",
    added: [
      {
        en: "Privacy Policy page (/privacy) — bilingual (en/zh) legal content covering 7 sections, independent SEO metadata (canonical, OpenGraph, Twitter), JSON-LD WebPage schema, Apple-minimalist legal-text layout with GitHub source links for transparency verification.",
        zh: "隐私政策页面（/privacy）— 双语（中/英）法律内容，涵盖 7 个章节：不收集数据、本地处理、Google Analytics（可选启用）、第三方服务、安全性、政策变更、联系我们。独立 SEO 元数据，JSON-LD WebPage Schema，Apple 极简风格法律文本布局，附 GitHub 源码链接以供透明验证。",
      },
      {
        en: "Terms of Use page (/terms) — bilingual (en/zh) legal content covering 8 sections, independent SEO metadata and JSON-LD WebPage schema.",
        zh: "使用条款页面（/terms）— 双语（中/英）法律内容，涵盖 8 个章节：按现状提供、免责声明、与 DeepSeek 无关、用户数据与责任、开源许可（MIT License）、责任限制、条款变更、联系我们。独立 SEO 元数据和 JSON-LD WebPage Schema。",
      },
      {
        en: "MIT LICENSE file — added to the project root for open-source licensing clarity.",
        zh: "MIT LICENSE 文件 — 添加至项目根目录，明确开源许可协议。",
      },
      {
        en: "FooterBar now links to Privacy Policy and Terms of Use pages alongside Guideline, GitHub, and version.",
        zh: "FooterBar 现同时链接至隐私政策和使用条款页面，与操作手册、GitHub、版本号并列。",
      },
    ],
    improved: [
      {
        en: "sitemap.xml expanded to include /privacy and /terms entries (priority 0.5, monthly change frequency).",
        zh: "sitemap.xml 扩展，新增 /privacy 和 /terms 条目（优先级 0.5，月度更新频率）。",
      },
      {
        en: "Translation system extended with privacy.* (21 keys) and terms.* (22 keys) groups in both English and Chinese.",
        zh: "翻译系统扩展，新增 privacy.*（21 个键）和 terms.*（22 个键）分组，涵盖英文和中文。",
      },
      {
        en: "SEO metadata: NEXT_PUBLIC_SITE_URL now injected into privacy and terms page metadata generation.",
        zh: "SEO 元数据：NEXT_PUBLIC_SITE_URL 现注入至隐私政策和使用条款页面的元数据生成中。",
      },
    ],
  },
  {
    version: "v0.3.3",
    fixed: [
      {
        en: "Cache hit rate chart accumulation bug in TrendsView: daily ratios were incorrectly summed instead of computing hit/(hit+miss) from raw token totals, causing values to potentially exceed 100%.",
        zh: "修复 TrendsView 中缓存命中率图表数据累加错误：每日比例值被错误累加，现已改为按原始 token 数量先累加再计算 hit/(hit+miss)，避免数值超过 100%。",
      },
    ],
    added: [
      {
        en: "Cache hit rate percentage display on the hits-vs-misses stacked bar chart in CacheView: hit rate shown in tooltip and as labels on top of each key's bar.",
        zh: "CacheView 的 hitsVsMisses 堆叠柱状图新增缓存命中率显示：tooltip 中展示百分比，柱状图顶部显示各 Key 的命中率标签。",
      },
      {
        en: "vercel.json with production security headers (CSP, HSTS, X-Frame-Options, etc.) and optimized static asset caching rules.",
        zh: "新增 vercel.json，配置生产环境安全头（CSP、HSTS、X-Frame-Options 等）和静态资源缓存优化规则。",
      },
    ],
  },
  {
    version: "v0.3.2",
    added: [
      {
        en: "User Guide page (/guideline) — comprehensive usage documentation covering dashboard overview, CSV export, data upload, chart interpretation, and troubleshooting; bilingual (en/zh) with annotated screenshots.",
        zh: "用户操作手册页面（/guideline）— 涵盖仪表盘总览、CSV 导出、数据上传、图表解读、故障排查的全面使用文档，双语（中/英）配标注截图。",
      },
      {
        en: "Guideline navigation links in TitleBar (book icon), FooterBar (text link), and LandingPage (below How It Works section).",
        zh: "操作手册导航入口：TitleBar（书籍图标）、FooterBar（文字链接）、LandingPage（使用说明区域下方）。",
      },
      {
        en: "3 new FAQ entries (Q5–Q7): \"Why does my cost show as $0?\", \"What does Incomplete Upload mean?\", and \"Where can I find more troubleshooting help?\".",
        zh: "3 个新增常见问题（Q5–Q7）：「为什么费用显示为 0？」「显示\"上传不完整\"是什么意思？」「哪里可以找到更多故障排查帮助？」",
      },
      {
        en: "Dashboard overview screenshot and logo in README files (en + zh).",
        zh: "README 文件中添加仪表盘总览截图和 Logo（中英文版）。",
      },
    ],
    improved: [
      {
        en: "SEO: added /guideline to sitemap.xml.",
        zh: "SEO：在 sitemap.xml 中新增 /guideline 条目。",
      },
      {
        en: "JSON-LD FAQPage schema expanded with Q5–Q7 entries (bilingual).",
        zh: "JSON-LD FAQPage Schema 扩充 Q5–Q7 条目（双语）。",
      },
      {
        en: "Added /docs/ to .gitignore.",
        zh: "在 .gitignore 中新增 /docs/。",
      },
    ],
  },
  {
    version: "v0.3.1",
    added: [
      {
        en: "JSON-LD BreadcrumbList schema (bilingual en/zh) for better search engine understanding of site structure.",
        zh: "JSON-LD BreadcrumbList 面包屑 Schema（中英文双语），帮助搜索引擎理解页面在站点中的位置。",
      },
    ],
    improved: [
      {
        en: "SEO: extended Chinese meta.description with privacy and team info (~100 characters, up from ~37).",
        zh: "SEO：扩展中文 meta.description，融入隐私说明和团队信息（约 100 字符，原 37 字符）。",
      },
      {
        en: "SEO: added alternateLocale: [\"zh_CN\"] to OpenGraph metadata, complementing existing hreflang alternates.",
        zh: "SEO：OpenGraph 元数据新增 alternateLocale: [\"zh_CN\"]，与 hreflang 语言标注相呼应。",
      },
      {
        en: "SEO: added id attributes to landing page sections (#how-it-works, #faq, #about) for direct anchor linking.",
        zh: "SEO：为落地页板块添加 id 属性（#how-it-works、#faq、#about），支持页面内锚点链接。",
      },
      {
        en: "JSON-LD: added version field to SoftwareApplication schema.",
        zh: "JSON-LD：SoftwareApplication Schema 新增 version 字段。",
      },
      {
        en: "Performance: added content-visibility: auto to below-the-fold landing page sections (How It Works, FAQ, About) to reduce initial render cost.",
        zh: "性能：为折叠区域下方的落地页板块（使用说明、常见问题、关于）添加 content-visibility: auto，减少初始渲染开销。",
      },
    ],
  },
  {
    version: "v0.3.0",
    added: [
      {
        en: "Rebuilt About section: expanded from a single paragraph into 4 themed subsections — Why We Built This, Under the Hood: Privacy & Tech, About MindRose, and Let's Work Together — each separated by dashed <hr> dividers.",
        zh: "重构关于板块：从单一简介扩展为 4 个主题子板块 — 为什么开发这个工具、极致的隐私与技术架构、关于 MindRose、商业合作 — 各板块以虚线 <hr> 分割。",
      },
      {
        en: "Email copy button in the Contact area: one-click clipboard copy with textarea fallback, anti-scraping dynamic address concatenation, and SVG checkmark copy feedback with 2s toast.",
        zh: "联系方式区域新增邮箱复制按钮：一键复制到剪贴板，反爬虫动态拼接邮箱地址，SVG 对勾复制反馈 + 2 秒提示。",
      },
      {
        en: "Social link pills: GitHub repository, Gavin's LinkedIn, and MindRose website — each with themed SVG icons, rounded borders, and hover background.",
        zh: "社交链接胶囊：GitHub 仓库、Gavin 的 LinkedIn、MindRose 官网 — 各含主题 SVG 图标、圆角边框和 hover 背景。",
      },
    ],
    improved: [
      {
        en: "Landing page sections now separated by thin horizontal <hr> dividers for clearer visual hierarchy.",
        zh: "落地页各板块之间新增水平 <hr> 分割线，视觉层次更清晰。",
      },
      {
        en: "Added 14 new landing.* translation keys (en + zh) for all About sub-sections.",
        zh: "为所有关于子板块新增 14 个 landing.* 翻译键（中英文）。",
      },
      {
        en: "Rebranded site title to \"DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team\" across metadata, JSON-LD schema, footer, and translations.",
        zh: "站点标题更新为 \"DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team\"，同步更新元数据、JSON-LD Schema、页脚和翻译文案。",
      },
      {
        en: "Fixed landing page heading hierarchy: section titles upgraded from <h3> to <h2>, sub-section titles from <h4> to <h3>.",
        zh: "修复落地页标题层级：板块标题从 <h3> 升级为 <h2>，子板块标题从 <h4> 升级为 <h3>。",
      },
    ],
  },
  {
    version: "v0.2.3",
    added: [
      {
        en: "Full-site SEO: generateMetadata() with canonical URLs, OpenGraph, Twitter cards, and hreflang alternates.",
        zh: "全站 SEO 优化：generateMetadata() 动态元数据（规范 URL、OpenGraph、Twitter 卡片、hreflang 语言标注）。",
      },
      {
        en: "JSON-LD structured data: bilingual SoftwareApplication + FAQPage schemas (via src/lib/schema.ts).",
        zh: "JSON-LD 结构化数据：双语 SoftwareApplication + FAQPage Schema（通过 src/lib/schema.ts 生成）。",
      },
      {
        en: "robots.txt and sitemap.xml generation at build time (via src/app/robots.ts and src/app/sitemap.ts).",
        zh: "构建时 robots.txt 和 sitemap.xml 生成（通过 src/app/robots.ts 和 src/app/sitemap.ts）。",
      },
      {
        en: "<noscript> crawler fallback content (LandingContent.tsx) for search engines that don't execute JavaScript.",
        zh: "<noscript> 爬虫回退内容（LandingContent.tsx），确保不执行 JavaScript 的搜索引擎也能抓取落地页文字。",
      },
      {
        en: "Theme-aware landing page background images — CSV and chart themed sketches that swap with light/dark mode.",
        zh: "落地页主题感知背景图片 — CSV 和图表主题素描图，随浅色/深色模式切换。",
      },
      {
        en: "Semantic hidden H1 on dashboard view for screen readers and SEO.",
        zh: "仪表盘视图新增语义化隐藏 H1，便于屏幕阅读器和搜索引擎读取。",
      },
    ],
    improved: [
      {
        en: "layout.tsx upgraded to generateMetadata() for dynamic build-time SEO injection.",
        zh: "layout.tsx 升级为 generateMetadata()，实现构建时动态 SEO 注入。",
      },
      {
        en: "FooterBar.tsx extracted as standalone component with animate and sectionRef props.",
        zh: "FooterBar.tsx 提取为独立组件，支持 animate 和 sectionRef 属性。",
      },
      {
        en: "TitleBar.tsx extracted as standalone component with logo, GitHub icon, and unified layout.",
        zh: "TitleBar.tsx 提取为独立组件，包含 Logo、GitHub 图标和统一布局。",
      },
      {
        en: "Added warning translation group (date mismatch, no cost match, partial cache data, schema drift).",
        zh: "新增 warning 翻译分组（日期不匹配、缺少费用数据、缓存数据不完整、数据结构不一致）。",
      },
    ],
  },
  {
    version: "v0.2.2",
    added: [
      {
        en: "Logo icon and favicon.ico — added brand identity assets to TitleBar and browser tab.",
        zh: "新增 Logo 图标和 favicon.ico 文件 — 在 TitleBar 和浏览器标签页中展示品牌标识。",
      },
      {
        en: "Replaced default English font with local Hubot Sans WOFF2 files (3 weights: 400/500/700).",
        zh: "替换项目英文默认字体为本地 Hubot Sans WOFF2 文件（3 个字重：400/500/700）。",
      },
    ],
    improved: [
      {
        en: "Redesigned LanguageSwitcher as Apple-style pill segmented control with role=\"radio\" accessibility.",
        zh: "重新设计语言切换器为 Apple 风格胶囊分段控件，支持 role=\"radio\" 无障碍属性。",
      },
      {
        en: "Redesigned ThemeSwitcher as SVG sun/moon icon button with hover background.",
        zh: "重新设计主题切换器为 SVG 太阳/月亮图标按钮，hover 时显示圆形背景。",
      },
      {
        en: "Added GitHub icon link to TitleBar for quick repository access.",
        zh: "TitleBar 新增 GitHub 图标链接，方便快速访问代码仓库。",
      },
      {
        en: "FooterBar now displays app version number alongside copyright and GitHub link.",
        zh: "FooterBar 新增版本号显示，与版权信息和 GitHub 链接并列。",
      },
      {
        en: "Landing page content container widened from max-w-3xl to max-w-6xl for better visual balance.",
        zh: "Landing 页面内容容器从 max-w-3xl 扩宽至 max-w-6xl，视觉更平衡。",
      },
      {
        en: "Added scroll-reveal fade-in + slide-up animations on landing page sections via Intersection Observer.",
        zh: "Landing 页面新增滚动渐显动画（Intersection Observer 驱动的淡入 + 上滑效果）。",
      },
      {
        en: "Added accordion expand/collapse animation for the QA section.",
        zh: "常见问题区域新增手风琴展开/折叠动画。",
      },
      {
        en: "Added global accessibility styles: smooth scrolling, prefers-reduced-motion support, color-scheme for native UI, focus-visible outlines.",
        zh: "添加全局无障碍样式：平滑滚动、prefers-reduced-motion 适配、color-scheme 原生 UI、focus-visible 焦点轮廓。",
      },
    ],
  },
  {
    version: "v0.2.1",
    added: [
      {
        en: "Landing page — built a complete pre-upload landing page with Hero, upload area, How It Works steps, FAQ, and About sections.",
        zh: "构建完整的上传前落地页，包含 Hero 区、上传区、使用说明、常见问题和关于等模块。",
      },
    ],
  },
  {
    version: "v0.2.0",
    added: [
      {
        en: "Full light/dark theme switching — refactored global CSS with custom properties for unified dual-theme color management.",
        zh: "实现完整的明暗主题切换功能，重构全局 CSS 样式，使用 CSS 变量统一管理双主题配色。",
      },
      {
        en: "Model filter — added Apple-style segmented capsule filter in Dashboard, optimized UI and data presentation.",
        zh: "新增模型筛选功能，在 Dashboard 添加 Apple 风格分段胶囊过滤器，优化 UI 与数据展示。",
      },
    ],
    improved: [
      {
        en: "Refined overall UI interactions and visual styling.",
        zh: "优化整体 UI 交互与视觉样式。",
      },
      {
        en: "Refactored all view components to render from filtered data; added Hero big-number summary sections at the top of each view.",
        zh: "重构所有视图组件，改用过滤后的数据渲染，新增顶部 Hero 大数字汇总模块。",
      },
    ],
  },
  {
    version: "v0.1.0",
    added: [
      {
        en: "Built the DeepSeek API usage analytics dashboard — implemented CSV parsing, multi-month file concatenation, and error validation logic; all data processing runs purely in the browser.",
        zh: "搭建 DeepSeek API 使用分析仪表盘，实现 CSV 解析、多月份文件合并与错误校验逻辑，所有数据处理均在浏览器端完成。",
      },
      {
        en: "Developed drag-and-drop upload component, data context layer, and multi-dimensional visualization dashboard.",
        zh: "开发拖拽上传组件、数据上下文与多维度可视化仪表盘页面。",
      },
      {
        en: "Added full i18n support with language switching, and refactored numeric formatting utilities to adapt unit display rules for different locales.",
        zh: "新增完整多语言支持与语言切换功能，并重构数值格式化工具函数，适配不同语言的单位展示规则。",
      },
    ],
  },
];

/* ================================================================== */
/*  ChangelogPage 组件                                                 */
/* ================================================================== */

/**
 * 更新日志页面
 *
 * Apple 极简风格 — 按版本倒序展示所有变更记录。
 * 每个版本以 h2 标题呈现，变更项按类别（新增/改进/修复/依赖）分组列出。
 * 顶部标题栏带版本号和日期，底部有 GitHub 链接和 FooterBar。
 */
export function ChangelogPage() {
  const { locale, t } = useTranslation();

  /** 判断当前是否为中文环境 */
  const isZh = locale === "zh";

  /** JSON-LD 结构化数据 */
  const changelogJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: isZh
        ? "更新日志 — DeepSeek API 用量分析仪表盘"
        : "Changelog — DeepSeek API Usage Analytics Dashboard",
      description: isZh
        ? "DeepSeek API 用量分析仪表盘完整更新日志。追踪自 v0.1.0 以来的所有新增功能、改进优化、问题修复和依赖变更。"
        : "Complete changelog for the DeepSeek API Usage Analytics Dashboard. Track all new features, improvements, bug fixes, and dependency changes since v0.1.0.",
      about: {
        "@type": "Thing",
        name: isZh ? "更新日志" : "Changelog",
      },
      isPartOf: {
        "@type": "WebSite",
        name: "DeepSeek API Usage Analytics Dashboard",
        url: "https://deepseek-usage.xyz",
      },
    };
  }, [isZh]);

  /**
   * 根据当前 locale 获取变更项文本
   *
   * @param item - 双语变更项
   * @returns 对应语言的文本
   */
  function getText(item: ChangeItem): string {
    return isZh ? item.zh : item.en;
  }

  /** 变更类别标签与对应的数据字段名 */
  type CategoryKey = "added" | "improved" | "fixed" | "dependencies";

  const categories: { key: CategoryKey; label: string; dotColor: string }[] = [
    { key: "added", label: t.changelog.added, dotColor: "#34C759" },
    { key: "improved", label: t.changelog.improved, dotColor: "#007AFF" },
    { key: "fixed", label: t.changelog.fixed, dotColor: "#FF9500" },
    {
      key: "dependencies",
      label: t.changelog.dependencies,
      dotColor: "#AF52DE",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(changelogJsonLd),
        }}
      />
      <TitleBar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* 返回首页 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 mb-8 hover:opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t.changelog.backToHome}
        </Link>

        {/* 页面标题 */}
        <h1
          className="text-2xl font-bold tracking-tight mb-2"
          style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
          }}
          translate="no"
        >
          {t.changelog.pageTitle}
        </h1>

        {/* 最后更新时间 */}
        <p className="text-xs mb-10" style={{ color: "var(--text-tertiary)" }}>
          {t.changelog.lastUpdated}
        </p>

        {/* 引言 */}
        <p
          className="text-sm leading-relaxed mb-12 text-pretty"
          style={{ color: "var(--text-secondary)" }}
        >
          {t.changelog.intro}
        </p>

        {/* 各版本变更 */}
        {CHANGELOG_DATA.map((entry) => (
          <section key={entry.version} className="mb-12">
            {/* 版本标题 */}
            <h2
              className="text-lg font-bold mb-1"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {entry.version}
            </h2>

            {/* 版本日期 */}
            {entry.date && (
              <p
                className="text-xs mb-5"
                style={{ color: "var(--text-tertiary)" }}
              >
                {entry.date}
              </p>
            )}

            {/* 各变更类别 */}
            {categories.map((cat) => {
              const items = entry[cat.key];
              return (
                items &&
                items.length > 0 && (
                  <div key={cat.key} className="mb-5">
                    {/* 类别标签 */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.dotColor }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {cat.label}
                      </span>
                    </div>

                    {/* 变更项列表 */}
                    <ul className="space-y-1.5 pl-4">
                      {items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm leading-relaxed text-pretty"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {getText(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              );
            })}

            {/* 版本间分割线 */}
            <hr
              className="mt-8"
              style={{ borderColor: "var(--border)" }}
            />
          </section>
        ))}

        {/* 底部 GitHub 链接和 FooterBar */}
        <hr className="my-10" style={{ borderColor: "var(--border)" }} />

        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          <a
            href="https://github.com/GavinCnod/deepseek-api-usage-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.changelog.githubLabel}
          </a>
        </p>
      </div>

      <FooterBar />
    </div>
  );
}
