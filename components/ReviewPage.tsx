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
          <p style={{ color: "#edf2f7", fontWeight: 700, marginBottom: "0.25rem" }}>
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
              <p style={{ color: "#edf2f7", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.05rem" }}>
                Ready to get started with {productName}?
              </p>
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
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

function DominantCTA({ product, headline, sub }: { product: Product; headline: string; sub: string }) {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.12) 0%, #0d1117 70%)",
        border: "1px solid rgba(0,212,146,0.25)",
        borderRadius: "1.25rem",
        padding: "2.5rem",
        textAlign: "center",
        margin: "2.5rem 0",
      }}
    >
      <p style={{ color: "#00d492", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        Limited Launch Pricing
      </p>
      <h3
        style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          color: "#edf2f7",
          marginBottom: "0.6rem",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
        }}
      >
        {headline}
      </h3>
      <p style={{ color: "#7b8ea5", fontSize: "0.9rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
        {sub}
      </p>
      <a
        href={product.affiliate_link}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-primary"
        style={{ fontSize: "1.05rem", padding: "0.875rem 2.25rem" }}
      >
        Get {product.name} + My Bonuses &rarr;
      </a>
      <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>
        {product.landing?.urgency_line || "Bonuses expire at launch close"}
      </p>
      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          marginTop: "1.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {["30-Day Guarantee", "Instant Access", "Exclusive Bonuses"].map((b) => (
          <span key={b} style={{ fontSize: "0.75rem", color: "#7b8ea5", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#00d492" strokeWidth="1.5" />
              <polyline points="5,8 7,10 11,6" stroke="#00d492" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

function InsightCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: "3px solid #00d492",
        borderRadius: "0 0.875rem 0.875rem 0",
        padding: "1.25rem 1.5rem",
        marginBottom: "1rem",
      }}
    >
      <p style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{icon}</p>
      <p style={{ fontSize: "0.925rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.4rem" }}>{title}</p>
      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{body}</p>
    </div>
  )
}

function InlineCTA({ product }: { product: Product }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        background: "rgba(0,212,146,0.05)",
        border: "1px solid rgba(0,212,146,0.15)",
        borderRadius: "0.875rem",
        padding: "1.25rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      <p style={{ fontSize: "0.925rem", color: "#edf2f7", fontWeight: 600, margin: 0 }}>
        Seen enough? Lock in launch pricing now.
      </p>
      <a
        href={product.affiliate_link}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-primary btn-sm"
      >
        Get {product.name} &rarr;
      </a>
    </div>
  )
}

function CTA({ product }: { product: Product }) {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, #0d1117 70%)",
        border: "1px solid rgba(0,212,146,0.2)",
        borderRadius: "1.25rem",
        padding: "2.5rem",
        textAlign: "center",
      }}
    >
      <p className="section-label" style={{ marginBottom: "0.5rem" }}>
        Ready to buy?
      </p>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.6rem", letterSpacing: "-0.025em" }}>
        Get {product.name} + My Exclusive Bonuses
      </h3>
      <p style={{ color: "#7b8ea5", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
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
  const CMP_TOOLS = ["Massfluence 2.0", "Skool", "Kajabi", "Facebook Groups", "ClickFunnels"]
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

  const OTO_ROWS = product.oto_stack || []

  return (
    <>
      {/* ── STICKY BAR ─────────────────────────────────────────────────────────── */}
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

      {/* ── HERO ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,212,146,0.07) 0%, transparent 65%)",
          padding: "3.5rem 1.25rem 3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {/* Badges */}
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

          <div className="stars" style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.6rem", fontWeight: 400 }}>
              4/5 &mdash; Early Access Review
            </span>
          </div>

          <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {product.tagline}
          </p>

          {/* Quick Fit Checker */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "0.875rem",
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.75rem" }}>
              Quick Fit Check
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { label: "Works for beginners", ok: true },
                { label: "No paid ads needed", ok: true },
                { label: "Setup ~15 min", ok: true },
                { label: "Course creators", ok: true },
                { label: "Enterprise e-commerce", ok: false },
                { label: "Standalone email tool", ok: false },
              ].map(({ label, ok }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "2rem",
                    background: ok ? "rgba(0,212,146,0.08)" : "rgba(239,68,68,0.07)",
                    border: ok ? "1px solid rgba(0,212,146,0.2)" : "1px solid rgba(239,68,68,0.18)",
                    color: ok ? "#00d492" : "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  {ok ? "✔" : "✘"} {label}
                </span>
              ))}
            </div>
          </div>

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
                style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          )}

          {/* Video section */}
          <VideoBlock videoUrl={product.video_url} productName={product.name} />

          {/* Dominant price + CTA block */}
          <div
            style={{
              background: "rgba(0,212,146,0.07)",
              border: "1px solid rgba(0,212,146,0.22)",
              borderRadius: "1.125rem",
              padding: "1.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <p style={{ color: "#7b8ea5", fontSize: "0.75rem", marginBottom: "0.2rem" }}>Launch price</p>
                <p style={{ fontSize: "2.25rem", fontWeight: 900, color: "#edf2f7", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  ${product.price}
                  <span style={{ fontSize: "0.85rem", color: "#7b8ea5", fontWeight: 400 }}> one-time</span>
                </p>
                <p style={{ fontSize: "0.78rem", color: "#7b8ea5", marginTop: "0.25rem" }}>
                  vs. <span style={{ textDecoration: "line-through", color: "#4a5568" }}>$958/mo</span> in stacked tools
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary"
                  style={{ fontSize: "1rem", padding: "0.875rem 1.75rem" }}
                >
                  Get {product.name} + My Bonuses &rarr;
                </a>
                <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.4rem" }}>
                  {product.landing?.urgency_line || "Bonuses expire at launch close"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
            {[
              { label: "Price", value: "$" + product.price + " one-time" },
              { label: "Niche", value: product.niche },
              { label: "Setup", value: "~15 min" },
              { label: "Rating", value: "4 / 5 ★" },
              { label: "Guarantee", value: "30-Day" },
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
                <p style={{ fontSize: "0.875rem", color: "#edf2f7", fontWeight: 600 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK VERDICT ──────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <p className="section-label" style={{ marginBottom: "0.5rem" }}>IS THIS RIGHT FOR YOU?</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          Quick Verdict
        </h2>
        <div className="verdict-box">
          <div className="verdict-row">
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                &#10003; BEST FOR
              </p>
              {[
                "Course creators & coaches tired of Kajabi fees",
                "Marketers building a community from scratch",
                "Agencies wanting a community-building service offer",
                "Anyone paying for Skool who wants to own their platform",
                "Beginners — no tech skills required",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span className="verdict-dot-green" />
                  <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                &#10005; NOT IDEAL FOR
              </p>
              {[
                "Those who expect zero traffic effort",
                "Enterprise e-commerce with deep inventory management",
                "Users who already own a thriving private community",
                "People only looking for a standalone email tool",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span className="verdict-dot-red" />
                  <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              MY VERDICT
            </p>
            <p style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              At $47 one-time replacing $958/month in stacked tools, this is a
              no-brainer for community-focused marketers. The AI cold-start fix
              alone is worth the price of admission.
            </p>
            <div className="stars" style={{ fontSize: "1rem" }}>
              &#9733;&#9733;&#9733;&#9733;&#9734;
              <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.4rem" }}>4/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY I ALMOST SKIPPED THIS ──────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <div
          style={{
            borderLeft: "3px solid #00d492",
            background: "rgba(0,212,146,0.04)",
            borderRadius: "0 0.875rem 0.875rem 0",
            padding: "1.5rem 1.75rem",
          }}
        >
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.5rem" }}>
            My Honest Take
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Why I Almost Skipped This
          </h2>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "0.875rem" }}>
            I&rsquo;ve reviewed over 40 community-building tools in the past two years. Most of them promise the same thing — &ldquo;build your tribe, monetize your knowledge&rdquo; — and then dump you on a blank dashboard with zero members and zero momentum.
          </p>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "0.875rem" }}>
            When I first saw Massfluence 2.0, I filed it under &ldquo;another community SaaS I&rsquo;ll skip.&rdquo; The name sounded like a buzzword mashup. Then I spotted two features buried in the sales page that made me stop scrolling.
          </p>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.75 }}>
            First: <strong style={{ color: "#edf2f7" }}>AI cold-start</strong> — it pre-populates your community with AI-generated posts and discussions so it never looks like a ghost town. Second: <strong style={{ color: "#edf2f7" }}>viral referral gamification</strong> — built-in points and leaderboards that turn existing members into your growth engine. I&rsquo;ve paid for those two features as separate $99/mo tools. Here they&rsquo;re both included at $47 one-time. I bought it within 20 minutes.
          </p>
        </div>
      </section>

      {/* ── MAIN 2-COLUMN LAYOUT ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
          {/* ── MAIN COLUMN ── */}
          <main style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* PROS / CONS */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>At a Glance</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                Pros &amp; Cons
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ background: "rgba(0,212,146,0.05)", border: "1px solid rgba(0,212,146,0.15)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                    Pros
                  </p>
                  {PROS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <span style={{ color: "#00d492", fontSize: "0.8rem", marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                    Cons
                  </p>
                  {CONS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.1rem", flexShrink: 0 }}>✗</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* INLINE CTA after Pros/Cons */}
            <InlineCTA product={product} />

            {/* FEATURES */}
            {product.features && product.features.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>What You Get</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                  Key Features
                </h2>
                <div style={{ display: "grid", gap: "0.875rem" }}>
                  {product.features.map((f: { name: string; description: string }, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.875rem",
                        padding: "1.125rem 1.25rem",
                        display: "flex",
                        gap: "0.875rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "rgba(0,212,146,0.1)",
                          border: "1px solid rgba(0,212,146,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.7rem",
                          color: "#00d492",
                          fontWeight: 800,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.2rem" }}>{f.name}</p>
                        <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.55 }}>{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WHAT NOBODY EXPLAINS */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Underrated Stuff</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                What Nobody Explains About This
              </h2>
              <InsightCard
                icon="🏚️"
                title="The Empty Room Problem — Finally Solved"
                body="Every community tool launches you into a silent, empty room. It's the reason most people abandon community-building within a week. The AI prepopulation in Massfluence fills your space with relevant posts, questions, and discussions before you invite a single person. First impressions drive first joins. This changes the math entirely."
              />
              <InsightCard
                icon="🔎"
                title="The SEO Angle You Didn't Buy It For"
                body="The SEO thread indexing feature turns your community discussions into Google-searchable content. Over 90 days, your community pages start ranking for long-tail keywords in your niche. Most members don't even notice this is happening — but it quietly compounds into free organic traffic month after month."
              />
              <InsightCard
                icon="🎮"
                title="The Gamification Loop That Replaces Ads"
                body="The viral referral gamification isn't just a points leaderboard — it's a structured growth flywheel. Members earn points for inviting friends, completing courses, and engaging with content. Top members get visible status. The result: your most engaged users recruit for you, and your retention skyrockets because leaving means losing rank."
              />
            </section>

            {/* SCREENSHOTS */}
            {product.screenshots && product.screenshots.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Inside the Platform</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                  Screenshots
                </h2>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                  {product.screenshots.map((src: string, i: number) => (
                    <div key={i} style={{ borderRadius: "0.875rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#0d1117" }}>
                      <img src={src} alt={"Screenshot " + (i + 1)} style={{ width: "100%", display: "block" }} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ARTICLE BODY */}
            {product.review_body && (
              <section style={{ marginBottom: "2.5rem" }}>
                <ArticleBody
                  text={product.review_body}
                  productName={product.name}
                  affiliateLink={product.affiliate_link}
                />
              </section>
            )}

            {/* QUICK REALITY CHECK */}
            <section style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  background: "rgba(245,158,11,0.05)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.75rem" }}>
                  ⚡ Quick Reality Check
                </p>
                <div style={{ display: "grid", gap: "0.6rem" }}>
                  {[
                    { icon: "✔", color: "#00d492", text: "You can build a fully-functional community in under 15 minutes" },
                    { icon: "✔", color: "#00d492", text: "The AI content seeder genuinely removes the blank-page problem" },
                    { icon: "✔", color: "#00d492", text: "Agency rights let you productize this as a service immediately" },
                    { icon: "⚠", color: "#f59e0b", text: "Email broadcasts need OTO 1 — budget $127/yr if that's your plan" },
                    { icon: "⚠", color: "#f59e0b", text: "You still need to bring your first 50-100 members yourself" },
                    { icon: "✘", color: "#ef4444", text: "Not a magic traffic machine — growth requires your initial push" },
                  ].map(({ icon, color, text }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                      <span style={{ color, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0, marginTop: "0.05rem" }}>{icon}</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DOMINANT CTA - MID PAGE */}
            <DominantCTA
              product={product}
              headline={"Still reading? That's the right move. Get " + product.name + " + My Exclusive Bonuses"}
              sub={"Order through this page and your $171 bonus stack lands in your inbox within 2 hours — at no extra cost."}
            />

            {/* COMPARISON TABLE */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>How It Stacks Up</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                {product.name} vs. The Competition
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "0.6rem 0.875rem", color: "#7b8ea5", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" }}>
                        Feature
                      </th>
                      {CMP_TOOLS.map((t, i) => (
                        <th
                          key={t}
                          style={{
                            padding: "0.6rem 0.875rem",
                            color: i === 0 ? "#00d492" : "#7b8ea5",
                            fontWeight: i === 0 ? 700 : 600,
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: i === 0 ? "rgba(0,212,146,0.04)" : "transparent",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CMP_FEATURES.map((feat, ri) => (
                      <tr key={feat} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "0.55rem 0.875rem", color: "#94a3b8" }}>{feat}</td>
                        {CMP_DATA[ri].map((val, ci) => (
                          <td
                            key={ci}
                            style={{
                              padding: "0.55rem 0.875rem",
                              textAlign: "center",
                              background: ci === 0 ? "rgba(0,212,146,0.03)" : "transparent",
                              color:
                                val === "yes"
                                  ? "#00d492"
                                  : val === "no"
                                  ? "#ef4444"
                                  : "#f59e0b",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                            }}
                          >
                            {val === "yes" ? "✓" : val === "no" ? "✗" : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.75rem" }}>* Facebook Groups is free but you own nothing; no monetization or advanced features.</p>
            </section>

            {/* INLINE CTA after comparison */}
            <InlineCTA product={product} />

            {/* HIDDEN USE CASE */}
            <section style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  background: "rgba(139,92,246,0.05)",
                  border: "1px solid rgba(139,92,246,0.18)",
                  borderLeft: "3px solid #8b5cf6",
                  borderRadius: "0 0.875rem 0.875rem 0",
                  padding: "1.5rem 1.75rem",
                }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.5rem" }}>
                  Hidden Use Case
                </p>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
                  The Agency Play Most Buyers Miss
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                  The agency rights included in Massfluence 2.0 are more valuable than most buyers realize. You don&rsquo;t just get to use the platform — you get to build and sell fully-branded community setups to clients.
                </p>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7 }}>
                  Local businesses, coaches, and course creators routinely pay $500–$2,000 for someone to &ldquo;set up their community platform.&rdquo; You could charge $497 to build a branded Massfluence community, seed it with AI content, configure the gamification, and hand over the keys. One client recoups your investment 10x. This is a productized service waiting to happen.
                </p>
              </div>
            </section>

            {/* OTO STACK */}
            {OTO_ROWS.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Full Funnel</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                  Upsell Stack (OTOs)
                </h2>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {OTO_ROWS.map((oto: { name: string; price: string; description: string; recommended?: boolean }, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: oto.recommended ? "rgba(0,212,146,0.05)" : "rgba(255,255,255,0.02)",
                        border: oto.recommended ? "1px solid rgba(0,212,146,0.18)" : "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.875rem",
                        padding: "1.125rem 1.25rem",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          color: oto.recommended ? "#00d492" : "#7b8ea5",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          background: oto.recommended ? "rgba(0,212,146,0.1)" : "rgba(255,255,255,0.05)",
                          border: oto.recommended ? "1px solid rgba(0,212,146,0.2)" : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "0.375rem",
                          padding: "0.2rem 0.5rem",
                          whiteSpace: "nowrap",
                          marginTop: "0.1rem",
                        }}
                      >
                        OTO {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7" }}>{oto.name}</p>
                          {oto.recommended && (
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#00d492", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "2rem", padding: "0.1rem 0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              Recommended
                            </span>
                          )}
                          <span style={{ fontSize: "0.8rem", color: "#7b8ea5", marginLeft: "auto" }}>{oto.price}</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>{oto.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BONUS VALUE STACK */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Order Through This Page</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                My Exclusive Bonus Stack
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Buy through my link and get these three bonuses delivered to your inbox within 2 hours — completely free.
              </p>
              <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {[
                  {
                    icon: "🚀",
                    title: "Cold Start Playbook",
                    desc: "Step-by-step system for getting your first 100 community members — even with zero existing audience. Includes AI prompt templates and traffic playbook.",
                    outcome: "Get to 100 members faster",
                    value: "$47",
                  },
                  {
                    icon: "💬",
                    title: "Community-to-Cash Blueprint",
                    desc: "Monetization map showing exactly how to turn an engaged community into a recurring revenue stream — courses, coaching, memberships, and products.",
                    outcome: "Turn engagement into revenue",
                    value: "$97",
                  },
                  {
                    icon: "📧",
                    title: "7-Day Launch Sequence",
                    desc: "Done-for-you email sequence you can send to your list to announce your new community and drive your first wave of motivated founding members.",
                    outcome: "Launch with momentum",
                    value: "$27",
                  },
                ].map((bonus) => (
                  <div
                    key={bonus.title}
                    style={{
                      background: "rgba(0,212,146,0.03)",
                      border: "1px solid rgba(0,212,146,0.14)",
                      borderRadius: "1rem",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ fontSize: "1.75rem" }}>{bonus.icon}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#edf2f7" }}>{bonus.title}</p>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          color: "#00d492",
                          background: "rgba(0,212,146,0.1)",
                          border: "1px solid rgba(0,212,146,0.2)",
                          borderRadius: "2rem",
                          padding: "0.15rem 0.5rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Value: {bonus.value}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6, flex: 1 }}>{bonus.desc}</p>
                    <p style={{ fontSize: "0.75rem", color: "#00d492", fontWeight: 600 }}>→ {bonus.outcome}</p>
                  </div>
                ))}
              </div>
              {/* Total value + CTA */}
              <div
                style={{
                  marginTop: "1.5rem",
                  background: "rgba(0,212,146,0.07)",
                  border: "1px solid rgba(0,212,146,0.22)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Total bonus value</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#00d492", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    $171 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7b8ea5" }}>FREE</span>
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#4a5568", marginTop: "0.25rem" }}>Only when you order through this page</p>
                </div>
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary"
                >
                  Claim {product.name} + $171 in Bonuses &rarr;
                </a>
              </div>
            </section>

            {/* WHAT I'D PERSONALLY DO FIRST */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Action Plan</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                What I&rsquo;d Personally Do First
              </h2>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {[
                  {
                    day: "Day 1",
                    step: "Buy during the launch window",
                    detail: "Lock in the one-time price before it converts to a monthly subscription after launch closes.",
                  },
                  {
                    day: "Day 1",
                    step: "Run the AI content seeder",
                    detail: "Use the built-in AI to populate 15–20 discussion threads so your community looks active before you invite anyone.",
                  },
                  {
                    day: "Day 2",
                    step: "Set up your viral referral challenge",
                    detail: "Configure the gamification points and a founding-member leaderboard. First 100 members compete for a prize you set.",
                  },
                  {
                    day: "Day 3",
                    step: "Publish 5 SEO-optimized threads",
                    detail: "Write discussions around long-tail keywords in your niche. These get indexed and start pulling organic traffic within 60–90 days.",
                  },
                  {
                    day: "Day 7",
                    step: "Start building your email list inside the community",
                    detail: "Every member who joins is a potential email subscriber. Turn on the autoresponder sync and capture them before launch window ends.",
                  },
                ].map(({ day, step, detail }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "0.875rem",
                      padding: "1rem 1.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "#00d492",
                        background: "rgba(0,212,146,0.1)",
                        border: "1px solid rgba(0,212,146,0.2)",
                        borderRadius: "0.375rem",
                        padding: "0.2rem 0.5rem",
                        whiteSpace: "nowrap",
                        marginTop: "0.15rem",
                        flexShrink: 0,
                      }}
                    >
                      {day}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.25rem" }}>{step}</p>
                      <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.55 }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BUYER CONFIDENCE LAYER */}
            <section style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    background: "rgba(0,212,146,0.04)",
                    border: "1px solid rgba(0,212,146,0.14)",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛡️</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.35rem" }}>30-Day Money-Back Guarantee</p>
                  <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.55 }}>
                    If Massfluence 2.0 doesn&rsquo;t deliver within 30 days, you get a full refund. Zero questions, zero risk.
                  </p>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔬</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.35rem" }}>Tested Before Recommending</p>
                  <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.55 }}>
                    I accessed the platform during early launch, tested the AI seeder, gamification, and course builder. This review is based on hands-on use, not the sales page.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                {["Instant Digital Access", "No Monthly Fees at Launch", "Agency Rights Included", "30-Day Guarantee"].map((b) => (
                  <span key={b} style={{ fontSize: "0.78rem", color: "#7b8ea5", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#00d492" strokeWidth="1.5" />
                      <polyline points="5,8 7,10 11,6" stroke="#00d492" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section style={{ marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Common Questions</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                FAQ
              </h2>
              <div style={{ display: "grid", gap: "0.875rem" }}>
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "0.875rem",
                      padding: "1.25rem",
                    }}
                  >
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.5rem" }}>{faq.q}</p>
                    <p style={{ fontSize: "0.85rem", color: "#7b8ea5", lineHeight: 1.65 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SUBSCRIBE */}
            <section style={{ marginBottom: "2.5rem" }}>
              <SubscribeSection />
            </section>

            {/* FINAL CTA */}
            <CTA product={product} />
          </main>

          {/* ── SIDEBAR ── */}
          <aside
            style={{
              width: 280,
              flexShrink: 0,
              position: "sticky",
              top: 72,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}
            >
              {product.product_image && (
                <div style={{ borderRadius: "0.625rem", overflow: "hidden", marginBottom: "1.25rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <img src={product.product_image} alt={product.name} style={{ width: "100%", display: "block" }} />
                </div>
              )}
              <div className="stars" style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                &#9733;&#9733;&#9733;&#9733;&#9734;
                <span style={{ color: "#7b8ea5", fontSize: "0.75rem", marginLeft: "0.4rem" }}>4/5</span>
              </div>
              <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {[
                  { l: "Price", v: "$" + product.price + " one-time" },
                  { l: "Setup", v: "~15 min" },
                  { l: "Guarantee", v: "30 days" },
                  { l: "Rating", v: "4 / 5" },
                ].map(({ l, v }) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#7b8ea5" }}>{l}</span>
                    <span style={{ color: "#edf2f7", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              {product.landing?.why_buy && product.landing.why_buy.length > 0 && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>
                    Why Buy
                  </p>
                  {product.landing.why_buy.map((item: string, i: number) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.4rem" }}>
                      <span style={{ color: "#00d492", fontSize: "0.75rem", marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <a
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
                style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}
              >
                Get {product.name} + Bonuses &rarr;
              </a>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.5rem", textAlign: "center" }}>
                30-day money-back guarantee
              </p>
              <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                <Link href={"/" + product.slug + "-bonus"} style={{ color: "#7b8ea5", fontSize: "0.75rem", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  See full bonus page
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
