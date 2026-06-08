"use client";

import { useData } from"@/lib/DataContext";
import { useTranslation } from"@/i18n";

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
 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
 <div className="flex items-start gap-3">
 <span className="text-red-500 text-lg">⚠️</span>
 <div>
 <p className="text-red-800 font-medium text-sm">
 {title ?? error.type}
 </p>
 <p className="text-red-600 text-sm mt-1">{error.message}</p>
 {error.row && (
 <p className="text-red-500 text-xs mt-1">
 {t.error.row}: {error.row}
 {error.column ? `, ${t.error.column}: ${error.column}` :""}
 </p>
 )}
 </div>
 </div>
 </div>
 );
}

export function WarningBanner() {
 const { warnings } = useData();
 if (warnings.length === 0) return null;

 return (
 <div className="space-y-1 mb-4">
 {warnings.map((w, i) => (
 <div
 key={i}
 className="bg-yellow-50 border border-yellow-200 rounded px-3 py-1.5 flex items-start gap-2"
 >
 <span className="text-yellow-500 text-sm">⚠️</span>
 <p className="text-yellow-700 text-xs">{w.message}</p>
 </div>
 ))}
 </div>
 );
}
