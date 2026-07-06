/** 文件说明：中文更新日志镜像路由。 */
export { default } from "../../(site)/changelog/page";
import type { Metadata } from "next";
import { buildChangelogMetadata } from "@/lib/routeMetadata";

/**
 * 生成中文更新日志页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildChangelogMetadata("zh");
}
