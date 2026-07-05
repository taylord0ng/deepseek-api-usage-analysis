/** 文件说明：博客首页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { buildAuthorMetadata } from "@/lib/authors";
import BlogIndex from "@/components/BlogIndex";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/**
 * 生成博客首页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  const title = "Blog — DeepSeek API Usage Analytics & Cost Optimization";
  const description =
    "Deep dives into DeepSeek API cost optimization, context caching strategies, pricing comparisons, and developer tools. Brought to you by the MindRose team.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/blog`,
      languages: {
        en: `${SITE_URL}/blog`,
        zh: `${SITE_URL}/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog`,
      type: "website",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "DeepSeek API Blog", type: "image/png" }],
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
      "DeepSeek API blog",
      "DeepSeek cost optimization",
      "LLM cost analysis",
      "API caching strategies",
      "AI pricing comparison",
    ],
    ...buildAuthorMetadata(),
    robots: { index: true, follow: true },
  };
}

/**
 * 渲染博客首页。
 */
export default function BlogRoute() {
  return <BlogIndex />;
}
