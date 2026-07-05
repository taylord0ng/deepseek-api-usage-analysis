/**
 * 联盟营销链接统一管理
 *
 * 集中管理所有联盟和推荐计划的链接、佣金信息。
 * 仿照 `sisterProjects.ts` 的集中化配置模式，便于后续添加新联盟计划。
 *
 * 所有出站联盟链接必须添加 rel="sponsored nofollow" 以遵守 Google SEO 指南。
 * 所有赞助内容标注 "Sponsored" 或 "Affiliate link" 透明标识。
 */

/** Vultr Cloud — Referral Program */
export const vultrAffiliate = {
  name: "Vultr",
  url: "https://www.vultr.com/?ref=9726658",
  commission: "Up to $100 per new user",
  condition: "Referred user must be active 30+ days and spend $10–$25",
  rel: "sponsored nofollow" as const,
} as const;

/** DigitalOcean — Affiliate Program (via Awin) */
export const digitalOceanAffiliate = {
  name: "DigitalOcean",
  url: "https://www.digitalocean.com/affiliates",
  commission: "10% recurring commission for 12 months",
  platform: "Awin",
  rel: "sponsored nofollow" as const,
} as const;

/** Namecheap — Affiliate Program */
export const namecheapAffiliate = {
  name: "Namecheap",
  url: "https://www.namecheap.com/affiliates/",
  commission: "Domains 20%, Hosting/SSL 35%, VPN up to 100% first purchase",
  platform: "Impact / Commission Junction",
  cookieDays: 30,
  rel: "sponsored nofollow" as const,
} as const;

/** OpenRouter — Affiliate Program */
export const openRouterAffiliate = {
  name: "OpenRouter",
  url: "https://openrouter.ai/affiliates",
  commission: "20% recurring commission",
  notes: "Affiliate page may show 404; login to dashboard for link",
  rel: "sponsored nofollow" as const,
} as const;

/**
 * 推荐工具列表 — 用于 CostTracker 落地页的 "Recommended Tools" 卡片
 * Portkey 和 Helicone 目前无公开 Affiliate 计划，保留纯推荐（nofollow）。
 */
export const recommendedTools = [
  {
    name: "Portkey",
    description: "AI Gateway & Observability — enterprise-grade guardrails for production LLM deployments.",
    url: "https://portkey.ai",
    isAffiliate: false,
    rel: "noopener noreferrer" as const,
  },
  {
    name: "Helicone",
    description: "LLM Monitoring — fastest real-time observability with one-line integration.",
    url: "https://www.helicone.ai",
    isAffiliate: false,
    rel: "noopener noreferrer" as const,
  },
  {
    name: "LangFuse",
    description: "Open Source LLM Tracing — detailed tracing, cost attribution, and evaluation pipelines.",
    url: "https://langfuse.com",
    isAffiliate: false,
    rel: "noopener noreferrer" as const,
  },
] as const;
