import { gql } from '@apollo/client';

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on SimpleProduct {
    databaseId
    slug
    name
    image {
      sourceUrl
      altText
    }
    price
  }
`;
