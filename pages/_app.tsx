import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { FaustProvider } from "@faustwp/core";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/templates/MainLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
}
