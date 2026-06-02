"use client";

import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";

const MONTHLY = [
  { month: "Jan", sales: 8, revenue: 2300 },
  { month: "Feb", sales: 5, revenue: 1450 },
  { month: "Mar", sales: 14, revenue: 4180 },
  { month: "Apr", sales: 9, revenue: 2700 },
  { month: "May", sales: 18, revenue: 5400 },
  { month: "Jun", sales: 11, revenue: 3300 },
  { month: "Jul", sales: 22, revenue: 6600 },
  { month: "Aug", sales: 16, revenue: 4800 },
  { month: "Sep", sales: 19, revenue: 5700 },
  { month: "Oct", sales: 13, revenue: 3900 },
  { month: "Nov", sales: 25, revenue: 7500 },
  { month: "Dec", sales: 20, revenue: 6000 },
];

const maxRevenue = Math.max(...MONTHLY.map((m) => m.revenue));

const TOP_PRODUCTS = [
  { title: "Holiday Revision Package", sales: 38, revenue: 37962, color: "#ec4899" },
  { title: "Kiswahili Set Book Analysis", sales: 29, revenue: 10121, color: "#f59e0b" },
  { title: "Isimu Jamii Guide", sales: 24, revenue: 7176, color: "#6366f1" },
  { title: "Insha Masterclass", sales: 18, revenue: 4482, color: "#10b981" },
  { title: "Sarufi Complete Notes", sales: 12, revenue: 3588, color: "#3b82f6" },
];

export default function AnalyticsPage() {
  const totalRevenue = MONTHLY.reduce((s, m) => s + m.revenue, 0);
  const totalSales = MONTHLY.reduce((s, m) => s + m.sales, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white" id="analytics-page-title">
          Analytics
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Sales performance overview — simulated data (integrate M-Pesa/Stripe for live figures)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Total Revenue", value: `KES ${totalRevenue.toLocaleString()}`, color: "#f59e0b", trend: "+23%" },
          { icon: BarChart3, label: "Total Sales", value: `${totalSales} orders`, color: "#1a5c38", trend: "+18%" },
          { icon: Users, label: "Unique Buyers", value: "96", color: "#6366f1", trend: "+12%" },
          { icon: TrendingUp, label: "Avg. Order Value", value: `KES ${Math.round(totalRevenue / totalSales)}`, color: "#ec4899" },
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
              <p className="text-xs mt-0.5 flex items-center justify-between" style={{ color: "#6b7280" }}>
                {s.label}
                {s.trend && (
                  <span style={{ color: "#22c55e" }} className="font-semibold">
                    {s.trend}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="font-heading font-semibold text-white text-base mb-6">Monthly Revenue (KES)</h2>
        <div className="flex items-end gap-2 h-40">
          {MONTHLY.map((m) => {
            const pct = (m.revenue / maxRevenue) * 100;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                <span
                  className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                  style={{ color: "#f59e0b" }}
                >
                  {(m.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full rounded-t transition-all duration-300 group-hover:opacity-100 opacity-70"
                  style={{
                    height: `${pct}%`,
                    minHeight: 4,
                    background: "linear-gradient(to top, #1a5c38, #22c55e)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-3">
          {MONTHLY.map((m) => (
            <span key={m.month} className="text-[9px] flex-1 text-center" style={{ color: "#4b5563" }}>
              {m.month}
            </span>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="font-heading font-semibold text-white text-base mb-5">Top Performing Products</h2>
        <div className="space-y-4">
          {TOP_PRODUCTS.map((p, i) => (
            <div key={p.title} className="flex items-center gap-4">
              <span className="text-xs font-bold w-5 text-center" style={{ color: "#4b5563" }}>
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{p.title}</span>
                  <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                    {p.sales} sales · KES {p.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.sales / TOP_PRODUCTS[0].sales) * 100}%`, background: p.color }}
                  />
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: "#374151" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
