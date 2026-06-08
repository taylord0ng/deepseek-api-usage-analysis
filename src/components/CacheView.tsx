"use client";

import { useMemo } from"react";
import ReactECharts from"echarts-for-react";
import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";
import { formatTokens } from"@/lib/format";

export default function CacheView() {
 const { result } = useData();
 const { locale, t } = useTranslation();
 if (!result) return null;

 const { daily, summary } = result;

 const hasCache = summary.totalCacheHitTokens + summary.totalCacheMissTokens > 0;

 // Daily cache hit rate trend
 const trendOption = useMemo(() => {
 const dates = [...new Set(daily.map((d) => d.date))].sort();
 const hitsByDate = new Map<string, number>();
 const missesByDate = new Map<string, number>();
 for (const d of daily) {
 hitsByDate.set(d.date, (hitsByDate.get(d.date) ?? 0) + d.inputCacheHitTokens);
 missesByDate.set(d.date, (missesByDate.get(d.date) ?? 0) + d.inputCacheMissTokens);
 }

 return {
 tooltip: {
 trigger:"axis"as const,
 formatter: (params: unknown) => {
 const p = params as { axisValue: string; data: number }[];
 return `${p[0]?.axisValue}<br/>${t.cache.hitRateTitle}: ${(p[0]?.data * 100).toFixed(1)}%`;
 },
 },
 grid: { top: 8, right: 16, bottom: 24, left: 40 },
 xAxis: {
 type:"category"as const,
 data: dates,
 axisLabel: { fontSize: 10, rotate: dates.length > 15 ? 45 : 0 },
 },
 yAxis: {
 type:"value"as const,
 min: 0,
 max: 1,
 axisLabel: { fontSize: 10, formatter: (v: number) => `${(v * 100).toFixed(0)}%` },
 },
 series: [
 {
 type:"line",
 data: dates.map((d) => {
 const h = hitsByDate.get(d) ?? 0;
 const m = missesByDate.get(d) ?? 0;
 return h + m > 0 ? +(h / (h + m)).toFixed(4) : 0;
 }),
 smooth: true,
 lineStyle: { color:"#10b981", width: 2 },
 itemStyle: { color:"#10b981"},
 areaStyle: { color:"rgba(16,185,129,0.1)"},
 },
 ],
 };
 }, [daily, t.cache.hitRateTitle]);

 // Cache hit tokens stacked bar by key
 const byKeyOption = useMemo(() => {
 const keyNames = [...new Set(daily.map((d) => d.apiKeyName))];
 const hits = keyNames.map((k) =>
 daily.filter((d) => d.apiKeyName === k).reduce((s, d) => s + d.inputCacheHitTokens, 0)
 );
 const misses = keyNames.map((k) =>
 daily.filter((d) => d.apiKeyName === k).reduce((s, d) => s + d.inputCacheMissTokens, 0)
 );

 return {
 tooltip: {
 trigger:"axis"as const,
 formatter: (params: unknown) => {
 const p = params as { seriesName: string; value: number }[];
 let result ="";
 for (const item of p) {
 result += `${item.seriesName}: ${formatTokens(item.value)}<br/>`;
 }
 return result;
 },
 },
 legend: {
 data: [t.cache.hits, t.cache.misses],
 bottom: 0,
 textStyle: { fontSize: 11 },
 },
 grid: { top: 8, right: 16, bottom: 36, left: 48 },
 xAxis: {
 type:"category"as const,
 data: keyNames,
 axisLabel: { fontSize: 10, rotate: keyNames.length > 5 ? 20 : 0 },
 },
 yAxis: {
 type:"value"as const,
 axisLabel: { fontSize: 10, formatter: (v: number) => formatTokens(v) },
 },
 series: [
 {
 name: t.cache.hits,
 type:"bar",
 stack:"cache",
 data: hits,
 itemStyle: { color:"#10b981", borderRadius: [0, 0, 0, 0] },
 },
 {
 name: t.cache.misses,
 type:"bar",
 stack:"cache",
 data: misses,
 itemStyle: { color:"#f59e0b", borderRadius: [4, 4, 0, 0] },
 },
 ],
 };
 }, [daily, t.cache.hits, t.cache.misses]);

 if (!hasCache) {
 return (
 <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
 <div className="text-3xl mb-3">💡</div>
 <p className="text-gray-600 font-medium">{t.cache.noCacheTitle}</p>
 <p className="text-sm text-gray-400 mt-1">
 {t.cache.noCacheHint}
 </p>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Gauge card */}
 <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
 <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.cache.hitRateTitle}</h3>
 <div className="text-5xl font-bold text-gray-900">
 {(summary.cacheHitRate * 100).toFixed(1)}%
 </div>
 <p className="text-sm text-gray-500 mt-2">
 {t.cache.servedFromCache.replace("{tokens}", formatTokens(summary.totalCacheHitTokens, locale))}
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="bg-white border border-gray-200 rounded-lg p-4">
 <h3 className="text-sm font-semibold text-gray-600 mb-3">{t.cache.dailyHitRate}</h3>
 <ReactECharts option={trendOption} style={{ height: 280 }} />
 </div>
 <div className="bg-white border border-gray-200 rounded-lg p-4">
 <h3 className="text-sm font-semibold text-gray-600 mb-3">{t.cache.hitsVsMisses}</h3>
 <ReactECharts option={byKeyOption} style={{ height: 280 }} />
 </div>
 </div>
 </div>
 );
}
