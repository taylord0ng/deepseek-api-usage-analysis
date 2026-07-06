/** 文件说明：隐私政策页面路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import PrivacyContent from "@/components/PrivacyContent";
import { buildPrivacyMetadata } from "@/lib/routeMetadata";

/**
 * 动态生成英文隐私政策页元数据。
 */
export function generateMetadata(): Metadata {
  return buildPrivacyMetadata("en");
}

/**
 * 隐私政策页路由
 *
 * 静态导出兼容的独立隐私政策页面，包含：
 * - 完整隐私政策内容（中英双语，通过 useTranslation 切换）
 * - 7 个章节：数据收集、本地处理、GA 分析、第三方服务、安全性、政策变更、联系方式
 * - Apple 极简风格，与主应用一致
 * - 返回首页 + FooterBar
 * - SEO metadata + OpenGraph + Twitter Card
 */
export default function PrivacyRoute() {
  return (
    <>
      <PrivacyPage />
      <PrivacyContent />
    </>
  );
}
