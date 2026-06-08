"use client";

import { useEffect, type ReactNode } from "react";
import { I18nProvider, useTranslation } from "@/i18n";

/** Client shell: provides i18n context and syncs <html lang> at runtime. */
function LangSync({ children }: { children: ReactNode }) {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}

export function AppI18nShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <LangSync>{children}</LangSync>
    </I18nProvider>
  );
}
