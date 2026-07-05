/** 文件说明：博客文章《DeepSeek Cost Optimization Tools》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { buildAuthorMetadata } from "@/lib/authors";
import { en, zh } from "@/lib/content/articleTools";
import { buildArticleJsonLd } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";
const ARTICLE_URL = `${SITE_URL}/blog/deepseek-cost-optimization-tools`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const META = {
  title: "Top 5 DeepSeek API Cost Optimization & Observability Tools",
  description: "A comprehensive comparison of the best tools for monitoring and optimizing DeepSeek API costs — from real-time observability platforms to privacy-first CSV analyzers.",
  date: "July 4, 2026",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
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
    openGraph: {
      title: META.title,
      description: META.description,
      url: ARTICLE_URL,
      type: "article",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      publishedTime: META.publishedTime,
      modifiedTime: META.modifiedTime,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: META.title, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", site: "@GavinCnod", creator: "@GavinCnod", title: META.title, description: META.description, images: [OG_IMAGE_URL] },
    keywords: ["DeepSeek cost optimization tools", "DeepSeek API monitoring", "LLM observability", "Helicone", "Portkey", "LangFuse"],
    ...buildAuthorMetadata(),
    robots: { index: true, follow: true },
  };
}

/**
 * 渲染博客文章详情页，并注入 BlogPosting JSON-LD。
 */
export default function Page() {
  const articleJsonLd = buildArticleJsonLd({
    headline: META.title,
    description: META.description,
    url: ARTICLE_URL,
    datePublished: META.publishedTime,
    dateModified: META.modifiedTime,
    authorName: META.author,
    imageUrl: OG_IMAGE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <BlogArticlePage
        meta={META}
        content={{ en, zh }}
        prevPost={{ title: "The Ultimate Guide to DeepSeek API Context Caching (2026)", slug: "deepseek-context-caching-guide" }}
        nextPost={{ title: "OpenAI o3 vs DeepSeek V4 Pro: A Developer's Cost-Benefit Analysis", slug: "openai-vs-deepseek-cost-comparison" }}
      />
    </>
  );
}
