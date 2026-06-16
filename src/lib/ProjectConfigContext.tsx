"use client";

/**
 * 自定义项目配置 Context
 *
 * 管理用户自定义的项目分组配置，持久化到 localStorage。
 * 每个项目定义包含名称和一组关联的 Key 名称（精确匹配，大小写不敏感）。
 * 用户通过拖拽方式将解析出的 KeyName 分配到项目中，未分配则归入"未分类"。
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

// ============================================================================
// 类型定义
// ============================================================================

/** 单个项目定义 */
export interface ProjectDef {
  /** 项目名称（显示用） */
  name: string;
  /** 关联的 Key 名称列表（大小写不敏感的精确匹配） */
  keyNames: string[];
}

/** 未分类项目的哨兵名称 */
export const UNCATEGORIZED = "__uncategorized__";

// ============================================================================
// localStorage 持久化
// ============================================================================

const STORAGE_KEY = "ds-project-config";

function loadConfig(): ProjectDef[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // 兼容旧版 keyPatterns → keyNames 迁移
        return parsed
          .filter(
            (p: unknown) =>
              p &&
              typeof p === "object" &&
              typeof (p as ProjectDef).name === "string" &&
              (p as ProjectDef).name.trim().length > 0
          )
          .map((p: Record<string, unknown>) => ({
            name: p.name as string,
            // 优先读取 keyNames，兼容旧版 keyPatterns
            keyNames: Array.isArray(p.keyNames)
              ? (p.keyNames as string[])
              : Array.isArray(p.keyPatterns)
                ? (p.keyPatterns as string[])
                : [],
          }));
      }
    }
  } catch {
    // 解析失败，使用空配置
  }
  return [];
}

function saveConfig(config: ProjectDef[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // storage 满或不可用，静默失败
  }
}

// ============================================================================
// Context 定义
// ============================================================================

interface ProjectConfigContextValue {
  /** 当前项目配置列表 */
  config: ProjectDef[];
  /** 替换整个配置 */
  setConfig: (config: ProjectDef[]) => void;
  /** 根据 apiKeyName 匹配项目名称，未匹配返回 UNCATEGORIZED */
  matchProject: (apiKeyName: string) => string;
}

const ProjectConfigContext = createContext<ProjectConfigContextValue | null>(null);

// ============================================================================
// Provider 组件
// ============================================================================

export function ProjectConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<ProjectDef[]>(() => loadConfig());

  const setConfig = useCallback((newConfig: ProjectDef[]) => {
    setConfigState(newConfig);
    saveConfig(newConfig);
  }, []);

  /**
   * 将 apiKeyName 匹配到项目名称。
   * 按配置顺序遍历，第一个包含该 keyName 的项目即为匹配结果。
   * 匹配使用大小写不敏感的精确名称比较。
   * 未命中任何项目则返回 UNCATEGORIZED。
   */
  const matchProject = useCallback(
    (apiKeyName: string): string => {
      const lowerName = apiKeyName.toLowerCase();
      for (const p of config) {
        if (p.keyNames.some((k) => k.toLowerCase() === lowerName)) {
          return p.name;
        }
      }
      return UNCATEGORIZED;
    },
    [config]
  );

  // 监听 storage 事件，支持跨标签页同步
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setConfigState(loadConfig());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <ProjectConfigContext.Provider value={{ config, setConfig, matchProject }}>
      {children}
    </ProjectConfigContext.Provider>
  );
}

/** 使用项目配置的 Hook */
export function useProjectConfig() {
  const ctx = useContext(ProjectConfigContext);
  if (!ctx) throw new Error("useProjectConfig must be used within ProjectConfigProvider");
  return ctx;
}
