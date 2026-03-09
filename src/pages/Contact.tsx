import { useState } from "react";
import { motion } from "framer-motion";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent.",
      description: "We'll be in touch. Stay dangerous.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  const inputClasses =
    "w-full bg-black border border-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-white/25 focus:outline-none focus:border-gold transition-colors duration-300 font-body rounded-md";

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-3 font-body">
            Get in Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-brand-offwhite">
            Contact
          </h1>
          <p className="text-brand-offwhite/50 mt-4 max-w-lg font-body">
            Questions, collaborations, or just want to say hello? We're all ears.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-5"
          >
            <div>
              <label className="text-xs uppercase tracking-wider text-brand-offwhite/40 mb-2 block font-body">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                data-testid="input-contact-name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-brand-offwhite/40 mb-2 block font-body">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                data-testid="input-contact-email"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-brand-offwhite/40 mb-2 block font-body">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                rows={6}
                data-testid="input-contact-message"
                className={`${inputClasses} resize-none`}
              />
            </div>
            <button
              type="submit"
              data-testid="button-send-message"
              className="inline-flex items-center gap-3 bg-transparent border border-gold text-gold px-8 py-3.5 text-xs uppercase tracking-widest font-body font-medium hover:bg-gold hover:text-black transition-all duration-500 rounded-md"
            >
              Send Message
              <Send className="w-3.5 h-3.5" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-xs uppercase tracking-ultra-wide text-gold mb-4 font-body font-medium">
                Email
              </h3>
              <a
                href="mailto:hello@outlawdolls.com"
                className="text-brand-offwhite/60 hover:text-gold transition-colors duration-300 font-body"
              >
                hello@outlawdolls.com
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-ultra-wide text-gold mb-4 font-body font-medium">
                Follow Us
              </h3>
              <div className="flex items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-contact-instagram"
                  className="flex items-center gap-3 text-brand-offwhite/40 hover:text-gold transition-colors duration-300 group"
                >
                  <SiInstagram className="w-5 h-5" />
                  <span className="text-sm font-body">Instagram</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-contact-tiktok"
                  className="flex items-center gap-3 text-brand-offwhite/40 hover:text-gold transition-colors duration-300 group"
                >
                  <SiTiktok className="w-5 h-5" />
                  <span className="text-sm font-body">TikTok</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-contact-youtube"
                  className="flex items-center gap-3 text-brand-offwhite/40 hover:text-gold transition-colors duration-300 group"
                >
                  <SiYoutube className="w-5 h-5" />
                  <span className="text-sm font-body">YouTube</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-ultra-wide text-gold mb-4 font-body font-medium">
                Hours
              </h3>
              <p className="text-brand-offwhite/60 text-sm font-body leading-relaxed">
                We operate on rebellion time — which means we're always on. 
                Expect a response within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
