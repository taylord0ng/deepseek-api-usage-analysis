"use client";

import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";
import { formatCost, formatTokens, formatPercent } from"@/lib/format";
import { useTheme } from"@/lib/ThemeContext";

/**
 * Key 详情表格视图
 *
 * Apple 极简风格 — 不包裹卡片，通栏表格。
 * 行 hover 用极淡底色；进度条使用哑光黑/白。
 * 颜色通过 CSS 变量驱动。
 */
export default function KeyView() {
 const { result } = useData();
 const { locale, t } = useTranslation();
 const { theme } = useTheme();
 if (!result) return null;

 const { keys } = result;
 const maxCost = Math.max(...keys.map((k) => k.totalCost), 1);
 const isDark = theme ==="dark";

 return (
 <div>
  <h3
  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
  style={{ color: "var(--text-secondary)" }}
  >
  {t.keys.title}
  </h3>
  <div className="overflow-x-auto">
  <table className="w-full text-sm">
   <thead>
   <tr style={{ borderBottom: `1px solid var(--border)` }}>
    <th
    className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider"
    style={{ color: "var(--text-tertiary)" }}
    >
    {t.keys.apiKeyName}
    </th>
    <th
    className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
    style={{ color: "var(--text-tertiary)" }}
    >
    {t.keys.tokens}
    </th>
    <th
    className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
    style={{ color: "var(--text-tertiary)" }}
    >
    {t.keys.cost}
    </th>
    <th
    className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
    style={{ color: "var(--text-tertiary)" }}
    >
    {t.keys.cacheHit}
    </th>
    <th
    className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
    style={{ color: "var(--text-tertiary)" }}
    >
    {t.keys.requests}
    </th>
    <th className="px-3 py-2.5 w-28"></th>
   </tr>
   </thead>
   <tbody>
   {keys.map((k) => (
    <tr
    key={k.apiKeyName}
    className="group transition-colors duration-150"
    style={{ borderBottom: `1px solid var(--border)` }}
    >
    <td
     className="px-3 py-3 font-semibold"
     style={{ color: "var(--text-primary)" }}
    >
     {k.apiKeyName}
    </td>
    <td
     className="px-3 py-3 text-right"
     style={{ color: "var(--text-secondary)" }}
    >
     {formatTokens(k.totalTokens, locale)}
    </td>
    <td
     className="px-3 py-3 text-right font-semibold"
     style={{ color: "var(--text-primary)" }}
    >
     {formatCost(k.totalCost, locale)}
    </td>
    <td className="px-3 py-3 text-right">
     <span
     className="text-xs font-medium"
     style={{
      color: k.cacheHitRate > 0.4
      ? "var(--positive)"
      : k.cacheHitRate > 0.2
      ? "var(--warning-text)"
      : "var(--danger)",
     }}
     >
     {formatPercent(k.cacheHitRate)}
     </span>
    </td>
    <td
     className="px-3 py-3 text-right"
     style={{ color: "var(--text-secondary)" }}
    >
     {k.requestCount.toLocaleString()}
    </td>
    <td className="px-3 py-3">
     <div
     className="w-24 h-1 rounded-full overflow-hidden"
     style={{ background: "var(--border)" }}
     >
     <div
      className="h-full rounded-full transition-all"
      style={{
      width: `${(k.totalCost / maxCost) * 100}%`,
      background: isDark ? "var(--text-primary)" : "var(--accent)",
      opacity: 0.6,
      }}
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
