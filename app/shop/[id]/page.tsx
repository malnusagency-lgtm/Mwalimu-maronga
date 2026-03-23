"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShoppingCart,
  MessageCircle,
  ArrowLeft,
  FileText,
  Tag,
  Star,
} from "lucide-react";
import { getProductById } from "@/data/products";
import { use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const whatsAppMsg = encodeURIComponent(
    `Hello Mwalimu Maronga! I'd like to purchase: ${product.title} (${product.priceDisplay}). Please guide me on how to pay.`
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/shop" className="flex items-center gap-1 hover:text-brand-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-gray-50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold bg-brand-gold-500 text-white shadow-gold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Preview Strip */}
            {product.preview && (
              <div className="mt-4 bg-brand-green-50 border border-brand-green-100 rounded-2xl p-5">
                <p className="text-brand-green-800 font-semibold text-sm mb-1">📖 Content Preview</p>
                <p className="text-brand-green-700 text-sm leading-relaxed italic">{product.preview}</p>
              </div>
            )}
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category + tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="green-badge">{product.category}</span>
              {product.pages && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  <FileText className="w-3 h-3" />
                  {product.pages} pages
                </span>
              )}
              {product.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-500">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.longDescription}</p>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="font-heading font-bold text-gray-900 text-base mb-4">What&apos;s Included</h3>
              <div className="flex flex-col gap-3">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-brand-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="bg-white border-2 border-brand-green-100 rounded-3xl p-6 shadow-soft">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-heading text-4xl font-bold text-brand-green-800">
                  {product.priceDisplay}
                </span>
              </div>
              <p className="text-gray-400 text-xs mb-6">One-time purchase · PDF instant download</p>

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/254705469192?text=${whatsAppMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe59] hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  Buy via WhatsApp
                </a>
                <button className="w-full btn-primary py-4 text-sm justify-center">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              <p className="text-center text-gray-400 text-xs mt-4">
                🔒 Secure payment · Instant delivery
              </p>
            </div>

            {/* Examiner badge */}
            <div className="mt-6 flex items-center gap-3 p-4 bg-brand-gold-50 border border-brand-gold-100 rounded-2xl">
              <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <div>
                <p className="text-brand-gold-800 font-semibold text-sm">Created by a KCSE Examiner</p>
                <p className="text-brand-gold-600 text-xs">Paper 102/3 · Certified by KNEC</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
