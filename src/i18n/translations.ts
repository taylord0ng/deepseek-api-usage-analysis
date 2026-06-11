/**
 * All UI strings used in the app. Each key must have both en and zh values.
 * For interpolated values, use `{key}` placeholders (e.g., "{{count}} model(s)").
 */
const translations = {
  en: {
    app: {
      title: "DeepSeek API Usage Analytics",
      subtitle: "Drop your monthly CSV exports to see usage analytics",
    },
    tabs: {
      overview: "Overview",
      keys: "By Key",
      cache: "Cache",
      trends: "Trends",
    },
    header: {
      loadDifferent: "Load different files",
      clear: "Clear",
    },
    footer: {
      text: "DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team · Data processed locally in your browser · ",
      version: "Version",
    },
    dropzone: {
      processing: "Processing CSVs\u2026",
      title: "Drop your DeepSeek CSVs here or click to upload",
      hint: "Drop one or more months — amount-*.csv + cost-*.csv pairs",
      privacy:
        "Multiple months are auto-merged · Files stay in your browser — nothing is uploaded",
    },
    kpi: {
      totalCost: "Total Cost",
      totalTokens: "Total Tokens",
      cacheHitRate: "Cache Hit Rate",
      activeKeys: "Active API Keys",
      saved: "{tokens} saved",
      models: "{count} model(s)",
    },
    overview: {
      dailyCost: "Daily Cost",
      costByKey: "Cost by API Key",
    },
    trends: {
      dailyCost: "Daily Cost",
      dailyTokens: "Daily Tokens",
      cacheHitRate: "Cache Hit Rate",
      requestCount: "Request Count",
      heroSubtitle: "Over {days} days",
    },
    cache: {
      hitRateTitle: "Cache Hit Rate",
      servedFromCache: "{tokens} input tokens served from cache",
      dailyHitRate: "Daily Cache Hit Rate",
      hitsVsMisses: "Cache Hits vs Misses by Key",
      noCacheTitle: "No cache usage detected",
      noCacheHint:
        "Enable prompt caching on your DeepSeek API calls to reduce costs.",
      hits: "Cache Hits",
      misses: "Cache Misses",
    },
    keys: {
      title: "Per-Key Breakdown",
      apiKeyName: "API Key Name",
      tokens: "Tokens",
      cost: "Cost",
      cacheHit: "Cache Hit",
      requests: "Requests",
      heroSubtitle: "{keys} key(s) · {models} model(s)",
    },
    error: {
      missingColumns: "CSV schema not recognized",
      malformedRow: "CSV parse error",
      emptyFile: "Empty file",
      incompleteUpload: "Incomplete upload",
      row: "Row",
      column: "Column",
    },
    warning: {
      dateMismatch: "Date mismatch",
      noCostMatch: "No cost data",
      partialCacheData: "Partial cache data",
      schemaDrift: "Schema drift",
    },
    meta: {
      title: "DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team",
      description:
        "Visualize your DeepSeek API usage — drop your monthly CSVs and get instant cost analytics, cache analysis, and per-key breakdowns. Free, open source, browser-side.",
    },
    langSwitcher: {
      label: "Language",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
    },
    modelFilter: {
      allModels: "All Models",
    },
    guideline: {
      pageTitle: "User Guide",
      backToHome: "Back to Home",
      viewGuide: "View Full Guide →",
      toc: "Table of Contents",
      footerNote:
        "This document is updated with app releases. For questions or suggestions, please reach out via {githubLink}.",
    },
    landing: {
      howItWorksTitle: "How It Works",
      howItWorksStep1Title: "1. Export CSV",
      howItWorksStep1Desc:
        "Go to DeepSeek Platform → Usage → Export monthly CSVs. You'll get amount and cost files for each month.",
      howItWorksStep2Title: "2. Drag & Drop",
      howItWorksStep2Desc:
        "Drag all your CSV files onto this page. Multiple months are automatically paired and merged.",
      howItWorksStep3Title: "3. View Analytics",
      howItWorksStep3Desc:
        "Instantly see cost charts, per-key breakdowns, cache hit analysis, and usage trends — all processed locally in your browser.",
      qaTitle: "Frequently Asked Questions",
      qaQ1: "Is my data uploaded to any server?",
      qaA1: "No. All CSV parsing and cost computation runs entirely in your browser. Your data never leaves your device.",
      qaQ2: "What CSV files do I need?",
      qaA2: "You need the amount-*.csv and cost-*.csv files exported from the DeepSeek Platform billing page. Drag at least one pair to get started.",
      qaQ3: "Can I analyze multiple months at once?",
      qaA3: "Yes. Drag all your monthly CSV files at once — they will be automatically paired by filename and concatenated.",
      qaQ4: "What models are supported?",
      qaA4: "Any model listed in your DeepSeek exports. The dashboard auto-detects all models and provides a filter to view them individually or combined.",
      qaQ5: "Why does my cost show as $0?",
      qaA5: "You need to upload both the amount CSV and the cost CSV for the same month. If either file is missing, cost data cannot be calculated.",
      qaQ6: "What does \"Incomplete Upload\" mean?",
      qaA6: "It means a month has only the amount file or only the cost file — not both. Add the missing file and re-upload to resolve this.",
      qaQ7: "Where can I find more troubleshooting help?",
      qaA7: "Check the Troubleshooting section in our full User Guide. It covers common issues like CSV format errors, cache configuration, file naming conventions, and more.",
      aboutSectionTitle: "About",
      aboutWhyTitle: "Why We Built This",
      aboutWhyDesc:
        "As our DeepSeek API calls surged, we found the official CSV billing exports nearly impossible to read at a glance. To answer questions like \"which project consumed the most tokens?\" and \"what is our real cache hit rate?\", we built our own simple, intuitive, and absolutely secure visualization dashboard.",
      aboutPrivacyTitle: "Under the Hood: Privacy & Tech",
      aboutPrivacyDesc:
        "When handling billing data, privacy is non-negotiable. That's why we chose a pure frontend architecture. Built with Next.js 16 (App Router) and React 19, powered by Papa Parse and ECharts, all CSV parsing and chart rendering happens 100% locally in your browser. No backend server, no database — your data never leaves your device. With Apple-inspired minimalist design and CSS custom property-driven dual themes, we aim to deliver the most elegant data analytics experience.",
      aboutMindRoseTitle: "About MindRose",
      aboutMindRoseDesc:
        "This project is open-sourced by Gavin Chen and the MindRose team. MindRose is a tech team focused on delivering lightweight digital solutions for small and medium manufacturers, logistics companies, and cross-border traders. We don't sell vague \"digital transformation\" concepts — we use AI and full-stack agile development (Next.js, React, Mendix, etc.) to deliver applications that solve real business pain points within weeks. From SEO-optimized independent e-commerce sites, to agile internal system builds, to AI agent workflow integration — we understand tech, and more importantly, we understand your business.",
      aboutContactTitle: "Let's Work Together",
      aboutContactDesc:
        "Looking to build a custom data dashboard for your business? Need deep AI integration into your workflows? Want modern, elegant UI/UX? Need cross-department, multi-terminal business systems? Or interested in collaborating on this open-source project?",
      aboutContactService:
        "We offer professional bottleneck diagnosis, transformation analysis, tailored business solutions, and AI-powered development and operations.",
      aboutContactCTA: "Get in touch:",
      aboutGitHubLabel: "Project GitHub Repo",
      aboutLinkedInLabel: "Gavin's LinkedIn",
      aboutMindRoseLabel: "MindRose Team",
    },
  },

  zh: {
    app: {
      title: "DeepSeek API 用量分析",
      subtitle: "拖拽月度 CSV 文件即可查看用量分析",
    },
    tabs: {
      overview: "总览",
      keys: "按 Key",
      cache: "缓存",
      trends: "趋势",
    },
    header: {
      loadDifferent: "加载其他文件",
      clear: "清除",
    },
    footer: {
      text: "DeepSeek API 用量分析仪表盘 · 数据仅在浏览器本地处理 · ",
      version: "版本",
    },
    dropzone: {
      processing: "正在处理 CSV\u2026",
      title: "拖拽 DeepSeek CSV 文件到此处或点击上传",
      hint: "拖拽一个或多个月份 — amount-*.csv + cost-*.csv 文件对",
      privacy: "多月份自动合并 · 文件仅存储在浏览器中 — 不会上传",
    },
    kpi: {
      totalCost: "总费用",
      totalTokens: "总 Token 数",
      cacheHitRate: "缓存命中率",
      activeKeys: "活跃 API Key",
      saved: "节省 {tokens}",
      models: "{count} 个模型",
    },
    overview: {
      dailyCost: "每日费用",
      costByKey: "各 Key 费用分布",
    },
    trends: {
      dailyCost: "每日费用",
      dailyTokens: "每日 Token",
      cacheHitRate: "缓存命中率",
      requestCount: "请求次数",
      heroSubtitle: "共 {days} 天",
    },
    cache: {
      hitRateTitle: "缓存命中率",
      servedFromCache: "{tokens} 个输入 token 由缓存提供",
      dailyHitRate: "每日缓存命中率",
      hitsVsMisses: "各 Key 缓存命中 / 未命中",
      noCacheTitle: "未检测到缓存使用",
      noCacheHint: "在 DeepSeek API 调用中启用提示缓存以降低费用。",
      hits: "缓存命中",
      misses: "缓存未命中",
    },
    keys: {
      title: "各 Key 详情",
      apiKeyName: "API Key 名称",
      tokens: "Token 数",
      cost: "费用",
      cacheHit: "缓存命中",
      requests: "请求数",
      heroSubtitle: "{keys} 个 Key · {models} 个模型",
    },
    error: {
      missingColumns: "CSV 格式无法识别",
      malformedRow: "CSV 解析错误",
      emptyFile: "空文件",
      incompleteUpload: "上传不完整",
      row: "行",
      column: "列",
    },
    warning: {
      dateMismatch: "日期不匹配",
      noCostMatch: "缺少费用数据",
      partialCacheData: "缓存数据不完整",
      schemaDrift: "数据结构不一致",
    },
    meta: {
      title: "DeepSeek API 用量分析仪表盘",
      description:
        "可视化您的 DeepSeek API 使用情况 — 拖拽月度 CSV，即时获取费用分析、缓存分析和各 Key 用量明细。数据 100% 本地处理，不上传任何服务器。免费、开源，由 Gavin Chen 和 MindRose 团队维护。",
    },
    langSwitcher: {
      label: "语言",
    },
    theme: {
      light: "浅色",
      dark: "深色",
      switchToDark: "切换至深色模式",
      switchToLight: "切换至浅色模式",
    },
    modelFilter: {
      allModels: "全部模型",
    },
    guideline: {
      pageTitle: "用户操作手册",
      backToHome: "返回首页",
      viewGuide: "查看完整操作指南 →",
      toc: "目录",
      footerNote:
        "文档随应用版本迭代更新。如有疑问或建议，欢迎通过 {githubLink} 反馈。",
    },
    landing: {
      howItWorksTitle: "使用方式",
      howItWorksStep1Title: "1. 导出 CSV",
      howItWorksStep1Desc:
        "前往 DeepSeek 平台 → 用量 → 导出月度 CSV。每月会得到 amount 和 cost 两个文件。",
      howItWorksStep2Title: "2. 拖拽上传",
      howItWorksStep2Desc:
        "将所有 CSV 文件拖拽到此页面。多个月份文件会自动按文件名配对并合并。",
      howItWorksStep3Title: "3. 查看分析",
      howItWorksStep3Desc:
        "即刻查看费用图表、各 Key 用量明细、缓存命中分析和使用趋势 — 所有数据在浏览器本地处理。",
      qaTitle: "常见问题",
      qaQ1: "我的数据会上传到服务器吗？",
      qaA1: "不会。所有 CSV 解析和费用计算均在您的浏览器中完成，数据不会离开您的设备。",
      qaQ2: "我需要哪些 CSV 文件？",
      qaA2: "需要从 DeepSeek 平台账单页面导出的 amount-*.csv 和 cost-*.csv 文件。至少拖入一对文件即可开始。",
      qaQ3: "可以同时分析多个月份吗？",
      qaA3: "可以。一次性拖入所有月份的 CSV 文件，它们会根据文件名自动配对并拼接。",
      qaQ4: "支持哪些模型？",
      qaA4: "DeepSeek 导出中的所有模型均支持。仪表盘会自动检测所有模型，并提供筛选器以便单独或合并查看。",
      qaQ5: "为什么费用显示为 0？",
      qaA5: "需要同时上传同一个月的 amount CSV 和 cost CSV 两个文件。如果缺少其中任何一个，费用数据将无法计算。",
      qaQ6: "显示\u201C上传不完整\u201D是什么意思？",
      qaA6: "表示某个月份只有 amount 文件或只有 cost 文件，缺少另一个。补充缺失的文件并重新上传即可解决。",
      qaQ7: "哪里可以找到更多故障排查帮助？",
      qaA7: "请查看完整操作指南中的\u201C常见问题排查\u201D章节，涵盖了 CSV 格式错误、缓存配置、文件命名规范等常见问题。",
      aboutSectionTitle: "关于我们",
      aboutWhyTitle: "为什么开发这个工具？",
      aboutWhyDesc:
        "随着 DeepSeek API 调用的激增，我们发现官方后台导出的 CSV 账单数据难以直观阅读。\n为了搞清楚\u201C到底哪个项目消耗了最多的 Token\u201D以及\u201C缓存命中率如何\u201D，我们决定自己动手，打造一个简单、直观且绝对安全的可视化仪表盘。",
      aboutPrivacyTitle: "极致的隐私与技术架构",
      aboutPrivacyDesc:
        "处理账单数据，隐私是不可妥协的底线。因此，我们采用了纯前端的架构设计。\n基于 Next.js 16 (App Router) 和 React 19，结合 Papa Parse 与 ECharts，所有的 CSV 数据解析和图表渲染 100% 在你的浏览器本地完成。\n没有数据库，你的数据绝不会离开你的设备半步。\n配合 Apple 风格的极简设计和 CSS 自定义属性驱动的双主题，我们希望为你提供最优雅的数据分析体验。",
      aboutMindRoseTitle: "关于 MindRose",
      aboutMindRoseDesc:
        "本项目由 Gavin Chen 及 MindRose 团队开发并开源呈现。MindRose 是专注于为中小制造企业、物流公司及跨国贸易商提供轻量级数字化解决方案的科技团队。\n我们不卖虚无的\u201C数字化转型\u201D概念，而是通过 AI 技术与全栈敏捷开发（Next.js、React、Mendix 等），在几周内为你交付解决实际业务痛点的应用。\n从外贸独立站的 SEO 优化重构，到企业内部核心系统的敏捷搭建，再到 AI Agent 的业务流接入，我们懂技术，更懂你的商业场景。",
      aboutContactTitle: "商业合作",
      aboutContactDesc:
        "想要为你的企业定制类似的数据看板？或者需要将 AI 深度集成到你的业务工作流中？\n或者需要现代优雅的用户交互界面？或者需要多终端的跨部门业务系统？\n或者是基于当前开源项目的进一步合作？",
      aboutContactService:
        "我们提供专业的瓶颈诊断、变革点分析、结合业务的定制化方案、和基于 AI 的开发及运维服务。",
      aboutContactCTA: "联系我们：",
      aboutGitHubLabel: "本项目的 GitHub 仓库",
      aboutLinkedInLabel: "Gavin 的 LinkedIn 主页",
      aboutMindRoseLabel: "MindRose 团队主页",
    },
  },
} as const;

export type Locale = keyof typeof translations;

/** The common shape shared by all translation objects. */
export type TranslationShape = { [K in keyof typeof translations.en]: (typeof translations.en)[K] };

/**
 * Resolve literal string unions (e.g. "DeepSeek Usage" | "DeepSeek 用量")
 * so consuming code doesn't complain about incompatible literal types.
 */
export type TranslationKeys = {
  [K in keyof TranslationShape]: {
    [SK in keyof TranslationShape[K]]: string;
  };
};

export default translations;
