/**
 * Schema.org 结构化数据辅助模块
 *
 * 生成 JSON-LD 格式的 Schema Markup，支持多语言（en / zh）。
 * 在 LandingPage 客户端组件中根据当前 locale 动态渲染。
 */
import type { Locale } from "@/i18n/translations";

/* ------------------------------------------------------------------ */
/*  多语言翻译映射                                                       */
/* ------------------------------------------------------------------ */

/** 应用版本号，与 package.json 保持同步 */
const APP_VERSION = "0.3.2";

/** 站点公开 URL */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** SoftwareApplication Schema 翻译 */
const softwareAppSchema: Record<
  Locale,
  { name: string; description: string; version: string }
> = {
  en: {
    name: "DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team",
    description:
      "Visualize your DeepSeek API usage — drop your monthly CSVs and get instant cost analytics, cache analysis, and per-key breakdowns. Free, open-source, browser-side.",
    version: APP_VERSION,
  },
  zh: {
    name: "DeepSeek API 用量分析仪表盘 by Gavin & Mindrose Team",
    description:
      "可视化您的 DeepSeek API 使用情况 — 拖拽月度 CSV，即时获取费用分析、缓存分析和各 Key 用量明细。免费、开源、纯浏览器端。",
    version: APP_VERSION,
  },
};

/** FAQPage Schema 翻译 */
const faqSchema: Record<Locale, { questions: { q: string; a: string }[] }> = {
  en: {
    questions: [
      {
        q: "Is my data uploaded to any server?",
        a: "No. All CSV parsing and cost computation runs entirely in your browser. Your data never leaves your device.",
      },
      {
        q: "What CSV files do I need?",
        a: "You need the amount-*.csv and cost-*.csv files exported from the DeepSeek Platform billing page. Drag at least one pair to get started.",
      },
      {
        q: "Can I analyze multiple months at once?",
        a: "Yes. Drag all your monthly CSV files at once — they will be automatically paired by filename and concatenated.",
      },
      {
        q: "What models are supported?",
        a: "Any model listed in your DeepSeek exports. The dashboard auto-detects all models and provides a filter to view them individually or combined.",
      },
      {
        q: "Why does my cost show as $0?",
        a: "You need to upload both the amount CSV and the cost CSV for the same month. If either file is missing, cost data cannot be calculated.",
      },
      {
        q: "What does \"Incomplete Upload\" mean?",
        a: "It means a month has only the amount file or only the cost file — not both. Add the missing file and re-upload to resolve this.",
      },
      {
        q: "Where can I find more troubleshooting help?",
        a: "Check the Troubleshooting section in our full User Guide. It covers common issues like CSV format errors, cache configuration, file naming conventions, and more.",
      },
    ],
  },
  zh: {
    questions: [
      {
        q: "我的数据会上传到服务器吗？",
        a: "不会。所有 CSV 解析和费用计算均在您的浏览器中完成，数据不会离开您的设备。",
      },
      {
        q: "我需要哪些 CSV 文件？",
        a: "需要从 DeepSeek 平台账单页面导出的 amount-*.csv 和 cost-*.csv 文件。至少拖入一对文件即可开始。",
      },
      {
        q: "可以同时分析多个月份吗？",
        a: "可以。一次性拖入所有月份的 CSV 文件，它们会根据文件名自动配对并拼接。",
      },
      {
        q: "支持哪些模型？",
        a: "DeepSeek 导出中的所有模型均支持。仪表盘会自动检测所有模型，并提供筛选器以便单独或合并查看。",
      },
      {
        q: "为什么费用显示为 0？",
        a: "需要同时上传同一个月的 amount CSV 和 cost CSV 两个文件。如果缺少其中任何一个，费用数据将无法计算。",
      },
      {
        q: "显示\u201C上传不完整\u201D是什么意思？",
        a: "表示某个月份只有 amount 文件或只有 cost 文件，缺少另一个。补充缺失的文件并重新上传即可解决。",
      },
      {
        q: "哪里可以找到更多故障排查帮助？",
        a: "请查看完整操作指南中的\u201C常见问题排查\u201D章节，涵盖了 CSV 格式错误、缓存配置、文件命名规范等常见问题。",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  生成器                                                              */
/* ------------------------------------------------------------------ */

/** 根据 locale 生成 SoftwareApplication JSON-LD */
export function buildSoftwareAppJsonLd(locale: Locale): Record<string, unknown> {
  const t = softwareAppSchema[locale];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    version: t.version,
    operatingSystem: "Any (web browser)",
    applicationCategory: "DeveloperApplication",
    description: t.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/** 根据 locale 生成 FAQPage JSON-LD */
export function buildFaqJsonLd(locale: Locale): Record<string, unknown> {
  const t = faqSchema[locale];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * BreadcrumbList JSON-LD Schema 翻译
 *
 * 面包屑导航的多语言名称映射。
 */
const breadcrumbSchema: Record<Locale, { name: string }> = {
  en: { name: "DeepSeek API Usage Analytics Dashboard" },
  zh: { name: "DeepSeek API 用量分析仪表盘" },
};

/**
 * 根据 locale 生成 BreadcrumbList JSON-LD
 *
 * 虽然目前是单页应用，但 BreadcrumbList 仍有助于搜索引擎理解页面
 * 在站点中的位置。对于单页应用，最少需要一个根级别的 ListItem。
 */
export function buildBreadcrumbJsonLd(locale: Locale): Record<string, unknown> {
  const t = breadcrumbSchema[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.name,
        item: SITE_URL,
      },
    ],
  };
}
