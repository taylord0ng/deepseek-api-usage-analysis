/**
 * All UI strings used in the app. Each key must have both en and zh values.
 * For interpolated values, use `{key}` placeholders (e.g., "{{count}} model(s)").
 */
const translations = {
  en: {
    app: {
      title: "DeepSeek API Usage Analytics",
      subtitle: "Drop your monthly CSV exports to see usage analytics",
    },
    tabs: {
      overview: "Overview",
      projects: "By Custom Projects",
      keys: "By Key",
      cache: "Cache",
      trends: "Trends",
    },
    header: {
      loadDifferent: "Load different files",
      clear: "Clear",
    },
    footer: {
      text: "DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team · Data processed locally in your browser · ",
      version: "Version",
    },
    dropzone: {
      processing: "Processing CSVs\u2026",
      title: "Drop your DeepSeek CSVs here or click to upload",
      hint: "Drop one or more months — amount-*.csv + cost-*.csv pairs, or a .zip archive",
      privacy:
        "Multiple months are auto-merged · Files stay in your browser — nothing is uploaded",
      oversizedTitle: "File too large",
      oversizedHint:
        "Each file must be under 50 MB. The file \"{name}\" is {size} MB. Large files may freeze the browser.",
    },
    kpi: {
      totalCost: "Total Cost",
      totalTokens: "Total Tokens",
      cacheHitRate: "Cache Hit Rate",
      activeKeys: "Active API Keys",
      saved: "{tokens} saved",
      models: "{count} model(s)",
    },
    overview: {
      dailyCost: "Daily Cost",
      costByKey: "Cost by API Key",
    },
    trends: {
      dailyCost: "Daily Cost",
      dailyTokens: "Daily Tokens",
      cacheHitRate: "Cache Hit Rate",
      requestCount: "Request Count",
      heroSubtitle: "Over {days} days",
    },
    cache: {
      hitRateTitle: "Cache Hit Rate",
      servedFromCache: "{tokens} input tokens served from cache",
      dailyHitRate: "Daily Cache Hit Rate",
      hitsVsMisses: "Cache Hits vs Misses by Key",
      noCacheTitle: "No cache usage detected",
      noCacheHint:
        "Enable prompt caching on your DeepSeek API calls to reduce costs.",
      hits: "Cache Hits",
      misses: "Cache Misses",
    },
    keys: {
      title: "Per-Key Breakdown",
      apiKeyName: "API Key Name",
      tokens: "Tokens",
      cost: "Cost",
      cacheHit: "Cache Hit",
      requests: "Requests",
      heroSubtitle: "{keys} key(s) · {models} model(s)",
    },
    error: {
      missingColumns: "CSV schema not recognized",
      malformedRow: "CSV parse error",
      emptyFile: "Empty file",
      incompleteUpload: "Incomplete upload",
      row: "Row",
      column: "Column",
    },
    warning: {
      dateMismatch: "Date mismatch",
      noCostMatch: "No cost data",
      partialCacheData: "Partial cache data",
      schemaDrift: "Schema drift",
    },
    meta: {
      title: "DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team",
      description:
        "Visualize your DeepSeek API usage — drop your monthly CSVs and get instant cost analytics, cache analysis, and per-key breakdowns. Free, open source, browser-side.",
    },
    langSwitcher: {
      label: "Language",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
    },
    modelFilter: {
      allModels: "All Models",
    },
    copyToast: {
      copied: "Copied {name} cost",
      clickToCopy: "Click to copy cost",
    },
    projects: {
      configure: "Configure",
      modalTitle: "Custom Project Configuration",
      projectName: "Project Name",
      addProject: "Add Project",
      removeProject: "Remove",
      save: "Save",
      cancel: "Cancel",
      uncategorized: "Uncategorized",
      heroProjects: "Projects",
      sectionTitle: "By Project",
      columnProject: "Project",
      dragHint: "Drag keys to assign them to projects",
      unassignedKeys: "Unassigned Keys",
      projectKeys: "Project Keys",
      dropHere: "Drop keys here",
      duplicateName: "Project name already exists",
      unsavedChanges: "Discard unsaved changes?",
      discard: "Discard",
      keyboardHint: "Tip: Drag keys to assign, or select a project from the dropdown on each unassigned key (keyboard: Tab to select → Enter to confirm)",
      resetConfig: "Reset All",
      emptyHint: "Click the gear icon to configure custom project groups",
      assignTo: "Assign to\u2026",
    },
    guideline: {
      pageTitle: "User Guide",
      backToHome: "Back to Home",
      viewGuide: "View Full Guide →",
      toc: "Table of Contents",
      footerNote:
        "This document is updated with app releases. For questions or suggestions, please reach out via {githubLink}.",
    },
    changelog: {
      pageTitle: "Changelog",
      backToHome: "Back to Home",
      intro:
        "Track the evolution of the DeepSeek API Usage Analytics Dashboard. Every version is documented below, covering new features, improvements, bug fixes, and dependency changes since the initial v0.1.0 release.",
      added: "Added",
      improved: "Improved",
      fixed: "Fixed",
      dependencies: "Dependencies",
      githubLabel: "GitHub Repository",
      reviewSourceCode: "Review source code →",
      lastUpdated: "Last updated: June 17, 2026",
      viewChangelog: "View Changelog →",
    },
    privacy: {
      pageTitle: "Privacy Policy",
      effectiveDate: "Effective Date: June 13, 2026",
      intro:
        "Your privacy is critically important to us. This Privacy Policy explains how the DeepSeek API Usage Analytics Dashboard (\"the App\") handles your data.",
      noCollectionTitle: "1. No Data Collection",
      noCollectionDesc:
        "The App is a pure client-side application. All CSV file parsing, cost computation, and chart rendering happen entirely within your browser. We do not collect, store, transmit, or have access to any of the CSV data you upload.",
      localProcessingTitle: "2. Local Processing",
      localProcessingDesc:
        "Your DeepSeek CSV files (amount-*.csv, cost-*.csv) are read and processed exclusively by JavaScript running in your browser. No data is sent to any backend server, database, or third-party service. The App has no server-side component for data handling. Application preferences you configure, such as custom project groupings, are stored only in your browser's local storage and are never transmitted.",
      analyticsTitle: "3. Google Analytics",
      analyticsDesc:
        "We use Google Analytics 4 (GA4) to collect anonymized page-view statistics. This helps us understand how the App is being used so we can improve it. GA4 may use cookies and collect information such as page URLs visited, browser type, and approximate geographic region. No CSV content or usage data from your uploaded files is tracked.",
      analyticsOptOut:
        "You can opt out of Google Analytics tracking by using a browser extension such as Google's opt-out addon, or by configuring your browser to block third-party cookies.",
      gaIdNote:
        "Google Analytics is only active when the environment variable NEXT_PUBLIC_GA_ID is configured. In local development environments, no analytics scripts are loaded.",
      thirdPartyTitle: "4. Third-Party Services",
      thirdPartyDesc:
        "Aside from Google Analytics (when configured), the App does not integrate any other third-party services, SDKs, or tracking scripts. No advertising networks, data brokers, or analytics providers beyond GA4 are used.",
      securityTitle: "5. Security",
      securityDesc:
        "Since all data processing occurs locally, your CSV files are inherently secure — they never leave your device. The App is served over HTTPS to ensure the application code is transmitted securely.",
      changesTitle: "6. Changes to This Policy",
      changesDesc:
        "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.",
      contactTitle: "7. Contact",
      contactDesc:
        "If you have questions or concerns about this Privacy Policy, please open an issue on our GitHub repository or reach out to the development team.",
      githubLabel: "GitHub Repository",
      reviewSourceCode: "Review source code \u2192",
    },
    terms: {
      pageTitle: "Terms of Use",
      effectiveDate: "Effective Date: June 13, 2026",
      intro:
        "By using the DeepSeek API Usage Analytics Dashboard (\"the App\"), you agree to these Terms of Use. If you do not agree, please do not use the App.",
      asIsTitle: "1. As-Is Service",
      asIsDesc:
        "The App is provided \"as is\" and \"as available,\" without warranties of any kind, either express or implied. We do not guarantee that the App will be error-free, uninterrupted, or suitable for your specific needs.",
      noWarrantyTitle: "2. No Warranty",
      noWarrantyDesc:
        "To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Use of the App is at your own risk.",
      notAffiliatedTitle: "3. Not Affiliated with DeepSeek",
      notAffiliatedDesc:
        "This App is an independent, open-source project developed by Gavin Chen and the MindRose team. It is not affiliated with, endorsed by, or sponsored by DeepSeek (深度求索). All DeepSeek-related trademarks belong to their respective owners.",
      userDataTitle: "4. User Data & Responsibility",
      userDataDesc:
        "The App processes CSV data entirely in your browser. You are solely responsible for the data you upload and any decisions made based on the analytics results. We do not store, transmit, or have access to your data, and we bear no responsibility for any inaccuracies in the displayed analytics.",
      openSourceTitle: "5. Open Source",
      openSourceDesc:
        "The App is open source software released under the MIT License. You are free to review, modify, and distribute the source code in accordance with the license terms. The source code is available on GitHub.",
      openSourceLicense:
        "Full license text: MIT License \u2014 see the LICENSE file in the project repository.",
      limitationTitle: "6. Limitation of Liability",
      limitationDesc:
        "In no event shall the developers or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the App, even if advised of the possibility of such damages. This includes, but is not limited to, damages for errors, omissions, service interruptions, or financial losses.",
      changesTitle: "7. Changes to These Terms",
      changesDesc:
        "We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Continued use of the App after changes constitutes acceptance of the revised terms.",
      contactTitle: "8. Contact",
      contactDesc:
        "If you have questions about these Terms of Use, please open an issue on our GitHub repository or reach out to the development team.",
      githubLabel: "GitHub Repository",
      reviewSourceCode: "Review source code \u2192",
    },
    landing: {
      howItWorksTitle: "How It Works",
      howItWorksStep1Title: "1. Export Data",
      howItWorksStep1Desc:
        "Go to DeepSeek Platform → Usage → Export monthly data. Each month downloads as a ZIP containing amount and cost CSVs.",
      howItWorksStep2Title: "2. Drag & Drop",
      howItWorksStep2Desc:
        "Drag your ZIP files (or extracted CSVs) onto this page. Multiple months are automatically paired and merged.",
      howItWorksStep3Title: "3. View Analytics",
      howItWorksStep3Desc:
        "Instantly see cost charts, per-key breakdowns, cache hit analysis, usage trends, and custom project groupings — all processed locally in your browser.",
      qaTitle: "Frequently Asked Questions",
      qaQ1: "Is my data uploaded to any server?",
      qaA1: "No. All CSV parsing and cost computation runs entirely in your browser. Your data never leaves your device.",
      qaQ2: "What files do I need to upload?",
      qaA2: "You can drag the ZIP archive downloaded from the DeepSeek Platform directly — no extraction needed. Or you can extract and upload the amount-*.csv and cost-*.csv files manually.",
      qaQ3: "Can I analyze multiple months at once?",
      qaA3: "Yes. Drag all your monthly ZIP (or CSV) files at once — they will be automatically paired by filename and concatenated.",
      qaQ4: "What models are supported?",
      qaA4: "Any model listed in your DeepSeek exports. The dashboard auto-detects all models and provides a filter to view them individually or combined.",
      qaQ5: "Why does my cost show as $0?",
      qaA5: "You need to upload both the amount CSV and the cost CSV for the same month. If either file is missing, cost data cannot be calculated.",
      qaQ6: "What does \"Incomplete Upload\" mean?",
      qaA6: "It means a month has only the amount file or only the cost file — not both. Add the missing file and re-upload to resolve this.",
      qaQ7: "Where can I find more troubleshooting help?",
      qaA7: "Check the Troubleshooting section in our full User Guide. It covers common issues like CSV format errors, cache configuration, file naming conventions, and more.",
      qaQ8: "Is there a file size limit?",
      qaA8: "Yes, each file must be under 50 MB. This prevents malicious ZIP bombs from freezing your browser. DeepSeek monthly usage exports are typically under 1 MB, so this limit should never be an issue for normal use.",
      qaQ9: "Can I group API keys by custom projects?",
      qaA9: "Yes. Switch to the 'By Custom Projects' tab and click the gear icon to open the configuration panel. Drag API key names from the unassigned pool into your custom project groups. Your project configuration is saved in your browser's local storage.",
      aboutSectionTitle: "About",
      aboutWhyTitle: "Why We Built This",
      aboutWhyDesc:
        "As our DeepSeek API calls surged, we found the official CSV billing exports nearly impossible to read at a glance. To answer questions like \"which project consumed the most tokens?\" and \"what is our real cache hit rate?\", we built our own simple, intuitive, and absolutely secure visualization dashboard.",
      aboutPrivacyTitle: "Under the Hood: Privacy & Tech",
      aboutPrivacyDesc:
        "When handling billing data, privacy is non-negotiable. That's why we chose a pure frontend architecture. Built with Next.js 16 (App Router) and React 19, powered by Papa Parse and ECharts, all CSV parsing and chart rendering happens 100% locally in your browser. No backend server, no database — your data never leaves your device. With Apple-inspired minimalist design and CSS custom property-driven dual themes, we aim to deliver the most elegant data analytics experience.",
      aboutMindRoseTitle: "About MindRose",
      aboutMindRoseDesc:
        "This project is open-sourced by Gavin Chen and the MindRose team. MindRose is a tech team focused on delivering lightweight digital solutions for small and medium manufacturers, logistics companies, and cross-border traders. We don't sell vague \"digital transformation\" concepts — we use AI and full-stack agile development (Next.js, React, Mendix, etc.) to deliver applications that solve real business pain points within weeks. From SEO-optimized independent e-commerce sites, to agile internal system builds, to AI agent workflow integration — we understand tech, and more importantly, we understand your business.",
      aboutContactTitle: "Let's Work Together",
      aboutContactDesc:
        "Looking to build a custom data dashboard for your business? Need deep AI integration into your workflows? Want modern, elegant UI/UX? Need cross-department, multi-terminal business systems? Or interested in collaborating on this open-source project?",
      aboutContactService:
        "We offer professional bottleneck diagnosis, transformation analysis, tailored business solutions, and AI-powered development and operations.",
      aboutContactCTA: "Get in touch:",
      aboutGitHubLabel: "Project GitHub Repo",
      aboutLinkedInLabel: "Gavin's LinkedIn",
      aboutMindRoseLabel: "MindRose Team",
    },
  },

  zh: {
    app: {
      title: "DeepSeek API 用量分析",
      subtitle: "拖拽月度 CSV 文件即可查看用量分析",
    },
    tabs: {
      overview: "总览",
      projects: "按自定义项目",
      keys: "按 Key",
      cache: "缓存",
      trends: "趋势",
    },
    header: {
      loadDifferent: "加载其他文件",
      clear: "清除",
    },
    footer: {
      text: "DeepSeek API 用量分析仪表盘 · 数据仅在浏览器本地处理 · ",
      version: "版本",
    },
    dropzone: {
      processing: "正在处理 CSV\u2026",
      title: "拖拽 DeepSeek CSV 文件到此处或点击上传",
      hint: "拖拽一个或多个月份 — amount-*.csv + cost-*.csv 文件对，或 .zip 压缩包",
      privacy: "多月份自动合并 · 文件仅存储在浏览器中 — 不会上传",
      oversizedTitle: "文件过大",
      oversizedHint:
        "单个文件不能超过 50 MB。文件 \"{name}\" 大小为 {size} MB。过大的文件可能导致浏览器卡死。",
    },
    kpi: {
      totalCost: "总费用",
      totalTokens: "总 Token 数",
      cacheHitRate: "缓存命中率",
      activeKeys: "活跃 API Key",
      saved: "节省 {tokens}",
      models: "{count} 个模型",
    },
    overview: {
      dailyCost: "每日费用",
      costByKey: "各 Key 费用分布",
    },
    trends: {
      dailyCost: "每日费用",
      dailyTokens: "每日 Token",
      cacheHitRate: "缓存命中率",
      requestCount: "请求次数",
      heroSubtitle: "共 {days} 天",
    },
    cache: {
      hitRateTitle: "缓存命中率",
      servedFromCache: "{tokens} 个输入 token 由缓存提供",
      dailyHitRate: "每日缓存命中率",
      hitsVsMisses: "各 Key 缓存命中 / 未命中",
      noCacheTitle: "未检测到缓存使用",
      noCacheHint: "在 DeepSeek API 调用中启用提示缓存以降低费用。",
      hits: "缓存命中",
      misses: "缓存未命中",
    },
    keys: {
      title: "各 Key 详情",
      apiKeyName: "API Key 名称",
      tokens: "Token 数",
      cost: "费用",
      cacheHit: "缓存命中",
      requests: "请求数",
      heroSubtitle: "{keys} 个 Key · {models} 个模型",
    },
    error: {
      missingColumns: "CSV 格式无法识别",
      malformedRow: "CSV 解析错误",
      emptyFile: "空文件",
      incompleteUpload: "上传不完整",
      row: "行",
      column: "列",
    },
    warning: {
      dateMismatch: "日期不匹配",
      noCostMatch: "缺少费用数据",
      partialCacheData: "缓存数据不完整",
      schemaDrift: "数据结构不一致",
    },
    meta: {
      title: "DeepSeek API 用量分析仪表盘",
      description:
        "可视化您的 DeepSeek API 使用情况 — 拖拽月度 CSV，即时获取费用分析、缓存分析和各 Key 用量明细。数据 100% 本地处理，不上传任何服务器。免费、开源，由 Gavin Chen 和 MindRose 团队维护。",
    },
    langSwitcher: {
      label: "语言",
    },
    theme: {
      light: "浅色",
      dark: "深色",
      switchToDark: "切换至深色模式",
      switchToLight: "切换至浅色模式",
    },
    modelFilter: {
      allModels: "全部模型",
    },
    copyToast: {
      copied: "已复制 {name} 费用",
      clickToCopy: "点击复制费用",
    },
    projects: {
      configure: "配置",
      modalTitle: "自定义项目配置",
      projectName: "项目名称",
      addProject: "添加项目",
      removeProject: "移除",
      save: "保存",
      cancel: "取消",
      uncategorized: "未分类",
      heroProjects: "个项目",
      sectionTitle: "按项目",
      columnProject: "项目",
      dragHint: "拖拽 Key 分配到对应项目",
      unassignedKeys: "未分配 Key",
      projectKeys: "项目 Key",
      dropHere: "拖拽 Key 到此处",
      duplicateName: "项目名称已存在",
      unsavedChanges: "放弃未保存的修改？",
      discard: "放弃",
      keyboardHint: "提示：拖拽 Key 分配项目，或使用未分配 Key 旁的下拉菜单通过键盘操作（Tab 选择 → Enter 确认）",
      resetConfig: "全部重置",
      emptyHint: "点击齿轮图标配置自定义项目分组",
      assignTo: "分配到\u2026",
    },
    guideline: {
      pageTitle: "用户操作手册",
      backToHome: "返回首页",
      viewGuide: "查看完整操作指南 →",
      toc: "目录",
      footerNote:
        "文档随应用版本迭代更新。如有疑问或建议，欢迎通过 {githubLink} 反馈。",
    },
    changelog: {
      pageTitle: "更新日志",
      backToHome: "返回首页",
      intro:
        "追踪 DeepSeek API 用量分析仪表盘的演进历程。自 v0.1.0 初始版本以来，每个版本的新增功能、改进优化、问题修复和依赖变更均记录如下。",
      added: "新增",
      improved: "改进",
      fixed: "修复",
      dependencies: "依赖变更",
      githubLabel: "GitHub 仓库",
      reviewSourceCode: "查看源码验证 →",
      lastUpdated: "最后更新：2026 年 6 月 17 日",
      viewChangelog: "查看更新日志 →",
    },
    privacy: {
      pageTitle: "隐私政策",
      effectiveDate: "生效日期：2026 年 6 月 13 日",
      intro:
        "您的隐私对我们至关重要。本隐私政策说明了 DeepSeek API 用量分析仪表盘（以下简称\u201C本应用\u201D）如何处理您的数据。",
      noCollectionTitle: "1. 不收集数据",
      noCollectionDesc:
        "本应用是纯客户端应用。所有 CSV 文件解析、费用计算和图表渲染都在您的浏览器内完成。我们不会收集、存储、传输或访问您上传的任何 CSV 数据。",
      localProcessingTitle: "2. 本地处理",
      localProcessingDesc:
        "您的 DeepSeek CSV 文件（amount-*.csv、cost-*.csv）仅由浏览器中运行的 JavaScript 读取和处理。任何数据都不会发送到后台服务器、数据库或第三方服务。本应用没有用于数据处理的服务器端组件。您配置的应用程序偏好设置（如自定义项目分组）仅保存在浏览器的本地存储中，不会向外传输。",
      analyticsTitle: "3. Google Analytics（谷歌分析）",
      analyticsDesc:
        "我们使用 Google Analytics 4（GA4）收集匿名的页面访问统计数据，以了解应用的使用情况并持续改进。GA4 可能会使用 Cookie 并收集页面 URL、浏览器类型和大致地理位置等信息。您上传的 CSV 内容和使用数据不会被跟踪。",
      analyticsOptOut:
        "您可以通过安装浏览器的 Google 选择退出插件，或将浏览器配置为阻止第三方 Cookie，来选择退出 Google Analytics 跟踪。",
      gaIdNote:
        "Google Analytics 仅在环境变量 NEXT_PUBLIC_GA_ID 已配置时激活。在本地开发环境中，不会加载任何分析脚本。",
      thirdPartyTitle: "4. 第三方服务",
      thirdPartyDesc:
        "除 Google Analytics（已配置时）外，本应用不集成任何其他第三方服务、SDK 或跟踪脚本。不使用广告网络、数据代理或 GA4 之外的任何分析服务。",
      securityTitle: "5. 安全性",
      securityDesc:
        "由于所有数据处理均在本地进行，您的 CSV 文件本质上是安全的——它们永远不会离开您的设备。本应用通过 HTTPS 提供服务，确保应用代码安全传输。",
      changesTitle: "6. 政策变更",
      changesDesc:
        "我们可能会不时更新本隐私政策。变更将在本页面发布，并附上更新后的生效日期。我们建议您定期查看本政策。",
      contactTitle: "7. 联系我们",
      contactDesc:
        "如果您对本隐私政策有任何疑问或疑虑，请在我们的 GitHub 仓库提交 Issue，或联系开发团队。",
      githubLabel: "GitHub 仓库",
      reviewSourceCode: "查看源码验证 \u2192",
    },
    terms: {
      pageTitle: "使用条款",
      effectiveDate: "生效日期：2026 年 6 月 13 日",
      intro:
        "使用 DeepSeek API 用量分析仪表盘（以下简称\u201C本应用\u201D）即表示您同意本使用条款。如果您不同意，请勿使用本应用。",
      asIsTitle: "1. 按现状提供",
      asIsDesc:
        "本应用按\u201C现状\u201D和\u201C可用\u201D状态提供，不作任何明示或暗示的保证。我们不保证本应用无错误、不中断或适用于您的特定需求。",
      noWarrantyTitle: "2. 免责声明",
      noWarrantyDesc:
        "在法律允许的最大范围内，我们不承担所有保证，包括但不限于适销性、特定用途适用性和非侵权的默示保证。使用本应用的风险由您自行承担。",
      notAffiliatedTitle: "3. 与 DeepSeek 无关",
      notAffiliatedDesc:
        "本应用是由 Gavin Chen 和 MindRose 团队开发的独立开源项目。与 DeepSeek（深度求索）无任何关联、认可或赞助关系。所有 DeepSeek 相关商标归其各自所有者所有。",
      userDataTitle: "4. 用户数据与责任",
      userDataDesc:
        "本应用在您的浏览器中处理 CSV 数据。您对上传的数据以及基于分析结果做出的任何决策负全部责任。我们不存储、传输或访问您的数据，对于分析结果的任何不准确性不承担任何责任。",
      openSourceTitle: "5. 开源许可",
      openSourceDesc:
        "本应用是基于 MIT License 发布的开源软件。您可以自由查看、修改和分发源代码，但需遵守许可协议条款。源代码可在 GitHub 上获取。",
      openSourceLicense:
        "完整许可文本：MIT License — 请查看项目仓库中的 LICENSE 文件。",
      limitationTitle: "6. 责任限制",
      limitationDesc:
        "在任何情况下，开发者或贡献者均不对因使用或无法使用本应用而产生的任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任，即使已被告知此类损害的可能性。这包括但不限于因错误、遗漏、服务中断或财务损失造成的损害。",
      changesTitle: "7. 条款变更",
      changesDesc:
        "我们保留随时修改本使用条款的权利。变更将在本页面发布，并附上更新后的生效日期。变更后继续使用本应用即表示您接受修订后的条款。",
      contactTitle: "8. 联系我们",
      contactDesc:
        "如果您对本使用条款有任何疑问，请在我们的 GitHub 仓库提交 Issue，或联系开发团队。",
      githubLabel: "GitHub 仓库",
      reviewSourceCode: "查看源码验证 \u2192",
    },
    landing: {
      howItWorksTitle: "使用方式",
      howItWorksStep1Title: "1. 导出数据",
      howItWorksStep1Desc:
        "前往 DeepSeek 平台 → 用量 → 导出月度数据。每月下载一个 ZIP 包，内含 amount 和 cost 两个 CSV 文件。",
      howItWorksStep2Title: "2. 拖拽上传",
      howItWorksStep2Desc:
        "将 ZIP 文件（或解压后的 CSV）拖拽到此页面。多个月份文件会自动按文件名配对并合并。",
      howItWorksStep3Title: "3. 查看分析",
      howItWorksStep3Desc:
        "即刻查看费用图表、各 Key 用量明细、缓存命中分析、使用趋势和自定义项目分组 — 所有数据在浏览器本地处理。",
      qaTitle: "常见问题",
      qaQ1: "我的数据会上传到服务器吗？",
      qaA1: "不会。所有 CSV 解析和费用计算均在您的浏览器中完成，数据不会离开您的设备。",
      qaQ2: "我需要上传哪些文件？",
      qaA2: "直接拖拽从 DeepSeek 平台下载的 ZIP 压缩包即可，无需解压。也可以解压后手动上传 amount-*.csv 和 cost-*.csv 文件。",
      qaQ3: "可以同时分析多个月份吗？",
      qaA3: "可以。一次性拖入所有月份的 ZIP（或 CSV）文件，它们会根据文件名自动配对并拼接。",
      qaQ4: "支持哪些模型？",
      qaA4: "DeepSeek 导出中的所有模型均支持。仪表盘会自动检测所有模型，并提供筛选器以便单独或合并查看。",
      qaQ5: "为什么费用显示为 0？",
      qaA5: "需要同时上传同一个月的 amount CSV 和 cost CSV 两个文件。如果缺少其中任何一个，费用数据将无法计算。",
      qaQ6: "显示\u201C上传不完整\u201D是什么意思？",
      qaA6: "表示某个月份只有 amount 文件或只有 cost 文件，缺少另一个。补充缺失的文件并重新上传即可解决。",
      qaQ7: "哪里可以找到更多故障排查帮助？",
      qaA7: "请查看完整操作指南中的\u201C常见问题排查\u201D章节，涵盖了 CSV 格式错误、缓存配置、文件命名规范等常见问题。",
      qaQ8: "有文件大小限制吗？",
      qaA8: "有，单个文件不能超过 50 MB。这是为了防止恶意 ZIP 炸弹导致浏览器卡死。DeepSeek 月度用量导出文件通常小于 1 MB，正常使用不会触发此限制。",
      qaQ9: "可以按自定义项目分组 API Key 吗？",
      qaA9: "可以。切换到「按自定义项目」标签页，点击齿轮图标打开配置面板。将 API Key 从「未分配 Key」区域拖拽到对应的自定义项目分组中即可。项目配置保存在浏览器本地存储中。",
      aboutSectionTitle: "关于我们",
      aboutWhyTitle: "为什么开发这个工具？",
      aboutWhyDesc:
        "随着 DeepSeek API 调用的激增，我们发现官方后台导出的 CSV 账单数据难以直观阅读。\n为了搞清楚\u201C到底哪个项目消耗了最多的 Token\u201D以及\u201C缓存命中率如何\u201D，我们决定自己动手，打造一个简单、直观且绝对安全的可视化仪表盘。",
      aboutPrivacyTitle: "极致的隐私与技术架构",
      aboutPrivacyDesc:
        "处理账单数据，隐私是不可妥协的底线。因此，我们采用了纯前端的架构设计。\n基于 Next.js 16 (App Router) 和 React 19，结合 Papa Parse 与 ECharts，所有的 CSV 数据解析和图表渲染 100% 在你的浏览器本地完成。\n没有数据库，你的数据绝不会离开你的设备半步。\n配合 Apple 风格的极简设计和 CSS 自定义属性驱动的双主题，我们希望为你提供最优雅的数据分析体验。",
      aboutMindRoseTitle: "关于 MindRose",
      aboutMindRoseDesc:
        "本项目由 Gavin Chen 及 MindRose 团队开发并开源呈现。MindRose 是专注于为中小制造企业、物流公司及跨国贸易商提供轻量级数字化解决方案的科技团队。\n我们不卖虚无的\u201C数字化转型\u201D概念，而是通过 AI 技术与全栈敏捷开发（Next.js、React、Mendix 等），在几周内为你交付解决实际业务痛点的应用。\n从外贸独立站的 SEO 优化重构，到企业内部核心系统的敏捷搭建，再到 AI Agent 的业务流接入，我们懂技术，更懂你的商业场景。",
      aboutContactTitle: "商业合作",
      aboutContactDesc:
        "想要为你的企业定制类似的数据看板？或者需要将 AI 深度集成到你的业务工作流中？\n或者需要现代优雅的用户交互界面？或者需要多终端的跨部门业务系统？\n或者是基于当前开源项目的进一步合作？",
      aboutContactService:
        "我们提供专业的瓶颈诊断、变革点分析、结合业务的定制化方案、和基于 AI 的开发及运维服务。",
      aboutContactCTA: "联系我们：",
      aboutGitHubLabel: "本项目的 GitHub 仓库",
      aboutLinkedInLabel: "Gavin 的 LinkedIn 主页",
      aboutMindRoseLabel: "MindRose 团队主页",
    },
  },
} as const;

export type Locale = keyof typeof translations;

/** The common shape shared by all translation objects. */
export type TranslationShape = { [K in keyof typeof translations.en]: (typeof translations.en)[K] };

/**
 * Resolve literal string unions (e.g. "DeepSeek Usage" | "DeepSeek 用量")
 * so consuming code doesn't complain about incompatible literal types.
 */
export type TranslationKeys = {
  [K in keyof TranslationShape]: {
    [SK in keyof TranslationShape[K]]: string;
  };
};

export default translations;
