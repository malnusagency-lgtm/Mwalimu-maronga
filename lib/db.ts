/**
 * db.ts – Product data store
 *
 * Production (Vercel): reads/writes a JSON "database" stored as a raw file
 *   in your Cloudinary account under the public_id "mwalimu-maronga/products-store".
 *   Cloudinary provides persistent, durable storage that survives cold starts.
 *
 * Local development: falls back to data/products-store.json on the local filesystem.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Product, products as staticProducts } from "@/data/products";

// ─── Config ────────────────────────────────────────────────────────────────────
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

/** Public ID for the raw JSON file stored in Cloudinary */
const STORE_PUBLIC_ID = "mwalimu-maronga/products-store";

/** Use Cloudinary when all three credentials are present */
const USE_CLOUDINARY = !!(CLOUD_NAME && API_KEY && API_SECRET);

/** Local filesystem path for dev fallback */
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "products-store.json");

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Store {
  dynamic: Product[];
  deletedIds: string[];
}

const EMPTY_STORE: Store = { dynamic: [], deletedIds: [] };

// ─── Local file helpers (dev) ──────────────────────────────────────────────────
function readLocalStore(): Store {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) return { ...EMPTY_STORE };
    const raw = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(raw) as Store;
  } catch {
    return { ...EMPTY_STORE };
  }
}

function writeLocalStore(store: Store): void {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("[db] Failed to write local store:", err);
  }
}

// ─── Cloudinary helpers (production) ──────────────────────────────────────────

/**
 * Generates a Cloudinary API signature.
 * Algorithm: SHA-1( sorted_key=value&... + api_secret )
 */
function cloudinarySign(params: Record<string, string>): string {
  const toSign =
    Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&") + API_SECRET!;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

/** Read the products store JSON from Cloudinary raw delivery URL */
async function readCloudinaryStore(): Promise<Store> {
  try {
    // Use a timestamp version to bypass Cloudinary CDN cache
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/v${Date.now()}/${STORE_PUBLIC_ID}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) {
      // 404 = store doesn't exist yet (first run)
      if (res.status === 404) return { ...EMPTY_STORE };
      console.error("[db] Cloudinary read error:", res.status, await res.text());
      return { ...EMPTY_STORE };
    }
    const data = await res.json();
    return data as Store;
  } catch (err) {
    console.error("[db] Failed to read Cloudinary store:", err);
    return { ...EMPTY_STORE };
  }
}

/** Upload the store JSON to Cloudinary as a raw file, replacing the previous version */
async function writeCloudinaryStore(store: Store): Promise<void> {
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const paramsToSign: Record<string, string> = {
      invalidate: "true",
      overwrite: "true",
      public_id: STORE_PUBLIC_ID,
      timestamp,
    };
    const signature = cloudinarySign(paramsToSign);

    const json = JSON.stringify(store);
    const blob = new Blob([json], { type: "application/json" });

    const form = new FormData();
    form.append("file", blob, "products-store.json");
    form.append("public_id", STORE_PUBLIC_ID);
    form.append("overwrite", "true");
    form.append("invalidate", "true");
    form.append("timestamp", timestamp);
    form.append("api_key", API_KEY!);
    form.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      { method: "POST", body: form }
    );

    if (!uploadRes.ok) {
      const errBody = await uploadRes.text();
      console.error("[db] Cloudinary write failed:", uploadRes.status, errBody);
    } else {
      console.log("[db] Cloudinary store updated successfully.");
    }
  } catch (err) {
    console.error("[db] Failed to write Cloudinary store:", err);
  }
}

// ─── Store accessor (chooses backend automatically) ───────────────────────────
async function readStore(): Promise<Store> {
  if (USE_CLOUDINARY) return readCloudinaryStore();
  return readLocalStore();
}

async function writeStore(store: Store): Promise<void> {
  if (USE_CLOUDINARY) return writeCloudinaryStore(store);
  writeLocalStore(store);
}

// ─── Public API ────────────────────────────────────────────────────────────────

/** Returns all dynamic and static products (Cloudinary in prod, local file in dev) */
export async function getAllProducts(): Promise<Product[]> {
  const store = await readStore();
  const deletedSet = new Set(store.deletedIds);
  
  const result: Product[] = [];
  const addedIds = new Set<string>();

  // Add dynamic products first (preserves their unshifted order)
  for (const dp of store.dynamic) {
    if (!deletedSet.has(dp.id)) {
      result.push(dp);
      addedIds.add(dp.id);
    }
  }

  // Append static products that haven't been modified (overridden) or deleted
  for (const sp of staticProducts) {
    if (!deletedSet.has(sp.id) && !addedIds.has(sp.id)) {
      result.push(sp);
    }
  }

  return result;
}

/** Fetch a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

/** Persist a new dynamic product */
export async function addDynamicProduct(product: Product): Promise<Product> {
  const store = await readStore();
  store.dynamic.unshift(product);
  await writeStore(store);
  return product;
}

/** Update a dynamic product by ID; returns null if not found */
export async function updateDynamicProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const store = await readStore();
  const dynIdx = store.dynamic.findIndex((p) => p.id === id);
  
  if (dynIdx !== -1) {
    store.dynamic[dynIdx] = { ...store.dynamic[dynIdx], ...updates };
    await writeStore(store);
    return store.dynamic[dynIdx];
  } else {
    // If it's a static product, create a dynamic copy
    const staticProduct = staticProducts.find((p) => p.id === id);
    if (staticProduct) {
      const newDynamic = { ...staticProduct, ...updates };
      store.dynamic.unshift(newDynamic);
      await writeStore(store);
      return newDynamic;
    }
  }
  return null;
}

/** Delete a dynamic product; returns false if not found */
export async function deleteDynamicProduct(id: string): Promise<boolean> {
  const store = await readStore();
  let found = false;
  
  const dynIdx = store.dynamic.findIndex((p) => p.id === id);
  if (dynIdx !== -1) {
    store.dynamic.splice(dynIdx, 1);
    found = true;
  }
  
  const isStatic = staticProducts.some((p) => p.id === id);
  if (isStatic) {
    if (!store.deletedIds) store.deletedIds = [];
    if (!store.deletedIds.includes(id)) {
      store.deletedIds.push(id);
    }
    found = true;
  }
  
  if (found) {
    await writeStore(store);
    return true;
  }
  return false;
}

/** @deprecated – use getAllProducts instead */
export async function getDynamicProducts(): Promise<Product[]> {
  return getAllProducts();
}
