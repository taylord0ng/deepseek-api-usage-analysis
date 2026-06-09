"use client";

import { useMemo } from"react";
import ReactECharts from"echarts-for-react";
import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";
import { useTheme } from"@/lib/ThemeContext";

/**
 * 总览视图：每日费用柱状图 + 各 Key 费用环形图
 *
 * Apple 极简风格 — 去除卡片容器，使用通栏模块 + 细横线分割。
 * ECharts 配色跟随全局 light/dark 主题。
 */
export default function OverviewView() {
 const { result } = useData();
 const { t } = useTranslation();
 const { theme } = useTheme();
 if (!result) return null;

 const { daily, keys } = result;

 // 主题感知色
 const isDark = theme ==="dark";
 const textColor = isDark ? "#98989D" : "#86868B";
 const gridColor = isDark ? "#2C2C2E" : "#E5E5EA";

 // 每日费用柱状图
 const dailyOption = useMemo(() => {
  const dates = [...new Set(daily.map((d) => d.date))].sort();
  const byDate = new Map<string, number>();
  for (const d of daily) {
  byDate.set(d.date, (byDate.get(d.date) ?? 0) + (d.cost ?? 0));
  }

  return {
  tooltip: {
   trigger:"axis"as const,
   valueFormatter: (v: unknown) => `¥${(v as number).toFixed(2)}`,
  },
  grid: { top: 8, right: 16, bottom: 24, left: 48 },
  xAxis: {
   type:"category"as const,
   data: dates,
   axisLabel: { fontSize: 10, color: textColor, rotate: dates.length > 15 ? 45 : 0 },
   axisLine: { lineStyle: { color: gridColor } },
  },
  yAxis: {
   type:"value"as const,
   axisLabel: { fontSize: 10, color: textColor, formatter: (v: number) => `¥${v}` },
   splitLine: { lineStyle: { color: gridColor } },
  },
  series: [
   {
   type:"bar",
   data: dates.map((d) => +(byDate.get(d) ?? 0).toFixed(4)),
   itemStyle: { color: isDark ? "#F5F5F7" : "#1D1D1F", borderRadius: [4, 4, 0, 0] },
   },
  ],
  };
 }, [daily, isDark, textColor, gridColor]);

 // 各 Key 费用环形图（donut）
 const donutOption = useMemo(() => {
  const data = keys.map((k) => ({
  name: k.apiKeyName,
  value: +k.totalCost.toFixed(4),
  }));

  // Apple 风格克制色调
  const palette = isDark
  ? ["#F5F5F7","#D2D2D7","#98989D","#636366","#48484A","#38383A"]
  : ["#1D1D1F","#636366","#86868B","#98989D","#D2D2D7","#E5E5EA"];

  return {
  tooltip: {
   trigger:"item"as const,
   valueFormatter: (v: unknown) => `¥${(v as number).toFixed(2)}`,
  },
  legend: {
   orient:"vertical"as const,
   right: 0,
   top:"center",
   textStyle: { fontSize: 11, color: textColor },
  },
  color: palette,
  series: [
   {
   type:"pie",
   radius: ["42%","68%"],
   center: ["35%","50%"],
   data,
   label: { show: false },
   emphasis: {
    label: { show: true, fontSize: 12, fontWeight:"bold" as const },
   },
   },
  ],
  };
 }, [keys, isDark, textColor]);

 return (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
  <div>
  <h3
   className="text-[11px] font-semibold uppercase tracking-widest mb-4"
   style={{ color: "var(--text-secondary)" }}
  >
   {t.overview.dailyCost}
  </h3>
  <ReactECharts option={dailyOption} style={{ height: 300 }} />
  </div>
  <div>
  <h3
   className="text-[11px] font-semibold uppercase tracking-widest mb-4"
   style={{ color: "var(--text-secondary)" }}
  >
   {t.overview.costByKey}
  </h3>
  <ReactECharts option={donutOption} style={{ height: 300 }} />
  </div>
 </div>
 );
}
