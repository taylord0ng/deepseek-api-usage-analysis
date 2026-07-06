/** 文件说明：中文公开站点 root layout。 */
import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppRootLayout, buildRootLayoutMetadata } from "@/app/AppRootLayout";

/**
 * 生成中文公开站点共用 metadata。
 */
export function generateMetadata(): Metadata {
  return buildRootLayoutMetadata();
}

/**
 * 中文公开站点 root layout。
 *
 * 对应 `/zh/...` 路由树，静态导出时直接输出 `<html lang="zh">`。
 */
export default function ZhLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppRootLayout locale="zh">{children}</AppRootLayout>;
}
