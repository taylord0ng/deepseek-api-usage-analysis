import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import PrivacyContent from "@/components/PrivacyContent";

/** 站点公开 URL（构建时从 .env 注入） */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 动态生成隐私政策页元数据（SEO）
 *
 * 为 /privacy 页面生成独立的 title、description、canonical URL、
 * OpenGraph 和 Twitter Card 元数据。双语支持英文和中文版本。
 */
export function generateMetadata(): Metadata {
  const title = "Privacy Policy — DeepSeek API Usage Analytics Dashboard";
  const description =
    "Privacy Policy for the DeepSeek API Usage Analytics Dashboard. Learn how we handle your data: all CSV processing is local, no data is uploaded, and Google Analytics is opt-in. Built by Gavin & MindRose Team.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/privacy`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/privacy`,
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
      card: "summary",
      site: "@GavinCnod",
      creator: "@GavinCnod",
      title,
      description,
      images: [`${SITE_URL}/ds-usage-logo.png`],
    },
    keywords: ["DeepSeek dashboard privacy", "API usage analytics privacy", "DeepSeek 隐私政策"],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * 隐私政策页路由
 *
 * 静态导出兼容的独立隐私政策页面，包含：
 * - 完整隐私政策内容（中英双语，通过 useTranslation 切换）
 * - 7 个章节：数据收集、本地处理、GA 分析、第三方服务、安全性、政策变更、联系方式
 * - Apple 极简风格，与主应用一致
 * - 返回首页 + FooterBar
 * - SEO metadata + OpenGraph + Twitter Card
 */
export default function PrivacyRoute() {
  return (
    <>
      <PrivacyPage />
      <PrivacyContent />
    </>
  );
}
