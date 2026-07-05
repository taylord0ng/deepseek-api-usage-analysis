import type { Metadata } from "next";
import { CostTrackerPage } from "@/components/CostTrackerPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

export function generateMetadata(): Metadata {
  const title = "DeepSeek API Cost Tracker | Free & Secure Billing Dashboard";
  const description =
    "Track your DeepSeek API costs instantly. Drop your billing CSVs and get daily cost breakdowns, per-key attribution, and cache hit rate monitoring — 100% browser-side, no signup required.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/deepseek-api-cost-tracker`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/deepseek-api-cost-tracker`,
      type: "website",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "DeepSeek API Cost Tracker — free, private, open source",
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
      "DeepSeek API cost tracker",
      "DeepSeek billing dashboard",
      "DeepSeek cost analyzer",
      "DeepSeek API cost monitoring",
      "free DeepSeek cost tool",
    ],
    authors: [{ name: "Gavin & Mindrose Team" }],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CostTrackerRoute() {
  return <CostTrackerPage />;
}
