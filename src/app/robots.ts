/**
 * robots.txt — 爬虫规则
 *
 * 遵循 Next.js 16 App Router 约定：导出默认函数返回 MetadataRoute.Robots。
 * 构建时自动生成 /robots.txt，与 static export (output: "export") 兼容。
 */
import type { MetadataRoute } from "next";

/** 静态导出兼容：标记此路由在构建时静态生成 */
export const dynamic = "force-static";

/** 读取公开域名，构建时注入 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** 构建时生成 robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
