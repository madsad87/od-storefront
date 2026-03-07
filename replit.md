# Outlaw Dolls - E-Commerce Website

## Overview
Dark, edgy e-commerce website for a women's fashion brand called **Outlaw Dolls**. The brand aesthetic is dark, editorial, nighttime energy with powerful femininity.

## Tech Stack
- **Frontend:** React + TypeScript, Tailwind CSS, Wouter (routing), Framer Motion (animations)
- **Backend:** Express.js (minimal - serves frontend)
- **State Management:** React Context API (CartContext) for cart state
- **Data:** Mock product data in `client/src/data/products.ts`

## Brand Design System
- **Colors:** Black (#000000) background, #111111 cards, #F5F5F0 off-white text, #C9A84C gold accent
- **Typography:** Playfair Display / Cormorant Garamond for headings, DM Sans for body
- **Theme:** Dark-mode only (no light mode toggle)

## Project Structure
```
client/src/
├── components/     → Navbar, Footer, ProductCard, Marquee
├── context/        → CartContext (add, remove, update, clear cart)
├── data/           → products.ts (6 mock products)
├── pages/          → Home, Shop, ProductDetail, Cart, Checkout, About, Contact
├── components/ui/  → Shadcn UI components
├── hooks/          → use-toast, use-mobile
├── lib/            → queryClient, utils
└── App.tsx         → Main app with routing
```

## Pages
- `/` - Homepage with hero, marquee, featured products, brand story
- `/shop` - Product grid (2 cols mobile, 4 cols desktop)
- `/product/:id` - Product detail with size selector, quantity, related products
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

## Configuration
- Tailwind config: `tailwind.config.ts` (custom brand colors, fonts, animations)
- CSS variables: `client/src/index.css` (dark theme tokens)
- Fonts loaded via Google Fonts in `client/index.html`
