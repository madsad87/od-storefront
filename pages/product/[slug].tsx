import type { GetStaticPaths, GetStaticProps } from "next";
import ProductDetail from "@/pages/ProductDetail";
import type { Product } from "@/lib/product-types";
import { executeWordpressQuery } from "@/lib/wordpress/client";
import {
  adaptProductFromQuery,
  adaptRelatedProductsFromQuery,
  adaptProductsFromQuery,
  type ProductDetailQueryData,
  type ProductsQueryData,
} from "@/lib/wordpress/adapters/product";
import { GET_PRODUCT_BY_SLUG, GET_PRODUCTS } from "@/lib/wordpress/queries";

interface ProductPageProps {
  product?: Product;
  relatedProducts?: Product[];
}

/**
 * Pre-rendering strategy: SSG (blocking fallback) + ISR.
 * Fetch path: product-by-slug query in getStaticProps and product slug list from products query.
 */
export default function ProductPage(props: ProductPageProps) {
  return <ProductDetail {...props} />;
}

export const getStaticProps: GetStaticProps<ProductPageProps, { slug: string }> = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true, revalidate: 60 };
  }

  const data = await executeWordpressQuery<ProductDetailQueryData>(GET_PRODUCT_BY_SLUG, { slug });
  const product = adaptProductFromQuery(data ?? undefined);

  if (!product) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      product,
      relatedProducts: adaptRelatedProductsFromQuery(data ?? undefined),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const data = await executeWordpressQuery<ProductsQueryData>(GET_PRODUCTS, { first: 50 });
  const paths = adaptProductsFromQuery(data ?? undefined).map((product) => ({ params: { slug: product.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};
