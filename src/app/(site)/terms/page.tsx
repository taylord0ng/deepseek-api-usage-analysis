/** 文件说明：使用条款页面路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { TermsPage } from "@/components/TermsPage";
import TermsContent from "@/components/TermsContent";
import { buildTermsMetadata } from "@/lib/routeMetadata";

/**
 * 动态生成英文使用条款页元数据。
 */
export function generateMetadata(): Metadata {
  return buildTermsMetadata("en");
}

/**
 * 使用条款页路由
 *
 * 静态导出兼容的独立使用条款页面，包含：
 * - 完整使用条款内容（中英双语，通过 useTranslation 切换）
 * - 8 个章节：按现状提供、免责声明、与 DeepSeek 无关、用户数据与责任、开源许可、责任限制、条款变更、联系我们
 * - Apple 极简风格，与主应用一致
 * - 返回首页 + FooterBar
 * - SEO metadata + OpenGraph + Twitter Card
 */
export default function TermsRoute() {
  return (
    <>
      <TermsPage />
      <TermsContent />
    </>
  );
}
