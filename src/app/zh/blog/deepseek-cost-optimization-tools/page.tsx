/** 文件说明：中文博客文章《DeepSeek Cost Optimization Tools》镜像路由。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleTools";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleToolsMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

/** 中文博客文章元数据。 */
const META = {
  title: "Top 5 DeepSeek API 成本优化与可观测性工具横评",
  description:
    "深度对比最值得关注的 DeepSeek API 监控与成本优化工具，从实时可观测性平台到隐私优先的 CSV 分析器。",
  date: "2026 年 7 月 4 日",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
  slug: "deepseek-cost-optimization-tools",
};

/**
 * 生成中文博客文章 metadata。
 */
export function generateMetadata(): Metadata {
  return buildArticleToolsMetadata("zh");
}

/**
 * 渲染中文博客文章详情页，并注入中文 BlogPosting JSON-LD。
 */
export default function ZhArticleToolsPage() {
  const articleUrl = buildLocaleUrl("zh", "/blog/deepseek-cost-optimization-tools");
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
        prevPost={{
          title: "The Ultimate Guide to DeepSeek API Context Caching (2026)",
          slug: "deepseek-context-caching-guide",
        }}
        nextPost={{
          title: "OpenAI GPT vs Claude vs DeepSeek V4 Pro: A Developer's Cost-Benefit Analysis",
          slug: "openai-vs-deepseek-cost-comparison",
        }}
      />
    </>
  );
}
