import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-3 font-body">
            Collection
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-brand-offwhite">
            Shop All
          </h1>
          <p className="text-brand-offwhite/50 mt-4 max-w-lg font-body">
            Every piece designed to make you feel dangerous, beautiful, and completely yourself.
          </p>
        </motion.div>

        <div
          data-testid="product-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
