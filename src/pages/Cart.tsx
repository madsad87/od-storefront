import { AppLink } from "../lib/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, isLoading, error } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-brand-offwhite/60 font-body uppercase tracking-wider">Loading cart…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-heading text-3xl text-brand-offwhite mb-4">Unable to Load Cart</h1>
          <p className="text-brand-offwhite/60 font-body mb-6">{error}</p>
          <AppLink
            href="/shop"
            className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 text-xs uppercase tracking-widest font-body hover:bg-gold hover:text-black transition-all duration-500 rounded-md"
          >
            Continue Shopping
          </AppLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <ShoppingBag className="w-12 h-12 text-brand-offwhite/20 mx-auto mb-6" />
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-offwhite mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-brand-offwhite/50 mb-8 font-body">
            Time to fill it with something dangerous.
          </p>
          <AppLink
            href="/shop"
            data-testid="link-continue-shopping"
            className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 text-xs uppercase tracking-widest font-body hover:bg-gold hover:text-black transition-all duration-500 rounded-md"
          >
            Continue Shopping
          </AppLink>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AppLink
            href="/shop"
            data-testid="link-back-to-shop"
            className="inline-flex items-center gap-2 text-sm text-brand-offwhite/50 hover:text-gold transition-colors duration-300 mb-8 uppercase tracking-wider font-body"
          >
            <ArrowLeft className="w-3 h-3" />
            Continue Shopping
          </AppLink>

          <h1 className="font-heading text-4xl sm:text-5xl text-brand-offwhite mb-12">
            Your Cart
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`cart-item-${item.product.id}-${item.size}`}
                className="flex gap-4 sm:gap-6 pb-6 border-b border-white/5"
              >
                <AppLink href={`/product/${item.product.slug || item.product.id}`} className="shrink-0">
                  <div className="w-20 h-24 sm:w-24 sm:h-32 overflow-hidden bg-brand-dark">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AppLink>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg text-brand-offwhite">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-brand-offwhite/40 uppercase tracking-wider mt-1 font-body">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      data-testid={`button-remove-${item.product.id}-${item.size}`}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-brand-offwhite/30 hover:text-brand-offwhite transition-colors duration-300 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        data-testid={`button-decrease-${item.product.id}-${item.size}`}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-brand-offwhite/60 hover:border-white/30 transition-colors duration-300 rounded-md"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span
                        data-testid={`text-quantity-${item.product.id}-${item.size}`}
                        className="text-brand-offwhite font-body w-6 text-center text-sm"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        data-testid={`button-increase-${item.product.id}-${item.size}`}
                        aria-label="Increase quantity"
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-brand-offwhite/60 hover:border-white/30 transition-colors duration-300 rounded-md"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p
                      data-testid={`text-line-total-${item.product.id}-${item.size}`}
                      className="text-brand-offwhite font-body"
                    >
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-brand-dark border border-white/5 p-6 sm:p-8 rounded-md">
              <h2 className="font-heading text-xl text-brand-offwhite mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-brand-offwhite/50">Subtotal</span>
                  <span data-testid="text-subtotal" className="text-brand-offwhite">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-brand-offwhite/50">Shipping</span>
                  <span className="text-gold text-xs uppercase tracking-wider">Free</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 mb-6">
                <div className="flex justify-between font-body">
                  <span className="text-brand-offwhite">Total</span>
                  <span data-testid="text-total" className="text-brand-offwhite text-lg">
                    ${subtotal}
                  </span>
                </div>
              </div>
              <AppLink
                href="/checkout"
                data-testid="button-checkout"
                className="block w-full bg-gold text-black text-center py-3.5 text-xs uppercase tracking-widest font-body font-bold hover:opacity-90 transition-opacity duration-300 rounded-md"
              >
                Proceed to Checkout
              </AppLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
