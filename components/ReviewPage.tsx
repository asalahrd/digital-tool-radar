import type { Product } from "@/lib/types"
import Link from "next/link"

function renderArticle(text: string): string {
  if (!text) return ""
  // Escape HTML first
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>")
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>")
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>")
  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")
  // Lists
  html = html.replace(/^[\*\-] (.+)$/gm, "<li>$1</li>")
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
  // Blockquote
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
  // Paragraphs: double newlines
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim()
      if (!t) return ""
      if (/^<(h[1-6]|ul|ol|blockquote|li)/.test(t)) return t
      return "<p>" + t.replace(/\n/g, " ") + "</p>"
    })
    .filter(Boolean)
    .join("\n")
  return html
}

export default function ReviewPage({ product }: { product: Product }) {
  const articleHtml = renderArticle(product.review_article)
  const launchYear = product.launch_date
    ? new Date(product.launch_date).getFullYear()
    : new Date().getFullYear()

  return (
    <>
      {/* ── Sticky CTA bar ── */}
      <div className="sticky-cta-bar">
        <div
          className="mx-auto px-5 flex items-center justify-between"
          style={{ maxWidth: 1200, height: 52 }}
        >
          <span style={{ fontSize: "0.82rem", color: "#7b8ea5" }}>
            <span style={{ color: "#edf2f7", fontWeight: 600 }}>{product.name}</span>{" "}
            Review {launchYear}
          </span>
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary"
            style={{ padding: "0.45rem 1.25rem", fontSize: "0.82rem" }}
          >
            Get {product.name} + Bonuses &#8594;
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,212,146,0.07) 0%, transparent 65%)",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto px-5" style={{ maxWidth: 780 }}>
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-slate">{product.niche}</span>
            {product.launch_date && (
              <span className="badge badge-amber">
                Launch: {new Date(product.launch_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            )}
            <span className="badge badge-green">{product.commission}% Commission</span>
          </div>

          {/* Title */}
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
            <span style={{ color: "#7b8ea5", fontWeight: 600 }}>
              Honest Look Inside
            </span>
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-3 mb-4">
            <span className="stars" style={{ fontSize: "1.15rem" }}>
              &#9733;&#9733;&#9733;&#9733;&#9734;
            </span>
            <span style={{ color: "#7b8ea5", fontSize: "0.875rem" }}>
              4 / 5 &mdash; Early Access Review
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "#94a3b8",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
            }}
          >
            {product.tagline}
          </p>

          {/* CTA block */}
          <div
            className="p-5 rounded-2xl mb-6"
            style={{
              background: "rgba(0,212,146,0.06)",
              border: "1px solid rgba(0,212,146,0.18)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p style={{ color: "#7b8ea5", fontSize: "0.82rem", marginBottom: "0.25rem" }}>
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
                  <span style={{ fontSize: "0.9rem", color: "#7b8ea5", fontWeight: 400 }}>
                    {" "}
                    one-time
                  </span>
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary"
                  style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}
                >
                  Get {product.name} + My Bonuses &#8594;
                </a>
                <p style={{ fontSize: "0.75rem", color: "#4a5568", marginTop: "0.5rem" }}>
                  {product.landing?.urgency_line || "Bonuses expire at launch close"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta row */}
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
          >
            {[
              { label: "Vendor", value: product.vendor },
              { label: "Front-end Price", value: `$${product.price}` },
              { label: "Commission", value: `${product.commission}%` },
              { label: "Niche", value: product.niche },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ fontSize: "0.7rem", color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#edf2f7", fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto px-5 py-12" style={{ maxWidth: 1200 }}>
        <div className="flex gap-10" style={{ alignItems: "flex-start" }}>

          {/* ── Main column ── */}
          <main style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* Features grid */}
            {product.features?.length > 0 && (
              <section className="mb-12">
                <p className="section-label mb-3">What&apos;s Inside</p>
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
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
                >
                  {product.features.map((feat, i) => {
                    const [title, ...rest] = feat.split(" — ")
                    return (
                      <div key={i} className="feature-card">
                        <div className="flex items-start gap-3">
                          <span
                            style={{
                              minWidth: "1.4rem",
                              height: "1.4rem",
                              borderRadius: "50%",
                              background: "rgba(0,212,146,0.15)",
                              border: "1px solid rgba(0,212,146,0.3)",
                              color: "#00d492",
                              fontSize: "0.65rem",
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
                            <p
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "#edf2f7",
                                marginBottom: rest.length ? "0.2rem" : 0,
                                lineHeight: 1.35,
                              }}
                            >
                              {title}
                            </p>
                            {rest.length > 0 && (
                              <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>
                                {rest.join(" — ")}
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

            {/* Review article */}
            {articleHtml && (
              <section className="mb-12">
                <p className="section-label mb-3">Full Review</p>
                <div
                  className="prose-dark"
                  dangerouslySetInnerHTML={{ __html: articleHtml }}
                />
              </section>
            )}

            {/* OTO table */}
            {product.otos?.length > 0 && (
              <section className="mb-12">
                <p className="section-label mb-3">Upsell Funnel</p>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#edf2f7",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  OTO / Upsell Breakdown
                </h2>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
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
                            <p style={{ fontWeight: 700, color: "#edf2f7", marginBottom: "0.3rem", fontSize: "0.9rem" }}>
                              {oto.name}
                            </p>
                            <p style={{ fontSize: "0.82rem", color: "#7b8ea5", lineHeight: 1.55 }}>
                              {oto.description}
                            </p>
                          </td>
                          <td>
                            {oto.price ? (
                              <span style={{ fontWeight: 700, color: "#edf2f7", fontSize: "0.95rem" }}>
                                ${oto.price}
                              </span>
                            ) : (
                              <span style={{ color: "#4a5568", fontSize: "0.82rem" }}>See page</span>
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
              className="rounded-2xl p-8 text-center"
              style={{
                background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, rgba(13,17,23,1) 70%)",
                border: "1px solid rgba(0,212,146,0.2)",
              }}
            >
              <p className="section-label mb-3">Ready to buy?</p>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.025em",
                }}
              >
                Get {product.name} + My Exclusive Bonuses
              </h3>
              <p style={{ color: "#7b8ea5", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
                Buy through my link and unlock a stack of exclusive bonuses designed to help you get results faster.
              </p>
              <a
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
                style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}
              >
                Get {product.name} + Bonuses &#8594;
              </a>
              <p style={{ fontSize: "0.75rem", color: "#4a5568", marginTop: "0.75rem" }}>
                {product.landing?.urgency_line || "Bonuses expire at launch close"}
              </p>
              <div style={{ marginTop: "1rem" }}>
                <Link
                  href={`/${product.slug}-bonus`}
                  style={{ color: "#7b8ea5", fontSize: "0.82rem", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  See full bonus page
                </Link>
              </div>
            </div>

          </main>

          {/* ── Sidebar (desktop) ── */}
          <aside
            className="hidden lg:block"
            style={{ width: 270, flexShrink: 0, position: "sticky", top: 100 }}
          >
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(0,212,146,0.05)",
                border: "1px solid rgba(0,212,146,0.16)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#00d492",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  marginBottom: "0.75rem",
                }}
              >
                Quick Summary
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "0.25rem",
                  lineHeight: 1.25,
                }}
              >
                {product.name}
              </p>
              <div className="stars" style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                {[
                  { l: "Price", v: `$${product.price}` },
                  { l: "Commission", v: `${product.commission}%` },
                  { l: "Vendor", v: product.vendor?.split(" and ")[0] || "" },
                ].map(({ l, v }) => (
                  <div
                    key={l}
                    className="flex justify-between py-1.5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      fontSize: "0.82rem",
                    }}
                  >
                    <span style={{ color: "#7b8ea5" }}>{l}</span>
                    <span style={{ color: "#edf2f7", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <a
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
                style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem" }}
              >
                Get + Bonuses &#8594;
              </a>
              <Link
                href={`/${product.slug}-bonus`}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "0.6rem",
                  fontSize: "0.78rem",
                  color: "#7b8ea5",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                See bonus details
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
