"use client";

import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";
import { formatCost, formatTokens, formatPercent } from"@/lib/format";

export default function KPICards() {
 const { result } = useData();
 const { locale, t } = useTranslation();
 if (!result) return null;

 const { summary } = result;

 const cards = [
 {
 value: formatCost(summary.totalCost, locale),
 label: t.kpi.totalCost,
 sub: summary.dateRange
 ? `${summary.dateRange.start} ~ ${summary.dateRange.end}`
 :"",
 },
 {
 value: formatTokens(summary.totalTokens, locale),
 label: t.kpi.totalTokens,
 sub: t.kpi.models.replace("{count}", String(summary.models.length)),
 },
 {
 value: formatPercent(summary.cacheHitRate),
 label: t.kpi.cacheHitRate,
 sub: t.kpi.saved.replace("{tokens}", formatTokens(summary.totalCacheHitTokens, locale)),
 },
 {
 value: String(summary.activeKeys),
 label: t.kpi.activeKeys,
 sub:"",
 },
 ];

 return (
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 {cards.map((c) => (
 <div
 key={c.label}
 className="bg-white border border-gray-200 rounded-lg p-4"
 >
 <div className="text-2xl font-bold text-gray-900">{c.value}</div>
 <div className="text-sm text-gray-500 mt-1">{c.label}</div>
 {c.sub && <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>}
 </div>
 ))}
 </div>
 );
}
