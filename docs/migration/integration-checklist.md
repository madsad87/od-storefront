# Integration Checklist (Faust + WooGraphQL)

Use this checklist when wiring WordPress/WooCommerce into the storefront.

## 1) Product listing query (Shop flow)
- [ ] Configure `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` (and `VITE_WORDPRESS_GRAPHQL_URL` fallback).
- [ ] Execute products query via `client/src/graphql/queries.ts` (`GET_PRODUCTS`).
- [ ] Adapt WooGraphQL product nodes using product adapter layer before rendering.
- [ ] Verify shop grid renders real WooCommerce products (not mock fallback).

## 2) Product detail page query (PDP flow)
- [ ] Resolve route slug and call `GET_PRODUCT_BY_SLUG`.
- [ ] Verify name, gallery image, price, and description fields are returned for slug.
- [ ] Validate behavior for missing slug/product (404 or empty-state path).

## 3) Cart read/write flow
- [ ] Query cart state (`GET_CART`) on cart page load.
- [ ] Add item (`ADD_TO_CART`) from product card/PDP.
- [ ] Update quantity (`UPDATE_CART_ITEM_QUANTITY`) and remove (`REMOVE_CART_ITEM`) from cart page.
- [ ] Capture `woocommerce-session` response header after mutation.
- [ ] Persist/reuse session token via storage key `woocommerce-session`.

## 4) Checkout redirect flow
- [ ] Ensure `NEXT_PUBLIC_WORDPRESS_URL` is configured.
- [ ] Build WooCommerce checkout URL (`${WORDPRESS_URL}/checkout`).
- [ ] Append session query param when token exists (`?session=<token>`).
- [ ] Verify redirect lands on native WooCommerce checkout.
