"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2, BookOpen, GraduationCap, AlertCircle, CheckCircle } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.replace(from);
      } else {
        setError(data.error ?? "Login failed. Please check your credentials.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0d1a12 0%, #0f1117 50%, #0a0e14 100%)" }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "#1a5c38", filter: "blur(120px)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "#f59e0b", filter: "blur(120px)" }}
        />
      </div>

      <div
        className="relative w-full max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease",
        }}
      >
        {/* Card */}
        <div
          className="rounded-3xl border p-8 shadow-2xl"
          style={{
            background: "rgba(22,27,34,0.95)",
            borderColor: "rgba(26,92,56,0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
              >
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1
              className="font-heading text-2xl font-bold text-white mb-1"
              id="login-title"
            >
              Admin Portal
            </h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Mwalimu Maronga · Educational Platform
            </p>
          </div>

          {/* Stats strip */}
          <div
            className="flex items-center justify-around py-3 px-4 rounded-2xl mb-8 border"
            style={{
              background: "rgba(26,92,56,0.08)",
              borderColor: "rgba(26,92,56,0.2)",
            }}
          >
            {[
              { icon: BookOpen, label: "5 Products" },
              { icon: GraduationCap, label: "1,200+ Students" },
              { icon: CheckCircle, label: "KCSE Examiner" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: "#1a5c38" }} />
                  <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280" }}
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-xl border text-sm text-white outline-none transition-all duration-200 placeholder-gray-600"
                style={{
                  background: "#0f1117",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5c38")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border text-sm text-white outline-none transition-all duration-200 placeholder-gray-600"
                  style={{
                    background: "#0f1117",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5c38")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
                  style={{ color: "#4b5563" }}
                  id="toggle-password-visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 p-3.5 rounded-xl border text-sm"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.2)",
                  color: "#fca5a5",
                }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              id="login-submit-btn"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs mt-6" style={{ color: "#374151" }}>
            🔒 Secure admin access · Mwalimu Maronga Platform
          </p>
        </div>

        {/* Bottom badge */}
        <div className="text-center mt-4">
          <span className="text-xs" style={{ color: "#374151" }}>
            Protected route · Unauthorized access is prohibited
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
