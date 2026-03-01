import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Video", href: "#video" },
  { label: "Download", href: "#download" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#000]/90 ${
        scrolled
          ? "backdrop-blur-md shadow-sm border-b border-[#1C1A17]/8"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-['Fraunces'] text-xl font-bold text-white tracking-tight"
        >
          Walking Photobooth Services<span className="text-[#C0522B]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="font-['Space_Grotesk'] text-xs font-500 tracking-[0.12em] uppercase text-white/70 hover:text-[#C0522B] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={(e) => handleNav(e, "#download")}
            className="font-['Space_Grotesk'] text-xs tracking-[0.1em] uppercase bg-white text-[#1C1A17] px-5 py-2.5 hover:bg-[#C0522B] transition-colors duration-300"
          >
            Get PDF
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1C1A17]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-[#1C1A17]/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="font-['Space_Grotesk'] text-xs tracking-[0.12em] uppercase text-[#1C1A17]/70 hover:text-[#C0522B] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
