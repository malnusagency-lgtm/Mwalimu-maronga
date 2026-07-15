import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import {
  getAllProducts,
  addDynamicProduct,
  deleteDynamicProduct,
  updateDynamicProduct,
} from "@/lib/db";

// ─── GET /api/products ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    const all = await getAllProducts();
    return NextResponse.json(all);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/products ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      description,
      longDescription,
      price,
      priceDisplay,
      image,
      category,
      tags,
      benefits,
      pages,
      featured,
      preview,
      pdfUrl,
    } = body;

    if (!title || !slug || !description || !price || !image || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, description, price, image, category" },
        { status: 400 }
      );
    }

    const newProduct = {
      id: `dyn-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      longDescription: longDescription?.trim() ?? description.trim(),
      price: Number(price),
      priceDisplay: priceDisplay ?? `KES ${Number(price).toLocaleString()}`,
      image,
      category,
      tags: Array.isArray(tags) ? tags : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      pages: pages ? Number(pages) : undefined,
      featured: Boolean(featured),
      preview: preview?.trim() ?? "",
      pdfUrl: pdfUrl ?? "",
    };

    const saved = await addDynamicProduct(newProduct);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── PUT /api/products?id=xxx ──────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const body = await req.json();

    // Sanitise updatable fields
    const updates: Record<string, unknown> = {};
    if (body.title !== undefined) updates.title = String(body.title).trim();
    if (body.slug !== undefined) updates.slug = String(body.slug).trim();
    if (body.description !== undefined) updates.description = String(body.description).trim();
    if (body.longDescription !== undefined)
      updates.longDescription = String(body.longDescription).trim();
    if (body.price !== undefined) {
      updates.price = Number(body.price);
      updates.priceDisplay =
        body.priceDisplay ?? `KES ${Number(body.price).toLocaleString()}`;
    }
    if (body.image !== undefined) updates.image = body.image;
    if (body.category !== undefined) updates.category = body.category;
    if (body.tags !== undefined) updates.tags = Array.isArray(body.tags) ? body.tags : [];
    if (body.benefits !== undefined)
      updates.benefits = Array.isArray(body.benefits) ? body.benefits : [];
    if (body.pages !== undefined) updates.pages = body.pages ? Number(body.pages) : undefined;
    if (body.featured !== undefined) updates.featured = Boolean(body.featured);
    if (body.preview !== undefined) updates.preview = String(body.preview).trim();
    if (body.pdfUrl !== undefined) updates.pdfUrl = body.pdfUrl ?? "";

    const updated = await updateDynamicProduct(id, updates);
    if (!updated) {
      return NextResponse.json(
        { error: "Product not found or is a static product" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/products?id=xxx ───────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const deleted = await deleteDynamicProduct(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Product not found or is a static product" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
