import { createApolloClient } from '@/lib/apollo/client';
import { SHOP_PRODUCTS_QUERY } from '@/lib/graphql/queries/shop';
import { ButtonLink } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { Section } from '@/components/ui/section';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

const NIGHT_SCENARIOS = [
  { title: 'Dinner', subtitle: 'Structured silhouettes for reservations that matter.' },
  { title: 'Drinks', subtitle: 'Low-light shine, clean lines, controlled attitude.' },
  { title: 'After Dark', subtitle: 'Confident textures and statement cuts for the final move.' },
];

export default async function HomePage() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: SHOP_PRODUCTS_QUERY,
    variables: { first: 8 },
  });

  const products = data?.products?.nodes ?? [];
  const featuredDrop = products.slice(0, 3);
  const shopTheFit = products.slice(3, 6);
  const highlights = products.slice(0, 4);

  return (
    <main className="page-shell">
      <section className="hero-block">
        <p className="eyebrow">DROP 03 / AFTER HOURS</p>
        <h1>Fits for when the night gets selective.</h1>
        <p>
          Editorial silhouettes, warm metals, and deliberate cuts built for dinner at 9 and drinks at 11.
        </p>
        <div className="hero-cta-row">
          <ButtonLink href="/shop" variant="primary">
            Shop the Drop
          </ButtonLink>
          <ButtonLink href="/shop#fits" variant="ghost">
            Build a Fit
          </ButtonLink>
        </div>
      </section>

      <Section
        id="drops"
        eyebrow="Featured Drop"
        title="City Heat"
        description="A tight edit of pieces styled to move from reservation lists to rooftop last calls."
      >
        <div className="product-grid product-grid-featured">
          {featuredDrop.map((product: any) => (
            <ProductCard
              key={product.databaseId}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={product.image}
              wearItTo="Late dinner"
            />
          ))}
        </div>
      </Section>

      <Section id="fits" eyebrow="Shop the Fit" title="Outfit-first sets, not random products.">
        <div className="product-grid">
          {shopTheFit.map((product: any, index: number) => (
            <ProductCard
              key={product.databaseId}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={product.image}
              wearItTo={NIGHT_SCENARIOS[index]?.title ?? 'Tonight'}
            />
          ))}
        </div>
      </Section>

      <section className="scenario-row" aria-label="Night scenarios">
        {NIGHT_SCENARIOS.map((scenario) => (
          <article key={scenario.title}>
            <h3>{scenario.title}</h3>
            <p>{scenario.subtitle}</p>
          </article>
        ))}
      </section>

      <section className="brand-note">
        <p>We design for the version of you that already knows the door will open.</p>
      </section>

      <Section eyebrow="Highlights" title="Pieces with range, edited with restraint.">
        <div className="product-grid product-grid-compact">
          {highlights.map((product: any) => (
            <ProductCard
              key={product.databaseId}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
