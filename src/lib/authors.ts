/** 文件说明：站点作者身份与作者 SEO 元数据辅助模块。 */
import type { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { buildLocaleUrl } from "@/lib/localeRouting";

/** 站内作者页路径。 */
export const AUTHOR_PAGE_PATH = "/author";

/** 团队成员区块锚点 ID。 */
export const TEAM_MEMBERS_SECTION_ID = "team-members";

/** Gavin 的 LinkedIn 主页，用于作者外部身份信号。 */
export const GAVIN_LINKEDIN_URL =
  "https://www.linkedin.com/in/gavinchensongwen3188536a/";

/** MindRose 团队官网，用于组织身份信号。 */
export const MINDROSE_SITE_URL = "https://mindrose.xyz";

/**
 * 构建站内作者页绝对 URL。
 */
export function buildAuthorPageUrl(locale: Locale): string {
  return buildLocaleUrl(locale, AUTHOR_PAGE_PATH);
}

/**
 * 构建站内团队成员区块绝对 URL。
 */
export function buildTeamMembersUrl(locale: Locale): string {
  return `${buildAuthorPageUrl(locale)}#${TEAM_MEMBERS_SECTION_ID}`;
}

/**
 * 构建站点通用的作者元数据。
 *
 * 返回 Next.js Metadata 支持的 authors / creator / publisher 字段，
 * 供各独立页面复用，避免作者身份配置分散在各个路由文件中。
 */
export function buildAuthorMetadata(locale: Locale): Pick<
  Metadata,
  "authors" | "creator" | "publisher"
> {
  return {
    authors: [
      {
        name: "Gavin Chen",
        url: buildAuthorPageUrl(locale),
      },
      {
        name: "MindRose Team",
        url: buildTeamMembersUrl(locale),
      },
    ],
    creator: "Gavin Chen",
    publisher: "MindRose Team",
  };
}
