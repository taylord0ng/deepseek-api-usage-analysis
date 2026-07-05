import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/DataContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { ProjectConfigProvider } from "@/lib/ProjectConfigContext";
import { buildAuthorMetadata } from "@/lib/authors";
import { AppI18nShell } from "./AppI18nShell";
import { buildSoftwareAppJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd, buildOrganizationJsonLd } from "@/lib/schema";

/** Hubot Sans 为本地 WOFF2 字体，通过 globals.css 中的 @font-face 加载 */

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 站点公开 URL（构建时从 .env 注入） */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://deepseek-usage.xyz";

/** Google Analytics 测量 ID（构建时从 .env 注入） */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * 动态生成元数据（SEO）
 *
 * 使用 generateMetadata 而非静态 metadata 导出，以便在构建时从环境变量
 * 注入站点域名，并声明多语言 hreflang alternates。
 *
 * 注意：本应用使用客户端 i18n（浏览器端语言检测），无 URL 级语言路由。
 * <html lang> 初始为 "en"，LangSync 组件在客户端水合后自动修正为实际 locale。
 * alternates.languages 指向同一 URL 以告知搜索引擎双语内容存在。
 */
export function generateMetadata(): Metadata {
  const title = "DeepSeek API Usage Dashboard & Cost Tracker | Free & Secure";
  const description =
    "Analyze your DeepSeek API billing CSVs instantly. Track token usage, monitor cache hit rates, and view cost by API key. 100% browser-side, no data uploaded. Free & open source.";

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL,
      languages: {
        en: SITE_URL,
        zh: SITE_URL,
      },
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: "website",
      siteName: "DeepSeek API Usage Dashboard & Cost Tracker",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "DeepSeek API Usage Analytics Dashboard — free, private, open source",
          type: "image/png",
        },
        {
          url: `${SITE_URL}/ds-usage-logo.png`,
          width: 512,
          height: 512,
          alt: "DeepSeek API Usage Analytics Dashboard logo",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@GavinCnod",
      creator: "@GavinCnod",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    keywords: [
      "DeepSeek API usage analytics",
      "DeepSeek cost tracker",
      "DeepSeek token analysis",
      "API key cost breakdown",
      "DeepSeek cache hit rate",
      "LLM cost dashboard",
      "DeepSeek 用量分析",
      "DeepSeek API 费用追踪",
    ],
    ...buildAuthorMetadata(),
    icons: {
      icon: "/ds-usage-logo.ico",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/** 根布局：挂载字体、主题、i18n、数据上下文 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics (gtag.js) */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {/* JSON-LD 结构化数据：服务端输出，不依赖客户端 JS。同时提供 en / zh 双版本 */}
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
            __html: JSON.stringify(buildBreadcrumbJsonLd("en")),
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
            __html: JSON.stringify(buildOrganizationJsonLd("en")),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd("zh")),
          }}
        />
        <ThemeProvider>
          <AppI18nShell>
            <DataProvider>
              <ProjectConfigProvider>{children}</ProjectConfigProvider>
            </DataProvider>
          </AppI18nShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
