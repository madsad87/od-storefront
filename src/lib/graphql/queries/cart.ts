import { gql } from '@apollo/client';

export const CART_QUERY = gql`
  query Cart {
    cart {
      total
      subtotal
      contents {
        nodes {
          key
          quantity
          total
          product {
            node {
              ... on SimpleProduct {
                databaseId
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
