// components/SchemaMarkup.tsx
// Structured data for DigitaltoolRadar review pages
// Outputs JSON-LD for: ReviewPage + FAQPage + BreadcrumbList + Article
// All schema types are placed in <head> by Next.js

const BASE_URL = 'https://digitaltoolradar.com'
const BRAND_NAME = 'DigitaltoolRadar'
const AUTHOR_URL = `${BASE_URL}/about`

interface FAQItem {
  question: string
  answer: string
}

interface SchemaMarkupProps {
  slug: string
  productName: string
  tagline: string
  reviewBody: string       // Plain text excerpt (200–400 chars)
  rating: number           // 1–5
  reviewCount: number
  price: string            // e.g. "47"
  priceCurrency?: string   // default "USD"
  publishedAt: string      // ISO 8601
  updatedAt?: string       // ISO 8601, defaults to publishedAt
  productImage?: string    // Product image URL
  faqItems?: FAQItem[]     // From FAQ section
}

export default function SchemaMarkup({
  slug,
  productName,
  tagline,
  reviewBody,
  rating,
  reviewCount,
  price,
  priceCurrency = 'USD',
  publishedAt,
  updatedAt,
  productImage,
  faqItems = [],
}: SchemaMarkupProps) {
  const pageUrl = `${BASE_URL}/${slug}-review`
  const modifiedAt = updatedAt ?? publishedAt

  // ── 1. ReviewPage ───────────────────────────────────────────────────────────
  const reviewPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ReviewNewsArticle',
    headline: `${productName} Review — Honest Look [${new Date(publishedAt).getFullYear()}]`,
    description: tagline,
    url: pageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    aggregateRating: reviewCount > 1 ? {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: productName,
      description: tagline,
      image: productImage,
      offers: price ? {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock',
      } : undefined,
    },
    reviewBody,
    ...(productImage ? {
      image: {
        '@type': 'ImageObject',
        url: productImage,
        width: 1200,
        height: 630,
      },
    } : {}),
  }

  // ── 2. BreadcrumbList ───────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Reviews',
        item: `${BASE_URL}/reviews`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${productName} Review`,
        item: pageUrl,
      },
    ],
  }

  // ── 3. FAQPage (only if FAQ items exist) ────────────────────────────────────
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  } : null

  // ── 4. Article (for Google News / Discover eligibility) ─────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${productName} Review — Honest Look [${new Date(publishedAt).getFullYear()}]`,
    description: tagline,
    url: pageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    ...(productImage ? { image: productImage } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  )
}
