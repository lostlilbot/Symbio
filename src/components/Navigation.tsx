"use client";

import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n/context";

const navLinks = [
  { name: "home", href: "#home" },
  { name: "curriculum", href: "/curriculum" },
  { name: "admissions", href: "#admissions" },
  { name: "contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-lg">
            S
          </div>
          <span className="font-semibold text-lg tracking-tight group-hover:glow-text transition-all">
            Symbio AI Academy
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-cyan-400 after:to-emerald-400 after:transition-all"
            >
              {t(`navigation.${link.name}`)}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="https://wa.me/50495924662?text=Hello%20Symbio%20AI%20Academy%2C%20I%20am%20interested%20in%20learning%20more%20about%20admissions."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-semibold text-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
          >
            {t("navigation.chatWithAdmissions")}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 mx-4 glass rounded-2xl p-4 animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {t(`navigation.${link.name}`)}
            </a>
          ))}
          <a
            href="https://wa.me/50495924662?text=Hello%20Symbio%20AI%20Academy%2C%20I%20am%20interested%20in%20learning%20more%20about%20admissions."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 w-full px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-semibold"
          >
            {t("navigation.chatWithAdmissions")}
          </a>
        </div>
      )}
    </nav>
  );
}
