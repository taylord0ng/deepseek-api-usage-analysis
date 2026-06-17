"use client";

/**
 * 社交媒体分享弹窗组件
 *
 * 提供分享卡片预览、自定义输入表单、图片生成与导出功能：
 * - 实时预览：ShareCard 缩略版 + 用户输入实时反映
 * - "From XXX" 姓名/团队名输入（大号署名，localStorage 持久化）
 * - 自定义文案输入（可选，引文样式）
 * - 一键复制到剪贴板（适配微信/飞书/钉钉粘贴）
 * - 下载 PNG 文件
 * - 二维码指向 deepseek-usage.xyz
 * - 应用 Logo + 水印品牌标识
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { useData } from "@/lib/DataContext";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/lib/ThemeContext";
import { useProjectConfig } from "@/lib/ProjectConfigContext";
import { extractShareCardData } from "@/lib/shareCardData";
import type { ShareTab, ShareCardData } from "@/lib/shareCardData";
import ShareCard, { CARD_W, CARD_H, type ShareCardStrings } from "./ShareCard";

// ============================================================================
// localStorage
// ============================================================================

const STORAGE_SHARE_NAME = "ds-share-name";

function loadShareName(): string {
  try { return localStorage.getItem(STORAGE_SHARE_NAME) ?? ""; } catch { return ""; }
}
function saveShareName(name: string): void {
  try { localStorage.setItem(STORAGE_SHARE_NAME, name.trim()); } catch { /* ignore */ }
}

// ============================================================================
// 常量
// ============================================================================

/** 图表就绪最大等待时间（ms），超时后仍允许捕获 */
const CHART_READY_TIMEOUT = 5000;

// ============================================================================
// Props
// ============================================================================

export interface ShareModalProps {
  tab: ShareTab;
  onClose: () => void;
}

// ============================================================================
// 主组件
// ============================================================================

export default function ShareModal({ tab, onClose }: ShareModalProps) {
  const { filteredResult: result } = useData();
  const { t, locale } = useTranslation();
  const { theme } = useTheme();
  const { config: projectConfig } = useProjectConfig();

  const [fromName, setFromName] = useState<string>(loadShareName);
  const [customMessage, setCustomMessage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [chartsReady, setChartsReady] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const captureRef = useRef<HTMLDivElement>(null);
  const chartsReadyRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 二维码生成
  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL("https://deepseek-usage.xyz", {
      width: 160,
      margin: 1,
      color: { dark: theme === "dark" ? "#F5F5F7" : "#1D1D1F", light: "#00000000" },
    }).then((url) => { if (!cancelled) setQrDataUrl(url); });
    return () => { cancelled = true; };
  }, [theme]);

  // 提取分享数据
  const shareData: ShareCardData | null = useMemo(() => {
    if (!result) return null;
    return extractShareCardData({
      tab, result, projectConfig,
      uncategorizedLabel: t.projects.uncategorized,
      trendMetricLabel: t.trends.dailyCost,
    });
  }, [tab, result, projectConfig, t]);

  // 翻译字符串
  const cardStrings: ShareCardStrings = useMemo(() => ({
    tabLabel: ({
      overview: t.tabs.overview, projects: t.tabs.projects,
      keys: t.tabs.keys, cache: t.tabs.cache, trends: t.tabs.trends,
    } as Record<string, string>)[tab] ?? tab,
    appName: t.app.title,
    kpiTotalCost: t.kpi.totalCost,
    kpiTotalTokens: t.kpi.totalTokens,
    kpiCacheHitRate: t.kpi.cacheHitRate,
    kpiActiveKeys: t.kpi.activeKeys,
    kpiModels: t.kpi.models.replace("{count}", "").trim(),
    projectsLabel: t.tabs.projects,
    keysLabel: t.tabs.keys,
    tokensSavedLabel: t.kpi.saved.replace("{tokens}", "").trim(),
    uncategorizedLabel: t.projects.uncategorized,
    cacheHitsLabel: t.cache.hits,
    cacheMissesLabel: t.cache.misses,
    peakLabel: t.share.peak,
    lowestLabel: t.share.lowest,
    dailyAverageLabel: t.share.dailyAverage,
    generatedBy: t.share.generatedBy,
    scanToVisit: t.share.scanToVisit,
    costHeader: t.keys.cost,
    tokensHeader: t.keys.tokens,
  }), [tab, t]);

  // 图表就绪回调（带超时兜底）
  const handleChartsReady = useCallback(() => {
    if (chartsReadyRef.current) return;
    chartsReadyRef.current = true;
    setChartsReady(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // 超时兜底：防止 ECharts 加载失败导致按钮永久禁用
  const startChartTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (!chartsReadyRef.current) {
        chartsReadyRef.current = true;
        setChartsReady(true);
      }
    }, CHART_READY_TIMEOUT);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 捕获图片
  const captureImage = useCallback(async (): Promise<Blob | null> => {
    const el = captureRef.current;
    if (!el) return null;
    try {
      const canvas = await html2canvas(el, {
        width: CARD_W, height: CARD_H, scale: 2,
        useCORS: true, allowTaint: true,
        backgroundColor: null,
      });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
      });
    } catch (err) {
      console.error("ShareCard capture failed:", err);
      return null;
    }
  }, []);

  // 复制到剪贴板
  const handleCopy = useCallback(async () => {
    setIsCapturing(true);
    try {
      const blob = await captureImage();
      if (!blob) { setToastMessage(t.share.generateFailed); return; }
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setToastMessage(t.share.copiedToast);
      } else {
        downloadBlob(blob);
        setToastMessage(t.share.clipboardUnsupported);
      }
    } catch (err) {
      console.error("Copy failed:", err);
      setToastMessage(t.share.copyFailed);
    } finally {
      setIsCapturing(false);
      setTimeout(() => setToastMessage(null), 3500);
    }
  }, [captureImage, t]);

  // 下载 PNG
  const handleDownload = useCallback(async () => {
    setIsCapturing(true);
    try {
      const blob = await captureImage();
      if (!blob) { setToastMessage(t.share.generateFailed); return; }
      downloadBlob(blob);
    } catch { setToastMessage(t.share.downloadFailed); }
    finally { setIsCapturing(false); }
  }, [captureImage, t]);

  const handleNameChange = useCallback((value: string) => {
    setFromName(value);
    saveShareName(value);
  }, []);

  const PREVIEW_SCALE = 0.38;

  if (!result || !shareData) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="flex flex-col max-h-[92vh] w-[95vw] max-w-[680px] rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            {t.share.modalTitle}
          </h2>
          <button
            onClick={onClose} className="p-1 rounded-full transition-colors duration-150"
            style={{ color: "var(--text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* 预览区 */}
          <div
            className="mx-auto shrink-0 rounded-lg overflow-hidden"
            style={{ width: CARD_W * PREVIEW_SCALE, height: CARD_H * PREVIEW_SCALE, border: "1px solid var(--border)", background: "var(--bg)" }}
          >
            <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left", width: CARD_W, height: CARD_H }}>
              {qrDataUrl && (
                <ShareCard result={result} data={shareData} fromName={fromName}
                  customMessage={customMessage} theme={theme} locale={locale}
                  qrDataUrl={qrDataUrl} s={cardStrings} />
              )}
            </div>
          </div>

          {/* 输入表单 */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                {t.share.yourName}
              </label>
              <input type="text" value={fromName} onChange={(e) => handleNameChange(e.target.value)}
                placeholder={t.share.namePlaceholder}
                className="w-full px-3 py-2 text-sm rounded-subtle outline-none transition-colors duration-150"
                style={{ color: "var(--text-primary)", background: "var(--bg)", border: "1px solid var(--border)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }} />
              <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                {t.share.nameHint}
              </p>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                {t.share.messageLabel}
              </label>
              <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={t.share.messagePlaceholder} rows={2}
                className="w-full px-3 py-2 text-sm rounded-subtle outline-none resize-none transition-colors duration-150"
                style={{ color: "var(--text-primary)", background: "var(--bg)", border: "1px solid var(--border)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }} />
              <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                {t.share.messageHint}
              </p>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="px-6 py-4 shrink-0 flex items-center gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={handleCopy} disabled={isCapturing || !fromName.trim() || !chartsReady}
            className="flex-1 py-2.5 text-sm font-semibold rounded-subtle transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "var(--accent-inverse)", background: "var(--text-primary)" }}
            onMouseEnter={(e) => { if (!isCapturing && fromName.trim()) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { if (!isCapturing && fromName.trim()) e.currentTarget.style.opacity = "1"; }}>
            {isCapturing ? t.share.generating : !chartsReady ? t.share.generating : t.share.generateAndCopy}
          </button>
          <button onClick={handleDownload} disabled={isCapturing || !fromName.trim() || !chartsReady}
            className="py-2.5 px-4 text-sm font-medium rounded-subtle transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)", background: "transparent" }}
            onMouseEnter={(e) => { if (!isCapturing && fromName.trim()) e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { if (!isCapturing && fromName.trim()) e.currentTarget.style.color = "var(--text-secondary)"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1.5 -mt-0.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t.share.downloadPNG}
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium animate-fade-in"
            style={{ background: "var(--text-primary)", color: "var(--accent-inverse)", boxShadow: "var(--shadow-md)" }}>
            {toastMessage}
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/* 捕获用 ShareCard（离屏渲染，确保 html2canvas 正常捕获） */}
      {/* ================================================================ */}
      <div ref={captureRef} style={{ position: "fixed", left: -9999, top: 0, width: CARD_W, height: CARD_H }}>
        {qrDataUrl && (
          <ShareCard result={result} data={shareData} fromName={fromName}
            customMessage={customMessage} theme={theme} locale={locale}
            qrDataUrl={qrDataUrl} s={cardStrings} onChartsReady={() => { handleChartsReady(); startChartTimeout(); }} />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 工具
// ============================================================================

function downloadBlob(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "deepseek-usage-share.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
