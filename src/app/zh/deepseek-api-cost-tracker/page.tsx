/** 文件说明：中文成本追踪落地页镜像路由。 */
export { default } from "../../(site)/deepseek-api-cost-tracker/page";
import type { Metadata } from "next";
import { buildCostTrackerMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文成本追踪落地页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildCostTrackerMetadata("zh");
}
