"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

const categories = ["All", "Linguistics", "Set Books", "Writing", "Grammar", "Bundle"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      {/* Header */}
      <section className="gradient-green py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold-500/20 text-brand-gold-300 border border-brand-gold-500/30 mb-5">
              Digital Study Materials
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Kiswahili Resource Shop
            </h1>
            <p className="text-brand-green-200 text-lg max-w-2xl mx-auto">
              Premium PDFs crafted by a certified KCSE examiner. Buy, download instantly, and start excelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <SectionWrapper className="pb-4 pt-10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
            />
          </div>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-green-700 text-white shadow-green"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-400 mb-8">
          Showing <strong className="text-gray-700">{filtered.length}</strong> material
          {filtered.length !== 1 && "s"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📚</p>
            <p className="font-semibold text-gray-600 mb-1">No materials found</p>
            <p className="text-sm">Try a different category or search term.</p>
          </div>
        )}
      </SectionWrapper>

      {/* Delivery Info */}
      <div className="bg-brand-green-50 border-y border-brand-green-100 py-8 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {[
            { emoji: "⚡", title: "Instant Download", desc: "Get your PDF immediately after payment" },
            { emoji: "🔒", title: "Secure Purchase", desc: "Your payment is safe and encrypted" },
            { emoji: "📱", title: "Any Device", desc: "Read on phone, tablet or computer" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.emoji}</span>
              <p className="font-semibold text-brand-green-800 text-sm">{item.title}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
