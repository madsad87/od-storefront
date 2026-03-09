# Migration Branch Chain and Responsibility Matrix

## Branch Chain

The migration is organized as a linear branch chain to support staged delivery and low-risk handoffs:

1. `replit-import`
2. `migration/faust-foundation`
3. `migration/ui-port`
4. `migration/commerce-integration`
5. `staging/atlas-ready`

Each downstream branch is expected to be created from the branch immediately above it.

## Immutable Snapshot

`replit-import` is treated as an immutable baseline snapshot of the imported Replit codebase.

- Snapshot tag: `replit-import-snapshot`
- Policy: no direct commits after tagging; any fixes must land in downstream migration branches.

## Responsibility Matrix

| Branch | Primary Scope | Done Criteria | Handoff Risks |
|---|---|---|---|
| `replit-import` | Raw imported baseline with no migration behavior changes. | Import is reproducible, builds as-is, and snapshot tag exists. | Any post-import edits make diffs noisy and compromise traceability. |
| `migration/faust-foundation` | Foundation architecture, migration docs, environment contracts, and branch governance. | Faust migration docs are centralized; branch matrix and prerequisites are agreed. | Gaps here propagate ambiguity to all downstream implementation work. |
| `migration/ui-port` | Port React UI and design system to Faust/Next.js structure with parity. | Core pages/components render in Next.js with matching styling and navigation behavior. | Styling/token drift can create expensive rework before commerce wiring. |
| `migration/commerce-integration` | Replace mock data/cart with WPGraphQL + WooGraphQL integration and checkout path. | Product, PDP, cart, and checkout flows run against WooCommerce-backed data. | API schema mismatch and cart-session edge cases can block release hardening. |
| `staging/atlas-ready` | Final hardening branch for Atlas deploy readiness and acceptance validation. | Deployment config, environment variables, and smoke checks pass for staging. | Late discovery of infra/config issues can delay go-live if not surfaced early. |

## Handoff Rules

- Open PRs from each branch into its immediate downstream branch.
- Require explicit checklist sign-off before creating the next branch PR.
- Rebase/cherry-pick from upstream only; avoid reverse merges that break chain clarity.
