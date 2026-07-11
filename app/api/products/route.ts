import { NextRequest, NextResponse } from "next/server";
import { getDynamicProducts, addDynamicProduct } from "@/lib/db";
import { products as staticProducts } from "@/data/products";

export async function GET() {
  const dynamic = getDynamicProducts();
  // Return dynamic (newly added) products first, then the static ones
  return NextResponse.json([...dynamic, ...staticProducts]);
}


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
      priceDisplay: priceDisplay ?? `KES ${price}`,
      image,
      category,
      tags: Array.isArray(tags) ? tags : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      pages: pages ? Number(pages) : undefined,
      featured: Boolean(featured),
      preview: preview?.trim() ?? "",
      pdfUrl: pdfUrl ?? "",
    };

    const saved = addDynamicProduct(newProduct);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
