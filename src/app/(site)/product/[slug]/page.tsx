import type { Metadata } from 'next';
import { createApolloClient } from '@/lib/apollo/client';
import { PRODUCT_BY_SLUG_QUERY } from '@/lib/graphql/queries/product';

export const revalidate = 120;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Product: ${slug}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const client = createApolloClient();

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  const product = data?.product;

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price ?? product.regularPrice ?? 'Price unavailable'}</p>
      <article dangerouslySetInnerHTML={{ __html: product.description ?? '' }} />
    </main>
  );
}
