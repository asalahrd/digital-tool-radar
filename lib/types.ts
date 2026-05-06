export interface ProductBonus {
  name: string
  description: string
  badge?: string
}

export interface ProductOto {
  name: string
  description: string
  price?: string
}

export interface ProductLanding {
  headline: string
  sub_headline: string
  bullets: string[]
  cta_text: string
  bonuses: ProductBonus[]
  urgency_line: string
}

export interface ProductMeta {
  review_title: string
  review_description: string
  bonus_title: string
  bonus_description: string
}

export interface Product {
  slug: string
  name: string
  tagline: string
  launch_date: string
  commission: number
  vendor: string
  niche: string
  jv_page: string
  affiliate_link: string
  price: string
  features: string[]
  otos: ProductOto[]
  review_article: string
  video_script: string
  landing: ProductLanding
  meta: ProductMeta
  script_url?: string
  published_at: string
  product_image?: string
  screenshots?: string[]
  video_url?: string
  video_url?: string
}
