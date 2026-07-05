/** 文件说明：站点作者身份与作者 SEO 元数据辅助模块。 */
import type { Metadata } from "next";

/** 站内作者页路径。 */
export const AUTHOR_PAGE_PATH = "/author";

/** 团队成员区块锚点 ID。 */
export const TEAM_MEMBERS_SECTION_ID = "team-members";

/** 站点公开 URL（构建时从 .env 注入）。 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** 站内作者页绝对 URL。 */
export const AUTHOR_PAGE_URL = `${SITE_URL}${AUTHOR_PAGE_PATH}`;

/** 站内团队成员区块绝对 URL。 */
export const TEAM_MEMBERS_URL = `${AUTHOR_PAGE_URL}#${TEAM_MEMBERS_SECTION_ID}`;

/** Gavin 的 LinkedIn 主页，用于作者外部身份信号。 */
export const GAVIN_LINKEDIN_URL =
  "https://www.linkedin.com/in/gavinchensongwen3188536a/";

/** MindRose 团队官网，用于组织身份信号。 */
export const MINDROSE_SITE_URL = "https://mindrose.xyz";

/**
 * 构建站点通用的作者元数据。
 *
 * 返回 Next.js Metadata 支持的 authors / creator / publisher 字段，
 * 供各独立页面复用，避免作者身份配置分散在各个路由文件中。
 */
export function buildAuthorMetadata(): Pick<
  Metadata,
  "authors" | "creator" | "publisher"
> {
  return {
    authors: [
      {
        name: "Gavin Chen",
        url: AUTHOR_PAGE_URL,
      },
      {
        name: "MindRose Team",
        url: TEAM_MEMBERS_URL,
      },
    ],
    creator: "Gavin Chen",
    publisher: "MindRose Team",
  };
}
