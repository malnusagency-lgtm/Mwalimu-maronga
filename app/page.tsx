"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Star,
  Award,
  Users,
  GraduationCap,
  MessageCircle,
  Play,
  CheckCircle,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CTASection from "@/components/ui/CTASection";
import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const credentials = [
  "KCSE Kiswahili Examiner (Paper 102/3)",
  "Teacher at Moi Girls' Nairobi",
  "Published Writer – Isimu Jamii",
  "Set Book Analyst & Educational Actor",
];

const videoCards = [
  {
    id: "yt1",
    platform: "YouTube",
    title: "KCSE Kiswahili Insha Tips – Score A",
    views: "12K views",
    color: "from-red-500 to-red-700",
    icon: "▶",
  },
  {
    id: "yt2",
    platform: "YouTube",
    title: "Isimu Jamii – Full Revision Notes",
    views: "8K views",
    color: "from-red-500 to-red-700",
    icon: "▶",
  },
  {
    id: "tk1",
    platform: "TikTok",
    title: "Kiswahili vines: Sarufi ya Kesho 🤣",
    views: "45K views",
    color: "from-gray-900 to-gray-700",
    icon: "♪",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const featured = getFeaturedProducts().slice(0, 3);

  const stats = [
    { icon: GraduationCap, label: t.stats.examiner, value: "Paper 102/3", color: "text-brand-gold-500" },
    { icon: Users, label: t.stats.taught, value: "1,000+", color: "text-brand-green-500" },
    { icon: Award, label: t.stats.schools, value: "Moi Girls' Nairobi", color: "text-brand-gold-500" },
    { icon: BookOpen, label: t.stats.materials, value: "5 PDFs", color: "text-brand-green-500" },
  ];

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-green">
        {/* Background decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-gold-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="gold-badge mb-6 inline-flex">
                  <Star className="w-3 h-3 fill-current" />
                  {t.hero.badge}
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  {t.hero.title1}
                  <span className="text-gradient-gold bg-clip-text text-transparent">
                    {t.hero.title2}
                  </span>
                </h1>
                <p className="text-brand-green-200 text-lg leading-relaxed mb-8 max-w-xl">
                  {t.hero.desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop" className="btn-gold px-8 py-4 text-base">
                    <BookOpen className="w-5 h-5" />
                    {t.hero.shopMaterials}
                  </Link>
                  <Link
                    href="/tutoring"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {t.hero.bookTutoring}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Quick credentials */}
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2">
                  {credentials.slice(0, 4).map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-green-200 text-xs">{c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-brand-gold-400/20 blur-2xl scale-110" />
                <div className="relative w-72 h-80 md:w-96 md:h-[460px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <Image
                    src="/maronga profile pic/maronga profile pic.png"
                    alt="Mwalimu Maronga – Kiswahili Teacher and KCSE Examiner"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                      <p className="text-white font-semibold text-sm">Mwalimu Victor Maronga</p>
                      <p className="text-brand-gold-300 text-xs">KCSE Examiner · Kiswahili 102/3</p>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-brand-gold-500 text-white rounded-2xl px-4 py-2 shadow-gold text-sm font-bold">
                  10+ Years
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="font-heading font-bold text-white text-xl">{stat.value}</p>
                <p className="text-brand-green-300 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ ABOUT PREVIEW ══════════ */}
      <SectionWrapper className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="green-badge mb-4 inline-flex">{t.about.badge}</span>
            <h2 className="section-title mb-6">
              {t.about.title1}
              <span className="text-gradient-green">{t.about.title2}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t.about.desc1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t.about.desc2}
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {credentials.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{c}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-primary">
              {t.about.readFull}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 gradient-green rounded-3xl rotate-3 opacity-20" />
            <div className="relative rounded-3xl overflow-hidden h-[480px] shadow-2xl">
              <Image
                src="/maronga profile pic/maronga profile pic.png"
                alt="Mwalimu Maronga in the classroom"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft p-5 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-brand-gold-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-900 font-semibold text-sm">&quot;Best Kiswahili teacher!&quot;</p>
              <p className="text-gray-400 text-xs mt-0.5">— Past Student, Moi Girls Nairobi</p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <SectionWrapper id="shop">
        <div className="text-center mb-12">
          <span className="gold-badge mb-4 inline-flex">Digital Materials</span>
          <h2 className="section-title mb-4">Premium Kiswahili Resources</h2>
          <p className="section-subtitle mx-auto">
            Study materials crafted from the examiner&apos;s desk — designed to get you the grade you deserve.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/shop" className="btn-outline">
            View All Materials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ══════════ TUTORING HIGHLIGHT ══════════ */}
      <SectionWrapper className="gradient-green">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-brand-gold-300 border border-white/20 mb-4">
              Live Tutoring
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Learn Directly from a KCSE Examiner
            </h2>
            <p className="text-brand-green-200 leading-relaxed mb-8">
              Get personalized guidance through 1-on-1 sessions, collaborative group classes, or
              intensive holiday revision programmes. Every session is tailored to your weaknesses
              and designed to maximize your exam performance.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "1-on-1", desc: "Personalized" },
                { label: "Group", desc: "Collaborative" },
                { label: "Holiday", desc: "Intensive" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
                  <p className="font-heading font-bold text-white text-lg">{item.label}</p>
                  <p className="text-brand-green-300 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/tutoring"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gold-500 text-white font-semibold hover:bg-brand-gold-600 hover:-translate-y-0.5 transition-all duration-200 shadow-gold"
            >
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { emoji: "🎯", title: "Examiner Insight", desc: "Know exactly what markers look for in every question type." },
              { emoji: "📚", title: "All 4 Papers Covered", desc: "Comprehensive coverage of Kiswahili Papers 1, 2, 3 and 4." },
              { emoji: "💬", title: "WhatsApp Support", desc: "Ongoing support between sessions via WhatsApp." },
              { emoji: "📊", title: "Progress Tracking", desc: "Monthly mock exams with detailed feedback reports." },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-5 border border-white/10 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-brand-green-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ══════════ SOCIAL PROOF / VIDEOS ══════════ */}
      <SectionWrapper className="bg-gray-50">
        <div className="text-center mb-12">
          <span className="green-badge mb-4 inline-flex">Watch & Learn</span>
          <h2 className="section-title mb-4">Educational Content Online</h2>
          <p className="section-subtitle mx-auto">
            Free Kiswahili lessons, tips, and entertaining content across YouTube and TikTok.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {videoCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="card group cursor-pointer"
            >
              <div className={`relative h-44 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {card.platform}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h4>
                <p className="text-gray-400 text-xs">{card.views}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ══════════ CTA ══════════ */}
      <CTASection
        title="Ready to Excel in Kiswahili?"
        subtitle="Join hundreds of students who have improved their grades with Mwalimu Maronga's expert guidance and premium materials."
        primaryLabel="Shop Materials"
        primaryHref="/shop"
        secondaryLabel="WhatsApp Us"
        secondaryHref="https://wa.me/254705469192"
        whatsApp
      />
    </>
  );
}
