/**
 * WPGRAPHQL + WOOGRAPHQL QUERIES
 * ================================
 * Ready-to-use GraphQL queries for WooCommerce headless integration.
 *
 * PREREQUISITES ON WORDPRESS:
 * 1. WPGraphQL plugin (wpgraphql.com)
 * 2. WPGraphQL for WooCommerce / WooGraphQL (github.com/wp-graphql/wp-graphql-woocommerce)
 * 3. Faust.js WordPress plugin (for previews + auth)
 *
 * USAGE WITH APOLLO CLIENT:
 *   import { gql, useQuery } from "@apollo/client";
 *   import { GET_PRODUCTS } from "../graphql/queries";
 *   const { data, loading } = useQuery(gql(GET_PRODUCTS));
 *
 * NOTE: These queries are exported as template strings. Wrap with gql() from
 * @apollo/client before passing to useQuery/useMutation, or convert exports
 * to use gql`` tagged templates after installing @apollo/client.
 *
 * USAGE WITH FAUST.JS getStaticProps:
 *   export async function getStaticProps(context) {
 *     return getNextStaticProps(context, { Page: ShopPage });
 *   }
 *   ShopPage.queries = [{ query: GET_PRODUCTS }];
 */

export const GET_PRODUCTS = `
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
        type
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
        ... on SimpleProduct {
          price
          regularPrice
        }
        ... on VariableProduct {
          price
          regularPrice
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

export const GET_PRODUCT_BY_SLUG = `
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
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
        attributes {
          nodes {
            name
            options
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            price
            regularPrice
            stockStatus
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = `
  query GetProductById($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
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
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
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

export const GET_PRODUCTS_BY_CATEGORY = `
  query GetProductsByCategory($slug: String!, $first: Int = 20) {
    products(first: $first, where: { category: $slug, status: "publish" }) {
      nodes {
        id
        databaseId
        name
        slug
        onSale
        price
        regularPrice
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = `
  query GetProductCategories {
    productCategories(first: 50, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_CART = `
  query GetCart {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              slug
              price
              image {
                sourceUrl
                altText
              }
            }
          }
          variation {
            node {
              id
              databaseId
              name
              attributes {
                nodes {
                  name
                  value
                }
              }
            }
          }
          quantity
          total
          subtotal
        }
      }
      subtotal
      total
      shippingTotal
      totalTax
      isEmpty
      chosenShippingMethods
      availableShippingMethods {
        rates {
          id
          label
          cost
        }
      }
    }
  }
`;

export const SITE_DATA_QUERY = `
  query GetSiteData {
    generalSettings {
      title
      description
      url
    }
  }
`;

export const GET_MENU = `
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        url
        path
        parentId
      }
    }
  }
`;
