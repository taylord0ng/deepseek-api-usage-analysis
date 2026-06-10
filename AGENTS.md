<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek Usage Dashboard

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

Strictly follows an Apple-minimalist design language: cold gray paper-texture backgrounds, ample whitespace, "no-card" full-width modules with thin horizontal dividers, subtle rounded corners, and diffuse shadows. Full light/dark dual-theme support driven by CSS custom properties.

**Version**: 0.2.3

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── layout.tsx           # Root layout, metadata, ThemeProvider + I18nProvider + DataProvider
│   ├── page.tsx             # Entry → renders <Dashboard />
│   ├── globals.css          # Tailwind v4 + @font-face Hubot Sans + CSS variables + reveal/accordion + base styles
│   ├── favicon.ico          # App icon (branded)
│   └── AppI18nShell.tsx     # Client shell: I18nProvider + <html lang> sync
├── components/
│   ├── TitleBar.tsx          # Shared sticky top nav: logo + app name + GitHub icon + LanguageSwitcher + ThemeSwitcher
│   ├── FooterBar.tsx         # Shared footer: thin divider + copyright + GitHub link + version
│   ├── LandingPage.tsx       # Pre-upload landing: Hero + Upload + HowItWorks + accordion QA + About (scroll-reveal)
│   ├── Dashboard.tsx         # Main layout: routes between LandingPage (no data) and Dashboard view
│   ├── DropZone.tsx          # Drag-and-drop CSV uploader (supports multi-file, "or click to upload")
│   ├── KPICards.tsx          # Summary stat cards (card-less big-number layout)
│   ├── OverviewView.tsx      # Hero total cost + daily cost bars + cost-by-key donut (theme-aware)
│   ├── KeyView.tsx           # Hero key count + per-key table with inline bars & cache-hit color coding
│   ├── CacheView.tsx         # Hero hit rate + daily trend line + per-key hits-vs-misses stacked bars
│   ├── TrendsView.tsx        # Hero dynamic metric + toggleable multi-metric line chart (theme-aware)
│   ├── ErrorDisplay.tsx      # Parse error + warning banners with i18n titles
│   ├── LanguageSwitcher.tsx  # EN / 中文 toggle (Apple pill segmented control with `role="radio"`)
│   └── ThemeSwitcher.tsx     # Light / Dark toggle (Apple-minimalist SVG icon button)
├── i18n/
│   ├── index.ts             # Barrel export
│   ├── I18nProvider.tsx     # React context + useTranslation hook + localStorage persistence
│   └── translations.ts      # All UI strings in en/zh (app, tabs, dropzone, kpi, landing, etc.)
└── lib/
    ├── types.ts             # AmountRow, CostRow, DailyUsage, KeyStats, ParseResult, ParseError, ParseWarning
    ├── parser.ts            # Papa Parse CSV pipeline (parse → pivot → join → computeKeyStats)
    ├── concatFiles.ts       # Multi-month CSV pairing & concatenation (reads file names, strips headers)
    ├── format.ts            # Locale-aware formatCost / formatTokens / formatPercent
    ├── DataContext.tsx       # Data state + model filter (selectedModel, filteredResult, filterResult)
    └── ThemeContext.tsx      # Light/dark theme context + useTheme hook + localStorage + system preference

public/
├── ds-usage-logo.ico        # Favicon / app icon
├── ds-usage-logo.png        # App icon (PNG)
└── fonts/
    ├── HubotSans-Regular.woff2   # Body text (weight 400)
    ├── HubotSans-Medium.woff2    # Medium weight (500)
    └── HubotSans-Bold.woff2      # Headings weight (700)
```

## Key technical details

- **Static export** (`next.config.ts` → `output: "export"`) — no SSR, no Node server
- **All components are `"use client"`** — the app is purely client-side
- **Next.js 16** with React 19 — App Router, `"use client"` directives, static export
- **ECharts 6** via `echarts-for-react` for all visualizations (bar, line, pie/donut with theme-aware colors)
- **Papa Parse** for CSV parsing (runs in browser)
- **Tailwind CSS v4** with `@theme inline` extensions — CSS-first configuration, no `tailwind.config.ts`
- **Hubot Sans** as primary font (local WOFF2, 3 weights: 400/500/700), with Chinese fallback stack (`PingFang SC`, `Microsoft YaHei`) — Apple-like typography
- **Geist Mono** (from `next/font/google`) for code — variable weight
- **CSS custom properties** for theming — all colors are `var(--bg)`, `var(--text-primary)`, etc.; NO hardcoded colors in components
- **TypeScript 5** with strict mode, path alias `@/*` → `./src/*`

## Theme system

The app supports full light/dark dual-theme switching, designed in Apple-minimalist style.

### Architecture

- `ThemeContext` (`src/lib/ThemeContext.tsx`): React context providing `theme: "light" | "dark"` and `toggleTheme()`
- Theme persisted to `localStorage["ds-theme"]`; falls back to `prefers-color-scheme` media query, then `"light"`
- `<html>` gets a `class` of `"light"` or `"dark"` — this drives ALL CSS variables
- `ThemeProvider` wraps the entire app in `layout.tsx`

### CSS variable design

All colors are defined as CSS custom properties on `:root, .light` and `.dark` selectors in `globals.css`. Components NEVER use hardcoded color values — always reference `var(--...)`.

**Full color token reference:**

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `#F5F5F7` | `#000000` | Page background |
| `--bg-surface` | `#FFFFFF` | `#1C1C1E` | Elevated surface |
| `--bg-surface-hover` | `#FAFAFA` | `#2C2C2E` | Surface hover state |
| `--text-primary` | `#1D1D1F` | `#F5F5F7` | Body text, headings |
| `--text-secondary` | `#86868B` | `#98989D` | Labels, captions, table values |
| `--text-tertiary` | `#98989D` | `#636366` | Muted hints, metadata |
| `--border` | `#E5E5EA` | `#38383A` | Dividers, table borders, pill track |
| `--border-strong` | `#D2D2D7` | `#48484A` | Scrollbar thumb |
| `--accent` | `#1D1D1F` | `#F5F5F7` | Emphasis, chart series, selected tab underline |
| `--accent-hover` | `#3A3A3C` | `#D2D2D7` | Accent hover state |
| `--accent-inverse` | `#F5F5F7` | `#1D1D1F` | Text on accent background (e.g., selected pill) |
| `--positive` | `#059669` | `#34D399` | Cache hit green (>40% in KeyView) |
| `--positive-subtle` | `#ECFDF5` | `#064E3B` | Positive background highlight |
| `--danger` | `#DC2626` | `#F87171` | Error / clear button red (<20% in KeyView) |
| `--danger-subtle` | `#FEF2F2` | `#3B1717` | Danger background highlight |
| `--error-bg` | `#FDF2F2` | `#3B1717` | Error banner background |
| `--error-border` | `#FECACA` | `#7F1D1D` | Error banner border |
| `--error-text` | `#991B1B` | `#FCA5A5` | Error banner text |
| `--warning-bg` | `#FFFBEB` | `#3B2F0E` | Warning banner background |
| `--warning-border` | `#FDE68A` | `#78350F` | Warning banner border |
| `--warning-text` | `#92400E` | `#FDE68A` | Warning banner text + mid-range cache hit (20-40%) |
| `--chart-grid` | `#E5E5EA` | `#38383A` | ECharts grid lines (available but not directly used — components use `useTheme()` instead) |
| `--chart-text` | `#86868B` | `#98989D` | ECharts text (available but not directly used) |
| `--dropzone-bg` | `#EEF2F9` | `#11151D` | Drop zone default background |
| `--dropzone-drag-bg` | `#EDEEF0` | `#2C2C2E` | Drop zone background on drag-over |
| `--dropzone-drag-border` | `#86868B` | `#98989D` | Drop zone border on drag-over |

**Shadow tokens:**

| Variable | Light | Dark |
|---|---|---|
| `--shadow-sm` | `0 2px 16px rgba(0, 0, 0, 0.03)` | `0 2px 16px rgba(0, 0, 0, 0.3)` |
| `--shadow-md` | `0 4px 32px rgba(0, 0, 0, 0.04)` | `0 4px 32px rgba(0, 0, 0, 0.5)` |

### Tailwind v4 @theme inline integration

The `@theme inline` block in `globals.css` maps CSS custom properties to Tailwind v4 theme tokens, allowing components to use both `var(--...)` and Tailwind utility classes interchangeably:

```css
@theme inline {
  --color-background:  var(--bg);
  --color-foreground:  var(--text-primary);
  --color-surface:     var(--bg-surface);
  --color-border:      var(--border);
  --color-accent:      var(--accent);
  --color-muted:       var(--text-secondary);
  --font-sans:         "Hubot Sans", -apple-system, BlinkMacSystemFont,
                       "SF Pro Text", "Helvetica Neue", "PingFang SC",
                       "Microsoft YaHei", sans-serif;
  --font-mono:         var(--font-geist-mono), "SF Mono", Menlo, monospace;
  --animate-fade-in:   fade-in 0.3s ease-out;
  --animate-slide-up:  slide-up 0.35s ease-out;
}
```

This means `bg-background`, `text-foreground`, `border-border`, `animate-fade-in` etc. all work as Tailwind classes.

### Utility classes

The following utility classes are defined in `globals.css`:

- `.shadow-diffuse` — applies `var(--shadow-sm)` (subtle diffuse shadow)
- `.shadow-diffuse-md` — applies `var(--shadow-md)` (deeper diffuse shadow)
- `.rounded-subtle` — `border-radius: 6px` (consistent micro-rounding)
- `.reveal-section` — Initial state: `opacity: 0; transform: translateY(24px)`. Controlled by Intersection Observer in `LandingPage.tsx`
- `.reveal-section.visible` — `opacity: 1; transform: translateY(0)` with 0.6s cubic-bezier transition
- `.accordion-panel` — Collapsed state: `max-height: 0; opacity: 0`
- `.accordion-panel.open` — Expanded state: `max-height: 12rem; opacity: 1` with 0.35s cubic-bezier transition

### Global base styles

- **Font**: `Hubot Sans` (local WOFF2, weight 400 body / 700 headings), `Geist Mono` for code. Chinese fallback: `PingFang SC`, `Microsoft YaHei`.
- **Text rendering**: `antialiased`, `optimizeLegibility`, `-0.01em` letter-spacing on body
- **Smooth scrolling**: `scroll-behavior: smooth` on `<html>`
- **Color scheme**: `color-scheme: light` / `color-scheme: dark` set per theme for native browser UI (form controls, scrollbars)
- **Selection**: Inverted colors (`var(--text-primary)` bg, `var(--accent-inverse)` text)
- **Scrollbar**: 6px thin, transparent track, `var(--border-strong)` thumb, hover darkens
- **Links**: `var(--text-secondary)` with hover → `var(--text-primary)` transition
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` kills all animations (0.01ms duration) and disables smooth scroll — respects user OS preference

### ECharts theme integration

All chart components (`OverviewView`, `TrendsView`, `CacheView`, `KeyView`) use `useTheme()` from `ThemeContext` to derive chart colors. Pattern:

```tsx
const { theme } = useTheme();
const isDark = theme === "dark";
const textColor = isDark ? "#98989D" : "#86868B";
const gridColor = isDark ? "#2C2C2E" : "#E5E5EA";
```

Chart series colors switch between dark-on-light (matte black `#1D1D1F`) and light-on-dark (white `#F5F5F7`). Cache-related charts use green (`#059669` / `#34D399`) for hits and gray (`#D2D2D7` / `#636366`) for misses.

### Adding a new themed component

1. Reference CSS variables directly for non-chart elements: `style={{ color: "var(--text-primary)" }}`
2. For ECharts options, use `useTheme()` and branch on `isDark`
3. To add a new CSS variable: define it in both `:root, .light` AND `.dark` blocks in `globals.css`
4. To add a new Tailwind utility: add to the `@theme inline` block

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

| Group | Keys | Used in |
|---|---|---|
| `app` | `title`, `subtitle` | `Dashboard.tsx` title area |
| `tabs` | `overview`, `keys`, `cache`, `trends` | `Dashboard.tsx` tab bar |
| `header` | `loadDifferent`, `clear` | `Dashboard.tsx` header actions |
| `footer` | `text`, `version` | `FooterBar.tsx` |
| `dropzone` | `processing`, `title`, `hint`, `privacy` | `DropZone.tsx` |
| `kpi` | `totalCost`, `totalTokens`, `cacheHitRate`, `activeKeys`, `saved`, `models` | `KPICards.tsx`, various views |
| `overview` | `dailyCost`, `costByKey` | `OverviewView.tsx` |
| `trends` | `dailyCost`, `dailyTokens`, `cacheHitRate`, `requestCount`, `heroSubtitle` | `TrendsView.tsx` |
| `cache` | `hitRateTitle`, `servedFromCache`, `dailyHitRate`, `hitsVsMisses`, `noCacheTitle`, `noCacheHint`, `hits`, `misses` | `CacheView.tsx` |
| `keys` | `title`, `apiKeyName`, `tokens`, `cost`, `cacheHit`, `requests`, `heroSubtitle` | `KeyView.tsx` |
| `error` | `missingColumns`, `malformedRow`, `emptyFile`, `incompleteUpload`, `row`, `column` | `ErrorDisplay.tsx` |
| `warning` | (not directly used as keys — warning messages come from parser) | `ErrorDisplay.tsx` |
| `meta` | `title`, `description` | `layout.tsx` metadata |
| `langSwitcher` | `label` | (deprecated — component now uses hardcoded `aria-label`) |
| `theme` | `light`, `dark`, `switchToDark`, `switchToLight` | `ThemeSwitcher.tsx` |
| `modelFilter` | `allModels` | `Dashboard.tsx` model filter pill |
| `landing` | `howItWorksTitle`, `howItWorksStep1Title`, `howItWorksStep1Desc`, `howItWorksStep2Title`, `howItWorksStep2Desc`, `howItWorksStep3Title`, `howItWorksStep3Desc`, `qaTitle`, `qaQ1`–`qaQ4`, `qaA1`–`qaA4`, `aboutTitle`, `aboutText` | `LandingPage.tsx` |

## Multi-month CSV support (concatFiles)

`src/lib/concatFiles.ts` handles multi-month CSV pairing and concatenation:

1. **File name pattern**: `amount-{year}-{month}.csv` / `cost-{year}-{month}.csv` (e.g., `amount-2026-5.csv` + `cost-2026-5.csv`)
2. **Pairing**: Groups files by extracted `{year}-{month}` key — only months with BOTH amount and cost files are paired
3. **Concatenation**: First file keeps its header; subsequent files have headers stripped before joining
4. **Fallback**: If no named pairs are found, falls back to grouping by prefix (`amount-*`, `cost-*`)
5. **Label**: Single month → `"2026-5"`, multiple months → `"2026-5 ~ 2026-6"`
6. **Result**: Returns concatenated `amountText`, `costText`, human-readable `label`, and `monthCount`

Both `DropZone.tsx` (initial upload) and `Dashboard.tsx` (re-upload) use `concatMonthlyCSVs()` with `File[]` from drag-and-drop or file picker.

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
Rendered via `<LandingPage />` — a scrollable single-page layout with:
1. **TitleBar** — sticky top bar with logo + app name + GitHub icon + LanguageSwitcher + ThemeSwitcher
2. **Hero** — shorter section (`pt-16 pb-10`), centered title + subtitle, uses `translate="no"` on heading
3. **Upload** — `<DropZone />` + `<ErrorDisplay />`
4. **How It Works** — 3-step grid layout, each step has a numbered circle (`w-10 h-10 rounded-full`), hover micro-interactions via `group` + `group-hover`
5. **QA** — Accordion pattern: click on question toggles answer panel. Uses `openQa` state (number | null). Panels animated via `.accordion-panel` CSS class with `max-height` transition. Accessible: `aria-expanded`, `aria-controls`, keyboard support (Enter/Space). `focus-visible` outlines.
6. **About** — project description
7. **FooterBar** — shared footer

Each `<section>` uses a `reveal-section` CSS class and is watched by an Intersection Observer: when 15% of a section enters the viewport, the `.visible` class is added, triggering a fade-in + slide-up animation. Once visible, the observer unobserves the element (runs once). Respects `prefers-reduced-motion` via global CSS.

### Dashboard view (post-upload, `result` exists)
Rendered inline in `Dashboard.tsx` with:
1. **TitleBar** — same shared component
2. **Action bar** — file name + date range (left) + re-upload/clear buttons (right)
3. **Content** — ErrorDisplay, KPICards, tabs, model filter, chart views
4. **FooterBar** — same shared component

### Shared components

**TitleBar** (`src/components/TitleBar.tsx`):
- Sticky top bar with `z-10`, thin bottom border (`var(--border)`)
- Left: logo (`next/image`, 32×32) + app title (`t.app.title`) in bold
- Right: GitHub icon link + `<LanguageSwitcher />` + `<ThemeSwitcher />`
- Used by both `LandingPage` and `Dashboard`

**FooterBar** (`src/components/FooterBar.tsx`):
- Thin HR divider + centered muted text + GitHub link + version number
- Text from `t.footer.text`, version from `t.footer.version`
- Supports optional `animate` prop for reveal-section scroll animation on Landing page
- Mobile-friendly with `flex-wrap` for small screens
- Used by both `LandingPage` and `Dashboard`

## Component patterns

### Hero + chart layout

Three views use a consistent "Hero big number + chart" pattern:
- **OverviewView**: Hero shows total cost (formatted), then daily bar chart + donut chart side by side
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
- **Adding a new view/tab**: Add to `TABS` array in `Dashboard.tsx`, add translation keys in both locales, create component with Hero + chart pattern using `filteredResult`
- **Adding or modifying a landing page section**: Edit `LandingPage.tsx` — add a new `<section>` block with `reveal-section` class and `ref` callback for Intersection Observer. Use Apple-minimalist spacing (`pb-12` or `pb-16`), centered `text-[11px]` uppercase section title, and content using `var(--text-primary)` / `var(--text-secondary)` colors. Add translation keys under `landing.*` group (flat 2-level keys).
- **Supporting a new CSV column**: Add to types in `types.ts`, update parser validation in `parser.ts`, add to pivot/join logic if needed
- **Changing the font**: Replace WOFF2 files in `public/fonts/`, update `@font-face` declarations in `globals.css`, update `--font-sans` in the `@theme inline` block
- **Adding a new animation**: Define `@keyframes` in `globals.css`, add to `@theme inline` block as `--animate-*`. Respect `prefers-reduced-motion` by including in the global media query.
