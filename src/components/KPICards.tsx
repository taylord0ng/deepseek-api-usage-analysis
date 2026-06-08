"use client";

import { useData } from "@/lib/DataContext";

function formatCost(yuan: number): string {
  if (yuan >= 10000) return `¥${(yuan / 10000).toFixed(2)}万`;
  return `¥${yuan.toFixed(2)}`;
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatPercent(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export default function KPICards() {
  const { result } = useData();
  if (!result) return null;

  const { summary } = result;

  const cards = [
    { value: formatCost(summary.totalCost), label: "Total Cost", sub: summary.dateRange ? `${summary.dateRange.start} ~ ${summary.dateRange.end}` : "" },
    { value: formatTokens(summary.totalTokens), label: "Total Tokens", sub: `${summary.models.length} model(s)` },
    { value: formatPercent(summary.cacheHitRate), label: "Cache Hit Rate", sub: `${formatTokens(summary.totalCacheHitTokens)} saved` },
    { value: String(summary.activeKeys), label: "Active API Keys", sub: "" },
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
