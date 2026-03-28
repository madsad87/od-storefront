import { gql } from '@apollo/client';

export const CHECKOUT_QUERY = gql`
  query CheckoutSnapshot {
    cart {
      total
      shippingTotal
      contentsTotal
    }
    paymentGateways {
      nodes {
        id
        title
        description
      }
    }
  }
`;
