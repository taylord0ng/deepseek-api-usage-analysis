"use client";

import { useTranslation } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

/**
 * 共享顶部导航栏
 *
 * Apple 极简风格 — 左侧应用名，右侧语言/主题切换。
 * 底部细线分割，同时用于 Landing 和 Dashboard 页面。
 */
export default function TitleBar() {
  const { t } = useTranslation();

  return (
    <header
      className="sticky top-0 z-10"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h1
          className="text-base font-bold tracking-tight"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
        >
          {t.app.title}
        </h1>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
