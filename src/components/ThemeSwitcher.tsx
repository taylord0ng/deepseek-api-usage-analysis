"use client";

/**
 * 主题切换按钮
 *
 * Apple 极简风格 — 一个纯文本按钮，点击切换 light/dark。
 * 使用 CSS 变量色，与全局主题系统联动。
 */

import { useTheme } from "@/lib/ThemeContext";
import { useTranslation } from "@/i18n";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="text-xs font-medium transition-colors duration-200"
      style={{ color: "var(--text-secondary)" }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.color = "var(--text-secondary)";
      }}
      title={theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}
    >
      {theme === "light" ? t.theme.dark : t.theme.light}
    </button>
  );
}
