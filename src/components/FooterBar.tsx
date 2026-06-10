"use client";

import { useTranslation } from "@/i18n";

/** 应用版本号，与 package.json 保持同步 */
const APP_VERSION = "0.3.0";

/** GitHub 仓库地址 */
const GITHUB_URL = "https://github.com/GavinCnod/deepseek-api-usage-analysis";

/**
 * FooterBar 属性
 *
 * @param animate - 是否启用渐显动画（Landing 页使用）
 * @param sectionRef - 用于 IntersectionObserver 注册的回调 ref
 */
interface FooterBarProps {
  animate?: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

/**
 * 共享页脚组件
 *
 * Apple 极简风格 — 细横线分割 + 居中文字 + GitHub 链接 + 版本号。
 * 支持移动端自动换行，通过 flex-wrap 确保小屏幕友好显示。
 * 可选 reveal-section 渐显动画，专用于 Landing 页面。
 */
export default function FooterBar({ animate = false, sectionRef }: FooterBarProps) {
  const { t } = useTranslation();

  const content = (
    <footer
      className="max-w-6xl mx-auto px-6 pt-6 pb-8 text-center"
      style={{ color: "var(--text-tertiary)" }}
    >
      <hr style={{ borderColor: "var(--border)", marginBottom: "1.5rem" }} />

      {/* 使用 flex-wrap 确保移动端文字换行时保持居中 */}
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs">
        <span>{t.footer.text}</span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:underline underline-offset-2"
          style={{ color: "var(--text-secondary)" }}
          aria-label="GitHub repository"
        >
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <span>
          {t.footer.version} v{APP_VERSION}
        </span>
      </div>
    </footer>
  );

  /* 当启用渐显动画时，包一层 reveal-section 容器供 IntersectionObserver 触发 */
  if (animate) {
    return (
      <div className="reveal-section" ref={sectionRef}>
        {content}
      </div>
    );
  }

  return content;
}
