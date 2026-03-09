import { useQuery } from "@tanstack/react-query";
import type { GraphQLDocument } from "./queries";

const WORDPRESS_GRAPHQL_URL = import.meta.env.VITE_WORDPRESS_GRAPHQL_URL as string | undefined;

export const hasWordpressEndpoint = Boolean(WORDPRESS_GRAPHQL_URL);

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function wordpressRequest<T>(query: GraphQLDocument, variables?: Record<string, unknown>): Promise<T> {
  if (!WORDPRESS_GRAPHQL_URL) {
    throw new Error("Missing VITE_WORDPRESS_GRAPHQL_URL");
  }

  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await response.json()) as GraphQLResponse<T>;
  if (!response.ok || json.errors?.length) {
    const message = json.errors?.[0]?.message || `GraphQL request failed (${response.status})`;
    throw new Error(message);
  }

  if (!json.data) {
    throw new Error("GraphQL response did not include data");
  }

  return json.data;
}

export function useWordpressQuery<T>(
  key: Array<string | number>,
  query: GraphQLDocument,
  variables?: Record<string, unknown>,
  enabled = true,
) {
  return useQuery({
    queryKey: ["wordpress", ...key, variables ?? {}],
    queryFn: () => wordpressRequest<T>(query, variables),
    enabled: hasWordpressEndpoint && enabled,
  });
}
