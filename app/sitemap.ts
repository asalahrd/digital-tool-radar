// app/sitemap.ts
// Auto-generated dynamic sitemap for digitaltoolradar.com
// Reads all product JSON files and generates sitemap entries

import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://digitaltoolradar.com'

interface ProductData {
  slug: string
  published_at: string
  launch_date?: string
}

function getProducts(): ProductData[] {
  try {
    const dir = path.join(process.cwd(), 'data', 'products')
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
      .filter((p) => p.slug && p.published_at)
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts()
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Review pages — highest priority, most traffic
  const reviewPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/${p.slug}-review`,
    lastModified: p.published_at,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Bonus pages — secondary landing pages per product
  const bonusPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/${p.slug}-bonus`,
    lastModified: p.published_at,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...reviewPages, ...bonusPages]
}
