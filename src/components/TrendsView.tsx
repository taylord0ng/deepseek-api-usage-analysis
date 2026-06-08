"use client";

import { useState, useMemo } from"react";
import ReactECharts from"echarts-for-react";
import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";

type MetricKey ="cost"|"tokens"|"cacheHitRate"|"requests";

export default function TrendsView() {
 const { result } = useData();
 const { t } = useTranslation();
 const [metric, setMetric] = useState<MetricKey>("cost");

 if (!result) return null;
 const { daily } = result;

 const dates = [...new Set(daily.map((d) => d.date))].sort();

 const METRICS: { key: MetricKey; label: string; color: string; format: (v: number) => string }[] = [
 { key:"cost", label: t.trends.dailyCost, color:"#3b82f6", format: (v) => `¥${v.toFixed(2)}` },
 { key:"tokens", label: t.trends.dailyTokens, color:"#8b5cf6", format: (v) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)) },
 { key:"cacheHitRate", label: t.trends.cacheHitRate, color:"#10b981", format: (v) => `${(v * 100).toFixed(1)}%` },
 { key:"requests", label: t.trends.requestCount, color:"#f59e0b", format: (v) => String(v) },
 ];

 const option = useMemo(() => {
 const activeMetric = METRICS.find((m) => m.key === metric)!;

 const byDate = new Map<string, number>();
 for (const d of daily) {
 let val: number;
 switch (metric) {
 case"cost":
 val = d.cost ?? 0;
 break;
 case"tokens":
 val = d.outputTokens + d.inputCacheHitTokens + d.inputCacheMissTokens;
 break;
 case"cacheHitRate": {
 const hit = d.inputCacheHitTokens;
 const miss = d.inputCacheMissTokens;
 val = hit + miss > 0 ? hit / (hit + miss) : 0;
 break;
 }
 case"requests":
 val = d.requestCount;
 break;
 }
 byDate.set(d.date, (byDate.get(d.date) ?? 0) + val);
 }

 return {
 tooltip: {
 trigger:"axis"as const,
 valueFormatter: (v: unknown) => activeMetric.format(v as number),
 },
 grid: { top: 8, right: 16, bottom: 24, left: 56 },
 xAxis: {
 type:"category"as const,
 data: dates,
 axisLabel: { fontSize: 10, rotate: dates.length > 15 ? 45 : 0 },
 },
 yAxis: {
 type:"value"as const,
 axisLabel: {
 fontSize: 10,
 formatter: (v: number) =>
 metric ==="cacheHitRate"? `${(v * 100).toFixed(0)}%` : activeMetric.format(v),
 },
 },
 dataZoom: dates.length > 30 ? [{ type:"inside"as const }] : undefined,
 series: [
 {
 type:"line",
 data: dates.map((d) => {
 const val = byDate.get(d) ?? 0;
 return metric ==="cost"|| metric ==="tokens"|| metric ==="requests"
 ? +val.toFixed(4)
 : +(val as number).toFixed(4);
 }),
 smooth: true,
 lineStyle: { color: activeMetric.color, width: 2 },
 itemStyle: { color: activeMetric.color },
 areaStyle: {
 color: {
 type:"linear",
 x: 0, y: 0, x2: 0, y2: 1,
 colorStops: [
 { offset: 0, color: activeMetric.color +"33"},
 { offset: 1, color: activeMetric.color +"05"},
 ],
 },
 },
 },
 ],
 };
 }, [daily, metric]);

 return (
 <div className="space-y-4">
 <div className="flex gap-2 flex-wrap">
 {METRICS.map((m) => (
 <button
 key={m.key}
 onClick={() => setMetric(m.key)}
 className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
 metric === m.key
 ?"bg-gray-800 text-white"
 :"bg-gray-100 text-gray-600 hover:bg-gray-200"
 }`}
 >
 {m.label}
 </button>
 ))}
 </div>
 <div className="bg-white border border-gray-200 rounded-lg p-4">
 <ReactECharts option={option} style={{ height: 360 }} />
 </div>
 </div>
 );
}
