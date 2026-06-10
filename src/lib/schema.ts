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

/** SoftwareApplication Schema 翻译 */
const softwareAppSchema: Record<
  Locale,
  { name: string; description: string }
> = {
  en: {
    name: "DeepSeek Usage Dashboard",
    description:
      "Visualize your DeepSeek API usage — drop your monthly CSVs and get instant cost analytics, cache analysis, and per-key breakdowns. Free, open-source, browser-side.",
  },
  zh: {
    name: "DeepSeek 用量仪表盘",
    description:
      "可视化您的 DeepSeek API 使用情况 — 拖拽月度 CSV，即时获取费用分析、缓存分析和各 Key 用量明细。免费、开源、纯浏览器端。",
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
