import type { Metadata } from "next";
import BlogArticlePage from "@/components/BlogArticlePage";
import { en, zh } from "@/lib/content/articleOpenai";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

const META = {
  title: "OpenAI o3 vs DeepSeek V4 Pro: A Developer's Cost-Benefit Analysis",
  description: "Hard numbers on API pricing differences — input costs can differ by 270×. We break down when each model makes economic sense and how to migrate smoothly.",
  date: "July 4, 2026",
  author: "Gavin Chen & MindRose Team",
  slug: "openai-vs-deepseek-cost-comparison",
};

export function generateMetadata(): Metadata {
  return {
    title: META.title,
    description: META.description,
    alternates: { canonical: `${SITE_URL}/blog/openai-vs-deepseek-cost-comparison` },
    openGraph: { title: META.title, description: META.description, url: `${SITE_URL}/blog/openai-vs-deepseek-cost-comparison`, type: "article", siteName: "DeepSeek API Usage Dashboard & Cost Tracker", locale: "en_US", images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: META.title, type: "image/png" }] },
    twitter: { card: "summary_large_image", site: "@GavinCnod", creator: "@GavinCnod", title: META.title, description: META.description, images: [`${SITE_URL}/og-image.png`] },
    keywords: ["DeepSeek vs OpenAI", "OpenAI o3 pricing", "DeepSeek V4 Pro", "LLM cost comparison", "AI pricing 2026"],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <BlogArticlePage
      meta={META}
      content={{ en, zh }}
      prevPost={{ title: "Top 5 DeepSeek API Cost Optimization & Observability Tools", slug: "deepseek-cost-optimization-tools" }}
    />
  );
}
