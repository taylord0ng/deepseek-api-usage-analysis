/** 文件说明：中文博客文章《OpenAI vs DeepSeek Cost Comparison》镜像路由。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleOpenai";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleOpenAiMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

/** 中文博客文章元数据。 */
const META = {
  title: "OpenAI GPT vs Claude vs DeepSeek V4 Pro：开发者成本收益分析",
  description:
    "用硬数据比较 API 定价差异。输入成本最高可相差 270 倍，并分析各模型在什么场景下更具经济性，以及如何平滑迁移。",
  date: "2026 年 7 月 4 日",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
  slug: "openai-vs-deepseek-cost-comparison",
};

/**
 * 生成中文博客文章 metadata。
 */
export function generateMetadata(): Metadata {
  return buildArticleOpenAiMetadata("zh");
}

/**
 * 渲染中文博客文章详情页，并注入中文 BlogPosting JSON-LD。
 */
export default function ZhArticleOpenAiPage() {
  const articleUrl = buildLocaleUrl("zh", "/blog/openai-vs-deepseek-cost-comparison");
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
          title: "Top 5 DeepSeek API Cost Optimization & Observability Tools",
          slug: "deepseek-cost-optimization-tools",
        }}
      />
    </>
  );
}
