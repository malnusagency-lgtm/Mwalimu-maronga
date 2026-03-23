"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Film,
  PenTool,
  ArrowRight,
  MapPin,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CTASection from "@/components/ui/CTASection";

const schools = [
  { name: "Moi Girls' School Nairobi", role: "Senior Kiswahili Teacher", period: "2019–Present", location: "Nairobi" },
];

const roles = [
  { icon: GraduationCap, title: "Kiswahili Teacher", desc: "Over a decade of secondary school teaching across Kenya's top national schools, shaping students with a passion for the language.", color: "bg-brand-green-50 text-brand-green-700" },
  { icon: Award, title: "KCSE Examiner", desc: "Certified KCSE examiner for Kiswahili Paper 102/3 — bringing insider knowledge of the examination process directly to students.", color: "bg-brand-gold-50 text-brand-gold-700" },
  { icon: PenTool, title: "Author & Writer", desc: "Published writer of Isimu Jamii and other Kiswahili study materials, blending academic rigour with accessible language.", color: "bg-brand-green-50 text-brand-green-700" },
  { icon: BookOpen, title: "Set Book Analyst", desc: "Specialist in Kiswahili set book analysis, providing deep literary commentary for KCSE students with exam-focused insights.", color: "bg-brand-gold-50 text-brand-gold-700" },
  { icon: Film, title: "Educational Actor", desc: "Brings language to life through educational drama and performance, making Kiswahili learning dynamic and memorable.", color: "bg-brand-green-50 text-brand-green-700" },
  { icon: Users, title: "Tutor & Mentor", desc: "Dedicated mentor to hundreds of students through group sessions, 1-on-1 coaching, and holiday revision programmes.", color: "bg-brand-gold-50 text-brand-gold-700" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-green py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold-500/20 text-brand-gold-300 border border-brand-gold-500/30 mb-5">
                About Mwalimu Maronga
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                A Life Dedicated to <span className="text-brand-gold-400">Kiswahili Education</span>
              </h1>
              <p className="text-brand-green-200 text-lg leading-relaxed">
                From classroom to examination halls, from the written page to the stage — Mwalimu Victor
                Maronga is redefining what it means to teach and champion the Kiswahili language in Kenya.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src="/maronga profile pic/maronga profile pic.png"
                  alt="Mwalimu Victor Maronga"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <span className="green-badge mb-4 inline-flex">Biography</span>
          <h2 className="section-title mb-8">The Story Behind the Teacher</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-5">
            <p className="leading-relaxed">
              Victor Maronga, widely known as <strong className="text-gray-900">Mwalimu Maronga</strong>, is
              one of Kenya&apos;s most passionate and effective Kiswahili educators. Born with an innate love for
              the Kiswahili language and Kenyan culture, he pursued a career in education that has spanned
              more than a decade of transformative classroom experiences.
            </p>
            <p className="leading-relaxed">
              After graduating with a degree in Education (Kiswahili), Mwalimu Maronga developed a pedagogical
              approach that incorporates drama, music, and creative storytelling into his Kiswahili lessons.
              This innovative methodology drew the attention of the Kenya National Examinations Council, which
              subsequently appointed him as a <strong className="text-gray-900">KCSE Examiner for Paper 102/3</strong>,
              giving him unique insider knowledge of how the examination system works.
            </p>
            <p className="leading-relaxed">
              Currently serving at <strong className="text-gray-900">Moi Girls&apos; School Nairobi</strong> — one
              of Kenya&apos;s most prestigious national schools — Mwalimu Maronga continues to inspire a new generation
              of Kiswahili speakers, writers, and thinkers. His work extends beyond the classroom through
              his published books, digital materials, and social media content that reaches thousands of
              students across the country.
            </p>
            <p className="leading-relaxed">
              A published author of <em className="text-gray-900">Isimu Jamii</em> and an acclaimed educational
              actor, he brings a truly multidimensional approach to language education — one that respects
              both the academic rigour of the subject and the creative, human spirit at its core.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Schools */}
      <SectionWrapper className="bg-gray-50">
        <div className="text-center mb-12">
          <span className="gold-badge mb-4 inline-flex">Experience</span>
          <h2 className="section-title mb-4">Schools of Experience</h2>
          <p className="section-subtitle mx-auto">
            A teaching journey across some of Kenya&apos;s finest educational institutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="w-12 h-12 gradient-green rounded-2xl flex items-center justify-center mb-4 shadow-green">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">{school.name}</h3>
              <p className="text-brand-green-700 font-semibold text-sm mb-2">{school.role}</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MapPin className="w-3 h-3" />
                {school.location}
                <span>·</span>
                {school.period}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Roles */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="green-badge mb-4 inline-flex">Multifaceted Educator</span>
          <h2 className="section-title mb-4">More Than a Teacher</h2>
          <p className="section-subtitle mx-auto">
            Mwalimu Maronga wears many hats — and excels in all of them.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6"
            >
              <div className={`w-11 h-11 rounded-2xl ${role.color} flex items-center justify-center mb-4`}>
                <role.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{role.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        title="Ready to Learn from the Best?"
        subtitle="Whether you need study materials or personalized tutoring, Mwalimu Maronga has what it takes to elevate your Kiswahili."
        primaryLabel="Shop Materials"
        primaryHref="/shop"
        secondaryLabel="Book Tutoring"
        secondaryHref="/tutoring"
      />
    </>
  );
}
