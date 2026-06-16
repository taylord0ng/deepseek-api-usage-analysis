"use client";

import { useState, useRef, useCallback } from "react";
import { useData, ALL_MODELS } from "@/lib/DataContext";
import { useTranslation } from "@/i18n";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";
import LandingPage from "./LandingPage";
import KPICards from "./KPICards";
import OverviewView from "./OverviewView";
import KeyView from "./KeyView";
import CacheView from "./CacheView";
import TrendsView from "./TrendsView";
import ProjectView from "./ProjectView";
import ErrorDisplay, { WarningBanner } from "./ErrorDisplay";

type Tab = "overview" | "projects" | "keys" | "cache" | "trends";

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
  const { result, fileName, loadFiles, clear, selectedModel, setSelectedModel } = useData();
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("overview");
  const reuploadRef = useRef<HTMLInputElement>(null);

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: t.tabs.overview },
    { key: "projects", label: t.tabs.projects },
    { key: "keys", label: t.tabs.keys },
    { key: "cache", label: t.tabs.cache },
    { key: "trends", label: t.tabs.trends },
  ];

  const handleReupload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const fileArr = Array.from(files);

      const { concatMonthlyCSVs, extractZipCsvs } = await import("@/lib/concatFiles");
      const csvEntries = await extractZipCsvs(fileArr);
      if (csvEntries.length === 0) return;
      const result = await concatMonthlyCSVs(csvEntries);
      loadFiles(result.amountText, result.costText, result.label);
      e.target.value = "";
    },
    [loadFiles]
  );

  // 上传前状态：展示 Landing 落地页
  if (!result) {
    return <LandingPage />;
  }

  // 数据加载后：完整仪表盘
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      <TitleBar />

      {/* 语义化 H1：对屏幕阅读器和搜索引擎可见，视觉隐藏 */}
      <h1 className="sr-only">{t.app.title}</h1>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Action bar — 文件信息 + 操作按钮 */}
        <div className="flex items-start justify-between mb-10">
          <div>
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
            <input
              ref={reuploadRef}
              type="file"
              multiple
              accept=".csv,.zip"
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
        </div>

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

        {/* 模型筛选 — Apple 风格分段控件 / 胶囊按钮 */}
        {result.summary.models.length > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 p-1 rounded-full" style={{ background: "var(--border)" }}>
              <button
                onClick={() => setSelectedModel(ALL_MODELS)}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                style={{
                  background: selectedModel === ALL_MODELS ? "var(--text-primary)" : "transparent",
                  color: selectedModel === ALL_MODELS ? "var(--accent-inverse)" : "var(--text-tertiary)",
                }}
              >
                {t.modelFilter.allModels}
              </button>
              {result.summary.models.map((model) => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className="px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                  style={{
                    background: selectedModel === model ? "var(--text-primary)" : "transparent",
                    color: selectedModel === model ? "var(--accent-inverse)" : "var(--text-tertiary)",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedModel !== model)
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    if (selectedModel !== model)
                      (e.target as HTMLElement).style.color = "var(--text-tertiary)";
                  }}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 内容区 */}
        <div className="animate-fade-in">
          {tab === "overview" && <OverviewView />}
          {tab === "projects" && <ProjectView />}
          {tab === "keys" && <KeyView />}
          {tab === "cache" && <CacheView />}
          {tab === "trends" && <TrendsView />}
        </div>
      </div>

      <FooterBar />
    </div>
  );
}
