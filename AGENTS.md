<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

Strictly follows an Apple-minimalist design language: cold gray paper-texture backgrounds, ample whitespace, "no-card" full-width modules with thin horizontal dividers, subtle rounded corners, and diffuse shadows. Full light/dark dual-theme support driven by CSS custom properties.

**Version**: 0.6.1
- **New in this version**: Author page with unified site-wide metadata, SEO optimization pass, responsive navigation refinements

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── layout.tsx           # Root layout, generateMetadata() for SEO (canonical, OG with 1200×630 image, Twitter summary_large_image, hreflang, alternateLocale, keywords, author, twitter:site/creator), 8 JSON-LD script tags (bilingual SoftwareApplication + FAQPage + BreadcrumbList + Organization), Google Analytics (gtag.js via NEXT_PUBLIC_GA_ID + trackEvent for conversion events), ThemeProvider + I18nProvider + DataProvider + ProjectConfigProvider
│   ├── page.tsx             # Entry → renders <Dashboard />
│   ├── guideline/
│   │   └── page.tsx          # /guideline route: generates independent SEO metadata (canonical, OG, Twitter), renders <GuidelinePage />
│   ├── privacy/
│   │   └── page.tsx          # /privacy route: generates independent SEO metadata (canonical, OG, Twitter), renders <PrivacyPage />
│   ├── terms/
│   │   └── page.tsx          # /terms route: generates independent SEO metadata (canonical, OG, Twitter), renders <TermsPage />
│   ├── changelog/
│   │   └── page.tsx          # /changelog route: generates independent SEO metadata (canonical, OG, Twitter), renders <ChangelogPage />
│   ├── deepseek-api-cost-tracker/
│   │   └── page.tsx          # /deepseek-api-cost-tracker SEO landing (canonical, OG summary_large_image, Twitter), renders <CostTrackerPage />
│   ├── deepseek-cache-hit-rate-analyzer/
│   │   └── page.tsx          # /deepseek-cache-hit-rate-analyzer SEO landing (canonical, OG summary_large_image, Twitter), renders <CacheAnalyzerPage />
│   ├── deepseek-api-pricing-calculator/
│   │   └── page.tsx          # /deepseek-api-pricing-calculator SEO landing (canonical, OG summary_large_image, Twitter), renders <PricingCalculatorPage />
│   ├── blog/
│   │   ├── page.tsx                    # /blog article index: 3-card grid with tags/descriptions
│   │   ├── deepseek-context-caching-guide/page.tsx    # Blog article 1: Context caching deep-dive
│   │   ├── deepseek-cost-optimization-tools/page.tsx  # Blog article 2: Top 5 tools comparison
│   │   └── openai-vs-deepseek-cost-comparison/page.tsx # Blog article 3: OpenAI vs DeepSeek pricing
│   ├── author/
│   │   └── page.tsx          # /author route: generates independent SEO metadata (canonical, OG, Twitter), renders <AuthorPage />
│   ├── globals.css          # Tailwind v4 + @font-face Hubot Sans + CSS variables + reveal/accordion + base styles
│   ├── favicon.ico          # App icon (branded)
│   ├── AppI18nShell.tsx     # Client shell: I18nProvider + <html lang> sync
│   ├── robots.ts            # Build-time robots.txt generation (Next.js 16 convention)
│   └── sitemap.ts           # Build-time sitemap.xml generation (includes /, /guideline, /privacy, /terms, /changelog entries, NEXT_PUBLIC_SITE_URL)
├── components/
│   ├── TitleBar.tsx          # Shared sticky top nav: logo + app name + Agnes sister-project pill (with tracked UTM link) + GitHub icon + guideline book icon + changelog clock icon + LanguageSwitcher + ThemeSwitcher (all icon tooltips use i18n)
│   ├── FooterBar.tsx         # Shared footer: thin divider + "Related Tools" sister-project links row (Agnes tool + Agnes repo + TOOL_SERIES_NAME) + copyright + guideline link + privacy link + terms link + changelog link + GitHub link + version (props: animate, sectionRef)
│   ├── LandingPage.tsx       # Pre-upload landing: Hero with theme-aware bg images + Upload + Sister Project section (Agnes AI cross-link) + HowItWorks (with "View Full Guide →" link) + accordion QA (9 items) + multi-section About (Why/Privacy/MindRose/Contact with email copy & social links + "View Changelog →" link, scroll-reveal)
│   ├── LandingContent.tsx    # Server-rendered <noscript> fallback: HowItWorks + QA (9 items) + expanded multi-section About for SEO crawlers
│   ├── GuidelinePage.tsx     # Full interactive user guide page: bilingual content blocks (h1–h6, p, blockquote, tables, ul/ol), screenshot embedding with locale-aware image switching, dynamic table-of-contents, scroll-reveal sections (1660 lines of structured guide content)
│   ├── PrivacyPage.tsx        # Privacy policy page: bilingual content (7 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, GitHub source link for transparency verification
│   ├── TermsPage.tsx          # Terms of use page: bilingual content (8 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, open-source license reference
│   ├── ChangelogPage.tsx      # Changelog page: complete version history (v0.1.0–v0.6.1), entries by category (Added/Improved/Fixed/Dependencies) with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist legal-text layout matching privacy/terms pages
│   ├── CostTrackerPage.tsx     # SEO landing page: DeepSeek API Cost Tracker — captures "deepseek api cost tracker" intent, features + recommended tools (Portkey/Helicone affiliate links)
│   ├── CacheAnalyzerPage.tsx   # SEO landing page: DeepSeek Cache Hit Rate Analyzer — caching education module (prefix matching, 3 optimization tips) + MindRose consulting CTA
│   ├── PricingCalculatorPage.tsx  # SEO landing page: DeepSeek API Pricing Calculator — interactive slider calculator + competitor pricing comparison table + Vultr affiliate CTA
│   ├── AuthorPage.tsx          # Author/Gavin profile page: bilingual bio, skills tags, social links (GitHub/LinkedIn/Email/MindRose/WeChat), JSON-LD Person schema, independent SEO metadata
│   ├── AuthorContent.tsx       # Server-rendered <noscript> fallback: bilingual author bio sections for SEO crawlers (EEAT signals)
│   ├── BlogPostLayout.tsx     # Reusable blog post template: Apple-minimalist layout (max-w-2xl), metadata row, cross-links, CTA banner; used by all /blog/* article pages
│   ├── BlogArticlePage.tsx    # Generic blog article wrapper: locale-aware content loading, renders BlogPostLayout + ArticleRenderer
│   ├── ArticleRenderer.tsx    # Structured content renderer: walks ArticleSection[] blocks, renders h2/h3/p/ul/ol/code/table with Apple-minimalist typography
│   ├── BlogIndex.tsx          # Blog index page: 3-card grid with bilingual titles/descriptions/tags from translations
│   ├── PrivacyContent.tsx     # Server-rendered <noscript> fallback: bilingual privacy policy sections for SEO crawlers that don't execute JS (EEAT trust signals)
│   ├── TermsContent.tsx       # Server-rendered <noscript> fallback: bilingual terms of use sections for SEO crawlers that don't execute JS (EEAT trust signals)
│   ├── ChangelogContent.tsx   # Server-rendered <noscript> fallback: bilingual changelog version history summary for SEO crawlers that don't execute JS
│   ├── CopyButton.tsx        # Reusable clipboard copy button with hover tooltip, i18n-aware toast, and timer cleanup (used by KeyView, ProjectView, OverviewView)
│   ├── ShareButton.tsx       # Share icon button in tab navigation bar → opens ShareModal for the current tab
│   ├── ShareCard.tsx         # 1200×630 social media infographic card component: per-tab designs (Overview/Projects/Keys/Cache/Trends) with KPI hero, ECharts mini-chart, QR code, and app logo watermark
│   ├── ShareModal.tsx        # Share dialog: live preview, "From XXX" name input (localStorage persisted), custom message, clipboard copy (WeChat/Feishu/DingTalk compatible), PNG download
│   ├── Dashboard.tsx         # Main layout: routes between LandingPage (no data) and Dashboard view with 5 tabs (Overview / By Project / By Key / Cache / Trends); semantic hidden H1 for SEO; ShareButton integrated in tab nav bar
│   ├── DropZone.tsx          # Drag-and-drop CSV/ZIP uploader (supports multi-file, ZIP auto-extraction, 50MB file size limit, "or click to upload", error handling with inline error banner for processing failures)
│   ├── ProjectView.tsx       # "By Project" tab: aggregates API keys into custom project groups (drag-and-drop config), per-project cost/token/cache stats with inline bars, CopyButton integration
│   ├── KPICards.tsx          # Summary stat cards (card-less big-number layout)
│   ├── OverviewView.tsx      # Hero total cost + daily cost bars + cost-by-key donut (theme-aware)
│   ├── KeyView.tsx           # Hero key count + per-key table with inline bars & cache-hit color coding
│   ├── CacheView.tsx         # Hero hit rate + daily trend line + per-key hits-vs-misses stacked bars with hit% labels + tooltip
│   ├── TrendsView.tsx        # Hero dynamic metric + toggleable multi-metric line chart (theme-aware; cacheHitRate computed from raw hit/miss tokens per-date, not accumulated ratios)
│   ├── ErrorDisplay.tsx      # Parse error + warning banners with i18n titles
│   ├── LanguageSwitcher.tsx  # EN / 中文 toggle (Apple pill segmented control with `role="radio"`)
│   └── ThemeSwitcher.tsx     # Light / Dark toggle (Apple-minimalist SVG icon button)
├── i18n/
│   ├── index.ts              # Barrel export
│   ├── I18nProvider.tsx      # React context + useTranslation hook + localStorage persistence
│   └── translations.ts       # All UI strings in en/zh (27+ key groups: app, tabs, dropzone, kpi, landing, privacy, terms, projects, costTracker, cacheAnalyzer, pricingCalculator, etc.)
└── lib/
    ├── types.ts              # AmountRow, CostRow, DailyUsage, KeyStats, ParseResult, ParseError, ParseWarning
    ├── parser.ts             # Papa Parse CSV pipeline (parse → pivot → join → computeKeyStats)
    ├── concatFiles.ts        # Multi-month CSV/ZIP pairing, extraction & concat + 50MB size limit
    ├── format.ts             # Locale-aware formatCost / formatTokens / formatPercent / formatCostFull / formatTokensFull
    ├── schema.ts             # JSON-LD structured data: SoftwareApplication + FAQPage + BreadcrumbList + Organization (bilingual en/zh, versioned, uses sisterProjects for site URLs, GitHub links, sameAs array, and brand)
    ├── DataContext.tsx        # Data state + model filter (selectedModel, filteredResult, filterResult)
    ├── ProjectConfigContext.tsx  # Custom project grouping config: drag-and-drop key assignment, localStorage persistence, uncategorized fallback, reset-to-default
    ├── shareCardData.ts      # Share card data extraction: extracts per-tab summary data (OverviewShareData, ProjectShareData, KeyShareData, CacheShareData, TrendsShareData) from ParseResult
    ├── analytics.ts          # GA4 event tracking helper: trackEvent(name, params?) with gtag guard and error catch
    ├── sisterProjects.ts     # Sister project cross-linking config: Agnes/DeepSeek brand info, tracked URLs with UTM params, TOOL_SERIES_NAME, buildTrackedSisterUrl()
    ├── affiliates.ts         # Affiliate marketing link config: Vultr/DO/Namecheap/OpenRouter referral URLs, recommended tools list, centralized management
    ├── authors.ts            # Author profile config: Gavin social/contact links (GitHub, LinkedIn, Email, MindRose, WeChat), team member page URLs
    └── ThemeContext.tsx       # Light/dark theme context + useTheme hook + localStorage + system preference

public/
├── ds-usage-logo.ico        # Favicon / app icon
├── ds-usage-logo.png        # App icon (PNG, 512×512, used in OpenGraph/Twitter metadata)
├── og-image.png             # Social preview image (PNG, 1200×630, used as primary OpenGraph/Twitter image)
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
    ├── *-cn.png              # User guide screenshots — Chinese (12 annotated captures)
    └── *-en.png              # User guide screenshots — English (12 annotated captures)
```

## Key technical details

- **Static export** (`next.config.ts` → `output: "export"`) — no SSR, no Node server
- **All components are `"use client"`** — the app is purely client-side
- **Vitest** for testing — 21 tests across 5 files covering analytics, schema, sitemap, DataContext error handling, and DropZone error display
- **Community infrastructure**: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/ISSUE_TEMPLATE/` (bug_report.yml, feature_request.yml), `.github/PULL_REQUEST_TEMPLATE.md`
- **Next.js 16** with React 19 — App Router, `"use client"` directives, static export
- **ECharts 6** via `echarts-for-react` for all visualizations (bar, line, pie/donut with theme-aware colors)
- **Papa Parse** for CSV parsing (runs in browser)
- **JSZip** for client-side ZIP extraction (DeepSeek platform ZIP exports)
- **Tailwind CSS v4** with `@theme inline` extensions — CSS-first configuration, no `tailwind.config.ts`
- **Hubot Sans** as primary font (local WOFF2, 3 weights: 400/500/700), with Chinese fallback stack (`PingFang SC`, `Microsoft YaHei`) — Apple-like typography
- **Geist Mono** (from `next/font/google`) for code — variable weight
- **CSS custom properties** for theming — all colors are `var(--bg)`, `var(--text-primary)`, etc.; NO hardcoded colors in components
- **TypeScript 5** with strict mode, path alias `@/*` → `./src/*`
- **SEO**: `generateMetadata()` in layout.tsx, guideline/page.tsx, privacy/page.tsx, terms/page.tsx, and changelog/page.tsx (canonical URL, OpenGraph with 1200×630 image, Twitter summary_large_image cards, hreflang alternates, keywords, author, twitter:site/creator), JSON-LD structured data (SoftwareApplication + FAQPage [9 Q&A pairs] + BreadcrumbList + Organization + WebPage schemas for privacy/terms/changelog — 8 bilingual script tags total), robots.txt + sitemap.xml (differentiated lastModified per route, includes /, /guideline, /privacy, /terms, /changelog), `<noscript>` crawler fallback, semantic hidden H1, `llms.txt` for LLM-friendly site description
- **Analytics**: Google Analytics via `NEXT_PUBLIC_GA_ID` env var — gtag.js injected in `<head>` at build time, conditional (only when GA_ID is set)

## SEO, Analytics & Deployment

### SEO architecture

Multi-layered SEO for a client-rendered static SPA:
- **Build-time**: `robots.ts` + `sitemap.ts` (Next.js 16 `MetadataRoute` conventions) generate `/robots.txt` and `/sitemap.xml` (includes `/`, `/guideline`, `/privacy`, `/terms`, `/changelog`). Site URL from `NEXT_PUBLIC_SITE_URL` env var (default: `https://deepseek-usage.xyz`).
- **`generateMetadata()`**: `layout.tsx`, `guideline/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`, `changelog/page.tsx` each generate canonical URL, OpenGraph (with `alternateLocale: ["zh_CN"]`), Twitter card, hreflang alternates, and robots directives.
- **JSON-LD**: `src/lib/schema.ts` generates bilingual `SoftwareApplication` + `FAQPage` (9 Q&A) + `BreadcrumbList` + `Organization` — 8 `<script type="application/ld+json">` tags injected at build time. Organization schema includes `sameAs` links to both DeepSeek and Agnes GitHub repos, plus `brand: "API Usage Analyzer Series"`. Privacy/terms/changelog pages each have client-rendered `WebPage` schema. Site URLs, GitHub URLs, and tool branding are sourced from `src/lib/sisterProjects.ts`.
- **`<noscript>` fallback**: `LandingContent.tsx` outputs How It Works, FAQ (9 items), About for crawlers that don't execute JS. `PrivacyContent.tsx`, `TermsContent.tsx`, and `ChangelogContent.tsx` provide bilingual `<noscript>` SEO fallbacks for legal pages and version history (EEAT trust signals). Note: the Sister Project section is NOT in `LandingContent.tsx` (marketing cross-link, not SEO-critical).
- **Client enhancements**: Visible `<h1>` on landing, `sr-only` `<h1>` on dashboard, theme-aware hero images, `llms.txt` for LLM-friendly site description.

### Google Analytics

Opt-in GA4 via `NEXT_PUBLIC_GA_ID` env var. When set, gtag.js injected in `<head>` at build time. Tracks standard page-views only — zero CSV data tracking. When unset, zero overhead. Configure in deployment env only.

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

All sub-pages follow the same pattern: route directory under `src/app/` with `page.tsx` generating independent SEO metadata (canonical URL, OpenGraph, Twitter card), component in `src/components/`, URL in `sitemap.xml`, and navigation links in `FooterBar.tsx`.

- **`/guideline`** (`GuidelinePage.tsx`): Bilingual user manual — markdown-like content blocks, 24 annotated screenshots (12 per locale, locale-aware `-cn.png`/`-en.png`), dynamic sidebar ToC with Intersection Observer scroll tracking. Priority 0.8 in sitemap.
- **`/privacy`** (`PrivacyPage.tsx`): 7-section bilingual legal text, JSON-LD WebPage schema, `max-w-3xl` centered layout, GitHub source links for transparency. Priority 0.5 in sitemap.
- **`/terms`** (`TermsPage.tsx`): 8-section bilingual legal text, MIT License reference, JSON-LD WebPage schema, `max-w-2xl` layout. Priority 0.5 in sitemap.
- **`/changelog`** (`ChangelogPage.tsx`): Complete version history from v0.1.0 to v0.6.1, entries organized by category (Added/Improved/Fixed/Dependencies) with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist legal-text layout matching privacy/terms pages. Priority 0.5 in sitemap.
- **`/llms.txt`**: Static markdown file in `public/` — LLM-friendly site description (purpose, features, data format, privacy, links).

## Theme system

The app supports full light/dark dual-theme switching, designed in Apple-minimalist style.

### Architecture

- `ThemeContext` (`src/lib/ThemeContext.tsx`): React context providing `theme: "light" | "dark"` and `toggleTheme()`
- Theme persisted to `localStorage["ds-theme"]`; falls back to `prefers-color-scheme` media query, then `"light"`
- `<html>` gets a `class` of `"light"` or `"dark"` — this drives ALL CSS variables
- `ThemeProvider` wraps the entire app in `layout.tsx`

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

### Translation key groups

Keys are flat 2-level (`group.keyName`) in `src/i18n/translations.ts`. Do NOT nest deeper — the type system flattens leaf keys to `string`. To find specific keys, grep `translations.ts` for the group prefix (e.g., `projects:`). Primary groups and their consumers:

| Group | Consumers |
|---|---|
| `app`, `tabs` (overview/projects/keys/cache/trends), `header` (loadDifferent, clear, sisterProject, sisterProjectTitle), `footer` (text, version, relatedTools, sisterProject, visitSisterRepo), `modelFilter` | `Dashboard.tsx`, `TitleBar.tsx`, `FooterBar.tsx` |
| `dropzone`, `error`, `warning` | `DropZone.tsx`, `ErrorDisplay.tsx` |
| `kpi`, `overview`, `trends`, `cache`, `keys` | `KPICards.tsx`, `OverviewView.tsx`, `TrendsView.tsx`, `CacheView.tsx`, `KeyView.tsx` |
| `projects` (22 keys: modal, drag-and-drop, validation) | `ProjectView.tsx` config modal |
| `share` (18 keys: modal, inputs, toast, labels) | `ShareButton.tsx`, `ShareModal.tsx`, `ShareCard.tsx` |
| `landing` (howItWorks, qaQ1–qaQ9, sisterBadge/sisterTitle/sisterDesc/sisterVisit/sisterRepo, about*) | `LandingPage.tsx`, `LandingContent.tsx`, `schema.ts` |
| `guideline`, `privacy` (21 keys), `terms` (22 keys), `changelog` (10 keys), `meta`, `theme` | `GuidelinePage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`, `ChangelogPage.tsx`, `layout.tsx`, `ThemeSwitcher.tsx` |

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

Four views use a consistent "Hero big number + chart" pattern:
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
- **Adding a new page with independent SEO**: Create route dir under `src/app/`, add `page.tsx` with `generateMetadata()`, create component in `src/components/`, add URL to `src/app/sitemap.ts`, add translations, add nav links to `FooterBar.tsx`. For structured content, add `<noscript>` fallback via `*Content.tsx` component (see `PrivacyContent.tsx`, `TermsContent.tsx`, `ChangelogContent.tsx`).
- **Updating SEO metadata**: Edit `generateMetadata()` in page `layout.tsx` for meta tags; edit `src/lib/schema.ts` for JSON-LD. Site URL via `NEXT_PUBLIC_SITE_URL` env var.
- **Adding/changing sister project links**: Edit `src/lib/sisterProjects.ts` (centralized brand info, tracked UTM URLs). Consumed by `TitleBar.tsx`, `LandingPage.tsx`, `FooterBar.tsx`, `schema.ts`.
- **Adding a new tool to the product family**: Add project export in `sisterProjects.ts` following existing pattern, update Organization JSON-LD `sameAs` + `brand` in `schema.ts`, add cross-links in UI components.
- **Adding Google Analytics**: GA injected globally in `layout.tsx` via `NEXT_PUBLIC_GA_ID` — no per-page setup. Set env var in deployment; leave unset locally.
- **Changing the font**: Replace WOFF2 in `public/fonts/`, update `@font-face` in `globals.css`, update `--font-sans` in `@theme inline`.
- **Adding an animation**: Define `@keyframes` in `globals.css`, add to `@theme inline` as `--animate-*`. Respect `prefers-reduced-motion`.
- **Adding email / clipboard interaction**: Use `navigator.clipboard.writeText()` with `<textarea>` fallback. Concatenate email at runtime to deter scraping.
