import fs from "fs";
import path from "path";
import { Product } from "@/data/products";

const DB_PATH = path.join(process.cwd(), "data", "products-dynamic.json");

function readStore(): Product[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

function writeStore(products: Product[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export function getDynamicProducts(): Product[] {
  return readStore();
}

export function addDynamicProduct(product: Product): Product {
  const store = readStore();
  store.unshift(product); // newest first
  writeStore(store);
  return product;
}

export function deleteDynamicProduct(id: string): boolean {
  const store = readStore();
  const next = store.filter((p) => p.id !== id);
  if (next.length === store.length) return false;
  writeStore(next);
  return true;
}

export function updateDynamicProduct(id: string, updates: Partial<Product>): Product | null {
  const store = readStore();
  const idx = store.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store[idx] = { ...store[idx], ...updates };
  writeStore(store);
  return store[idx];
}
