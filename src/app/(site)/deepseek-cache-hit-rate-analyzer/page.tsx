/** 文件说明：DeepSeek 缓存命中率分析页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import { CacheAnalyzerPage } from "@/components/CacheAnalyzerPage";
import CacheAnalyzerContent from "@/components/CacheAnalyzerContent";
import { buildCacheAnalyzerMetadata } from "@/lib/routeMetadata";

/**
 * 生成英文缓存分析落地页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildCacheAnalyzerMetadata("en");
}

/**
 * 渲染缓存命中率分析落地页路由。
 */
export default function CacheAnalyzerRoute() {
  return (
    <>
      <CacheAnalyzerPage />
      <CacheAnalyzerContent />
    </>
  );
}
