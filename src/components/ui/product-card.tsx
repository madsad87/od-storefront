import Link from 'next/link';

type ProductCardProps = {
  slug: string;
  name: string;
  price?: string | null;
  image?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
  wearItTo?: string;
};

export function ProductCard({ slug, name, price, image, wearItTo }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/product/${slug}`} className="product-card-media">
        {image?.sourceUrl ? (
          <img src={image.sourceUrl} alt={image.altText ?? name} loading="lazy" />
        ) : (
          <div className="product-media-placeholder">Image incoming</div>
        )}
        {wearItTo ? <span className="wear-tag">Wear it to: {wearItTo}</span> : null}
      </Link>
      <div className="product-card-content">
        <h3>
          <Link href={`/product/${slug}`}>{name}</Link>
        </h3>
        <p>{price ?? 'Price pending'}</p>
      </div>
    </article>
  );
}
