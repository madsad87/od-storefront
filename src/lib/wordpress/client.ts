import type { GraphQLDocument } from "./queries";

const SESSION_HEADER = "woocommerce-session";
const SESSION_STORAGE_KEY = "woocommerce-session";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface WordpressRequestOptions {
  variables?: Record<string, unknown>;
  includeSession?: boolean;
}

function getWordpressGraphqlUrl() {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL");
  }
  return endpoint;
}

function readStoredSessionToken() {
  if (typeof window === "undefined") {
    return null;
  }

  const localValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (localValue) {
    return localValue;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${SESSION_STORAGE_KEY}=`));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function persistSessionToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, token);
  document.cookie = `${SESSION_STORAGE_KEY}=${encodeURIComponent(token)}; path=/; max-age=2592000; samesite=lax`;
}

export async function wordpressRequest<T>(
  query: GraphQLDocument,
  options: WordpressRequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.includeSession) {
    const sessionToken = readStoredSessionToken();
    if (sessionToken) {
      headers[SESSION_HEADER] = sessionToken;
    }
  }

  const response = await fetch(getWordpressGraphqlUrl(), {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables: options.variables,
    }),
  });

  const responseSession = response.headers.get(SESSION_HEADER);
  if (responseSession) {
    persistSessionToken(responseSession);
  }

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
