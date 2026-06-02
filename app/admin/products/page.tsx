"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Star,
  BookOpen,
  Filter,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Product } from "@/data/products";

const CATEGORY_COLORS: Record<string, string> = {
  Linguistics: "#6366f1",
  "Set Books": "#f59e0b",
  Writing: "#10b981",
  Grammar: "#3b82f6",
  Bundle: "#ec4899",
};

const ALL_CATEGORIES = ["All", "Linguistics", "Set Books", "Writing", "Grammar", "Bundle"];

type SortKey = "title" | "price" | "category";
type SortDir = "asc" | "desc";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        showToast("success", "Product deleted successfully.");
      } else {
        const data = await res.json();
        showToast("error", data.error ?? "Cannot delete a static product.");
      }
    } catch {
      showToast("error", "Network error – please try again.");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" style={{ color: "#f59e0b" }} />
    ) : (
      <ChevronDown className="w-3 h-3" style={{ color: "#f59e0b" }} />
    );
  };

  const filtered = products
    .filter((p) => {
      const q = query.toLowerCase();
      const matchQ =
        !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      return matchQ && matchCat;
    })
    .sort((a, b) => {
      let av: string | number = a[sortKey];
      let bv: string | number = b[sortKey];
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
    });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-heading text-2xl font-bold text-white"
            id="products-page-title"
          >
            Products
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            {products.length} total materials in catalogue
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
          id="products-add-btn"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div
        className="rounded-2xl p-4 border flex flex-wrap items-center gap-3"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border flex-1 min-w-[200px]"
          style={{ background: "#0f1117", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#6b7280" }} />
          <input
            id="products-search"
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5" style={{ color: "#6b7280" }} />
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={
                category === cat
                  ? { background: "rgba(26,92,56,0.4)", color: "#fff" }
                  : { color: "#6b7280", background: "rgba(255,255,255,0.04)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        {/* Table header */}
        <div
          className="grid items-center px-6 py-3 border-b text-xs font-semibold uppercase tracking-wide"
          style={{
            gridTemplateColumns: "2.5rem 1fr 8rem 7rem 6rem 6rem 5rem",
            borderColor: "rgba(255,255,255,0.07)",
            color: "#4b5563",
          }}
        >
          <span>#</span>
          <button
            className="flex items-center gap-1 text-left hover:text-white transition-colors"
            onClick={() => toggleSort("title")}
          >
            Title <SortIcon col="title" />
          </button>
          <button
            className="flex items-center gap-1 hover:text-white transition-colors"
            onClick={() => toggleSort("category")}
          >
            Category <SortIcon col="category" />
          </button>
          <button
            className="flex items-center gap-1 hover:text-white transition-colors"
            onClick={() => toggleSort("price")}
          >
            Price <SortIcon col="price" />
          </button>
          <span>Pages</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#1a5c38", borderTopColor: "transparent" }}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: "#374151" }} />
            <p className="text-sm" style={{ color: "#4b5563" }}>
              No products match your search.
            </p>
          </div>
        ) : (
          filtered.map((p, i) => {
            const color = CATEGORY_COLORS[p.category] ?? "#6b7280";
            const isDynamic = p.id.startsWith("dyn-");
            return (
              <div
                key={p.id}
                className="grid items-center px-6 py-4 border-b hover:bg-white/[0.02] transition-colors"
                style={{
                  gridTemplateColumns: "2.5rem 1fr 8rem 7rem 6rem 6rem 5rem",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                {/* Index */}
                <span className="text-xs font-medium" style={{ color: "#4b5563" }}>
                  {i + 1}
                </span>

                {/* Title + thumbnail */}
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 relative">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#6b7280" }}>
                      {p.slug}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ background: `${color}20`, color }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Price */}
                <span className="text-sm font-semibold text-white">{p.priceDisplay}</span>

                {/* Pages */}
                <span className="text-sm" style={{ color: "#6b7280" }}>
                  {p.pages ?? "—"}
                </span>

                {/* Featured */}
                <div>
                  {p.featured ? (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
                    >
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: "#374151" }}>
                      —
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/shop/${p.id}`}
                    target="_blank"
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                    title="View in shop"
                  >
                    <Edit3 className="w-3.5 h-3.5" style={{ color: "#6b7280" }} />
                  </Link>
                  {isDynamic && (
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                      title="Delete product"
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-xs text-center" style={{ color: "#374151" }}>
        Static products (pre-coded) cannot be deleted from the dashboard. Use the product form to
        add dynamic products that are fully manageable here.
      </p>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div
            className="relative rounded-2xl p-6 w-full max-w-sm border shadow-2xl"
            style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(239,68,68,0.15)" }}
            >
              <AlertTriangle className="w-6 h-6" style={{ color: "#ef4444" }} />
            </div>
            <h3 className="text-white font-heading font-semibold text-center text-lg mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-center mb-6" style={{ color: "#9ca3af" }}>
              This will permanently remove this product from the catalogue. This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "#ef4444" }}
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl text-sm font-medium"
            style={
              toast.type === "success"
                ? {
                    background: "#0d1a12",
                    borderColor: "rgba(34,197,94,0.3)",
                    color: "#4ade80",
                  }
                : {
                    background: "#1a0d0d",
                    borderColor: "rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }
            }
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            )}
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}
