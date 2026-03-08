/**
 * PRODUCT TYPE ABSTRACTION
 * ========================
 * Unified product types for portability between mock data and WooCommerce GraphQL.
 *
 * CURRENT: Uses local Product type with mock data from data/products.ts
 * TARGET:  WooGraphQL product queries via Apollo Client
 *
 * The `Product` interface below is what ALL UI components consume.
 * The `WooProduct` interface matches the WPGraphQL for WooCommerce response shape.
 * The `adaptWooProduct()` function converts WooGraphQL → our Product type.
 *
 * MIGRATION: When connecting to WooCommerce, call adaptWooProduct() on each
 * GraphQL result before passing to components. No component changes needed.
 */

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  regularPrice?: number;
  onSale?: boolean;
  sizes: string[];
  description: string;
  shortDescription?: string;
  image: string;
  galleryImages?: string[];
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
  categories?: string[];
}

export interface WooProduct {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  price: string | null;
  regularPrice: string | null;
  onSale: boolean;
  description: string | null;
  shortDescription: string | null;
  stockStatus: string | null;
  image: {
    sourceUrl: string;
    altText: string | null;
  } | null;
  galleryImages?: {
    nodes: Array<{
      sourceUrl: string;
      altText: string | null;
    }>;
  };
  productCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  attributes?: {
    nodes: Array<{
      name: string;
      options: string[];
    }>;
  };
}

export function adaptWooProduct(woo: WooProduct): Product {
  const priceStr = woo.price || woo.regularPrice || "0";
  const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;

  const regularPriceStr = woo.regularPrice || priceStr;
  const numericRegularPrice = parseFloat(regularPriceStr.replace(/[^0-9.]/g, "")) || numericPrice;

  const sizeAttr = woo.attributes?.nodes?.find(
    (attr) => attr.name.toLowerCase() === "size" || attr.name.toLowerCase() === "pa_size"
  );
  const sizes = sizeAttr?.options || ["XS", "S", "M", "L", "XL"];

  const categories = woo.productCategories?.nodes?.map((c) => c.name) || [];

  const galleryImages = woo.galleryImages?.nodes?.map((img) => img.sourceUrl) || [];

  return {
    id: woo.databaseId,
    slug: woo.slug,
    name: woo.name,
    price: numericPrice,
    regularPrice: numericRegularPrice,
    onSale: woo.onSale,
    sizes,
    description: woo.description || "",
    shortDescription: woo.shortDescription || undefined,
    image: woo.image?.sourceUrl || "",
    galleryImages,
    stockStatus: (woo.stockStatus as Product["stockStatus"]) || "IN_STOCK",
    categories,
  };
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}
