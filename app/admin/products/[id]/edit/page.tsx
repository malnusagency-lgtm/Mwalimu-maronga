import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/db";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

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
            id="edit-product-page-title"
          >
            Edit Product
          </h1>
          <p className="text-sm mt-0.5 truncate max-w-md" style={{ color: "#6b7280" }}>
            {product.title}
          </p>
        </div>
      </div>

      <ProductForm initialData={product} productId={product.id} />
    </div>
  );
}
