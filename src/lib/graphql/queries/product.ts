import { gql } from '@apollo/client';

export const PRODUCT_BY_SLUG_QUERY = gql`
  query ProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
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
    }
  }
`;
