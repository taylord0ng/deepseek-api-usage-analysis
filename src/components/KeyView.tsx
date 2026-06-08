"use client";

import { useData } from "@/lib/DataContext";

function formatCost(yuan: number): string {
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

export default function KeyView() {
  const { result } = useData();
  if (!result) return null;

  const { keys } = result;
  const maxCost = Math.max(...keys.map((k) => k.totalCost), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-600">Per-Key Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-2 text-xs font-semibold text-gray-500">API Key Name</th>
              <th className="px-4 py-2 text-xs font-semibold text-gray-500">Tokens</th>
              <th className="px-4 py-2 text-xs font-semibold text-gray-500">Cost</th>
              <th className="px-4 py-2 text-xs font-semibold text-gray-500">Cache Hit</th>
              <th className="px-4 py-2 text-xs font-semibold text-gray-500">Requests</th>
              <th className="px-4 py-2 text-xs font-semibold text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.apiKeyName} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2.5 font-medium text-gray-800">{k.apiKeyName}</td>
                <td className="px-4 py-2.5 text-gray-600">{formatTokens(k.totalTokens)}</td>
                <td className="px-4 py-2.5 text-gray-900 font-medium">{formatCost(k.totalCost)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`text-xs font-medium ${
                      k.cacheHitRate > 0.4 ? "text-green-600" : k.cacheHitRate > 0.2 ? "text-yellow-600" : "text-red-600"
                    }`}
                  >
                    {formatPercent(k.cacheHitRate)}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{k.requestCount.toLocaleString()}</td>
                <td className="px-4 py-2.5">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${(k.totalCost / maxCost) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
