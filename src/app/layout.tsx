import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/DataContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AppI18nShell } from "./AppI18nShell";

/** Hubot Sans 为本地 WOFF2 字体，通过 globals.css 中的 @font-face 加载 */

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepSeek Usage Dashboard",
  description:
    "Visualize your DeepSeek API usage — drop your monthly CSVs and get instant cost analytics, cache analysis, and per-key breakdowns. Free, open source, browser-side.",
};

/** 根布局：挂载字体、主题、i18n、数据上下文 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AppI18nShell>
            <DataProvider>{children}</DataProvider>
          </AppI18nShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
