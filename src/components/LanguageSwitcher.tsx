"use client";

import { useTranslation } from"@/i18n";

/**
 * 语言切换组件
 *
 * Apple 极简风格 — 纯文本按钮 + 选中下划线。
 * 颜色通过 CSS 变量驱动，自动适配 light/dark 主题。
 */
export default function LanguageSwitcher() {
 const { locale, setLocale, t } = useTranslation();

 return (
 <div className="flex items-center gap-2.5 text-xs">
  <span style={{ color: "var(--text-tertiary)" }}>{t.langSwitcher.label}</span>
  <button
  onClick={() => setLocale("en")}
  style={{ color: locale ==="en" ? "var(--text-primary)" : "var(--text-tertiary)" }}
  className="pb-0.5 border-b border-transparent transition-all duration-200"
  >
  EN
  </button>
  <button
  onClick={() => setLocale("zh")}
  style={{ color: locale ==="zh" ? "var(--text-primary)" : "var(--text-tertiary)" }}
  className="pb-0.5 border-b border-transparent transition-all duration-200"
  >
  中文
  </button>
 </div>
 );
}
