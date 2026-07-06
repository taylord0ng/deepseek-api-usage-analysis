* [x] 英文公开页面继续使用现有无前缀 URL，访问不报错

* [x] 中文公开页面存在 `/zh/...` 镜像 URL，且可直接访问

* [x] 当前页面语言由 URL 决定，首屏不依赖浏览器语言检测

* [x] `LanguageSwitcher` 切换语言时会跳转到当前页面的另一语言 URL

* [x] 首页、博客列表、博客详情、作者页、法律页在中英文下都输出对应语言的 metadata

* [x] `canonical` 指向当前语言 URL，`alternates.languages` 正确声明双语对应关系

* [x] sitemap.xml 同时包含英文与中文 URL

* [x] 关键内部链接在中文页保持中文路径，在英文页保持英文路径

* [x] 现有英文外链与分享链接保持兼容

  * 验收证据：`src/components/TitleBar.tsx` 中桌面端与移动端 GitHub 图标均指向 `deepseekProject.githubUrl`。
  * 导出产物证据：重新执行 `npm run build` 后，`out/index.html`、`out/blog.html`、`out/author.html`、`out/privacy.html` 中均不再包含 `https://github.com/GavinCnod/agnes-api-usage-analysis`。
  * 兼容性证据：上述英文页面仍保留 `https://github.com/GavinCnod/deepseek-api-usage-analysis` 作为当前项目 GitHub 入口。

* [x] `next build` 静态导出成功，无新增编译错误
