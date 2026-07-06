/** 文件说明：中文定价计算器落地页镜像路由。 */
export { default } from "../../(site)/deepseek-api-pricing-calculator/page";
import type { Metadata } from "next";
import { buildPricingCalculatorMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文价格计算器落地页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildPricingCalculatorMetadata("zh");
}
