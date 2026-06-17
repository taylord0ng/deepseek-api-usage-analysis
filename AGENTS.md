<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek API Usage Analytics Dashboard by Gavin & Mindrose Team

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

Strictly follows an Apple-minimalist design language: cold gray paper-texture backgrounds, ample whitespace, "no-card" full-width modules with thin horizontal dividers, subtle rounded corners, and diffuse shadows. Full light/dark dual-theme support driven by CSS custom properties.

**Version**: 0.5.2

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── layout.tsx           # Root layout, generateMetadata() for SEO (canonical, OG, Twitter, hreflang, alternateLocale), 6 JSON-LD script tags (bilingual SoftwareApplication + FAQPage + BreadcrumbList), Google Analytics (gtag.js via NEXT_PUBLIC_GA_ID), ThemeProvider + I18nProvider + DataProvider + ProjectConfigProvider
│   ├── page.tsx             # Entry → renders <Dashboard />
│   ├── guideline/
│   │   └── page.tsx          # /guideline route: generates independent SEO metadata (canonical, OG, Twitter), renders <GuidelinePage />
│   ├── privacy/
│   │   └── page.tsx          # /privacy route: generates independent SEO metadata (canonical, OG, Twitter), renders <PrivacyPage />
│   ├── terms/
│   │   └── page.tsx          # /terms route: generates independent SEO metadata (canonical, OG, Twitter), renders <TermsPage />
│   ├── changelog/
│   │   └── page.tsx          # /changelog route: generates independent SEO metadata (canonical, OG, Twitter), renders <ChangelogPage />
│   ├── globals.css          # Tailwind v4 + @font-face Hubot Sans + CSS variables + reveal/accordion + base styles
│   ├── favicon.ico          # App icon (branded)
│   ├── AppI18nShell.tsx     # Client shell: I18nProvider + <html lang> sync
│   ├── robots.ts            # Build-time robots.txt generation (Next.js 16 convention)
│   └── sitemap.ts           # Build-time sitemap.xml generation (includes /, /guideline, /privacy, /terms, /changelog entries, NEXT_PUBLIC_SITE_URL)
├── components/
│   ├── TitleBar.tsx          # Shared sticky top nav: logo + app name + GitHub icon + guideline book icon + changelog clock icon + LanguageSwitcher + ThemeSwitcher (all icon tooltips use i18n)
│   ├── FooterBar.tsx         # Shared footer: thin divider + copyright + guideline link + privacy link + terms link + changelog link + GitHub link + version (props: animate, sectionRef)
│   ├── LandingPage.tsx       # Pre-upload landing: Hero with theme-aware bg images + Upload + HowItWorks (with "View Full Guide →" link) + accordion QA (9 items) + multi-section About (Why/Privacy/MindRose/Contact with email copy & social links + "View Changelog →" link, scroll-reveal)
│   ├── LandingContent.tsx    # Server-rendered <noscript> fallback: HowItWorks + QA (7 items) + expanded multi-section About for SEO crawlers
│   ├── GuidelinePage.tsx     # Full interactive user guide page: bilingual content blocks (h1–h6, p, blockquote, tables, ul/ol), screenshot embedding with locale-aware image switching, dynamic table-of-contents, scroll-reveal sections (1496 lines of structured guide content)
│   ├── PrivacyPage.tsx        # Privacy policy page: bilingual content (7 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, GitHub source link for transparency verification
│   ├── TermsPage.tsx          # Terms of use page: bilingual content (8 sections), JSON-LD WebPage schema, Apple-minimalist legal-text layout, back-to-home link + FooterBar, open-source license reference
│   ├── ChangelogPage.tsx      # Changelog page: complete version history (v0.1.0–v0.5.2), entries by category (Added/Improved/Fixed/Dependencies) with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist legal-text layout matching privacy/terms pages
│   ├── CopyButton.tsx        # Reusable clipboard copy button with hover tooltip, i18n-aware toast, and timer cleanup (used by KeyView, ProjectView, OverviewView)
│   ├── ShareButton.tsx       # Share icon button in tab navigation bar → opens ShareModal for the current tab
│   ├── ShareCard.tsx         # 1200×630 social media infographic card component: per-tab designs (Overview/Projects/Keys/Cache/Trends) with KPI hero, ECharts mini-chart, QR code, and app logo watermark
│   ├── ShareModal.tsx        # Share dialog: live preview, "From XXX" name input (localStorage persisted), custom message, clipboard copy (WeChat/Feishu/DingTalk compatible), PNG download
│   ├── Dashboard.tsx         # Main layout: routes between LandingPage (no data) and Dashboard view with 5 tabs (Overview / By Project / By Key / Cache / Trends); semantic hidden H1 for SEO; ShareButton integrated in tab nav bar
│   ├── DropZone.tsx          # Drag-and-drop CSV/ZIP uploader (supports multi-file, ZIP auto-extraction, 50MB file size limit, "or click to upload")
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
│   ├── index.ts             # Barrel export
│   ├── I18nProvider.tsx     # React context + useTranslation hook + localStorage persistence
│   └── translations.ts      # All UI strings in en/zh (app, tabs, dropzone, kpi, landing, warning, privacy, terms, projects, etc.)
└── lib/
    ├── types.ts             # AmountRow, CostRow, DailyUsage, KeyStats, ParseResult, ParseError, ParseWarning
    ├── parser.ts            # Papa Parse CSV pipeline (parse → pivot → join → computeKeyStats)
    ├── concatFiles.ts       # Multi-month CSV pairing & concatenation + ZIP extraction (JSZip) + 50MB upload size limit
    ├── format.ts            # Locale-aware formatCost / formatTokens / formatPercent / formatCostFull / formatTokensFull
    ├── schema.ts            # JSON-LD structured data: SoftwareApplication + FAQPage + BreadcrumbList (bilingual en/zh, versioned)
    ├── DataContext.tsx       # Data state + model filter (selectedModel, filteredResult, filterResult)
    ├── ProjectConfigContext.tsx  # Custom project grouping config: drag-and-drop key assignment, localStorage persistence, uncategorized fallback, reset-to-default
    ├── shareCardData.ts     # Share card data extraction: extracts per-tab summary data (OverviewShareData, ProjectShareData, KeyShareData, CacheShareData, TrendsShareData) from ParseResult
    └── ThemeContext.tsx      # Light/dark theme context + useTheme hook + localStorage + system preference

public/
├── ds-usage-logo.ico        # Favicon / app icon
├── ds-usage-logo.png        # App icon (PNG, 512×512, used in OpenGraph/Twitter metadata)
├── llms.txt                 # LLM-friendly site description (markdown): what the app does, how it works, privacy, links
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
- **Next.js 16** with React 19 — App Router, `"use client"` directives, static export
- **ECharts 6** via `echarts-for-react` for all visualizations (bar, line, pie/donut with theme-aware colors)
- **Papa Parse** for CSV parsing (runs in browser)
- **JSZip** for client-side ZIP extraction (DeepSeek platform ZIP exports)
- **Tailwind CSS v4** with `@theme inline` extensions — CSS-first configuration, no `tailwind.config.ts`
- **Hubot Sans** as primary font (local WOFF2, 3 weights: 400/500/700), with Chinese fallback stack (`PingFang SC`, `Microsoft YaHei`) — Apple-like typography
- **Geist Mono** (from `next/font/google`) for code — variable weight
- **CSS custom properties** for theming — all colors are `var(--bg)`, `var(--text-primary)`, etc.; NO hardcoded colors in components
- **TypeScript 5** with strict mode, path alias `@/*` → `./src/*`
- **SEO**: `generateMetadata()` in layout.tsx, guideline/page.tsx, privacy/page.tsx, terms/page.tsx, and changelog/page.tsx (canonical URL, OpenGraph, Twitter cards, hreflang alternates), JSON-LD structured data (SoftwareApplication + FAQPage [9 Q&A pairs] + BreadcrumbList + WebPage schemas for privacy/terms/changelog), robots.txt + sitemap.xml (includes /, /guideline, /privacy, /terms, /changelog), `<noscript>` crawler fallback, semantic hidden H1, `llms.txt` for LLM-friendly site description
- **Analytics**: Google Analytics via `NEXT_PUBLIC_GA_ID` env var — gtag.js injected in `<head>` at build time, conditional (only when GA_ID is set)

## SEO, Analytics & Deployment

### SEO architecture

Multi-layered SEO for a client-rendered static SPA:
- **Build-time**: `robots.ts` + `sitemap.ts` (Next.js 16 `MetadataRoute` conventions) generate `/robots.txt` and `/sitemap.xml` (includes `/`, `/guideline`, `/privacy`, `/terms`, `/changelog`). Site URL from `NEXT_PUBLIC_SITE_URL` env var (default: `https://deepseek-usage.xyz`).
- **`generateMetadata()`**: `layout.tsx`, `guideline/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`, `changelog/page.tsx` each generate canonical URL, OpenGraph (with `alternateLocale: ["zh_CN"]`), Twitter card, hreflang alternates, and robots directives.
- **JSON-LD**: `src/lib/schema.ts` generates bilingual `SoftwareApplication` + `FAQPage` (9 Q&A) + `BreadcrumbList` — 6 `<script type="application/ld+json">` tags injected at build time. Privacy/terms pages each have client-rendered `WebPage` schema.
- **`<noscript>` fallback**: `LandingContent.tsx` outputs How It Works, FAQ, About for crawlers that don't execute JS.
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

- **`/guideline`** (`GuidelinePage.tsx`): Bilingual user manual — markdown-like content blocks, 16+ annotated screenshots (locale-aware `-cn.png`/`-en.png`), dynamic sidebar ToC with Intersection Observer scroll tracking. Priority 0.8 in sitemap.
- **`/privacy`** (`PrivacyPage.tsx`): 7-section bilingual legal text, JSON-LD WebPage schema, `max-w-3xl` centered layout, GitHub source links for transparency. Priority 0.5 in sitemap.
- **`/terms`** (`TermsPage.tsx`): 8-section bilingual legal text, MIT License reference, JSON-LD WebPage schema, `max-w-2xl` layout. Priority 0.5 in sitemap.
- **`/changelog`** (`ChangelogPage.tsx`): Complete version history from v0.1.0 to v0.5.2, entries organized by category (Added/Improved/Fixed/Dependencies) with color-coded dots, JSON-LD WebPage schema, bilingual, Apple-minimalist legal-text layout matching privacy/terms pages. Priority 0.5 in sitemap.
- **`/llms.txt`**: Static markdown file in `public/` — LLM-friendly site description (purpose, features, data format, privacy, links).

## Theme system

The app supports full light/dark dual-theme switching, designed in Apple-minimalist style.

### Architecture

- `ThemeContext` (`src/lib/ThemeContext.tsx`): React context providing `theme: "light" | "dark"` and `toggleTheme()`
- Theme persisted to `localStorage["ds-theme"]`; falls back to `prefers-color-scheme` media query, then `"light"`
- `<html>` gets a `class` of `"light"` or `"dark"` — this drives ALL CSS variables
- `ThemeProvider` wraps the entire app in `layout.tsx`

### Landing page theme-aware images

The landing page hero area displays background decoration images that switch with the theme:
- CSV-themed sketch on the left (`notion_sketch_csv_light.png` / `notion_sketch_csv_dark.png`)
- Chart-themed sketch on the right (`notion_sketch_chart_light.png` / `notion_sketch_chart_dark.png`)
- Images are positioned absolutely as non-interactive decoration (`pointer-events-none`, `aria-hidden="true"`)
- Swapped via `useTheme()` → `isDark` branching in `LandingPage.tsx`

### CSS variable design

All colors are defined as CSS custom properties on `:root, .light` and `.dark` selectors in `globals.css`. Components NEVER use hardcoded color values — always reference `var(--...)`. For full token reference, read `src/app/globals.css` (30+ tokens for bg, text, border, accent, semantic colors, shadows, dropzone states).

Tailwind v4 `@theme inline` in `globals.css` maps key CSS variables to Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`, `animate-fade-in`, etc.). Key utility classes: `.shadow-diffuse`, `.shadow-diffuse-md`, `.rounded-subtle`, `.reveal-section` / `.reveal-section.visible` (Intersection Observer scroll-reveal), `.accordion-panel` / `.accordion-panel.open`.

Global base styles: smooth scrolling, `color-scheme` per theme, inverted selection, 6px themed scrollbar, `prefers-reduced-motion` support.

### ECharts theme integration

All chart components (`OverviewView`, `TrendsView`, `CacheView`, `KeyView`) use `useTheme()` from `ThemeContext` to derive chart colors. Pattern:

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
| `app`, `tabs` (overview/projects/keys/cache/trends), `header`, `footer`, `modelFilter` | `Dashboard.tsx`, `TitleBar.tsx`, `FooterBar.tsx` |
| `dropzone`, `error`, `warning` | `DropZone.tsx`, `ErrorDisplay.tsx` |
| `kpi`, `overview`, `trends`, `cache`, `keys` | `KPICards.tsx`, `OverviewView.tsx`, `TrendsView.tsx`, `CacheView.tsx`, `KeyView.tsx` |
| `projects` (22 keys: modal, drag-and-drop, validation) | `ProjectView.tsx` config modal |
| `share` (18 keys: modal, inputs, toast, labels) | `ShareButton.tsx`, `ShareModal.tsx`, `ShareCard.tsx` |
| `landing` (howItWorks, qaQ1–qaQ9, about*) | `LandingPage.tsx`, `LandingContent.tsx`, `schema.ts` |
| `guideline`, `privacy` (21 keys), `terms` (22 keys), `changelog` (10 keys), `meta`, `theme` | `GuidelinePage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`, `ChangelogPage.tsx`, `layout.tsx`, `ThemeSwitcher.tsx` |

## Multi-month CSV & ZIP support (concatFiles)

`src/lib/concatFiles.ts` — pairs files by `amount-{year}-{month}.csv` / `cost-{year}-{month}.csv` pattern. Only months with BOTH files are paired. First file keeps headers; subsequent headers stripped. Label: `"2026-5 ~ 2026-6"`. ZIP archives auto-detected and extracted via JSZip. `MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024` (50 MB) prevents ZIP bombs. Used by `DropZone.tsx` and `Dashboard.tsx`.

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

Each dashboard tab (Overview / Projects / Keys / Cache / Trends) supports generating a 1200×630 social media infographic share card. The feature is implemented across three new components and a data extraction module:

### Architecture

- **`ShareButton`** (`src/components/ShareButton.tsx`): Minimal share icon (SVG share icon + "Share" label) in the tab navigation bar. Opens the ShareModal for the current active tab.
- **`ShareModal`** (`src/components/ShareModal.tsx`): Full-featured share dialog with:
  - Live preview: scaled ShareCard thumbnail that updates in real-time as user types
  - "From XXX" name/team name input — large signature on the card, persisted to `localStorage["ds-share-name"]`
  - Optional custom message — displayed as a quote-style annotation on the card
  - Clipboard copy: captures the card as PNG via `html2canvas`, copies to clipboard (paste directly into WeChat / Feishu / DingTalk)
  - PNG download: exports the card as a `.png` file
  - QR code: points to `https://deepseek-usage.xyz`, generated client-side via `qrcode`
  - App logo watermark on the card for brand identification
- **`ShareCard`** (`src/components/ShareCard.tsx`): Pure rendering component of the 1200×630 infographic card. Per-tab designs with:
  - Top-left KPI summary rows + right-aligned tab label badge
  - Left side: hero big-number (cost/cache rate/peak/etc.) + metric details
  - Right side: ECharts mini-chart (pie/bar/line) relevant to the tab
  - Bottom: date range + app logo + QR code + "Generated by" watermark
  - Theme-aware (light/dark), locale-aware labels
- **`shareCardData.ts`** (`src/lib/shareCardData.ts`): Data extraction layer. Defines `ShareTab` type, per-tab data interfaces (`OverviewShareData`, `ProjectShareData`, `KeyShareData`, `CacheShareData`, `TrendsShareData`), and `extractShareCardData()` function that computes tab-specific aggregates from `ParseResult` (with optional `ProjectConfig` for the projects tab).

### Integration

- `ShareButton` is rendered in `Dashboard.tsx`'s tab navigation bar via `ml-auto` push-right positioning
- `ShareModal` reads data from `useData()` (current filtered data), `useProjectConfig()` (project grouping), `useTheme()`, and `useTranslation()`
- The share card capture uses `html2canvas` to snapshot the rendered `<ShareCard>` DOM node at native 1200×630 resolution
- QR code is generated as a `data:` URL via the `qrcode` library
- Clipboard copy uses `navigator.clipboard.write([new ClipboardItem(...)])` with PNG blob; falls back to download-only on unsupported browsers

### Dependencies

- `html2canvas` — DOM-to-canvas screenshot for card capture
- `qrcode` — client-side QR code generation (no server needed)

### Styling

- `ShareButton`: `text-xs font-medium` with `var(--text-tertiary)` color, hover → `var(--text-primary)`. SVG share icon (15×15) + "Share" label (hidden on small screens via `hidden sm:inline`)
- `ShareModal`: Apple-minimalist sheet/overlay — `fixed inset-0 z-[100]` with centered `max-w-[520px]` dialog, thin border (`var(--border)`), `var(--bg)` background, `shadow-diffuse-md`. Input fields: `rounded-subtle` with `var(--border)` border, `var(--text-primary)` text on `var(--bg-surface)` background
- `ShareCard`: Rendered at 1200×630 with `pointer-events-none` (non-interactive). Typography: 600–700 weight headings, 400–500 body, tight `tracking-tighter` hero numbers. Theme colors: `#F5F5F7` / `#000000` (bg), `#1D1D1F` / `#F5F5F7` (text). Per-tab color accents: blue (Overview), purple (Projects), green (Keys), orange (Cache), teal (Trends)

## CopyButton component

`src/components/CopyButton.tsx` is a reusable clipboard copy button used across the app:

- **Props**: `value` (number to copy), `name` (display name for toast), `children` (button content), `className` (optional)
- **Copy logic**: `navigator.clipboard.writeText()` with `<textarea>` fallback for older browsers
- **Toast**: i18n-aware "Copied" message displayed for 1.5s above the button
- **Timer cleanup**: `useEffect` cleanup cancels timeout on unmount to prevent stale state updates
- **Used in**: `KeyView` (per-key cost copy), `ProjectView` (per-project cost copy), `OverviewView` (hero total cost copy)

## Upload security

The app implements client-side upload safety measures:

- **50MB per-file limit**: `MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024` in `concatFiles.ts`. Files exceeding this limit are rejected with a user-facing error message before any parsing occurs. This is a ZIP bomb protection measure — legitimate DeepSeek monthly exports are typically under 1 MB.
- **Error display**: `DropZone.tsx` checks file sizes during upload processing and surfaces oversized-file errors through `<ErrorDisplay />` with i18n titles.
- **FAQ coverage**: Landing page FAQ includes Q8 ("Is there a file size limit?") explaining the 50MB cap.
- **Privacy**: All validation happens client-side — no file content is sent anywhere.

## CSV format (DeepSeek platform)

**amount CSV**: `utc_date | model | api_key_name | api_key | type | price | amount`
- `type` is pivoted: `request_count | output_tokens | input_cache_hit_tokens | input_cache_miss_tokens`
- `request_count` rows have empty `price` → parsed as `0`
- `user_id` column present but not validated (optional)

**cost CSV**: `utc_date | model | cost | currency`
- `wallet_type` column present but not validated (optional)
- Cost is distributed proportionally across API keys within each (date, model) group based on total token usage

## Parsing pipeline (parser.ts)

1. `parseAmountCSV()` — validates columns, parses each row, validates `type` enum, `price`, `amount`
2. `parseCostCSV()` — validates columns, parses each row, validates `cost`
3. `pivotAmountRows()` — groups by `(date, model, api_key_name)`, spreads type→columns, tracks pricing
4. `joinCosts()` — distributes cost proportionally by token share within each `(date, model)` group
5. `computeKeyStats()` — aggregates per-key totals, computes cache hit rates
6. Summary: total cost, total tokens, cache stats, active keys count, date range, model list

## Page architecture

The app has two distinct page states managed by `Dashboard.tsx`:

### Landing page (pre-upload, `!result`)
Rendered via `<LandingPage />` — scrollable single-page with:
1. **TitleBar** — sticky top nav: logo + app name + GitHub + LanguageSwitcher + ThemeSwitcher
2. **Hero** — centered title/subtitle (`pt-16 pb-10`), theme-aware bg decoration images (CSV sketch left, chart sketch right), `pointer-events-none`
3. **Upload** — `<DropZone />` + `<ErrorDisplay />`
4. **`<noscript>` fallback** — `LandingContent.tsx` for SEO crawlers (How It Works + FAQ + About)
5. **How It Works** — 3-step grid with numbered circles, `id="how-it-works"`, "View Full Guide →" link, `content-visibility: auto`
6. **QA** — 9-item accordion (`id="faq"`, `max-w-2xl`): Q5=$0 cost, Q6=incomplete upload, Q7=user guide, Q8=file size limit, Q9=project grouping. Accessible: `aria-expanded`/`aria-controls`, keyboard Enter/Space, inline `max-height`/`opacity` transition
7. **About** — `id="about"`, 4 subsections (Why/Privacy/MindRose/Contact) with email copy + social link pills + "View Changelog →" link, `content-visibility: auto`
8. **FooterBar** — with `animate` prop for scroll-reveal

Sections separated by thin `<hr>` (`var(--border)`). `.reveal-section` + Intersection Observer (15% threshold, one-shot, fade-in + slide-up). Respects `prefers-reduced-motion`.

### Dashboard view (post-upload, `result` exists)
Rendered inline in `Dashboard.tsx` with:
1. **TitleBar** — same shared component
2. **Semantic hidden H1** — `<h1 className="sr-only">` for screen readers and search engines
3. **Action bar** — file name + date range (left) + re-upload/clear buttons (right)
4. **Content** — ErrorDisplay + WarningBanner, KPICards, tabs (Overview / By Project / By Key / Cache / Trends), model filter, chart views
5. **FooterBar** — same shared component

### Shared components

**TitleBar** (`src/components/TitleBar.tsx`):
- Sticky top bar with `z-50`, thin bottom border (`var(--border)`)
- Left: logo (`next/image`, 32×32, unoptimized for static export) + app title (`t.app.title`) in bold
- Right: GitHub icon link (SVG, `w-8 h-8` circle hover background) + guideline book icon (Link to `/guideline`, i18n `aria-label`/`title`) + changelog clock icon (Link to `/changelog`, i18n `aria-label`/`title`) + `<LanguageSwitcher />` + `<ThemeSwitcher />`
- Used by both `LandingPage` and `Dashboard`

**FooterBar** (`src/components/FooterBar.tsx`):
- Thin HR divider + centered muted text + guideline link (`t.guideline.pageTitle`) + privacy link (`t.privacy.pageTitle`) + terms link (`t.terms.pageTitle`) + changelog link (`t.changelog.pageTitle`) + GitHub link + version number
- Text from `t.footer.text`, version from `t.footer.version`
- Links separated by `·` dividers; privacy and terms links point to `/privacy` and `/terms` respectively
- Accepts optional `animate` prop: when true, wraps content in a `reveal-section` div and exposes `sectionRef` callback for IntersectionObserver registration (Landing page use)
- Without `animate`, renders content directly (Dashboard use)
- Mobile-friendly with `flex-wrap` for small screens
- Used by `LandingPage`, `Dashboard`, `PrivacyPage`, `TermsPage`, and `GuidelinePage`

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

- **Adding a new UI string**: Add to both `en` and `zh` in `src/i18n/translations.ts` as flat 2-level keys (`group.keyName`), then use `t.group.keyName` in the component. Do NOT nest deeper than 2 levels — the type system flattens leaf keys to `string`.
- **Adding a new chart**: Use `ReactECharts` from `echarts-for-react`, construct option with `useMemo`, use `useTheme()` for theme-aware colors
- **Modifying the parser**: Types in `src/lib/types.ts`, logic in `src/lib/parser.ts`
- **Adding a new CSS variable**: Define in both `:root, .light` AND `.dark` blocks in `src/app/globals.css`, then reference as `var(--your-token)` in components
- **Changing the visual design**: Update CSS variables in `globals.css` — do NOT hardcode colors in individual components
- **Adding a new view/tab**: Add to `TABS` array in `Dashboard.tsx`, add translation keys under `tabs.*` in both locales, create component with Hero + chart pattern using `filteredResult`
- **Adding clipboard copy to a value**: Import `<CopyButton>` from `@/components/CopyButton`, wrap the display value as its child, pass `value` (numeric) and `name` (display label for toast). The component handles clipboard API, fallback, toast, and timer cleanup.
- **Adding social media share card support for a new tab**: If a new dashboard tab is added, update `ShareTab` in `src/lib/shareCardData.ts`, add the corresponding data interface and extraction logic, add a `ShareCard` render branch for the tab's infographic layout (KPI + mini-chart), and add translations under `share.*` in both locales.
- **Modifying share card design**: Edit `ShareCard.tsx` to change the infographic layout, colors, or chart type for any tab. Card dimensions are constants `CARD_W` (1200) / `CARD_H` (630). Chart options are computed with `useMemo` using theme-aware colors. QR code URL is hardcoded in `ShareModal.tsx` (`useEffect` → `QRCode.toDataURL`).
- **Adding a new custom project config feature**: Project definitions live in `ProjectConfigContext` with localStorage persistence. Edit `ProjectDef` type and `ProjectConfigContext` for schema changes, `ProjectView` for display changes, and `translations.ts` under `projects.*` for UI strings. Config modal uses drag-and-drop + keyboard-accessible dropdowns.
- **Managing ZIP uploads**: ZIP extraction logic lives in `concatFiles.ts` via JSZip. The `concatMonthlyCSVs()` function auto-detects `.zip` files and extracts CSV content before pairing. To change the file size limit, update `MAX_UPLOAD_SIZE_BYTES` in `concatFiles.ts`.
- **Adding a new upload validation**: Add check logic in `DropZone.tsx`, error key in `translations.ts` under `error.*` or `dropzone.*`, and display via `ErrorDisplay.tsx`.
- **Adding or modifying a landing page section**: Edit `LandingPage.tsx` — add a new `<section>` block with `reveal-section` class and `ref` callback for Intersection Observer. Precede each section with a thin `<hr style={{ borderColor: "var(--border)" }} />` divider. Use Apple-minimalist spacing (`pt-10 pb-12` or `pb-16`), centered `<h2>` with `text-[11px]` uppercase section title styling, subsections headed by `<h3>`, and content using `var(--text-primary)` / `var(--text-secondary)` colors. Add an `id` attribute for direct anchor linking (e.g., `id="how-it-works"`). For below-the-fold sections, add `style={{ contentVisibility: "auto" }}` to defer rendering and reduce initial paint cost. Add translation keys under `landing.*` group (flat 2-level keys). If the content is important for SEO, also add it to `LandingContent.tsx` inside the `<noscript>` block.
- **Adding email / clipboard interaction**: Use `navigator.clipboard.writeText()` with a `<textarea>` fallback for older browsers. Dynamically concatenate email addresses at runtime (`"hello" + "@" + "domain"`) to deter scraping. Provide immediate visual feedback (e.g., SVG checkmark + "Copied" tooltip, 2s timeout).
- **Supporting a new CSV column**: Add to types in `types.ts`, update parser validation in `parser.ts`, add to pivot/join logic if needed
- **Changing the font**: Replace WOFF2 files in `public/fonts/`, update `@font-face` declarations in `globals.css`, update `--font-sans` in the `@theme inline` block
- **Adding a new animation**: Define `@keyframes` in `globals.css`, add to `@theme inline` block as `--animate-*`. Respect `prefers-reduced-motion` by including in the global media query.
- **Updating SEO metadata**: Edit `generateMetadata()` in `layout.tsx` for page-level meta tags (title, description, OG, Twitter, alternateLocale). Edit `src/lib/schema.ts` for JSON-LD structured data (SoftwareApplication, FAQPage, BreadcrumbList). For new landing page sections visible to crawlers without JS, add content to `LandingContent.tsx`. For sub-pages with independent SEO (guideline, privacy, terms, changelog), each has its own `page.tsx` with dedicated `generateMetadata()`.
- **Changing the site URL**: Set `NEXT_PUBLIC_SITE_URL` env var (in `.env` or deployment platform). It propagates to metadata canonical URL, `robots.ts` sitemap pointer, and `sitemap.ts` entry URL.
- **Adding a new theme-aware landing image**: Add light and dark variants to `public/landing/`, then update the `isDark` branching in `LandingPage.tsx` to reference the correct paths.
- **Adding a new page with independent SEO metadata**: Create a route directory under `src/app/` (e.g., `privacy/`), add `page.tsx` with its own `generateMetadata()` (canonical URL, OpenGraph, Twitter, robots), create the page component in `src/components/`, add the URL to `src/app/sitemap.ts`, and add translation keys to the `translations.ts` file. For structured content pages, consider adding JSON-LD schema (e.g., `WebPage`) in the client component. Add navigation links to `FooterBar.tsx`.
- **Adding Google Analytics to a page**: GA is injected globally in `layout.tsx` — no per-page setup needed. To track page-views on client-side navigations, call `gtag('config', GA_ID, { page_path: ... })` in a `useEffect`. Set `NEXT_PUBLIC_GA_ID` in deployment environment; leave unset locally to disable tracking.
