"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/lib/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { agnesProject } from "@/lib/sisterProjects";

/* ===== SVG 图标组件 ===== */

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10Z" fill="currentColor"/>
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polygon points="12,4 16,16 12,13 8,16" fill="currentColor"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L9 19l-5 1 1-5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1.5V2.5M8 13.5V14.5M2.757 3.757L3.464 4.464M12.536 11.536L13.243 12.243M1.5 8H2.5M13.5 8H14.5M2.757 12.243L3.464 11.536M12.536 4.464L13.243 3.757" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 10.5a6 6 0 0 1-7-7 6 6 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
    </svg>
  );
}

/* ===== 主组件 ===== */

/**
 * 共享顶部导航栏
 *
 * Apple 极简风格，响应式双布局：
 * - 桌面端 (md+)：全部元素展开
 * - 移动端：Logo + 标题 + 语言切换 + ⋯ 菜单按钮
 *
 * 移动端菜单为 Apple 风格 popover，点击外部自动关闭。
 */
export default function TitleBar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  /** 点击菜单外部时关闭 */
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  /** 菜单项点击后关闭菜单 */
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--bg)" }}>
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* ====== 左侧：Logo + 标题（点击回首页）====== */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Home">
          <Image
            src="/ds-usage-logo.png"
            alt="DeepSeek Usage Logo"
            width={32}
            height={32}
            className="rounded-sm w-7 h-7 sm:w-8 sm:h-8"
            unoptimized
            priority
          />
          <span
            className="text-sm sm:text-base font-bold tracking-tight truncate max-w-[180px] sm:max-w-none"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            {t.app.title}
          </span>
        </Link>

        {/* ====== 右侧：桌面版全量展开 ====== */}
        <div className="hidden md:flex items-center gap-3">
          {/* Agnes AI 姊妹项目胶囊 */}
          <a
            href={agnesProject.trackedSiteUrls.header}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-[var(--bg-surface-hover)]"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            aria-label={t.header.sisterProjectTitle}
            title={t.header.sisterProjectTitle}
          >
            {t.header.sisterProject}
          </a>

          {/* GitHub */}
          <a
            href={agnesProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>

          {/* Guideline */}
          <Link
            href="/guideline"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label={t.guideline.pageTitle}
            title={t.guideline.pageTitle}
          >
            <CompassIcon />
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label={t.blog.pageTitle}
            title={t.blog.pageTitle}
          >
            <PenIcon />
          </Link>

          {/* Changelog */}
          <Link
            href="/changelog"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label={t.changelog.pageTitle}
            title={t.changelog.pageTitle}
          >
            <ClockIcon />
          </Link>

          <LanguageSwitcher />

          {/* 主题切换 */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            title={theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}
            aria-label={theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>

        {/* ====== 右侧：移动端 — 语言 + ⋯ ====== */}
        <div className="flex md:hidden items-center gap-1.5">
          <LanguageSwitcher />

          <button
            ref={btnRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:bg-[var(--border)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <MoreIcon />
          </button>

          {/* Apple 风格 popover 菜单 */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full right-3 mt-2 w-56 rounded-xl py-2 shadow-diffuse-md z-50"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Agnes AI */}
              <a
                href={agnesProject.trackedSiteUrls.header}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                  {t.header.sisterProject}
                </span>
              </a>

              <div className="my-1 mx-3" style={{ borderTop: "1px solid var(--border)" }} />

              {/* GitHub */}
              <a
                href={agnesProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="flex items-center justify-center w-5 h-5"><GitHubIcon /></span>
                <span>GitHub</span>
              </a>

              {/* Guideline */}
              <Link
                href="/guideline"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="flex items-center justify-center w-5 h-5"><CompassIcon /></span>
                <span>{t.guideline.pageTitle}</span>
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="flex items-center justify-center w-5 h-5"><PenIcon /></span>
                <span>{t.blog.pageTitle}</span>
              </Link>

              {/* Changelog */}
              <Link
                href="/changelog"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="flex items-center justify-center w-5 h-5"><ClockIcon /></span>
                <span>{t.changelog.pageTitle}</span>
              </Link>

              <div className="my-1 mx-3" style={{ borderTop: "1px solid var(--border)" }} />

              {/* 主题切换（内嵌） */}
              <button
                onClick={() => { toggleTheme(); closeMenu(); }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors duration-150 hover:bg-[var(--border)]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="flex items-center justify-center w-5 h-5">
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </span>
                <span>{theme === "light" ? t.theme.switchToDark : t.theme.switchToLight}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
