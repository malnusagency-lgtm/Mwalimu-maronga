"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, TrendingUp, DollarSign, ArrowUpRight, Package } from "lucide-react";
import { Product } from "@/data/products";

export default function AnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalCatalogueValue = products.reduce((s, p) => s + p.price, 0);
  const featured = products.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white" id="analytics-page-title">
          Analytics
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Real-time stats from your catalogue · Sales data will appear once M-Pesa / Stripe is connected
        </p>
      </div>

      {/* Live Catalogue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Package,
            label: "Total Products",
            value: loading ? "…" : String(products.length),
            color: "#1a5c38",
          },
          {
            icon: DollarSign,
            label: "Catalogue Value",
            value: loading ? "…" : `KES ${totalCatalogueValue.toLocaleString()}`,
            color: "#f59e0b",
          },
          {
            icon: TrendingUp,
            label: "Featured Items",
            value: loading ? "…" : String(featured),
            color: "#6366f1",
          },
          {
            icon: BarChart3,
            label: "Total Sales",
            value: "—",
            color: "#ec4899",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-5 border"
              style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${s.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className="text-xl font-heading font-bold text-white">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sales chart — pending integration */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-white text-base">Revenue Chart</h2>
            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
              Monthly sales data will display here after M-Pesa integration
            </p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
          >
            Coming soon
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <BarChart3 className="w-12 h-12 mb-4" style={{ color: "rgba(255,255,255,0.12)" }} />
          <p className="text-sm font-medium" style={{ color: "#6b7280" }}>
            No revenue data yet
          </p>
          <p className="text-xs mt-1.5 text-center max-w-xs" style={{ color: "#4b5563" }}>
            Once M-Pesa or Stripe is connected, your monthly sales and revenue will appear here automatically.
          </p>
        </div>
      </div>

      {/* Top Products — real data */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-semibold text-white text-base">Your Products</h2>
          <Link
            href="/admin/products"
            className="text-xs font-medium flex items-center gap-1 hover:underline"
            style={{ color: "#f59e0b" }}
          >
            Manage <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#1a5c38", borderTopColor: "transparent" }}
            />
          </div>
        ) : products.length === 0 ? (
          <p className="text-xs text-center py-8" style={{ color: "#4b5563" }}>
            No products yet.{" "}
            <Link href="/admin/products/new" style={{ color: "#f59e0b" }}>
              Add one →
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                <span className="text-xs font-bold w-5 text-center" style={{ color: "#4b5563" }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{p.title}</span>
                    <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                      {p.priceDisplay} · {p.category}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round((p.price / Math.max(...products.map((x) => x.price))) * 100)}%`,
                        background: p.featured ? "#f59e0b" : "#1a5c38",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
