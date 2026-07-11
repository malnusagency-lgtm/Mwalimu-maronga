import fs from "fs";
import path from "path";
import { Product, products as staticProducts } from "@/data/products";

const IS_VERCEL = process.env.VERCEL === "1";
const DB_PATH = IS_VERCEL
  ? path.join("/tmp", "products-store.json")
  : path.join(process.cwd(), "data", "products-store.json");

interface Store {
  dynamic: Product[];
  deletedIds: string[];
}

function readStore(): Store {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { dynamic: [], deletedIds: [] };
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Store;
  } catch {
    return { dynamic: [], deletedIds: [] };
  }
}

function writeStore(store: Store): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to product store:", err);
  }
}

/** Returns all products: dynamic ones only */
export function getAllProducts(): Product[] {
  const store = readStore();
  const deletedSet = new Set(store.deletedIds);
  const filteredDynamic = store.dynamic.filter((p) => !deletedSet.has(p.id));
  return filteredDynamic;
}

/** @deprecated use getAllProducts instead */
export function getDynamicProducts(): Product[] {
  return getAllProducts();
}

export function addDynamicProduct(product: Product): Product {
  const store = readStore();
  store.dynamic.unshift(product);
  writeStore(store);
  return product;
}

export function deleteDynamicProduct(id: string): boolean {
  const store = readStore();

  // Check if it's a dynamic product
  const dynIdx = store.dynamic.findIndex((p) => p.id === id);
  if (dynIdx !== -1) {
    store.dynamic.splice(dynIdx, 1);
    writeStore(store);
    return true;
  }

  // Check if it's a static product (soft-delete by tracking deletedId)
  const isStatic = staticProducts.some((p) => p.id === id);
  if (isStatic) {
    if (!store.deletedIds.includes(id)) {
      store.deletedIds.push(id);
    }
    writeStore(store);
    return true;
  }

  return false;
}

export function updateDynamicProduct(id: string, updates: Partial<Product>): Product | null {
  const store = readStore();
  const idx = store.dynamic.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.dynamic[idx] = { ...store.dynamic[idx], ...updates };
  writeStore(store);
  return store.dynamic[idx];
}
