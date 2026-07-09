# Affiliate Wall Refactor Spec

## Why
Currently, `src/lib/affiliates.ts` exports numerous individual objects for affiliate programs and a separate array for `recommendedTools`. This fragmented structure makes it difficult to manage, scale, and reuse across the application. Consolidating them into a unified registry with unique IDs and active flags, and creating an "Affiliate Wall" component, will significantly improve maintainability and allow dynamic rendering of affiliate links on any page.

## What Changes
- **BREAKING**: Refactor `src/lib/affiliates.ts` to export a unified `affiliatesRegistry` (a map or array) instead of individual exports.
- Define a strict TypeScript interface `AffiliateItem` including `id`, `name`, `url`, `commission`, `condition`/`description`, `isActive`, `category`, and `rel`.
- Create a new `AffiliateWall.tsx` component in `src/components/` that accepts an array of affiliate IDs and renders them consistently as cards.
- Update `CostTrackerPage.tsx` to use the new `AffiliateWall` component for rendering recommended tools.
- Update `PricingCalculatorPage.tsx` to query the new `affiliatesRegistry` by ID for the Vultr CTA, ensuring compatibility with the new data structure.

## Impact
- Affected specs: Affiliates Management
- Affected code:
  - `src/lib/affiliates.ts`
  - `src/components/AffiliateWall.tsx` (New)
  - `src/components/CostTrackerPage.tsx`
  - `src/components/PricingCalculatorPage.tsx`

## ADDED Requirements
### Requirement: Unified Registry
The system SHALL provide a centralized registry for all affiliate links, where each item has a unique `id` and an `isActive` boolean flag to easily toggle visibility.

### Requirement: Affiliate Wall Component
The system SHALL provide an `AffiliateWall` component that takes an array of `ids` and renders the active affiliate items in a consistent, responsive grid layout.

## MODIFIED Requirements
### Requirement: Page Integration
Pages utilizing affiliate links SHALL query the centralized registry or use the `AffiliateWall` component, rather than importing hardcoded individual objects.
