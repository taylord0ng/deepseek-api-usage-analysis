import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("returns 5 entries", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(5);
  });

  it("includes all expected routes", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls.some((u) => !u.includes("/guideline") && !u.includes("/privacy") && !u.includes("/terms") && !u.includes("/changelog"))).toBe(true); // home
    expect(urls.some((u) => u.endsWith("/guideline"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/privacy"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/terms"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/changelog"))).toBe(true);
  });

  it("has differentiated lastModified dates", () => {
    const entries = sitemap();

    // home and changelog use buildDate (today), privacy/terms use 2026-06-08
    const privacyEntry = entries.find((e) => e.url.endsWith("/privacy"))!;
    const changelogEntry = entries.find((e) => e.url.endsWith("/changelog"))!;

    // Privacy should have an older date than changelog
    expect(
      new Date(privacyEntry.lastModified!).getTime()
    ).toBeLessThan(
      new Date(changelogEntry.lastModified!).getTime()
    );
  });

  it("assigns correct priorities", () => {
    const entries = sitemap();

    const home = entries.find(
      (e) => !e.url.includes("/guideline") && !e.url.includes("/privacy") && !e.url.includes("/terms") && !e.url.includes("/changelog")
    );
    expect(home?.priority).toBe(1);

    const guideline = entries.find((e) => e.url.endsWith("/guideline"));
    expect(guideline?.priority).toBe(0.8);

    const privacy = entries.find((e) => e.url.endsWith("/privacy"));
    expect(privacy?.priority).toBe(0.5);
  });

  it("sets yearly changeFrequency for static pages", () => {
    const entries = sitemap();

    const privacy = entries.find((e) => e.url.endsWith("/privacy"))!;
    expect(privacy.changeFrequency).toBe("yearly");

    const terms = entries.find((e) => e.url.endsWith("/terms"))!;
    expect(terms.changeFrequency).toBe("yearly");
  });
});
