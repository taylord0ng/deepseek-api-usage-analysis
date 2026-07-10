"use client";

import { useTranslation } from "@/i18n";
import type { ArticleContent } from "@/lib/content";
import BlogPostLayout from "@/components/BlogPostLayout";
import ArticleRenderer from "@/components/ArticleRenderer";

interface BlogMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

interface BlogArticlePageProps {
  meta: BlogMeta;
  /** 双语内容 */
  content: {
    en: ArticleContent;
    zh: ArticleContent;
  };
  nextPost?: { title: string; slug: string };
  prevPost?: { title: string; slug: string };
}

/**
 * 根据文章 slug 读取当前语言下的文章标题与描述。
 *
 * 这里优先复用 `translations.ts` 中已经存在的 blogIndex 文案，
 * 保证博客列表页与文章详情页使用同一份双语标题来源。
 */
function getLocalizedArticleMeta(
  slug: string,
  t: ReturnType<typeof useTranslation>["t"],
): Pick<BlogMeta, "title" | "description"> | null {
  const articleMetaMap: Record<string, Pick<BlogMeta, "title" | "description">> = {
    "deepseek-context-caching-guide": {
      title: t.blogIndex.article1Title,
      description: t.blogIndex.article1Desc,
    },
    "deepseek-cost-optimization-tools": {
      title: t.blogIndex.article2Title,
      description: t.blogIndex.article2Desc,
    },
    "openai-claude-vs-deepseek-cost-comparison": {
      title: t.blogIndex.article3Title,
      description: t.blogIndex.article3Desc,
    },
  };

  return articleMetaMap[slug] ?? null;
}

/**
 * 通用的博客文章页面组件
 *
 * 根据当前 locale 自动选择 en/zh 内容，通过 ArticleRenderer 渲染。
 * 每篇文章只需一个轻量的 page.tsx 传入 content 模块即可。
 */
export default function BlogArticlePage({
  meta,
  content,
  nextPost,
  prevPost,
}: BlogArticlePageProps) {
  const { locale, t } = useTranslation();
  const articleContent = locale === "zh" ? content.zh : content.en;
  const localizedMeta = getLocalizedArticleMeta(meta.slug, t);
  const localizedPrevPost = prevPost
    ? {
        ...prevPost,
        title: getLocalizedArticleMeta(prevPost.slug, t)?.title ?? prevPost.title,
      }
    : undefined;
  const localizedNextPost = nextPost
    ? {
        ...nextPost,
        title: getLocalizedArticleMeta(nextPost.slug, t)?.title ?? nextPost.title,
      }
    : undefined;

  return (
    <BlogPostLayout
      meta={{
        ...meta,
        title: localizedMeta?.title ?? meta.title,
        description: localizedMeta?.description ?? meta.description,
      }}
      nextPost={localizedNextPost}
      prevPost={localizedPrevPost}
    >
      <ArticleRenderer
        sections={articleContent.sections}
        pricingTable={articleContent.pricingTable}
      />
    </BlogPostLayout>
  );
}
