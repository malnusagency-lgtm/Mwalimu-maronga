"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Send, MapPin, Clock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const contactItems = [
  {
    icon: Phone,
    label: "Phone / Call",
    value: "+254 705 469 192",
    href: "tel:+254705469192",
    color: "bg-brand-green-50 text-brand-green-700",
    iconColor: "text-brand-green-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Victormaronga5@gmail.com",
    href: "mailto:Victormaronga5@gmail.com",
    color: "bg-brand-gold-50 text-brand-gold-700",
    iconColor: "text-brand-gold-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+254 705 469 192",
    href: "https://wa.me/254705469192",
    color: "bg-green-50 text-green-700",
    iconColor: "text-green-600",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: "#",
    color: "bg-blue-50 text-blue-700",
    iconColor: "text-blue-600",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*New Enquiry from Mwalimu Maronga Website*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/254705469192?text=${msg}`, "_blank");
    setSent(true);
  };

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
              Get In Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Mwalimu Maronga
            </h1>
            <p className="text-brand-green-200 text-lg max-w-xl mx-auto">
              Have a question about materials, tutoring, or anything else? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="green-badge mb-4 inline-flex">Contact Details</span>
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're a student, parent, or educator — reach out through any channel below.
              The fastest response is always via WhatsApp.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium">{item.label}</p>
                    <p className="text-gray-900 font-semibold text-sm group-hover:text-brand-green-700 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254705469192"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe59] hover:-translate-y-0.5 transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp — Fastest Response
            </a>

            <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Mon–Sat · 8:00 AM – 8:00 PM (EAT)</span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-brand-green-100 flex items-center justify-center mb-4">
                  <Send className="w-7 h-7 text-brand-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">
                  Your enquiry was opened in WhatsApp. Mwalimu Maronga will respond shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 flex flex-col gap-5"
              >
                <h3 className="font-heading text-xl font-bold text-gray-900">Send an Enquiry</h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Full Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Phone (WhatsApp)</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Subject *</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500 bg-white"
                  >
                    <option value="">Select a topic…</option>
                    <option>Buying a Study Material (PDF)</option>
                    <option>Booking a Tutoring Session</option>
                    <option>Holiday Revision Programme</option>
                    <option>General Enquiry</option>
                    <option>Partnership / Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us more about what you need…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-4"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>

                <p className="text-center text-gray-400 text-xs">
                  This form will open WhatsApp with your message pre-filled.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
