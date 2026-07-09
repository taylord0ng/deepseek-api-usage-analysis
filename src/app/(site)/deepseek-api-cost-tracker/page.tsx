/** 文件说明：DeepSeek API Cost Tracker 落地页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { CostTrackerPage } from "@/components/CostTrackerPage";
import CostTrackerContent from "@/components/CostTrackerContent";
import { buildCostTrackerMetadata } from "@/lib/routeMetadata";

/**
 * 生成英文成本追踪落地页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildCostTrackerMetadata("en");
}

/**
 * 渲染成本追踪落地页路由。
 */
export default function CostTrackerRoute() {
  return (
    <>
      <CostTrackerPage />
      <CostTrackerContent />
    </>
  );
}
