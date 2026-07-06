/** 文件说明：更新日志页面路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { ChangelogPage } from "@/components/ChangelogPage";
import ChangelogContent from "@/components/ChangelogContent";
import { buildChangelogMetadata } from "@/lib/routeMetadata";

/**
 * 动态生成英文更新日志页元数据。
 */
export function generateMetadata(): Metadata {
  return buildChangelogMetadata("en");
}

/**
 * 更新日志页路由
 *
 * 静态导出兼容的独立更新日志页面，包含：
 * - 自 v0.1.0 至 当前版本 的完整版本变更记录
 * - 按类别（新增/改进/修复/依赖）分组展示
 * - Apple 极简风格，与主应用一致
 * - 返回首页 + FooterBar
 * - SEO metadata + OpenGraph + Twitter Card
 */
export default function ChangelogRoute() {
  return (
    <>
      <ChangelogPage />
      <ChangelogContent />
    </>
  );
}
