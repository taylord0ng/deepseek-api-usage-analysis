"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

/**
 * GitHub 图标 SVG
 */
function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * 共享顶部导航栏
 *
 * Apple 极简风格 — 左侧 logo + 应用名，右侧 GitHub + 语言/主题切换。
 * 底部细线分割，同时用于 Landing 和 Dashboard 页面。
 */
export default function TitleBar() {
  const { t } = useTranslation();

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/ds-usage-logo.png"
            alt="DeepSeek Usage Logo"
            width={32}
            height={32}
            className="rounded-sm"
            unoptimized
            priority
          />
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            {t.app.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/GavinCnod/deepseek-api-usage-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <Link
            href="/guideline"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label={t.guideline.pageTitle}
            title={t.guideline.pageTitle}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M8 7h8M8 11h8M8 15h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <Link
            href="/changelog"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label={t.changelog.pageTitle}
            title={t.changelog.pageTitle}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="12,6 12,12 16,14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
