# Checklist

- [x] `robots.ts` 存在，导出 `MetadataRoute.Robots`，包含 `Allow: /`、`User-agent: *`、`Sitemap: ${SITE_URL}/sitemap.xml`
- [x] TitleBar.tsx 中不再使用 `<h1>` 标签，改为 `<span>` 等非语义元素
- [x] LandingPage.tsx 中 Hero 区域仍保留唯一 `<h1>`
- [x] layout.tsx 的 `<head>` 或 metadata 中输出 SoftwareApplication + FAQPage JSON-LD（`<script type="application/ld+json">`）
- [x] LandingPage.tsx 中已移除 `softwareAppJsonLd`、`faqJsonLd` 相关变量和 `<script>` 注入
- [x] `generateMetadata()` 的 `alternates` 包含 `canonical: SITE_URL`
- [x] Landing 页的 How It Works、FAQ、About 文字内容由服务端组件渲染（LandingContent.tsx）
- [x] Dashboard.tsx 数据已加载分支中存在 `<h1 className="sr-only">`
- [x] `generateMetadata()` 的 `openGraph.images` 明确定义图片格式
- [x] `public/landing/notion_sketch_chart_light_old.png` 已删除
- [x] `public/landing/notion_sketch_chart_dark_preview.png` 已删除
- [x] `public/landing/notion_sketch_csv_dark_preview.png` 已删除
- [x] `next build` 静态导出成功，无编译错误
- [x] 构建后检查 `out/robots.txt` 内容正确
- [x] 构建后检查 `out/sitemap.xml` 引用与 robots.txt 一致
