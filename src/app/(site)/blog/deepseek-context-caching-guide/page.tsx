/** 文件说明：博客文章《DeepSeek Context Caching Guide》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleCaching";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleCachingMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

const META = {
  title: "The Ultimate Guide to DeepSeek API Context Caching (2026)",
  description: "Learn how DeepSeek's prefix-matching disk caching works, why your cache hit rate might be lower than expected, and 5 prompt engineering techniques to maximize savings.",
  date: "July 4, 2026",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
  slug: "deepseek-context-caching-guide",
};

/**
 * 生成英文文章 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildArticleCachingMetadata("en");
}

/**
 * 渲染博客文章详情页，并注入 BlogPosting JSON-LD。
 */
export default function Page() {
  const articleUrl = buildLocaleUrl("en", "/blog/deepseek-context-caching-guide");
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
        nextPost={{ title: "Top 5 DeepSeek API Cost Optimization & Observability Tools", slug: "deepseek-cost-optimization-tools" }}
      />
    </>
  );
}
