/** 文件说明：博客文章《DeepSeek Cost Optimization Tools》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleTools";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleToolsMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

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
 * 生成英文文章 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildArticleToolsMetadata("en");
}

/**
 * 渲染博客文章详情页，并注入 BlogPosting JSON-LD。
 */
export default function Page() {
  const articleUrl = buildLocaleUrl("en", "/blog/deepseek-cost-optimization-tools");
  const articleJsonLd = buildArticleJsonLd({
    locale: "en",
    headline: META.title,
    description: META.description,
    url: articleUrl,
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
