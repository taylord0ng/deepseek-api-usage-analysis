/** 文件说明：中文缓存分析落地页镜像路由。 */
export { default } from "../../(site)/deepseek-cache-hit-rate-analyzer/page";
import type { Metadata } from "next";
import { buildCacheAnalyzerMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文缓存命中率落地页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildCacheAnalyzerMetadata("zh");
}
