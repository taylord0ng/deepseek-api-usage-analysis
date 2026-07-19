<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

Strictly follows an Apple-minimalist design language: cold gray paper-texture backgrounds, ample whitespace, "no-card" full-width modules with thin horizontal dividers, subtle rounded corners, and diffuse shadows. Full light/dark dual-theme support driven by CSS custom properties. Bilingual EN/ZH with URL-level routing (`/zh/*`).

**Version**: 0.6.5
- **New in this version**: Blog metadata centralized management with `blogArticles.ts`, reusable `JsonLd.tsx` component for JSON-LD structured data, AuthorContent team member display refactored with array mapping pattern, schema unit tests added

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── (site)/     # English root layout group
│   │   ├── layout.tsx          # English root layout → AppRootLayout(locale="en")
│   │   ├── page.tsx            # Entry → renders <Dashboard />
│   │   ├── globals.css         # Tailwind v4 + @font-face Hubot Sans + CSS variables + reveal/accordion + base styles
│   │   ├── AppI18nShell.tsx    # Client shell: I18nProvider + <html lang> sync
│   │   ├── robots.ts           # Build-time robots.txt generation (Next.js 16 convention)
│   │   ├── sitemap.ts          # Build-time sitemap.xml (each route → en + zh bilingual entries)
│   │   ├── guideline/
│   │   │   └── page.tsx        # /guideline route with independent SEO metadata
│   │   ├── privacy/
│   │   │   └── page.tsx        # /privacy route with independent SEO metadata
│   │   ├── terms/
│   │   │   └── page.tsx        # /terms route with independent SEO metadata
│   │   ├── changelog/
│   │   │   └── page.tsx        # /changelog route with independent SEO metadata
│   │   ├── deepseek-api-cost-tracker/
│   │   │   └── page.tsx        # SEO landing: DeepSeek API Cost Tracker
│   │   ├── deepseek-cache-hit-rate-analyzer/
│   │   │   └── page.tsx        # SEO landing: DeepSeek Cache Hit Rate Analyzer
│   │   ├── deepseek-api-pricing-calculator/
│   │   │   └── page.tsx        # SEO landing: DeepSeek API Pricing Calculator
│   │   ├── blog/
│   │   │   ├── page.tsx                    # /blog article index: 3-card grid with tags/descriptions
│   │   │   ├── deepseek-context-caching-guide/page.tsx    # Blog article 1: Context caching deep-dive
│   │   │   ├── deepseek-cost-optimization-tools/page.tsx  # Blog article 2: Top 5 tools comparison
│   │   │   └── openai-claude-vs-deepseek-cost-comparison/page.tsx # Blog article 3: OpenAI vs Claude vs DeepSeek pricing
│   │   └── author/
│   │       └── page.tsx          # /author route with independent SEO metadata
│   ├── zh/       # Chinese root layout group (mirrors all (site)/ routes)
│   │   ├── layout.tsx          # Chinese root layout → AppRootLayout(locale="zh")
│   │   ├── page.tsx            # /zh home → <Dashboard />
│   │   ├── guideline/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── changelog/page.tsx
│   │   ├── deepseek-api-cost-tracker/page.tsx
│   │   ├── deepseek-cache-hit-rate-analyzer/page.tsx
│   │   ├── deepseek-api-pricing-calculator/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── author/page.tsx
│   │   └── blog/*/page.tsx     # 3 mirrored blog articles
│   └── AppRootLayout.tsx       # Shared root layout renderer: font, GA, ThemeProvider, I18nProvider, DataProvider, ProjectConfigProvider
├── components/
│   ├── TitleBar.tsx          # Shared sticky top nav: logo + app name + Agnes sister-project pill + GitHub + blog pen + guideline compass + changelog clock + LanguageSwitcher + ThemeSwitcher (all i18n, responsive popover on mobile)
│   ├── FooterBar.tsx         # Shared footer: "Related Tools" sister-project links row + copyright + nav links (guideline/privacy/terms/blog/author/changelog/GitHub) + version; optional animate prop for scroll-reveal
│   ├── LandingPage.tsx       # Pre-upload landing: Hero with theme-aware bg images + Upload + Sister Project section + HowItWorks + accordion QA (9 items) + multi-section About (Why/Privacy/MindRose/Contact with email copy & social links + "View Changelog →") + scroll-reveal
│   ├── LandingContent.tsx    # Server-rendered <noscript> fallback: HowItWorks + QA (9 items) + expanded multi-section About for SEO crawlers
│   ├── GuidelinePage.tsx     # Full interactive user guide page: bilingual content blocks (h1–h6, p, blockquote, tables, ul/ol), screenshot embedding with locale-aware image switching, dynamic table-of-contents, scroll-reveal sections (1660 lines)
│   ├── PrivacyPage.tsx        # Privacy policy page: bilingual content (7 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, GitHub source link
│   ├── TermsPage.tsx          # Terms of use page: bilingual content (8 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, MIT License reference
│   ├── ChangelogPage.tsx      # Changelog page: complete version history (v0.1.0–v0.6.5), entries by category with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist layout
│   ├── CostTrackerPage.tsx     # SEO landing page: DeepSeek API Cost Tracker — features + recommended tools (Portkey/Helicone affiliate links)
│   ├── CostTrackerContent.tsx  # <noscript> SEO fallback: bilingual cost tracker content for crawlers
│   ├── CacheAnalyzerPage.tsx   # SEO landing page: DeepSeek Cache Hit Rate Analyzer — caching education module + MindRose CTA
│   ├── CacheAnalyzerContent.tsx # <noscript> SEO fallback: bilingual cache analyzer content for crawlers
│   ├── PricingCalculatorPage.tsx  # SEO landing page: DeepSeek API Pricing Calculator — interactive slider + competitor table + Vultr CTA
│   ├── PricingCalculatorContent.tsx # <noscript> SEO fallback: bilingual pricing calculator content for crawlers
│   ├── AuthorPage.tsx          # Author/Gavin profile page: bilingual bio, skills tags, social links, JSON-LD Person schema, independent SEO metadata
│   ├── AuthorContent.tsx       # <noscript> SEO fallback: bilingual author bio for crawlers (EEAT signals)
│   ├── BlogPostLayout.tsx     # Reusable blog post template: Apple-minimalist layout (max-w-2xl), metadata row, cross-links, CTA banner
│   ├── BlogArticlePage.tsx    # Generic blog article wrapper: locale-aware content loading, renders BlogPostLayout + ArticleRenderer
│   ├── ArticleRenderer.tsx    # Structured content renderer: walks ArticleSection[] blocks, renders h2/h3/p/ul/ol/code/table with Apple-minimalist typography
│   ├── BlogIndex.tsx          # Blog index page: 3-card grid with bilingual titles/descriptions/tags from translations
│   ├── PrivacyContent.tsx     # <noscript> SEO fallback: bilingual privacy policy for crawlers
│   ├── TermsContent.tsx       # <noscript> SEO fallback: bilingual terms of use for crawlers
│   ├── ChangelogContent.tsx   # <noscript> SEO fallback: bilingual changelog version summary for crawlers
│   ├── CopyButton.tsx        # Reusable clipboard copy button with hover tooltip, i18n-aware toast, timer cleanup (KeyView, ProjectView, OverviewView)
│   ├── ShareButton.tsx       # Share icon button in tab nav bar → opens ShareModal
│   ├── ShareCard.tsx         # 1200×630 social media infographic card: per-tab designs (Overview/Projects/Keys/Cache/Trends) with KPI hero, ECharts mini-chart, QR code, logo watermark
│   ├── ShareModal.tsx        # Share dialog: live preview, "From XXX" name input (localStorage persisted), custom message, clipboard copy (WeChat/Feishu/DingTalk compatible), PNG download
│   ├── AffiliateWall.tsx     # Commercial recommendation module: card-based layout for affiliate/recommended tools with bilingual descriptions, commission info, and outbound click tracking
│   ├── Dashboard.tsx         # Main layout: routes between LandingPage (no data) and Dashboard view with 5 tabs (Overview / By Project / By Key / Cache / Trends); semantic hidden H1 for SEO; ShareButton integrated in tab nav bar
│   ├── DropZone.tsx          # Drag-and-drop CSV/ZIP uploader (multi-file, ZIP auto-extraction, 50MB limit, "or click to upload", error handling with inline error banner)
│   ├── ProjectView.tsx       # "By Project" tab: aggregates API keys into custom project groups (drag-and-drop config), per-project cost/token/cache stats with inline bars, CopyButton integration
│   ├── KPICards.tsx          # Summary stat cards (card-less big-number layout)
│   ├── OverviewView.tsx      # Hero total cost + daily cost bars + cost-by-key donut (theme-aware)
│   ├── KeyView.tsx           # Hero key count + per-key table with inline bars & cache-hit color coding
│   ├── CacheView.tsx         # Hero hit rate + daily trend line + per-key hits-vs-misses stacked bars with hit% labels + tooltip
│   ├── TrendsView.tsx        # Hero dynamic metric + toggleable multi-metric line chart (theme-aware; cacheHitRate computed from raw hit/miss tokens per-date)
│   ├── ErrorDisplay.tsx      # Parse error + warning banners with i18n titles
│   ├── LanguageSwitcher.tsx  # EN / 中文 toggle (Apple pill segmented control with role="radio")
│   └── ThemeSwitcher.tsx     # Light / Dark toggle (Apple-minimalist SVG icon button)
├── i18n/
│   ├── index.ts              # Barrel export
│   ├── I18nProvider.tsx      # React context + useTranslation hook + localStorage persistence
│   └── translations.ts       # All UI strings in en/zh (35+ key groups: app, tabs, header, footer, dropzone, kpi, overview, trends, cache, keys, projects, share, landing, guideline, privacy, terms, changelog, meta, theme, modelFilter, copyToast, empty, blog, blogIndex, author, costTracker, cacheAnalyzer, pricingCalculator)
└── lib/
    ├── types.ts              # AmountRow, CostRow, DailyUsage, KeyStats, ParseResult, ParseError, ParseWarning
    ├── parser.ts             # Papa Parse CSV pipeline (parse → pivot → join → computeKeyStats)
    ├── concatFiles.ts        # Multi-month CSV/ZIP pairing, extraction & concat + 50MB size limit
    ├── format.ts             # Locale-aware formatCost / formatTokens / formatPercent / formatCostFull / formatTokensFull
    ├── schema.ts             # JSON-LD structured data: SoftwareApplication + FAQPage + BreadcrumbList + Organization (bilingual en/zh, versioned, uses sisterProjects for site URLs, GitHub links, sameAs array, brand)
    ├── DataContext.tsx        # Data state + model filter (selectedModel, filteredResult, filterResult)
    ├── ProjectConfigContext.tsx  # Custom project grouping config: drag-and-drop key assignment, localStorage persistence, uncategorized fallback, reset-to-default
    ├── ThemeContext.tsx       # Light/dark theme context + useTheme hook + localStorage + system preference
    ├── shareCardData.ts      # Share card data extraction: extracts per-tab summary data from ParseResult
    ├── analytics.ts          # GA4 event tracking helper: trackEvent(name, params?) + trackOutboundClick + trackLandingCTA with gtag guard
    ├── sisterProjects.ts     # Sister project cross-linking: Agnes/DeepSeek brand info, tracked URLs with UTM params, TOOL_SERIES_NAME, buildTrackedSisterUrl()
    ├── affiliates.ts         # Affiliate marketing link config: Vultr/DO/Namecheap/OpenRouter/TencentCloud referral URLs, recommended tools list, centralized management
    ├── authors.ts            # Author profile config: Gavin social/contact links, team member page URLs, buildAuthorMetadata() for SEO
    ├── blogArticles.ts       # Blog article definitions: slug, pathname, titleKey, descriptionKey, keywords, publishedTime, author — centralized single source of truth
    ├── content.ts            # Article content type definitions: ArticleSection[], ContentBlock (h3/p/ul/ol/inline_code/compare_note), RichParagraph, InlineSegment, PricingRow, ArticleContent
    ├── content/articleCaching.ts   # Article 1 content: DeepSeek context caching guide (bilingual ArticleContent)
    ├── content/articleTools.ts     # Article 2 content: Top 5 cost optimization tools comparison (bilingual ArticleContent)
    ├── content/articleOpenai.ts    # Article 3 content: OpenAI GPT vs Claude vs DeepSeek V4 Pro cost comparison (bilingual ArticleContent + pricingTable)
    ├── localeRouting.ts      # URL-level language routing: DEFAULT_LOCALE, ZH_LOCALE_PREFIX, isZhPathname(), getLocaleFromPathname(), stripLocalePrefix(), normalizePublicPath(), buildLocalePathname(), buildLocaleUrl(), buildLocaleAlternates(), getOpenGraphLocale(), buildLocalePath(), switchLocalePath()
    ├── site.ts               # Site-level public constants: SITE_URL, SITE_NAME, OG_IMAGE_URL, LOGO_IMAGE_URL
    ├── pageMetadata.ts       # Page-level SEO metadata builder: LocalizedSeoText, LocalizedPageMetadataInput, buildLocalizedPageMetadata() (canonical, alternates.languages, OpenGraph, Twitter, keywords, author)
    └── routeMetadata.ts      # Route-specific metadata builders: buildHomeMetadata(), buildGuidelineMetadata(), buildPrivacyMetadata(), buildTermsMetadata(), buildChangelogMetadata(), buildCostTrackerMetadata(), buildCacheAnalyzerMetadata(), buildPricingCalculatorMetadata(), buildAuthorPageMetadata(), buildBlogIndexMetadata(), buildArticleCachingMetadata(), buildArticleToolsMetadata(), buildArticleOpenAiMetadata()

public/
├── ds-usage-logo.ico        # Favicon / app icon
├── ds-usage-logo.png        # App icon (PNG, 512×512, used in OpenGraph/Twitter metadata)
├── og_image.png             # Alternative OG image filename
├── og-image.png             # Social preview image (PNG, 1200×630, primary OpenGraph/Twitter image)
├── llms.txt                 # LLM-friendly site description (markdown): what the app does, how it works, privacy, links
├── llms-full.txt            # Expanded LLM site description (markdown): full detail version for AI context windows
├── fonts/
│   ├── HubotSans-Regular.woff2   # Body text (weight 400)
│   ├── HubotSans-Medium.woff2    # Medium weight (500)
│   └── HubotSans-Bold.woff2      # Headings weight (700)
├── landing/
│   ├── notion_sketch_csv_light.png    # Hero decoration — CSV theme (light, left side)
│   ├── notion_sketch_csv_dark.png     # Hero decoration — CSV theme (dark, left side)
│   ├── notion_sketch_chart_light.png  # Hero decoration — chart theme (light, right side)
│   └── notion_sketch_chart_dark.png   # Hero decoration — chart theme (dark, right side)
└── guideline/
    ├── *-cn.png              # User guide screenshots — Chinese (annotated captures)
    └── *-en.png              # User guide screenshots — English (annotated captures)
```

## Key technical details

- **Static export** (`next.config.ts` → `output: "export"`) — no SSR, no Node server
- **All components are `"use client"`** — the app is purely client-side
- **Vitest** for testing — 90 tests across 7 test files covering analytics, schema, sitemap, localeRouting, DataContext error handling, DropZone error display, and BlogIndex
- **Community infrastructure**: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/ISSUE_TEMPLATE/` (bug_report.yml, feature_request.yml), `.github/PULL_REQUEST_TEMPLATE.md`
- **Next.js 16** with React 19 — App Router, `"use client"` directives, static export, route groups `()`
- **ECharts 6** via `echarts-for-react` for all visualizations (bar, line, pie/donut with theme-aware colors)
- **Papa Parse** for CSV parsing (runs in browser)
- **JSZip** for client-side ZIP extraction (DeepSeek platform ZIP exports)
- **Tailwind CSS v4** with `@theme inline` extensions — CSS-first configuration, no `tailwind.config.ts`
- **Hubot Sans** as primary font (local WOFF2, 3 weights: 400/500/700), with Chinese fallback stack (`PingFang SC`, `Microsoft YaHei`) — Apple-like typography
- **Geist Mono** (from `next/font/google`) for code — variable weight
- **CSS custom properties** for theming — all colors are `var(--bg)`, `var(--text-primary)`, etc.; NO hardcoded colors in components
- **TypeScript 5** with strict mode, path alias `@/*` → `./src/*`
- **Bilingual routing** — English routes are prefix-free (`/`, `/guideline`, `/blog`), Chinese routes use `/zh` prefix (`/zh`, `/zh/guideline`, `/zh/blog`). Shared `AppRootLayout.tsx` renders both with correct `<html lang>` and locale bootstrap script.
- **SEO**: `generateMetadata()` per route group, `routeMetadata.ts` (centralized metadata builders), `pageMetadata.ts` (localized page metadata helper), `buildLocalizedPageMetadata()` handles canonical, alternates.languages (en/zh), OpenGraph, Twitter, keywords, author. JSON-LD via reusable `<JsonLd />` component consuming `schema.ts`. 8 bilingual script tags total (SoftwareApplication + FAQPage + BreadcrumbList + Organization). robots.txt + sitemap.xml (each route generates en + zh entries with `alternates.languages`). `<noscript>` crawler fallback, semantic hidden H1, `llms.txt`.
- **Analytics**: Google Analytics via `NEXT_PUBLIC_GA_ID` env var — gtag.js injected in `<head>` at build time. Tracks page views, file uploads, share card generations, tab switches, language switches, affiliate clicks, landing CTA clicks — zero CSV data ever tracked.

## SEO, Analytics & Deployment

### SEO architecture

Multi-layered bilingual SEO for a client-rendered static SPA:
- **Build-time**: `robots.ts` + `sitemap.ts` generate `/robots.txt` and `/sitemap.xml`. Each route produces two entries (en prefix-free + zh `/zh` prefix) with cross-referenced `alternates.languages`. Includes `/`, `/guideline`, `/privacy`, `/terms`, `/changelog`, `/blog`, `/author`, 3 SEO landing pages, 3 blog articles. Site URL from `NEXT_PUBLIC_SITE_URL` env var (default: `https://deepseek-usage.xyz`).
- **`generateMetadata()`**: `(site)/layout.tsx`, `zh/layout.tsx`, and each `page.tsx` use centralized builders from `routeMetadata.ts` → `pageMetadata.ts`. Handles canonical, OpenGraph (with `alternateLocale`), Twitter card, hreflang alternates, keywords, author, `twitter:site`/`creator`.
- **JSON-LD**: `src/lib/schema.ts` generates bilingual `SoftwareApplication` + `FAQPage` (9 Q&A) + `BreadcrumbList` + `Organization` — 8 `<script type="application/ld+json">` tags rendered via reusable `<JsonLd />` component. Organization schema includes `sameAs` links to both DeepSeek and Agnes GitHub repos, plus `brand: "API Usage Analyzer Series"`. Privacy/terms/changelog pages each have client-rendered `WebPage` schema. Blog articles include `BlogPosting` schema. Author page includes `Person` schema. Site URLs, GitHub URLs, and tool branding sourced from `sisterProjects.ts` and `authors.ts`.
- **`<noscript>` fallback**: `LandingContent.tsx` outputs How It Works, FAQ (9 items), About for crawlers that don't execute JS. `PrivacyContent.tsx`, `TermsContent.tsx`, `ChangelogContent.tsx`, `CostTrackerContent.tsx`, `CacheAnalyzerContent.tsx`, `PricingCalculatorContent.tsx`, and `AuthorContent.tsx` provide bilingual `<noscript>` SEO fallbacks (EEAT trust signals). Note: the Sister Project section is NOT in `LandingContent.tsx` (marketing cross-link, not SEO-critical).
- **Client enhancements**: Visible `<h1>` on landing, `sr-only` `<h1>` on dashboard, theme-aware hero images, `llms.txt` for LLM-friendly site description.

### Google Analytics

Opt-in GA4 via `NEXT_PUBLIC_GA_ID` env var. When set, gtag.js injected in `<head>` at build time. Tracks standard page-views, file uploads, share card generations, tab switches, language switches, affiliate clicks, and landing CTA clicks — zero CSV data tracking. When unset, zero overhead. Configure in deployment env only.

### Deployment & Security (`vercel.json`)

Root-level `vercel.json` configures production deployment on Vercel with security headers and cache rules:

- **Security headers** (applied to all routes `/(.*)`):
  - `X-Content-Type-Options: nosniff` — prevents MIME type sniffing
  - `X-Frame-Options: DENY` — blocks clickjacking
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy`: `default-src 'self'` with allowances for Google Analytics/Tag Manager (`script-src`, `img-src`, `connect-src`)
- **Static asset caching**:
  - `/_next/static/*` and `/fonts/*` → `max-age=31536000, immutable` (1 year)
  - `/landing/*` and `/guideline/*` → `max-age=604800, stale-while-revalidate=86400` (1 week)
  - Favicon, `llms.txt`, `sitemap.xml`, `robots.txt` → `max-age=86400` (1 day)
- **Compatible** with any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages) — only the `vercel.json` syntax is Vercel-specific; the security header values are universal

## Sub-pages

All sub-pages follow the same pattern: route directory under `src/app/(site)/` (English) with a mirror under `src/app/zh/` (Chinese), each with independent `generateMetadata()` and SEO. URL in sitemap.xml (both locales), navigation links in `FooterBar.tsx`.

- **`/guideline`** (`GuidelinePage.tsx`): Bilingual user manual — markdown-like content blocks, 24 annotated screenshots (12 per locale), dynamic sidebar ToC with Intersection Observer scroll tracking. Priority 0.8 in sitemap.
- **`/privacy`** (`PrivacyPage.tsx`): 7-section bilingual legal text, JSON-LD WebPage schema, `max-w-3xl` centered layout, GitHub source links for transparency. Priority 0.5 in sitemap.
- **`/terms`** (`TermsPage.tsx`): 8-section bilingual legal text, MIT License reference, JSON-LD WebPage schema, `max-w-2xl` layout. Priority 0.5 in sitemap.
- **`/changelog`** (`ChangelogPage.tsx`): Complete version history from v0.1.0 to v0.6.5, entries organized by category (Added/Improved/Fixed/Dependencies) with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist layout matching privacy/terms pages. Priority 0.5 in sitemap.
- **`/deepseek-api-cost-tracker`** (`CostTrackerPage.tsx`): SEO landing for "deepseek api cost tracker" intent — features + recommended tools (Portkey/Helicone affiliate links) + `<noscript>` fallback (`CostTrackerContent.tsx`).
- **`/deepseek-cache-hit-rate-analyzer`** (`CacheAnalyzerPage.tsx`): SEO landing for "deepseek cache hit rate analyzer" — caching education module (prefix matching, 3 optimization tips) + MindRose consulting CTA + `<noscript>` fallback (`CacheAnalyzerContent.tsx`).
- **`/deepseek-api-pricing-calculator`** (`PricingCalculatorPage.tsx`): SEO landing for "deepseek api pricing calculator" — interactive slider calculator + competitor pricing comparison table + Vultr affiliate CTA + `<noscript>` fallback (`PricingCalculatorContent.tsx`).
- **`/blog`** (`BlogIndex.tsx`): 3-card grid with bilingual titles/descriptions/tags from translations.
- **`/blog/*`** (3 articles): Each uses `BlogArticlePage` → `BlogPostLayout` → `ArticleRenderer` rendering structured `ArticleSection[]` content from `content/` modules. Metadata sourced from `blogArticles.ts`.
- **`/author`** (`AuthorPage.tsx`): Gavin profile page — bilingual bio, skills tags, social links (GitHub/LinkedIn/Email/MindRose/WeChat), JSON-LD Person schema, `<noscript>` fallback (`AuthorContent.tsx`).
- **`/zh/*`**: Mirrors of all above routes with Chinese HTML lang attribute and localized metadata.

## Theme system

The app supports full light/dark dual-theme switching, designed in Apple-minimalist style.

### Architecture

- `ThemeContext` (`src/lib/ThemeContext.tsx`): React context providing `theme: "light" | "dark"` and `toggleTheme()`
- Theme persisted to `localStorage["ds-theme"]`; falls back to `prefers-color-scheme` media query, then `"light"`
- `<html>` gets a `class` of `"light"` or `"dark"` — this drives ALL CSS variables
- `ThemeProvider` wraps the entire app in `AppRootLayout.tsx`

### Landing page theme-aware images

Hero background images switch with theme: `notion_sketch_csv_light.png` / `notion_sketch_csv_dark.png` (left) and `notion_sketch_chart_light.png` / `notion_sketch_chart_dark.png` (right). Non-interactive decoration (`pointer-events-none`, `aria-hidden`), swapped via `useTheme()` → `isDark`.

### CSS variable design

All colors via CSS custom properties on `:root, .light` / `.dark` in `globals.css` — NEVER hardcode colors in components. Tailwind v4 `@theme inline` maps variables to utilities (`bg-background`, `text-foreground`, `border-border`, `animate-fade-in`). Key classes: `.shadow-diffuse`, `.shadow-diffuse-md`, `.rounded-subtle`, `.reveal-section` / `.reveal-section.visible`, `.accordion-panel` / `.accordion-panel.open`. Global: smooth scrolling, `color-scheme` per theme, 6px themed scrollbar, `prefers-reduced-motion`.

### ECharts theme integration

Chart components use `useTheme()` for colors:

```tsx
const { theme } = useTheme();
const isDark = theme === "dark";
const textColor = isDark ? "#98989D" : "#86868B";
const gridColor = isDark ? "#2C2C2E" : "#E5E5EA";
```

Chart series colors switch between dark-on-light (matte black `#1D1D1F`) and light-on-dark (white `#F5F5F7`). Cache-related charts use green (`#059669` / `#34D399`) for hits and gray (`#D2D2D7` / `#636366`) for misses.

## Model filter

A segmented control (pill buttons) below the tab bar lets users filter all views by model. Only shown when the data has ≥2 models.

- State lives in `DataContext`: `selectedModel` (default `ALL_MODELS = "__all__"`) + `setSelectedModel`
- `filteredResult` is derived via `useMemo` calling `filterResult()`: when a specific model is selected, `result.daily` is filtered, then `computeKeyStats` and `summary` are recomputed
- All child components (`KPICards`, `OverviewView`, `KeyView`, `CacheView`, `TrendsView`) use `filteredResult` instead of `result` — they automatically reflect the current filter
- `result.summary.models` (unfiltered) is preserved in `filteredResult.summary.models` so the filter UI always shows the full model list
- Resetting to `ALL_MODELS` when new files are loaded via `loadFiles()`

### Styling

- Pill container: `rounded-full` with `var(--border)` background (acts as the track)
- Selected pill: `var(--text-primary)` background, `var(--accent-inverse)` text
- Unselected pill: transparent background, `var(--text-tertiary)` text, hover → `var(--text-secondary)`

## i18n system

- Custom React context (not next-intl) — appropriate for a client-only SPA
- Translations in `src/i18n/translations.ts` as a const object with `en` and `zh` keys
- Use `useTranslation()` hook → returns `{ t, locale, setLocale }`
- `t` is the translation object: `t.app.title`, `t.kpi.totalCost`, etc.
- Interpolation uses `{key}` placeholders: `t.kpi.saved.replace("{tokens}", value)`
- Locale persisted to `localStorage["ds-locale"]`; falls back to `navigator.language` for Chinese detection
- `<html lang>` synced via `LangSync` component in `AppI18nShell`
- Format functions in `src/lib/format.ts` accept `locale` param for 万 vs K/M
- **URL-level routing**: `localeRouting.ts` manages `/zh` prefix for Chinese routes. `buildLocalePath()` generates locale-aware paths. `LanguageSwitcher` uses locale-aware path construction to preserve current page context during language switches.

### Translation key groups

Keys are flat 2-level (`group.keyName`) in `src/i18n/translations.ts`. Do NOT nest deeper — the type system flattens leaf keys to `string`. To find specific keys, grep `translations.ts` for the group prefix. Primary groups and their consumers:

| Group | Consumers |
|---|---|
| `app`, `tabs` (overview/projects/keys/cache/trends), `header` (loadDifferent, clear, sisterProject, sisterProjectTitle), `footer` (text, version, relatedTools, sisterProject, visitSisterRepo), `modelFilter` | `Dashboard.tsx`, `TitleBar.tsx`, `FooterBar.tsx` |
| `dropzone`, `error`, `warning` | `DropZone.tsx`, `ErrorDisplay.tsx` |
| `kpi`, `overview`, `trends`, `cache`, `keys` | `KPICards.tsx`, `OverviewView.tsx`, `TrendsView.tsx`, `CacheView.tsx`, `KeyView.tsx` |
| `projects` (22 keys: modal, drag-and-drop, validation) | `ProjectView.tsx` config modal |
| `share` (18 keys: modal, inputs, toast, labels) | `ShareButton.tsx`, `ShareModal.tsx`, `ShareCard.tsx` |
| `landing` (howItWorks, qaQ1–qaQ9, sisterBadge/sisterTitle/sisterDesc/sisterVisit/sisterRepo, about*) | `LandingPage.tsx`, `LandingContent.tsx`, `schema.ts` |
| `guideline`, `privacy` (21 keys), `terms` (22 keys), `changelog` (10 keys), `meta`, `theme` | `GuidelinePage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`, `ChangelogPage.tsx`, `layout.tsx`, `ThemeSwitcher.tsx` |
| `blog` (pageTitle, ctaTitle/Desc/Button) | `BlogIndex.tsx`, `BlogPostLayout.tsx` |
| `blogIndex` (article1/2/3 Title/Desc/Tags, pageTitle, pageSubtitle) | `BlogIndex.tsx`, `blogArticles.ts` |
| `author` (pageTitle, profile, teamMembers, verification) | `AuthorPage.tsx`, `AuthorContent.tsx` |
| `costTracker` through `backToHome` | `CostTrackerPage.tsx`, `CostTrackerContent.tsx` |
| `cacheAnalyzer` through `backToHome` | `CacheAnalyzerPage.tsx`, `CacheAnalyzerContent.tsx` |
| `pricingCalculator` through `backToHome` | `PricingCalculatorPage.tsx`, `PricingCalculatorContent.tsx` |
| `empty` (overview/keys/trends/projects) | View components (empty states) |
| `copyToast` | `CopyButton.tsx` |

## Multi-month CSV & ZIP support (concatFiles)

`src/lib/concatFiles.ts` — pairs files by `amount-{year}-{month}.csv` / `cost-{year}-{month}.csv` pattern. Only months with BOTH files are paired. First file keeps headers; subsequent headers stripped. Label: `"2026-5 ~ 2026-6"`. ZIP archives auto-detected and extracted via JSZip. `MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024` (50 MB) prevents ZIP bombs. Used by `DropZone.tsx` and `Dashboard.tsx`.

## Sister Project Cross-Linking (v0.5.4)

`src/lib/sisterProjects.ts` — centralized config for cross-linking between the "API Usage Analyzer Series" sibling tools (DeepSeek + Agnes). Exports `deepseekProject`, `agnesProject` (brand info, tracked URLs via `buildTrackedSisterUrl()` with `utm_source=agnes_site&utm_medium=referral&utm_campaign=...`), and `TOOL_SERIES_NAME`. Consumed by `TitleBar.tsx` (Agnes pill), `LandingPage.tsx` (Sister Project section), `FooterBar.tsx` ("Related Tools" row), `schema.ts` (Organization JSON-LD `sameAs`/`brand`). Env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AGNES_SITE_URL`, `NEXT_PUBLIC_AGNES_GITHUB_URL`.

## Custom Project Grouping (By Project tab)

A "By Custom Projects" tab in the dashboard lets users organize API keys into user-defined project groups. This is the second tab (between Overview and By Key).

### Architecture

- **`ProjectConfigContext`** (`src/lib/ProjectConfigContext.tsx`): React context managing project definitions — `ProjectDef[]` (name + keyNames array). Persisted to `localStorage["ds-project-config"]`. Provides `config`, `setConfig`, `matchProject(keyName)` lookup, `resetConfig()`.
- **`ProjectView`** (`src/components/ProjectView.tsx`): Main view component. Aggregates daily data by project groups, computes per-project stats (tokens, cost, cache hit rate, request count), renders a table with inline usage bars and CopyButton integration for cost values. Unassigned keys fall into "Uncategorized" bucket.
- **Config modal**: Drag-and-drop interface for assigning keys to projects. Unassigned keys pool on the left, project drop zones on the right. Each unassigned key also has a dropdown (`<select>`) for keyboard-only assignment. Modal features: duplicate project name validation, unsaved-changes confirmation dialog, reset-to-default, keyboard shortcut hints.

### Data flow

1. `ProjectView` reads `daily` from `filteredResult` and extracts all unique key names
2. `matchProject(keyName)` from `ProjectConfigContext` maps each key to its project (case-insensitive)
3. Stats are aggregated per project using `useMemo`
4. Unmatched keys group into "Uncategorized" (sentinel: `UNCATEGORIZED = "__uncategorized__"`)
5. Project config is entirely local — stored in `localStorage`, never transmitted

### Styling

- Same table layout as KeyView with inline usage bars
- Gear icon button opens the config modal
- Cost values wrapped in `<CopyButton>` for one-click copy
- Cache hit rate color coding matches KeyView (green > 40% / amber 20–40% / red < 20%)

## Social Media Share Cards (v0.5.2)

Each dashboard tab generates a 1200×630 infographic share card via `ShareButton` → `ShareModal` → `ShareCard`:

- **`ShareButton`**: SVG share icon in tab nav bar, opens `ShareModal`.
- **`ShareModal`**: Dialog with live preview, "From XXX" name input (localStorage persisted), optional custom message, clipboard copy (PNG via `html2canvas` → paste to WeChat/Feishu/DingTalk), PNG download, QR code (client-side `qrcode` → `https://deepseek-usage.xyz`).
- **`ShareCard`**: Pure 1200×630 rendering component — per-tab KPI hero + ECharts mini-chart + date range + logo + QR + watermark. Theme/locale-aware.
- **`shareCardData.ts`**: Data extraction layer — `ShareTab` type, per-tab data interfaces, `extractShareCardData()` from `ParseResult` + optional `ProjectConfig`.

Dependencies: `html2canvas`, `qrcode`.

## CopyButton component

`src/components/CopyButton.tsx` is a reusable clipboard copy button used across the app:

- **Props**: `value` (number to copy), `name` (display name for toast), `children` (button content), `className` (optional)
- **Copy logic**: `navigator.clipboard.writeText()` with `<textarea>` fallback for older browsers
- **Toast**: i18n-aware "Copied" message displayed for 1.5s above the button
- **Timer cleanup**: `useEffect` cleanup cancels timeout on unmount to prevent stale state updates
- **Used in**: `KeyView` (per-key cost copy), `ProjectView` (per-project cost copy), `OverviewView` (hero total cost copy)

## Upload security

- **50MB per-file limit**: `MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024` in `concatFiles.ts`. ZIP bomb protection — legitimate exports are <1 MB. Errors surfaced via `ErrorDisplay` with i18n titles.
- **Privacy**: All validation client-side — no file content leaves the browser.

## CSV format (DeepSeek platform)

**amount CSV**: `utc_date | model | api_key_name | api_key | type | price | amount`
- `type` pivoted: `request_count | output_tokens | input_cache_hit_tokens | input_cache_miss_tokens`; `user_id` optional

**cost CSV**: `utc_date | model | cost | currency`
- `wallet_type` optional; cost distributed proportionally across keys within each (date, model) group by token usage

## Parsing pipeline (parser.ts)

1. `parseAmountCSV()` / `parseCostCSV()` — validate columns, parse rows
2. `pivotAmountRows()` — group by (date, model, api_key_name), spread type→columns
3. `joinCosts()` — distribute cost proportionally by token share per (date, model)
4. `computeKeyStats()` — per-key totals, cache hit rates, summary

## Page architecture

Two states managed by `Dashboard.tsx`:

**Landing page** (`!result`): TitleBar → Hero (theme-aware bg images) → DropZone + ErrorDisplay → Sister Project (Agnes cross-link with UTM) → `<noscript>` SEO fallback (`LandingContent`) → HowItWorks (3-step, "View Full Guide →") → QA (9-item accordion, accessible) → About (4 subsections + email copy + social links + "View Changelog →") → FooterBar (with `animate`). All sections separated by thin `<hr>` (`var(--border)`), `.reveal-section` + IntersectionObserver (15% threshold, one-shot), respects `prefers-reduced-motion`.

**Dashboard view** (`result` exists): TitleBar → sr-only H1 → action bar (file name + date range + re-upload/clear) → ErrorDisplay + KPICards + 5 tabs (Overview/By Project/By Key/Cache/Trends) + model filter + chart views → FooterBar.

**Shared**: `TitleBar` — sticky `z-50`, logo + title + Agnes pill + GitHub + blog pen + guideline compass + changelog clock + lang + theme; responsive via `...` popover on mobile. `FooterBar` — "Related Tools" row (Agnes site + repo + TOOL_SERIES_NAME with UTM) + divider + links (guideline/privacy/terms/blog/author/changelog/GitHub) + version; optional `animate` prop for scroll-reveal.

## Component patterns

### Hero + chart layout

Five views use a consistent "Hero big number + chart" pattern:
- **OverviewView**: Hero shows total cost (formatted), then daily bar chart + donut chart side by side
- **ProjectView**: Hero shows active project count, then full-width table with inline bars per project (similar layout to KeyView)
- **KeyView**: Hero shows active key count, then full-width table with inline bars
- **CacheView**: Hero shows cache hit % (large), then trend line + stacked bar charts
- **TrendsView**: Hero dynamically shows current metric's aggregate, then toggleable line chart

Hero styling: `text-[5rem] font-bold tracking-tighter` with `letter-spacing: -0.04em`

### KeyView color coding

Cache hit rates in the KeyView table row are color-coded:
- `> 40%` → `var(--positive)` (green)
- `20–40%` → `var(--warning-text)` (amber)
- `< 20%` → `var(--danger)` (red)

### Tab navigation

Apple-style underline tabs: `text-xs font-semibold uppercase tracking-wide`, 2px bottom border, selected tab uses `var(--accent)` border color, `-mb-px` to align with container border.

## Common tasks

- **Adding a new UI string**: Add flat 2-level keys (`group.keyName`) to both `en` and `zh` in `src/i18n/translations.ts`, then use `t.group.keyName`. Do NOT nest deeper than 2 levels.
- **Adding a new chart**: Use `ReactECharts` from `echarts-for-react`, construct option with `useMemo`, use `useTheme()` for theme-aware colors.
- **Modifying the parser**: Types in `src/lib/types.ts`, logic in `src/lib/parser.ts`.
- **Adding a new CSS variable**: Define in both `:root, .light` AND `.dark` blocks in `src/app/globals.css`, reference as `var(--your-token)`.
- **Adding a new view/tab**: Add to `TABS` array in `Dashboard.tsx`, add translation keys under `tabs.*`, create component with Hero + chart pattern using `filteredResult`.
- **Adding clipboard copy**: Import `<CopyButton>` from `@/components/CopyButton`, wrap display value, pass `value` (numeric) and `name` (toast label).
- **Adding share card support**: Update `ShareTab` in `src/lib/shareCardData.ts`, add data interface + extraction logic, add `ShareCard` render branch, add translations under `share.*`.
- **Managing ZIP uploads**: Logic in `concatFiles.ts` via JSZip; change size limit via `MAX_UPLOAD_SIZE_BYTES`. Add upload validation in `DropZone.tsx` + `ErrorDisplay.tsx`.
- **Adding a landing page section**: Add `<section>` with `reveal-section` class + `ref` callback in `LandingPage.tsx`, add `id` for anchoring, add translation keys under `landing.*`. For SEO-critical content, also add to `LandingContent.tsx` inside `<noscript>`.
- **Adding a new page with independent SEO**: Create route dir under `src/app/(site)/`, add `page.tsx` with `generateMetadata()`, create component in `src/components/`, add URL to `src/app/sitemap.ts`, add translations, add nav links to `FooterBar.tsx`. Mirror under `src/app/zh/` with corresponding `page.tsx`. For structured content, add `<noscript>` fallback via `*Content.tsx` component (see `PrivacyContent.tsx`, `TermsContent.tsx`, `ChangelogContent.tsx`).
- **Updating SEO metadata**: Edit `routeMetadata.ts` for page-specific metadata builders; edit `pageMetadata.ts` for shared localized metadata helper; edit `src/lib/schema.ts` for JSON-LD. Site URL via `NEXT_PUBLIC_SITE_URL` env var.
- **Adding/changing sister project links**: Edit `src/lib/sisterProjects.ts` (centralized brand info, tracked UTM URLs). Consumed by `TitleBar.tsx`, `LandingPage.tsx`, `FooterBar.tsx`, `schema.ts`.
- **Adding a new tool to the product family**: Add project export in `sisterProjects.ts` following existing pattern, update Organization JSON-LD `sameAs` + `brand` in `schema.ts`, add cross-links in UI components.
- **Adding Google Analytics**: GA injected globally in `AppRootLayout.tsx` via `NEXT_PUBLIC_GA_ID` — no per-page setup. Set env var in deployment; leave unset locally.
- **Changing the font**: Replace WOFF2 in `public/fonts/`, update `@font-face` in `globals.css`, update `--font-sans` in `@theme inline`.
- **Adding an animation**: Define `@keyframes` in `globals.css`, add to `@theme inline` as `--animate-*`. Respect `prefers-reduced-motion`.
- **Adding email / clipboard interaction**: Use `navigator.clipboard.writeText()` with `<textarea>` fallback. Concatenate email at runtime to deter scraping.
- **Adding a blog article**: Add slug + metadata to `blogArticles.ts`, create content files in `src/lib/content/`, add route under `(site)/blog/<slug>/page.tsx` and mirror under `zh/`, add translation keys to `blogIndex.*` group.
- **Adding an affiliate link**: Add entry to `affiliates.ts` registry, consume via `getAffiliatesByIds()` in `AffiliateWall` component.
