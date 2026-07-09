/**
 * 联盟营销链接统一管理
 *
 * 集中管理所有联盟和推荐计划的链接、佣金信息。
 * 仿照 `sisterProjects.ts` 的集中化配置模式，便于后续添加新联盟计划。
 *
 * 所有出站联盟链接必须添加 rel="sponsored nofollow" 以遵守 Google SEO 指南。
 * 所有赞助内容标注 "Sponsored" 或 "Affiliate link" 透明标识。
 */

export interface AffiliateItem {
  id: string;
  name: string;
  url: string;
  description?: {
    en: string;
    zh: string;
  };
  commission?: {
    en: string;
    zh: string;
  };
  condition?: {
    en: string;
    zh: string;
  };
  category?: string;
  isActive: boolean;
  rel: "sponsored nofollow" | "noopener noreferrer";
  platform?: string;
  notes?: {
    en: string;
    zh: string;
  };
  cookieDays?: number;
}

export const affiliatesRegistry: AffiliateItem[] = [
  {
    id: "aliyun-bailian",
    name: "阿里云百炼",
    url: "https://dashi.aliyun.com/",
    commission: {
      en: "Up to 45% one-time cash reward",
      zh: "最高 45% 一次性现金奖励",
    },
    condition: {
      en: "Recommending large models/Agent products extends attribution period to 365 days; withdrawable after 30 days.",
      zh: "推荐大模型/Agent产品，关联周期延长至 365 天；订单 30 天后可提现。",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "tencent-cloud",
    name: "腾讯云",
    url: "https://cloud.tencent.com/act/partner/cps",
    commission: {
      en: "20%–35% commission, max ¥80K/month, max ¥5000 per transaction",
      zh: "20%–35% 返佣，月佣金上限 ¥8 万，单笔上限 ¥5000",
    },
    condition: {
      en: "For verified individual users only; paid in a lump sum the following month",
      zh: "仅限个人实名认证用户；次月一次性到账",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "baidu-qianfan",
    name: "百度智能云千帆",
    url: "https://cloud.baidu.com/campaign/ambassador/index.html",
    commission: {
      en: "Base 20%, up to 34%; max ¥80K/month",
      zh: "基础 20%，叠加最高 34%；单月上限 ¥8 万",
    },
    condition: {
      en: "New user must spend >¥30; paid over 4 months (20/20/20/40%); individual income tax applies",
      zh: "有效拉新用户需实付 >¥30；佣金分 4 个月发放（20/20/20/40%）；需依法缴纳个人劳务税",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "silicon-flow",
    name: "硅基流动 SiliconFlow",
    url: "https://siliconflow.feishu.cn/share/base/form/shrcnFexyHcMNEntvR08shp8Tbd",
    commission: {
      en: "Undisclosed (primarily resource support)",
      zh: "未公开（资源扶持为主）",
    },
    condition: {
      en: "For tech bloggers/creators, providing traffic and resource support",
      zh: "面向技术博主/创作者，提供流量扶持和资源护航",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "huawei-cloud",
    name: "华为云",
    url: "https://activity.huaweicloud.com/cps/index.html",
    commission: {
      en: "Historically up to 28% (for ≤1 year plans)",
      zh: "历史最高 28%（包周期≤1年）",
    },
    condition: {
      en: "Old CPS program suspended; recommend contacting Huawei Cloud sales for new programs",
      zh: "旧 CPS 计划已暂停，建议联系华为云商务确认是否有新计划",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    url: "https://openrouter.ai/affiliates",
    commission: {
      en: "20% recurring commission",
      zh: "20% 循环佣金",
    },
    notes: {
      en: "Affiliate page may show 404; login to dashboard for link",
      zh: "联盟页面可能显示 404；请登录控制台获取链接",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "replicate",
    name: "Replicate",
    url: "https://replicate.com",
    commission: {
      en: "One-time, usage-based referral credits",
      zh: "一次性，基于使用量的推荐积分",
    },
    platform: "Direct",
    condition: {
      en: "60-day cookie; min withdrawal $50; paid monthly",
      zh: "60 天 Cookie；最低提现 $50；月结",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "groq",
    name: "Groq",
    url: "https://groq.com/partner-opportunity",
    commission: {
      en: "Undisclosed (Partnership model)",
      zh: "未公开（合作伙伴模式）",
    },
    platform: "Direct",
    condition: {
      en: "Geared towards enterprise partnerships; requires application and review",
      zh: "偏向企业合作，需提交申请后审核",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "vultr",
    name: "Vultr",
    url: "https://www.vultr.com/?ref=9911427",
    commission: {
      en: "Up to $100 per new user",
      zh: "每位新用户最高 $100",
    },
    condition: {
      en: "Referred user must be active 30+ days and spend $10–$25",
      zh: "被推荐用户需活跃 30 天以上且消费 $10–$25",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    url: "https://www.digitalocean.com/affiliates",
    commission: {
      en: "10% recurring commission for 12 months",
      zh: "10% 循环佣金，持续 12 个月",
    },
    platform: "Awin",
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "railway",
    name: "Railway",
    url: "https://railway.com/affiliate-program",
    commission: {
      en: "15% recurring (first 12 months)",
      zh: "15% 循环（前 12 个月）",
    },
    platform: "Direct",
    condition: {
      en: "Referred user gets $20 credit; min withdrawal $100",
      zh: "推荐用户可获 $20 积分；提现下限 $100",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "cloudways",
    name: "Cloudways",
    url: "https://platform.cloudways.com/signup",
    commission: {
      en: "Up to $125 per sale, or lifetime recurring commission",
      zh: "最高 $125/次，或终身循环佣金",
    },
    platform: "Direct",
    condition: {
      en: "Offers Slab/Hybrid/Custom models; 90-day cookie; supports sub-affiliates",
      zh: "提供 Slab/Hybrid/Custom 三种佣金模式；90 天 Cookie；支持二级佣金",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "hetzner",
    name: "Hetzner Cloud",
    url: "https://console.hetzner.com/refer",
    commission: {
      en: "Referrer gets €11.90 credit after referred user spends €11.90",
      zh: "被推荐人消费 €11.90 后推荐人获 €11.90 积分",
    },
    platform: "Direct",
    condition: {
      en: "New link generation method required after June 2026",
      zh: "2026 年 6 月后需用新方式获取链接",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "akamai",
    name: "Akamai Cloud",
    url: "https://www.akamai.com/cloud/referral-program",
    commission: {
      en: "Referrer gets $25 credit after referred user spends $25 and is active for 90 days",
      zh: "被推荐人消费 $25 且活跃 90 天后，推荐人获 $25 积分",
    },
    platform: "Direct",
    condition: {
      en: "Referred user gets $100 free credit, high conversion rate",
      zh: "被推荐人可获 $100 免费额度，转化率高",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "namecheap",
    name: "Namecheap",
    url: "https://www.namecheap.com/affiliates/",
    commission: {
      en: "Domains 20%, Hosting/SSL 35%, VPN up to 100% first purchase",
      zh: "域名 20%，主机/SSL 35%，VPN 首单最高 100%",
    },
    platform: "Impact / Commission Junction",
    cookieDays: 30,
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "cursor",
    name: "Cursor",
    url: "https://www.cursor.com",
    commission: {
      en: "20% recurring for 12 months",
      zh: "20% 循环，持续 12 个月",
    },
    platform: "Direct",
    condition: {
      en: "Applies to Pro and Business subscriptions; 60-day cookie; min withdrawal $50; paid monthly, supports PayPal",
      zh: "适用于 Pro 和 Business 订阅；Cookie 60 天；最低提现 $50；月结，支持 PayPal",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "raycast",
    name: "Raycast",
    url: "https://affiliates.raycast.com/signup",
    commission: {
      en: "30% recurring (no time limit)",
      zh: "30% 循环（无期限限制）",
    },
    platform: "Rewardful",
    condition: {
      en: "Requires a Raycast account; paid via Wise; min withdrawal £50; 30-day pending period",
      zh: "需有 Raycast 账户；通过 Wise 支付；最低提现 £50；30 天待处理期",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "windsurf",
    name: "Windsurf / Codeium",
    url: "https://codeium.com/partners",
    commission: {
      en: "Enterprise referral reward (percentage undisclosed)",
      zh: "企业客户引荐奖励（比例未公开）",
    },
    platform: "Direct",
    condition: {
      en: "Manual review takes 1–5 business days; min withdrawal $50",
      zh: "人工审核 1–5 个工作日；最低提现 $50",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "vercel-v0",
    name: "Vercel v0",
    url: "https://partners.dub.co/v0",
    commission: {
      en: "$10 per Premium user, $30 per Team user (one-time)",
      zh: "每推荐 Premium 用户 $10，每推荐 Team 用户 $30（一次性）",
    },
    platform: "Dub",
    condition: {
      en: "Requires Vercel account to apply, manual review",
      zh: "只需 Vercel 账号即可申请，人工审核",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "netlify",
    name: "Netlify",
    url: "https://dash.partnerstack.com/application?company=netlify&group=ecosystempartners",
    commission: {
      en: "20% recurring",
      zh: "20% 循环",
    },
    platform: "PartnerStack",
    condition: {
      en: "Must provide website URL and audience info when applying",
      zh: "申请时需填写网站 URL 和受众信息",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "warp",
    name: "Warp",
    url: "https://www.warp.dev",
    commission: {
      en: "Tiered rewards: 5 referrals = $5, 50 = $50, 100 = $100",
      zh: "阶梯式奖励：5 次推荐 = $5，50 次 = $50，100 次 = $100",
    },
    platform: "Direct",
    condition: {
      en: "International users can opt for digital gift cards",
      zh: "国际用户可选数字礼品卡",
    },
    isActive: true,
    rel: "sponsored nofollow",
  },
  {
    id: "portkey",
    name: "Portkey",
    description: {
      en: "AI Gateway & Observability — enterprise-grade guardrails for production LLM deployments.",
      zh: "AI 网关与可观测性平台 — 为生产环境的 LLM 部署提供企业级防护。",
    },
    url: "https://portkey.ai",
    isActive: true,
    rel: "noopener noreferrer",
  },
  {
    id: "helicone",
    name: "Helicone",
    description: {
      en: "LLM Monitoring — fastest real-time observability with one-line integration.",
      zh: "LLM 监控平台 — 极速的实时可观测性工具，单行代码即可集成。",
    },
    url: "https://www.helicone.ai",
    isActive: true,
    rel: "noopener noreferrer",
  },
  {
    id: "langfuse",
    name: "LangFuse",
    description: {
      en: "Open Source LLM Tracing — detailed tracing, cost attribution, and evaluation pipelines.",
      zh: "开源 LLM 追踪工具 — 提供详细的追踪记录、成本归因和评估流水线。",
    },
    url: "https://langfuse.com",
    isActive: true,
    rel: "noopener noreferrer",
  },
];

/**
 * 辅助函数：根据 ID 数组快速筛选活跃的推荐项目
 */
export function getAffiliatesByIds(ids: string[]): AffiliateItem[] {
  return ids
    .map(id => affiliatesRegistry.find(a => a.id === id && a.isActive))
    .filter((a): a is AffiliateItem => a !== undefined);
}

