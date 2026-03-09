import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

const SESSION_HEADER = "woocommerce-session";

const getStoredSession = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(SESSION_HEADER);
};

const setStoredSession = (sessionValue: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_HEADER, sessionValue);
};

const sessionMiddlewareLink = new ApolloLink((operation, forward) => {
  const currentHeaders = operation.getContext().headers ?? {};
  const sessionToken = getStoredSession();

  operation.setContext({
    headers: {
      ...currentHeaders,
      ...(sessionToken
        ? {
            [SESSION_HEADER]: `Session ${sessionToken}`,
            Authorization: `Bearer ${sessionToken}`,
          }
        : {}),
    },
  });

  return forward(operation).map((result) => {
    const response = operation.getContext().response as Response | undefined;
    const responseSession = response?.headers?.get(SESSION_HEADER);

    if (responseSession) {
      setStoredSession(responseSession.replace(/^Session\s+/i, ""));
    }

    return result;
  });
});

const httpLink = new HttpLink({
  uri: (import.meta as ImportMeta & { env?: { VITE_WPGRAPHQL_URL?: string } }).env
    ?.VITE_WPGRAPHQL_URL ?? "/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([sessionMiddlewareLink, httpLink]),
});
