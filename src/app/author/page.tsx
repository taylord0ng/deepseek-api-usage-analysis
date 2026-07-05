/** 文件说明：站内作者页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import AuthorContent from "@/components/AuthorContent";
import { AuthorPage } from "@/components/AuthorPage";
import { buildAuthorMetadata } from "@/lib/authors";

/** 站点公开 URL（构建时从 .env 注入）。 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 生成作者页的 SEO 元数据。
 *
 * 为 /author 页面输出独立的 canonical、OpenGraph、Twitter 与双语 alternates，
 * 让博客内容与站内作者实体形成稳定关联。
 */
export function generateMetadata(): Metadata {
  const title = "About the Author — Gavin Chen & MindRose Team";
  const description =
    "Learn who builds the DeepSeek API Usage Analytics Dashboard. This author page introduces Gavin Chen, the MindRose team, public profile links, and project background.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/author`,
      languages: {
        en: `${SITE_URL}/author`,
        zh: `${SITE_URL}/author`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/author`,
      type: "profile",
      siteName: "DeepSeek API Usage Analytics Dashboard",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Author page — DeepSeek API Usage Analytics Dashboard",
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
      "Gavin Chen",
      "MindRose Team",
      "DeepSeek API Usage Analytics author",
      "DeepSeek 用量分析 作者",
      "MindRose 团队",
    ],
    ...buildAuthorMetadata(),
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * 渲染站内作者页。
 */
export default function AuthorRoute() {
  return (
    <>
      <AuthorPage />
      <AuthorContent />
    </>
  );
}
