"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Search, Plus, LogOut } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 17
      ? "Good afternoon"
      : "Good evening";

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b shrink-0"
      style={{
        background: "#0f1117",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Left: Greeting */}
      <div>
        <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
          {greeting}, Mwalimu 👋
        </p>
        <p className="text-sm font-semibold text-white mt-0.5">
          Manage your educational platform
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "#6b7280",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Quick search…</span>
          <kbd
            className="ml-2 text-[10px] px-1.5 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.08)", color: "#6b7280" }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Add Product */}
        <Link
          href="/admin/products/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
          id="admin-add-product-btn"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 hover:bg-white/5"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
          id="admin-notifications-btn"
        >
          <Bell className="w-4 h-4 text-gray-400" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#f59e0b" }}
          />
        </button>

        {/* Avatar + Logout */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white border border-white/10"
            style={{ background: "linear-gradient(135deg, #1a5c38, #f59e0b)" }}
            title="Mwalimu Maronga"
          >
            MM
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sign out"
            id="admin-logout-btn"
            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 hover:bg-red-500/10 hover:border-red-500/30 disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <LogOut className="w-4 h-4" style={{ color: loggingOut ? "#6b7280" : "#ef4444" }} />
          </button>
        </div>
      </div>
    </header>
  );
}
