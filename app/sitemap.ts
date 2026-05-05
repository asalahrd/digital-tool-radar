import { getAllProducts } from "@/lib/products"
import type { MetadataRoute } from "next"

const DOMAIN = "https://digitaltoolradar.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts()
  const productPages = products.flatMap((p) => [
    { url: `${DOMAIN}/${p.slug}-review`, lastModified: p.published_at, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${DOMAIN}/${p.slug}-bonus`, lastModified: p.published_at, changeFrequency: "weekly" as const, priority: 0.8 },
  ])
  return [
    { url: DOMAIN, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    ...productPages,
  ]
}
