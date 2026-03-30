'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop#drops', label: 'Drops' },
  { href: '/shop#fits', label: 'Fits' },
  { href: '/cart', label: 'Cart' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand-mark">
          OD / AFTER HOURS
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href as Route}>
              {link.label}
            </Link>
          ))}
          <Link href="/checkout" className="pill-link">
            Checkout
          </Link>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>
          Menu
        </button>
      </div>

      <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href as Route} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
