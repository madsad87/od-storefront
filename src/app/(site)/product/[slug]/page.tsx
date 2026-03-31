import type { Metadata } from 'next';
import { createApolloClient } from '@/lib/apollo/client';
import { PRODUCT_BY_SLUG_QUERY } from '@/lib/graphql/queries/product';
import { SHOP_PRODUCTS_QUERY } from '@/lib/graphql/queries/shop';
import { ProductCard } from '@/components/ui/product-card';
import { PurchasePanel } from '@/components/product/purchase-panel';
import { Section } from '@/components/ui/section';

export const revalidate = 120;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Fit: ${slug}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const client = createApolloClient();

  const [{ data: productData }, { data: recommendationsData }] = await Promise.all([
    client.query({
      query: PRODUCT_BY_SLUG_QUERY,
      variables: { slug },
    }),
    client.query({ query: SHOP_PRODUCTS_QUERY, variables: { first: 4 } }),
  ]);

  const product = productData?.product;
  const recommendations = (recommendationsData?.products?.nodes ?? []).filter(
    (item: any) => item?.slug && item.slug !== slug,
  );

  const productName = product?.name ?? 'Product';
  const productImage = product?.image;
  const productPrice = product?.price ?? product?.regularPrice ?? 'Price unavailable';
  const productDescription = product?.description ?? '';

  if (!product) {
    return (
      <main className="page-shell">
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="pdp-grid">
        <div className="pdp-media">
          {productImage?.sourceUrl ? (
            <img src={productImage.sourceUrl} alt={productImage.altText ?? productName} />
          ) : (
            <div className="product-media-placeholder">Image incoming</div>
          )}
        </div>

        <div>
          <h1>{productName}</h1>
          <PurchasePanel price={productPrice} shortDescription={product.shortDescription} />
          <div className="editorial-note">
            <h2>Styling guidance</h2>
            <p>
              Wear with clean hardware, sharp tailoring, and one statement piece. Built for dinner plans that turn
              into a longer night.
            </p>
          </div>
        </div>
      </section>

      <section className="pdp-description" dangerouslySetInnerHTML={{ __html: productDescription }} />

      <Section eyebrow="Complete the look" title="Pair it with these finishes">
        <div className="product-grid product-grid-compact">
          {recommendations.map((item: any) => (
            <ProductCard
              key={item.databaseId}
              slug={item.slug}
              name={item.name}
              price={item.price}
              image={item.image}
              wearItTo="After dark"
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
