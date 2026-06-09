"use client";

/**
 * 主题切换按钮
 *
 * Apple 风格 — 圆形图标按钮，太阳/月亮 SVG 切换 light/dark。
 * 颜色通过 CSS 变量驱动，与全局主题系统联动。
 */

import { useTheme } from "@/lib/ThemeContext";
import { useTranslation } from "@/i18n";

/**
 * 太阳图标（浅色模式）
 */
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1.5V2.5M8 13.5V14.5M2.757 3.757L3.464 4.464M12.536 11.536L13.243 12.243M1.5 8H2.5M13.5 8H14.5M2.757 12.243L3.464 11.536M12.536 4.464L13.243 3.757"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 月亮图标（深色模式）
 */
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 10.5a6 6 0 0 1-7-7 6 6 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
      style={{ color: "var(--text-secondary)" }}
      title={theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}
      aria-label={theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
