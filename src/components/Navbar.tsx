"use client";
 
import { useState, useEffect } from "react";
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const links = ["sobre", "projetos", "skills"];
 
  return (
    <nav className={`z-[300] fixed top-0 left-0 right-0 z-50 px-120 py-4 flex items-center justify-between transition-all duration-300 bg-[#120f17] transition-all duration-300"}`}>


      {/* Logo */}
      <a href="/" className="w-11 h-11 rounded-full bg-[#84a98c] flex items-center justify-center text-white font-bold text-sm tracking-wide hover:scale-105 transition-transform duration-200 select-none">AJD</a>
 
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="text-[#FFFFFF] text-sm font-medium hover:text-[#84a98c] transition-colors duration-200 relative group"
          >
            {link}
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#84a98c] rounded-full transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
 
        <a
          href="#contact"
          className="bg-[#84a98c] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#5a6ee0] hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-[#84a98c]/30"
        >
          entrar em contato
        </a>
      </div>
 
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-1"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#3d3d3d] rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#3d3d3d] rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#3d3d3d] rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>
 
      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-[#f5f3ee]/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden md:hidden ${
          menuOpen ? "max-h-64 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 px-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#3d3d3d] text-sm font-medium hover:text-[#84a98c] transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-[#84a98c] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#5a6ee0] transition-all duration-200 w-full text-center"
          >
            entrar em contato
          </a>
        </div>
      </div>
    </nav>
  );
}