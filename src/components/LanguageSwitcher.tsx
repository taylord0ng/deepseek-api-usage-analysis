"use client";

import { useTranslation } from "@/i18n";
import { trackEvent } from "@/lib/analytics";

/**
 * 语言切换组件
 *
 * Apple 风格 pill 分段控件 — 圆角胶囊切换。
 * 颜色通过 CSS 变量驱动，自动适配 light/dark 主题。
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      className="flex items-center rounded-full text-xs font-medium"
      style={{ background: "var(--border)", padding: "2px" }}
      role="radiogroup"
      aria-label="Language"
    >
      <button
        onClick={() => { setLocale("en"); trackEvent("language_switch", { event_label: "en" }); }}
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
        onClick={() => { setLocale("zh"); trackEvent("language_switch", { event_label: "zh" }); }}
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
