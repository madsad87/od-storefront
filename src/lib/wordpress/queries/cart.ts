import { graphql } from "./index";

export const GET_CART = graphql`
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
    }
  }
`;

export const ADD_TO_CART = graphql`
  mutation AddToCart($productId: Int!, $quantity: Int = 1, $variation: [ProductAttributeInput]) {
    addToCart(
      input: { productId: $productId, quantity: $quantity, variation: $variation }
    ) {
      cart {
        contents {
          nodes {
            key
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = graphql`
  mutation UpdateCartItemQuantity($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: { items: [{ key: $key, quantity: $quantity }] }) {
      cart {
        contents {
          nodes {
            key
          }
        }
      }
    }
  }
`;

export const REMOVE_CART_ITEM = graphql`
  mutation RemoveCartItem($keys: [ID]!) {
    removeItemsFromCart(input: { keys: $keys }) {
      cart {
        contents {
          nodes {
            key
          }
        }
      }
    }
  }
`;

export const EMPTY_CART = graphql`
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        isEmpty
      }
    }
  }
`;
