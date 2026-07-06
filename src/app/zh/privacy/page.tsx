/** 文件说明：中文隐私政策镜像路由。 */
export { default } from "../../(site)/privacy/page";
import type { Metadata } from "next";
import { buildPrivacyMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文隐私政策页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildPrivacyMetadata("zh");
}
