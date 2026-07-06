import { describe, expect, it } from "vitest";
import {
  buildLocalePath,
  getLocaleFromPathname,
  isZhPathname,
  switchLocalePath,
} from "@/lib/localeRouting";

describe("isZhPathname", () => {
  it("识别 /zh 根路径", () => {
    expect(isZhPathname("/zh")).toBe(true);
  });

  it("识别 /zh 子路径", () => {
    expect(isZhPathname("/zh/blog")).toBe(true);
  });

  it("忽略英文无前缀路径", () => {
    expect(isZhPathname("/blog")).toBe(false);
  });

  it("不会误判相似前缀", () => {
    expect(isZhPathname("/zh-cn/blog")).toBe(false);
  });
});

describe("getLocaleFromPathname", () => {
  it("为中文镜像路由返回 zh", () => {
    expect(getLocaleFromPathname("/zh/privacy")).toBe("zh");
  });

  it("为英文无前缀路由返回 en", () => {
    expect(getLocaleFromPathname("/privacy")).toBe("en");
  });
});

describe("buildLocalePath", () => {
  it("为中文首页生成 /zh", () => {
    expect(buildLocalePath("/", "zh")).toBe("/zh");
  });

  it("为英文首页生成 /", () => {
    expect(buildLocalePath("/zh", "en")).toBe("/");
  });

  it("为中文页面追加 /zh 前缀", () => {
    expect(buildLocalePath("/blog", "zh")).toBe("/zh/blog");
  });

  it("为英文页面移除 /zh 前缀", () => {
    expect(buildLocalePath("/zh/blog", "en")).toBe("/blog");
  });

  it("保留查询参数与 hash", () => {
    expect(buildLocalePath("/blog?a=1#top", "zh")).toBe("/zh/blog?a=1#top");
  });
});

describe("switchLocalePath", () => {
  it("将中文页切回英文页", () => {
    expect(switchLocalePath("/zh/privacy", "en")).toBe("/privacy");
  });

  it("将英文页切到中文页", () => {
    expect(switchLocalePath("/blog/deepseek-context-caching-guide", "zh")).toBe(
      "/zh/blog/deepseek-context-caching-guide"
    );
  });
});
