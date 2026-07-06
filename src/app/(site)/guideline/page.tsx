/** 文件说明：操作指南页面路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { GuidelinePage } from "@/components/GuidelinePage";
import { buildGuidelineMetadata } from "@/lib/routeMetadata";

/**
 * 动态生成英文指南页元数据。
 */
export function generateMetadata(): Metadata {
  return buildGuidelineMetadata("en");
}

/**
 * 指南页路由
 *
 * 静态导出兼容的独立操作指南页面，包含：
 * - 完整操作手册内容（解析 MD 格式）
 * - 截图自动匹配（根据当前 locale 切换 cn/en 版本）
 * - 交互式目录导航
 * - 返回首页按钮
 * - SEO metadata + JSON-LD 结构化数据
 */
export default function GuidelineRoute() {
  return <GuidelinePage />;
}
