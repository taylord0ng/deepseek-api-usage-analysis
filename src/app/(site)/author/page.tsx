/** 文件说明：站内作者页路由与 SEO 元数据。 */
import type { Metadata } from "next";
import AuthorContent from "@/components/AuthorContent";
import { AuthorPage } from "@/components/AuthorPage";
import { buildAuthorPageMetadata } from "@/lib/routeMetadata";

/**
 * 生成英文作者页的 SEO 元数据。
 */
export function generateMetadata(): Metadata {
  return buildAuthorPageMetadata("en");
}

/**
 * 渲染站内作者页。
 */
export default function AuthorRoute() {
  return (
    <>
      <AuthorPage />
      <AuthorContent />
    </>
  );
}
