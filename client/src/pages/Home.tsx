import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <section
        data-testid="hero-section"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&fit=crop"
            alt="Outlaw Dolls editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm tracking-ultra-wide uppercase text-gold mb-6 font-body"
          >
            Outlaw Dolls
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-offwhite leading-[1.1] mb-8"
          >
            Break Expectations.
            <br />
            <span className="italic">Steal the Spotlight.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/shop"
              data-testid="button-shop-now"
              className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-body font-medium hover:bg-gold hover:text-black transition-all duration-500 group rounded-md"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </motion.div>
      </section>

      <Marquee />

      <section data-testid="featured-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs tracking-ultra-wide uppercase text-gold mb-3 font-body">
              New Arrivals
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-offwhite">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            data-testid="link-view-all"
            className="text-sm text-brand-offwhite/50 hover:text-gold transition-colors duration-300 uppercase tracking-wider font-body whitespace-nowrap"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80&fit=crop"
            alt="Fashion editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-brand-offwhite italic leading-relaxed mb-6">
              "Fashion is armor. Style is the weapon. We don't follow trends — we set them on fire."
            </p>
            <div className="w-12 h-[1px] bg-gold mx-auto mb-4" />
            <cite className="text-xs uppercase tracking-ultra-wide text-gold not-italic font-body">
              Outlaw Dolls
            </cite>
          </motion.blockquote>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4 font-body">
              The Brand
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-offwhite mb-6">
              Born to Break Rules
            </h2>
            <p className="text-brand-offwhite/60 leading-relaxed mb-8 font-body">
              Outlaw Dolls was born from the belief that clothing should feel like power. 
              Every piece in our collection is designed to make you feel dangerous, beautiful, 
              and completely yourself. We don't design for the ordinary — we design for the unforgettable.
            </p>
            <Link
              href="/about"
              data-testid="link-about-cta"
              className="text-sm text-gold uppercase tracking-wider font-body hover:text-gold-light transition-colors duration-300 inline-flex items-center gap-2"
            >
              Our Story
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80&fit=crop"
              alt="Brand story"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
