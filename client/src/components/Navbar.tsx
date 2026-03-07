import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
            <Link
              href="/cart"
              data-testid="link-cart-icon"
              className="relative group"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-offwhite transition-colors duration-300 group-hover:text-gold" />
              {totalItems > 0 && (
                <span
                  data-testid="badge-cart-count"
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/" data-testid="link-logo" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-heading text-lg sm:text-xl tracking-brand text-brand-offwhite uppercase whitespace-nowrap">
                Outlaw Dolls
              </h1>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className="text-sm tracking-wider uppercase text-brand-offwhite/70 transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              data-testid="button-mobile-menu"
              className="md:hidden text-brand-offwhite"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 flex flex-col items-center justify-center gap-10"
            data-testid="mobile-menu"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className="font-heading text-3xl tracking-brand uppercase text-brand-offwhite hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/cart"
                data-testid="link-mobile-cart"
                className="font-heading text-3xl tracking-brand uppercase text-brand-offwhite hover:text-gold transition-colors duration-300"
              >
                Cart ({totalItems})
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
