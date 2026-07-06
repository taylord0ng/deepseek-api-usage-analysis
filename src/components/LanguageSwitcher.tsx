"use client";

import { useTranslation } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { switchLocalePath } from "@/lib/localeRouting";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * 语言切换组件
 *
 * Apple 风格 pill 分段控件 — 圆角胶囊切换。
 * 颜色通过 CSS 变量驱动，自动适配 light/dark 主题。
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 切换当前页面语言，并导航到对应语言 URL。
   *
   * 这里保留查询参数与 hash，保证文章锚点、活动参数等不会在切换时丢失。
   */
  function handleSwitch(nextLocale: "en" | "zh") {
    if (nextLocale === locale) return;

    const queryString = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const currentPath = `${pathname}${queryString ? `?${queryString}` : ""}${hash}`;
    const nextPath = switchLocalePath(currentPath, nextLocale);

    setLocale(nextLocale);
    trackEvent("language_switch", { event_label: nextLocale });
    router.push(nextPath);
  }

  return (
    <div
      className="flex items-center rounded-full text-xs font-medium"
      style={{ background: "var(--border)", padding: "2px" }}
      role="radiogroup"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        role="radio"
        aria-checked={locale === "en"}
        className="px-3 py-1 rounded-full transition-all duration-200"
        style={{
          background: locale === "en" ? "var(--bg-surface)" : "transparent",
          color: locale === "en" ? "var(--text-primary)" : "var(--text-tertiary)",
          boxShadow: locale === "en" ? "var(--shadow-sm)" : "none",
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("zh")}
        role="radio"
        aria-checked={locale === "zh"}
        className="px-3 py-1 rounded-full transition-all duration-200"
        style={{
          background: locale === "zh" ? "var(--bg-surface)" : "transparent",
          color: locale === "zh" ? "var(--text-primary)" : "var(--text-tertiary)",
          boxShadow: locale === "zh" ? "var(--shadow-sm)" : "none",
        }}
      >
        中文
      </button>
    </div>
  );
}
