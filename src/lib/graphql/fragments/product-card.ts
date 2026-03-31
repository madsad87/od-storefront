import { gql } from '@apollo/client';

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on ProductUnion {
    __typename
    ... on SimpleProduct {
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      price
    }
    ... on VariableProduct {
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      price
    }
  }
`;
