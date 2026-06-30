@AGENTS.md

## Sister project cross-linking

This project is part of the "API Usage Analyzer Series" — a product family with a sister project for Agnes AI:

- **DeepSeek Usage Analyzer** (this repo): `https://github.com/GavinCnod/deepseek-api-usage-analysis` → `https://deepseek-usage.xyz`
- **Agnes AI Usage Analyzer** (sister): `https://github.com/GavinCnod/agnes-api-usage-analysis` → `https://agnes-usage.xyz`

All cross-site links are centralized in `src/lib/sisterProjects.ts`. When adding a new cross-link entry point, use `buildTrackedSisterUrl(baseUrl, campaign)` to append UTM tracking (`utm_source=agnes_site`, `utm_medium=referral`, `utm_campaign=...`). The module exports `deepseekProject`, `agnesProject`, and `TOOL_SERIES_NAME`.

Environment variables:
- `NEXT_PUBLIC_SITE_URL` — current site URL (default: `https://deepseek-usage.xyz`)
- `NEXT_PUBLIC_AGNES_SITE_URL` — Agnes site URL (falls back to GitHub URL if unset)
- `NEXT_PUBLIC_AGNES_GITHUB_URL` — Agnes GitHub repo URL (default: `https://github.com/GavinCnod/agnes-api-usage-analysis`)

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
