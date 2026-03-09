import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

export const templates = {
  home: Home,
  shop: Shop,
  product: ProductDetail,
  cart: Cart,
  checkout: Checkout,
  about: About,
  contact: Contact,
  notFound: NotFound,
};

export type TemplateName = keyof typeof templates;
