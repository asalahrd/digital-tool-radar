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
  const bonuses = product.landing?.bonuses?.length
    ? product.landing.bonuses
    : DEFAULT_BONUSES

  const bullets = product.landing?.bullets?.length
    ? product.landing.bullets
    : [
        "Get up and running in minutes, not days",
        "Save hours of research with a pre-built setup",
        "Exclusive bonuses you can't find anywhere else",
      ]

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(0,212,146,0.12) 0%, transparent 65%)",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto px-5 text-center" style={{ maxWidth: 720 }}>
          <span className="badge badge-green mb-5" style={{ display: "inline-flex" }}>
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
            {product.landing?.headline || `Get ${product.name} + My Exclusive Bonus Stack`}
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: 560,
              margin: "0 auto 1.75rem",
            }}
          >
            {product.landing?.sub_headline ||
              `Buy ${product.name} through my link and get a hand-picked bonus stack designed to help you get results faster.`}
          </p>

          {/* Bullet points */}
          <ul
            className="text-left mx-auto mb-8"
            style={{
              maxWidth: 480,
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem",
            }}
          >
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  style={{
                    minWidth: "1.2rem",
                    height: "1.2rem",
                    borderRadius: "50%",
                    background: "rgba(0,212,146,0.15)",
                    border: "1px solid rgba(0,212,146,0.35)",
                    color: "#00d492",
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "0.15rem",
                  }}
                >
                  &#10003;
                </span>
                <span style={{ fontSize: "0.975rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
          >
            {product.landing?.cta_text || `Get ${product.name} + My Bonuses`} &#8594;
          </a>
          <p style={{ fontSize: "0.78rem", color: "#4a5568", marginTop: "0.75rem" }}>
            {product.landing?.urgency_line || "Bonuses expire at launch close"}
          </p>
        </div>
      </section>

      {/* ── Stats row ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="mx-auto px-5 py-5 flex flex-wrap justify-center gap-8"
          style={{ maxWidth: 900 }}
        >
          {[
            { label: "Front-end Price", value: `$${product.price}`, color: "#edf2f7" },
            { label: "Commission", value: `${product.commission}%`, color: "#00d492" },
            { label: "Bonuses Included", value: `${bonuses.length}`, color: "#a78bfa" },
            { label: "Vendor", value: product.vendor?.split(" and ")[0] || "Verified", color: "#edf2f7" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p style={{ fontSize: "0.72rem", color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.3rem" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto px-5 py-14" style={{ maxWidth: 860 }}>

        {/* ── Bonus stack ── */}
        <section className="mb-14">
          <p className="section-label mb-3">Your Exclusive Bonuses</p>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#edf2f7",
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            Everything You Get When You Buy Today
          </h2>
          <div className="flex flex-col gap-4">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bonus-card">
                <div className="bonus-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#edf2f7",
                        lineHeight: 1.25,
                      }}
                    >
                      {bonus.name}
                    </p>
                    {bonus.badge && (
                      <span className="badge badge-green" style={{ fontSize: "0.62rem" }}>
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

        {/* ── Product features ── */}
        {product.features?.length > 0 && (
          <section className="mb-14">
            <p className="section-label mb-3">What You&apos;re Buying</p>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#edf2f7",
                marginBottom: "1.25rem",
                letterSpacing: "-0.025em",
              }}
            >
              {product.name} Features
            </h2>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
            >
              {product.features.slice(0, 8).map((feat, i) => {
                const [title] = feat.split(" — ")
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        color: "#00d492",
                        fontSize: "0.8rem",
                        marginTop: "0.15rem",
                        fontWeight: 800,
                      }}
                    >
                      &#10003;
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#94a3b8",
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── OTO section ── */}
        {product.otos?.length > 0 && (
          <section className="mb-14">
            <p className="section-label mb-3">Full Funnel</p>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#edf2f7",
                marginBottom: "1.25rem",
                letterSpacing: "-0.025em",
              }}
            >
              Upsells at a Glance
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
                  </tr>
                </thead>
                <tbody>
                  {product.otos.map((oto, i) => (
                    <tr key={i}>
                      <td>
                        <p style={{ fontWeight: 700, color: "#edf2f7", marginBottom: "0.2rem", fontSize: "0.875rem" }}>
                          {oto.name}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>
                          {oto.description}
                        </p>
                      </td>
                      <td>
                        {oto.price ? (
                          <span style={{ fontWeight: 700, color: "#edf2f7" }}>
                            ${oto.price}
                          </span>
                        ) : (
                          <span style={{ color: "#4a5568", fontSize: "0.8rem" }}>See page</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, rgba(13,17,23,1) 70%)",
            border: "1px solid rgba(0,212,146,0.2)",
          }}
        >
          <p className="section-label mb-3">Claim your bonuses</p>
          <h3
            style={{
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "#edf2f7",
              marginBottom: "0.6rem",
              letterSpacing: "-0.03em",
            }}
          >
            {product.landing?.cta_text || `Get ${product.name} + Bonuses`}
          </h3>
          <p
            style={{
              color: "#7b8ea5",
              fontSize: "0.95rem",
              marginBottom: "1.75rem",
              maxWidth: 460,
              margin: "0 auto 1.75rem",
            }}
          >
            Buy through my link, forward your receipt, and your bonuses will be in your inbox within 2 hours.
          </p>
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            Get {product.name} + My Bonuses &#8594;
          </a>
          <p style={{ fontSize: "0.75rem", color: "#4a5568", marginTop: "0.75rem" }}>
            {product.landing?.urgency_line || "Bonuses expire at launch close"}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link
              href={`/${product.slug}-review`}
              style={{
                color: "#7b8ea5",
                fontSize: "0.82rem",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Read the full review first
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
