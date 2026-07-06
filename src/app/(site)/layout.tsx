/** 文件说明：英文公开站点 root layout。 */
import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppRootLayout, buildRootLayoutMetadata } from "@/app/AppRootLayout";

/**
 * 生成英文公开站点共用 metadata。
 */
export function generateMetadata(): Metadata {
  return buildRootLayoutMetadata();
}

/**
 * 英文公开站点 root layout。
 *
 * 对应英文无前缀 URL，静态导出时直接输出 `<html lang="en">`。
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppRootLayout locale="en">{children}</AppRootLayout>;
}
