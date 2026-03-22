"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/tutoring", label: "Tutoring" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-green flex items-center justify-center shadow-green flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-base text-brand-green-800 tracking-tight">
                  Mwalimu Maronga
                </span>
                <span className="text-[10px] text-brand-gold-600 font-semibold uppercase tracking-widest hidden sm:block">
                  Kiswahili Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "bg-brand-green-50 text-brand-green-800 font-semibold"
                      : "text-gray-600 hover:text-brand-green-800 hover:bg-brand-green-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/shop" className="btn-gold text-xs px-4 py-2 gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Get Materials
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "bg-brand-green-50 text-brand-green-800 font-semibold"
                      : "text-gray-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-1">
                <Link href="/shop" className="btn-gold w-full justify-center text-sm py-3">
                  <BookOpen className="w-4 h-4" />
                  Get Materials
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
