import { useState } from "react";
import { AppLink } from "../lib/navigation";
import type { Product } from "../lib/product-types";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useToast } from "@/hooks/use-toast";

/**
 * MIGRATION NOTE:
 * In Next.js / Faust.js, this page becomes pages/product/[slug].tsx
 * - Product data comes from getStaticProps via GET_PRODUCT_BY_SLUG query
 * - Related products come from the `related` field in the query
 * - The `identifier` prop maps to router.query.slug in Next.js
 * - Pass product and relatedProducts as props from getStaticProps
 */

interface ProductDetailProps {
  identifier?: string;
  product?: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({ identifier, product: propProduct, relatedProducts: propRelated }: ProductDetailProps) {
  const resolvedProduct = propProduct || (identifier
    ? products.find((p) => p.slug === identifier || p.id === Number(identifier))
    : undefined);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!resolvedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-brand-offwhite mb-4">Product Not Found</h1>
          <AppLink
            href="/shop"
            data-testid="link-back-to-shop"
            className="text-gold text-sm uppercase tracking-wider"
          >
            Back to Shop
          </AppLink>
        </div>
      </div>
    );
  }

  const relatedProducts = propRelated || products
    .filter((p) => p.id !== resolvedProduct.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(resolvedProduct, selectedSize);
    }
    toast({
      title: "Added to cart",
      description: `${resolvedProduct.name} (${selectedSize}) x${quantity} has been added.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AppLink
            href="/shop"
            data-testid="link-back-shop"
            className="inline-flex items-center gap-2 text-sm text-brand-offwhite/50 hover:text-gold transition-colors duration-300 mb-8 uppercase tracking-wider font-body"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Shop
          </AppLink>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-[3/4] overflow-hidden bg-brand-dark"
          >
            <img
              src={resolvedProduct.image}
              alt={resolvedProduct.name}
              data-testid="img-product-hero"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center py-4"
          >
            <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4 font-body">
              Outlaw Dolls
            </p>
            <h1
              data-testid="text-product-title"
              className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-offwhite mb-4"
            >
              {resolvedProduct.name}
            </h1>
            <p
              data-testid="text-product-price"
              className="text-2xl text-brand-offwhite/80 font-body mb-8"
            >
              ${resolvedProduct.price}
            </p>

            <p
              data-testid="text-product-description"
              className="text-brand-offwhite/60 leading-relaxed mb-8 font-body"
            >
              {resolvedProduct.description}
            </p>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-brand-offwhite/40 mb-3 font-body">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {resolvedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    data-testid={`button-size-${size}`}
                    className={`px-4 py-2.5 text-xs uppercase tracking-wider border transition-all duration-300 rounded-md font-body ${
                      selectedSize === size
                        ? "border-gold text-gold bg-gold/10"
                        : "border-white/10 text-brand-offwhite/60 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-brand-offwhite/40 mb-3 font-body">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-quantity-minus"
                  aria-label="Decrease quantity"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-offwhite/60 hover:border-white/30 transition-colors duration-300 rounded-md"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span data-testid="text-quantity" className="text-brand-offwhite font-body w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quantity-plus"
                  aria-label="Increase quantity"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-offwhite/60 hover:border-white/30 transition-colors duration-300 rounded-md"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
              className="w-full bg-transparent border border-gold text-gold py-4 text-sm uppercase tracking-widest font-body font-medium hover:bg-gold hover:text-black transition-all duration-500 rounded-md"
            >
              Add to Cart — ${resolvedProduct.price * quantity}
            </button>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="grid grid-cols-2 gap-4 text-xs text-brand-offwhite/40 font-body">
                <div>
                  <p className="uppercase tracking-wider mb-1">Shipping</p>
                  <p className="text-brand-offwhite/60">Free worldwide shipping</p>
                </div>
                <div>
                  <p className="uppercase tracking-wider mb-1">Returns</p>
                  <p className="text-brand-offwhite/60">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-offwhite mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
