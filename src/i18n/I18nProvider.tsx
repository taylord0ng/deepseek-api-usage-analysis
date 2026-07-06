/**
 * 文件说明：i18n 上下文提供者与 Hook。
 *
 * URL 级 i18n 路由启用后，locale 应优先由当前路由显式传入。
 * localStorage 仅保留为历史兼容写回，不再作为首屏语言主来源。
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import translations, { type Locale, type TranslationKeys } from "./translations";

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function detectLocale(): Locale {
  if (typeof window !== "undefined") {
    // 1) stored preference
    const stored = localStorage.getItem("ds-locale");
    if (stored === "en" || stored === "zh") return stored;
    // 2) browser preference
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("zh")) return "zh";
  }
  return "en";
}

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  lockLocale?: boolean;
}

/**
 * i18n Provider
 *
 * - 当 `initialLocale` 存在时，说明当前页面语言由 URL 显式提供
 * - 当 `lockLocale` 为 true 时，运行时只允许同步兼容存储，不允许脱离 URL 切换页面语言
 * - 当 `initialLocale` 缺失时，回退到历史 localStorage / 浏览器语言检测
 */
export function I18nProvider({
  children,
  initialLocale,
  lockLocale = false,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? detectLocale());
  const resolvedLocale = lockLocale && initialLocale ? initialLocale : locale;

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem("ds-locale", next);
    } catch {
      // localStorage may be unavailable
    }

    if (lockLocale) return;

    setLocaleState(next);
  }, [lockLocale]);

  return (
    <I18nContext.Provider
      value={{ locale: resolvedLocale, setLocale, t: translations[resolvedLocale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
