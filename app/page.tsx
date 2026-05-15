import { getAllProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export const revalidate = 3600

export default function HomePage() {
  const products = getAllProducts()

  return (
    <>
      <section
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,146,0.08) 0%, transparent 70%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "4.5rem 1.25rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span
            className="badge badge-green"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            New launches every week
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
              marginBottom: "1.25rem",
              color: "#edf2f7",
            }}
          >
            Honest Reviews.{" "}
            <span className="text-gradient">Real Bonuses.</span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#7b8ea5",
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            We get early access to the biggest digital marketing launches,
            review them properly, and stack exclusive bonuses you
            can&apos;t get anywhere else.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3.5rem 1.25rem",
        }}
      >
        {products.length === 0 ? (
          <p style={{ color: "#4a5568", textAlign: "center", padding: "4rem 0" }}>
            No products yet. Check back soon.
          </p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#edf2f7",
                  letterSpacing: "-0.02em",
                }}
              >
                Latest Reviews
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#4a5568" }}>
                {products.length} product{products.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gap: "1.25rem",
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
