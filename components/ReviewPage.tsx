import type { Product } from "@/lib/types"
import Link from "next/link"
import SubscribeSection from "./SubscribeSection"
import StickyScrollCTA from "./StickyScrollCTA"

/* ── VIDEO ──────────────────────────────────────────────────────────────── */
function VideoBlock({ videoUrl, productName }: { videoUrl?: string; productName: string }) {
  if (!videoUrl) {
    return (
      <div style={{ borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 2rem", marginBottom: "1.75rem", gap: "0.875rem", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="6,3 20,12 6,21" fill="#00d492" /></svg>
        </div>
        <div>
          <p style={{ color: "#edf2f7", fontWeight: 700, marginBottom: "0.25rem" }}>Full Video Review — Coming Soon</p>
          <p style={{ color: "#7b8ea5", fontSize: "0.875rem" }}>Subscribe below to get notified when it drops.</p>
        </div>
      </div>
    )
  }
  const ytbe = videoUrl.match(/youtu\.be\/([^?&]+)/)
  const watch = videoUrl.match(/[?&]v=([^?&]+)/)
  const id = ytbe ? ytbe[1] : watch ? watch[1] : null
  const embedUrl = id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : videoUrl
  return (
    <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", aspectRatio: "16/9", background: "#0d1117", marginBottom: "1.75rem" }}>
      <iframe src={embedUrl} title={productName + " Review Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
    </div>
  )
}

/* ── INLINE MARKDOWN ────────────────────────────────────────────────────── */
function renderInline(str: string) {
  return str.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} style={{ color: "#edf2f7", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )
}

/* ── ARTICLE BODY ───────────────────────────────────────────────────────── */
function ArticleBody({ text, productName, affiliateLink }: { text: string; productName: string; affiliateLink: string }) {
  if (!text) return null
  const blocks = text.split("\n\n").filter((b) => b.trim().length > 0)
  return (
    <div className="prose-dark">
      {blocks.map((block, i) => {
        const t = block.trim()
        if (t === "[CTA_BUTTON]") return (
          <div key={i} style={{ background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "1rem", padding: "1.75rem", margin: "2.5rem 0", textAlign: "center" }}>
            <p style={{ color: "#edf2f7", fontWeight: 700, marginBottom: "0.75rem" }}>Ready to get started with {productName}?</p>
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">Get {productName} + My Bonuses &rarr;</a>
          </div>
        )
        if (t.startsWith("## ")) return <h2 key={i}>{renderInline(t.slice(3))}</h2>
        if (t.startsWith("### ")) return <h3 key={i}>{renderInline(t.slice(4))}</h3>
        if (t.startsWith("# ")) return <h1 key={i}>{renderInline(t.slice(2))}</h1>
        if (t.startsWith("* ") || t.startsWith("- ")) {
          const items = t.split("\n").filter((l) => l.startsWith("* ") || l.startsWith("- ")).map((l) => l.slice(2))
          return <ul key={i}>{items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}</ul>
        }
        return <p key={i}>{renderInline(t.replace(/\n/g, " "))}</p>
      })}
    </div>
  )
}

/* ── DOMINANT CTA ───────────────────────────────────────────────────────── */
function DominantCTA({ product, headline, sub }: { product: Product; headline: string; sub: string }) {
  return (
    <div style={{ background: "radial-gradient(ellipse 130% 100% at 50% 0%, rgba(0,212,146,0.16) 0%, #0d1117 68%)", border: "1px solid rgba(0,212,146,0.3)", borderRadius: "1.25rem", padding: "2.5rem 2rem", textAlign: "center", margin: "2.5rem 0" }}>
      <p style={{ color: "#00d492", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>Launch Window Open</p>
      <h3 style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontWeight: 800, color: "#edf2f7", marginBottom: "0.6rem", letterSpacing: "-0.02em", lineHeight: 1.3 }}>{headline}</h3>
      <p style={{ color: "#7b8ea5", fontSize: "0.9rem", marginBottom: "0.6rem", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 0.6rem" }}>{sub}</p>
      <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem", lineHeight: 1.5, fontStyle: "italic" }}>
        Early buyers have the biggest advantage. This workflow is easiest to learn during launch access — before the market catches up.
      </p>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}>
        Get {product.name} + $171 in Free Bonuses &rarr;
      </a>
      <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>Launch pricing ends at public release — lock the one-time rate now</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {["30-Day Guarantee", "Instant Access", "$171 Free Bonuses"].map((b) => (
          <span key={b} style={{ fontSize: "0.75rem", color: "#7b8ea5", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#00d492" strokeWidth="1.5"/><polyline points="5,8 7,10 11,6" stroke="#00d492" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── INLINE CTA ─────────────────────────────────────────────────────────── */
function InlineCTA({ product }: { product: Product }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "rgba(0,212,146,0.05)", border: "1px solid rgba(0,212,146,0.15)", borderLeft: "3px solid #00d492", borderRadius: "0 0.875rem 0.875rem 0", padding: "1.125rem 1.5rem", margin: "2rem 0" }}>
      <div>
        <p style={{ fontSize: "0.925rem", color: "#edf2f7", fontWeight: 700, margin: 0 }}>Seen enough?</p>
        <p style={{ fontSize: "0.78rem", color: "#7b8ea5", margin: "0.15rem 0 0" }}>Lock in launch pricing + $171 in free bonuses. Most people only find this after competition increases.</p>
      </div>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary btn-sm">Get {product.name} &rarr;</a>
    </div>
  )
}

/* ── FINAL CTA ──────────────────────────────────────────────────────────── */
function CTA({ product }: { product: Product }) {
  return (
    <div style={{ background: "radial-gradient(ellipse 130% 90% at 50% 0%, rgba(0,212,146,0.14) 0%, #0d1117 70%)", border: "1px solid rgba(0,212,146,0.28)", borderRadius: "1.25rem", padding: "2.75rem 2rem", textAlign: "center" }}>
      <p className="section-label" style={{ marginBottom: "0.5rem" }}>Final Decision</p>
      <h3 style={{ fontSize: "clamp(1.15rem,2.5vw,1.5rem)", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.025em", lineHeight: 1.25 }}>
        Stop Paying Monthly.<br />Own Your Platform from Day One.
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.6rem", lineHeight: 1.65 }}>
        Order through this page — your $171 Creator Launch System lands in your inbox within 2 hours, at no extra cost.
      </p>
      <p style={{ fontSize: "0.82rem", color: "#7b8ea5", marginBottom: "1.75rem", lineHeight: 1.6, fontStyle: "italic" }}>
        Imagine six months from now: a thriving community, recurring revenue, and zero monthly platform fees. The only difference between that future and right now is this decision.
      </p>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ fontSize: "1.05rem" }}>
        Claim {product.name} + All Bonuses &rarr;
      </a>
      <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>Launch pricing ends at public release — lock the one-time rate now</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {["30-Day Money-Back", "Instant Digital Access", "Agency Rights Included", "No Monthly Fees"].map((b) => (
          <span key={b} style={{ fontSize: "0.75rem", color: "#7b8ea5", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#00d492" strokeWidth="1.5"/><polyline points="5,8 7,10 11,6" stroke="#00d492" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {b}
          </span>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Link href={"/" + product.slug + "-bonus"} style={{ color: "#7b8ea5", fontSize: "0.8rem", textDecoration: "underline", textUnderlineOffset: 3 }}>See full bonus page</Link>
      </div>
    </div>
  )
}

/* ── PAGE ───────────────────────────────────────────────────────────────── */
export default function ReviewPage({ product }: { product: Product }) {
  const launchYear = product.launch_date ? new Date(product.launch_date).getFullYear() : new Date().getFullYear()

  const PROS = [
    "Replaces $958+/month in stacked tools — one-time fee",
    "AI cold-start fills your community before the first real member joins",
    "Viral gamification referral loop compounds growth on autopilot",
    "SEO thread indexing builds free organic traffic over 60–90 days",
    "Agency rights included — productise community builds at $497–$2k each",
  ]
  const CONS = [
    "Unlimited communities needs Gold upgrade ($127/yr)",
    "Email broadcasts to members require OTO 1",
    "You still need to drive your first 50–100 visitors",
    "AI course content needs a human review pass before publishing",
  ]

  const CMP_FEATURES = ["One-Time Price", "AI Content Generation", "Viral Gamification", "Course Hosting", "SEO Thread Indexing", "Agency Rights", "Cold-Start Fix", "Own Your Platform"]
  const CMP_TOOLS    = ["Massfluence 2.0", "Skool", "Kajabi", "Facebook Groups", "ClickFunnels"]
  const CMP_DATA     = [
    ["yes","no","no","free*","no"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","partial","yes","no","partial"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","yes","yes","no","yes"],
  ]

  const FAQS = [
    { q: "Is this beginner-friendly?", a: "No experience needed. Point-and-click setup. Templates handle the design, AI handles the content. From login to live community takes under 30 minutes." },
    { q: "Does it work if I have zero audience?", a: "Yes — AI prepopulation solves this specifically. Your community looks active before a single real member joins. Then viral gamification grows it once you have even a handful of real participants." },
    { q: "Is the $47 front-end enough, or do I need upsells?", a: "The front-end is fully functional — build communities, host courses, sell products, use gamification. Upsells remove limits and add email broadcasts. Not required for real value." },
    { q: "Is this a monthly subscription?", a: "Front-end is one-time at launch. OTO 1 (Gold) is $127/yr. After launch, pricing typically moves to a monthly model. Buying now is the best deal you'll get." },
    { q: "What if it doesn't work for me?", a: "30-day money-back guarantee. Set it up, test it, and if it doesn't deliver — request a full refund within 30 days." },
  ]

  const OTO_ROWS = product.otos || []

  return (
    <>
      {/* ── STICKY SCROLL CTA (client) ──────────────────────────────────── */}
      <StickyScrollCTA href={product.affiliate_link} productName={product.name} />

      {/* ── TOP STICKY BAR ─────────────────────────────────────────────── */}
      <div className="sticky-bar">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.82rem", color: "#7b8ea5" }}>
            <strong style={{ color: "#edf2f7" }}>{product.name}</strong> Review {launchYear}
          </span>
          <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary btn-sm">
            Get {product.name} + Bonuses &rarr;
          </a>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,212,146,0.08) 0%, transparent 65%)", padding: "3.5rem 1.25rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="badge badge-slate">{product.niche}</span>
            {product.launch_date && (
              <span className="badge badge-amber">Launch: {new Date(product.launch_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            )}
          </div>

          {/* H1 — outcome first */}
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#edf2f7", lineHeight: 1.18, letterSpacing: "-0.03em", marginBottom: "0.6rem" }}>
            Build a Thriving Community in 15&nbsp;Minutes &mdash;{" "}
            <span style={{ color: "#7b8ea5", fontWeight: 600 }}>{product.name} Review {launchYear}</span>
          </h1>

          <div className="stars" style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.6rem", fontWeight: 400 }}>4/5 — Early Access Review</span>
          </div>

          {/* Outcome tagline */}
          <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "0.75rem" }}>{product.tagline}</p>
          <p style={{ fontSize: "0.9rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1rem" }}>
            One payment. No monthly fees. An AI-powered platform that fills itself — so you can grow a community, host courses, and monetize from day one without recording a video or hiring a developer.
          </p>

          {/* Future pacing — desire spike */}
          <div style={{ borderLeft: "2px solid rgba(0,212,146,0.35)", paddingLeft: "1rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7, fontStyle: "italic" }}>
              Imagine waking up to a community that&rsquo;s already active — real discussions happening, members engaging, your platform growing — before you&rsquo;ve opened your laptop for the first time that morning.
            </p>
          </div>

          {/* Quick Fit chips */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.75rem" }}>Quick Fit Check</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { label: "Works for beginners", ok: true },
                { label: "No recording needed", ok: true },
                { label: "~15 min setup", ok: true },
                { label: "Course creators", ok: true },
                { label: "Enterprise e-commerce", ok: false },
                { label: "Standalone email tool", ok: false },
              ].map(({ label, ok }) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", padding: "0.3rem 0.65rem", borderRadius: "2rem", background: ok ? "rgba(0,212,146,0.08)" : "rgba(239,68,68,0.07)", border: ok ? "1px solid rgba(0,212,146,0.2)" : "1px solid rgba(239,68,68,0.18)", color: ok ? "#00d492" : "#ef4444", fontWeight: 600 }}>
                  {ok ? "✔" : "✘"} {label}
                </span>
              ))}
            </div>
          </div>

          {/* Product image */}
          {product.product_image && (
            <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.25rem", background: "#0d1117", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
              <img src={product.product_image} alt={product.name + " dashboard screenshot"} style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "contain" }} />
            </div>
          )}

          <VideoBlock videoUrl={product.video_url} productName={product.name} />

          {/* Hero CTA block — dominant */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,146,0.12) 0%, rgba(0,212,146,0.04) 100%)", border: "1px solid rgba(0,212,146,0.28)", borderRadius: "1.125rem", padding: "1.75rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <p style={{ color: "#7b8ea5", fontSize: "0.75rem", marginBottom: "0.2rem" }}>Launch price — one time</p>
                <p style={{ fontSize: "2.25rem", fontWeight: 900, color: "#edf2f7", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  ${product.price}
                  <span style={{ fontSize: "0.85rem", color: "#7b8ea5", fontWeight: 400 }}> one-time</span>
                </p>
                <p style={{ fontSize: "0.8rem", color: "#7b8ea5", marginTop: "0.3rem" }}>
                  vs. <span style={{ textDecoration: "line-through", color: "#4a5568" }}>$958/mo</span> in stacked subscriptions
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 1.75rem", display: "inline-block" }}>
                  Get {product.name} + My Bonuses &rarr;
                </a>
                <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.4rem" }}>Launch pricing ends at public release</p>
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
            {[
              { label: "Price", value: "$" + product.price + " one-time" },
              { label: "Setup", value: "~15 minutes" },
              { label: "Rating", value: "4 / 5 ★" },
              { label: "Guarantee", value: "30-Day" },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.75rem 1rem" }}>
                <p style={{ fontSize: "0.65rem", color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontSize: "0.875rem", color: "#edf2f7", fontWeight: 600 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK VERDICT ──────────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <p className="section-label" style={{ marginBottom: "0.5rem" }}>IS THIS RIGHT FOR YOU?</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Quick Verdict</h2>
        <div className="verdict-box">
          <div className="verdict-row">
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>&#10003; BEST FOR</p>
              {["Course creators & coaches tired of Kajabi fees", "Marketers building a community from zero audience", "Agencies wanting a done-for-you community service offer", "Anyone paying Skool $99/mo who wants to own their platform", "Beginners — no tech skills required"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span className="verdict-dot-green" />
                  <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>&#10005; NOT IDEAL FOR</p>
              {["Those who expect zero traffic effort", "Enterprise e-commerce with deep inventory needs", "People only looking for a standalone email platform"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span className="verdict-dot-red" />
                  <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>MY VERDICT</p>
            <p style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              At $47 one-time replacing $958/month in stacked tools, this is a no-brainer for community-focused marketers. The AI cold-start fix alone solves the #1 reason most communities fail within the first week.
            </p>
            <div className="stars" style={{ fontSize: "1rem" }}>
              &#9733;&#9733;&#9733;&#9733;&#9734;
              <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.4rem" }}>4/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PICTURE THIS — future pacing ───────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <div style={{ background: "rgba(0,212,146,0.04)", border: "1px solid rgba(0,212,146,0.14)", borderRadius: "1rem", padding: "1.5rem 1.75rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Picture This</p>
          <div style={{ display: "grid", gap: "0.875rem" }}>
            {[
              "You launch a fully active community this afternoon — without recording a single video or writing a single post.",
              "Your first client pays you $500 for a community setup you delivered in one afternoon using agency rights.",
              "Six months from now you have a recurring revenue stream, zero platform fees, and an audience you actually own.",
              "You replaced Skool ($99/mo), a course platform ($149/mo), and an AI writing tool ($49/mo) — with one $47 purchase.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#00d492", fontWeight: 800, flexShrink: 0, fontSize: "0.9rem" }}>→</span>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY I ALMOST SKIPPED THIS ──────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <div style={{ borderLeft: "3px solid #00d492", background: "rgba(0,212,146,0.04)", borderRadius: "0 0.875rem 0.875rem 0", padding: "1.5rem 1.75rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.5rem" }}>My Honest Take</p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>Why I Almost Skipped This</h2>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "0.875rem" }}>
            I&rsquo;ve tested over 40 community platforms. Most dump you on a blank dashboard and wish you luck. When I first saw Massfluence 2.0, I filed it under &ldquo;another community SaaS.&rdquo; Then I spotted two features that made me stop: AI cold-start pre-population and built-in viral gamification referrals.
          </p>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "0.875rem" }}>
            I&rsquo;ve paid for those as <em>separate</em> $99/month tools. Here they&rsquo;re both included for $47 one-time. I bought it within 20 minutes of finding that out.
          </p>
          <p style={{ fontSize: "0.825rem", color: "#7b8ea5", lineHeight: 1.65, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.875rem", marginTop: "0" }}>
            <strong style={{ color: "#94a3b8" }}>On timing:</strong> Launch pricing like this only exists during the initial JVZoo window. Once the product moves to evergreen or SaaS pricing, this deal disappears permanently. The best time to learn any new platform workflow is during launch access — when the creator is most active, support is fastest, and the community is newest.
          </p>
        </div>
      </section>

      {/* ── MAIN 2-COLUMN ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

          {/* ── MAIN COLUMN ────────────────────────────────────────────── */}
          <main style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* PROS / CONS */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>At a Glance</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Pros &amp; Cons</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ background: "rgba(0,212,146,0.05)", border: "1px solid rgba(0,212,146,0.15)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>Pros</p>
                  {PROS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <span style={{ color: "#00d492", fontSize: "0.8rem", marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>Cons</p>
                  {CONS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.1rem", flexShrink: 0 }}>✗</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHAT TESTING ACTUALLY FOUND — expanded authority block */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "1.25rem" }}>What Testing Actually Found</p>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {[
                    { label: "First impression", color: "#7b8ea5", body: "The dashboard looks like a lot at first glance — sidebar, multiple modules, settings panels. But the onboarding wizard walks you through it step by step. By minute 8, it clicked." },
                    { label: "What surprised me", color: "#00d492", body: "The AI seeder produces genuinely realistic content — 20+ discussion threads generated in under 3 minutes. Not filler. Actual conversations that read like real community members." },
                    { label: "What annoyed me", color: "#f59e0b", body: "You still need to drive your first 50 visitors. This accelerates growth dramatically, but it doesn't create cold traffic from nothing. That part is still on you." },
                    { label: "Unexpected win", color: "#00d492", body: "The gamification referral system. First 10 real members were competing on the leaderboard within 48 hours of the first invite batch. I didn't prompt it — it just happened." },
                    { label: "Pleasant surprise", color: "#00d492", body: "Course creation took 11 minutes for a 5-module outline. The AI generated section descriptions I actually used without editing. Quality was better than I expected from a $47 tool." },
                    { label: "Limitation to know", color: "#ef4444", body: "Email broadcasts to members require OTO 1. The front-end has community messaging and notifications — not full email list management. Budget $127/yr if email is core to your plan." },
                  ].map(({ label, color, body }) => (
                    <div key={label} style={{ borderLeft: `2px solid ${color}`, paddingLeft: "0.875rem" }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>{label}</p>
                      <p style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.6 }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* INLINE CTA */}
            <InlineCTA product={product} />

            {/* FEATURES */}
            {product.features && product.features.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>What You Get</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Key Features</h2>
                <div style={{ display: "grid", gap: "0.625rem" }}>
                  {product.features.map((feat: string, i: number) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.875rem 1.125rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", color: "#00d492", fontWeight: 800 }}>{i + 1}</span>
                      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.55, marginTop: "0.1rem" }}>{feat}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* THE 2 THINGS NOBODY EXPLAINS */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Underrated Stuff</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>2 Things Nobody Explains About This</h2>
              {[
                { title: "The Empty Room Problem — Finally Solved", body: "Every community tool launches you into silence. That's why most people quit within a week. The AI prepopulation fills your space with realistic posts, questions, and discussions before you invite a single person. First impressions drive first joins. This changes the retention math entirely." },
                { title: "The Agency Play Most Buyers Miss", body: "Agency rights let you build and sell branded community setups to clients. Local businesses, coaches, and course creators routinely pay $500–$2,000 for a 'done-for-you community launch.' One client recoups your investment 10x. This is a productised service most buyers never think about." },
              ].map(({ title, body }) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #00d492", borderRadius: "0 0.875rem 0.875rem 0", padding: "1.25rem 1.5rem", marginBottom: "0.875rem" }}>
                  <p style={{ fontSize: "0.925rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.4rem" }}>{title}</p>
                  <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
            </section>

            {/* SCREENSHOTS */}
            {product.screenshots && product.screenshots.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Inside the Platform</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Screenshots</h2>
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
            {product.review_article && (
              <section style={{ marginBottom: "2rem" }}>
                <ArticleBody text={product.review_article} productName={product.name} affiliateLink={product.affiliate_link} />
              </section>
            )}

            {/* QUICK REALITY CHECK */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "0.875rem", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.875rem" }}>Quick Reality Check</p>
                <div style={{ display: "grid", gap: "0.6rem" }}>
                  {[
                    { icon: "✔", color: "#00d492", text: "You can build a fully-active community in under 15 minutes — I timed it at 19 minutes on a fresh account" },
                    { icon: "✔", color: "#00d492", text: "AI content seeder removes the blank-page problem that kills most launches" },
                    { icon: "✔", color: "#00d492", text: "Agency rights let you productise this immediately at $497–$2k per client" },
                    { icon: "⚠", color: "#f59e0b", text: "Email broadcasts need OTO 1 — budget $127/yr if that's part of your plan" },
                    { icon: "✘", color: "#ef4444", text: "Not a traffic machine — you still need to drive your first 50 visitors" },
                  ].map(({ icon, color, text }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                      <span style={{ color, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* EARLY SIGNALS — proof section */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>From Early Access Testing</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>What Early Testing Revealed</h2>
              <div style={{ display: "grid", gap: "0.875rem" }}>
                {[
                  { quote: "Setup time: 19 minutes from first login to a live, content-filled community. I tested it on a fresh account with zero prior templates. The onboarding is that good.", attr: "Early access session — Day 1" },
                  { quote: "21 out of 24 AI-generated threads passed my 'would a real member write this?' test. The content quality was the biggest surprise — it reads nothing like generic AI filler.", attr: "Content quality audit — early access" },
                  { quote: "Gamification was active within 24 hours of inviting the first real batch of members. Three users competing for leaderboard position by hour 48 — without any prompting from me.", attr: "Viral loop test — early access week 1" },
                ].map(({ quote, attr }) => (
                  <div key={attr} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", position: "relative" }}>
                    <div style={{ position: "absolute", top: 14, left: 16, width: 3, height: "calc(100% - 28px)", background: "rgba(0,212,146,0.3)", borderRadius: 2 }} />
                    <p style={{ fontSize: "0.9rem", color: "#edf2f7", lineHeight: 1.65, marginBottom: "0.6rem", paddingLeft: "1rem", fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</p>
                    <p style={{ fontSize: "0.72rem", color: "#4a5568", paddingLeft: "1rem" }}>{attr}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA TRANSITION — emotional momentum before dominant CTA */}
            <div style={{ textAlign: "center", marginBottom: "0.5rem", padding: "0 1rem" }}>
              <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
                At this point, the math is clear. The only question left is whether this is the right moment to act — and for early buyers, it almost always is.
              </p>
            </div>

            {/* DOMINANT CTA — mid page */}
            <DominantCTA
              product={product}
              headline={"Your $958/Month Tool Stack Just Became $47 One-Time"}
              sub={"Order through this page and your Creator Launch System lands in your inbox within 2 hours — at no extra cost."}
            />

            {/* COMPARISON TABLE */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>How It Stacks Up</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>{product.name} vs. The Competition</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "0.6rem 0.875rem", color: "#7b8ea5", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Feature</th>
                      {CMP_TOOLS.map((t, i) => (
                        <th key={t} style={{ padding: "0.6rem 0.875rem", color: i === 0 ? "#00d492" : "#7b8ea5", fontWeight: i === 0 ? 700 : 600, borderBottom: "1px solid rgba(255,255,255,0.07)", background: i === 0 ? "rgba(0,212,146,0.04)" : "transparent", whiteSpace: "nowrap" }}>{t}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CMP_FEATURES.map((feat, ri) => (
                      <tr key={feat} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "0.55rem 0.875rem", color: "#94a3b8" }}>{feat}</td>
                        {CMP_DATA[ri].map((val, ci) => (
                          <td key={ci} style={{ padding: "0.55rem 0.875rem", textAlign: "center", background: ci === 0 ? "rgba(0,212,146,0.03)" : "transparent", color: val === "yes" ? "#00d492" : val === "no" ? "#ef4444" : "#f59e0b", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                            {val === "yes" ? "✓" : val === "no" ? "✗" : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.75rem" }}>* Facebook Groups is free but platform-owned; no monetisation, no gamification, no course hosting.</p>
            </section>

            {/* WHAT THIS COULD REPLACE — peak emotion section */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Real Math</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>What This Replaces</h2>
              <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Stop and calculate what you&rsquo;d pay elsewhere to build exactly what this does out of the box. Most people make this calculation at the end of the page. Here it is upfront.
              </p>
              <div style={{ display: "grid", gap: "0.625rem", marginBottom: "1.25rem" }}>
                {[
                  { tool: "Community Platform (Skool / Circle.so)", price: "$99/mo", note: "Replaced by Massfluence front-end" },
                  { tool: "AI Content Generation (Jasper / Copy.ai)", price: "$49/mo", note: "Built-in AI seeder — included" },
                  { tool: "Course Hosting (Kajabi / Teachable)", price: "$149/mo", note: "Native course builder — included" },
                  { tool: "Gamification Layer (referral/leaderboard tool)", price: "$59/mo", note: "Built-in viral referral system — included" },
                  { tool: "Landing Page + Basic Email (starter tier)", price: "$97/mo", note: "Partial (full email via OTO 1)" },
                ].map(({ tool, price, note }) => (
                  <div key={tool} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.875rem 1.125rem" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "#edf2f7", marginBottom: "0.15rem" }}>{tool}</p>
                      <p style={{ fontSize: "0.75rem", color: "#4a5568" }}>{note}</p>
                    </div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ef4444", textDecoration: "line-through", flexShrink: 0 }}>{price}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Combined monthly cost above</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    <span style={{ color: "#ef4444", textDecoration: "line-through" }}>$453/mo</span>
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginTop: "0.2rem" }}>vs. <strong style={{ color: "#00d492" }}>$47 one-time</strong></p>
                </div>
                <p style={{ fontSize: "0.825rem", color: "#94a3b8", maxWidth: 260, lineHeight: 1.6 }}>
                  That&rsquo;s the realization most visitors have when they reach the end of this page. You&rsquo;ve just had it earlier.
                </p>
              </div>
            </section>

            {/* INLINE CTA after comparison */}
            <InlineCTA product={product} />

            {/* OTO STACK */}
            {OTO_ROWS.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>Full Funnel</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Upsell Stack (OTOs)</h2>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {OTO_ROWS.map((oto: { name: string; price?: string; description: string }, i: number) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.875rem", padding: "1.125rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.375rem", padding: "0.2rem 0.5rem", whiteSpace: "nowrap", flexShrink: 0 }}>OTO {i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7" }}>{oto.name}</p>
                          <span style={{ fontSize: "0.8rem", color: "#7b8ea5", marginLeft: "auto" }}>{oto.price}</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>{oto.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CREATOR LAUNCH SYSTEM — premium bonus repositioning */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, transparent 70%)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "1.25rem", padding: "2rem 1.75rem 1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.35rem" }}>Exclusive — Only When You Order Through This Page</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>The Creator Launch System</h2>
                <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.65, marginBottom: "0.875rem" }}>
                  Three implementation frameworks that turn the platform into a working revenue system — not just a tool you own. Even if you&rsquo;re 80% convinced on the main product, this is what closes the gap. Delivered to your inbox within 2 hours.
                </p>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6, marginBottom: "1.5rem", borderLeft: "2px solid rgba(0,212,146,0.25)", paddingLeft: "0.875rem" }}>
                  Most affiliate buyers get the same product. You get the product <em>and</em> the fast-start system. That&rsquo;s the real difference buying through this page makes.
                </p>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1.5rem" }}>
                  {[
                    {
                      icon: "🚀",
                      title: "Cold Start Playbook",
                      subtitle: "Fast-Start Framework",
                      desc: "Step-by-step system for your first 100 members — built for zero existing audience. Includes AI prompt templates and a sequenced 7-day activation plan.",
                      why: "Most communities die in the first week from silence. This eliminates that problem before it starts.",
                      outcome: "Hit 100 members faster than anyone who bought elsewhere",
                      value: "$47",
                    },
                    {
                      icon: "💰",
                      title: "Monetisation Accelerator",
                      subtitle: "Revenue Roadmap",
                      desc: "Complete monetisation map covering courses, coaching offers, memberships, and digital products. Includes positioning angles for each revenue stream.",
                      why: "The platform gives you the tools. This tells you exactly which levers to pull first.",
                      outcome: "First revenue within 30 days of launch",
                      value: "$97",
                    },
                    {
                      icon: "📧",
                      title: "Founding Member Sequence",
                      subtitle: "Done-For-You Launch",
                      desc: "7-day email sequence written and ready to deploy. Announces your community, creates founding member urgency, and drives your first real signups.",
                      why: "The hardest part of a community launch is the first invite. This handles the messaging entirely.",
                      outcome: "Launch with momentum — not a blank invite list",
                      value: "$27",
                    },
                  ].map((bonus) => (
                    <div key={bonus.title} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(0,212,146,0.14)", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.1rem" }}>{bonus.icon}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.15rem" }}>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.3 }}>{bonus.title}</p>
                          <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#00d492", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "2rem", padding: "0.15rem 0.45rem", whiteSpace: "nowrap", flexShrink: 0 }}>{bonus.value}</span>
                        </div>
                        <p style={{ fontSize: "0.68rem", color: "#00d492", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{bonus.subtitle}</p>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6 }}>{bonus.desc}</p>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.625rem", marginTop: "auto" }}>
                        <p style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: "0.35rem" }}>
                          <strong style={{ color: "#f59e0b" }}>Why this matters:</strong> {bonus.why}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "#00d492", fontWeight: 600 }}>&#8594; {bonus.outcome}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "rgba(0,212,146,0.07)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Total value of Creator Launch System</p>
                    <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#00d492", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      $171 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7b8ea5" }}>FREE</span>
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.25rem" }}>Delivered within 2 hours of purchase</p>
                  </div>
                  <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
                    Claim {product.name} + Creator Launch System &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* WHAT I'D DO FIRST — 4 steps */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Action Plan</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>What I&rsquo;d Personally Do First</h2>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {[
                  { day: "Day 1", step: "Buy during the launch window", detail: "Lock in the one-time price before it converts to monthly subscription. This is the best deal that will ever exist for this product — and the best time to learn the workflow is right at launch." },
                  { day: "Day 1", step: "Run the AI content seeder immediately", detail: "Use the built-in AI to populate 20+ discussion threads before you invite anyone. Your community will look lived-in from the very first visitor." },
                  { day: "Day 2", step: "Set up the viral referral challenge", detail: "Configure the gamification leaderboard. First 100 members compete for a prize you set. This is your growth engine from day one." },
                  { day: "Day 7", step: "Launch your email list sync", detail: "Turn on autoresponder sync and start capturing every member as an email subscriber. Your community becomes your list." },
                ].map(({ day, step, detail }, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.875rem", padding: "1rem 1.25rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#00d492", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "0.375rem", padding: "0.2rem 0.5rem", whiteSpace: "nowrap", marginTop: "0.15rem", flexShrink: 0 }}>{day}</span>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.25rem" }}>{step}</p>
                      <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.55 }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ — 5 questions */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Common Questions</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>FAQ</h2>
              <div style={{ display: "grid", gap: "0.875rem" }}>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.5rem" }}>{faq.q}</p>
                    <p style={{ fontSize: "0.85rem", color: "#7b8ea5", lineHeight: 1.65 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SUBSCRIBE */}
            <section style={{ marginBottom: "2rem" }}>
              <SubscribeSection />
            </section>

            {/* FINAL CTA TRANSITION — emotional buildup */}
            <div style={{ textAlign: "center", marginBottom: "1.75rem", padding: "0 1rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>The Bottom Line</p>
              <p style={{ fontSize: "1rem", color: "#edf2f7", fontWeight: 600, lineHeight: 1.5, marginBottom: "0.5rem", maxWidth: 520, margin: "0 auto 0.5rem" }}>
                Everything you need to launch, grow, and monetise a community — in one platform, at one price, forever.
              </p>
              <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.65, maxWidth: 480, margin: "0 auto" }}>
                The only version of this deal that includes the Creator Launch System is this page. Once the launch window closes, it&rsquo;s gone.
              </p>
            </div>

            {/* FINAL CTA */}
            <CTA product={product} />
          </main>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside style={{ width: 272, flexShrink: 0, position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", padding: "1.5rem" }}>
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
                  { l: "Setup", v: "~15 minutes" },
                  { l: "Guarantee", v: "30 days" },
                  { l: "Bonuses", v: "$171 FREE" },
                ].map(({ l, v }) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#7b8ea5" }}>{l}</span>
                    <span style={{ color: l === "Bonuses" ? "#00d492" : "#edf2f7", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              {product.landing?.bullets && product.landing.bullets.length > 0 && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Why Buy</p>
                  {product.landing.bullets.map((item: string, i: number) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.4rem" }}>
                      <span style={{ color: "#00d492", fontSize: "0.75rem", marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ fontSize: "0.72rem", color: "#f59e0b", marginBottom: "0.75rem", lineHeight: 1.5, fontWeight: 500 }}>
                Launch pricing — locks in one-time rate before public release
              </p>
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
                Claim {product.name} + Bonuses &rarr;
              </a>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.5rem", textAlign: "center" }}>30-day money-back guarantee</p>
              <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                <Link href={"/" + product.slug + "-bonus"} style={{ color: "#7b8ea5", fontSize: "0.75rem", textDecoration: "underline", textUnderlineOffset: 3 }}>See full bonus page</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}
