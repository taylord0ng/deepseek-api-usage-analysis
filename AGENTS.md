<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DeepSeek Usage Dashboard

A browser-side dashboard for DeepSeek API usage analytics. Users drag their monthly DeepSeek platform CSV exports onto the page and get instant cost charts, per-key breakdowns, cache analysis, and usage trends. Everything runs client-side — no server, no upload, no database.

Strictly follows an Apple-minimalist design language: cold gray paper-texture backgrounds, ample whitespace, "no-card" full-width modules with thin horizontal dividers, subtle rounded corners, and diffuse shadows. Full light/dark dual-theme support driven by CSS custom properties.

## Architecture

```
src/
├── app/            # Next.js App Router (static export)
│   ├── layout.tsx           # Root layout, metadata, ThemeProvider + I18nProvider
│   ├── page.tsx             # Entry → renders <Dashboard />
│   ├── globals.css          # Tailwind v4 + CSS custom properties for light/dark themes
│   └── AppI18nShell.tsx     # Client shell: I18nProvider + lang sync
├── components/
│   ├── Dashboard.tsx        # Main layout, tabs, model filter, header, footer
│   ├── DropZone.tsx         # Drag-and-drop CSV uploader
│   ├── KPICards.tsx         # Summary stat cards (card-less big-number layout)
│   ├── OverviewView.tsx     # Daily cost bars + cost-by-key donut (theme-aware)
│   ├── KeyView.tsx          # Per-key table with inline bars (theme-aware)
│   ├── CacheView.tsx        # Cache hit rate big-number + trends + stacked bars (theme-aware)
│   ├── TrendsView.tsx       # Toggleable multi-metric line chart (theme-aware)
│   ├── ErrorDisplay.tsx     # Parse error + warning banners
│   ├── LanguageSwitcher.tsx # EN / 中文 toggle (Apple-minimalist text buttons)
│   └── ThemeSwitcher.tsx    # Light / Dark toggle (Apple-minimalist text button)
├── i18n/
│   ├── index.ts             # Barrel export
│   ├── I18nProvider.tsx     # React context + useTranslation hook
│   └── translations.ts      # All UI strings in en/zh (includes theme keys)
└── lib/
    ├── types.ts             # AmountRow, CostRow, DailyUsage, ParseResult, etc.
    ├── parser.ts            # Papa Parse CSV pipeline (parse → pivot → join)
    ├── concatFiles.ts       # Multi-month CSV pairing & concatenation
    ├── format.ts            # Locale-aware formatCost / formatTokens / formatPercent
    ├── DataContext.tsx       # Data state + model filter (selectedModel, filteredResult)
    └── ThemeContext.tsx      # Light/dark theme context + useTheme hook + localStorage persistence
```

## Key technical details

- **Static export** (`next.config.ts` → `output: "export"`) — no SSR, no Node server
- **All components are `"use client"`** — the app is purely client-side
- **ECharts** via `echarts-for-react` for all visualizations
- **Papa Parse** for CSV parsing (runs in browser)
- **Tailwind CSS v4** with `@theme inline` extensions
- **CSS custom properties** for theming — all colors are `var(--bg)`, `var(--text-primary)`, etc.; NO hardcoded colors in components

## Theme system

The app supports full light/dark dual-theme switching, designed in Apple-minimalist style.

### Architecture

- `ThemeContext` (`src/lib/ThemeContext.tsx`): React context providing `theme` and `toggleTheme()`
- Theme persisted to `localStorage["ds-theme"]`; falls back to `prefers-color-scheme` media query, then `"light"`
- `<html>` gets a `class` of `"light"` or `"dark"` — this drives ALL CSS variables
- `ThemeProvider` wraps the entire app in `layout.tsx`

### CSS variable design

All colors are defined as CSS custom properties on `:root, .light` and `.dark` selectors in `globals.css`. Components NEVER use hardcoded color values — always reference `var(--...)`.

**Key color tokens:**

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `#F5F5F7` | `#000000` | Page background |
| `--bg-surface` | `#FFFFFF` | `#1C1C1E` | Elevated surface |
| `--text-primary` | `#1D1D1F` | `#F5F5F7` | Body text |
| `--text-secondary` | `#86868B` | `#98989D` | Labels, captions |
| `--text-tertiary` | `#98989D` | `#636366` | Muted hints |
| `--border` | `#E5E5EA` | `#38383A` | Dividers |
| `--accent` | `#1D1D1F` | `#F5F5F7` | Emphasis (matte black / white) |
| `--positive` | `#059669` | `#34D399` | Cache hit green |
| `--danger` | `#DC2626` | `#F87171` | Error / clear button red |
| `--error-bg/warning-bg` | Light tints | Dark tints | Error/warning banners |

Also includes shadow tokens (`--shadow-sm`, `--shadow-md`) and dropzone drag-state tokens.

### ECharts theme integration

All chart components (`OverviewView`, `TrendsView`, `CacheView`, `KeyView`) use `useTheme()` from `ThemeContext` to derive chart colors. Pattern:

```tsx
const { theme } = useTheme();
const isDark = theme === "dark";
const textColor = isDark ? "#98989D" : "#86868B";
const gridColor = isDark ? "#2C2C2E" : "#E5E5EA";
```

Chart series colors switch between dark-on-light (matte black `#1D1D1F`) and light-on-dark (white `#F5F5F7`).

### Adding a new themed component

1. Reference CSS variables directly for non-chart elements: `style={{ color: "var(--text-primary)" }}`
2. For ECharts options, use `useTheme()` and branch on `isDark`
3. To add a new CSS variable: define it in both `:root, .light` and `.dark` blocks in `globals.css`

## Model filter

A segmented control (pill buttons) below the tab bar lets users filter all views by model. Only shown when the data has ≥2 models.

- State lives in `DataContext`: `selectedModel` (default `ALL_MODELS = "__all__"`) + `setSelectedModel`
- `filteredResult` is derived via `useMemo`: when a specific model is selected, `result.daily` is filtered, then `computeKeyStats` and `summary` are recomputed
- All child components (`KPICards`, `OverviewView`, `KeyView`, `CacheView`, `TrendsView`) use `filteredResult` instead of `result` — they automatically reflect the current filter
- `result.summary.models` (unfiltered) is preserved in `filteredResult.summary.models` so the filter UI always shows the full model list

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
- Locale persisted to `localStorage["ds-locale"]`
- Format functions in `src/lib/format.ts` accept `locale` param for 万 vs K/M

## CSV format (DeepSeek platform)

**amount CSV**: `utc_date | model | api_key_name | api_key | type | price | amount`
- `type` is pivoted: `request_count | output_tokens | input_cache_hit_tokens | input_cache_miss_tokens`

**cost CSV**: `utc_date | model | cost | currency`
- Cost distributed proportionally across API keys within each (date, model) group

## Common tasks

- **Adding a new UI string**: Add to both `en` and `zh` in `src/i18n/translations.ts`, then use `t.path.to.key` in the component
- **Adding a new chart**: Use `ReactECharts` from `echarts-for-react`, construct option with `useMemo`, use `useTheme()` for theme-aware colors
- **Modifying the parser**: Types in `src/lib/types.ts`, logic in `src/lib/parser.ts`
- **Adding a new CSS variable**: Define in both `:root, .light` AND `.dark` blocks in `src/app/globals.css`, then reference as `var(--your-token)` in components
- **Changing the visual design**: Update CSS variables in `globals.css` — do NOT hardcode colors in individual components
