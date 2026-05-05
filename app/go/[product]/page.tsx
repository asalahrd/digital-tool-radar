import { redirect } from "next/navigation"
import { getProduct } from "@/lib/products"
import type { Metadata } from "next"

interface Props {
  params: { product: string }
}

export const metadata: Metadata = { robots: "noindex" }

export default function GoPage({ params }: Props) {
  const product = getProduct(params.product)
  if (!product?.affiliate_link) redirect("/")
  redirect(product.affiliate_link)
}
