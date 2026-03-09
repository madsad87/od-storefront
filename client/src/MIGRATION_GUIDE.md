# Outlaw Dolls — Faust.js / Next.js Migration Guide

> Foundation migration audit content has moved to `docs/migration/faust-foundation.md`.
> Keep this file focused on implementation-level porting steps.

## Overview

This codebase has been pre-structured for migration to Faust.js (Next.js) + WooCommerce.
All UI components are portable — the visual design, animations, and brand theme work
identically in Next.js. The abstraction layers below mark clear swap points.

---

## Architecture Map

### Current (Replit — Vite + React SPA)

```
client/src/
├── lib/
│   ├── navigation.tsx      ← Routing abstraction (wouter → next/link)
│   └── product-types.ts    ← Unified Product type + WooProduct adapter
├── graphql/
│   ├── queries.ts          ← WPGraphQL + WooGraphQL queries (ready to use)
│   └── mutations.ts        ← Cart + checkout mutations (ready to use)
├── context/
│   └── CartContext.tsx      ← Cart state (swap points marked for GraphQL)
├── components/             ← Portable UI components (no framework deps)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── Marquee.tsx
├── pages/                  ← Page components (accept data via props)
│   ├── Home.tsx            → wp-templates/front-page.tsx
│   ├── Shop.tsx            → pages/shop.tsx (getStaticProps)
│   ├── ProductDetail.tsx   → pages/product/[slug].tsx (getStaticProps)
│   ├── Cart.tsx            → pages/cart.tsx
│   ├── Checkout.tsx        → pages/checkout.tsx (or redirect to WooCommerce)
│   ├── About.tsx           → wp-templates/page-about.tsx
│   └── Contact.tsx         → wp-templates/page-contact.tsx
└── data/
    └── products.ts         ← Mock data (remove after WooCommerce connected)
```

### Target (Faust.js — Next.js + Apollo + WooCommerce)

```
src/
├── components/             ← Copy from current components/ (no changes needed)
├── wp-templates/           ← WordPress template hierarchy mapping
│   ├── front-page.tsx      ← Home page (uses GET_PRODUCTS for featured)
│   ├── page-about.tsx
│   └── page-contact.tsx
├── pages/
│   ├── _app.tsx            ← FaustProvider + CartProvider + global layout
│   ├── shop.tsx            ← getStaticProps → GET_PRODUCTS query
│   ├── product/[slug].tsx  ← getStaticProps → GET_PRODUCT_BY_SLUG query
│   ├── cart.tsx
│   └── checkout.tsx
├── graphql/                ← Copy directly from current graphql/
├── lib/
│   └── product-types.ts    ← Copy directly, use adaptWooProduct()
├── context/
│   └── CartContext.tsx      ← Swap internals to use GraphQL mutations
└── styles/
    └── globals.css          ← Copy from current index.css
```

---

## Step-by-Step Migration

### 1. Scaffold Faust.js Project

```bash
npx create-next-app -e https://github.com/wpengine/faustjs/tree/main/examples/next/faustwp-getting-started
npm install @faustwp/core @apollo/client
```

### 2. Port Theme & Styles

- Copy `tailwind.config.ts` → adjust for Next.js paths (`./src/**/*.tsx`)
- Copy `index.css` → `styles/globals.css`
- Fonts: Add Playfair Display, Cormorant Garamond, DM Sans via `next/font` or `<Head>`

### 3. Port Components (zero changes needed)

Copy these files directly:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/ProductCard.tsx`
- `components/Marquee.tsx`

Update `lib/navigation.tsx` to use Next.js:
```tsx
import NextLink from "next/link";
import { useRouter } from "next/router";

export function AppLink({ href, children, className, ...props }) {
  return <NextLink href={href} className={className} {...props}>{children}</NextLink>;
}

export function useAppRouter() {
  const router = useRouter();
  return { pathname: router.pathname, push: router.push };
}
```

### 4. Connect WooCommerce Data

Replace mock data imports with Apollo queries:

```tsx
// pages/shop.tsx
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { adaptWooProduct } from "../lib/product-types";
import Shop from "../components/Shop"; // or inline

export default function ShopPage() {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const products = data?.products?.nodes?.map(adaptWooProduct) || [];
  return <Shop products={products} />;
}
```

### 5. Swap Cart to WooCommerce Sessions

In `CartContext.tsx`, replace each `useState` / `useCallback` with GraphQL mutations:

```tsx
import { useMutation, useQuery } from "@apollo/client";
import { GET_CART } from "../graphql/queries";
import { ADD_TO_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY, EMPTY_CART } from "../graphql/mutations";

// Inside CartProvider:
const { data: cartData } = useQuery(GET_CART);
const [addToCartMutation] = useMutation(ADD_TO_CART);

const addItem = async (product, size) => {
  await addToCartMutation({
    variables: { productId: product.id, quantity: 1 },
    refetchQueries: [{ query: GET_CART }],
  });
};
```

### 6. Checkout Strategy

**Recommended for dropshipping:** Hybrid checkout — redirect to WooCommerce native checkout.
This gives you all payment gateways (Stripe, PayPal, etc.) without rebuilding them.

**Operational expectation:** payment gateway configuration and runtime (authorization, capture, 3DS/SCA flows, fraud tooling, retries, wallet support) continue to live in WooCommerce plugins. The storefront should only initiate checkout and pass session context.

```tsx
const handleCheckout = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout`;
};
```

### 7. WordPress Plugins Required

- WPGraphQL (wpgraphql.com)
- WPGraphQL for WooCommerce (github.com/wp-graphql/wp-graphql-woocommerce)
- Faust.js WordPress plugin

### 8. Environment Variables

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-site.wpengine.com
FAUST_SECRET_KEY=your-faust-secret
```

---

## Brand Design Tokens (preserve these exactly)

| Token | Value | Usage |
|-------|-------|-------|
| Gold | `#C9A84C` | Primary accent, CTAs, highlights |
| Brand Black | `#000000` | Page backgrounds |
| Brand Dark | `#0A0A0A` | Card/section backgrounds |
| Brand Offwhite | `#F5F0E8` | Body text, headings |
| Heading Font | Playfair Display | All headings (serif) |
| Subheading Font | Cormorant Garamond | Secondary serif |
| Body Font | DM Sans | Body copy, labels, buttons |
| Letter Spacing Brand | `0.25em` | Logo, brand name |
| Letter Spacing Ultra Wide | `0.35em` | Section labels |

---

## Files Safe to Delete After Migration

- `client/src/data/products.ts` (replaced by WooCommerce queries)
- `client/src/App.tsx` (replaced by Next.js _app.tsx)
- `server/` directory (replaced by Next.js API routes if needed)
- `vite.config.ts` (not used in Next.js)
