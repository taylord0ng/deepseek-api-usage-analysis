import { describe, it, expect } from "vitest";
import {
  buildArticleJsonLd,
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/schema";
import { getBlogArticleLocaleMeta } from "@/lib/blogArticles";
import translations from "@/i18n/translations";
import { buildLocaleUrl } from "@/lib/localeRouting";
import { OG_IMAGE_URL } from "@/lib/site";

describe("buildOrganizationJsonLd", () => {
  it("returns valid Organization schema for English", () => {
    const result = buildOrganizationJsonLd("en");

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Organization");
    expect(result.name).toContain("DeepSeek");
    expect(result.url).toContain("deepseek-usage.xyz");
    expect(result.logo).toContain("ds-usage-logo.png");
    expect(result.sameAs).toEqual(
      expect.arrayContaining([
        "https://github.com/GavinCnod/deepseek-api-usage-analysis",
      ])
    );
  });

  it("returns valid Organization schema for Chinese", () => {
    const result = buildOrganizationJsonLd("zh");

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Organization");
    expect(result.name).toContain("DeepSeek");
    // Chinese version should contain Chinese characters
    expect(result.name).toContain("用量分析");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("returns 6 breadcrumb items for English", () => {
    const result = buildBreadcrumbJsonLd("en");
    const items = result.itemListElement as Array<Record<string, unknown>>;

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(items).toHaveLength(6);

    expect(items[0].position).toBe(1);
    expect(items[0].name).toBe("DeepSeek API Usage Analytics Dashboard");

    expect(items[1].position).toBe(2);
    expect(items[1].name).toBe("User Guide");
    expect((items[1].item as string)).toContain("/guideline");

    expect(items[2].position).toBe(3);
    expect(items[2].name).toBe("Privacy Policy");

    expect(items[3].position).toBe(4);
    expect(items[3].name).toBe("Terms of Use");

    expect(items[4].position).toBe(5);
    expect(items[4].name).toBe("Changelog");

    expect(items[5].position).toBe(6);
    expect(items[5].name).toBe("Author");
    expect((items[5].item as string)).toContain("/author");
  });

  it("returns 6 breadcrumb items for Chinese", () => {
    const result = buildBreadcrumbJsonLd("zh");
    const items = result.itemListElement as Array<Record<string, unknown>>;

    expect(items).toHaveLength(6);
    expect(items[1].name).toBe("使用指南");
    expect(items[2].name).toBe("隐私政策");
    expect(items[3].name).toBe("使用条款");
    expect(items[4].name).toBe("更新日志");
    expect(items[5].name).toBe("作者");
  });
});

describe("buildFaqJsonLd", () => {
  it("reuses visible landing FAQ copy for English", () => {
    const result = buildFaqJsonLd("en");
    const items = result.mainEntity as Array<Record<string, unknown>>;

    expect(result["@type"]).toBe("FAQPage");
    expect(items).toHaveLength(9);
    expect(items[1].name).toBe(translations.en.landing.qaQ2);
    expect((items[1].acceptedAnswer as Record<string, unknown>).text).toBe(
      translations.en.landing.qaA2
    );
  });

  it("reuses visible landing FAQ copy for Chinese", () => {
    const result = buildFaqJsonLd("zh");
    const items = result.mainEntity as Array<Record<string, unknown>>;

    expect(items[2].name).toBe(translations.zh.landing.qaQ3);
    expect((items[2].acceptedAnswer as Record<string, unknown>).text).toBe(
      translations.zh.landing.qaA3
    );
  });
});

describe("buildArticleJsonLd", () => {
  it("builds Article schema that matches the shared blog metadata", () => {
    const meta = getBlogArticleLocaleMeta(
      "openai-claude-vs-deepseek-cost-comparison",
      "en"
    );
    const url = buildLocaleUrl("en", meta.pathname);
    const result = buildArticleJsonLd({
      locale: "en",
      headline: meta.title,
      description: meta.description,
      url,
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime,
      authorName: meta.author,
      imageUrl: OG_IMAGE_URL,
    });

    expect(result["@type"]).toBe("Article");
    expect(result.headline).toBe(meta.title);
    expect(result.datePublished).toBe(meta.publishedTime);
    expect(result.dateModified).toBe(meta.modifiedTime);
    expect(result.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": url,
    });

    const author = result.author as Record<string, unknown>;
    expect(author["@id"]).toBe(buildLocaleUrl("en", "/author"));
    expect(author.name).toBe(meta.author);
  });
});
