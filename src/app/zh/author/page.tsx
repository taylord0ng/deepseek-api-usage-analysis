/** 文件说明：中文作者页镜像路由。 */
export { default } from "../../(site)/author/page";
import type { Metadata } from "next";
import { buildAuthorPageMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文作者页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildAuthorPageMetadata("zh");
}
