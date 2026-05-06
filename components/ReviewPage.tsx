import type { Product } from "@/lib/types"
import Link from "next/link"
import SubscribeSection from "./SubscribeSection"

function VideoBlock({
  videoUrl,
  productName,
}: {
  videoUrl?: string
  productName: string
}) {
  if (!videoUrl) {
    return (
      <div
        style={{
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 2rem",
          marginBottom: "1.75rem",
          gap: "0.875rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(0,212,146,0.1)",
            border: "1px solid rgba(0,212,146,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <polygon points="6,3 20,12 6,21" fill="#00d492" />
          </svg>
        </div>
        <div>
          <p
            style={{
              color: "#edf2f7",
              fontWeight: 700,
              marginBottom: "0.25rem",
            }}
          >
            Full Video Review — Coming Soon
          </p>
          <p style={{ color: "#7b8ea5", fontSize: "0.875rem" }}>
            Subscribe below to get notified the moment it drops.
          </p>
        </div>
      </div>
    )
  }
  const ytbe = videoUrl.match(/youtu\.be\/([^?&]+)/)
  const watch = videoUrl.match(/[?&]v=([^?&]+)/)
  const id = ytbe ? ytbe[1] : watch ? watch[1] : null
  const embedUrl = id
    ? "https://www.youtube.com/embed/" + id + "?rel=0&modestbranding=1"
    : videoUrl
  return (
    <div
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        aspectRatio: "16/9",
        background: "#0d1117",
        marginBottom: "1.75rem",
      }}
    >
      <iframe
        src={embedUrl}
        title={productName + " Review Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  )
}

function renderInline(str: string) {
  const parts = str.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#edf2f7", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function ArticleBody({
  text,
  productName,
  affiliateLink,
}: {
  text: string
  productName: string
  affiliateLink: string
}) {
  if (!text) return null
  const blocks = text.split("\n\n").filter((b) => b.trim().length > 0)
  return (
    <div className="prose-dark">
      {blocks.map((block, i) => {
        const t = block.trim()
        if (t === "[CTA_BUTTON]") {
          return (
            <div
              key={i}
              style={{
                background: "rgba(0,212,146,0.06)",
                border: "1px solid rgba(0,212,146,0.2)",
                borderRadius: "1rem",
                padding: "1.75rem",
                margin: "2.5rem 0",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#edf2f7",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                  fontSize: "1.05rem",
                }}
              >
                Ready to get started with {productName}?
              </p>
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
              >
                Get {productName} + My Bonuses &rarr;
              </a>
            </div>
          )
        }
        if (t.startsWith("## ")) return <h2 key={i}>{renderInline(t.slice(3))}</h2>
        if (t.startsWith("### ")) return <h3 key={i}>{renderInline(t.slice(4))}</h3>
        if (t.startsWith("# ")) return <h1 key={i}>{renderInline(t.slice(2))}</h1>
        if (t.startsWith("* ") || t.startsWith("- ")) {
          const items = t
            .split("\n")
            .filter((l) => l.startsWith("* ") || l.startsWith("- "))
            .map((l) => l.slice(2))
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{renderInline(t.replace(/\n/g, " "))}</p>
      })}
    </div>
  )
}

function CTA({ product }: { product: Product }) {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, #0d1117 70%)",
        border: "1px solid rgba(0,212,146,0.2)",
        borderRadius: "1.25rem",
        padding: "2.5rem",
        textAlign: "center",
      }}
    >
      <p className="section-label" style={{ marginBottom: "0.5rem" }}>
        Ready to buy?
      </p>
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "#edf2f7",
          marginBottom: "0.6rem",
          letterSpacing: "-0.025em",
        }}
      >
        Get {product.name} + My Exclusive Bonuses
      </h3>
      <p
        style={{
          color: "#7b8ea5",
          fontSize: "0.95rem",
          marginBottom: "1.75rem",
        }}
      >
        Order through this page and your exclusive bonus stack lands in your
        inbox within 2 hours — included at no extra cost.
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
      <p
        style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}
      >
        {product.landing?.urgency_line || "Bonuses expire at launch close"}
      </p>
      <div style={{ marginTop: "0.75rem" }}>
        <Link
          href={"/" + product.slug + "-bonus"}
          style={{
            color: "#7b8ea5",
            fontSize: "0.8rem",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          See full bonus page
        </Link>
      </div>
    </div>
  )
}

export default function ReviewPage({ product }: { product: Product }) {
  const launchYear = product.launch_date
    ? new Date(product.launch_date).getFullYear()
    : new Date().getFullYear()

  const PROS = [
    "Replaces $958+/month in stacked tools for a one-time fee",
    "AI cold-start fix solves the #1 reason communities fail",
    "Viral gamification referral loop compounds growth automatically",
    "SEO thread indexing builds free organic traffic over time",
    "Agency rights included — sell community builds to clients",
  ]
  const CONS = [
    "Community limits on front-end; unlimited needs Gold ($127/yr)",
    "Email broadcasts to members require OTO 1",
    "You still need to drive your first 50–100 visitors",
    "AI-generated course content needs a human review pass",
  ]

  const CMP_FEATURES = [
    "One-Time Price",
    "AI Content Generation",
    "Viral Gamification",
    "Course Hosting",
    "SEO Thread Indexing",
    "Agency Rights",
    "Email List Building",
    "Cold-Start AI Fix",
    "Own Your Platform",
  ]
  const CMP_TOOLS = [
    "Massfluence 2.0",
    "Skool",
    "Kajabi",
    "Facebook Groups",
    "ClickFunnels",
  ]
  const CMP_DATA = [
    ["yes", "no", "no", "free*", "no"],
    ["yes", "no", "no", "no", "no"],
    ["yes", "no", "no", "no", "no"],
    ["yes", "partial", "yes", "no", "partial"],
    ["yes", "no", "no", "no", "no"],
    ["yes", "no", "no", "no", "no"],
    ["yes", "yes", "yes", "no", "yes"],
    ["yes", "no", "no", "no", "no"],
    ["yes", "yes", "yes", "no", "yes"],
  ]

  const FAQS = [
    {
      q: "Is this beginner-friendly? Do I need tech experience?",
      a: "No experience needed. Everything is point-and-click. Templates handle the design. AI handles the content. Setup from login to a live community takes under 30 minutes. If you can use Facebook, you can use this.",
    },
    {
      q: "Does it work if I have zero audience right now?",
      a: "Yes — the AI prepopulation feature specifically solves this. Your community looks active and busy before a single real member joins. Then the viral referral gamification kicks in to grow it organically once you have even a handful of real participants.",
    },
    {
      q: "How does it compare to Skool?",
      a: "Skool is $99/month with no AI, no built-in gamification, and limited course selling at the base tier. Massfluence 2.0 includes AI content, viral gamification referrals, full course hosting, autoresponder sync, and agency rights — for a one-time price. The math is not close.",
    },
    {
      q: "Is the $47 front-end enough, or do I need the upsells?",
      a: "The front-end is fully functional. You can build communities, host courses, sell products, and use the gamification features. The upsells remove limits and add advanced tools (email broadcasts, unlimited communities, whitelabel). They're not required to get real value from the base product.",
    },
    {
      q: "Can I cancel Kajabi or Skool after buying this?",
      a: "If you use those platforms mainly for community and course hosting, yes. Massfluence handles both. If you rely on Kajabi's advanced email broadcasts or deep sales funnels, keep a dedicated email tool alongside — or add OTO 1 to get email broadcast functionality built in.",
    },
    {
      q: "Is this a monthly subscription?",
      a: "The front-end is a one-time fee at launch. OTO 1 (Gold) is billed yearly at $127. After the launch window closes, pricing typically moves to a recurring monthly model — buying during launch is the best deal you'll get.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "Massfluence 2.0 comes with a 30-day money-back guarantee. If you set it up and it doesn't deliver, you can request a refund within 30 days.",
    },
  ]

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
          {/* Badges — no commission badge */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
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
            <span style={{ color: "#7b8ea5", fontWeight: 600 }}>
              Honest Look After Testing It
            </span>
          </h1>

          <div
            className="stars"
            style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}
          >
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span
              style={{
                color: "#7b8ea5",
                fontSize: "0.82rem",
                marginLeft: "0.6rem",
                fontWeight: 400,
              }}
            >
              4/5 &mdash; Early Access Review
            </span>
          </div>

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

          {/* Product image */}
          {product.product_image && (
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "1.25rem",
                background: "#0d1117",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={product.product_image}
                alt={product.name + " screenshot"}
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: 420,
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </div>
          )}

          {/* Video section */}
          <VideoBlock
            videoUrl={product.video_url}
            productName={product.name}
          />

          {/* Price + CTA block */}
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
                <p
                  style={{
                    color: "#7b8ea5",
                    fontSize: "0.78rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Launch price
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
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#7b8ea5",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    one-time
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
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "#4a5568",
                    marginTop: "0.4rem",
                    textAlign: "center",
                  }}
                >
                  {product.landing?.urgency_line ||
                    "Bonuses expire at launch close"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta grid — Price, Niche, Rating, Launch */}
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            }}
          >
            {[
              { label: "Price", value: "$" + product.price + " one-time" },
              { label: "Niche", value: product.niche },
              { label: "Rating", value: "4 / 5 ★" },
              {
                label: "30-Day",
                value: "Money-Back",
              },
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
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "#4a5568",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#edf2f7",
                    fontWeight: 600,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Verdict */}
      <section
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "2.5rem 1.25rem 0",
        }}
      >
        <p className="section-label" style={{ marginBottom: "0.5rem" }}>
          IS THIS RIGHT FOR YOU?
        </p>
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#edf2f7",
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          Quick Verdict
        </h2>
        <div className="verdict-box">
          <div className="verdict-row">
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#00d492",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.75rem",
                }}
              >
                &#10003; BEST FOR
              </p>
              {[
                "Course creators & coaches tired of Kajabi fees",
                "Marketers building a community from scratch",
                "Agencies wanting a community-building service offer",
                "Anyone paying for Skool who wants to own their platform",
                "Beginners — no tech skills required",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="verdict-dot-green" />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#ef4444",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.75rem",
                }}
              >
                &#10005; NOT IDEAL FOR
              </p>
              {[
                "Those who expect zero traffic effort",
                "Enterprise e-commerce with deep inventory management",
                "Users who already own a thriving private community",
                "People only looking for a standalone email tool",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="verdict-dot-red" />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "1.25rem",
              marginTop: "0.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#7b8ea5",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              MY VERDICT
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#94a3b8",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              At $47 one-time replacing $958/month in stacked tools, this is a
              no-brainer for community-focused marketers. The AI cold-start fix
              alone is worth the price of admission.
            </p>
            <div className="stars" style={{ fontSize: "1rem" }}>
              &#9733;&#9733;&#9733;&#9733;&#9734;
              <span
                style={{
                  color: "#7b8ea5",
                  fontSize: "0.82rem",
                  marginLeft: "0.4rem",
                }}
              >
                4/5
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-column layout */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Main column */}
          <main style={{ flex: "1 1 0", minWidth: 0 }}>
            {/* Pros / Cons */}
            <section style={{ marginBottom: "3rem" }}>
              <p
                className="section-label"
                style={{ marginBottom: "0.5rem" }}
              >
                At a Glance
              </p>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Pros &amp; Cons
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "rgba(0,212,146,0.05)",
                    border: "1px solid rgba(0,212,146,0.15)",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#00d492",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "1rem",
                    }}
                  >
                    Pros
                  </p>
                  {PROS.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        alignItems: "flex-start",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#00d492",
                          fontSize: "0.75rem",
                          marginTop: "0.15rem",
                          flexShrink: 0,
                        }}
                      >
                        &#10003;
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "#94a3b8",
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "rgba(239,68,68,0.04)",
                    border: "1px solid rgba(239,68,68,0.12)",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#ef4444",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "1rem",
                    }}
                  >
                    Cons
                  </p>
                  {CONS.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        alignItems: "flex-start",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.75rem",
                          marginTop: "0.15rem",
                          flexShrink: 0,
                        }}
                      >
                        &#10005;
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "#94a3b8",
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p
                  className="section-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  What&apos;s Inside
                </p>
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
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(260px, 1fr))",
                  }}
                >
                  {product.features.map((feat, i) => {
                    const dashIdx = feat.indexOf(" — ")
                    const title =
                      dashIdx > -1 ? feat.slice(0, dashIdx) : feat
                    const desc =
                      dashIdx > -1 ? feat.slice(dashIdx + 3) : ""
                    return (
                      <div key={i} className="feature-card">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                          }}
                        >
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
                            <p
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "#edf2f7",
                                marginBottom: desc ? "0.2rem" : 0,
                                lineHeight: 1.35,
                              }}
                            >
                              {title}
                            </p>
                            {desc && (
                              <p
                                style={{
                                  fontSize: "0.78rem",
                                  color: "#7b8ea5",
                                  lineHeight: 1.5,
                                }}
                              >
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

            {/* Screenshots */}
            {product.screenshots && product.screenshots.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p
                  className="section-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Inside the Dashboard
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    overflowX: "auto",
                    paddingBottom: "0.5rem",
                  }}
                >
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

            {/* Full Review Article */}
            {product.review_article && (
              <section style={{ marginBottom: "3rem" }}>
                <p
                  className="section-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Full Review
                </p>
                <ArticleBody
                  text={product.review_article}
                  productName={product.name}
                  affiliateLink={product.affiliate_link}
                />
              </section>
            )}

            {/* Comparison Table */}
            <section style={{ marginBottom: "3rem" }}>
              <p
                className="section-label"
                style={{ marginBottom: "0.5rem" }}
              >
                How It Stacks Up
              </p>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {product.name} vs. The Alternatives
              </h2>
              <p
                style={{
                  color: "#7b8ea5",
                  fontSize: "0.9rem",
                  marginBottom: "1.25rem",
                }}
              >
                How Massfluence 2.0 compares to Skool, Kajabi, Facebook
                Groups, and ClickFunnels on the features that matter most.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="cmp-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Feature</th>
                      {CMP_TOOLS.map((t) => (
                        <th
                          key={t}
                          style={{
                            textAlign: "center",
                            ...(t === "Massfluence 2.0"
                              ? { color: "#00d492" }
                              : {}),
                          }}
                        >
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CMP_FEATURES.map((feat, ri) => (
                      <tr key={feat}>
                        <td
                          style={{
                            color: "#94a3b8",
                            fontSize: "0.875rem",
                          }}
                        >
                          {feat}
                        </td>
                        {CMP_DATA[ri].map((val, ci) => (
                          <td key={ci} style={{ textAlign: "center" }}>
                            {val === "yes" && (
                              <span className="cmp-yes">&#10003;</span>
                            )}
                            {val === "no" && (
                              <span className="cmp-no">&#10005;</span>
                            )}
                            {val === "partial" && (
                              <span className="cmp-partial">&#126;</span>
                            )}
                            {val === "free*" && (
                              <span className="cmp-partial">Free*</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#4a5568",
                  marginTop: "0.75rem",
                }}
              >
                * Facebook Groups is free but you don&apos;t own your
                audience &mdash; Meta can ban your group or cut your reach at
                any time.
              </p>
            </section>

            {/* OTO table */}
            {product.otos && product.otos.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <p
                  className="section-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Upsell Funnel
                </p>
                <h2
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "#edf2f7",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  OTO / Upsell Breakdown
                </h2>
                <div
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <table className="oto-table">
                    <thead
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
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
                            <p
                              style={{
                                fontWeight: 700,
                                color: "#edf2f7",
                                marginBottom: "0.25rem",
                                fontSize: "0.875rem",
                              }}
                            >
                              {oto.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.8rem",
                                color: "#7b8ea5",
                                lineHeight: 1.5,
                              }}
                            >
                              {oto.description}
                            </p>
                          </td>
                          <td>
                            {oto.price ? (
                              <strong style={{ color: "#edf2f7" }}>
                                ${oto.price}
                              </strong>
                            ) : (
                              <span
                                style={{
                                  color: "#4a5568",
                                  fontSize: "0.8rem",
                                }}
                              >
                                See page
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="badge badge-green">
                              Reviewed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* FAQ */}
            <section style={{ marginBottom: "3rem" }}>
              <p
                className="section-label"
                style={{ marginBottom: "0.5rem" }}
              >
                COMMON QUESTIONS
              </p>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Questions Before You Buy
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {FAQS.map((faq, i) => (
                  <details key={i} className="faq-item">
                    <summary>{faq.q}</summary>
                    <div className="faq-body">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Subscribe section */}
            <SubscribeSection />

            {/* Bottom CTA */}
            <div style={{ marginTop: "3rem" }}>
              <CTA product={product} />
            </div>
          </main>

          {/* Sidebar */}
          <aside
            className="hidden lg:block"
            style={{
              width: 260,
              flexShrink: 0,
              position: "sticky",
              top: 90,
            }}
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
                    objectFit: "contain",
                    maxHeight: 130,
                    background: "#0d1117",
                  }}
                />
              )}
              <p
                className="section-label"
                style={{ marginBottom: "0.6rem" }}
              >
                Quick Summary
              </p>
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "#edf2f7",
                  marginBottom: "0.25rem",
                  lineHeight: 1.25,
                }}
              >
                {product.name}
              </p>
              <div
                className="stars"
                style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </div>
              <div
                className="divider"
                style={{ margin: "0.75rem 0" }}
              />
              {[
                { l: "Price", v: "$" + product.price },
                { l: "Guarantee", v: "30 days" },
                { l: "Rating", v: "4 / 5 ★" },
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
                  <span style={{ color: "#edf2f7", fontWeight: 600 }}>
                    {v}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: "1rem" }}>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#4a5568",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Why Buy
                </p>
                {PROS.slice(0, 3).map((pro, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        color: "#00d492",
                        fontSize: "0.65rem",
                        flexShrink: 0,
                        marginTop: "0.15rem",
                      }}
                    >
                      &#10003;
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#7b8ea5",
                        lineHeight: 1.4,
                      }}
                    >
                      {pro}
                    </span>
                  </div>
                ))}
              </div>
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
                    style={{
                      fontSize: "0.75rem",
                      color: "#7b8ea5",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
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
