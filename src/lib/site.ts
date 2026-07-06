/**
 * 文件说明：站点级公开常量。
 *
 * 统一维护站点域名、站点名称与常用公开资源 URL，
 * 避免 metadata、JSON-LD、sitemap 在不同模块中各自写死。
 */

/** 站点公开 URL。 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** 站点名称。 */
export const SITE_NAME = "DeepSeek API Usage Dashboard & Cost Tracker";

/** OpenGraph 预览图 URL。 */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

/** 站点 Logo PNG URL。 */
export const LOGO_IMAGE_URL = `${SITE_URL}/ds-usage-logo.png`;
