import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Add New Product" };

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:bg-white/5"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1
            className="font-heading text-2xl font-bold text-white"
            id="new-product-page-title"
          >
            Add New Product
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
            Fill in the details and upload a cover image to publish a new material.
          </p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
