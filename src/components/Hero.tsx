import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000] text-[#F5F0E8]">
      {/* Noise/grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#C0522B] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Space_Grotesk'] text-xs tracking-[0.2em] uppercase text-[#C0522B] mb-6"
          >
            Creative Portfolio — 2015
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Fraunces'] text-6xl sm:text-7xl lg:text-[96px] font-black leading-[0.95] tracking-tight text-[#F5F0E8] mb-8"
          >
            Work that
            <br />
            <span className="italic text-[#C0522B]">speaks</span>
            <br />
            for itself.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Plus_Jakarta_Sans'] text-lg text-[#F5F0E8]/55 max-w-lg leading-relaxed mb-12"
          >
          A bespoke walking photobooth experience designed to embody your brand merging creative direction, refined aesthetics, and seamless guest engagement into one polished presentation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <button
              onClick={() => handleScroll("#download")}
              className="group font-['Space_Grotesk'] text-sm tracking-[0.1em] uppercase bg-[#C0522B] text-[#F5F0E8] px-8 py-4 hover:bg-[#000] transition-all duration-300 flex items-center gap-3"
            >
              Download PDF
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => handleScroll("#gallery")}
              className="font-['Space_Grotesk'] text-sm tracking-[0.1em] uppercase border border-[#F5F0E8]/25 text-[#F5F0E8] px-8 py-4 hover:border-[#F5F0E8] hover:bg-[#F5F0E8]/10 transition-all duration-300"
            >
              View Work
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/30">
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#F5F0E8]/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
