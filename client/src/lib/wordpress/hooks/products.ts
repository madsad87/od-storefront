import { useMemo } from "react";
import { useWordpressQuery } from "../client";
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS,
} from "../queries";
import {
  adaptProductFromQuery,
  adaptProductsFromQuery,
  adaptRelatedProductsFromQuery,
  type ProductDetailQueryData,
  type ProductsQueryData,
} from "../adapters/product";

export function useWordpressProducts() {
  const query = useWordpressQuery<ProductsQueryData>(["products"], GET_PRODUCTS);
  const products = useMemo(() => adaptProductsFromQuery(query.data), [query.data]);

  return { ...query, products };
}

export function useWordpressProduct(identifier?: string) {
  const isNumeric = Boolean(identifier && !Number.isNaN(Number(identifier)));
  const query = useWordpressQuery<ProductDetailQueryData>(
    ["product", identifier ?? ""],
    isNumeric ? GET_PRODUCT_BY_ID : GET_PRODUCT_BY_SLUG,
    isNumeric ? { id: identifier } : { slug: identifier },
    Boolean(identifier),
  );

  const product = useMemo(() => adaptProductFromQuery(query.data), [query.data]);
  const relatedProducts = useMemo(() => adaptRelatedProductsFromQuery(query.data), [query.data]);

  return { ...query, product, relatedProducts };
}
