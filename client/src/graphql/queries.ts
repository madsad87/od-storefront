/**
 * WPGRAPHQL + WOOGRAPHQL QUERIES
 * ================================
 * Re-export gql documents from the WordPress data layer.
 */

export {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  GET_CART,
  SITE_DATA_QUERY,
  GET_MENU,
  gql,
  type GraphQLDocument,
} from "../lib/wordpress/queries";
