import Link from 'next/link';

export const revalidate = 300;

export default function HomePage() {
  return (
    <main>
      <h1>Women&apos;s Fashion, Rebuilt</h1>
      <p>Fast headless storefront with WordPress + WooCommerce backend.</p>
      <p>
        <Link href="/shop">Browse the shop →</Link>
      </p>
    </main>
  );
}
