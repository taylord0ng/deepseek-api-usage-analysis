/** 文件说明：中文使用条款镜像路由。 */
export { default } from "../../(site)/terms/page";
import type { Metadata } from "next";
import { buildTermsMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文使用条款页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildTermsMetadata("zh");
}
