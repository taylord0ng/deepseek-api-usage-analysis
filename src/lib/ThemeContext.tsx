"use client";

/**
 * 主题上下文模块
 *
 * 提供 light/dark 双主题切换能力。主题值持久化到 localStorage，
 * 同时在与 <html> 上设置 class（light / dark）以驱动全局 CSS 变量。
 * 导出 useTheme() 供 ECharts 等需要运行时感知主题的组件使用。
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

/** 从 localStorage 读取主题偏好，默认跟随系统 */
function detectTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("ds-theme");
  if (stored === "light" || stored === "dark") return stored;
  // 跟随系统偏好
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(detectTheme());
  }, []);

  // 同步 class 到 <html>
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("ds-theme", next);
      } catch {
        // localStorage 不可用时忽略
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
