"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Star, FileText } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const whatsAppMsg = encodeURIComponent(
    `Hello Mwalimu Maronga! I'd like to purchase: ${product.title} (${product.priceDisplay}). Please guide me on how to pay and receive the PDF.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={cn("card group flex flex-col h-full", className)}
    >
      {/* Book Cover Image */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
        />
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-brand-gold-500 text-white shadow-gold">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}
        {/* Category Tag */}
        <div className="absolute top-3 right-3">
          <span className="green-badge">{product.category}</span>
        </div>
        {/* Pages indicator */}
        {product.pages && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-black/50 text-white backdrop-blur-sm">
              <FileText className="w-3 h-3" />
              {product.pages} pages
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-brand-green-700 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="font-heading text-2xl font-bold text-brand-green-800">
            {product.priceDisplay}
          </span>
          <a
            href={`https://wa.me/254705469192?text=${whatsAppMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-2xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 shadow-md whitespace-nowrap"
            style={{ background: "#25D366" }}
            id={`buy-whatsapp-${product.id}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Buy via WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
