# Faust Foundation Migration Deliverables

This document is the canonical location for the current migration audit deliverables and baseline architecture notes for the Faust.js migration stream.

## Audit Deliverables Snapshot

### Current Platform Baseline
- **Frontend runtime:** Next.js app (`npm run dev` / `next dev`) with migration-era Vite-compatible modules still present.
- **Source-tree note:** both `src/` and `client/src/` include migration scaffolding; active checkout/WordPress integration utilities currently live under `client/src/`.
- **Backend:** Minimal Express server for static/API support.
- **Cart:** Local `CartContext` state management with documented WooGraphQL swap points.
- **Catalog Data:** Mock catalog remains present pending full WooCommerce wiring.

### Migration Target
- **Framework:** Faust.js (Next.js) on WP Engine Atlas.
- **Commerce/Data:** WPGraphQL + WooGraphQL.
- **Cart/Checkout:** WooCommerce sessions over GraphQL mutations; hybrid/native Woo checkout supported.

### Existing Migration-Ready Abstractions
1. **Routing abstraction** via `client/src/lib/navigation.tsx` (`AppLink`, `useAppRouter`).
2. **Product adapter layer** via `client/src/lib/product-types.ts` (`adaptWooProduct`).
3. **GraphQL query/mutation stubs** in `client/src/graphql/queries.ts` and `client/src/graphql/mutations.ts`.
4. **Cart swap points** identified in `client/src/context/CartContext.tsx`.
5. **Checkout redirect strategy** in `client/src/features/checkout/checkout-strategy.ts`.

### Design System Constraints (Migration Invariants)
- **Colors:** `#000000`, `#0A0A0A`, `#F5F0E8`, `#C9A84C`.
- **Typography:** Playfair Display, Cormorant Garamond, DM Sans.
- **Theme Mode:** Dark-mode only.

## Foundation Workstream Scope (`migration/faust-foundation`)

### Objectives
- Establish Next.js/Faust bootstrapping and app shell patterns.
- Port shared styles/tokens and confirm visual parity baseline.
- Keep migration planning/docs in `docs/migration/` as source of truth.
- Confirm WordPress/Woo plugin and environment prerequisites.

### Done Criteria
- Foundation architecture and migration plan documented in `docs/migration/`.
- Branching matrix published with handoff expectations.
- Snapshot branch for imported baseline is tagged for immutability.
- Clear handoff notes prepared for UI port and commerce integration branches.

## Source Notes
This document consolidates and supersedes migration-audit content previously kept in:
- `replit.md`
- `src/MIGRATION_GUIDE.md`
- `client/src/MIGRATION_GUIDE.md`

## Related Migration Docs
- `docs/migration/wordpress-woocommerce-integration.md`
- `docs/migration/integration-checklist.md`
- `docs/migration/staging-smoke-tests.md`
- `docs/migration/branching.md`
