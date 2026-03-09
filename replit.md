# Outlaw Dolls - E-Commerce Website

> Migration audit deliverables are now maintained in `docs/migration/faust-foundation.md` as the canonical source.

## Overview
Dark, edgy e-commerce website for a women's fashion brand called **Outlaw Dolls**. The brand aesthetic is dark, editorial, nighttime energy with powerful femininity. Codebase is pre-structured for migration to Faust.js (Next.js) + WooCommerce via Codex AI.

## Tech Stack
- **Frontend:** React + TypeScript, Tailwind CSS, Wouter (routing via abstraction layer), Framer Motion (animations)
- **Backend:** Express.js (minimal - serves frontend)
- **State Management:** React Context API (CartContext) for cart state
- **Data:** Mock product data in `client/src/data/products.ts`

## Migration Target
- **Framework:** Faust.js (Next.js) on WP Engine Atlas
- **Data:** WPGraphQL + WooGraphQL (WooCommerce)
- **Cart:** WooCommerce sessions via GraphQL mutations
- **See:** `client/src/MIGRATION_GUIDE.md` for full migration instructions

## Brand Design System
- **Colors:** Black (#000000) background, #0A0A0A cards, #F5F0E8 off-white text, #C9A84C gold accent
- **Typography:** Playfair Display / Cormorant Garamond for headings, DM Sans for body
- **Theme:** Dark-mode only (no light mode toggle)

## Project Structure
```
client/src/
├── lib/
│   ├── navigation.tsx     → Routing abstraction (wouter → next/link swap point)
│   ├── product-types.ts   → Unified Product type + WooProduct adapter
│   ├── queryClient.ts     → TanStack Query client
│   └── utils.ts
├── graphql/
│   ├── queries.ts         → WPGraphQL + WooGraphQL queries (ready for Apollo)
│   └── mutations.ts       → Cart + checkout mutations (ready for Apollo)
├── context/
│   └── CartContext.tsx     → Cart state (swap points marked for GraphQL)
├── components/
│   ├── Navbar.tsx          → Uses AppLink from navigation wrapper
│   ├── Footer.tsx          → Uses AppLink from navigation wrapper
│   ├── ProductCard.tsx     → Accepts Product via props, uses AppLink
│   └── Marquee.tsx         → Pure presentational (no deps)
├── pages/
│   ├── Home.tsx            → Accepts featuredProducts prop (optional)
│   ├── Shop.tsx            → Accepts products prop (optional)
│   ├── ProductDetail.tsx   → Accepts product + relatedProducts props (optional)
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── data/
│   └── products.ts        → Mock data (delete after WooCommerce connected)
├── components/ui/         → Shadcn UI components
├── hooks/                 → use-toast, use-mobile
├── MIGRATION_GUIDE.md     → Full Faust.js migration instructions
└── App.tsx                → Main app with routing
```

## Pages
- `/` - Homepage with hero, marquee, featured products, brand story
- `/shop` - Product grid (2 cols mobile, 4 cols desktop)
- `/product/:id` - Product detail with size selector, quantity, related products (also supports slug-based routing)
- `/cart` - Cart with line items, quantity controls, order summary
- `/checkout` - Single-page checkout form with order confirmation
- `/about` - Brand story with editorial layout
- `/contact` - Contact form + social links

## Key Features
- Client-side cart with Context API
- Responsive design (mobile-first)
- Smooth page transitions (Framer Motion)
- Scroll-reveal animations
- Infinite scrolling marquee
- Sticky navbar with transparent-to-dark transition
- Newsletter signup in footer

## Migration Abstraction Layers
1. **Navigation:** All components use `AppLink` and `useAppRouter` from `lib/navigation.tsx` — swap wouter for next/link in one file
2. **Product Types:** `lib/product-types.ts` has `Product` (UI type) + `WooProduct` (GraphQL type) + `adaptWooProduct()` converter
3. **GraphQL Ready:** `graphql/queries.ts` and `graphql/mutations.ts` contain all WooGraphQL operations
4. **Cart Swap Points:** `CartContext.tsx` has marked swap points where local state → GraphQL mutations
5. **Props-Driven Pages:** Home, Shop, ProductDetail accept data via optional props (default to mock data)

## Configuration
- Tailwind config: `tailwind.config.ts` (custom brand colors, fonts, animations)
- CSS variables: `client/src/index.css` (dark theme tokens)
- Fonts loaded via Google Fonts in `client/index.html`
