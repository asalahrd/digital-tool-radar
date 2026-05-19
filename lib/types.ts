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

// ─── Hybrid page types ────────────────────────────────────────────────────────

export interface HybridHero {
  headline?: string
  sub?: string
  badge?: string          // e.g. "⭐ Rated 4.8/5 by our readers"
  verdict_text?: string   // one-line quick take
  cta_text?: string
  launch_note?: string    // e.g. "Launch pricing ends soon"
}

export interface HybridQuickDecision {
  best_for?: string[]
  not_for?: string[]
  skill_level?: string    // "Beginner" | "Intermediate" | "Advanced"
  setup_time?: string     // "~15 minutes"
  use_case?: string
  verdict_score?: string  // "8.5 / 10"
  deal_type?: string      // "One-Time" | "Monthly" | "Lifetime"
  bonus_available?: boolean
}

export interface HybridTransformation {
  before: string[]
  after: string[]
}

export interface HybridSocialProofItem {
  type: "quote" | "tweet" | "message"
  text: string
  author?: string
  platform?: string
  image?: string
}

export interface HybridFeatureCard {
  icon?: string
  title: string
  description: string
  why_it_matters?: string
}

export interface HybridUseCase {
  persona: string
  icon?: string
  workflow: string[]
  outcome?: string
}

export interface HybridMicroProofItem {
  label: string
  text: string
  source?: string  // "Based on vendor demo" | "From walkthrough materials" etc.
}

export interface HybridBonusItem {
  name: string
  description: string
  why_it_matters?: string
  value?: string
  badge?: string
}

export interface HybridComparisonRow {
  dimension: string
  product: string
  alternative: string
  advantage?: "product" | "alternative" | "neutral"
}

export interface HybridFinalDecision {
  verdict: string
  buy_if: string[]
  skip_if: string[]
  strongest_reason?: string
}

export interface ProductHybrid {
  hero?: HybridHero
  quick_decision?: HybridQuickDecision
  transformation?: HybridTransformation
  social_proof?: {
    title?: string
    items: HybridSocialProofItem[]
  }
  feature_cards?: HybridFeatureCard[]
  use_cases?: HybridUseCase[]
  review_body?: string                  // HTML string
  micro_proof?: HybridMicroProofItem[]
  bonus_stack?: HybridBonusItem[]
  comparison?: {
    title?: string
    rows: HybridComparisonRow[]
  }
  final_decision?: HybridFinalDecision
  cta_primary?: string
  cta_secondary?: string
  bonus_claim_steps?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────

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
  // Hybrid landing page
  page_template?: "classic" | "hybrid"
  hybrid?: ProductHybrid
  pros?: string[]
  cons?: string[]
  faqs?: { q: string; a: string }[]
}
