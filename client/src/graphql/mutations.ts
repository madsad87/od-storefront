/**
 * WOOGRAPHQL CART & CHECKOUT MUTATIONS
 * ======================================
 * Ready-to-use GraphQL mutations for WooCommerce cart and checkout.
 *
 * SESSION MANAGEMENT:
 * WooGraphQL uses JWT-based sessions. After any cart mutation, capture the
 * session token from the response header `woocommerce-session` and send it
 * in subsequent requests.
 *
 * Recommended: Use @woographql/session-utils npm package for token management.
 *
 * USAGE:
 *   import { useMutation } from "@apollo/client";
 *   import { ADD_TO_CART } from "../graphql/mutations";
 *   const [addToCart] = useMutation(ADD_TO_CART);
 *   await addToCart({ variables: { productId: 123, quantity: 1 } });
 */

export const ADD_TO_CART = `
  mutation AddToCart($productId: Int!, $quantity: Int = 1, $variationId: Int, $variation: [ProductAttributeInput]) {
    addToCart(input: {
      productId: $productId
      quantity: $quantity
      variationId: $variationId
      variation: $variation
    }) {
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
      }
      cartItem {
        key
        quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = `
  mutation UpdateCartItemQuantity($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: {
      items: [{ key: $key, quantity: $quantity }]
    }) {
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
            quantity
            total
            subtotal
          }
        }
        subtotal
        total
      }
    }
  }
`;

export const REMOVE_CART_ITEM = `
  mutation RemoveCartItem($keys: [ID]!) {
    removeItemsFromCart(input: { keys: $keys }) {
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
            quantity
            total
            subtotal
          }
        }
        subtotal
        total
      }
    }
  }
`;

export const EMPTY_CART = `
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        contents {
          nodes {
            key
          }
        }
        subtotal
        total
      }
    }
  }
`;

export const APPLY_COUPON = `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        appliedCoupons {
          code
          discountAmount
        }
        subtotal
        total
      }
    }
  }
`;

export const REMOVE_COUPON = `
  mutation RemoveCoupon($code: String!) {
    removeCoupons(input: { codes: [$code] }) {
      cart {
        appliedCoupons {
          code
          discountAmount
        }
        subtotal
        total
      }
    }
  }
`;

export const CHECKOUT = `
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        id
        databaseId
        orderNumber
        status
        total
        subtotal
        shippingTotal
        totalTax
        lineItems {
          nodes {
            product {
              node {
                name
              }
            }
            quantity
            total
          }
        }
      }
      customer {
        sessionToken
      }
      result
    }
  }
`;

/**
 * CHECKOUT INPUT EXAMPLE:
 *
 * const checkoutInput = {
 *   billing: {
 *     firstName: "Jane",
 *     lastName: "Doe",
 *     email: "jane@example.com",
 *     address1: "123 Main St",
 *     city: "Austin",
 *     state: "TX",
 *     postcode: "78701",
 *     country: "US",
 *   },
 *   shipping: {
 *     firstName: "Jane",
 *     lastName: "Doe",
 *     address1: "123 Main St",
 *     city: "Austin",
 *     state: "TX",
 *     postcode: "78701",
 *     country: "US",
 *   },
 *   paymentMethod: "stripe",
 *   shipToDifferentAddress: false,
 * };
 *
 * HYBRID CHECKOUT ALTERNATIVE (Recommended for dropshipping):
 * Instead of fully headless checkout, redirect to WooCommerce's native
 * checkout page to leverage existing payment gateway integrations:
 *
 *   const checkoutUrl = `${WORDPRESS_URL}/checkout?session=${sessionToken}`;
 *   window.location.href = checkoutUrl;
 *
 * This avoids rebuilding Stripe/PayPal/etc. gateway logic in the frontend.
 */
