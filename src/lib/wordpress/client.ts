import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import type { DocumentNode } from "graphql";

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WP_URL;
const WORDPRESS_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  (WORDPRESS_URL ? `${WORDPRESS_URL.replace(/\/$/, "")}/graphql` : undefined);

export const hasWordpressEndpoint = Boolean(WORDPRESS_GRAPHQL_URL);

export function createWordpressApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: WORDPRESS_GRAPHQL_URL, fetch }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
}

let browserClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getWordpressApolloClient() {
  if (!hasWordpressEndpoint) {
    return null;
  }

  if (typeof window === "undefined") {
    return createWordpressApolloClient();
  }

  if (!browserClient) {
    browserClient = createWordpressApolloClient();
  }

  return browserClient;
}

export async function executeWordpressQuery<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: DocumentNode,
  variables?: TVariables,
): Promise<TData | null> {
  const client = getWordpressApolloClient();
  if (!client) return null;

  const { data } = await client.query<TData, TVariables>({
    query,
    variables,
    fetchPolicy: "network-only",
  });

  return data;
}
