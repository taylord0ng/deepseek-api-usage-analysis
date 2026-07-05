import type { Metadata } from "next";
import { CacheAnalyzerPage } from "@/components/CacheAnalyzerPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

export function generateMetadata(): Metadata {
  const title = "DeepSeek Cache Hit Rate Analyzer | Optimize Your API Costs";
  const description =
    "Maximize your DeepSeek API cache hit rate and slash costs by up to 90%. Upload CSVs to analyze cache performance, learn prefix-matching caching strategies, and get per-key hits-vs-misses breakdowns.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/deepseek-cache-hit-rate-analyzer` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/deepseek-cache-hit-rate-analyzer`,
      type: "website",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "DeepSeek Cache Hit Rate Analyzer", type: "image/png" }],
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
      "DeepSeek cache hit rate",
      "DeepSeek context caching",
      "DeepSeek cache analysis",
      "improve DeepSeek caching",
      "DeepSeek API cost optimization",
    ],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: { index: true, follow: true },
  };
}

export default function CacheAnalyzerRoute() {
  return <CacheAnalyzerPage />;
}
