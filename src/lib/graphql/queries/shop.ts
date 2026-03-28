import { gql } from '@apollo/client';
import { PRODUCT_CARD_FRAGMENT } from '@/lib/graphql/fragments/product-card';

export const SHOP_PRODUCTS_QUERY = gql`
  query ShopProducts($first: Int = 12) {
    products(first: $first) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
