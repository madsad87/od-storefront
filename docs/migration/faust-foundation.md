# Faust Foundation Migration Notes

## Scope
This cutover establishes a Next.js Pages Router + Faust baseline aligned with `wpengine/faust-scaffold` patterns while preserving the existing storefront UI and feature modules.

## What Changed

1. **Runtime/scripts**
   - Replaced Vite/Express runtime scripts with Next.js lifecycle scripts:
     - `dev`: `next dev`
     - `build`: `next build`
     - `start`: `next start`
   - Added Faust/Next dependencies in `package.json` and switched application identity to storefront-first naming.

2. **App foundation**
   - Added `pages/_app.tsx` with app-wide providers (`FaustProvider`, React Query, tooltip/cart/toaster providers).
   - Added `src/components/templates/MainLayout.tsx` for persistent navbar/footer shell.

3. **Routing migration (SPA → Next pages)**
   - Replaced `client/src/App.tsx` + `client/src/main.tsx` routing shell with Next page files in `/pages`.
   - Added explicit pages for:
     - `/`, `/shop`, `/product/[id]`, `/cart`, `/checkout`, `/about`, `/contact`, and custom `404`.
   - Added Faust catch-all route `pages/[[...wordpressNode]].tsx` for template-driven WordPress content.

4. **Template hierarchy**
   - Added `src/wp-templates/index.ts` to register template components for Faust resolution.
   - Retained existing screen components in `src/pages/*` and exposed them as templates.

5. **Global styles move**
   - Ported global stylesheet from `client/src/index.css` to `src/styles/globals.css`.
   - Wired styles through `pages/_app.tsx`.

6. **Configuration updates**
   - Added `next.config.js`, `faust.config.js`, `next-env.d.ts`.
   - Updated `tsconfig.json` and `tailwind.config.ts` to target `src/` + `pages/` conventions.

7. **Legacy decommissioning**
   - Marked Vite/Express entrypoints as deprecated stubs (`vite.config.ts`, `server/*`, `script/build.ts`) so accidental invocation fails fast with migration guidance.

## Follow-up Tasks

- Remove fully deprecated `client/` tree once all imports and assets are verified in production.
- Wire real WordPress template mappings and GraphQL fragments for dynamic content models.
- Add integration tests for Next routes and Faust WordPress catch-all behavior.
- Resolve restricted package registry access for `@faustwp/core` in CI/runtime environments.
