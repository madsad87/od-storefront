import { useState } from "react";
import { Link } from "wouter";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: "Welcome to the rebellion.",
        description: "You're now on the list. Expect the unexpected.",
      });
      setEmail("");
    }
  };

  return (
    <footer data-testid="footer" className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl tracking-brand uppercase text-brand-offwhite mb-4">
              Outlaw Dolls
            </h3>
            <p className="text-sm text-brand-offwhite/50 leading-relaxed max-w-xs">
              Break expectations. Steal the spotlight. Fashion for the bold, the fearless, and the unapologetic.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body font-medium">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                  className="text-sm text-brand-offwhite/50 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body font-medium">
              Join the List
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid="input-newsletter-email"
                className="flex-1 bg-black border border-white/10 px-4 py-2.5 text-sm text-brand-offwhite placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors duration-300 rounded-md"
              />
              <button
                type="submit"
                data-testid="button-subscribe"
                className="bg-gold text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-opacity duration-300 hover:opacity-90"
              >
                Join
              </button>
            </form>

            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-social-instagram"
                className="text-brand-offwhite/40 hover:text-gold transition-colors duration-300"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-social-tiktok"
                className="text-brand-offwhite/40 hover:text-gold transition-colors duration-300"
              >
                <SiTiktok className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-social-youtube"
                className="text-brand-offwhite/40 hover:text-gold transition-colors duration-300"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p data-testid="text-copyright" className="text-xs text-brand-offwhite/30 tracking-wider">
            &copy; 2025 Outlaw Dolls. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
