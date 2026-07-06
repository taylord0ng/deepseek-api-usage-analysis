/** 文件说明：DeepSeek API 定价计算器落地页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { PricingCalculatorPage } from "@/components/PricingCalculatorPage";
import { buildPricingCalculatorMetadata } from "@/lib/routeMetadata";

/**
 * 生成英文定价计算器落地页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildPricingCalculatorMetadata("en");
}

/**
 * 渲染定价计算器落地页路由。
 */
export default function PricingCalculatorRoute() {
  return <PricingCalculatorPage />;
}
