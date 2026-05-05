import type { Product } from "@/lib/types"
import Link from "next/link"

function ArticleBody({ text }: { text: string }) {
  if (!text) return null
  const blocks = text.split("\n\n").filter((b) => b.trim().length > 0)

  return (
    <div className="prose-dark">
      {blocks.map((block, i) => {
        const t = block.trim()
        if (t === "[CTA_BUTTON]") {
          return null
        }
        if (t.startsWith("## ")) {
          return <h2 key={i}>{t.slice(3)}</h2>
        }
        if (t.startsWith("### ")) {
          return <h3 key={i}>{t.slice(4)}</h3>
        }
        if (t.startsWith("# ")) {
          return <h1 key={i}>{t.slice(2)}</h1>
        }
        if (t.startsWith("* ") || t.startsWith("- ")) {
          const items = t
            .split("\n")
            .filter((l) => l.startsWith("* ") || l.startsWith("- "))
            .map((l) => l.slice(2))
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{t.replace(/\n/g, " ")}</p>
      })}
    </div>
  )
}

export default function ReviewPage({ product }: { product: Product }) {
  const launchYear = product.launch_date
    ? new Date(product.launch_date).getFullYear()
    : new Date().getFullYear()

  return (
    <>
      {/* Sticky bar */}
      <div className="sticky-bar">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.25rem",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "#7b8ea5" }}>
            <strong style={{ color: "#edf2f7" }}>{product.name}</strong>{" "}
            Review {launchYear}
          </span>
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary btn-sm"
          >
            Get {product.name} + Bonuses &rarr;
          </a>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,212,146,0.07) 0%, transparent 65%)",
          padding: "3.5rem 1.25rem 3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="badge badge-slate">{product.niche}</span>
            {product.launch_date && (
              <span className="badge badge-amber">
                Launch:{" "}
                {new Date(product.launch_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="badge badge-green">{product.commission}% Commission</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 900,
              color: "#edf2f7",
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
            }}
          >
            {product.name} Review {launchYear} &mdash;{" "}
            <span style={{ color: "#7b8ea5", fontWeight: 600 }}>Honest Look Inside</span>
          </h1>

          <div className="stars" style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.6rem", fontWeight: 400 }}>
              4/5 &mdash; Early Access Review
            </span>
          </div>

          <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.75rem" }}>
            {product.tagline}
          </p>

          {/* Product image hero */}
          {product.product_image && (
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "1.75rem",
                background: "#0d1117",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={product.product_image}
                alt={product.name + " screenshot"}
                style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          )}

          {/* CTA block */}
          <div
            style={{
              background: "rgba(0,212,146,0.06)",
              border: "1px solid rgba(0,212,146,0.18)",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.25rem",
              }}
            >
              <div>
                <p style={{ color: "#7b8ea5", fontSize: "0.78rem", marginBottom: "0.25rem" }}>
                  Front-end price
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#edf2f7",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  ${product.price}
                  <span style={{ fontSize: "0.85rem", color: "#7b8ea5", fontWeight: 400 }}>
                    {" "}one-time
                  </span>
                </p>
              </div>
              <div>
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary"
                >
                  Get {product.name} + My Bonuses &rarr;
                </a>
                <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.4rem", textAlign: "center" }}>
                  {product.landing?.urgency_line || "Bonuses expire at launch close"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            }}
          >
            {[
              { label: "Vendor", value: product.vendor },
              { label: "Price", value: "$" + product.price },
              { label: "Commission", value: product.commission + "%" },
              { label: "Niche", value: product.niche },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <p style={{ fontSize: "0.65rem", color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#edf2f7", fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

          {/* Main column */}
          <main style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>What&apos;s Inside</p>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#edf2f7",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Key Features
                </h2>
                <div
                  style={{
                    display: "grid",
                    gap: "0.75rem",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  }}
                >
                  {product.features.map((feat, i) => {
                    const dashIdx = feat.indexOf(" — ")
                    const title = dashIdx > -1 ? feat.slice(0, dashIdx) : feat
                    const desc = dashIdx > -1 ? feat.slice(dashIdx + 3) : ""
                    return (
                      <div key={i} className="feature-card">
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <span
                            style={{
                              minWidth: "1.4rem",
                              height: "1.4rem",
                              borderRadius: "50%",
                              background: "rgba(0,212,146,0.15)",
                              border: "1px solid rgba(0,212,146,0.3)",
                              color: "#00d492",
                              fontSize: "0.6rem",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: "0.1rem",
                            }}
                          >
                            {i + 1}
                          </span>
                          <div>
                            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: desc ? "0.2rem" : 0, lineHeight: 1.35 }}>
                              {title}
                            </p>
                            {desc && (
                              <p style={{ fontSize: "0.78rem", color: "#7b8ea5", lineHeight: 1.5 }}>
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Screenshots strip */}
            {product.screenshots && product.screenshots.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Inside the Dashboard</p>
                <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                  {product.screenshots.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={"Screenshot " + (i + 1)}
                      style={{
                        height: 200,
                        borderRadius: "0.75rem",
                        border: "1px solid rgba(255,255,255,0.08)",
                        flexShrink: 0,
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Article */}
            {product.review_article && (
              <section style={{ marginBottom: "3rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Full Review</p>
                <ArticleBody text={product.review_article} />
              </section>
            )}

            {/* OTO table */}
            {product.otos && product.otos.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Upsell Funnel</p>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                  OTO / Upsell Breakdown
                </h2>
                <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", overflow: "hidden" }}>
                  <table className="oto-table">
                    <thead style={{ background: "rgba(255,255,255,0.03)" }}>
                      <tr>
                        <th>Upsell</th>
                        <th style={{ width: 90 }}>Price</th>
                        <th style={{ width: 110 }}>Worth It?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.otos.map((oto, i) => (
                        <tr key={i}>
                          <td>
                            <p style={{ fontWeight: 700, color: "#edf2f7", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                              {oto.name}
                            </p>
                            <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>
                              {oto.description}
                            </p>
                          </td>
                          <td>
                            {oto.price ? (
                              <strong style={{ color: "#edf2f7" }}>${oto.price}</strong>
                            ) : (
                              <span style={{ color: "#4a5568", fontSize: "0.8rem" }}>See page</span>
                            )}
                          </td>
                          <td>
                            <span className="badge badge-green">Reviewed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <div
              style={{
                background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, #0d1117 70%)",
                border: "1px solid rgba(0,212,146,0.2)",
                borderRadius: "1.25rem",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Ready to buy?</p>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.6rem", letterSpacing: "-0.025em" }}>
                Get {product.name} + My Exclusive Bonuses
              </h3>
              <p style={{ color: "#7b8ea5", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
                Buy through my link and unlock exclusive bonuses to help you get results faster.
              </p>
              <a
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
                style={{ fontSize: "1.05rem" }}
              >
                Get {product.name} + Bonuses &rarr;
              </a>
              <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>
                {product.landing?.urgency_line || "Bonuses expire at launch close"}
              </p>
              <div style={{ marginTop: "0.75rem" }}>
                <Link
                  href={"/" + product.slug + "-bonus"}
                  style={{ color: "#7b8ea5", fontSize: "0.8rem", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  See full bonus page
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside
            className="hidden lg:block"
            style={{ width: 260, flexShrink: 0, position: "sticky", top: 90 }}
          >
            <div
              style={{
                background: "rgba(0,212,146,0.05)",
                border: "1px solid rgba(0,212,146,0.16)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              {product.product_image && (
                <img
                  src={product.product_image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    borderRadius: "0.6rem",
                    marginBottom: "1rem",
                    border: "1px solid rgba(255,255,255,0.06)",
                    objectFit: "cover",
                    maxHeight: 130,
                  }}
                />
              )}
              <p className="section-label" style={{ marginBottom: "0.6rem" }}>Quick Summary</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.25rem", lineHeight: 1.25 }}>
                {product.name}
              </p>
              <div className="stars" style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </div>
              <div className="divider" style={{ margin: "0.75rem 0" }} />
              {[
                { l: "Price", v: "$" + product.price },
                { l: "Commission", v: product.commission + "%" },
                { l: "Vendor", v: product.vendor ? product.vendor.split(" and ")[0] : "" },
              ].map(({ l, v }) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    fontSize: "0.8rem",
                  }}
                >
                  <span style={{ color: "#7b8ea5" }}>{l}</span>
                  <span style={{ color: "#edf2f7", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: "1rem" }}>
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary"
                  style={{ width: "100%", fontSize: "0.875rem" }}
                >
                  Get + Bonuses &rarr;
                </a>
                <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
                  <Link
                    href={"/" + product.slug + "-bonus"}
                    style={{ fontSize: "0.75rem", color: "#7b8ea5", textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    See bonus details
                  </Link>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}
