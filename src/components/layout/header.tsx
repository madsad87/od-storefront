import type { Route } from 'next';
import Link from 'next/link';

type NavLink = {
  href: Route;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
];

export function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e5e2dc', background: '#fff' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} aria-label="Primary navigation">
          <strong>OD Storefront</strong>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
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
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
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
