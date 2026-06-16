"use client";

import { useMemo, useState, useCallback } from "react";
import { useData } from "@/lib/DataContext";
import { useTranslation } from "@/i18n";
import { formatPercent, formatCostFull, formatTokensFull } from "@/lib/format";
import { useTheme } from "@/lib/ThemeContext";

/**
 * Project 详情表格视图
 *
 * 按项目分组：key 名字包含 "trex" 的归为 trex 项目，其余归为 edgen。
 * 布局与 KeyView 一致，Token 和 Cost 显示完整数字（无 K/M/万 后缀）。
 * 两个项目始终显示，没有数据的项目显示 0。
 * 花费数字可点击复制。
 */

const PROJECT_NAMES = ["trex", "edgen"] as const;

export default function ProjectView() {
  const { filteredResult: result } = useData();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [copiedProject, setCopiedProject] = useState<string | null>(null);
  if (!result) return null;

  const { daily } = result;
  const isDark = theme === "dark";

  const handleCopyCost = useCallback(async (name: string, cost: number) => {
    try {
      await navigator.clipboard.writeText(cost.toFixed(2));
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = cost.toFixed(2);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedProject(name);
    setTimeout(() => setCopiedProject(null), 2000);
  }, []);

  // Aggregate daily data by project — always include both trex and edgen
  const projects = useMemo(() => {
    const map = new Map<string, {
      name: string;
      totalTokens: number;
      totalCost: number;
      cacheHitTokens: number;
      cacheMissTokens: number;
      requestCount: number;
    }>();

    // Seed both projects so they always appear
    for (const name of PROJECT_NAMES) {
      map.set(name, { name, totalTokens: 0, totalCost: 0, cacheHitTokens: 0, cacheMissTokens: 0, requestCount: 0 });
    }

    for (const d of daily) {
      const projectName = d.apiKeyName.toLowerCase().includes("trex") ? "trex" : "edgen";
      let entry = map.get(projectName);
      if (!entry) continue;
      const totalTok = d.outputTokens + d.inputCacheHitTokens + d.inputCacheMissTokens;
      entry.totalTokens += totalTok;
      entry.totalCost += d.cost ?? 0;
      entry.cacheHitTokens += d.inputCacheHitTokens;
      entry.cacheMissTokens += d.inputCacheMissTokens;
      entry.requestCount += d.requestCount;
    }

    return Array.from(map.values())
      .map((p) => ({
        ...p,
        cacheHitRate: p.cacheHitTokens + p.cacheMissTokens > 0
          ? p.cacheHitTokens / (p.cacheHitTokens + p.cacheMissTokens)
          : 0,
      }))
      .sort((a, b) => b.totalCost - a.totalCost);
  }, [daily]);

  const maxCost = Math.max(...projects.map((p) => p.totalCost), 1);

  return (
    <div>
      {/* Hero — 大数字：始终显示 2 个项目 */}
      <div className="text-center mb-12 pt-4">
        <div
          className="text-[5rem] font-bold leading-none tracking-tighter"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
        >
          2
        </div>
        <p className="text-sm font-semibold mt-3" style={{ color: "var(--text-secondary)" }}>
          Projects
        </p>
      </div>

      <h3
        className="text-[11px] font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        By Project
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid var(--border)` }}>
              <th
                className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Project
              </th>
              <th
                className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Tokens
              </th>
              <th
                className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Cost
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
            {projects.map((p) => (
              <tr
                key={p.name}
                className="group transition-colors duration-150"
                style={{ borderBottom: `1px solid var(--border)` }}
              >
                <td
                  className="px-3 py-3 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.name}
                </td>
                <td
                  className="px-3 py-3 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {formatTokensFull(p.totalTokens)}
                </td>
                <td
                  className="px-3 py-3 text-right font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  <button
                    onClick={() => handleCopyCost(p.name, p.totalCost)}
                    className="cursor-pointer transition-opacity duration-150 hover:opacity-70"
                    title="Click to copy cost"
                  >
                    {formatCostFull(p.totalCost)}
                  </button>
                </td>
                <td className="px-3 py-3 text-right">
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: p.cacheHitRate > 0.4
                        ? "var(--positive)"
                        : p.cacheHitRate > 0.2
                          ? "var(--warning-text)"
                          : "var(--danger)",
                    }}
                  >
                    {formatPercent(p.cacheHitRate)}
                  </span>
                </td>
                <td
                  className="px-3 py-3 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.requestCount.toLocaleString()}
                </td>
                <td className="px-3 py-3">
                  <div
                    className="w-24 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(p.totalCost / maxCost) * 100}%`,
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

      {/* Floating copy-success toast */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: copiedProject ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.9)",
          opacity: copiedProject ? 1 : 0,
          pointerEvents: "none",
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "12px",
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--positive)",
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-md)",
          border: `1px solid var(--positive)`,
          zIndex: 9999,
        }}
      >
        {copiedProject && (
          <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }}>
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copied {copiedProject} cost
          </span>
        )}
      </div>
    </div>
  );
}
