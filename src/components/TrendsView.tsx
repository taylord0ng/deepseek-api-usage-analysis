"use client";

import { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useData } from "@/lib/DataContext";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/lib/ThemeContext";
import { formatCost, formatTokens } from "@/lib/format";

type MetricKey = "cost" | "tokens" | "cacheHitRate" | "requests";

/**
 * 趋势视图：多指标可切换折线图
 *
 * Apple 极简风格 — 指标切换为纯文字标签 + 选中下划线。
 * 图表面积使用极淡弥散渐变，几乎不可见。
 * 配色跟随 light/dark 主题。
 * 顶部 Hero 大数字动态展示当前选中指标的汇总值。
 */
export default function TrendsView() {
  const { filteredResult: result } = useData();
  const { locale, t } = useTranslation();
  const { theme } = useTheme();
  const [metric, setMetric] = useState<MetricKey>("cost");
  if (!result) return null;

  const { daily } = result;
  const dates = [...new Set(daily.map((d) => d.date))].sort();
  const isDark = theme === "dark";

  const textColor = isDark ? "#98989D" : "#86868B";
  const gridColor = isDark ? "#2C2C2E" : "#E5E5EA";
  const lineColor = isDark ? "#F5F5F7" : "#1D1D1F";

  const METRICS: { key: MetricKey; label: string; format: (v: number) => string }[] = [
    { key: "cost", label: t.trends.dailyCost, format: (v) => `¥${v.toFixed(2)}` },
    { key: "tokens", label: t.trends.dailyTokens, format: (v) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)) },
    { key: "cacheHitRate", label: t.trends.cacheHitRate, format: (v) => `${(v * 100).toFixed(1)}%` },
    { key: "requests", label: t.trends.requestCount, format: (v) => String(v) },
  ];

  // 计算当前指标的汇总值（用于 Hero）
  const heroValue = useMemo(() => {
    let total = 0;
    let totalHit = 0;
    let totalMiss = 0;

    for (const d of daily) {
      switch (metric) {
        case "cost":
          total += d.cost ?? 0;
          break;
        case "tokens":
          total += d.outputTokens + d.inputCacheHitTokens + d.inputCacheMissTokens;
          break;
        case "cacheHitRate":
          totalHit += d.inputCacheHitTokens;
          totalMiss += d.inputCacheMissTokens;
          break;
        case "requests":
          total += d.requestCount;
          break;
      }
    }

    if (metric === "cacheHitRate") {
      return totalHit + totalMiss > 0 ? totalHit / (totalHit + totalMiss) : 0;
    }
    return total;
  }, [daily, metric]);

  const activeMetric = METRICS.find((m) => m.key === metric)!;

  // Hero 大数字格式化
  const heroFormatted = useMemo(() => {
    if (metric === "cost") return formatCost(heroValue, locale);
    if (metric === "tokens") return formatTokens(heroValue, locale);
    if (metric === "cacheHitRate") return `${(heroValue * 100).toFixed(1)}%`;
    return heroValue.toLocaleString();
  }, [metric, heroValue, locale]);

  const option = useMemo(() => {
    const byDate = new Map<string, number>();
    for (const d of daily) {
      let val: number;
      switch (metric) {
        case "cost":
          val = d.cost ?? 0;
          break;
        case "tokens":
          val = d.outputTokens + d.inputCacheHitTokens + d.inputCacheMissTokens;
          break;
        case "cacheHitRate": {
          const hit = d.inputCacheHitTokens;
          const miss = d.inputCacheMissTokens;
          val = hit + miss > 0 ? hit / (hit + miss) : 0;
          break;
        }
        case "requests":
          val = d.requestCount;
          break;
      }
      byDate.set(d.date, (byDate.get(d.date) ?? 0) + val);
    }

    return {
      tooltip: {
        trigger: "axis" as const,
        valueFormatter: (v: unknown) => activeMetric.format(v as number),
      },
      grid: { top: 8, right: 16, bottom: 24, left: 52 },
      xAxis: {
        type: "category" as const,
        data: dates,
        axisLabel: { fontSize: 10, color: textColor, rotate: dates.length > 15 ? 45 : 0 },
        axisLine: { lineStyle: { color: gridColor } },
      },
      yAxis: {
        type: "value" as const,
        axisLabel: {
          fontSize: 10,
          color: textColor,
          formatter: (v: number) =>
            metric === "cacheHitRate" ? `${(v * 100).toFixed(0)}%` : activeMetric.format(v),
        },
        splitLine: { lineStyle: { color: gridColor } },
      },
      dataZoom: dates.length > 30 ? [{ type: "inside" as const }] : undefined,
      series: [
        {
          type: "line",
          data: dates.map((d) => {
            const val = byDate.get(d) ?? 0;
            return metric === "cost" || metric === "tokens" || metric === "requests"
              ? +val.toFixed(4)
              : +(val as number).toFixed(4);
          }),
          smooth: true,
          lineStyle: { color: lineColor, width: 2 },
          itemStyle: { color: lineColor },
          areaStyle: {
            color: {
              type: "linear" as const,
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: isDark ? "rgba(245,245,247,0.08)" : "rgba(29,29,31,0.04)" },
                { offset: 1, color: "transparent" },
              ],
            },
          },
        },
      ],
    };
  }, [daily, metric, textColor, gridColor, lineColor, isDark, dates, activeMetric]);

  return (
    <div>
      {/* Hero — 动态大数字，跟随指标切换 */}
      <div className="text-center mb-12 pt-4">
        <div
          className="text-[5rem] font-bold leading-none tracking-tighter"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
        >
          {metric === "cacheHitRate" ? (
            <>
              {heroFormatted.replace("%", "")}
              <span className="text-2xl ml-1">%</span>
            </>
          ) : (
            heroFormatted
          )}
        </div>
        <p className="text-sm font-semibold mt-3" style={{ color: "var(--text-secondary)" }}>
          {activeMetric.label}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          {t.trends.heroSubtitle.replace("{days}", String(dates.length))}
        </p>
      </div>

      {/* 指标切换 — 纯文字标签 */}
      <div className="flex gap-6 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`pb-1.5 text-xs font-medium tracking-wide transition-all duration-200 uppercase ${
              metric === m.key
                ? "border-b-2"
                : "border-b-2 border-transparent"
            }`}
            style={{
              color: metric === m.key ? "var(--text-primary)" : "var(--text-tertiary)",
              borderBottomColor: metric === m.key ? "var(--accent)" : "transparent",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ReactECharts option={option} style={{ height: 360 }} />
    </div>
  );
}
