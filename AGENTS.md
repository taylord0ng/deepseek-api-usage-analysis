<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek Usage Dashboard

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── layout.tsx           # Root layout, metadata
│   ├── page.tsx             # Entry → renders <Dashboard />
│   ├── globals.css          # Tailwind v4
│   └── AppI18nShell.tsx     # Client shell: I18nProvider + lang sync
├── components/
│   ├── Dashboard.tsx        # Main layout, tabs, header, footer
│   ├── DropZone.tsx         # Drag-and-drop CSV uploader
│   ├── KPICards.tsx         # Summary stat cards
│   ├── OverviewView.tsx     # Daily cost bars + cost-by-key donut
│   ├── KeyView.tsx          # Per-key table with inline bars
│   ├── CacheView.tsx        # Cache hit rate gauge + trends + stacked bars
│   ├── TrendsView.tsx       # Toggleable multi-metric line chart
│   ├── ErrorDisplay.tsx     # Parse error + warning banners
│   └── LanguageSwitcher.tsx # EN / 中文 toggle
├── i18n/
│   ├── index.ts             # Barrel export
│   ├── I18nProvider.tsx     # React context + useTranslation hook
│   └── translations.ts      # All UI strings in en/zh
└── lib/
    ├── types.ts             # AmountRow, CostRow, DailyUsage, ParseResult, etc.
    ├── parser.ts            # Papa Parse CSV pipeline (parse → pivot → join)
    ├── concatFiles.ts       # Multi-month CSV pairing & concatenation
    ├── format.ts            # Locale-aware formatCost / formatTokens / formatPercent
    └── DataContext.tsx       # Data state: loadFiles, clear, result, error, warnings
```

## Key technical details

- **Static export** (`next.config.ts` → `output: "export"`) — no SSR, no Node server
- **All components are `"use client"`** — the app is purely client-side
- **ECharts** via `echarts-for-react` for all visualizations
- **Papa Parse** for CSV parsing (runs in browser)
- **Tailwind CSS v4**

## i18n system

- Custom React context (not next-intl) — appropriate for a client-only SPA
- Translations in `src/i18n/translations.ts` as a const object with `en` and `zh` keys
- Use `useTranslation()` hook → returns `{ t, locale, setLocale }`
- `t` is the translation object: `t.app.title`, `t.kpi.totalCost`, etc.
- Interpolation uses `{key}` placeholders: `t.kpi.saved.replace("{tokens}", value)`
- Locale persisted to `localStorage["ds-locale"]`
- Format functions in `src/lib/format.ts` accept `locale` param for 万 vs K/M

## CSV format (DeepSeek platform)

**amount CSV**: `utc_date | model | api_key_name | api_key | type | price | amount`
- `type` is pivoted: `request_count | output_tokens | input_cache_hit_tokens | input_cache_miss_tokens`

**cost CSV**: `utc_date | model | cost | currency`
- Cost distributed proportionally across API keys within each (date, model) group

## Common tasks

- **Adding a new UI string**: Add to both `en` and `zh` in `src/i18n/translations.ts`, then use `t.path.to.key` in the component
- **Adding a new chart**: Use `ReactECharts` from `echarts-for-react`, construct option with `useMemo`
- **Modifying the parser**: Types in `src/lib/types.ts`, logic in `src/lib/parser.ts`
