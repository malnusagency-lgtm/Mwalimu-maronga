"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  CheckCircle,
  Loader2,
  FileDown,
  AlertCircle,
  Tag,
  FileText,
  Star,
} from "lucide-react";
import { CloudinaryUploader } from "./CloudinaryUploader";
import { CloudinaryPdfUploader } from "./CloudinaryPdfUploader";
import { Product } from "@/data/products";

const CATEGORIES = ["Linguistics", "Set Books", "Writing", "Grammar", "Bundle"];
const COMMON_TAGS = ["KCSE", "Form 4", "Form 3", "Kiswahili", "Insha", "Sarufi", "Isimu Jamii", "Set Books", "Grammar", "Holiday", "Bundle", "Essay"];

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface FormState {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: string;
  category: string;
  tags: string[];
  benefits: string[];
  pages: string;
  featured: boolean;
  preview: string;
  image: string;
  pdfUrl: string;
}

// Separate type for validation error messages — all string fields only
type FormErrors = {
  title?: string;
  slug?: string;
  description?: string;
  price?: string;
  image?: string;
  category?: string;
};

const INITIAL: FormState = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  price: "",
  category: "Linguistics",
  tags: [],
  benefits: [""],
  pages: "",
  featured: false,
  preview: "",
  image: "",
  pdfUrl: "",
};

// ─── Section wrapper ────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 border space-y-5"
      style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <h2 className="font-heading font-semibold text-white text-sm uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {label}
        {required && <span style={{ color: "#f59e0b" }}>*</span>}
      </label>
      {children}
      {hint && <p className="text-xs" style={{ color: "#4b5563" }}>{hint}</p>}
    </div>
  );
}

// ─── Text Input ────────────────────────────────────────────────────
function Input({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border text-sm text-white outline-none transition-all duration-200 focus:border-brand-green placeholder-gray-600"
      style={{
        background: "#0f1117",
        borderColor: "rgba(255,255,255,0.1)",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5c38")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      {...rest}
    />
  );
}

// ─── Textarea ────────────────────────────────────────────────────────
function Textarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl border text-sm text-white outline-none transition-all duration-200 resize-none placeholder-gray-600"
      style={{
        background: "#0f1117",
        borderColor: "rgba(255,255,255,0.1)",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5c38")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────
export function ProductForm({
  initialData,
  productId,
}: {
  /** When provided, the form starts in edit mode pre-filled with this data */
  initialData?: Product;
  /** The ID of the product being edited (required when initialData is set) */
  productId?: string;
}) {
  const isEditMode = !!(initialData && productId);
  const router = useRouter();

  const buildInitial = (): FormState => {
    if (!initialData) return INITIAL;
    return {
      title: initialData.title,
      slug: initialData.slug,
      description: initialData.description,
      longDescription: initialData.longDescription ?? "",
      price: String(initialData.price),
      category: initialData.category,
      tags: initialData.tags ?? [],
      benefits: initialData.benefits.length > 0 ? initialData.benefits : [""],
      pages: initialData.pages ? String(initialData.pages) : "",
      featured: initialData.featured,
      preview: initialData.preview ?? "",
      image: initialData.image,
      pdfUrl: initialData.pdfUrl ?? "",
    };
  };

  const [form, setForm] = useState<FormState>(buildInitial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (key: keyof FormState, value: FormState[typeof key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    set("title", title);
    set("slug", slugify(title));
  };

  const toggleTag = (tag: string) => {
    set(
      "tags",
      form.tags.includes(tag) ? form.tags.filter((t) => t !== tag) : [...form.tags, tag]
    );
  };

  const setBenefit = (i: number, val: string) => {
    const next = [...form.benefits];
    next[i] = val;
    set("benefits", next);
  };

  const addBenefit = () => set("benefits", [...form.benefits, ""]);
  const removeBenefit = (i: number) =>
    set(
      "benefits",
      form.benefits.filter((_, idx) => idx !== i)
    );

  const validate = () => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Short description is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Valid price required";
    if (!form.image) e.image = "Please upload a product image";
    if (!form.category) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        priceDisplay: `KES ${Number(form.price).toLocaleString()}`,
        pages: form.pages ? Number(form.pages) : undefined,
        benefits: form.benefits.filter((b) => b.trim()),
      };

      const url = isEditMode
        ? `/api/products?id=${productId}`
        : "/api/products";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        if (!isEditMode) setForm(INITIAL);
        setTimeout(() => router.push("/admin/products"), 2000);
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to save product.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: "#22c55e" }} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          {isEditMode ? "Product Updated!" : "Product Published!"}
        </h2>
        <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
          {isEditMode
            ? "Your changes have been saved. Redirecting…"
            : "Your new material is live in the shop. Redirecting…"}
        </p>
        <div
          className="w-48 h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full animate-pulse"
            style={{ width: "60%", background: "#1a5c38" }}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left column (main fields) ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section title="Basic Information">
            <Field label="Product Title" required>
              <Input
                id="product-title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Isimu Jamii – Kiswahili Linguistics Guide"
              />
              {errors.title && (
                <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                  {errors.title}
                </p>
              )}
            </Field>

            <Field
              label="URL Slug"
              hint="Auto-generated from title. Edit if needed."
            >
              <div className="flex items-center">
                <span
                  className="px-3 py-3 rounded-l-xl text-xs border-r-0 border text-gray-500"
                  style={{
                    background: "#0a0e14",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  /shop/
                </span>
                <input
                  id="product-slug"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="flex-1 px-3 py-3 rounded-r-xl border text-sm text-white outline-none"
                  style={{
                    background: "#0f1117",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Price (KES)" required>
                <Input
                  id="product-price"
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="299"
                  min="0"
                />
                {errors.price && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.price}
                  </p>
                )}
              </Field>
              <Field label="Number of Pages">
                <Input
                  id="product-pages"
                  type="number"
                  value={form.pages}
                  onChange={(e) => set("pages", e.target.value)}
                  placeholder="85"
                  min="1"
                />
              </Field>
            </div>

            <Field label="Short Description" required hint="Shown on product cards (1–2 sentences)">
              <Textarea
                id="product-description"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="A comprehensive guide to Kiswahili sociolinguistics for KCSE candidates…"
                rows={2}
              />
              {errors.description && (
                <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                  {errors.description}
                </p>
              )}
            </Field>

            <Field label="Long Description" hint="Shown on the product detail page">
              <Textarea
                id="product-long-description"
                value={form.longDescription}
                onChange={(e) => set("longDescription", e.target.value)}
                placeholder="This in-depth guide covers all core topics of Isimu Jamii as examined in the KCSE…"
                rows={5}
              />
            </Field>

            <Field label="Preview Teaser" hint="Short excerpt shown on detail page">
              <Input
                id="product-preview"
                value={form.preview}
                onChange={(e) => set("preview", e.target.value)}
                placeholder="Covers: Uthibitisho wa Lugha, Msimbo, Lahaja, Rejesta…"
              />
            </Field>
          </Section>

          {/* Benefits */}
          <Section title="Key Benefits">
            <p className="text-xs -mt-2" style={{ color: "#6b7280" }}>
              These appear as bullet points on the product page.
            </p>
            <div className="space-y-2">
              {form.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: "rgba(26,92,56,0.2)", color: "#22c55e" }}
                  >
                    {i + 1}
                  </div>
                  <input
                    id={`benefit-${i}`}
                    type="text"
                    value={benefit}
                    onChange={(e) => setBenefit(i, e.target.value)}
                    placeholder={`Benefit ${i + 1}, e.g. Instant PDF download`}
                    className="flex-1 px-4 py-2.5 rounded-xl border text-sm text-white outline-none placeholder-gray-600"
                    style={{
                      background: "#0f1117",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  />
                  {form.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10"
                    >
                      <Minus className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addBenefit}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add benefit
            </button>
          </Section>

          {/* Tags */}
          <Section title="Tags">
            <p className="text-xs -mt-2" style={{ color: "#6b7280" }}>
              Click to toggle. Selected tags appear on product cards.
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border"
                  style={
                    form.tags.includes(tag)
                      ? {
                          background: "rgba(26,92,56,0.3)",
                          borderColor: "#1a5c38",
                          color: "#4ade80",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "#6b7280",
                        }
                  }
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </button>
              ))}
            </div>
            {form.tags.length > 0 && (
              <p className="text-xs mt-2" style={{ color: "#4b5563" }}>
                Selected: {form.tags.join(", ")}
              </p>
            )}
          </Section>
        </div>

        {/* ── Right column (image, category, settings) ── */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Section title="Product Image">
            <CloudinaryUploader
              onUploadSuccess={(url) => set("image", url)}
              currentImage={form.image}
            />
            {errors.image && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl border text-xs"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.2)",
                  color: "#fca5a5",
                }}
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.image}
              </div>
            )}
          </Section>

          {/* PDF Book File Upload */}
          <Section title="📄 PDF Book File (Soft Copy)">
            <p className="text-xs -mt-2" style={{ color: "#6b7280" }}>
              Upload the downloadable PDF book. Customers will receive this link after purchase.
            </p>
            <CloudinaryPdfUploader
              onUploadSuccess={(url) => set("pdfUrl", url)}
              currentPdfUrl={form.pdfUrl}
            />
            {form.pdfUrl && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl border text-xs"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  borderColor: "rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                }}
              >
                <FileDown className="w-3.5 h-3.5 flex-shrink-0" />
                PDF linked — will be downloadable on the shop page.
              </div>
            )}
          </Section>

          {/* Category */}
          <Section title="Category">
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  htmlFor={`cat-${cat}`}
                  className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200"
                  style={
                    form.category === cat
                      ? {
                          background: "rgba(26,92,56,0.2)",
                          borderColor: "rgba(26,92,56,0.5)",
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.07)",
                          background: "transparent",
                        }
                  }
                >
                  <input
                    id={`cat-${cat}`}
                    type="radio"
                    name="category"
                    value={cat}
                    checked={form.category === cat}
                    onChange={() => set("category", cat)}
                    className="sr-only"
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={
                      form.category === cat
                        ? { borderColor: "#1a5c38" }
                        : { borderColor: "rgba(255,255,255,0.2)" }
                    }
                  >
                    {form.category === cat && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "#1a5c38" }}
                      />
                    )}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: form.category === cat ? "#fff" : "#9ca3af" }}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {/* Settings */}
          <Section title="Product Settings">
            <label
              className="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
              style={
                form.featured
                  ? {
                      background: "rgba(245,158,11,0.1)",
                      borderColor: "rgba(245,158,11,0.3)",
                    }
                  : { borderColor: "rgba(255,255,255,0.07)" }
              }
            >
              <div className="flex items-center gap-3">
                <Star
                  className="w-5 h-5"
                  style={{ color: form.featured ? "#f59e0b" : "#4b5563" }}
                />
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: form.featured ? "#fff" : "#9ca3af" }}
                  >
                    Featured Product
                  </p>
                  <p className="text-xs" style={{ color: "#4b5563" }}>
                    Shown prominently on the homepage
                  </p>
                </div>
              </div>
              <div
                className="w-11 h-6 rounded-full relative transition-colors duration-200"
                style={{ background: form.featured ? "#f59e0b" : "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200"
                  style={{ transform: form.featured ? "translateX(22px)" : "translateX(2px)" }}
                />
              </div>
              <input
                id="product-featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="sr-only"
              />
            </label>

            <div
              className="p-4 rounded-xl border text-xs space-y-2"
              style={{
                background: "rgba(26,92,56,0.05)",
                borderColor: "rgba(26,92,56,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" style={{ color: "#1a5c38" }} />
                <span className="font-semibold text-white">Preview Checklist</span>
              </div>
              {[
                { label: "Title", ok: !!form.title },
                { label: "Image", ok: !!form.image },
                { label: "PDF File", ok: !!form.pdfUrl },
                { label: "Price", ok: !!form.price && Number(form.price) > 0 },
                { label: "Category", ok: !!form.category },
                { label: "Description", ok: !!form.description },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span style={{ color: "#9ca3af" }}>{item.label}</span>
                  <span
                    style={{ color: item.ok ? "#22c55e" : item.label === "PDF File" ? "#f59e0b" : "#ef4444" }}
                    className="font-semibold"
                  >
                    {item.ok ? "✓" : item.label === "PDF File" ? "optional" : "✗"}
                  </span>
                </div>
              ))}
            </div>
          </Section>


          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            id="product-form-submit"
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            style={{ background: "linear-gradient(135deg, #1a5c38, #14532d)" }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isEditMode ? "Saving Changes…" : "Saving Product…"}
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                {isEditMode ? "Save Changes" : "Publish Product"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
