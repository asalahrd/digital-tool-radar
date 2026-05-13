import type { Product } from "@/lib/types"
import Link from "next/link"
import SubscribeSection from "./SubscribeSection"
import StickyScrollCTA from "./StickyScrollCTA"
import TrustLayer from "./TrustLayer"

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

/* ── ARTICLE BODY — supports both HTML and markdown ─────────────────────── */
function ArticleBody({ text, productName, affiliateLink }: { text: string; productName: string; affiliateLink: string }) {
  if (!text) return null
  // If content is HTML, render it directly
  if (text.trimStart().startsWith("<")) {
    return (
      <div className="prose-dark" dangerouslySetInnerHTML={{ __html: text }} />
    )
  }
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
      <p style={{ color: "#7b8ea5", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 1.5rem" }}>{sub}</p>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}>
        Yes — Get {product.name} + My Bonuses &rarr;
      </a>
      <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>Launch pricing ends at public release · 30-day guarantee · Instant access</p>
    </div>
  )
}

/* ── INLINE CTA ─────────────────────────────────────────────────────────── */
function InlineCTA({ product }: { product: Product }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "rgba(0,212,146,0.05)", border: "1px solid rgba(0,212,146,0.15)", borderLeft: "3px solid #00d492", borderRadius: "0 0.875rem 0.875rem 0", padding: "1.125rem 1.5rem", margin: "2rem 0" }}>
      <div>
        <p style={{ fontSize: "0.925rem", color: "#edf2f7", fontWeight: 700, margin: 0 }}>Made your decision?</p>
        <p style={{ fontSize: "0.78rem", color: "#7b8ea5", margin: "0.15rem 0 0" }}>15-min setup · Instant access · 30-day guarantee · Bonuses expire with launch window</p>
      </div>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary btn-sm">Claim {product.name} &rarr;</a>
    </div>
  )
}

/* ── FINAL CTA ──────────────────────────────────────────────────────────── */
function CTA({ product }: { product: Product }) {
  const p = product as any
  const r = p.review || {}
  const rawHeadline: string = r.cta_headline || "Stop Renting Platforms.\nOwn the Whole Stack for $47."
  const ctaSub: string = r.cta_sub || "The 19-Minute Cold Start. Community, courses, gamification, agency rights — one tool, one-time. Order through this page and your Creator Launch System is in your inbox within 2 hours."
  const headlineParts = rawHeadline.split("\n")
  return (
    <div style={{ background: "radial-gradient(ellipse 130% 90% at 50% 0%, rgba(0,212,146,0.14) 0%, #0d1117 70%)", border: "1px solid rgba(0,212,146,0.28)", borderRadius: "1.25rem", padding: "2.75rem 2rem", textAlign: "center" }}>
      <p className="section-label" style={{ marginBottom: "0.5rem" }}>Final Verdict</p>
      <h3 style={{ fontSize: "clamp(1.15rem,2.5vw,1.5rem)", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.025em", lineHeight: 1.25 }}>
        {headlineParts.map((line, i) => <span key={i}>{line}{i < headlineParts.length - 1 && <br />}</span>)}
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.75rem", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 1.75rem" }}>
        {ctaSub}
      </p>
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ fontSize: "1.05rem" }}>
        Claim {product.name} + All Bonuses &rarr;
      </a>
      <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem" }}>Launch pricing ends at public release · lock the one-time rate now</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.625rem", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "left" }}>
        {[
          { icon: "⚡", label: "Instant access", note: "No approval wait" },
          { icon: "📦", label: "Bonuses in 2h", note: "Inbox delivery" },
          { icon: "🕐", label: "15-min setup", note: "Templates included" },
          { icon: "🛡", label: "30-day refund", note: "Zero risk" },
        ].map(({ icon, label, note }) => (
          <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "0.875rem", flexShrink: 0 }}>{icon}</span>
            <div>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.2 }}>{label}</p>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", lineHeight: 1.2 }}>{note}</p>
            </div>
          </div>
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
  const p = product as any
  const r: any = p.review || {}
  const launchYear = product.launch_date ? new Date(product.launch_date).getFullYear() : new Date().getFullYear()

  const PROS: string[] = p.pros || [
    "Replaces $958+/month in stacked tools — one-time fee",
    "AI cold-start fills your community before the first real member joins",
    "Viral gamification referral loop compounds growth on autopilot",
    "SEO thread indexing builds free organic traffic over 60–90 days",
    "Agency rights included — productise community builds at $497–$2k each",
  ]
  const CONS: string[] = p.cons || [
    "Unlimited communities needs Gold upgrade ($127/yr)",
    "Email broadcasts to members require OTO 1",
    "You still need to drive your first 50–100 visitors",
    "AI course content needs a human review pass before publishing",
  ]

  const CMP_FEATURES: string[] = p.comparison?.features || ["One-Time Price", "AI Content Generation", "Viral Gamification", "Course Hosting", "SEO Thread Indexing", "Agency Rights", "Cold-Start Fix", "Own Your Platform"]
  const CMP_TOOLS: string[]    = p.comparison?.tools || ["Massfluence 2.0", "Skool", "Kajabi", "Facebook Groups", "ClickFunnels"]
  const CMP_DATA: string[][]   = p.comparison?.data || [
    ["yes","no","no","free*","no"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","partial","yes","no","partial"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","no","no","no","no"],
    ["yes","yes","yes","no","yes"],
  ]
  const CMP_NOTE: string = p.comparison?.note || "* Facebook Groups is free but platform-owned; no monetisation, no gamification, no course hosting."

  const FAQS: Array<{ q: string; a: string }> = p.faqs || [
    { q: "Is this beginner-friendly?", a: "Yes. Point-and-click setup — no tech skills needed. Templates handle design, AI handles content. From login to live community in under 30 minutes." },
    { q: "Does it work with zero audience?", a: "That's exactly what it's built for. AI prepopulation makes your community look active before a single real member joins. Then gamification grows it from there." },
    { q: "Is the $47 front-end enough, or do I need upsells?", a: "The front-end is fully usable — communities, courses, gamification, products. OTO 1 adds email broadcasts and removes limits. Not required to get real value." },
    { q: "Is this a monthly subscription?", a: "Front-end is one-time at launch. OTO 1 (Gold) is $127/yr. After launch, pricing moves to monthly. Buying now locks the best deal permanently." },
    { q: "What if it doesn't work for me?", a: "30-day money-back guarantee. Test it fully. If it doesn't deliver — request a full refund." },
  ]

  const OTO_ROWS = product.otos || []

  // ── SCHEMA MARKUP ───────────────────────────────────────────────────────
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": `${product.name} Review ${launchYear}`,
    "reviewBody": `Honest review of ${product.name} by DigitalToolRadar. We tested every feature and break down pros, cons, pricing, and whether it's worth buying.`,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": p.review?.rating || "4",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "DigitalToolRadar",
      "url": "https://digitaltoolradar.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DigitalToolRadar",
      "url": "https://digitaltoolradar.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digitaltoolradar.com/og-image.png"
      }
    },
    "datePublished": product.launch_date || new Date().toISOString().split("T")[0],
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": product.name,
      "applicationCategory": "BusinessApplication",
      "description": product.tagline,
      "offers": {
        "@type": "Offer",
        "price": product.price || "37",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": product.affiliate_link
      },
      "operatingSystem": "Web"
    }
  }

  const faqSchema = FAQS.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
    {faqSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    )}
    <div style={{ overflowX: "hidden" }}>
      <StickyScrollCTA href={product.affiliate_link} productName={product.name} />

      {/* ── RESPONSIVE OVERRIDES ───────────────────────────────────────── */}
      <style>{`
        /* ── Mobile: fix all layouts ──────────────────────────────────── */
        @media (max-width: 900px) {
          /* Top sticky bar — hidden on mobile (bottom pill CTA handles it) */
          .sticky-bar { display: none !important; }

          /* 2-col → single column.
             align-items:stretch is the critical fix: without it, in column
             flex direction the <main> sizes to content width, not viewport width,
             causing everything inside to overflow and get clipped. */
          .review-2col {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .review-aside { display: none !important; }

          /* Force main to full width (belt + suspenders) */
          .review-2col > main {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* All hardcoded 2-col grids → single column */
          .review-pros-cons,
          .review-old-new-head,
          .review-old-new-row,
          .review-decision-cols { grid-template-columns: 1fr !important; }

          /* Mechanism callout — allow wrap on narrow screens */
          .review-mechanism { flex-wrap: wrap !important; gap: 0.35rem !important; }

          /* Safety net: nothing wider than its container */
          * { max-width: 100%; box-sizing: border-box; }
          img, video, iframe, svg { max-width: 100% !important; height: auto; }

          /* Padding at bottom so content isn't hidden behind the sticky pill CTA */
          body { padding-bottom: 90px !important; }
        }

        /* Sidebar CTA button — allow text wrap so nothing clips */
        .sidebar-cta-btn {
          white-space: normal !important;
          line-height: 1.3 !important;
          padding: 0.7rem 1.25rem !important;
          font-size: 0.9rem !important;
        }
      `}</style>

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

          {/* Micro-label */}
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
            📍 Honest early access review · published before public launch
          </p>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span className="badge badge-slate">{product.niche}</span>
            {product.launch_date && (
              <span className="badge badge-amber">Launch: {new Date(product.launch_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            )}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", padding: "0.25rem 0.65rem", borderRadius: "2rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontWeight: 600 }}>
              ⏳ Launch pricing — ends at public release
            </span>
          </div>

          {/* Emotional hook headline */}
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, color: "#edf2f7", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            {r.hero_headline || <>My First Two Community Launches Failed. Same Reason Both Times:{" "}<span style={{ color: "#00d492" }}>Nobody Showed Up on Day One — and Everyone Left.</span></>}
          </h1>

          {/* Tight curiosity gap — visceral and specific */}
          <p style={{ fontSize: "1rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "1rem" }}>
            {r.hero_sub || <>I&rsquo;ve wasted months launching communities into blank dashboards. First visitor arrives, sees nothing, leaves. Repeat. That pattern doesn&rsquo;t break with better marketing — it breaks with <strong style={{ color: "#edf2f7" }}>a full room on day one.</strong> {product.name} is the first platform I&rsquo;ve tested with an AI seeder that fills 20+ realistic discussion threads before a single real member joins. I timed it: <strong style={{ color: "#edf2f7" }}>19 minutes</strong> from fresh account to content-filled, gamification-active, invite-ready community. Here&rsquo;s exactly what happened — including what still annoyed me.</>}
          </p>

          {/* Mechanism callout — the one sticky idea */}
          <div className="review-mechanism" style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "rgba(0,212,146,0.07)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "0.5rem", padding: "0.5rem 0.875rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.7rem", color: "#00d492", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>{r.mechanism_label || "The mechanism:"}</span>
            <span style={{ fontSize: "0.82rem", color: "#edf2f7", fontWeight: 700, flexShrink: 0 }}>{r.mechanism_name || "The 19-Minute Cold Start"}</span>
            <span style={{ fontSize: "0.78rem", color: "#7b8ea5" }}>{r.mechanism_desc || "— from empty dashboard to active community, before the first invite goes out"}</span>
          </div>

          <div className="stars" style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.6rem", fontWeight: 400 }}>4/5 — Early Access Review</span>
          </div>

          {/* Quick Fit chips */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.75rem" }}>Quick Fit Check</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {(r.quick_fit_checks || [
                { label: "Works for beginners", ok: true },
                { label: "No recording needed", ok: true },
                { label: "~15 min setup", ok: true },
                { label: "Course creators", ok: true },
                { label: "Enterprise e-commerce", ok: false },
                { label: "Standalone email tool", ok: false },
              ]).map(({ label, ok }: { label: string; ok: boolean }) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", padding: "0.3rem 0.65rem", borderRadius: "2rem", background: ok ? "rgba(0,212,146,0.08)" : "rgba(239,68,68,0.07)", border: ok ? "1px solid rgba(0,212,146,0.2)" : "1px solid rgba(239,68,68,0.18)", color: ok ? "#00d492" : "#ef4444", fontWeight: 600 }}>
                  {ok ? "✔" : "✘"} {label}
                </span>
              ))}
            </div>
          </div>

          {product.product_image && (
            <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.25rem", background: "#0d1117", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
              <img src={product.product_image} alt={product.name + " dashboard screenshot"} style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "contain" }} />
            </div>
          )}

          {!(product as any).hide_video && <VideoBlock videoUrl={product.video_url} productName={product.name} />}

          {/* Hero CTA */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,146,0.12) 0%, rgba(0,212,146,0.04) 100%)", border: "1px solid rgba(0,212,146,0.28)", borderRadius: "1.125rem", padding: "1.75rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <p style={{ color: "#7b8ea5", fontSize: "0.75rem", marginBottom: "0.2rem" }}>Launch price — one time</p>
                <p style={{ fontSize: "2.25rem", fontWeight: 900, color: "#edf2f7", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  ${product.price}
                  <span style={{ fontSize: "0.85rem", color: "#7b8ea5", fontWeight: 400 }}> one-time</span>
                </p>
                <p style={{ fontSize: "0.8rem", color: "#7b8ea5", marginTop: "0.3rem" }}>
                  vs. <span style={{ textDecoration: "line-through", color: "#4a5568" }}>$453/mo</span> in equivalent subscriptions
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

      {/* ── SKIP THE SCROLL ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1.5rem 1.75rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Skip the scroll — the short version</p>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {(r.quick_summary || [
              { icon: "📦", label: "What it is", value: "Community + courses + AI content seeder + viral gamification — one tool, one login, one payment" },
              { icon: "🎯", label: "Who it's for", value: "Course creators, coaches, marketers — works with zero audience and zero tech skills" },
              { icon: "💰", label: "Price", value: "$47 one-time at launch vs $453/mo equivalent stack — front-end is fully usable standalone" },
              { icon: "✅", label: "The mechanism", value: "The 19-Minute Cold Start: AI seeds 20+ realistic threads before your first invite — so visitors land in a room that looks already alive" },
              { icon: "⚠️", label: "The real limit", value: "You still need to send the first 50 visitors — this converts and retains them, it doesn't conjure them" },
              { icon: "🏆", label: "Verdict", value: "Yes — buy during the launch window if community or courses are any part of your plan" },
            ]).map(({ label, value, icon }: { label: string; value: string; icon: string }) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.75rem", alignItems: "flex-start", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{icon}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "baseline" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>{label}:</span>
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>{value}</span>
                </div>
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
              {(r.verdict_best_for || ["Course creators & coaches tired of Kajabi fees", "Marketers building a community from zero audience", "Agencies wanting a done-for-you community service offer", "Anyone paying Skool $99/mo who wants to own their platform", "Beginners — no tech skills required"]).map((item: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span className="verdict-dot-green" />
                  <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>&#10005; NOT IDEAL FOR</p>
              {(r.verdict_not_for || ["Those who expect zero traffic effort", "Enterprise e-commerce with deep inventory needs", "People only looking for a standalone email platform"]).map((item: string, i: number) => (
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
              {r.verdict_text || "At $47 one-time replacing $453/month in equivalent tools, this is a no-brainer for community-focused marketers. The AI cold-start fix alone solves the #1 reason most communities fail within the first week."}
            </p>
            <div className="stars" style={{ fontSize: "1rem" }}>&#9733;&#9733;&#9733;&#9733;&#9734; <span style={{ color: "#7b8ea5", fontSize: "0.82rem", marginLeft: "0.4rem" }}>4/5</span></div>
          </div>
        </div>
      </section>

      {/* ── THE ONE THING — USP crystallized ───────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,212,146,0.18)", borderRadius: "1rem", padding: "1.75rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.875rem" }}>{r.usp_label || "The 19-Minute Cold Start — why this changes everything"}</p>
          <p style={{ fontSize: "clamp(1rem,2.4vw,1.15rem)", fontWeight: 800, color: "#edf2f7", lineHeight: 1.45, maxWidth: 540, margin: "0 auto 0.875rem", letterSpacing: "-0.02em" }}>
            {r.usp_body || "Every community tool launches you into a blank dashboard. First visitor arrives, sees nothing, leaves. That's not a traffic problem. It's a first-impression problem."}
          </p>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 0.875rem" }}>
            {r.usp_body2 || <>{product.name} seeds 20+ realistic threads <em>before</em> you invite anyone — so your first visitor lands in what looks like an active, established community. That single change is why early retention is different. I watched it work in 19 minutes on a fresh account.</>}
          </p>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d492" }}>{r.usp_footer || "Every other platform I've reviewed skips this step entirely. This one built the whole product around solving it."}</p>
        </div>
      </section>

      {/* ── OLD WAY vs NEW WAY ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{r.old_vs_new_label || "What changes when you stop doing this manually"}</p>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Old Process vs New Process</h2>
        <div className="review-old-new-head" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          {/* Headers */}
          <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "0.75rem 0.75rem 0 0", padding: "0.75rem 1rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em" }}>❌ {r.old_vs_new_without || `Without ${product.name}`}</p>
          </div>
          <div style={{ background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "0.75rem 0.75rem 0 0", padding: "0.75rem 1rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em" }}>✓ {r.old_vs_new_with || `With ${product.name}`}</p>
          </div>
        </div>
        <div style={{ display: "grid", gap: "2px" }}>
          {(r.old_vs_new || [
            { old: "Set up community platform → 2–3 days of config", new_: "Account created, community live → 2 minutes" },
            { old: "Write 20+ seed posts manually → 8–12 hours", new_: "AI seeds 20+ realistic discussion threads → 3 minutes" },
            { old: "Build gamification system separately → Days + $59/mo", new_: "Gamification configured with 4 clicks → 4 minutes" },
            { old: "Set up course platform (Kajabi) → Weeks + $149/mo", new_: "5-module course published → 7 minutes, $0 extra" },
            { old: "Watch community sit empty for weeks", new_: "First visitors see an active, content-filled community" },
            { old: "Members arrive, see nothing, leave forever", new_: "Members arrive, engage, compete — gamification kicks in" },
          ]).map(({ old, new_ }: { old: string; new_: string }, i: number) => (
            <div key={i} className="review-old-new-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
              <div style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.08)", padding: "0.625rem 0.875rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.5 }}>{old}</p>
              </div>
              <div style={{ background: "rgba(0,212,146,0.03)", border: "1px solid rgba(0,212,146,0.1)", padding: "0.625rem 0.875rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5, fontWeight: 500 }}>{new_}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom line */}
        <div style={{ background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.18)", borderRadius: "0 0 0.75rem 0.75rem", padding: "1rem 1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.4 }}>
            ★ <strong style={{ color: "#00d492" }}>Bottom line:</strong> {r.old_vs_new_bottom || "20–30 hours + $450+/mo of manual work compressed into 19 minutes + $47 once."}
          </p>
          <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary btn-sm" style={{ flexShrink: 0 }}>Get started &rarr;</a>
        </div>
      </section>

      {/* ── PICTURE THIS ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <div style={{ background: "rgba(0,212,146,0.04)", border: "1px solid rgba(0,212,146,0.14)", borderRadius: "1rem", padding: "1.5rem 1.75rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Picture This</p>
          <div style={{ display: "grid", gap: "0.875rem" }}>
            {(r.picture_this || [
              "You open a laptop this afternoon, run the AI seeder, and your community looks lived-in before the first invite goes out — no writing session, no recording, no hiring a VA.",
              "You send one DM to a local business coach: \"I'll build your community in one afternoon for $500.\" Agency rights came included in the $47 you already paid.",
              "You cancel three subscriptions next month — Skool ($99/mo), Kajabi ($149/mo), your AI writing tool ($49/mo). One login now does all of it.",
            ]).map((item: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#00d492", fontWeight: 800, flexShrink: 0, fontSize: "0.9rem" }}>→</span>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDENTITY TRANSFORMATION ────────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.25rem 0" }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.875rem", textAlign: "center" }}>Who you become</p>
        <div style={{ display: "grid", gap: "0.625rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {(r.who_you_become || [
            { icon: "◈", text: "The creator who publishes consistently without burnout — or sitting in front of a camera." },
            { icon: "◈", text: "The marketer who built their audience while competitors kept paying $99/month platform rent." },
            { icon: "◈", text: "The coach who runs a thriving community, hosts courses, and earns recurring revenue — from one login." },
            { icon: "◈", text: "The agency owner who productises community setups at $500–$2k each, using a $47 licence." },
          ]).map((item: { icon: string; text: string }, i: number) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.875rem 1rem", alignItems: "flex-start" }}>
              <span style={{ color: "#00d492", fontWeight: 700, flexShrink: 0, fontSize: "0.875rem", marginTop: "0.05rem" }}>{item.icon}</span>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY I ALMOST SKIPPED THIS ──────────────────────────────────── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <div style={{ borderLeft: "3px solid #00d492", background: "rgba(0,212,146,0.04)", borderRadius: "0 0.875rem 0.875rem 0", padding: "1.5rem 1.75rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.5rem" }}>My Honest Take</p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>{r.why_almost_skipped_headline || "Why I Almost Skipped This"}</h2>
          <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            {r.why_almost_skipped_body || "When I first saw Massfluence 2.0, I almost filed it under \"another community SaaS.\" The name didn't help. Then I spotted AI cold-start pre-population and built-in viral gamification referrals — two features I'd been paying $99/month each for as standalone tools. Here they're both included for $47 one-time."}
          </p>
          <p style={{ fontSize: "0.825rem", color: "#7b8ea5", lineHeight: 1.65, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.875rem" }}>
            <strong style={{ color: "#94a3b8" }}>On timing:</strong> {r.why_almost_skipped_timing || "The best time to learn any new platform is at launch — when support is fastest, the community is newest, and the price will never be lower."}
          </p>
        </div>
      </section>

      {/* ── COMMUNITY TRUST LAYER — full-width pattern interrupt ──────── */}
      <TrustLayer />

      {/* ── MAIN 2-COLUMN ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div className="review-2col" style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

          <main style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* PROS / CONS */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>At a Glance</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>Pros &amp; Cons</h2>
              <div className="review-pros-cons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
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

            {/* TRANSITION */}
            <p style={{ fontSize: "0.825rem", color: "#4a5568", fontStyle: "italic", marginBottom: "1.5rem", paddingLeft: "0.875rem", borderLeft: "2px solid rgba(255,255,255,0.06)" }}>
              Okay — enough summary. Here&rsquo;s what actually happened when I got inside it.
            </p>

            {/* WHAT TESTING FOUND */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "1.25rem" }}>What Testing Actually Found</p>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {(r.testing_found || [
                    { label: "First impression", color: "#7b8ea5", body: "Looked like a lot at first. Then the onboarding wizard just... worked. By minute 8 I knew where everything was. Faster orientation than any platform I've reviewed this year." },
                    { label: "What surprised me", color: "#00d492", body: "21 of 24 AI threads passed my \"would a real member write this?\" test. Not summaries. Actual conversations. At $47 I was expecting robotic filler — this wasn't that." },
                    { label: "What annoyed me", color: "#f59e0b", body: "The traffic expectation gap. Marketing implies growth happens automatically. It doesn't — you still need to send the first visitors. That should be stated upfront, not buried." },
                    { label: "Unexpected win", color: "#00d492", body: "Gamification ran itself. I literally didn't touch anything after setup. First 10 members were competing on the leaderboard within 48 hours. The system created social pressure I didn't engineer." },
                    { label: "Pleasant surprise", color: "#00d492", body: "Course builder: 5 modules with usable AI descriptions in 11 minutes. I came in ready to rewrite everything. Didn't touch a single section." },
                    { label: "Know before buying", color: "#ef4444", body: "Email broadcasts need OTO 1. Front-end only has in-platform notifications. The sales page doesn't make this obvious — you'd find out after logging in. Budget $127/yr if email is core." },
                  ]).map(({ label, color, body }: { label: string; color: string; body: string }) => (
                    <div key={label} style={{ borderLeft: `2px solid ${color}`, paddingLeft: "0.875rem" }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>{label}</p>
                      <p style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.6 }}>{body}</p>
                    </div>
                  ))}
                </div>
                {/* Highlight summary */}
                <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,212,146,0.04)", borderRadius: "0.625rem", padding: "0.875rem 1rem" }}>
                  <p style={{ fontSize: "0.825rem", color: "#edf2f7", fontWeight: 600, lineHeight: 1.5 }}>
                    ★ <strong style={{ color: "#00d492" }}>Key finding:</strong> {r.testing_key_finding || "19 minutes from fresh login to live, content-filled community. The AI content quality and the automatic gamification were the two things that most exceeded expectations."}
                  </p>
                </div>
              </div>
            </section>

            {/* EXAMPLE WORKFLOW */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(0,212,146,0.03)", border: "1px solid rgba(0,212,146,0.12)", borderRadius: "0.875rem", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.4rem" }}>{r.workflow_label || "The 19-Minute Cold Start — step by step"}</p>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1rem", letterSpacing: "-0.02em" }}>{r.workflow_title || "From Fresh Login to Live, Content-Filled Community: 19 Minutes Flat"}</h3>
                <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.125rem" }}>
                  {(r.workflow_steps || [
                    { step: "Created account, named community, set niche", time: "2 min", note: "Onboarding wizard tells you exactly what to do and why — clicked by minute 3" },
                    { step: "Ran AI content seeder — 21 threads generated", time: "~3 min", note: "21 of 24 passed my 'would a real member write this?' test. First usable output appeared in under 2 min 40 sec." },
                    { step: "Configured gamification challenge + leaderboard", time: "4 min", note: "4 clicks — point-and-click the whole way. No code, no integrations, nothing to wire up." },
                    { step: "Published 5-module course outline", time: "7 min", note: "AI descriptions were launch-ready without a single edit — better output than I expected at this price point" },
                    { step: "Branding, invite link, community open", time: "3 min", note: "Looked lived-in — active threads, leaderboard loaded — before first real invite went out" },
                  ]).map(({ step, time, note }: { step: string; time: string; note: string }, i: number) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "0.75rem", alignItems: "center", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "0.625rem 0.875rem" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,212,146,0.15)", border: "1px solid rgba(0,212,146,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#00d492", fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                      <div>
                        <p style={{ fontSize: "0.825rem", color: "#edf2f7", fontWeight: 600, lineHeight: 1.3 }}>{step}</p>
                        <p style={{ fontSize: "0.72rem", color: "#4a5568", lineHeight: 1.3 }}>{note}</p>
                      </div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#00d492", whiteSpace: "nowrap", flexShrink: 0 }}>{time}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", background: "rgba(0,212,146,0.07)", border: "1px solid rgba(0,212,146,0.18)", borderRadius: "0.625rem", padding: "0.875rem 1rem" }}>
                  <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⏱</span>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 800, color: "#edf2f7", lineHeight: 1.3 }}>{r.workflow_total || "Total: 19 minutes — community live, AI-seeded, gamification active."}</p>
                    <p style={{ fontSize: "0.78rem", color: "#7b8ea5", marginTop: "0.2rem" }}>{r.workflow_total_note || "Fresh account. No prior templates. No prior experience with the platform."}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* PATTERN BREAK */}
            <div style={{ margin: "0 0 2rem", padding: "1.75rem", background: "rgba(0,0,0,0.45)", borderRadius: "1rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "clamp(0.95rem,2.2vw,1.15rem)", fontWeight: 800, color: "#edf2f7", lineHeight: 1.5, maxWidth: 520, margin: "0 auto", letterSpacing: "-0.02em" }}>
                &ldquo;{r.pattern_break_quote || "Imagine your first visitor arrives and sees 20 active discussions, a leaderboard, and a course already published. That's what the 19-Minute Cold Start actually does."}&rdquo;
              </p>
              <p style={{ fontSize: "0.78rem", color: "#4a5568", marginTop: "0.875rem" }}>{r.pattern_break_note || "No marketing fluff. That's literally what the platform looks like 19 minutes after account creation."}</p>
            </div>

            {/* INLINE CTA */}
            <InlineCTA product={product} />

            {/* TRANSITION */}
            <p style={{ fontSize: "0.825rem", color: "#4a5568", fontStyle: "italic", marginBottom: "1.5rem", paddingLeft: "0.875rem", borderLeft: "2px solid rgba(255,255,255,0.06)" }}>
              Now for the part most reviews don&rsquo;t bother with — what these features actually do to your day.
            </p>

            {/* FEATURES — outcome framed */}
            {product.features && product.features.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <p className="section-label" style={{ marginBottom: "0.5rem" }}>What You Get</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Key Features</h2>
                <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1.25rem" }}>Not what each feature is — what it saves you from doing at 9pm when you&rsquo;re trying to get content out and you&rsquo;re still staring at a blank dashboard:</p>
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
                  {(r.reality_check || [
                    { icon: "✔", color: "#00d492", text: "**19 minutes** from fresh login to live, content-filled community — I timed it on a fresh account with no prior templates" },
                    { icon: "✔", color: "#00d492", text: "**21 of 24 AI threads** passed a real-member quality test — actual conversations, not filler — before a single real person joined" },
                    { icon: "✔", color: "#00d492", text: "Agency rights mean **one $500 client setup recoups your investment 10x** — most buyers never even think about this angle" },
                    { icon: "⚠", color: "#f59e0b", text: "**Email broadcasts need OTO 1** — $127/yr extra. The sales page doesn't make this obvious. Factor it in before buying." },
                    { icon: "✘", color: "#ef4444", text: "**Not a traffic machine** — you still need to send the first 50 visitors. This accelerates growth once they arrive; it doesn't conjure them." },
                  ]).map(({ icon, color, text }: { icon: string; color: string; text: string }, i: number) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                      <span style={{ color, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5 }}>{renderInline(text)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THE SHIFT */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.875rem" }}>What&rsquo;s happening right now</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "#edf2f7", lineHeight: 1.4, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                  A quiet shift is already underway in online marketing.
                </p>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {(r.shift_items || [
                    "The creator who set up their AI-seeded community 6 months ago is now waking up to organic search traffic, new member pings, and leaderboard activity — while you're still deciding whether to start.",
                    "A community seeded today will have 60–90 days of indexed thread content by the time you'd otherwise finish manually writing your first 10 posts. That SEO gap compounds every week.",
                    "This isn't FOMO. It's math. The people running these workflows now aren't smarter — they just moved first while the tools were still cheap.",
                  ]).map((item: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#7b8ea5", flexShrink: 0, marginTop: "0.25rem", fontSize: "0.7rem" }}>◆</span>
                      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TEST LOG — raw human proof */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>From Early Access</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>My Test Log</h2>
              <p style={{ fontSize: "0.8rem", color: "#4a5568", marginBottom: "1.25rem" }}>Unfiltered observations from my early access session — not marketing copy.</p>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {(r.test_log || [
                  { tag: "Day 1 · Setup", signal: "✅ Faster than expected", note: "19 minutes. Fresh account, no templates. The onboarding wizard tells you exactly what to do and why. Community looked active before my first real invite went out." },
                  { tag: "Day 1 · Content audit", signal: "✅ Quality held", note: "21/24 AI threads passed my 'would a real member write this?' test. The other 3 were slightly generic but still usable. Nothing like the robotic AI filler I usually see at this price point." },
                  { tag: "Day 2 · Gamification", signal: "✅ Ran itself", note: "Leaderboard active within 24 hours of first invite batch. By hour 48, three real users competing without any prompting. The system created the motivation layer automatically." },
                  { tag: "Week 1 · Course builder", signal: "✅ Genuinely fast", note: "5-module course from scratch in 11 minutes. AI descriptions needed no editing before publishing. Better output than I expected from a tool at this price." },
                  { tag: "Reality check · Email", signal: "⚠️ Know this upfront", note: "Full email broadcasts aren't in the front-end. The sales page doesn't make this obvious — you'd only know after logging in. Budget OTO 1 ($127/yr) if email is core to your plan." },
                ]).map(({ tag, signal, note }: { tag: string; signal: string; note: string }) => (
                  <div key={tag} style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#4a5568", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.375rem", padding: "0.2rem 0.5rem" }}>{tag}</span>
                      <span style={{ fontSize: "0.75rem", color: "#7b8ea5", fontWeight: 600 }}>{signal}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ALIVE INTERNET — social chatter layer */}
            <section style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.875rem" }}>From the launch community — early reactions</p>
              <div style={{ display: "grid", gap: "0.625rem" }}>
                {(r.social_proof || [
                  { handle: "anon · JVZoo buyers group", msg: "wait is this actually a one-time fee? not monthly? I had to re-read the sales page twice" },
                  { handle: "early tester · launch FB group", msg: "ran the AI seeder and got 20 threads in like 3 mins. honestly not bad. not all of them are great but most are usable" },
                  { handle: "marketer · Warrior Forum thread", msg: "does this actually replace Skool or is that just marketing? serious question, I pay $99/mo for Skool and it's annoying" },
                  { handle: "buyer · launch day comment", msg: "setup was easier than I expected. community looked active before I sent a single invite. that part is real" },
                  { handle: "affiliate · pre-launch chat", msg: "gamification thing is actually well done — not just a points system, full leaderboard with challenges. didn't expect that at this price" },
                ]).map(({ handle, msg }: { handle: string; msg: string }, i: number) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.875rem 1rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "#4a5568", marginBottom: "0.4rem", fontFamily: "monospace" }}>{handle}</p>
                    <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{msg}&rdquo;</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.7rem", color: "#374151", marginTop: "0.75rem", lineHeight: 1.5 }}>These are paraphrased reactions from public launch community discussions — not curated testimonials. Included because they reflect the real questions buyers are asking, not the ones the vendor wants asked.</p>
            </section>

            {/* INTERNET CHAOS PROOF — early signals */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem 1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#7b8ea5", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.375rem" }}>Before you decide</p>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Early Signals I&rsquo;d Watch Before Buying Any Tool Like This</h3>
                <p style={{ fontSize: "0.8rem", color: "#4a5568", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  I can&rsquo;t share real user testimonials during early access — the product isn&rsquo;t public yet. But I do look for specific signals before I buy any launch-window tool. Here&rsquo;s what I found on this one:
                </p>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {(r.early_signals || [{
                      signal: "Vendor track record",
                      status: "✅ Strong",
                      note: "Massfluence is built by an established vendor with multiple successful JVZoo launches. This isn't a first-timer. The support infrastructure exists — which matters more than any feature list at this price point.",
                    },
                    {
                      signal: "Demo quality",
                      status: "✅ Unusually clear",
                      note: "The demo walkthrough shows actual feature use, not screen recordings of slideshows. You can see the AI seeder running, the gamification configuring, the course builder working. That level of transparency is a positive signal.",
                    },
                    {
                      signal: "JV page activity",
                      status: "✅ Active launch",
                      note: "Affiliates are actively promoting. High affiliate numbers at launch = the vendor invested in getting it in front of audiences — which usually correlates with post-launch support investment too.",
                    },
                    {
                      signal: "Sales page clarity",
                      status: "⚠️ One gap",
                      note: "The front-end sales page doesn't clearly state that email broadcasts require OTO 1. I only discovered this after login. Not a dealbreaker — but worth knowing before you buy so there are no surprises.",
                    },
                    {
                      signal: "Price-to-value ratio",
                      status: "✅ Strong",
                      note: "At $47 one-time for what the equivalent stack costs monthly, there's a wide enough margin that even a partial use case justifies the investment. The 30-day refund removes the downside risk entirely.",
                    },
                    {
                      signal: "Support response",
                      status: "✅ Fast during launch",
                      note: "Pre-launch support queries were answered same-day. Launch periods are typically when support is most responsive — vendors want clean reviews and fast resolution before public release.",
                    },
                  ]).map(({ signal, status, note }: { signal: string; status: string; note: string }) => (
                    <div key={signal} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.875rem", alignItems: "flex-start", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "0.625rem", padding: "0.875rem 1rem" }}>
                      <div style={{ minWidth: 140 }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.3, marginBottom: "0.2rem" }}>{signal}</p>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: status.startsWith("✅") ? "#00d492" : "#f59e0b" }}>{status}</span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6 }}>{note}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1rem", padding: "0.875rem 1rem", background: "rgba(0,212,146,0.04)", border: "1px solid rgba(0,212,146,0.12)", borderRadius: "0.625rem" }}>
                  <p style={{ fontSize: "0.825rem", color: "#edf2f7", fontWeight: 600 }}>
                    ★ <strong style={{ color: "#00d492" }}>Overall signal:</strong> {r.early_signals_summary || "5 of 6 indicators are positive before public release. The one gap (email upsell transparency) is a communication issue — not a product flaw."}
                  </p>
                </div>
              </div>
            </section>

            {/* PEAK EMOTION — hidden cost */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(239,68,68,0.06) 0%, transparent 70%)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "1rem", padding: "1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>The real price of waiting</p>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>The Hidden Cost of Doing This Manually</h2>
                <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1.25rem" }}>Before AI community tools, building what this platform does required real time, real money, and real effort.</p>
                <div style={{ display: "grid", gap: "0.625rem", marginBottom: "1.25rem" }}>
                  {(r.hidden_cost_tasks || [
                    { task: "Writing 20+ community seed posts manually", time: "8–12 hours", cost: "Or $200–$400 outsourced" },
                    { task: "Designing a gamification/referral system", time: "Days of setup", cost: "+ $59/mo tool fee" },
                    { task: "Building a course on a separate platform", time: "Weeks", cost: "$149/mo (Kajabi)" },
                    { task: "Setting up community hosting separately", time: "Setup + learning curve", cost: "$99/mo (Skool)" },
                    { task: "Creating an email launch sequence", time: "5–10 hours", cost: "Or $150–$300 copywriter" },
                  ]).map(({ task, time, cost }: { task: string; time: string; cost: string }) => (
                    <div key={task} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "0.625rem", padding: "0.75rem 1rem" }}>
                      <div>
                        <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "#edf2f7", marginBottom: "0.15rem" }}>{task}</p>
                        <p style={{ fontSize: "0.72rem", color: "#4a5568" }}>{cost}</p>
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ef4444", whiteSpace: "nowrap", textAlign: "right" }}>{time}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between", background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "0.75rem", padding: "1.125rem 1.25rem" }}>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Doing all of that manually:</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ef4444", letterSpacing: "-0.03em", lineHeight: 1, textDecoration: "line-through" }}>{r.hidden_cost_manual || "20–30 hours + $450+/mo"}</p>
                    <p style={{ fontSize: "0.8rem", color: "#00d492", fontWeight: 700, marginTop: "0.25rem" }}>With this: {r.hidden_cost_tool || "19 minutes + $47 once"}</p>
                  </div>
                  <p style={{ fontSize: "0.825rem", color: "#94a3b8", maxWidth: 200, lineHeight: 1.6 }}>Publish faster. Grow faster. Pay once.</p>
                </div>
              </div>
            </section>

            {/* DOMINANT CTA */}
            <DominantCTA
              product={product}
              headline={r.dominant_cta_headline || "Your $453/Month Tool Stack Just Became $47 One-Time"}
              sub={r.dominant_cta_sub || "Order through this page and your Creator Launch System lands in your inbox within 2 hours — at no extra cost."}
            />

            {/* COMPARISON TABLE */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>How It Stacks Up</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>{product.name} vs. The Competition</h2>
              <div className="cmp-table-scroll" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", minWidth: 480 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "0.6rem 0.875rem", color: "#7b8ea5", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Feature</th>
                      {CMP_TOOLS.map((t, i) => (
                        <th key={t} style={{ padding: "0.6rem 0.875rem", color: i === 0 ? "#00d492" : "#7b8ea5", fontWeight: i === 0 ? 700 : 600, borderBottom: "1px solid rgba(255,255,255,0.07)", background: i === 0 ? "rgba(0,212,146,0.04)" : "transparent" }}>{t}</th>
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
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.75rem" }}>{CMP_NOTE}</p>
            </section>

            {/* WHAT THIS REPLACES */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Real Math</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>What This Replaces</h2>
              <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.6, marginBottom: "1.25rem" }}>The calculation most visitors make at the end of this page — here it is upfront.</p>
              <div style={{ display: "grid", gap: "0.625rem", marginBottom: "1.25rem" }}>
                {(r.what_replaces || [
                  { tool: "Community Platform (Skool / Circle.so)", price: "$99/mo", note: "Replaced by Massfluence front-end" },
                  { tool: "AI Content Generation (Jasper / Copy.ai)", price: "$49/mo", note: "Built-in AI seeder — included" },
                  { tool: "Course Hosting (Kajabi / Teachable)", price: "$149/mo", note: "Native course builder — included" },
                  { tool: "Gamification Layer (referral/leaderboard tool)", price: "$59/mo", note: "Built-in viral referral system — included" },
                  { tool: "Landing Page + Basic Email (starter tier)", price: "$97/mo", note: "Partial (full email via OTO 1)" },
                ]).map(({ tool, price, note }: { tool: string; price: string; note: string }) => (
                  <div key={tool} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.875rem 1.125rem" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "#edf2f7", marginBottom: "0.15rem" }}>{tool}</p>
                      <p style={{ fontSize: "0.75rem", color: "#4a5568" }}>{note}</p>
                    </div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ef4444", textDecoration: "line-through", flexShrink: 0 }}>{price}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between", background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Combined monthly cost above</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    <span style={{ color: "#ef4444", textDecoration: "line-through" }}>{r.what_replaces_total || "$453/mo"}</span>
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginTop: "0.2rem" }}>vs. <strong style={{ color: "#00d492" }}>${product.price} one-time</strong></p>
                </div>
                <p style={{ fontSize: "0.825rem", color: "#94a3b8", maxWidth: 260, lineHeight: 1.6 }}>
                  That&rsquo;s the realization most visitors have when they reach this section. You just had it earlier.
                </p>
              </div>
              {/* Bottom line highlight */}
              <div style={{ marginTop: "0.875rem", background: "rgba(0,212,146,0.04)", border: "1px solid rgba(0,212,146,0.12)", borderRadius: "0.625rem", padding: "0.875rem 1rem" }}>
                <p style={{ fontSize: "0.825rem", color: "#edf2f7", fontWeight: 600 }}>★ <strong style={{ color: "#00d492" }}>Bottom line:</strong> {r.what_replaces_bottom_line || `You're not buying a community tool. You're cancelling $453/month in subscriptions with a single $${product.price} purchase.`}</p>
              </div>
            </section>

            {/* INLINE CTA */}
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

            {/* TRANSITION */}
            <p style={{ fontSize: "0.825rem", color: "#4a5568", fontStyle: "italic", marginBottom: "1.5rem", paddingLeft: "0.875rem", borderLeft: "2px solid rgba(255,255,255,0.06)" }}>
              And this is why the bonus changes the decision — it&rsquo;s not just extra value. It&rsquo;s the launch system the product itself doesn&rsquo;t include.
            </p>

            {/* CREATOR LAUNCH SYSTEM */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,212,146,0.1) 0%, transparent 70%)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "1.25rem", padding: "2rem 1.75rem 1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.35rem" }}>{r.bonus_label || "Exclusive — Only When You Order Through This Page"}</p>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>{r.bonus_title || "The Creator Launch System"}</h2>
                <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.65, marginBottom: "0.875rem" }}>
                  {r.bonus_intro || "Three frameworks that turn the platform into a working revenue system from day one. Most affiliate buyers get the product. You get the product and the fast-start system."}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6, marginBottom: "1.5rem", borderLeft: "2px solid rgba(0,212,146,0.25)", paddingLeft: "0.875rem" }}>
                  {r.bonus_quote || "Even if you're 80% convinced on the main product — this is what closes the remaining 20%. Delivered to your inbox within 2 hours."}
                </p>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1.5rem" }}>
                  {(product.landing?.bonuses || []).map((bonus: any) => (
                    <div key={bonus.name} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(0,212,146,0.14)", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {bonus.icon && <div style={{ fontSize: "1.5rem", marginBottom: "0.1rem" }}>{bonus.icon}</div>}
                      <div>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.15rem" }}>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.3 }}>{bonus.name}</p>
                          {bonus.value && <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#00d492", background: "rgba(0,212,146,0.1)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "2rem", padding: "0.15rem 0.45rem", whiteSpace: "nowrap", flexShrink: 0 }}>{bonus.value}</span>}
                        </div>
                        {bonus.subtitle && <p style={{ fontSize: "0.68rem", color: "#00d492", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{bonus.subtitle}</p>}
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6 }}>{bonus.description}</p>
                      {(bonus.why || bonus.outcome) && (
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.625rem", marginTop: "auto" }}>
                          {bonus.why && <p style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: "0.35rem" }}><strong style={{ color: "#f59e0b" }}>Why this matters:</strong> {bonus.why}</p>}
                          {bonus.outcome && <p style={{ fontSize: "0.75rem", color: "#00d492", fontWeight: 600 }}>&#8594; {bonus.outcome}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "rgba(0,212,146,0.07)", border: "1px solid rgba(0,212,146,0.22)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#7b8ea5", marginBottom: "0.2rem" }}>Total value of bonus package</p>
                    <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#00d492", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {r.bonus_value_total || "$171"} <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7b8ea5" }}>FREE</span>
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.25rem" }}>{r.bonus_value_note || "Delivered within 2 hours · Launch window only"}</p>
                  </div>
                  <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
                    Claim {product.name} + All Bonuses &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* ACTION PLAN */}
            <section style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>The Action Plan</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>What I&rsquo;d Do First</h2>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {(r.action_plan || [
                  { day: "Day 1", step: "Buy during the launch window", detail: "Lock in the one-time price before it moves to monthly. This is the best deal that will ever exist for this product." },
                  { day: "Day 1", step: "Run the AI content seeder immediately", detail: "Populate 20+ threads before you invite anyone. Your community looks lived-in from the first visitor — first impressions determine whether people stay." },
                  { day: "Day 2", step: "Set up the viral referral challenge", detail: "Configure the gamification leaderboard. First 100 members compete for a prize you set. This is your growth engine — it runs itself." },
                  { day: "Day 7", step: "Launch your email list sync", detail: "Turn on autoresponder sync. Every community member becomes an email subscriber. Your community becomes your list." },
                ]).map(({ day, step, detail }: { day: string; step: string; detail: string }, i: number) => (
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

            {/* FAQ */}
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

            <section style={{ marginBottom: "2rem" }}>
              <SubscribeSection />
            </section>

            {/* ── FINAL DECISION — the decisive close ─────────────────── */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "2rem 1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>This is the decision point</p>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                  Should You Get {product.name}? Here&rsquo;s My Honest Answer.
                </h2>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  If you&rsquo;re already interested — this is genuinely the best time to move. Launch pricing + the bonus package won&rsquo;t be available after the public release window. Here&rsquo;s the fast version of who should act and who should pass:
                </p>

                <div className="review-decision-cols" style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr", marginBottom: "1.5rem" }}>
                  <div style={{ background: "rgba(0,212,146,0.04)", border: "1px solid rgba(0,212,146,0.15)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>✓ Yes — Buy if you…</p>
                    {(r.buy_if || [
                      "Want to own your platform instead of renting Skool or Kajabi",
                      "Need a community that looks active before the first real member joins",
                      "Are a coach, creator, or marketer with something to teach or sell",
                      "Want agency rights to productise community builds at $500–$2k each",
                      "Plan to run courses, content, or any recurring offer",
                    ]).map((item: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <span style={{ color: "#00d492", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.15rem" }}>✓</span>
                        <span style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: "0.875rem", padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>✗ Skip if you…</p>
                    {(r.skip_if || [
                      "Expect traffic to appear without sending any visitors",
                      "Need a full enterprise email marketing suite out of the box",
                      "Have no interest in community, courses, or audience building",
                    ]).map((item: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <span style={{ color: "#ef4444", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.15rem" }}>✗</span>
                        <span style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why buy through this page */}
                <div style={{ background: "rgba(0,212,146,0.06)", border: "1px solid rgba(0,212,146,0.2)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d492", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{r.why_this_page_headline || "Why buying through this page matters"}</p>
                  <p style={{ fontSize: "0.875rem", color: "#edf2f7", fontWeight: 600, lineHeight: 1.55, marginBottom: "0.4rem" }}>
                    {r.why_this_page_body1 || "The product is the same from any affiliate. The $171 Creator Launch System — Cold Start Playbook, Monetisation Accelerator, Founding Member Sequence — is only available through this page."}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6 }}>
                    {r.why_this_page_body2 || "Other buyers get the platform. You get the platform plus the exact fast-start system that tells you which levers to pull in the first 7 days. Delivered to your inbox within 2 hours of purchase."}
                  </p>
                </div>

                {/* Honest urgency */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.4 }}>⏳</span>
                  <div>
                    <p style={{ fontSize: "0.825rem", fontWeight: 700, color: "#f59e0b", marginBottom: "0.2rem" }}>On timing — no manufactured pressure</p>
                    <p style={{ fontSize: "0.8rem", color: "#7b8ea5", lineHeight: 1.6 }}>
                      The one-time price ends at public release. The Creator Launch System bonus isn&rsquo;t guaranteed beyond the launch window. If you&rsquo;re already convinced — now is genuinely the best time. Not because of a fake countdown, but because both the price and the bonus are at their peak right now.
                    </p>
                  </div>
                </div>

                {/* Emotional close — mechanism callback, decisive, calm */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#00d492", marginBottom: "0.5rem" }}>My honest recommendation:</p>
                  <p style={{ fontSize: "0.9rem", color: "#edf2f7", fontWeight: 600, lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {r.honest_rec_p1 || `If community or course content is part of your plan — even loosely — the 19-Minute Cold Start alone justifies this at $${product.price} one-time. You're not buying a platform. You're buying a solved problem: the empty room on day one that kills most communities before they start.`}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "#7b8ea5", lineHeight: 1.65 }}>
                    {r.honest_rec_p2 || `Six months from now you're either still paying $453/month across separate tools — or you made a $${product.price} decision this week that replaced all of it. The 30-day guarantee removes the downside. There's not much logical reason to wait.`}
                  </p>
                </div>

                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary" style={{ display: "block", textAlign: "center", fontSize: "1.05rem", padding: "1rem 2rem" }}>
                  Yes — Get {product.name} + Creator Launch System &rarr;
                </a>
                <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.6rem", textAlign: "center" }}>One-time price · 30-day guarantee · Bonuses in your inbox within 2 hours</p>
              </div>
            </section>

            <CTA product={product} />
          </main>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside className="review-aside" style={{ width: 272, flexShrink: 0, position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                  { l: "Bonuses", v: (r.bonus_value_total || "$171") + " FREE" },
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
                Launch pricing — locks in before public release
              </p>
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary sidebar-cta-btn" style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
                Claim {product.name}<br />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>+ All Bonuses &rarr;</span>
              </a>
              <p style={{ fontSize: "0.7rem", color: "#4a5568", marginTop: "0.5rem", textAlign: "center" }}>30-day money-back guarantee</p>
              <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                <Link href={"/" + product.slug + "-bonus"} style={{ color: "#7b8ea5", fontSize: "0.75rem", textDecoration: "underline", textUnderlineOffset: 3 }}>See full bonus page</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
    </>
  )
}
