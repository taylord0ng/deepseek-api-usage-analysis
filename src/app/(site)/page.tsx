/** 文件说明：英文首页路由。 */
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
 * 输出英文首页 metadata。
 */
export function generateMetadata(): Metadata {
  return buildHomeMetadata("en");
}

/**
 * 渲染英文首页，并输出当前 locale 对应的结构化数据。
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareAppJsonLd("en")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd("en")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd("en")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd("en")),
        }}
      />
      <Dashboard />
    </>
  );
}
