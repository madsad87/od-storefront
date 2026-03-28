# OD Storefront (Rebuild)

Fresh rebuild of the women’s fashion storefront.

## Legacy code archive
The previous codebase is preserved on the `archive/legacy-code` branch.

## Local development

1. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## Included starter routes

- `/`
- `/shop`
- `/product/[slug]`
- `/cart`
- `/checkout`
- `/preview` and `/preview/exit` for Phase 1 preview (Posts/Pages only)

## GraphQL setup

- Queries/fragments are in `src/lib/graphql`.
- Generate typed GraphQL artifacts:
  ```bash
  npm run codegen
  ```
