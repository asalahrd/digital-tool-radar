import { getAllProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export const revalidate = 3600

export default function HomePage() {
  const products = getAllProducts()

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,146,0.08) 0%, transparent 70%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "4.5rem",
          paddingBottom: "4.5rem",
        }}
      >
        <div className="mx-auto px-5 text-center" style={{ maxWidth: 720 }}>
          <span className="badge badge-green mb-5" style={{ display: "inline-flex" }}>
            New launches every week
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              color: "#edf2f7",
            }}
          >
            Honest Reviews. <span className="text-gradient">Real Bonuses.</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#7b8ea5",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            We get early access to the biggest digital marketing software launches,
            review them properly, and stack exclusive bonuses you can’t get anywhere
            else.
          </p>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="mx-auto px-5 py-14" style={{ maxWidth: 1200 }}>
        {products.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#4a5568" }}>
            <p style={{ fontSize: "1.1rem" }}>No products yet — check back soon.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#edf2f7",
                  letterSpacing: "-0.02em",
                }}
              >
                Latest Reviews
              </h2>
              <span style={{ fontSize: "0.82rem", color: "#4a5568" }}>
                {products.length} product{products.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}
