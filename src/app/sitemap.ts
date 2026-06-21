/**
 * sitemap.xml — 静态站点地图
 *
 * 遵循 Next.js 16 App Router 约定：导出默认函数返回 MetadataRoute.Sitemap。
 * 构建时自动生成 /sitemap.xml，与 static export (output: "export") 兼容。
 * 站点域名从 .env 的 NEXT_PUBLIC_SITE_URL 读取。
 */
import type { MetadataRoute } from "next";

/** 静态导出兼容：标记此路由在构建时静态生成 */
export const dynamic = "force-static";

/** 读取公开域名，构建时注入 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** 构建时生成 sitemap.xml 条目，lastModified 按实际更新频率差异化设置 */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/guideline`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
