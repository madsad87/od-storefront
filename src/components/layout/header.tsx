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
        </nav>
      </div>
    </header>
  );
}
