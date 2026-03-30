import { createApolloClient } from '@/lib/apollo/client';
import { CART_QUERY } from '@/lib/graphql/queries/cart';
import { ButtonLink } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const client = createApolloClient();
  const { data } = await client.query({ query: CART_QUERY, fetchPolicy: 'no-cache' });

  const cart = data?.cart;
  const lines = cart?.contents?.nodes ?? [];

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Bag</p>
          <h1>Your night-out lineup</h1>
        </div>

        {lines.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-layout">
            <ul className="cart-lines">
              {lines.map((line: any) => (
                <li key={line.key}>
                  <div>
                    <p>{line.product?.node?.name}</p>
                    <small>Quantity {line.quantity}</small>
                  </div>
                  <strong>{line.total}</strong>
                </li>
              ))}
            </ul>

            <aside className="cart-summary">
              <p>Subtotal: {cart?.subtotal ?? '$0.00'}</p>
              <p>Total: {cart?.total ?? '$0.00'}</p>
              <p className="urgency">Most drops run limited sizes after midnight.</p>
              <ButtonLink href="/checkout" variant="primary" className="cta-full">
                Continue to checkout
              </ButtonLink>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
