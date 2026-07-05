/** 文件说明：DeepSeek API 定价计算器落地页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { buildAuthorMetadata } from "@/lib/authors";
import { PricingCalculatorPage } from "@/components/PricingCalculatorPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 生成定价计算器落地页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  const title = "DeepSeek API Pricing Calculator | Compare Model Costs Instantly";
  const description =
    "Estimate your DeepSeek API costs with our interactive pricing calculator. Compare DeepSeek V4 Flash, V4 Pro, OpenAI o3, and Claude Opus pricing side by side. Adjust token counts and cache hit rate assumptions.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/deepseek-api-pricing-calculator`,
      languages: {
        en: `${SITE_URL}/deepseek-api-pricing-calculator`,
        zh: `${SITE_URL}/deepseek-api-pricing-calculator`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/deepseek-api-pricing-calculator`,
      type: "website",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "DeepSeek API Pricing Calculator", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@GavinCnod",
      creator: "@GavinCnod",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    keywords: [
      "DeepSeek API pricing calculator",
      "DeepSeek token calculator",
      "DeepSeek cost estimate",
      "DeepSeek vs OpenAI cost",
      "LLM pricing comparison",
    ],
    ...buildAuthorMetadata(),
    robots: { index: true, follow: true },
  };
}

/**
 * 渲染定价计算器落地页路由。
 */
export default function PricingCalculatorRoute() {
  return <PricingCalculatorPage />;
}
