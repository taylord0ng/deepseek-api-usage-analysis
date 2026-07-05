/** 文件说明：博客文章《DeepSeek Context Caching Guide》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleCaching";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

const META = {
  title: "The Ultimate Guide to DeepSeek API Context Caching (2026)",
  description: "Learn how DeepSeek's prefix-matching disk caching works, why your cache hit rate might be lower than expected, and 5 prompt engineering techniques to maximize savings.",
  date: "July 4, 2026",
  author: "Gavin Chen & MindRose Team",
  slug: "deepseek-context-caching-guide",
};

/**
 * 生成文章《DeepSeek Context Caching Guide》的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return {
    title: META.title,
    description: META.description,
    alternates: {
      canonical: `${SITE_URL}/blog/deepseek-context-caching-guide`,
      languages: {
        en: `${SITE_URL}/blog/deepseek-context-caching-guide`,
        zh: `${SITE_URL}/blog/deepseek-context-caching-guide`,
      },
    },
    openGraph: { title: META.title, description: META.description, url: `${SITE_URL}/blog/deepseek-context-caching-guide`, type: "article", siteName: "DeepSeek API Usage Dashboard & Cost Tracker", locale: "en_US", images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: META.title, type: "image/png" }] },
    twitter: { card: "summary_large_image", site: "@GavinCnod", creator: "@GavinCnod", title: META.title, description: META.description, images: [`${SITE_URL}/og-image.png`] },
    keywords: ["DeepSeek context caching", "DeepSeek cache hit rate", "DeepSeek API cost optimization", "prompt caching guide"],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <BlogArticlePage
      meta={META}
      content={{ en, zh }}
      nextPost={{ title: "Top 5 DeepSeek API Cost Optimization & Observability Tools", slug: "deepseek-cost-optimization-tools" }}
    />
  );
}
