import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Instagram, Facebook, ArrowUpRight } from "lucide-react";

// TikTok doesn’t come built‑in, so we render the SVG manually
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.20-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.40-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.50-.03-1-.01-1.49.18-1.90 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.50 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.40-.67.41-1.06.10-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/WalkingPhotoboothPH" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/walkingphotoboothph" },
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@walkingphotoboothph" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" ref={ref} className="bg-[#1C1A17] pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-20 border-b border-[#F5F0E8]/10"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-['Fraunces'] text-3xl font-black text-[#F5F0E8] mb-4">
              Walking Photobooth Sevices<span className="text-[#C0522B]">.</span>
            </p>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/40 leading-relaxed max-w-xs">
              A refined walking photobooth experience created for brands, celebrations, and experiences that are meant to stand apart.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-['Space_Grotesk'] text-xs tracking-[0.18em] uppercase text-[#F5F0E8]/30 mb-6">
              Get In Touch
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@studio.co"
                className="group flex items-center gap-3 text-[#F5F0E8]/60 hover:text-[#C0522B] transition-colors duration-200"
              >
                <Mail size={15} />
                <span className="font-['Plus_Jakarta_Sans'] text-sm">inquire.walkingphotobooth@gmail.com</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+15551234567"
                className="group flex items-center gap-3 text-[#F5F0E8]/60 hover:text-[#C0522B] transition-colors duration-200"
              >
                <Phone size={15} />
                <span className="font-['Plus_Jakarta_Sans'] text-sm">0935-1363-233</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <p className="font-['Space_Grotesk'] text-xs tracking-[0.18em] uppercase text-[#F5F0E8]/30 mb-6">
              Follow Us
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[#F5F0E8]/60 hover:text-[#C0522B] transition-colors duration-200"
                >
                  <Icon size={20} />
                  <span className="font-['Plus_Jakarta_Sans'] text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8"
        >
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.1em] text-[#F5F0E8]/20">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.1em] text-[#F5F0E8]/20">
            Crafted with intention.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
