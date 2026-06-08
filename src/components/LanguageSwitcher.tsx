"use client";

import { useTranslation } from"@/i18n";

export default function LanguageSwitcher() {
 const { locale, setLocale, t } = useTranslation();

 return (
 <div className="flex items-center gap-1 text-xs">
 <span className="text-gray-400">{t.langSwitcher.label}:</span>
 <button
 onClick={() => setLocale("en")}
 className={`px-1.5 py-0.5 rounded transition-colors ${
 locale ==="en"
 ?"bg-gray-800 text-white"
 :"text-gray-500 hover:text-gray-700"
 }`}
 >
 EN
 </button>
 <button
 onClick={() => setLocale("zh")}
 className={`px-1.5 py-0.5 rounded transition-colors ${
 locale ==="zh"
 ?"bg-gray-800 text-white"
 :"text-gray-500 hover:text-gray-700"
 }`}
 >
 中文
 </button>
 </div>
 );
}
