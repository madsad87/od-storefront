import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-3 font-body">
            Our Story
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-brand-offwhite max-w-2xl">
            We Don't Follow Trends.
            <br />
            <span className="italic">We Set Them on Fire.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-offwhite mb-6">
              Born from Rebellion
            </h2>
            <p className="text-brand-offwhite/60 leading-relaxed mb-6 font-body">
              Outlaw Dolls was born in the back of a vintage shop at 2 AM, fueled by espresso 
              and the conviction that fashion had become far too safe. We were tired of seeing 
              the same recycled silhouettes, the same watered-down "edgy" that was really just 
              black t-shirts with a skull on them.
            </p>
            <p className="text-brand-offwhite/60 leading-relaxed font-body">
              We wanted clothes that felt like armor. Pieces that made you walk differently, 
              speak differently, live differently. So we built them ourselves — stitch by 
              rebellious stitch.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop"
              alt="Outlaw Dolls editorial"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 sm:py-20 mb-20 sm:mb-28 border-y border-white/5"
        >
          <blockquote className="font-heading text-2xl sm:text-3xl md:text-5xl text-brand-offwhite italic max-w-3xl mx-auto leading-tight">
            "Break Expectations.
            <br />
            Steal the Spotlight."
          </blockquote>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] overflow-hidden md:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&fit=crop"
              alt="Fashion editorial"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:order-2"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-offwhite mb-6">
              The Philosophy
            </h2>
            <p className="text-brand-offwhite/60 leading-relaxed mb-6 font-body">
              Every collection is a love letter to the women who refuse to be ordinary. 
              We design for the midnight hours, the stolen glances, the moments when you 
              feel most alive. Our pieces aren't just clothing — they're declarations of intent.
            </p>
            <p className="text-brand-offwhite/60 leading-relaxed font-body">
              We source the finest materials — Italian leather, Japanese silk, French hardware — 
              because power should feel luxurious against your skin. Each piece is crafted in 
              limited runs, because you deserve something that not everyone can have.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-offwhite mb-6">
              For the Unapologetic
            </h2>
            <p className="text-brand-offwhite/60 leading-relaxed mb-6 font-body">
              Our woman doesn't ask for permission. She doesn't dim her light to make others 
              comfortable. She walks into a room and the room adjusts. She wears our clothes 
              like she was born in them — because in a way, she was. They were made for her 
              before she even knew she needed them.
            </p>
            <p className="text-brand-offwhite/60 leading-relaxed font-body">
              Outlaw Dolls isn't just a brand. It's a movement. A whispered rebellion that 
              screams louder than any words could. Welcome to the family. Welcome to the fire.
            </p>
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
              alt="Outlaw Dolls brand"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
