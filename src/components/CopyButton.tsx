/**
 * 可复用的复制按钮组件
 *
 * 点击时复制数值到剪贴板，Toast 显示在点击位置上方（不遮挡数值），
 * 按钮右侧带复制图标提示用户可点击。支持 i18n 和双主题。
 */
"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode, type CSSProperties } from "react";
import { useTranslation } from "@/i18n";

interface CopyButtonProps {
  /** 要复制的数值（费用） */
  value: number;
  /** 复制对象的名称，用于 Toast 中显示 */
  name: string;
  /** 按钮的显示内容 */
  children: ReactNode;
  /** 可选的按钮 class */
  className?: string;
}

export default function CopyButton({ value, name, children, className }: CopyButtonProps) {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const text = value.toFixed(2);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShowToast(true);
    // 清除之前的定时器，防止多次点击积累
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowToast(false), 1500);
  }, [value]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toastStyle: CSSProperties = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: showToast
      ? "translateX(-50%) translateY(-8px) scale(1)"
      : "translateX(-50%) translateY(0) scale(0.9)",
    opacity: showToast ? 1 : 0,
    pointerEvents: "none",
    transition: "transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.2s ease-out",
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.375rem 0.75rem",
    borderRadius: "8px",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "var(--text-primary)",
    background: "var(--bg-surface)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border)",
    whiteSpace: "nowrap",
    zIndex: 50,
    marginBottom: "6px",
  };

  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        onClick={handleCopy}
        className={className}
        title={t.copyToast.clickToCopy}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
      >
        {children}
        {/* 复制图标提示 */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.35, flexShrink: 0 }}
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      </button>

      {/* Toast 浮层 — 显示在按钮上方 */}
      <div aria-live="polite" style={toastStyle}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t.copyToast.copied.replace("{name}", name)}
      </div>
    </span>
  );
}
