"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Upload,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: BookOpen,
    children: [
      { label: "All Products", href: "/admin/products" },
      { label: "Add Product", href: "/admin/products/new", icon: Upload },
    ],
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Tutoring",
    href: "/admin/tutoring",
    icon: GraduationCap,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>("/admin/products");

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className={cn(
        "flex flex-col shrink-0 transition-all duration-300 border-r",
        collapsed ? "w-[72px]" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, #0d1a12 0%, #0f1a14 100%)",
        borderColor: "rgba(26,92,56,0.3)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "rgba(26,92,56,0.3)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
        >
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-heading font-bold text-white text-sm leading-none">Admin Panel</p>
            <p className="text-xs mt-0.5" style={{ color: "#f59e0b" }}>
              Mwalimu Maronga
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          const hasChildren = item.children && item.children.length > 0;
          const groupOpen = openGroup === item.href;

          return (
            <div key={item.href}>
              <button
                onClick={() => {
                  if (hasChildren) {
                    setOpenGroup(groupOpen ? null : item.href);
                  }
                }}
                className="w-full"
              >
                {hasChildren ? (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group",
                      active || groupOpen
                        ? "text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                    style={
                      active || groupOpen
                        ? { background: "rgba(26,92,56,0.4)", color: "#fff" }
                        : {}
                    }
                  >
                    <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
                        <ChevronRight
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            groupOpen && "rotate-90"
                          )}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                      active
                        ? "text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                    style={
                      active
                        ? { background: "rgba(26,92,56,0.4)", color: "#fff" }
                        : {}
                    }
                  >
                    <Icon className="flex-shrink-0" style={{ width: 18, height: 18 }} />
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                    {active && !collapsed && (
                      <div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: "#f59e0b" }}
                      />
                    )}
                  </Link>
                )}
              </button>

              {/* Children */}
              {hasChildren && groupOpen && !collapsed && (
                <div className="ml-8 mt-1 space-y-0.5">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                        pathname === child.href
                          ? "text-white"
                          : "text-gray-500 hover:text-gray-300"
                      )}
                      style={
                        pathname === child.href
                          ? { color: "#f59e0b" }
                          : {}
                      }
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer links */}
      <div
        className="px-3 py-4 border-t space-y-1"
        style={{ borderColor: "rgba(26,92,56,0.3)" }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ExternalLink style={{ width: 18, height: 18 }} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">View Site</span>}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t transition-all duration-200 hover:bg-white/5"
        style={{ borderColor: "rgba(26,92,56,0.3)", color: "#6b7280" }}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
