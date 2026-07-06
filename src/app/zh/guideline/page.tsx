/** 文件说明：中文指南镜像路由。 */
export { default } from "../../(site)/guideline/page";
import type { Metadata } from "next";
import { buildGuidelineMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文指南页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildGuidelineMetadata("zh");
}
