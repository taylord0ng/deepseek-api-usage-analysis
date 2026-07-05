/** 文件说明：操作指南页面路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { buildAuthorMetadata } from "@/lib/authors";
import { GuidelinePage } from "@/components/GuidelinePage";

/** 站点公开 URL（构建时从 .env 注入） */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 动态生成指南页元数据（SEO）
 *
 * 为 /guideline 页面生成独立的 title、description、canonical URL、
 * OpenGraph 和 Twitter Card 元数据。
 */
export function generateMetadata(): Metadata {
  const title = "DeepSeek API Usage Analytics — User Guide";
  const description =
    "Complete user guide for the DeepSeek API Usage Analytics Dashboard. Learn how to export CSVs, upload files, and navigate all dashboard views with step-by-step instructions and screenshots.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/guideline`,
      languages: {
        en: `${SITE_URL}/guideline`,
        zh: `${SITE_URL}/guideline`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/guideline`,
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
    keywords: [
      "DeepSeek usage guide",
      "DeepSeek API dashboard tutorial",
      "DeepSeek CSV export",
      "API cost analysis guide",
      "DeepSeek 使用指南",
    ],
    ...buildAuthorMetadata(),
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * 指南页路由
 *
 * 静态导出兼容的独立操作指南页面，包含：
 * - 完整操作手册内容（解析 MD 格式）
 * - 截图自动匹配（根据当前 locale 切换 cn/en 版本）
 * - 交互式目录导航
 * - 返回首页按钮
 * - SEO metadata + JSON-LD 结构化数据
 */
export default function GuidelineRoute() {
  return <GuidelinePage />;
}
