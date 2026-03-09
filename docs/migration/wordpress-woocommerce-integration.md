# WordPress + WooCommerce Integration Requirements

This document defines the required WordPress stack/configuration for this storefront's Faust/WooGraphQL migration.

## Required WordPress Plugins

Install and activate the following plugins in **staging and production**:

1. **WPGraphQL**
   - Purpose: exposes the `/graphql` endpoint used for catalog and content data.
2. **WPGraphQL for WooCommerce (WooGraphQL)**
   - Purpose: exposes WooCommerce product, cart, and checkout GraphQL fields/mutations.
3. **FaustWP (Faust.js WordPress plugin)**
   - Purpose: Faust previews, auth hooks, and integration with the frontend secret.
4. **WooCommerce**
   - Purpose: product catalog, cart session, order, and payment orchestration.

## Required Configuration

### 1) WPGraphQL endpoint
- Confirm GraphQL endpoint resolves at:
  - `https://<wordpress-host>/graphql`
- Confirm anonymous read access (or appropriate auth) for product list and single-product queries.

### 2) Faust shared secret
- Set the same secret value in:
  - WordPress Faust plugin settings.
  - Frontend `.env` as `FAUST_SECRET_KEY`.
- Mismatched values break preview/auth-integrated Faust flows.

### 3) Permalink structure
- In WordPress Admin → **Settings → Permalinks**, use a non-plain structure.
- Recommended: **Post name** (`/%postname%/`).
- Plain permalinks can break Faust and route resolution assumptions.

### 4) CORS + session/header assumptions
WooGraphQL cart flows in this repo assume:

- GraphQL response includes `woocommerce-session` header after cart mutations.
- Frontend stores this token as `localStorage['woocommerce-session']`.
- Subsequent requests send this token back for cart continuity.
- Browser CORS policy allows:
  - `Access-Control-Allow-Origin` for the storefront origin.
  - `Access-Control-Allow-Credentials: true` if credentials/cookies are used.
  - `Access-Control-Expose-Headers: woocommerce-session` so browser JS can read session header.

If running cross-origin (different WP host and storefront host), verify reverse proxy/WAF/CDN preserves the `woocommerce-session` header.

### 5) Auth/session keys used by the storefront
The environment template tracks these values:

- `NEXT_PUBLIC_WORDPRESS_URL`
- `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL`
- `FAUST_SECRET_KEY`
- `NEXT_PUBLIC_WOOGRAPHQL_SESSION_HEADER`
- `NEXT_PUBLIC_WOOGRAPHQL_SESSION_STORAGE_KEY`
- `NEXT_PUBLIC_WOOGRAPHQL_AUTH_TOKEN` (optional for authenticated requests)

Legacy migration compatibility keys are also retained:

- `VITE_WORDPRESS_URL`
- `VITE_WORDPRESS_GRAPHQL_URL`
