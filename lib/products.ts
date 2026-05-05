import { readFileSync, readdirSync, existsSync } from "fs"
import path from "path"
import type { Product } from "./types"

const DATA_DIR = path.join(process.cwd(), "data", "products")

export function getProduct(slug: string): Product | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`)
  if (!existsSync(filePath)) return null
  return JSON.parse(readFileSync(filePath, "utf-8")) as Product
}

export function getAllProducts(): Product[] {
  if (!existsSync(DATA_DIR)) return []
  return readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(DATA_DIR, f), "utf-8")) as Product)
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
}

export function getAllSlugs(): string[] {
  return getAllProducts().map((p) => p.slug)
}
