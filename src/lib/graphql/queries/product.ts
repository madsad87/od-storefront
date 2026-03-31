import { gql } from '@apollo/client';

export const PRODUCT_BY_SLUG_QUERY = gql`
  query ProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      __typename
      ... on SimpleProduct {
        databaseId
        name
        slug
        description
        shortDescription
        price
        regularPrice
        image {
          sourceUrl
          altText
        }
      }
      ... on VariableProduct {
        databaseId
        name
        slug
        description
        shortDescription
        price
        regularPrice
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;
