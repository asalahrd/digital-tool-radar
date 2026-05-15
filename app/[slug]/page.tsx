import { notFound } from "next/navigation"
import { getProduct, getAllSlugs } from "@/lib/products"
import { parseSlug } from "@/lib/slugParser"
import ReviewPage from "@/components/ReviewPage"
import BonusPage from "@/components/BonusPage"
import type { Metadata } from "next"

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
  return {
    title: isBonus ? product.meta.bonus_title : product.meta.review_title,
    description: isBonus ? product.meta.bonus_description : product.meta.review_description,
    openGraph: {
      title: isBonus ? product.meta.bonus_title : product.meta.review_title,
      description: isBonus ? product.meta.bonus_description : product.meta.review_description,
      type: "article",
    },
  }
}

export default function ProductPage({ params }: Props) {
  const { productSlug, pageType } = parseSlug(params.slug)
  const product = getProduct(productSlug)
  if (!product) notFound()

  if (pageType === "bonus" || pageType === "deal") return <BonusPage product={product} />
  return <ReviewPage product={product} />
}

export const revalidate = 3600
