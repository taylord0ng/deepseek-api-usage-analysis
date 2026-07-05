import type { Metadata } from "next";
import { buildAuthorMetadata } from "@/lib/authors";
import { ChangelogPage } from "@/components/ChangelogPage";
import ChangelogContent from "@/components/ChangelogContent";

/** 站点公开 URL（构建时从 .env 注入） */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 动态生成更新日志页元数据（SEO）
 *
 * 为 /changelog 页面生成独立的 title、description、canonical URL、
 * OpenGraph 和 Twitter Card 元数据。
 */
export function generateMetadata(): Metadata {
  const title = "Changelog — DeepSeek API Usage Analytics Dashboard";
  const description =
    "Complete changelog for the DeepSeek API Usage Analytics Dashboard. Track all new features, improvements, bug fixes, and dependency changes across every release since v0.1.0. Built by Gavin & MindRose Team.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/changelog`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/changelog`,
      type: "website",
      siteName: "DeepSeek API Usage Analytics Dashboard",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [
        {
          url: `${SITE_URL}/ds-usage-logo.png`,
          width: 512,
          height: 512,
          alt: "DeepSeek API Usage Analytics Dashboard logo",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@GavinCnod",
      creator: "@GavinCnod",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    keywords: ["DeepSeek dashboard changelog", "API analytics release notes", "DeepSeek 更新日志"],
    ...buildAuthorMetadata(),
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * 更新日志页路由
 *
 * 静态导出兼容的独立更新日志页面，包含：
 * - 自 v0.1.0 至 当前版本 的完整版本变更记录
 * - 按类别（新增/改进/修复/依赖）分组展示
 * - Apple 极简风格，与主应用一致
 * - 返回首页 + FooterBar
 * - SEO metadata + OpenGraph + Twitter Card
 */
export default function ChangelogRoute() {
  return (
    <>
      <ChangelogPage />
      <ChangelogContent />
    </>
  );
}
