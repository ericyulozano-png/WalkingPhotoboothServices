import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  current: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, current, onClose, onNext, onPrev }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#1C1A17]/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors p-2"
        >
          <X size={24} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 font-['Space_Grotesk'] text-xs tracking-[0.15em] uppercase text-[#F5F0E8]/40">
          {current + 1} / {images.length}
        </div>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 lg:left-10 text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors p-3 hover:bg-white/5 rounded-full"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl max-h-[80vh] mx-16 lg:mx-24"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="max-w-full max-h-[80vh] object-contain shadow-2xl"
          />
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/40 text-center mt-4">
            {images[current].alt}
          </p>
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 lg:right-10 text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors p-3 hover:bg-white/5 rounded-full"
        >
          <ChevronRight size={32} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
