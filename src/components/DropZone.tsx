"use client";

import { useState, useCallback, useRef, type DragEvent } from"react";
import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";

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
 const csvs = fileArr.filter((f) => f.name.endsWith(".csv"));
 if (csvs.length === 0) return;

 setReading(true);
 try {
 const { concatMonthlyCSVs } = await import("@/lib/concatFiles");
 const result = await concatMonthlyCSVs(csvs);
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
 className={`
 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
 transition-colors duration-200
 ${dragOver
 ?"border-blue-400 bg-blue-50"
 :"border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
 }
 `}
 style={{
 borderRadius:"255px 15px 225px 15px / 15px 225px 15px 255px",
 }}
 >
 <input
 ref={fileInputRef}
 type="file"
 multiple
 accept=".csv"
 className="hidden"
 onChange={onChange}
 />
 {busy ? (
 <div>
 <div className="inline-block w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mb-3"/>
 <p className="text-gray-600 font-medium">{t.dropzone.processing}</p>
 </div>
 ) : (
 <div>
 <div className="text-4xl mb-3">📊</div>
 <p className="text-gray-700 font-semibold text-lg mb-1">
 {t.dropzone.title}
 </p>
 <p className="text-sm text-gray-500">
 {t.dropzone.hint}
 </p>
 <p className="text-xs text-gray-400 mt-2">
 {t.dropzone.privacy}
 </p>
 </div>
 )}
 </div>
 );
}
