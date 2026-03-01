import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, ArrowDownToLine } from "lucide-react";

interface PDFCardProps {
  title: string;
  description: string;
  fileSize: string;
  pages: string;
  href: string;
  thumbnail: string;
}

function PDFCard({ title, description, fileSize, pages, href, thumbnail }: PDFCardProps) {
  return (
    <div className="group relative bg-[#000] shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden flex flex-col lg:flex-row">
      {/* Thumbnail */}
      <div className="relative w-full lg:w-96 shrink-0 bg-[#222] overflow-hidden h-48 lg:h-64 flex items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-400"
        />
        {/* Document icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#F5F0E8]/80 backdrop-blur-sm p-4 rounded-sm">
            <FileText size={32} className="text-[#C0522B]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.18em] uppercase text-[#C0522B] mb-3">
            PDF Document
          </p>
          <h3 className="font-['Fraunces'] text-2xl lg:text-3xl font-bold text-[#F5F0E8] mb-4 leading-snug">
            {title}
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/55 leading-relaxed mb-6">
            {description}
          </p>

          {/* Meta */}
          <div className="flex gap-6 mb-8">
            {[
              { label: "File Size", value: fileSize },
              { label: "Pages", value: pages },
              { label: "Format", value: "PDF" },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-['Space_Grotesk'] text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/35 mb-0.5">
                  {m.label}
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-sm font-500 text-[#F5F0E8]/70">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Download button */}
        <a
          href={href}
          download
          className="group/btn inline-flex items-center gap-3 bg-[#C0522B] text-[#F5F0E8] px-7 py-4 font-['Space_Grotesk'] text-sm tracking-[0.1em] uppercase hover:bg-[#1C1A17] transition-all duration-300 self-start hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowDownToLine size={16} className="group-hover/btn:translate-y-0.5 transition-transform duration-200" />
          Download Free
        </a>
      </div>
    </div>
  );
}

export default function PDFDownload() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="download" ref={ref} className="bg-[#000] text-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.2em] uppercase text-[#C0522B] mb-4">
            Resources
          </p>
          <h2 className="font-['Fraunces'] text-4xl lg:text-5xl font-black text-[#F5F0E8] leading-tight max-w-lg">
            Take our work
            <span className="italic"> with you.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {[
            {
              title: "WPS Service Company Profile",
              description:
                "A comprehensive overview of The Walking PhotoBooth PH services, capabilities, and brand offering. Perfect for understanding our creative approach and service excellence.",
              fileSize: "2.5 MB",
              pages: "12",
              href: "/WPS%20Service%20Company%20Profile.pdf",
              thumbnail: "/FB%20ADDS-min.jpg",
            },
            {
              title: "WPS Booking Agreement",
              description:
                "Our standard booking agreement and contract terms. Review key details about booking, pricing, cancellation policies, and deliverables for events.",
              fileSize: "1.8 MB",
              pages: "8",
              href: "/WPS%20Booking%20Agreement.pdf",
              thumbnail: "/00 Advert1.jpg",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <PDFCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
