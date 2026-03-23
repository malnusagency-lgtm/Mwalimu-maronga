"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, MessageCircle, Star } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CTASection from "@/components/ui/CTASection";
import { tutoringPlans } from "@/data/tutoring";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Are sessions conducted online or in-person?", a: "Both options are available. Online sessions use Google Meet or Zoom. In-person sessions in Nairobi can be arranged on request." },
  { q: "How do I pay for sessions?", a: "Payments are made via M-Pesa. You'll receive payment details when you book through WhatsApp." },
  { q: "What level are the sessions pitched at?", a: "Sessions are tailored for KCSE students (Form 1–4), though adults learning Kiswahili are also welcome." },
  { q: "Can I request specific topics to focus on?", a: "Absolutely. Send your topic list when booking and it will be incorporated into your session plan." },
];

export default function TutoringPage() {
  const whatsAppBase = "https://wa.me/254705469192?text=";

  return (
    <>
      {/* Hero */}
      <section className="gradient-green py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold-500/20 text-brand-gold-300 border border-brand-gold-500/30 mb-5">
              Live Tutoring
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Personalized Kiswahili Tutoring
            </h1>
            <p className="text-brand-green-200 text-lg max-w-2xl mx-auto mb-8">
              Get direct mentorship from a KCSE examiner. Sessions tailored to your strengths and weaknesses
              for maximum grade improvement.
            </p>
            <a
              href={`${whatsAppBase}${encodeURIComponent("Hello Mwalimu Maronga! I'm interested in booking a tutoring session. Please let me know the next available slots.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe59] hover:-translate-y-0.5 transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Book a Session on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Mwalimu Maronga */}
      <SectionWrapper className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="green-badge mb-4 inline-flex">Why Choose Mwalimu Maronga</span>
            <h2 className="section-title mb-6">Tutoring with Examiner-Level Insight</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Most tutors teach what they studied. Mwalimu Maronga teaches from experience — both as
              a classroom teacher at Kenya&apos;s top schools, and as a KCSE examiner who has marked
              thousands of student papers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              This gives him an unmatched ability to identify what markers reward, what common
              mistakes cost students marks, and how to guide each student to their full potential.
            </p>
            {[
              "Decade+ of KCSE classroom experience",
              "Certified KCSE Examiner (Paper 102/3)",
              "Knows exactly what markers look for",
              "Personalized sessions — no one-size-fits-all",
              "Available online and in-person (Nairobi)",
              "WhatsApp support between sessions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-brand-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "1,000+", label: "Students Taught" },
              { num: "10+", label: "Years Experience" },
              { num: "3", label: "National Schools" },
              { num: "A–B", label: "Avg Grade Improvement" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-soft text-center border border-gray-100"
              >
                <p className="font-heading text-4xl font-bold text-brand-green-800 mb-1">{item.num}</p>
                <p className="text-gray-500 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing Plans */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="gold-badge mb-4 inline-flex">Pricing Plans</span>
          <h2 className="section-title mb-4">Choose Your Learning Path</h2>
          <p className="section-subtitle mx-auto">
            Flexible tutoring options designed to fit different schedules and budgets.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tutoringPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                "relative rounded-3xl p-8 flex flex-col border transition-all duration-300",
                plan.featured
                  ? "gradient-green text-white border-transparent shadow-green scale-105"
                  : "bg-white border-gray-100 shadow-soft hover:shadow-lg"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold bg-brand-gold-500 text-white shadow-gold">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={cn("font-heading font-bold text-xl mb-1", plan.featured ? "text-white" : "text-gray-900")}>
                  {plan.title}
                </h3>
                <p className={cn("text-sm", plan.featured ? "text-brand-green-200" : "text-gray-500")}>
                  {plan.subtitle}
                </p>
              </div>
              <div className="mb-8">
                <span className={cn("font-heading font-bold text-4xl", plan.featured ? "text-white" : "text-brand-green-800")}>
                  {plan.price}
                </span>
                <span className={cn("text-sm ml-2", plan.featured ? "text-brand-green-300" : "text-gray-400")}>
                  {plan.period}
                </span>
              </div>
              <ul className="flex-1 flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", plan.featured ? "text-brand-gold-400" : "text-brand-green-600")} />
                    <span className={cn("text-sm", plan.featured ? "text-brand-green-100" : "text-gray-600")}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${whatsAppBase}${encodeURIComponent(`Hello! I'd like to sign up for the ${plan.title} tutoring plan (${plan.price} ${plan.period}). Please guide me on how to proceed.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5",
                  plan.featured
                    ? "bg-brand-gold-500 text-white hover:bg-brand-gold-600 shadow-gold"
                    : "bg-brand-green-700 text-white hover:bg-brand-green-800 shadow-green"
                )}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQs */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="green-badge mb-4 inline-flex">FAQ</span>
            <h2 className="section-title mb-4">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100"
              >
                <h4 className="font-heading font-bold text-gray-900 text-base mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Book your first session with Mwalimu Maronga and take the first step toward Kiswahili excellence."
        primaryLabel="Book via WhatsApp"
        primaryHref={`${whatsAppBase}${encodeURIComponent("Hello Mwalimu Maronga! I'd like to book a tutoring session.")}`}
        secondaryLabel="View Materials"
        secondaryHref="/shop"
        whatsApp
      />
    </>
  );
}
