"use client";

import { useTranslation } from "@/i18n";
import type { ArticleContent } from "@/lib/content";
import { findBlogArticleLocaleMeta } from "@/lib/blogArticles";
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
  const { locale } = useTranslation();
  const articleContent = locale === "zh" ? content.zh : content.en;
  const localizedMeta = findBlogArticleLocaleMeta(meta.slug, locale);
  const localizedPrevPost = prevPost
    ? {
        ...prevPost,
        title: findBlogArticleLocaleMeta(prevPost.slug, locale)?.title ?? prevPost.title,
      }
    : undefined;
  const localizedNextPost = nextPost
    ? {
        ...nextPost,
        title: findBlogArticleLocaleMeta(nextPost.slug, locale)?.title ?? nextPost.title,
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
