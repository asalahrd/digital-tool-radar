const PAGE_TYPES = ["review", "bonus", "deal", "demo", "oto"] as const
export type PageType = (typeof PAGE_TYPES)[number] | "vs"

export function parseSlug(slug: string): { productSlug: string; pageType: PageType } {
  for (const type of PAGE_TYPES) {
    if (slug.endsWith(`-${type}`)) {
      return {
        productSlug: slug.slice(0, -((`-${type}`).length)),
        pageType: type,
      }
    }
  }
  const vsMatch = slug.match(/^(.+)-vs-.+$/)
  if (vsMatch) return { productSlug: vsMatch[1], pageType: "vs" }
  return { productSlug: slug, pageType: "review" }
}
