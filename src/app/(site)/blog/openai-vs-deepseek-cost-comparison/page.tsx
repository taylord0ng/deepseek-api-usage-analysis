/** 文件说明：博客文章《OpenAI vs DeepSeek Cost Comparison》路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleOpenai";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { buildArticleOpenAiMetadata } from "@/lib/routeMetadata";
import { buildArticleJsonLd } from "@/lib/schema";
import { OG_IMAGE_URL } from "@/lib/site";

const META = {
  title: "OpenAI vs DeepSeek V4 Pro: A Developer's Cost-Benefit Analysis",
  description: "Hard numbers on API pricing differences. We break down when each model makes economic sense and how to migrate smoothly.",
  date: "July 4, 2026",
  publishedTime: "2026-07-04T00:00:00.000Z",
  modifiedTime: "2026-07-04T00:00:00.000Z",
  author: "Gavin Chen",
  slug: "openai-vs-deepseek-cost-comparison",
};

/**
 * 生成英文文章 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildArticleOpenAiMetadata("en");
}

/**
 * 渲染博客文章详情页，并注入 BlogPosting JSON-LD。
 */
export default function Page() {
  const articleUrl = buildLocaleUrl("en", "/blog/openai-vs-deepseek-cost-comparison");
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
        prevPost={{ title: "Top 5 DeepSeek API Cost Optimization & Observability Tools", slug: "deepseek-cost-optimization-tools" }}
      />
    </>
  );
}
