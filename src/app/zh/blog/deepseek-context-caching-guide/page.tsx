/** 文件说明：中文博客文章《DeepSeek Context Caching Guide》镜像路由。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleCaching";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleCachingMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

/** 中文博客文章元数据。 */
const META = {
  title: "DeepSeek API 上下文缓存终极指南（2026）",
  description:
    "了解 DeepSeek 前缀匹配磁盘缓存的工作原理、缓存命中率偏低的原因，以及 5 个最大化节省成本的 Prompt 工程技巧。",
  date: "2026 年 7 月 4 日",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
  slug: "deepseek-context-caching-guide",
};

/**
 * 生成中文博客文章 metadata。
 */
export function generateMetadata(): Metadata {
  return buildArticleCachingMetadata("zh");
}

/**
 * 渲染中文博客文章详情页，并注入中文 BlogPosting JSON-LD。
 */
export default function ZhArticleCachingPage() {
  const articleUrl = buildLocaleUrl("zh", "/blog/deepseek-context-caching-guide");
  const articleJsonLd = buildArticleJsonLd({
    locale: "zh",
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
        nextPost={{
          title: "Top 5 DeepSeek API Cost Optimization & Observability Tools",
          slug: "deepseek-cost-optimization-tools",
        }}
      />
    </>
  );
}
