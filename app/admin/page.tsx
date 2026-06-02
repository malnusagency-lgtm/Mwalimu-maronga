"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  ArrowUpRight,
  Plus,
  Eye,
  Package,
  GraduationCap,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Product } from "@/data/products";

// ─── Mini Stat Card ───────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: string;
  trend?: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 border relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-200"
      style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* glow spot */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: color, filter: "blur(24px)" }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && (
          <span
            className="flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-heading font-bold text-white mb-0.5">{value}</p>
      <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
        {label}
      </p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: "#4b5563" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Revenue Mini Chart (CSS bars) ───────────────────────────────────────────
const CHART_DATA = [65, 40, 80, 55, 90, 70, 100, 75, 85, 60, 95, 88];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MiniBarChart() {
  return (
    <div className="flex items-end gap-1.5 h-16 w-full">
      {CHART_DATA.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div
            className="w-full rounded-t transition-all duration-300 group-hover:opacity-100 opacity-80"
            style={{
              height: `${(val / 100) * 64}px`,
              background:
                i === CHART_DATA.length - 1
                  ? "linear-gradient(to top, #1a5c38, #22c55e)"
                  : "rgba(26,92,56,0.4)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Category Pill ────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Linguistics: "#6366f1",
  "Set Books": "#f59e0b",
  Writing: "#10b981",
  Grammar: "#3b82f6",
  Bundle: "#ec4899",
};

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
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

  const totalRevenue = products.reduce((s, p) => s + p.price, 0);
  const featured = products.filter((p) => p.featured).length;
  const categoryCount: Record<string, number> = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] ?? 0) + 1;
  });

  const recentProducts = [...products].slice(0, 5);

  const QUICK_ACTIONS = [
    {
      label: "Add New Product",
      href: "/admin/products/new",
      icon: Plus,
      color: "#1a5c38",
      desc: "Upload a new material",
    },
    {
      label: "View Shop",
      href: "/shop",
      icon: Eye,
      color: "#f59e0b",
      desc: "See the live shop page",
    },
    {
      label: "All Products",
      href: "/admin/products",
      icon: Package,
      color: "#6366f1",
      desc: "Manage your catalogue",
    },
    {
      label: "Tutoring",
      href: "/admin/tutoring",
      icon: GraduationCap,
      color: "#10b981",
      desc: "View session enquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-heading text-2xl font-bold text-white"
            id="admin-dashboard-title"
          >
            Dashboard Overview
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            {new Date().toLocaleDateString("en-KE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
          id="dashboard-add-product-btn"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Total Products"
          value={loading ? "…" : String(products.length)}
          sub={`${featured} featured`}
          color="#1a5c38"
          trend="+2 this month"
        />
        <StatCard
          icon={DollarSign}
          label="Catalogue Value"
          value={loading ? "…" : `KES ${totalRevenue.toLocaleString()}`}
          sub="Sum of all prices"
          color="#f59e0b"
        />
        <StatCard
          icon={Users}
          label="Students Reached"
          value="1,200+"
          sub="Since launch"
          color="#6366f1"
          trend="+18%"
        />
        <StatCard
          icon={Star}
          label="Featured Items"
          value={loading ? "…" : String(featured)}
          sub="Shown on homepage"
          color="#ec4899"
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 border"
          style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-semibold text-white text-base">
                Sales Activity
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                Simulated monthly trend (integrate M-Pesa/Stripe for real data)
              </p>
            </div>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: "rgba(26,92,56,0.2)", color: "#4ade80" }}
            >
              2025
            </span>
          </div>
          <MiniBarChart />
          <div className="flex justify-between mt-2">
            {MONTHS.map((m) => (
              <span key={m} className="text-[9px] flex-1 text-center" style={{ color: "#4b5563" }}>
                {m}
              </span>
            ))}
          </div>
          <div
            className="mt-4 pt-4 border-t flex items-center gap-6"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                This month
              </p>
              <p className="font-heading font-bold text-white text-lg">KES 12,450</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                vs last month
              </p>
              <p className="text-sm font-semibold" style={{ color: "#22c55e" }}>
                ↑ 23%
              </p>
            </div>
            <div className="ml-auto">
              <Link
                href="/admin/analytics"
                className="flex items-center gap-1 text-xs font-medium hover:underline"
                style={{ color: "#f59e0b" }}
              >
                Full Analytics
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div
          className="rounded-2xl p-6 border"
          style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-heading font-semibold text-white text-base mb-5">
            By Category
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryCount).map(([cat, count]) => {
              const color = CATEGORY_COLORS[cat] ?? "#6b7280";
              const pct = Math.round((count / products.length) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-300">{cat}</span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      {count} · {pct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(categoryCount).length === 0 && (
              <p className="text-xs text-center py-8" style={{ color: "#4b5563" }}>
                No products yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div
          className="lg:col-span-2 rounded-2xl border"
          style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <h2 className="font-heading font-semibold text-white text-base">
              Recent Products
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-medium hover:underline flex items-center gap-1"
              style={{ color: "#f59e0b" }}
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {loading ? (
              <div className="px-6 py-10 text-center">
                <div
                  className="inline-block w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#1a5c38", borderTopColor: "transparent" }}
                />
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm" style={{ color: "#4b5563" }}>
                  No products yet.{" "}
                  <Link href="/admin/products/new" style={{ color: "#f59e0b" }}>
                    Add one →
                  </Link>
                </p>
              </div>
            ) : (
              recentProducts.map((p) => {
                const color = CATEGORY_COLORS[p.category] ?? "#6b7280";
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Category dot */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}20` }}
                    >
                      <BookOpen className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{p.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                        {p.category} · {p.pages ? `${p.pages} pages` : "Digital PDF"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-white">{p.priceDisplay}</p>
                      {p.featured && (
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl p-6 border"
          style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-heading font-semibold text-white text-base mb-5">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 group"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  id={`quick-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${action.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white leading-none">{action.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                      {action.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="ml-auto w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#6b7280" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Status Card */}
          <div
            className="mt-4 p-4 rounded-xl border"
            style={{
              background: "rgba(26,92,56,0.1)",
              borderColor: "rgba(26,92,56,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" style={{ color: "#22c55e" }} />
              <span className="text-xs font-semibold text-white">System Status</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Shop page", ok: true },
                { label: "API routes", ok: true },
                { label: "Cloudinary", ok: false, note: "Configure .env.local" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#9ca3af" }}>
                    {s.label}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1`}
                    style={
                      s.ok
                        ? { background: "rgba(34,197,94,0.15)", color: "#22c55e" }
                        : { background: "rgba(245,158,11,0.15)", color: "#f59e0b" }
                    }
                  >
                    {s.ok ? "✓ Online" : s.note ?? "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Activity Feed ── */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="font-heading font-semibold text-white text-base mb-5">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: BookOpen,
              color: "#1a5c38",
              text: "Dashboard initialized for Mwalimu Maronga's platform",
              time: "Just now",
            },
            {
              icon: Package,
              color: "#6366f1",
              text: `${products.length} product(s) loaded into catalogue`,
              time: "On page load",
            },
            {
              icon: Clock,
              color: "#f59e0b",
              text: "Cloudinary integration ready — add credentials to activate",
              time: "Pending setup",
            },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${a.color}20` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    {a.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
