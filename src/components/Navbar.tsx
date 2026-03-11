"use client";

import { Calendar, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`sticky top-0 z-50 flex justify-center p-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <nav className="glass w-full max-w-7xl rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 relative group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase">
            Masum's <span className="text-primary italic">Dental</span> Clinic
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Media", path: "/media" },
            { name: "Blog", path: "/blog" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <Link href="/#appointments" className="hidden md:block">
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all flex items-center gap-2">
            <Calendar size={18} />
            <span>Book Appointment</span>
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[75px] md:top-[85px] left-4 right-4 glass rounded-[1.5rem] md:rounded-2xl border border-white/20 shadow-2xl p-4 md:p-6 flex flex-col gap-5 md:hidden animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex flex-col gap-3 md:gap-4 text-center">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Media", path: "/media" },
              { name: "Blog", path: "/blog" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-foreground/80 font-medium hover:text-primary transition-colors text-base md:text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Link href="/#appointments" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-primary text-white px-6 py-2.5 md:py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
