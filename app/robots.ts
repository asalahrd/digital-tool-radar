// app/robots.ts
// robots.txt configuration for digitaltoolradar.com
// Allows all legitimate crawlers; blocks internal/API routes

import { MetadataRoute } from 'next'

const BASE_URL = 'https://digitaltoolradar.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All well-behaved crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API routes — not for indexing
          '/_next/',      // Next.js internals
          '/admin/',      // Admin areas (if any)
          '/*.json$',     // Raw JSON data files
        ],
      },
      {
        // GPTBot (OpenAI) — allow for AI citation potential
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // CCBot (Common Crawl) — allow for topical authority signals
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
