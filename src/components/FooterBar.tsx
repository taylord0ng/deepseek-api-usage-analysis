"use client";

import { useTranslation } from "@/i18n";

/**
 * 共享页脚组件
 *
 * Apple 极简风格 — 细横线分割 + 居中文字 + GitHub 链接。
 * 同时用于 Landing 和 Dashboard 页面。
 */
export default function FooterBar() {
  const { t } = useTranslation();

  return (
    <footer
      className="max-w-6xl mx-auto px-6 pt-6 pb-8 text-center text-xs"
      style={{ color: "var(--text-tertiary)" }}
    >
      <hr style={{ borderColor: "var(--border)", marginBottom: "1.5rem" }} />
      {t.footer.text}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-200 ml-1"
        style={{ color: "var(--text-secondary)" }}
      >
        GitHub
      </a>
    </footer>
  );
}
