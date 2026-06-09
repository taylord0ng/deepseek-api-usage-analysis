"use client";

import { useState, useRef, useCallback } from "react";
import { useData } from "@/lib/DataContext";
import { useTranslation } from "@/i18n";
import DropZone from "./DropZone";
import KPICards from "./KPICards";
import OverviewView from "./OverviewView";
import KeyView from "./KeyView";
import CacheView from "./CacheView";
import TrendsView from "./TrendsView";
import ErrorDisplay, { WarningBanner } from "./ErrorDisplay";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

type Tab = "overview" | "keys" | "cache" | "trends";

/**
 * 主仪表盘组件
 *
 * Apple 极简风格重构：
 * - 冷灰纸质感背景（#F5F5F7 / #000000）
 * - 大留白、呼吸感间距
 * - "无卡片"式布局：通栏模块 + 细横线分割
 * - 微圆角、弥散阴影（仅在必须时使用）
 * - 文字主色深炭黑，辅色优雅灰
 * - 完整的 light/dark 双主题支持
 */
export default function Dashboard() {
  const { result, fileName, loadFiles, clear } = useData();
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("overview");
  const reuploadRef = useRef<HTMLInputElement>(null);

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: t.tabs.overview },
    { key: "keys", label: t.tabs.keys },
    { key: "cache", label: t.tabs.cache },
    { key: "trends", label: t.tabs.trends },
  ];

  const handleReupload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const fileArr = Array.from(files);

      const { concatMonthlyCSVs } = await import("@/lib/concatFiles");
      const result = await concatMonthlyCSVs(fileArr);
      loadFiles(result.amountText, result.costText, result.label);
      e.target.value = "";
    },
    [loadFiles]
  );

  // 上传前状态：仅展示拖拽区
  if (!result) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ background: "var(--bg)" }}
      >
        <div className="w-full max-w-lg">
          {/* 标题区 */}
          <div className="text-center mb-10">
            <h1
              className="text-2xl font-bold mb-3 tracking-tight"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              {t.app.title}
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.app.subtitle}
            </p>
          </div>

          <DropZone />
          <ErrorDisplay />

          {/* 底部操作栏 */}
          <div className="flex justify-center gap-4 mt-8">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    );
  }

  // 数据加载后：完整仪表盘
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header — 大留白 */}
        <header className="flex items-start justify-between mb-10">
          <div>
            <h1
              className="text-xl font-bold tracking-tight mb-1"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              {t.app.title}
            </h1>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {fileName}
              {result.summary.dateRange && (
                <span className="ml-2">
                  · {result.summary.dateRange.start} — {result.summary.dateRange.end}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <input
              ref={reuploadRef}
              type="file"
              multiple
              accept=".csv"
              className="hidden"
              onChange={handleReupload}
            />
            <button
              onClick={() => reuploadRef.current?.click()}
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {t.header.loadDifferent}
            </button>
            <button
              onClick={clear}
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--danger)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = "1";
              }}
            >
              {t.header.clear}
            </button>
          </div>
        </header>

        <ErrorDisplay />
        <WarningBanner />

        {/* KPI 指标 */}
        <KPICards />

        {/* Tab 导航 — Apple 风格下划线 */}
        <nav className="flex gap-8 mb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          {TABS.map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={`pb-3 text-xs font-semibold tracking-wide uppercase transition-all duration-200 border-b-2 -mb-px ${
                tab === tabItem.key
                  ? "border-accent"
                  : "border-transparent"
              }`}
              style={{
                color: tab === tabItem.key
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)",
              }}
            >
              {tabItem.label}
            </button>
          ))}
        </nav>

        {/* Tab 内容区 */}
        <div className="animate-fade-in">
          {tab === "overview" && <OverviewView />}
          {tab === "keys" && <KeyView />}
          {tab === "cache" && <CacheView />}
          {tab === "trends" && <TrendsView />}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-6 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
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
      </div>
    </div>
  );
}
