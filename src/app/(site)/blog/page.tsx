/** 文件说明：博客首页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import { buildBlogIndexMetadata } from "@/lib/routeMetadata";

/**
 * 生成英文博客首页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildBlogIndexMetadata("en");
}

/**
 * 渲染博客首页。
 */
export default function BlogRoute() {
  return <BlogIndex />;
}
