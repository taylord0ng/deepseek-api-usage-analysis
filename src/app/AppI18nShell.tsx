/**
 * 文件说明：应用级 i18n 客户端外壳。
 *
 * 该外壳负责把 URL 派生出的 locale 注入 I18nProvider，
 * 并在客户端运行时持续同步 `<html lang>`。
 */
"use client";

import { useEffect, type ReactNode } from "react";
import { I18nProvider, useTranslation, type Locale } from "@/i18n";

/**
 * 同步 `<html lang>`，确保客户端导航或水合后语言属性与当前上下文一致。
 */
function LangSync({ children }: { children: ReactNode }) {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}

interface AppI18nShellProps {
  children: ReactNode;
  locale?: Locale;
}

/**
 * 应用级 i18n 外壳。
 *
 * 当 `locale` 存在时，将其视为 URL 提供的主语言来源，并锁定上下文；
 * 当 `locale` 缺失时，退回到历史兼容逻辑。
 */
export function AppI18nShell({ children, locale }: AppI18nShellProps) {
  return (
    <I18nProvider initialLocale={locale} lockLocale={locale !== undefined}>
      <LangSync>{children}</LangSync>
    </I18nProvider>
  );
}
