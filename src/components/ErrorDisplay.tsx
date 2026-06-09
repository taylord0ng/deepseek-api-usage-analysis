"use client";

import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";

/**
 * 错误展示组件
 *
 * Apple 极简风格 — 淡底色横幅，不使用重边框卡片。
 * 颜色通过 CSS 变量驱动，自动适配 light/dark 双主题。
 */
export default function ErrorDisplay() {
 const { error } = useData();
 const { t } = useTranslation();
 if (!error) return null;

 const title = {
  missing_columns: t.error.missingColumns,
  malformed_row: t.error.malformedRow,
  empty_file: t.error.emptyFile,
  incomplete_upload: t.error.incompleteUpload,
 }[error.type];

 return (
 <div
  className="px-4 py-3 mb-6"
  style={{
  background: "var(--error-bg)",
  border: "1px solid var(--error-border)",
  borderRadius: "6px",
  }}
 >
  <div className="flex items-start gap-2">
  <span className="text-sm shrink-0 mt-px">⚠</span>
  <div>
   <p className="font-semibold text-sm" style={{ color: "var(--error-text)" }}>
   {title ?? error.type}
   </p>
   <p className="text-sm mt-0.5" style={{ color: "var(--error-text)", opacity: 0.85 }}>
   {error.message}
   </p>
   {error.row && (
   <p className="text-xs mt-1" style={{ color: "var(--error-text)", opacity: 0.65 }}>
    {t.error.row}: {error.row}
    {error.column ? `, ${t.error.column}: ${error.column}` :""}
   </p>
   )}
  </div>
  </div>
 </div>
 );
}

/**
 * 警告横幅组件
 *
 * 极简横幅 + 列表，不使用封闭卡片。
 */
export function WarningBanner() {
 const { warnings } = useData();
 if (warnings.length === 0) return null;

 return (
 <div className="mb-6" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
  {warnings.map((w, i) => (
  <div
   key={i}
   className="px-4 py-2 flex items-start gap-2"
   style={{
   background: "var(--warning-bg)",
   border: "1px solid var(--warning-border)",
   borderRadius: "6px",
   }}
  >
   <span className="text-sm shrink-0 mt-px">⚠</span>
   <p className="text-xs" style={{ color: "var(--warning-text)" }}>{w.message}</p>
  </div>
  ))}
 </div>
 );
}
