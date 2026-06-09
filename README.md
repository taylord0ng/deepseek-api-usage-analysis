# DeepSeek Usage Dashboard

A browser-side analytics dashboard for DeepSeek API usage. Drag your monthly CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends — all processed locally in your browser. No server, no upload, no signup.

> [中文版](README_zh.md)

## How it works

1. Go to [DeepSeek Platform](https://platform.deepseek.com) → Usage → Export monthly CSVs
2. You get two files per month: `amount-{year}-{month}.csv` and `cost-{year}-{month}.csv`
3. Drag all files onto the dashboard (one month or multiple — they auto-pair)
4. Charts render instantly — nothing leaves your browser

## Features

- **Overview** — KPI big numbers (cost, tokens, cache rate, active keys) + daily cost bar chart + cost-by-key donut chart
- **By Key** — Detailed table with per-key tokens, cost, color-coded cache hit rate (green > 40% / amber 20–40% / red < 20%), request counts, and inline usage bars
- **Cache** — Large-format hit rate display, daily cache hit rate trend line, stacked hits-vs-misses bar chart by key
- **Trends** — Toggleable multi-metric line chart (cost / tokens / cache hit rate / requests) with dynamic hero number
- **Dark mode** — Full light/dark dual-theme with CSS custom properties; auto-detects system preference, manual toggle persisted to localStorage
- **Multi-language** — English and 中文, auto-detected from browser language; manual switch with localStorage persistence
- **Model filter** — Segmented control (pill buttons) to filter all views by model; only shown when ≥2 models detected
- **Multi-month support** — Drag multiple months at once; files auto-pair by filename pattern and concatenate
- **Apple-minimalist design** — Cold gray paper-texture background, generous whitespace, "no-card" full-width modules, thin horizontal dividers, 5rem hero numbers, diffuse shadows
- **100% private** — All CSV parsing (Papa Parse) and cost computation runs client-side

## CSV Format

Standard DeepSeek platform export:

### `amount-{year}-{month}.csv`

| Column         | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `utc_date`     | Usage date                                                                            |
| `model`        | `deepseek-chat`, `deepseek-reasoner`, etc.                                            |
| `api_key_name` | Your key label                                                                        |
| `api_key`      | Key (masked)                                                                          |
| `type`         | `request_count`, `output_tokens`, `input_cache_hit_tokens`, `input_cache_miss_tokens` |
| `price`        | Unit price in CNY                                                                     |
| `amount`       | Token or request count                                                                |

### `cost-{year}-{month}.csv`

| Column     | Description                |
| ---------- | -------------------------- |
| `utc_date` | Charge date                |
| `model`    | Model name                 |
| `cost`     | Amount (negative = charge) |
| `currency` | CNY                        |

## Development

```bash
npm install
npm run dev        # Dev server at localhost:3000
npm run build      # Static export → out/
npm run lint       # ESLint
```

### Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | Next.js 16 (App Router, static export)  |
| UI          | React 19                                |
| Charts      | ECharts 6 + echarts-for-react           |
| CSV Parsing | Papa Parse 5                            |
| Styling     | Tailwind CSS v4 + CSS custom properties |
| Typography  | Geist Sans + Geist Mono (next/font)     |
| Language    | TypeScript 5 (strict mode)              |

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, metadata, providers
│   ├── page.tsx            # Entry → <Dashboard />
│   ├── globals.css         # Tailwind v4 + 30+ CSS variables + base styles
│   └── AppI18nShell.tsx    # i18n shell + <html lang> sync
├── components/
│   ├── TitleBar.tsx         # Shared top nav bar (app name + language + theme)
│   ├── FooterBar.tsx        # Shared footer (copyright + GitHub link)
│   ├── LandingPage.tsx      # Landing page (Hero + Upload + HowItWorks + QA + About)
│   ├── Dashboard.tsx        # Routes between LandingPage and dashboard view
│   ├── DropZone.tsx         # Drag-and-drop CSV upload (multi-file)
│   ├── KPICards.tsx         # Summary stat cards
│   ├── OverviewView.tsx     # Hero cost + daily bars + donut
│   ├── KeyView.tsx          # Hero key count + detailed table
│   ├── CacheView.tsx        # Hero hit rate + trends + stacked bars
│   ├── TrendsView.tsx       # Hero dynamic metric + line chart
│   ├── ErrorDisplay.tsx     # Parse error & warning banners
│   ├── LanguageSwitcher.tsx # EN / 中文 toggle
│   └── ThemeSwitcher.tsx    # Light / Dark toggle
├── i18n/
│   ├── index.ts            # Barrel export
│   ├── I18nProvider.tsx    # React context + useTranslation hook
│   └── translations.ts     # All UI strings (en + zh)
└── lib/
    ├── types.ts            # TypeScript interfaces & types
    ├── parser.ts           # CSV parsing pipeline
    ├── concatFiles.ts      # Multi-month CSV pairing & concat
    ├── format.ts           # Locale-aware formatters
    ├── DataContext.tsx      # Data state + model filter
    └── ThemeContext.tsx     # Theme state + useTheme hook
```

## Design System

The dashboard follows an **Apple-minimalist** design language driven entirely by CSS custom properties:

- **30+ theme tokens** — background, text (3 levels), border, accent, semantic colors (positive/danger/warning), error/warning banners, chart colors, dropzone states
- **Light theme**: `#F5F5F7` cold gray paper background, `#1D1D1F` matte black text
- **Dark theme**: `#000000` pure black background, `#F5F5F7` white text
- **Typography**: Geist Sans, weight 350 body / 600 headings, tight letter-spacing
- **Hero pattern**: `5rem` bold numbers in Overview / Keys / Cache / Trends — prominent, data-first presentation
- **No-card layout**: Full-width modules separated by `1px solid var(--border)` dividers
- **Micro-interactions**: Subtle hover transitions (200ms), fade-in (300ms) and slide-up (350ms) animations
- **Custom scrollbar**: 6px thin, transparent track, themed thumb

## Deploy

Static output — deploy to any static host:

```bash
npm run build
# out/ → Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.
```

## Changelog

### v0.2.1

**Added:**

- Landing page — built a complete pre-upload landing page with Hero, upload area, How It Works steps, FAQ, and About sections.

### v0.2.0

**Added:**

- Full light/dark theme switching — refactored global CSS with custom properties for unified dual-theme color management.
- Model filter — added Apple-style segmented capsule filter in Dashboard, optimized UI and data presentation.

**Improved:**

- Refined overall UI interactions and visual styling.
- Refactored all view components to render from filtered data; added Hero big-number summary sections at the top of each view.

### v0.1.0

**Added:**

- Built the DeepSeek API usage analytics dashboard — implemented CSV parsing, multi-month file concatenation, and error validation logic; all data processing runs purely in the browser.
- Developed drag-and-drop upload component, data context layer, and multi-dimensional visualization dashboard.
- Added full i18n support with language switching, and refactored numeric formatting utilities to adapt unit display rules for different locales.

## License

MIT
