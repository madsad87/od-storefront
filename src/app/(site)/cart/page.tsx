import { createApolloClient } from '@/lib/apollo/client';
import { CART_QUERY } from '@/lib/graphql/queries/cart';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const client = createApolloClient();
  const { data } = await client.query({ query: CART_QUERY, fetchPolicy: 'no-cache' });

  const cart = data?.cart;
  const lines = cart?.contents?.nodes ?? [];

  return (
    <main>
      <h1>Cart</h1>
      {lines.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {lines.map((line: any) => (
            <li key={line.key}>
              {line.product?.node?.name} × {line.quantity} — {line.total}
            </li>
          ))}
        </ul>
      )}
      <p>Subtotal: {cart?.subtotal ?? '$0.00'}</p>
      <p>Total: {cart?.total ?? '$0.00'}</p>
    </main>
  );
}
