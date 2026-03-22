"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  whatsApp?: boolean;
}

export default function CTASection({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  whatsApp,
}: CTASectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-green rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold-400/10 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-brand-green-200 text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gold-500 text-white font-semibold hover:bg-brand-gold-600 hover:shadow-gold hover:-translate-y-0.5 transition-all duration-200"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className={
                    whatsApp
                      ? "inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe59] hover:-translate-y-0.5 transition-all duration-200"
                      : "inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
                  }
                >
                  {whatsApp && <MessageCircle className="w-4 h-4" />}
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
