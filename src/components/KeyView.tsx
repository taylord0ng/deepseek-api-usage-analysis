"use client";

import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";
import { formatCost, formatTokens, formatPercent } from"@/lib/format";

export default function KeyView() {
 const { result } = useData();
 const { locale, t } = useTranslation();
 if (!result) return null;

 const { keys } = result;
 const maxCost = Math.max(...keys.map((k) => k.totalCost), 1);

 return (
 <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
 <div className="px-4 py-3 border-b border-gray-100">
 <h3 className="text-sm font-semibold text-gray-600">{t.keys.title}</h3>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-gray-100 text-left">
 <th className="px-4 py-2 text-xs font-semibold text-gray-500">{t.keys.apiKeyName}</th>
 <th className="px-4 py-2 text-xs font-semibold text-gray-500">{t.keys.tokens}</th>
 <th className="px-4 py-2 text-xs font-semibold text-gray-500">{t.keys.cost}</th>
 <th className="px-4 py-2 text-xs font-semibold text-gray-500">{t.keys.cacheHit}</th>
 <th className="px-4 py-2 text-xs font-semibold text-gray-500">{t.keys.requests}</th>
 <th className="px-4 py-2 text-xs font-semibold text-gray-500"></th>
 </tr>
 </thead>
 <tbody>
 {keys.map((k) => (
 <tr key={k.apiKeyName} className="border-b border-gray-50 hover:bg-gray-50">
 <td className="px-4 py-2.5 font-medium text-gray-800">{k.apiKeyName}</td>
 <td className="px-4 py-2.5 text-gray-600">{formatTokens(k.totalTokens, locale)}</td>
 <td className="px-4 py-2.5 text-gray-900 font-medium">{formatCost(k.totalCost, locale)}</td>
 <td className="px-4 py-2.5">
 <span
 className={`text-xs font-medium ${
 k.cacheHitRate > 0.4 ?"text-green-600": k.cacheHitRate > 0.2 ?"text-yellow-600":"text-red-600"
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
