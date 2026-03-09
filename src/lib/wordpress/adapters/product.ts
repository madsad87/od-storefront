import { adaptWooProduct, type Product, type WooProduct } from "@/lib/product-types";

export interface ProductsQueryData {
  products?: {
    nodes?: WooProduct[];
  };
}

export interface ProductDetailQueryData {
  product?: WooProduct & {
    related?: {
      nodes?: WooProduct[];
    };
  };
}

export function adaptProductsFromQuery(data?: ProductsQueryData): Product[] {
  return data?.products?.nodes?.map(adaptWooProduct) ?? [];
}

export function adaptProductFromQuery(data?: ProductDetailQueryData): Product | undefined {
  if (!data?.product) return undefined;
  return adaptWooProduct(data.product);
}

export function adaptRelatedProductsFromQuery(data?: ProductDetailQueryData): Product[] {
  return data?.product?.related?.nodes?.map(adaptWooProduct) ?? [];
}
