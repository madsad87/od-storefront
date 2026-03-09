import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import { FaustProvider } from "@faustwp/core";
import { queryClient } from "@/lib/queryClient";
import { getWordpressApolloClient } from "@/lib/wordpress/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/templates/MainLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = getWordpressApolloClient();

  const appTree = (
    <FaustProvider pageProps={pageProps}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </FaustProvider>
  );

  if (!apolloClient) {
    return appTree;
  }

  return <ApolloProvider client={apolloClient}>{appTree}</ApolloProvider>;
}
