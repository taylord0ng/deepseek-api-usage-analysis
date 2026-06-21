# Contributing to DeepSeek API Usage Analytics Dashboard

Thank you for your interest in contributing! This document will help you get started.

## Development Setup

```bash
git clone https://github.com/GavinCnod/ds-usage-analysis.git
cd ds-usage-analysis
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router, static export `output: "export"`)
- **React 19** with TypeScript 5 (strict mode)
- **Tailwind CSS v4** (CSS-first configuration, no `tailwind.config.ts`)
- **ECharts 6** via `echarts-for-react`
- **Papa Parse** for CSV parsing
- **Hubot Sans** (local WOFF2, 3 weights) + Geist Mono

## Code Conventions

### CSS / Theming

**Never hardcode colors in components.** All colors use CSS custom properties:

```tsx
// ✅ Correct
style={{ color: "var(--text-primary)" }}

// ❌ Wrong
style={{ color: "#1D1D1F" }}
```

For full token reference, see `src/app/globals.css`.

### i18n

All user-facing strings must be added to both `en` and `zh` in `src/i18n/translations.ts`. Keys follow a flat 2-level pattern:

```ts
// translations.ts
group: {
  keyName: "English text",  // en
  keyName: "中文文本",       // zh
}
```

Use the translation in components:

```tsx
const { t } = useTranslation();
<p>{t.group.keyName}</p>
```

### Components

- All components are `"use client"` — this is a client-only SPA
- Use `useTheme()` from `ThemeContext` for ECharts color switching
- Use `useData()` from `DataContext` to access parsed CSV data (use `filteredResult` for model-filtered data)
- Follow the Apple-minimalist design language: cold gray backgrounds, thin dividers, ample whitespace

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Ensure the build passes: `npm run build`
5. Test with sample data from `sampleData/`
6. Submit a PR with a clear description

### PR Checklist

- [ ] Tested with sample CSV data
- [ ] Translations added for both `en` and `zh`
- [ ] No hardcoded colors (all `var(--...)`)
- [ ] Screenshots attached if UI changed
- [ ] Build passes: `npm run build`

## Need Help?

- Check the [User Guide](https://deepseek-usage.xyz/guideline)
- Open a [GitHub Discussion](https://github.com/GavinCnod/ds-usage-analysis/discussions)
- File an [issue](https://github.com/GavinCnod/ds-usage-analysis/issues)
