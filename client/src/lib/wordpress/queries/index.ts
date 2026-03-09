export type GraphQLDocument = string & { readonly __graphqlDocument: unique symbol };

export function gql(strings: TemplateStringsArray, ...values: Array<string | number | boolean>): GraphQLDocument {
  const source = strings.reduce((acc, str, index) => acc + str + (values[index] ?? ""), "");
  return source as GraphQLDocument;
}

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

export const GET_PRODUCT_BY_ID = gql`
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
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

export const GET_PRODUCT_CATEGORIES = gql`
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

export const GET_CART = gql`
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

export const SITE_DATA_QUERY = gql`
  query GetSiteData {
    generalSettings {
      title
      description
      url
    }
  }
`;

export const GET_MENU = gql`
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
