import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 20, $after: String) {
    products(first: $first, after: $after, where: { status: "publish" }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        name
        slug
        onSale
        price
        regularPrice
        shortDescription
        stockStatus
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        ... on VariableProduct {
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      onSale
      price
      regularPrice
      stockStatus
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      related(first: 3) {
        nodes {
          id
          databaseId
          name
          slug
          price
          regularPrice
          onSale
          image {
            sourceUrl
            altText
          }
        }
      }
      ... on VariableProduct {
        attributes {
          nodes {
            name
            options
          }
        }
      }
    }
  }
`;
