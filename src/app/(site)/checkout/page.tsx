import { createApolloClient } from '@/lib/apollo/client';
import { CHECKOUT_QUERY } from '@/lib/graphql/queries/checkout';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const client = createApolloClient();
  const { data } = await client.query({ query: CHECKOUT_QUERY, fetchPolicy: 'no-cache' });

  const cart = data?.cart;
  const gateways = data?.paymentGateways?.nodes ?? [];

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Checkout</p>
          <h1>Secure the fit</h1>
        </div>

        <div className="cart-layout">
          <aside className="cart-summary">
            <p>Order total: {cart?.total ?? '$0.00'}</p>
            <p>Shipping: {cart?.shippingTotal ?? '$0.00'}</p>
            <p>Items: {cart?.contentsTotal ?? '$0.00'}</p>
          </aside>

          <div>
            <h2>Payment methods</h2>
            {gateways.length === 0 ? (
              <p>No payment methods returned.</p>
            ) : (
              <ul className="payment-list">
                {gateways.map((gateway: any) => (
                  <li key={gateway.id}>
                    <strong>{gateway.title}</strong>
                    <p>{gateway.description?.replace(/<[^>]*>/g, '')}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
