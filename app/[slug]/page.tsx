import { notFound } from "next/navigation"
import { getProduct, getAllSlugs } from "@/lib/products"
import { parseSlug } from "@/lib/slugParser"
import ReviewPage from "@/components/ReviewPage"
import BonusPage from "@/components/BonusPage"
import HybridReviewPage from "@/components/HybridReviewPage"
import type { Metadata } from "next"

const SITE_URL = "https://digitaltoolradar.com"
const SITE_NAME = "DigitaltoolRadar"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  const paths: { slug: string }[] = []
  for (const s of slugs) {
    paths.push({ slug: `${s}-review` })
    paths.push({ slug: `${s}-bonus` })
    paths.push({ slug: `${s}-demo` })
    paths.push({ slug: `${s}-oto` })
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug, pageType } = parseSlug(params.slug)
  const product = getProduct(productSlug)
  if (!product) return { title: "Not Found" }

  const isBonus = pageType === "bonus"
  const title = isBonus ? product.meta.bonus_title : product.meta.review_title
  const description = isBonus ? product.meta.bonus_description : product.meta.review_description
  const url = `${SITE_URL}/${params.slug}`
  const image = product.product_image ?? `${SITE_URL}/og-default.png`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default function ProductPage({ params }: Props) {
  const { productSlug, pageType } = parseSlug(params.slug)
  const product = getProduct(productSlug)
  if (!product) notFound()

  if (pageType === "bonus" || pageType === "deal") return <BonusPage product={product} />
  if (product.page_template === "hybrid") return <HybridReviewPage product={product} />
  return <ReviewPage product={product} />
}

export const revalidate = 3600
