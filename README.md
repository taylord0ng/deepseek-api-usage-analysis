# DeepSeek Usage Dashboard

Drop your DeepSeek platform CSV exports and instantly see cost analytics, per-key breakdowns, cache hit analysis, and usage trends. Everything stays in your browser — no upload, no backend, no signup.

> 🇨🇳 [中文版](README_zh.md)

## How it works

1. Go to [DeepSeek Platform](https://platform.deepseek.com) → Usage → Export monthly CSVs
2. You get two files: `amount-{year}-{month}.csv` and `cost-{year}-{month}.csv`
3. Drag both onto the dashboard
4. Charts render instantly — nothing leaves your browser

## Features

- **Overview** — KPI big numbers (cost, tokens, cache rate, active keys) + daily cost bars + cost-by-key donut
- **By Key** — Sortable table with per-key tokens, cost, cache hit rate, request counts, and inline usage bars
- **Cache** — Large-format hit rate gauge, daily cache trend, stacked hits vs misses by key
- **Trends** — Toggleable line chart (cost / tokens / cache rate / requests)
- **🌓 Dark mode** — Full light/dark theme support with automatic system preference detection; manual toggle available
- **🎨 Apple-minimalist design** — Clean, spacious layout with "no-card" full-width modules, subtle dividers, and diffuse shadows
- **🔍 Model filter** — Segmented control to filter all views by model (All / deepseek-chat / deepseek-reasoner / etc.)
- **🌐 Multi-language** — English and Chinese (中文), auto-detected from browser; manual switch available
- **Zero config** — Auto-detects DeepSeek platform CSV format
- **100% private** — Papa Parse processes everything in your browser

## CSV Format

Standard DeepSeek platform export:

### `amount-{year}-{month}.csv`

| Column | Description |
|--------|-------------|
| `utc_date` | Usage date |
| `model` | `deepseek-chat`, `deepseek-reasoner`, etc. |
| `api_key_name` | Your key label |
| `api_key` | Key (masked) |
| `type` | `request_count`, `output_tokens`, `input_cache_hit_tokens`, `input_cache_miss_tokens` |
| `price` | Unit price (CNY) |
| `amount` | Count |

### `cost-{year}-{month}.csv`

| Column | Description |
|--------|-------------|
| `utc_date` | Charge date |
| `model` | Model name |
| `cost` | Amount (negative = charge) |
| `currency` | CNY |

## Development

```bash
npm install
npm run dev        # Dev server at localhost:3000
npm run build      # Static export → out/
```

Test with the sample CSVs in `public/sample-amount-2026-06.csv` and `public/sample-cost-2026-06.csv`.

### Stack

Next.js 16 (static export) · React 19 · TypeScript · ECharts · Papa Parse · Tailwind CSS 4 · CSS custom properties

## Deploy

Static output — deploy anywhere:

```bash
npm run build
# out/ → Vercel, Netlify, GitHub Pages, Cloudflare Pages
```

## License

MIT
