import { AppLink, buildProductPath } from "../lib/navigation";
import { useCart } from "../context/CartContext";
import type { Product } from "../lib/product-types";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "M");
    toast({
      title: "Added to cart",
      description: `${product.name} (M) has been added to your cart.`,
    });
  };

  const productHref = buildProductPath(product.slug || product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <AppLink href={productHref} data-testid={`card-product-${product.id}`}>
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden bg-brand-dark mb-4 aspect-[3/4]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <button
              onClick={handleAddToCart}
              data-testid={`button-add-cart-${product.id}`}
              aria-label={`Add ${product.name} to cart`}
              className="absolute bottom-4 right-4 w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                data-testid={`text-product-name-${product.id}`}
                className="font-heading text-base text-brand-offwhite group-hover:text-gold transition-colors duration-300"
              >
                {product.name}
              </h3>
            </div>
            <p
              data-testid={`text-product-price-${product.id}`}
              className="text-sm text-brand-offwhite/60 font-body whitespace-nowrap"
            >
              ${product.price}
            </p>
          </div>
        </div>
      </AppLink>
    </motion.div>
  );
}
