import { queryClient } from "./lib/queryClient";
import { useAppRouter } from "./lib/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const { pathname } = useAppRouter();

  if (pathname === "/") return <Home />;
  if (pathname === "/shop") return <Shop />;
  if (pathname?.startsWith("/product/")) {
    const identifier = pathname.split("/").pop();
    return <ProductDetail identifier={identifier} />;
  }
  if (pathname === "/cart") return <Cart />;
  if (pathname === "/checkout") return <Checkout />;
  if (pathname === "/about") return <About />;
  if (pathname === "/contact") return <Contact />;

  return <NotFound />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-black text-brand-offwhite">
            <Navbar />
            <main>
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
