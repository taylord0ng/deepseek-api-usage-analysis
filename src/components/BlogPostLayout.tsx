"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";

/**
 * Blog 文章统一排版模板
 *
 * Apple 极简风格 — max-w-2xl 阅读宽度、Hubot Sans 标题、署名 + 日期、CTA 横幅。
 * 所有 blog 文章页面通过此组件渲染，保持一致的视觉风格。
 *
 * Props:
 * @param meta - 文章元数据（标题、描述、日期、作者、slug）
 * @param children - 文章正文（ReactNode）
 */
interface BlogMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

interface BlogPostLayoutProps {
  meta: BlogMeta;
  children: ReactNode;
  /** 下一篇博文（用于底部交叉链接，可选） */
  nextPost?: { title: string; slug: string };
  /** 上一篇博文 */
  prevPost?: { title: string; slug: string };
}

export default function BlogPostLayout({
  meta,
  children,
  nextPost,
  prevPost,
}: BlogPostLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <TitleBar />

      <article className="max-w-2xl mx-auto px-6 py-8">
        {/* 返回 Blog 首页 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 mb-8 hover:opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Blog
        </Link>

        {/* 文章标题 */}
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
          }}
        >
          {meta.title}
        </h1>

        {/* 元数据行 */}
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mb-10"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span>{meta.date}</span>
          <span aria-hidden="true">·</span>
          <span>{meta.author}</span>
        </div>

        {/* 文章正文 */}
        <div
          className="prose-custom text-sm leading-relaxed text-pretty space-y-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {children}
        </div>

        {/* 底部 CTA 横幅 */}
        <div
          className="mt-16 p-6 rounded-subtle text-center"
          style={{ border: "1px solid var(--border)" }}
        >
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Try our free DeepSeek API Usage Dashboard
          </p>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--text-tertiary)" }}
          >
            Drag your CSVs, see your costs. 100% private, no signup.
          </p>
          <Link
            href={`/?utm_source=deepseek-usage.xyz&utm_medium=referral&utm_campaign=blog_${meta.slug}`}
            onClick={() => trackEvent("blog_cta_click", { blog_slug: meta.slug, event_category: "conversion" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              background: "var(--text-primary)",
              color: "var(--accent-inverse)",
            }}
          >
            Open Dashboard →
          </Link>
        </div>

        {/* 交叉链接 */}
        {(prevPost || nextPost) && (
          <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex flex-wrap justify-between gap-4 text-xs">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  ← {prevPost.title}
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="transition-colors duration-200 hover:opacity-80 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {nextPost.title} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        )}
      </article>

      <FooterBar />
    </div>
  );
}
