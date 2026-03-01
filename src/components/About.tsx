import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#000] text-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Brand statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-['Space_Grotesk'] text-xs tracking-[0.2em] uppercase text-[#C0522B] mb-6">
              About the Event's
            </p>
            <h2 className="font-['Fraunces'] text-4xl lg:text-5xl font-black text-[#F5F0E8] leading-tight mb-8">
              We design for
              <br />
              <span className="italic">impact, not</span>
              <br />
              decoration.
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#F5F0E8]/60 leading-relaxed mb-6">
              We specialize in high-end walking photobooth experiences that move effortlessly through your event engaging guests, capturing authentic moments, and producing refined, on-brand content. Every interaction is curated to reflect your aesthetic and elevate your celebration.
            </p>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#F5F0E8]/60 leading-relaxed mb-10">
              From intimate celebrations to large-scale corporate events, we’ve partnered with clients across industries to capture their moments with clarity, creativity, and confidence.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 border-t border-[#F5F0E8]/30 pt-8">
              {[
                { num: "12+", label: "Years" },
                { num: "200+", label: "Projects" },
                { num: "40+", label: "Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-['Fraunces'] text-3xl font-black text-[#F5F0E8]">{s.num}</p>
                  <p className="font-['Space_Grotesk'] text-xs tracking-[0.15em] uppercase text-[#F5F0E8]/40 mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Featured image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src="FB ADDS-min.jpg"
                alt="Studio workspace"
                className="w-full h-full object-cover"
              />
              {/* Accent overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#F5F0E8]/30 backdrop-blur-md p-3 rounded">
                <p className="font-['Fraunces'] text-base font-semibold text-[#1C1A17] mb-0">
                  Rooted in craft.
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#1C1A17]/55">
                  Every pixel, every word, every decision — intentional.
                </p>
              </div>
            </div>
            {/* Decorative dot */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#C0522B]/15 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
