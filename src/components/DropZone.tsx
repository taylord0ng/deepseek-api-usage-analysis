"use client";

import { useState, useCallback, useRef, type DragEvent } from"react";
import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";

/**
 * 拖拽上传区域
 *
 * Apple 极简风格 — 大留白、虚线边框、hover 微交互。
 * 移除原本的异形圆角，改用克制的微圆角。
 * 颜色通过 CSS 变量驱动，自动适配 light/dark 双主题。
 */
export default function DropZone() {
 const { loadFiles, loading } = useData();
 const { t } = useTranslation();
 const [dragOver, setDragOver] = useState(false);
 const [reading, setReading] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const busy = loading || reading;

 const handleFiles = useCallback(
  async (files: FileList) => {
  const fileArr = Array.from(files);
  const hasRelevant = fileArr.some(
   (f) => f.name.endsWith(".csv") || f.name.toLowerCase().endsWith(".zip")
  );
  if (!hasRelevant) return;

  setReading(true);
  try {
   const { concatMonthlyCSVs, extractZipCsvs } = await import("@/lib/concatFiles");
   const csvEntries = await extractZipCsvs(fileArr);
   if (csvEntries.length === 0) return;
   const result = await concatMonthlyCSVs(csvEntries);
   loadFiles(result.amountText, result.costText, result.label);
  } finally {
   setReading(false);
  }
  },
  [loadFiles]
 );

 const onDrop = useCallback(
  (e: DragEvent) => {
  e.preventDefault();
  setDragOver(false);
  if (e.dataTransfer.files.length > 0) {
   handleFiles(e.dataTransfer.files);
  }
  },
  [handleFiles]
 );

 const onDragOver = useCallback((e: DragEvent) => {
  e.preventDefault();
  setDragOver(true);
 }, []);

 const onDragLeave = useCallback((e: DragEvent) => {
  e.preventDefault();
  setDragOver(false);
 }, []);

 const onChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
   handleFiles(e.target.files);
  }
  },
  [handleFiles]
 );

 return (
 <div
  onDrop={onDrop}
  onDragOver={onDragOver}
  onDragLeave={onDragLeave}
  onClick={() => fileInputRef.current?.click()}
  className="p-16 text-center cursor-pointer transition-[background,border-color] duration-300"
  style={{
  border: dragOver
   ? "2px dashed var(--dropzone-drag-border)"
   : "2px dashed var(--border)",
  borderRadius: "6px",
  background: dragOver
   ? "color-mix(in srgb, var(--dropzone-drag-bg) 45%, transparent)"
   : "color-mix(in srgb, var(--dropzone-bg) 45%, transparent)",
  }}
 >
  <input
  ref={fileInputRef}
  type="file"
  multiple
  accept=".csv,.zip"
  className="hidden"
  onChange={onChange}
  />
  {busy ? (
  <div>
   <div
   className="inline-block w-7 h-7 border-2 border-t-transparent rounded-full animate-spin mb-4"
   style={{ borderColor: "var(--text-tertiary)", borderTopColor: "transparent" }}
   />
   <p className="font-medium text-base" style={{ color: "var(--text-secondary)" }}>
   {t.dropzone.processing}
   </p>
  </div>
  ) : (
  <div>
   <p
   className="font-bold text-xl mb-2"
   style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
   >
   {t.dropzone.title}
   </p>
   <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
   {t.dropzone.hint}
   </p>
   <p className="text-xs mt-4" style={{ color: "var(--text-tertiary)" }}>
   {t.dropzone.privacy}
   </p>
  </div>
  )}
 </div>
 );
}
