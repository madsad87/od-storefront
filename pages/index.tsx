import type { GetStaticProps } from "next";
import Home from "@/pages/Home";
import type { Product } from "@/lib/product-types";
import { executeWordpressQuery } from "@/lib/wordpress/client";
import { adaptProductsFromQuery, type ProductsQueryData } from "@/lib/wordpress/adapters/product";
import { GET_PRODUCTS } from "@/lib/wordpress/queries";

interface HomePageProps {
  featuredProducts?: Product[];
}

/**
 * Pre-rendering strategy: SSG + ISR.
 * Fetch path: WPGraphQL products query at build time, then revalidate.
 */
export default function HomePage(props: HomePageProps) {
  return <Home {...props} />;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const data = await executeWordpressQuery<ProductsQueryData>(GET_PRODUCTS, { first: 3 });

  return {
    props: {
      featuredProducts: adaptProductsFromQuery(data ?? undefined),
    },
    revalidate: 60,
  };
};
