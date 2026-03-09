import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_SLUG, GET_PRODUCTS } from "@/lib/wordpress/queries";
import {
  adaptProductFromQuery,
  adaptProductsFromQuery,
  adaptRelatedProductsFromQuery,
  type ProductDetailQueryData,
  type ProductsQueryData,
} from "@/lib/wordpress/adapters/product";
import { hasWordpressEndpoint } from "@/lib/wordpress/client";

export function useWordpressProducts() {
  const query = useQuery<ProductsQueryData>(GET_PRODUCTS, {
    variables: { first: 20 },
    skip: !hasWordpressEndpoint,
  });

  const products = useMemo(() => adaptProductsFromQuery(query.data), [query.data]);
  return { ...query, products };
}

export function useWordpressProduct(slug?: string) {
  const query = useQuery<ProductDetailQueryData>(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
    skip: !hasWordpressEndpoint || !slug,
  });

  const product = useMemo(() => adaptProductFromQuery(query.data), [query.data]);
  const relatedProducts = useMemo(() => adaptRelatedProductsFromQuery(query.data), [query.data]);

  return { ...query, product, relatedProducts };
}
