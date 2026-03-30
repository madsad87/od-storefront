import { createApolloClient } from '@/lib/apollo/client';
import { SHOP_PRODUCTS_QUERY } from '@/lib/graphql/queries/shop';

export const dynamic = 'force-dynamic';

import { ProductCard } from '@/components/ui/product-card';
import { Section } from '@/components/ui/section';

export const dynamic = 'force-dynamic';

const CONTEXTS = ['Dinner', 'Drinks', 'After dark'];

export default async function ShopPage() {
  const client = createApolloClient();

  const { data, error } = await client.query({
    query: SHOP_PRODUCTS_QUERY,
    variables: { first: 12 },
    fetchPolicy: 'no-cache',
  });

  if (error) {
    return (
      <main className="page-shell">
        <h1>Shop</h1>
        <p>We couldn&apos;t load products right now. Please try again shortly.</p>
      </main>
    );
  }

  const products = data?.products?.nodes ?? [];

  return (
    <main className="page-shell">
      <Section
        eyebrow="All Fits"
        title="Curated for nights with a plan"
        description="Minimal edits, maximum intent."
      >
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-grid" id="fits">
            {products.map((product: any, index: number) => (
              <ProductCard
                key={product.databaseId}
                slug={product.slug}
                name={product.name}
                price={product.price}
                image={product.image}
                wearItTo={CONTEXTS[index % CONTEXTS.length]}
              />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
