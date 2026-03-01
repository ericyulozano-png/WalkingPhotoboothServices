import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Lightbox from "./Lightbox";

// you can use either remote URLs or local files
// the public directory already contains several JPGs; reference them by their
// filename with a leading slash.
const images = [
  {
    src: "/588896251_1281063850710844_770322904670158257_n.jpg",
    alt: "Brand Identity — Geometric Typography",
    span: "row-span-2",
  },
  {
    src: "/597914648_1287282680088961_6420957809122037680_n.jpg",
    alt: "Editorial Layout — Print Design",
    span: "",
  },
  {
    src: "/598774338_1287301123420450_5359063987740864784_n.jpg",
    alt: "Product Photography — Studio",
    span: "",
  },
  {
    src: "/605233392_1296999122450650_4433141770666875338_n.jpg",
    alt: "UI Design — Dashboard Interface",
    span: "col-span-2",
  },
  {
    src: "/607428714_1298701885613707_1453010806065157624_n.jpg",
    alt: "Brand Campaign — Visual Direction",
    span: "",
  },
  {
    src: "/631536807_1336820838468478_8748562675337671776_n.jpg",
    alt: "Photography — Lifestyle Series",
    span: "row-span-2",
  },
  {
    src: "/632639003_1336811848469377_6201699165069511494_n.jpg",
    alt: "Portrait — Client Work",
    span: "",
  },
  {
    src: "/558944320_1233269842156912_1977687952013332102_n.jpg",
    alt: "Strategy — Workshop Session",
    span: "",
  },
];

// Flat list for lightbox
const lightboxImages = images.map(({ src, alt }) => ({ src, alt }));

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="bg-[#000] text-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.2em] uppercase text-[#C0522B] mb-4">
            Selected Work
          </p>
          <div className="flex items-end justify-between">
            <h2 className="font-['Fraunces'] text-4xl lg:text-5xl font-black text-[#F5F0E8] leading-tight">
              The portfolio.
            </h2>
            <p className="hidden lg:block font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/35 max-w-xs text-right leading-relaxed">
              Click any image to view full size. Use arrow keys to navigate.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 auto-rows-[220px] lg:auto-rows-[260px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`group relative overflow-hidden cursor-pointer ${img.span}`}
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col items-center gap-3">
                  <ZoomIn size={28} className="text-[#F5F0E8]" />
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#F5F0E8]/80 text-center px-4 leading-tight">
                    {img.alt}
                  </p>
                </div>
              </div>
              {/* Shadow lift on hover */}
              <div className="absolute inset-0 shadow-[0_20px_60px_rgba(0,0,0,0)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-shadow duration-400 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={lightboxImages}
          current={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % images.length)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + images.length) % images.length)}
        />
      )}
    </section>
  );
}
