import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { clientEnv } from '@/lib/env/client';

export function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            cart: {
              merge: false,
            },
            checkout: {
              merge: false,
            },
          },
        },
      },
    }),
    link: new HttpLink({
      uri: clientEnv.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    ssrMode: typeof window === 'undefined',
  });
}
