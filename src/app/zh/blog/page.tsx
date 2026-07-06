/** 文件说明：中文博客首页镜像路由。 */
export { default } from "../../(site)/blog/page";
import type { Metadata } from "next";
import { buildBlogIndexMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文博客列表页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildBlogIndexMetadata("zh");
}
