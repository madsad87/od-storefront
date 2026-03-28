import { createApolloClient } from '@/lib/apollo/client';
import { CHECKOUT_QUERY } from '@/lib/graphql/queries/checkout';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const client = createApolloClient();
  const { data } = await client.query({ query: CHECKOUT_QUERY, fetchPolicy: 'no-cache' });

  const cart = data?.cart;
  const gateways = data?.paymentGateways?.nodes ?? [];

  return (
    <main>
      <h1>Checkout</h1>
      <p>Order total: {cart?.total ?? '$0.00'}</p>
      <h2>Payment methods</h2>
      {gateways.length === 0 ? (
        <p>No payment methods returned.</p>
      ) : (
        <ul>
          {gateways.map((gateway: any) => (
            <li key={gateway.id}>{gateway.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
