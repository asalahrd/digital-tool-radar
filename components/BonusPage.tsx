import type { Product } from "@/lib/types"
import Link from "next/link"

const DEFAULT_BONUSES = [
  {
    name: "Quick-Start Checklist",
    description: "Step-by-step checklist to get your first result within 24 hours of purchase.",
    badge: "INSTANT ACCESS",
  },
  {
    name: "Campaign Template Pack",
    description: "Ready-to-use templates specifically designed for buyers of this product.",
    badge: "INSTANT ACCESS",
  },
  {
    name: "Custom Implementation Guide",
    description: "A personalised action plan built around your specific business goals.",
    badge: "READY IN 2 HRS",
  },
]

export default function BonusPage({ product }: { product: Product }) {
  const bonuses =
    product.landing && product.landing.bonuses && product.landing.bonuses.length > 0
      ? product.landing.bonuses
      : DEFAULT_BONUSES

  const bullets =
    product.landing && product.landing.bullets && product.landing.bullets.length > 0
      ? product.landing.bullets
      : [
          "Get up and running in minutes, not days",
          "Save hours with a pre-built action plan",
          "Exclusive bonuses you can't find anywhere else",
        ]

  const headline =
    product.landing && product.landing.headline
      ? product.landing.headline
      : "Get " + product.name + " + My Exclusive Bonus Stack"

  const ctaText =
    product.landing && product.landing.cta_text
      ? product.landing.cta_text
      : "Get " + product.name + " + My Bonuses"

  const urgency =
    product.landing && product.landing.urgency_line
      ? product.landing.urgency_line
      : "Bonuses expire at launch close"

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(0,212,146,0.12) 0%, transparent 65%)",
          padding: "4.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span
            className="badge badge-green"
            style={{ display: "inline-flex", marginBottom: "1.25rem" }}
          >
            Exclusive Bonuses
          </span>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#edf2f7",
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
              marginBottom: "1rem",
            }}
          >
            {headline}
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 1.75rem",
            }}
          >
            Buy {product.name} through my link and get a hand-picked bonus stack
            designed to help you get results faster.
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxWidth: 460,
              margin: "0 auto 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              textAlign: "left",
            }}
          >
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span
                  style={{
                    minWidth: "1.2rem",
                    height: "1.2rem",
                    borderRadius: "50%",
                    background: "rgba(0,212,146,0.15)",
                    border: "1px solid rgba(0,212,146,0.35)",
                    color: "#00d492",
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </span>
                <span style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
          >
            {ctaText} &rarr;
          </a>
          <p style={{ fontSize: "0.75rem", color: "#4a5568", marginTop: "0.6rem" }}>
            {urgency}
          </p>
        </div>
      </section>

      {/* Stats row */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {[
            { label: "Front-end Price", value: "$" + product.price, color: "#edf2f7" },
            { label: "Commission", value: product.commission + "%", color: "#00d492" },
            { label: "Bonuses Included", value: String(bonuses.length), color: "#a78bfa" },
            {
              label: "Vendor",
              value: product.vendor ? product.vendor.split(" and ")[0] : "Verified",
              color: "#edf2f7",
            },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#4a5568",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginTop: "0.3rem",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3.5rem 1.25rem" }}>

        {/* Bonus stack */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Your Exclusive Bonuses</p>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
            Everything You Get When You Buy Today
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {bonuses.map((bonus, i) => (
              <div key={i} className="bonus-card">
                <div className="bonus-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <p style={{ fontSize: "1rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.25 }}>
                      {bonus.name}
                    </p>
                    {bonus.badge && (
                      <span className="badge badge-green" style={{ fontSize: "0.6rem" }}>
                        {bonus.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.55 }}>
                    {bonus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>What You&apos;re Buying</p>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
              {product.name} Features
            </h2>
            <div
              style={{
                display: "grid",
                gap: "0.6rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {product.features.slice(0, 8).map((feat, i) => {
                const dashIdx = feat.indexOf(" — ")
                const title = dashIdx > -1 ? feat.slice(0, dashIdx) : feat
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ color: "#00d492", fontWeight: 800, fontSize: "0.75rem", marginTop: "0.1rem" }}>
                      &#10003;
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5 }}>
                      {title}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* OTO table */}
        {product.otos && product.otos.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Full Funnel</p>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
              Upsells at a Glance
            </h2>
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", overflow: "hidden" }}>
              <table className="oto-table">
                <thead style={{ background: "rgba(255,255,255,0.03)" }}>
                  <tr>
                    <th>Upsell</th>
                    <th style={{ width: 90 }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {product.otos.map((oto, i) => (
                    <tr key={i}>
                      <td>
                        <p style={{ fontWeight: 700, color: "#edf2f7", marginBottom: "0.2rem", fontSize: "0.875rem" }}>
                          {oto.name}
                        </p>
                        <p style={{ fontSize: "0.78rem", color: "#7b8ea5", lineHeight: 1.5 }}>
                          {oto.description}
                        </p>
                      </td>
                      <td>
                        {oto.price ? (
                          <strong style={{ color: "#edf2f7" }}>${oto.price}</strong>
                        ) : (
                          <span style={{ color: "#4a5568", fontSize: "0.78rem" }}>See page</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <div
          style={{
            background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, #0d1117 70%)",
            border: "1px solid rgba(0,212,146,0.2)",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Claim your bonuses</p>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#edf2f7", marginBottom: "0.6rem", letterSpacing: "-0.03em" }}>
            {ctaText}
          </h3>
          <p style={{ color: "#7b8ea5", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 1.75rem" }}>
            Buy through my link, forward your receipt, and your bonuses will be in your
            inbox within 2 hours.
          </p>
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            {ctaText} &rarr;
          </a>
          <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>
            {urgency}
          </p>
          <div style={{ marginTop: "0.75rem" }}>
            <Link
              href={"/" + product.slug + "-review"}
              style={{ color: "#7b8ea5", fontSize: "0.8rem", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Read the full review first
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
