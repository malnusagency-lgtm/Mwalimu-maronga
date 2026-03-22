import Link from "next/link";
import { GraduationCap, Phone, Mail, MessageCircle, BookOpen, Users, Info, Contact } from "lucide-react";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Shop", href: "/shop" },
      { label: "Tutoring", href: "/tutoring" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Kiswahili Materials", href: "/shop" },
      { label: "Set Book Analysis", href: "/shop/set-book-analysis" },
      { label: "Book a Session", href: "/tutoring" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-green-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-500 flex items-center justify-center shadow-gold flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-lg text-white">Mwalimu Maronga</span>
                <span className="text-[10px] text-brand-gold-400 font-semibold uppercase tracking-widest">
                  Kiswahili Excellence
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Premium Kiswahili education materials and personalized tutoring from a certified KCSE examiner
              with over a decade of classroom experience.
            </p>
            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+254705469192"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-brand-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
                +254 705 469 192
              </a>
              <a
                href="mailto:Victormaronga5@gmail.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-brand-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
                Victormaronga5@gmail.com
              </a>
              <a
                href="https://wa.me/254705469192"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-brand-gold-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-brand-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Mwalimu Maronga. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>KCSE Examiner</span>
            <span className="text-brand-gold-500">·</span>
            <span>Kiswahili Teacher</span>
            <span className="text-brand-gold-500">·</span>
            <span>Set Book Analyst</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
