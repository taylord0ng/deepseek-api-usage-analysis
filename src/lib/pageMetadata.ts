/**
 * 文件说明：页面级 SEO Metadata 生成辅助模块。
 *
 * 统一处理：
 * - locale 对应的 title / description / keywords
 * - canonical 与 alternates.languages
 * - OpenGraph / Twitter 的语言与 URL
 * - 站点作者元数据
 */
import type { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { buildAuthorMetadata } from "@/lib/authors";
import {
  buildLocaleAlternates,
  buildLocaleUrl,
  getOpenGraphLocale,
} from "@/lib/localeRouting";
import { OG_IMAGE_URL, SITE_NAME } from "@/lib/site";

/** 支持中英文的文案映射。 */
export interface LocalizedSeoText {
  en: string;
  zh: string;
}

/** 页面级 Metadata 生成参数。 */
export interface LocalizedPageMetadataInput {
  pathname: string;
  title: LocalizedSeoText;
  description: LocalizedSeoText;
  keywords: Record<Locale, string[]>;
  openGraphType?: "website" | "article" | "profile";
  siteName?: string;
  imageUrl?: string;
  imageAlt?: LocalizedSeoText;
  publishedTime?: string;
  modifiedTime?: string;
  robots?: Metadata["robots"];
}

/**
 * 按 locale 生成统一的页面级 Metadata。
 */
export function buildLocalizedPageMetadata(
  locale: Locale,
  input: LocalizedPageMetadataInput
): Metadata {
  const title = input.title[locale];
  const description = input.description[locale];
  const canonicalUrl = buildLocaleUrl(locale, input.pathname);
  const imageUrl = input.imageUrl ?? OG_IMAGE_URL;
  const imageAlt = input.imageAlt?.[locale] ?? title;
  const openGraphType = input.openGraphType ?? "website";
  const openGraphLocale = getOpenGraphLocale(locale);
  const alternateLocale = locale === "zh" ? "en_US" : "zh_CN";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLocaleAlternates(input.pathname),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: openGraphType,
      siteName: input.siteName ?? SITE_NAME,
      locale: openGraphLocale,
      alternateLocale: [alternateLocale],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
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
      images: [imageUrl],
    },
    keywords: input.keywords[locale],
    ...buildAuthorMetadata(locale),
    robots: input.robots ?? {
      index: true,
      follow: true,
    },
  };
}
