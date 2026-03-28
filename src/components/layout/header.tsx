import Link from 'next/link';

export function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e5e2dc', background: '#fff' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <strong>OD Storefront</strong>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
