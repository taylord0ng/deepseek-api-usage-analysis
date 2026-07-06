/** 文件说明：中文首页镜像路由。 */
import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import { buildHomeMetadata } from "@/lib/routeMetadata";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareAppJsonLd,
} from "@/lib/schema";

/**
 * 输出中文首页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildHomeMetadata("zh");
}

/**
 * 渲染中文首页，并输出当前 locale 对应的结构化数据。
 */
export default function ZhHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareAppJsonLd("zh")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd("zh")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd("zh")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd("zh")),
        }}
      />
      <Dashboard />
    </>
  );
}
