/** 文件说明：博客文章《DeepSeek Cost Optimization Tools》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleTools";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

const META = {
  title: "Top 5 DeepSeek API Cost Optimization & Observability Tools",
  description: "A comprehensive comparison of the best tools for monitoring and optimizing DeepSeek API costs — from real-time observability platforms to privacy-first CSV analyzers.",
  date: "July 4, 2026",
  author: "Gavin Chen & MindRose Team",
  slug: "deepseek-cost-optimization-tools",
};

/**
 * 生成文章《DeepSeek Cost Optimization Tools》的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return {
    title: META.title,
    description: META.description,
    alternates: {
      canonical: `${SITE_URL}/blog/deepseek-cost-optimization-tools`,
      languages: {
        en: `${SITE_URL}/blog/deepseek-cost-optimization-tools`,
        zh: `${SITE_URL}/blog/deepseek-cost-optimization-tools`,
      },
    },
    openGraph: { title: META.title, description: META.description, url: `${SITE_URL}/blog/deepseek-cost-optimization-tools`, type: "article", siteName: "DeepSeek API Usage Dashboard & Cost Tracker", locale: "en_US", images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: META.title, type: "image/png" }] },
    twitter: { card: "summary_large_image", site: "@GavinCnod", creator: "@GavinCnod", title: META.title, description: META.description, images: [`${SITE_URL}/og-image.png`] },
    keywords: ["DeepSeek cost optimization tools", "DeepSeek API monitoring", "LLM observability", "Helicone", "Portkey", "LangFuse"],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <BlogArticlePage
      meta={META}
      content={{ en, zh }}
      prevPost={{ title: "The Ultimate Guide to DeepSeek API Context Caching (2026)", slug: "deepseek-context-caching-guide" }}
      nextPost={{ title: "OpenAI o3 vs DeepSeek V4 Pro: A Developer's Cost-Benefit Analysis", slug: "openai-vs-deepseek-cost-comparison" }}
    />
  );
}
