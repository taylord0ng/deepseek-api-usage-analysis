/**
 * All UI strings used in the app. Each key must have both en and zh values.
 * For interpolated values, use `{key}` placeholders (e.g., "{{count}} model(s)").
 */
const translations = {
  en: {
    app: {
      title: "DeepSeek Usage",
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
      text: "DeepSeek Usage Dashboard · Data processed locally in your browser · ",
    },
    dropzone: {
      processing: "Processing CSVs...",
      title: "Drop your DeepSeek CSVs here",
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
      title: "DeepSeek Usage Dashboard",
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
      aboutTitle: "About",
      aboutText:
        "DeepSeek Usage Dashboard is a free, open-source tool for visualizing your DeepSeek API usage. Built with Next.js, ECharts, and Papa Parse. No tracking, no ads, no data collection — everything runs in your browser.",
    },
  },

  zh: {
    app: {
      title: "DeepSeek 用量",
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
      text: "DeepSeek 用量仪表盘 · 数据仅在浏览器本地处理 · ",
    },
    dropzone: {
      processing: "正在处理 CSV...",
      title: "拖拽 DeepSeek CSV 文件到此处",
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
      title: "DeepSeek 用量仪表盘",
      description:
        "可视化您的 DeepSeek API 使用情况 — 拖拽月度 CSV，即时获取费用分析、缓存分析和各 Key 用量明细。免费、开源、纯浏览器端。",
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
      aboutTitle: "关于",
      aboutText:
        "DeepSeek 用量仪表盘是一款免费、开源的工具，用于可视化您的 DeepSeek API 使用情况。基于 Next.js、ECharts 和 Papa Parse 构建。无追踪、无广告、无数据收集 — 一切都在浏览器中运行。",
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
