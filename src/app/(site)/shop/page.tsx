import { createApolloClient } from '@/lib/apollo/client';
import { SHOP_PRODUCTS_QUERY } from '@/lib/graphql/queries/shop';

export const revalidate = 120;

export default async function ShopPage() {
  const client = createApolloClient();

  const { data, error } = await client.query({
    query: SHOP_PRODUCTS_QUERY,
    variables: { first: 12 },
  });

  if (error) {
    return (
      <main>
        <h1>Shop</h1>
        <p>We couldn&apos;t load products right now. Please try again shortly.</p>
      </main>
    );
  }

  const products = data?.products?.nodes ?? [];

  return (
    <main>
      <h1>Shop</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product: any) => (
            <li key={product.databaseId}>
              <a href={`/product/${product.slug}`}>{product.name}</a> — {product.price ?? 'Price pending'}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
