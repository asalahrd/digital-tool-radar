import type { Product } from "@/lib/types"
import Link from "next/link"
import SubscribeSection from "./SubscribeSection"

const DEFAULT_BONUSES = [
  { name: "Quick-Start Checklist", description: "Step-by-step checklist to get your first result within 24 hours.", badge: "INSTANT ACCESS", value: "$27", why: "Eliminates the overwhelm of starting from scratch" },
  { name: "Campaign Template Pack", description: "Ready-to-use templates designed specifically for this product.", badge: "INSTANT ACCESS", value: "$47", why: "Saves hours of setup and gets you results faster" },
  { name: "Custom Implementation Guide", description: "A personalised action plan built around your specific goals.", badge: "READY IN 2 HRS", value: "$97", why: "The missing piece most buyers never get" },
]

const CTA = ({ href, text, sub }: { href: string; text: string; sub?: string }) => (
  <div style={{ textAlign: "center" }}>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="btn-primary"
      style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem", display: "inline-flex" }}
    >
      {text} &#8594;
    </a>
    {sub && <p style={{ fontSize: "0.72rem", color: "#4a5568", marginTop: "0.5rem" }}>{sub}</p>}
  </div>
)

function VideoBlock({ videoUrl, productName }: { videoUrl?: string; productName: string }) {
  if (!videoUrl) {
    return (
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "1.5rem 1.25rem 0",
        }}
      >
        <div
          style={{
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem 2rem",
            gap: "0.875rem",
            textAlign: "center" as const,
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
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1.25rem 0" }}>
      <div
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          aspectRatio: "16/9",
          background: "#0d1117",
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
    </div>
  )
}

export default function BonusPage({ product }: { product: Product }) {
  const bonuses =
    product.landing && product.landing.bonuses && product.landing.bonuses.length > 0
      ? product.landing.bonuses
      : DEFAULT_BONUSES

  const bullets =
    product.landing && product.landing.bullets && product.landing.bullets.length > 0
      ? product.landing.bullets
      : ["Get up and running in minutes", "Save hours with a pre-built action plan", "Exclusive bonuses you can't find anywhere else"]

  const headline = product.landing && product.landing.headline
    ? product.landing.headline
    : "Get " + product.name + " + My Exclusive Bonus Stack"

  const ctaText = product.landing && product.landing.cta_text
    ? product.landing.cta_text
    : "Get " + product.name + " + My Bonuses"

  const urgency = product.landing && product.landing.urgency_line
    ? product.landing.urgency_line
    : "Bonuses expire at launch close"

  const affiliateLink = product.affiliate_link || "#"

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(0,212,146,0.13) 0%, transparent 65%)",
          padding: "4.5rem 1.25rem 3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="badge badge-green" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            Exclusive Bonuses — Limited Time
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
          <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 1.75rem" }}>
            Order through this page and get an exclusive bonus stack designed to help you get results faster — included at no extra cost.
          </p>
          <ul style={{ listStyle: "none", padding: 0, maxWidth: 460, margin: "0 auto 2rem", display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left" }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ minWidth: "1.2rem", height: "1.2rem", borderRadius: "50%", background: "rgba(0,212,146,0.15)", border: "1px solid rgba(0,212,146,0.35)", color: "#00d492", fontSize: "0.6rem", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.2rem", flexShrink: 0 }}>
                  &#10003;
                </span>
                <span style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>
          <CTA href={affiliateLink} text={ctaText} sub={urgency} />
        </div>
      </section>

      {/* ── 2. PRODUCT IMAGE + STATS ────────────────────────────────────── */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1.25rem" }}>
          {product.product_image && (
            <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem", boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
              <img
                src={product.product_image}
                alt={product.name + " dashboard"}
                loading="lazy"
                style={{ width: "100%", display: "block", maxHeight: 380, objectFit: "contain", objectPosition: "center", background: "#0d1117" }}
              />
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2.5rem" }}>
            {[
              { label: "Front-end Price", value: "$" + product.price, color: "#edf2f7" },
              { label: "30-Day Guarantee", value: "Included", color: "#00d492" },
              { label: "Bonuses Included", value: String(bonuses.length), color: "#a78bfa" },
              { label: "Bonus Delivery", value: "< 2 hrs", color: "#edf2f7" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 900, color, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "0.68rem", color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.3rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3.5rem 1.25rem" }}>

        {/* ── 3. QUICK DECISION BOX ──────────────────────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Is This Right For You?</p>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
            Quick Verdict
          </h2>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {/* Best for */}
            <div className="verdict-box">
              <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#00d492", marginBottom: "0.75rem" }}>
                &#10003; Best For
              </p>
              {[
                "Course creators & coaches tired of Kajabi fees",
                "Marketers building a community from scratch",
                "Agencies wanting a community-building service offer",
                "Anyone paying for Skool and wants to own their platform",
                "Beginners — no tech skills required",
              ].map((item, i) => (
                <div key={i} className="verdict-row">
                  <div className="verdict-dot-green" />
                  <span style={{ color: "#94a3b8" }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Not ideal for */}
            <div className="verdict-box">
              <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#ef4444", marginBottom: "0.75rem" }}>
                &#10005; Not Ideal For
              </p>
              {[
                "Those who expect zero traffic effort",
                "Enterprise-level e-commerce with deep inventory needs",
                "Users who already own a thriving private community",
                "People only looking for a standalone email tool",
              ].map((item, i) => (
                <div key={i} className="verdict-row">
                  <div className="verdict-dot-red" />
                  <span style={{ color: "#94a3b8" }}>{item}</span>
                </div>
              ))}
              {/* My verdict */}
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#f59e0b", marginBottom: "0.5rem" }}>My Verdict</p>
                <p style={{ fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  At $47 one-time replacing $958/month in tools, it&apos;s a no-brainer for community-focused marketers. The AI cold-start fix alone is worth it.
                </p>
                <div className="stars" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>&#9733;&#9733;&#9733;&#9733;&#9734; <span style={{ fontSize: "0.75rem", color: "#7b8ea5", fontWeight: 400 }}>4/5</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. VISUAL PROOF / SCREENSHOTS ─────────────────────────────── */}
        {product.screenshots && product.screenshots.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Inside the Dashboard</p>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
              See What You&apos;re Getting
            </h2>
            <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {product.screenshots.map((src, i) => (
                <div key={i} style={{ borderRadius: "0.875rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#0d1117" }}>
                  <img
                    src={src}
                    alt={"Dashboard screenshot " + (i + 1)}
                    loading="lazy"
                    style={{ width: "100%", display: "block", height: 160, objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. SOCIAL PROOF / EARLY IMPRESSIONS ───────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Social Proof</p>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.5rem", letterSpacing: "-0.025em" }}>
            What Early Users Are Noticing
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#4a5568", marginBottom: "1.25rem" }}>
            Based on public signals from the JV page, affiliate community, and early tester feedback.
          </p>
          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
            {[
              { quote: "The gamification referral loop is the feature I didn't know I needed. Members are inviting other members without me doing anything.", who: "Early beta tester — digital marketing niche" },
              { quote: "Replaced my $99/mo Skool subscription on day one. The AI content posting alone saves me 3–4 hours a week.", who: "Online course creator, pre-launch access" },
              { quote: "I set up my community site in under 30 minutes. The templates are actually decent — not the usual ugly drag-and-drop mess.", who: "Affiliate marketer — pre-launch review access" },
              { quote: "The vendor track record matters here. Ben Murray and Karthik Ramani have consistently been top 3 affiliates on most major launches this year.", who: "JVZoo affiliate community observation" },
            ].map((item, i) => (
              <div key={i} className="proof-card">
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, fontStyle: "italic", marginBottom: "0.75rem" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p style={{ fontSize: "0.72rem", color: "#4a5568", fontWeight: 600 }}>— {item.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. BONUS VALUE STACK ──────────────────────────────────────── */}
        <section style={{ marginBottom: "2rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Your Exclusive Bonuses</p>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "0.4rem", letterSpacing: "-0.025em" }}>
            Everything You Get When You Buy Today
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#4a5568", marginBottom: "1.5rem" }}>
            These bonuses only apply when you buy through my link. Forward your receipt and they arrive in your inbox within 2 hours.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bonuses.map((bonus, i) => {
              const bonusValue = (bonus as { value?: string }).value || ""
              const bonusWhy  = (bonus as { why?: string }).why  || ""
              return (
                <div key={i} className="bonus-card">
                  <div className="bonus-num">{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                      <p style={{ fontSize: "1rem", fontWeight: 700, color: "#edf2f7", lineHeight: 1.25 }}>{bonus.name}</p>
                      {bonus.badge && <span className="badge badge-green" style={{ fontSize: "0.6rem" }}>{bonus.badge}</span>}
                      {bonusValue && <span className="value-tag">Value: {bonusValue}</span>}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#7b8ea5", lineHeight: 1.55, marginBottom: bonusWhy ? "0.5rem" : 0 }}>
                      {bonus.description}
                    </p>
                    {bonusWhy && (
                      <p style={{ fontSize: "0.78rem", color: "#00d492", fontWeight: 600 }}>
                        &#10142; {bonusWhy}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA #2 — After bonuses ─────────────────────────────────────── */}
        <div style={{ marginBottom: "3rem" }}>
          <CTA href={affiliateLink} text={ctaText} sub={urgency} />
        </div>

        {/* ── 7. COMPARISON TABLE ───────────────────────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>How It Compares</p>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
            {product.name} vs The Alternatives
          </h2>
          <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Feature</th>
                    <th style={{ background: "rgba(0,212,146,0.1)", color: "#00d492" }}>Massfluence 2.0</th>
                    <th>Skool</th>
                    <th>Kajabi</th>
                    <th>Facebook Groups</th>
                    <th>ClickFunnels</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Price", ours: "$47 one-time", a: "$99/mo", b: "$399/mo", c: "Free*", d: "$299/mo" },
                    { feature: "AI Content Generation", ours: "✓", a: "✗", b: "✗", c: "✗", d: "✗" },
                    { feature: "Viral Gamification", ours: "✓", a: "✗", b: "✗", c: "✗", d: "✗" },
                    { feature: "Course Hosting", ours: "✓", a: "✓", b: "✓", c: "✗", d: "~" },
                    { feature: "Own Your Platform", ours: "✓", a: "✓", b: "✓", c: "✗", d: "✓" },
                    { feature: "SEO Thread Indexing", ours: "✓", a: "✗", b: "✗", c: "✗", d: "✗" },
                    { feature: "Agency Rights", ours: "✓", a: "✗", b: "✗", c: "✗", d: "✗" },
                    { feature: "Email List Building", ours: "✓", a: "✓", b: "✓", c: "✗", d: "✓" },
                    { feature: "Cold-Start AI Fix", ours: "✓", a: "✗", b: "✗", c: "✗", d: "✗" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row.feature}</td>
                      <td style={{ background: "rgba(0,212,146,0.05)", fontWeight: 700 }}>
                        <span className={row.ours === "✓" ? "cmp-yes" : row.ours === "✗" ? "cmp-no" : ""}>{row.ours}</span>
                      </td>
                      <td><span className={row.a === "✓" ? "cmp-yes" : row.a === "✗" ? "cmp-no" : row.a === "~" ? "cmp-partial" : ""}>{row.a}</span></td>
                      <td><span className={row.b === "✓" ? "cmp-yes" : row.b === "✗" ? "cmp-no" : row.b === "~" ? "cmp-partial" : ""}>{row.b}</span></td>
                      <td><span className={row.c === "✓" ? "cmp-yes" : row.c === "✗" ? "cmp-no" : row.c === "~" ? "cmp-partial" : ""}>{row.c}</span></td>
                      <td><span className={row.d === "✓" ? "cmp-yes" : row.d === "✗" ? "cmp-no" : row.d === "~" ? "cmp-partial" : ""}>{row.d}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.7rem", color: "#4a5568", padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              * Facebook Groups is free but you don&apos;t own your audience — Meta can ban your group or cut your reach at any time.
            </p>
          </div>
        </section>

        {/* ── 8. FAQ / OBJECTION HANDLING ──────────────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Common Questions</p>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
            Questions Before You Buy
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              {
                q: "Is this beginner-friendly? Do I need tech experience?",
                a: "Completely beginner-friendly. Setup is point-and-click — templates handle design, AI handles content. If you can use Facebook, you can use this. Most testers had a live community within 30 minutes of logging in.",
              },
              {
                q: "Is the $47 front-end enough, or will I need the upsells to get value?",
                a: "The front-end is fully functional for building communities, hosting courses, and selling products. The upsells (Gold at $127/year) unlock unlimited communities and email broadcasts — useful if you plan to run multiple sites or want to email members directly. Most beginners won't need them on day one.",
              },
              {
                q: "Are there upsells? How much does the full funnel cost?",
                a: "Yes. OTO1 (Gold): $127/year — unlimited communities + email broadcasts. OTO2 (Platinum): $167 — international markets + whitelabel-lite. OTO3 (Enterprise): $127 — full agency whitelabel + 100 clients. Total if you buy everything: ~$421. You don't need all of them — pick based on your specific goals.",
              },
              {
                q: "Will this work if I have zero audience right now?",
                a: "Yes — the AI prepopulation feature specifically solves the cold-start problem. Your community looks active before real members join. You still need to bring your first visitors (social media, email, SEO, or paid traffic), but the platform converts those visitors into engaged members far better than an empty page would.",
              },
              {
                q: "Can I replace Kajabi or Skool with this?",
                a: "If you use those platforms primarily for community and course hosting, yes. Massfluence handles both. Kajabi's advanced email automation and sales page builder have no direct equivalent here — if you rely heavily on those, you'd want to keep a dedicated email tool.",
              },
              {
                q: "How quickly can I start using it after purchase?",
                a: "Immediately. It's cloud-based — no install, no setup file. Log in, pick a template, customize colors and your domain, turn on AI, and you're live. Most users are up in under an hour.",
              },
              {
                q: "What if I buy and it's not for me?",
                a: "The product comes with the vendor's standard refund policy (check the sales page for current terms). Buy through my link, and if you have any issues getting started, I'm available to help — that's part of the bonus package.",
              },
            ].map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 9. WHAT HAPPENS NEXT ─────────────────────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>How To Claim</p>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
            What Happens After You Buy
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { step: "1", title: "Click the button below", body: "You'll be taken to the official vendor sales page on JVZoo." },
              { step: "2", title: "Complete your purchase", body: "Buy at the current launch price. Make sure you're buying through this page's link so your bonus is tracked." },
              { step: "3", title: "Forward your receipt", body: 'Send your JVZoo purchase receipt to the email on the bonus confirmation page. Subject line: "Massfluence 2.0 Bonus."' },
              { step: "4", title: "Receive your bonuses within 2 hours", body: "All 3 bonuses will be delivered to your inbox. The custom bonus (bonus #3) will be ready within 2 hours during business hours." },
              { step: "5", title: "Start building your community", body: "Log into AITribes, pick a template, and follow the Quick-Start Checklist (bonus #1) to get your first real members." },
            ].map((item) => (
              <div key={item.step} className="step-item">
                <div className="step-num">{item.step}</div>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#edf2f7", marginBottom: "0.2rem" }}>{item.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "#7b8ea5", lineHeight: 1.6 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. FEATURES GRID ────────────────────────────────────────── */}
        {product.features && product.features.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>What You&apos;re Buying</p>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
              {product.name} Features
            </h2>
            <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {product.features.slice(0, 8).map((feat, i) => {
                const dashIdx = feat.indexOf(" — ")
                const title = dashIdx > -1 ? feat.slice(0, dashIdx) : feat
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#00d492", fontWeight: 800, fontSize: "0.75rem", marginTop: "0.1rem" }}>&#10003;</span>
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5 }}>{title}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── OTO TABLE ────────────────────────────────────────────────── */}
        {product.otos && product.otos.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Full Funnel</p>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#edf2f7", marginBottom: "1.25rem", letterSpacing: "-0.025em" }}>
              Upsells at a Glance
            </h2>
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", overflow: "hidden" }}>
              <table className="oto-table">
                <thead style={{ background: "rgba(255,255,255,0.03)" }}>
                  <tr><th>Upsell</th><th style={{ width: 90 }}>Price</th></tr>
                </thead>
                <tbody>
                  {product.otos.map((oto, i) => (
                    <tr key={i}>
                      <td>
                        <p style={{ fontWeight: 700, color: "#edf2f7", marginBottom: "0.2rem", fontSize: "0.875rem" }}>{oto.name}</p>
                        <p style={{ fontSize: "0.78rem", color: "#7b8ea5", lineHeight: 1.5 }}>{oto.description}</p>
                      </td>
                      <td>
                        {oto.price ? <strong style={{ color: "#edf2f7" }}>${oto.price}</strong> : <span style={{ color: "#4a5568", fontSize: "0.78rem" }}>See page</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
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
            Buy through my link, forward your receipt, and your bonuses arrive in your inbox within 2 hours.
          </p>
          <CTA href={affiliateLink} text={ctaText} sub={urgency} />
          <div style={{ marginTop: "1rem" }}>
            <Link href={"/" + product.slug + "-review"} style={{ color: "#7b8ea5", fontSize: "0.8rem", textDecoration: "underline", textUnderlineOffset: 3 }}>
              Read the full review first
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
