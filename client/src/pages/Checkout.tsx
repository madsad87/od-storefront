import { useMemo, useState } from "react";
import { AppLink } from "../lib/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  createCheckoutStrategy,
  type CheckoutFormData,
} from "../features/checkout/checkout-strategy";

export default function Checkout() {
  const { items, subtotal } = useCart();
  const checkoutStrategy = useMemo(() => createCheckoutStrategy(), []);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    setIsSubmitting(true);

    try {
      const cartSessionToken = localStorage.getItem("woocommerce-session") ?? undefined;

      await checkoutStrategy.completeCheckout({
        form,
        session: {
          cartSessionToken,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again.";
      setCheckoutError(message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-brand-offwhite mb-4">
            Nothing to Checkout
          </h1>
          <AppLink
            href="/shop"
            data-testid="link-go-shopping"
            className="text-gold text-sm uppercase tracking-wider font-body"
          >
            Start Shopping
          </AppLink>
        </div>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-black border border-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-white/25 focus:outline-none focus:border-gold transition-colors duration-300 font-body rounded-md";

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AppLink
            href="/cart"
            data-testid="link-back-to-cart"
            className="inline-flex items-center gap-2 text-sm text-brand-offwhite/50 hover:text-gold transition-colors duration-300 mb-8 uppercase tracking-wider font-body"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Cart
          </AppLink>

          <h1 className="font-heading text-4xl sm:text-5xl text-brand-offwhite mb-12">
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xs uppercase tracking-ultra-wide text-gold mb-6 font-body font-medium">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    data-testid="input-name"
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    data-testid="input-email"
                    className={inputClasses}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xs uppercase tracking-ultra-wide text-gold mb-6 font-body font-medium">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    data-testid="input-address"
                    className={inputClasses}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      required
                      data-testid="input-city"
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={form.zip}
                      onChange={handleChange}
                      required
                      data-testid="input-zip"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xs uppercase tracking-ultra-wide text-gold mb-6 font-body font-medium">
                  Payment
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChange={handleChange}
                    required
                    data-testid="input-card"
                    className={inputClasses}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={form.expiry}
                      onChange={handleChange}
                      required
                      data-testid="input-expiry"
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={handleChange}
                      required
                      data-testid="input-cvv"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-brand-dark border border-white/5 p-6 sm:p-8 rounded-md">
                <h2 className="font-heading text-xl text-brand-offwhite mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-14 overflow-hidden bg-brand-dark shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-brand-offwhite truncate font-body">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-brand-offwhite/40 font-body">
                          {item.size} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-brand-offwhite font-body shrink-0">
                        ${item.product.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 mb-6">
                  <div className="flex justify-between text-sm font-body mb-2">
                    <span className="text-brand-offwhite/50">Subtotal</span>
                    <span className="text-brand-offwhite">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-brand-offwhite/50">Shipping</span>
                    <span className="text-gold text-xs uppercase tracking-wider">
                      Free
                    </span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 mb-6">
                  <div className="flex justify-between font-body">
                    <span className="text-brand-offwhite font-medium">Total</span>
                    <span className="text-brand-offwhite text-lg">${subtotal}</span>
                  </div>
                </div>
                {checkoutError ? (
                  <p className="text-xs text-red-400 font-body mb-4" data-testid="text-checkout-error">
                    {checkoutError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="button-place-order"
                  className="w-full bg-gold text-black py-3.5 text-xs uppercase tracking-widest font-body font-bold hover:opacity-90 transition-opacity duration-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Redirecting…" : "Place Order"}
                </button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
