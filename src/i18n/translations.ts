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
