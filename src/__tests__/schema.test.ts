import { describe, it, expect } from "vitest";
import {
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/schema";

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
