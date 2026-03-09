import type { GetStaticProps } from "next";
import Shop from "@/pages/Shop";
import type { Product } from "@/lib/product-types";
import { executeWordpressQuery } from "@/lib/wordpress/client";
import { adaptProductsFromQuery, type ProductsQueryData } from "@/lib/wordpress/adapters/product";
import { GET_PRODUCTS } from "@/lib/wordpress/queries";

interface ShopPageProps {
  products?: Product[];
}

/**
 * Pre-rendering strategy: SSG + ISR.
 * Fetch path: WPGraphQL products query at build time, then revalidate.
 */
export default function ShopPage(props: ShopPageProps) {
  return <Shop {...props} />;
}

export const getStaticProps: GetStaticProps<ShopPageProps> = async () => {
  const data = await executeWordpressQuery<ProductsQueryData>(GET_PRODUCTS, { first: 20 });

  return {
    props: {
      products: adaptProductsFromQuery(data ?? undefined),
    },
    revalidate: 60,
  };
};
