"use client";

import { useState } from "react";
import { Save, Globe, Phone, Mail, BookOpen, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteName: "Mwalimu Maronga",
    tagline: "Premium Kiswahili Education",
    whatsapp: "254705469192",
    email: "mwalimumaronga@gmail.com",
    tiktok: "@mwalimumaronga",
    youtube: "@mwalimumaronga",
    defaultCurrency: "KES",
    defaultLanguage: "en",
  });

  const set = (key: keyof typeof form, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white" id="settings-page-title">
          Site Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Configure your platform preferences and contact information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {[
          {
            title: "Brand",
            icon: BookOpen,
            color: "#1a5c38",
            fields: [
              { label: "Site Name", key: "siteName", placeholder: "Mwalimu Maronga" },
              { label: "Tagline", key: "tagline", placeholder: "Premium Kiswahili Education" },
            ],
          },
          {
            title: "Contact",
            icon: Phone,
            color: "#f59e0b",
            fields: [
              { label: "WhatsApp Number", key: "whatsapp", placeholder: "254705469192" },
              { label: "Email Address", key: "email", placeholder: "email@example.com" },
            ],
          },
          {
            title: "Social Media",
            icon: Globe,
            color: "#6366f1",
            fields: [
              { label: "TikTok Handle", key: "tiktok", placeholder: "@handle" },
              { label: "YouTube Channel", key: "youtube", placeholder: "@channel" },
            ],
          },
          {
            title: "Defaults",
            icon: Mail,
            color: "#ec4899",
            fields: [
              { label: "Default Currency", key: "defaultCurrency", placeholder: "KES" },
              { label: "Default Language", key: "defaultLanguage", placeholder: "en" },
            ],
          },
        ].map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-2xl p-6 border space-y-4"
              style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${section.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: section.color }} />
                </div>
                <h2 className="font-heading font-semibold text-white text-sm">{section.title}</h2>
              </div>
              {section.fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {f.label}
                  </label>
                  <input
                    id={`settings-${f.key}`}
                    type="text"
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => set(f.key as keyof typeof form, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm text-white outline-none placeholder-gray-600 transition-all"
                    style={{ background: "#0f1117", borderColor: "rgba(255,255,255,0.1)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5c38")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              ))}
            </div>
          );
        })}

        {/* Cloudinary config reminder */}
        <div
          className="rounded-2xl p-5 border text-sm"
          style={{ background: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}
        >
          <p className="font-semibold mb-2" style={{ color: "#fbbf24" }}>
            🔑 Cloudinary Configuration
          </p>
          <p style={{ color: "#9ca3af" }} className="text-xs leading-relaxed">
            To enable image uploads, add these to your{" "}
            <code className="font-mono text-white">.env.local</code> file and restart the dev server:
          </p>
          <pre
            className="mt-3 p-3 rounded-xl text-xs font-mono"
            style={{ background: "#0f1117", color: "#4ade80" }}
          >{`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset`}</pre>
        </div>

        <button
          type="submit"
          id="settings-save-btn"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
