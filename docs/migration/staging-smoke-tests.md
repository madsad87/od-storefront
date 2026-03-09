# Staging Smoke Tests (Shop → Checkout)

Run these checks against staging after deploying WordPress + storefront integration.

## Preconditions
- Staging storefront is deployed with `.env` values from `.env.example`.
- WordPress staging has WooCommerce + WPGraphQL + WooGraphQL + FaustWP enabled.
- At least one published product exists with image, price, and stock.

## 1) Shop flow
**Steps**
1. Open `/shop`.
2. Wait for product grid render.
3. Open browser network tab and confirm GraphQL call returns `200`.

**Expected outcomes**
- Product cards display title, image, and price from Woo data.
- No fatal GraphQL or endpoint-missing error appears.

## 2) PDP flow
**Steps**
1. Click a product from `/shop`.
2. Confirm URL resolves to PDP route (slug-driven page).
3. Refresh page directly on PDP URL.

**Expected outcomes**
- Product title/price/description load correctly.
- Direct page refresh still resolves product data (no blank state).

## 3) Add/remove cart flow
**Steps**
1. Add a product from PDP or shop card.
2. Open `/cart` and verify line item appears.
3. Increase/decrease quantity.
4. Remove item.

**Expected outcomes**
- Cart total/subtotal updates after each mutation.
- Browser storage includes `woocommerce-session` key.
- Cart remains consistent across page refresh with same session token.

## 4) Checkout redirect flow
**Steps**
1. Keep one item in cart.
2. Trigger checkout from `/cart` or `/checkout` form submission.
3. Observe redirect destination.

**Expected outcomes**
- Browser navigates to `${NEXT_PUBLIC_WORDPRESS_URL}/checkout`.
- If session token exists, redirect includes `session` query parameter.
- WooCommerce checkout page loads and shows cart/order summary.

## Exit Criteria
- All four flows pass without manual DB changes or admin intervention.
- Any failure is logged with URL, payload snapshot, and response status/body excerpt.
