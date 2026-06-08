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

type Tab = "overview" | "keys" | "cache" | "trends";

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

  // Pre-upload state: just show the drop zone
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t.app.title}
            </h1>
            <p className="text-sm text-gray-500">
              {t.app.subtitle}
            </p>
          </div>
          <DropZone />
          <ErrorDisplay />
        </div>
      </div>
    );
  }

  // Post-upload state: full dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {t.app.title}
            </h1>
            <p className="text-sm text-gray-500">
              {fileName}
              {result.summary.dateRange && (
                <span className="ml-2">
                  · {result.summary.dateRange.start} ~ {result.summary.dateRange.end}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
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
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t.header.loadDifferent}
            </button>
            <button
              onClick={clear}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              {t.header.clear}
            </button>
          </div>
        </header>

        <ErrorDisplay />
        <WarningBanner />

        {/* KPI Cards */}
        <KPICards />

        {/* Tab navigation */}
        <nav className="flex gap-6 border-b border-gray-200 mb-6">
          {TABS.map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={`pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === tabItem.key
                  ? "text-gray-900 border-gray-800"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        {tab === "overview" && <OverviewView />}
        {tab === "keys" && <KeyView />}
        {tab === "cache" && <CacheView />}
        {tab === "trends" && <TrendsView />}

        {/* Footer */}
        <footer className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          {t.footer.text}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
