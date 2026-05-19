"use client"

import { useState } from "react"
import type {
  Product,
  HybridFeatureCard,
  HybridBonusItem,
  HybridComparisonRow,
  HybridSocialProofItem,
  HybridUseCase,
  HybridMicroProofItem,
} from "@/lib/types"

// ─── Design tokens (match globals.css) ───────────────────────────────────────
const C = {
  bg:       "#080b10",
  bgCard:   "#0d1117",
  bgElevated:"#111827",
  border:   "rgba(255,255,255,0.07)",
  green:    "#00d492",
  greenGlow:"rgba(0,212,146,0.18)",
  purple:   "#7c3aed",
  amber:    "#f59e0b",
  text:     "#edf2f7",
  muted:    "#7b8ea5",
  dim:      "#4a5568",
  red:      "#ef4444",
  blue:     "#3b82f6",
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function SectionWrap({
  children,
  bg,
  py = 80,
  id,
}: {
  children: React.ReactNode
  bg?: string
  py?: number
  id?: string
}) {
  return (
    <section
      id={id}
      style={{
        background: bg ?? C.bg,
        padding: `${py}px 0`,
        width: "100%",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {children}
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "rgba(124,58,237,0.12)",
        border: `1px solid rgba(124,58,237,0.28)`,
        color: "#a78bfa",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "5px 14px",
        borderRadius: 100,
        marginBottom: 16,
      }}
    >
      {children}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(26px,4vw,38px)",
        fontWeight: 800,
        color: C.text,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  )
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.6, marginBottom: 48, maxWidth: 640 }}>
      {children}
    </p>
  )
}

function GreenCTA({
  href,
  children,
  size = "md",
  fullWidth,
}: {
  href: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}) {
  const pad = size === "lg" ? "18px 44px" : size === "sm" ? "10px 22px" : "14px 34px"
  const fs = size === "lg" ? 18 : size === "sm" ? 14 : 16
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary"
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        justifyContent: "center",
        padding: pad,
        fontSize: fs,
        borderRadius: 12,
        fontWeight: 800,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </a>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "28px 24px",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function CheckIcon({ color = C.green }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="9" cy="9" r="9" fill={color} fillOpacity="0.15" />
      <path d="M5 9l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="9" cy="9" r="9" fill={C.red} fillOpacity="0.15" />
      <path d="M6 6l6 6M12 6l-6 6" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────

function HeroSection({ product }: { product: Product }) {
  const h = product.hybrid?.hero
  const link = product.affiliate_link || "#"
  const headline =
    h?.headline ??
    `I Tested ${product.name} Before You Buy — Here's My Honest Take`
  const sub =
    h?.sub ??
    product.tagline
  const badge = h?.badge ?? `⭐ Reviewed by DigitaltoolRadar`
  const verdictText = h?.verdict_text ?? null
  const ctaText = h?.cta_text ?? `Get ${product.name} + Exclusive Bonus Pack`
  const launchNote = h?.launch_note ?? null

  return (
    <section
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, ${C.bg} 70%)`,
        padding: "80px 0 64px",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Layout: text left, image right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: product.product_image ? "1fr 420px" : "1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: copy */}
          <div>
            {/* Badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,212,146,0.1)",
                border: `1px solid rgba(0,212,146,0.25)`,
                color: C.green,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 100,
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>

            <h1
              style={{
                fontSize: "clamp(28px,4.5vw,50px)",
                fontWeight: 900,
                color: C.text,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                marginBottom: 20,
              }}
            >
              {headline}
            </h1>

            <p
              style={{
                fontSize: "clamp(16px,2vw,19px)",
                color: C.muted,
                lineHeight: 1.65,
                marginBottom: 32,
                maxWidth: 580,
              }}
            >
              {sub}
            </p>

            {/* Quick verdict pill */}
            {verdictText && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "10px 18px",
                  marginBottom: 32,
                  fontSize: 14,
                  color: C.text,
                }}
              >
                <span style={{ color: C.green, fontWeight: 700 }}>Quick take:</span>
                <span>{verdictText}</span>
              </div>
            )}

            {/* CTA row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <GreenCTA href={link} size="lg">{ctaText} →</GreenCTA>
              <a
                href="#review"
                style={{ color: C.muted, fontSize: 14, textDecoration: "underline" }}
              >
                Read full review first
              </a>
            </div>

            {launchNote && (
              <p
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  color: C.amber,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                🕐 {launchNote}
              </p>
            )}

            {/* Price note */}
            <p style={{ marginTop: 12, fontSize: 13, color: C.dim }}>
              ${product.price} one-time · {product.commission}% commission ·{" "}
              <span style={{ color: C.green }}>30-day money-back guarantee</span>
            </p>
          </div>

          {/* Right: product image */}
          {product.product_image && (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  background: `radial-gradient(ellipse at center, rgba(0,212,146,0.12) 0%, transparent 70%)`,
                  borderRadius: 24,
                  pointerEvents: "none",
                }}
              />
              <img
                src={product.product_image}
                alt={`${product.name} dashboard`}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                  position: "relative",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── 2. QUICK DECISION STRIP ──────────────────────────────────────────────────

function QuickDecisionStrip({ product }: { product: Product }) {
  const qd = product.hybrid?.quick_decision
  if (!qd) return null

  const items = [
    { icon: "✅", label: "Best For", value: qd.best_for?.join(", ") },
    { icon: "⛔", label: "Not Ideal For", value: qd.not_for?.join(", ") },
    { icon: "🎯", label: "Skill Level", value: qd.skill_level },
    { icon: "⚡", label: "Setup Time", value: qd.setup_time },
    { icon: "💼", label: "Main Use Case", value: qd.use_case },
    { icon: "🏆", label: "Verdict Score", value: qd.verdict_score },
    { icon: "💳", label: "Deal Type", value: qd.deal_type },
    { icon: "🎁", label: "Bonus", value: qd.bonus_available ? "Included with our link" : "Not available" },
  ].filter((i) => i.value)

  return (
    <section
      style={{
        background: C.bgElevated,
        borderBottom: `1px solid ${C.border}`,
        borderTop: `1px solid ${C.border}`,
        padding: "32px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {item.icon} {item.label}
              </span>
              <span style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 3. TRANSFORMATION ────────────────────────────────────────────────────────

function TransformationSection({ product }: { product: Product }) {
  const t = product.hybrid?.transformation
  if (!t) return null

  return (
    <SectionWrap bg={C.bg}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>The Shift</SectionLabel>
        <SectionHeading>Your Workflow Before vs. After {product.name}</SectionHeading>
        <SectionSub>See exactly what changes when you add this to your stack.</SectionSub>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        {/* Before */}
        <Card style={{ borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 20 }}>😩</span>
            <h3 style={{ color: C.red, fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>
              BEFORE
            </h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {t.before.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <XIcon />
                <span style={{ color: C.muted, fontSize: 15, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* After */}
        <Card style={{ borderColor: "rgba(0,212,146,0.2)", background: "rgba(0,212,146,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 20 }}>🚀</span>
            <h3 style={{ color: C.green, fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>
              AFTER {product.name.toUpperCase()}
            </h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {t.after.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <CheckIcon />
                <span style={{ color: C.text, fontSize: 15, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SectionWrap>
  )
}

// ─── 4. FIRST CTA ─────────────────────────────────────────────────────────────

function FirstCTA({ product }: { product: Product }) {
  const h = product.hybrid
  const link = product.affiliate_link || "#"
  const ctaText = h?.cta_primary ?? `Get ${product.name} + DigitaltoolRadar Bonus Pack`

  return (
    <section
      style={{
        background: `linear-gradient(135deg, rgba(0,212,146,0.08) 0%, rgba(124,58,237,0.08) 100%)`,
        border: `1px solid rgba(0,212,146,0.15)`,
        borderLeft: "none",
        borderRight: "none",
        padding: "56px 0",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: C.green, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          🎁 Exclusive Bonus Available
        </p>
        <h2
          style={{
            fontSize: "clamp(22px,3.5vw,34px)",
            fontWeight: 800,
            color: C.text,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Ready to try {product.name}?
        </h2>
        <p style={{ color: C.muted, fontSize: 15, marginBottom: 28 }}>
          Buy through our link and get the DigitaltoolRadar bonus stack included — at no extra cost.
        </p>
        <GreenCTA href={link} size="lg" fullWidth>{ctaText} →</GreenCTA>
        <p style={{ marginTop: 14, fontSize: 13, color: C.dim }}>
          ${product.price} one-time · 30-day refund guarantee · Instant access
        </p>
      </div>
    </section>
  )
}

// ─── 5. COMMUNITY TRUST ───────────────────────────────────────────────────────

function CommunityTrust({ product }: { product: Product }) {
  const sp = product.hybrid?.social_proof
  if (!sp || sp.items.length === 0) return null

  const title = sp.title ?? "Why Readers Trust DigitaltoolRadar"

  return (
    <section
      style={{
        background: C.bgCard,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: "80px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Social Proof</SectionLabel>
          <SectionHeading>{title}</SectionHeading>
          <SectionSub>Real feedback from people who acted on our previous recommendations.</SectionSub>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {sp.items.map((item: HybridSocialProofItem, i) => (
            <div
              key={i}
              style={{
                background: C.bgElevated,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "22px 20px",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12, lineHeight: 1 }}>"</div>
              <p style={{ color: C.text, fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                {item.text}
              </p>
              {(item.author || item.platform) && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.purple}, ${C.green})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "#fff",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.author?.[0] ?? "R"}
                  </div>
                  <div>
                    {item.author && (
                      <p style={{ color: C.text, fontSize: 13, fontWeight: 600, margin: 0 }}>
                        {item.author}
                      </p>
                    )}
                    {item.platform && (
                      <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>{item.platform}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. WHAT YOU ACTUALLY GET ─────────────────────────────────────────────────

function WhatYouGet({ product }: { product: Product }) {
  // Use hybrid feature_cards if available; fall back to features[]
  const cards: HybridFeatureCard[] =
    product.hybrid?.feature_cards ??
    (product.features ?? []).map((f) => {
      const [title, ...rest] = f.split(" — ")
      return { title, description: rest.join(" — ") || f }
    })

  if (cards.length === 0) return null

  return (
    <SectionWrap bg={C.bg} id="features">
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>What's Inside</SectionLabel>
        <SectionHeading>What You Actually Get With {product.name}</SectionHeading>
        <SectionSub>Every module, tool, and capability — explained in plain terms.</SectionSub>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {cards.map((card, i) => (
          <Card key={i}>
            {card.icon && (
              <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
            )}
            <h3
              style={{
                color: C.text,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.01em",
                marginBottom: 8,
              }}
            >
              {card.title}
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginBottom: card.why_it_matters ? 12 : 0 }}>
              {card.description}
            </p>
            {card.why_it_matters && (
              <div
                style={{
                  background: "rgba(0,212,146,0.07)",
                  border: `1px solid rgba(0,212,146,0.15)`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: C.green,
                }}
              >
                💡 {card.why_it_matters}
              </div>
            )}
          </Card>
        ))}
      </div>
    </SectionWrap>
  )
}

// ─── 7. USE CASES ─────────────────────────────────────────────────────────────

function UseCasesSection({ product }: { product: Product }) {
  const cases = product.hybrid?.use_cases
  if (!cases || cases.length === 0) return null

  return (
    <SectionWrap bg={C.bgCard}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Who It's For</SectionLabel>
        <SectionHeading>How Different Creators Use {product.name}</SectionHeading>
        <SectionSub>Find your workflow below and see what changes for you.</SectionSub>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {cases.map((uc: HybridUseCase, i) => (
          <Card key={i} style={{ background: C.bgElevated }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {uc.icon && <span style={{ fontSize: 24 }}>{uc.icon}</span>}
              <h3 style={{ color: C.text, fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>
                {uc.persona}
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {uc.workflow.map((step, j) => (
                <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span
                    style={{
                      background: C.purple,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 100,
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {j + 1}
                  </span>
                  <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ul>
            {uc.outcome && (
              <div
                style={{
                  background: "rgba(0,212,146,0.07)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: C.green,
                  display: "flex",
                  gap: 6,
                }}
              >
                <span>→</span>
                <span>{uc.outcome}</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </SectionWrap>
  )
}

// ─── 8. HONEST REVIEW ─────────────────────────────────────────────────────────

function HonestReview({ product }: { product: Product }) {
  const body = product.hybrid?.review_body ?? product.review_article
  const pros = product.pros ?? []
  const cons = product.cons ?? []
  const hasProscons = pros.length > 0 || cons.length > 0

  return (
    <SectionWrap bg={C.bg} id="review">
      <SectionLabel>The Review</SectionLabel>
      <SectionHeading>{product.name} — My Honest Take</SectionHeading>

      {/* Pros / Cons */}
      {hasProscons && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 48 }}>
          <Card style={{ borderColor: "rgba(0,212,146,0.2)", background: "rgba(0,212,146,0.04)" }}>
            <h3 style={{ color: C.green, fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>
              ✅ What I Liked
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {pros.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckIcon />
                  <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card style={{ borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)" }}>
            <h3 style={{ color: C.red, fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>
              ⚠️ Limitations
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {cons.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <XIcon />
                  <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* Review body */}
      {body && (
        <div
          className="review-body"
          dangerouslySetInnerHTML={{ __html: body }}
          style={{
            color: C.muted,
            lineHeight: 1.75,
            fontSize: 16,
          }}
        />
      )}
    </SectionWrap>
  )
}

// ─── 9. MICRO-PROOF ───────────────────────────────────────────────────────────

function MicroProof({ product }: { product: Product }) {
  const items = product.hybrid?.micro_proof
  if (!items || items.length === 0) return null

  return (
    <SectionWrap bg={C.bgCard}>
      <SectionLabel>Observed Details</SectionLabel>
      <SectionHeading>What Actually Stood Out</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 32,
        }}
      >
        {items.map((item: HybridMicroProofItem, i) => (
          <div
            key={i}
            style={{
              background: C.bgElevated,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.purple}`,
              borderRadius: 10,
              padding: "18px 20px",
            }}
          >
            <p style={{ color: "#a78bfa", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              {item.label}
            </p>
            <p style={{ color: C.text, fontSize: 15, lineHeight: 1.6, marginBottom: item.source ? 8 : 0 }}>
              {item.text}
            </p>
            {item.source && (
              <p style={{ color: C.dim, fontSize: 12, fontStyle: "italic" }}>{item.source}</p>
            )}
          </div>
        ))}
      </div>
    </SectionWrap>
  )
}

// ─── 10. BONUS STACK ──────────────────────────────────────────────────────────

function BonusStack({ product }: { product: Product }) {
  const link = product.affiliate_link || "#"
  // Use hybrid bonus_stack if available; fall back to landing.bonuses
  const bonuses: HybridBonusItem[] =
    product.hybrid?.bonus_stack ??
    (product.landing?.bonuses ?? []).map((b) => ({
      name: b.name,
      description: b.description,
      badge: b.badge,
    }))

  if (bonuses.length === 0) return null

  const claimSteps = product.hybrid?.bonus_claim_steps ?? [
    `Click our affiliate link and complete your purchase`,
    `Forward your JVZoo/payment receipt to our email`,
    `Receive your bonus files within 24 hours`,
  ]

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, rgba(124,58,237,0.06) 50%, ${C.bg} 100%)`,
        padding: "80px 0",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Exclusive Bonus Stack</SectionLabel>
          <SectionHeading>Buy Through Our Link — Get These Free</SectionHeading>
          <SectionSub>
            These bonuses are designed to help you implement {product.name} faster — not just random files.
          </SectionSub>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {bonuses.map((b: HybridBonusItem, i) => (
            <div
              key={i}
              style={{
                background: C.bgCard,
                border: `1px solid rgba(124,58,237,0.2)`,
                borderRadius: 16,
                padding: "24px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {b.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: C.purple,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {b.badge}
                </span>
              )}
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(124,58,237,0.15)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 14,
                }}
              >
                🎁
              </div>
              <h3 style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 8, letterSpacing: "-0.01em" }}>
                {b.name}
              </h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginBottom: b.why_it_matters ? 12 : 0 }}>
                {b.description}
              </p>
              {b.why_it_matters && (
                <p style={{ color: "#a78bfa", fontSize: 13, fontStyle: "italic" }}>
                  → {b.why_it_matters}
                </p>
              )}
              {b.value && (
                <p style={{ color: C.green, fontSize: 13, fontWeight: 700, marginTop: 10 }}>
                  Value: {b.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* How to claim */}
        <Card style={{ textAlign: "center", borderColor: "rgba(0,212,146,0.15)" }}>
          <h3 style={{ color: C.text, fontWeight: 700, fontSize: 18, marginBottom: 24 }}>
            How to Claim Your Bonus
          </h3>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {claimSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, maxWidth: 280, textAlign: "left" }}>
                <span
                  style={{
                    background: C.green,
                    color: "#031a10",
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
          <GreenCTA href={link} size="lg">
            Get {product.name} + Claim Your Bonus →
          </GreenCTA>
        </Card>
      </div>
    </section>
  )
}

// ─── 11. COMPARISON ───────────────────────────────────────────────────────────

function ComparisonSection({ product }: { product: Product }) {
  const comp = product.hybrid?.comparison
  if (!comp || comp.rows.length === 0) return null

  return (
    <SectionWrap bg={C.bgCard}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <SectionLabel>Compare</SectionLabel>
        <SectionHeading>{comp.title ?? `${product.name} vs. The Alternative`}</SectionHeading>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 16px", color: C.muted, fontWeight: 600, fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                What You&apos;re Comparing
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "12px 16px",
                  color: C.green,
                  fontWeight: 700,
                  fontSize: 13,
                  borderBottom: `1px solid ${C.border}`,
                  background: "rgba(0,212,146,0.06)",
                }}
              >
                {product.name}
              </th>
              <th style={{ textAlign: "center", padding: "12px 16px", color: C.muted, fontWeight: 600, fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                Without It
              </th>
            </tr>
          </thead>
          <tbody>
            {comp.rows.map((row: HybridComparisonRow, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
              >
                <td style={{ padding: "14px 16px", color: C.text, fontWeight: 600, fontSize: 14, borderBottom: `1px solid ${C.border}` }}>
                  {row.dimension}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    color: row.advantage === "product" ? C.green : C.text,
                    fontWeight: row.advantage === "product" ? 700 : 400,
                    fontSize: 14,
                    borderBottom: `1px solid ${C.border}`,
                    background: "rgba(0,212,146,0.04)",
                  }}
                >
                  {row.product}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    color: row.advantage === "alternative" ? C.green : C.muted,
                    fontSize: 14,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {row.alternative}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrap>
  )
}

// ─── 12. FAQ ──────────────────────────────────────────────────────────────────

function FAQSection({
  product,
  openFaq,
  setOpenFaq,
}: {
  product: Product
  openFaq: number | null
  setOpenFaq: (i: number | null) => void
}) {
  const faqs = product.faqs ?? []
  if (faqs.length === 0) return null

  return (
    <SectionWrap bg={C.bg} id="faq">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>Questions Before You Buy</SectionHeading>
          <SectionSub>Straight answers to the questions that matter before you decide.</SectionSub>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: C.bgCard,
                border: `1px solid ${openFaq === i ? "rgba(0,212,146,0.3)" : C.border}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "18px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <span style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{faq.q}</span>
                <span
                  style={{
                    color: C.green,
                    fontSize: 20,
                    flexShrink: 0,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 18px", color: C.muted, fontSize: 15, lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

// ─── 13. FINAL DECISION BLOCK ─────────────────────────────────────────────────

function FinalDecisionBlock({ product }: { product: Product }) {
  const fd = product.hybrid?.final_decision
  if (!fd) return null

  return (
    <SectionWrap bg={C.bgCard}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionLabel>My Verdict</SectionLabel>
          <SectionHeading>Should You Buy {product.name}?</SectionHeading>
        </div>

        <Card
          style={{
            borderColor: "rgba(0,212,146,0.2)",
            background: "rgba(0,212,146,0.04)",
            marginBottom: 24,
          }}
        >
          <p style={{ color: C.text, fontSize: 16, lineHeight: 1.7 }}>{fd.verdict}</p>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <Card style={{ borderColor: "rgba(0,212,146,0.15)", background: "rgba(0,212,146,0.03)" }}>
            <h3 style={{ color: C.green, fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              ✅ Buy If You…
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {fd.buy_if.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", color: C.muted, fontSize: 14, lineHeight: 1.5 }}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card style={{ borderColor: "rgba(239,68,68,0.12)", background: "rgba(239,68,68,0.03)" }}>
            <h3 style={{ color: C.red, fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              ⛔ Skip If You…
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {fd.skip_if.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", color: C.muted, fontSize: 14, lineHeight: 1.5 }}>
                  <XIcon />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {fd.strongest_reason && (
          <div
            style={{
              background: C.bgElevated,
              borderLeft: `4px solid ${C.purple}`,
              borderRadius: 10,
              padding: "16px 20px",
              fontSize: 15,
              color: C.text,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#a78bfa" }}>Strongest reason to act:</strong>{" "}
            {fd.strongest_reason}
          </div>
        )}
      </div>
    </SectionWrap>
  )
}

// ─── 14. FINAL CTA ────────────────────────────────────────────────────────────

function FinalCTA({ product }: { product: Product }) {
  const h = product.hybrid
  const link = product.affiliate_link || "#"
  const ctaText = h?.cta_primary ?? `Get ${product.name} + DigitaltoolRadar Bonus Pack`

  return (
    <section
      style={{
        background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,146,0.1) 0%, rgba(124,58,237,0.08) 40%, ${C.bg} 80%)`,
        padding: "100px 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(28px,4.5vw,46px)",
            fontWeight: 900,
            color: C.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          This is the decision moment.
        </h2>
        <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.65, marginBottom: 12 }}>
          If you&apos;ve been considering <strong style={{ color: C.text }}>{product.name}</strong>, the launch window is the best time to get in at the lowest price.
        </p>
        <p style={{ color: C.muted, fontSize: 16, marginBottom: 36 }}>
          Buy through our link and the DigitaltoolRadar bonus stack is included — at no extra charge.
        </p>
        <GreenCTA href={link} size="lg" fullWidth>
          {ctaText} →
        </GreenCTA>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
          {["30-day refund guarantee", "Instant access", `$${product.price} one-time`].map((note) => (
            <span key={note} style={{ color: C.muted, fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
              <CheckIcon color={C.green} /> {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 15. FOOTER TRUST ────────────────────────────────────────────────────────

function FooterTrust({ product }: { product: Product }) {
  return (
    <footer
      style={{
        background: C.bgCard,
        borderTop: `1px solid ${C.border}`,
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>DigitaltoolRadar</p>
        <p style={{ color: C.muted, fontSize: 13, maxWidth: 580, lineHeight: 1.6 }}>
          We review AI tools and software to help you make informed buying decisions. We only recommend products we believe add genuine value.
        </p>
        <p style={{ color: C.dim, fontSize: 12, maxWidth: 620, lineHeight: 1.6 }}>
          <strong>Affiliate disclosure:</strong> This page contains affiliate links. If you purchase through our link, we earn a commission at no additional cost to you. This helps us keep producing honest, independent reviews.
        </p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
            { label: "All Reviews", href: "/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p style={{ color: C.dim, fontSize: 12 }}>
          © {new Date().getFullYear()} DigitaltoolRadar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HybridReviewPage({ product }: { product: Product }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, minHeight: "100vh" }}>
      {/* 1. Hero */}
      <HeroSection product={product} />

      {/* 2. Quick Decision Strip */}
      <QuickDecisionStrip product={product} />

      {/* 3. Transformation */}
      <TransformationSection product={product} />

      {/* 4. First CTA */}
      <FirstCTA product={product} />

      {/* 5. Community Trust */}
      <CommunityTrust product={product} />

      {/* 6. What You Get */}
      <WhatYouGet product={product} />

      {/* 7. Use Cases */}
      <UseCasesSection product={product} />

      {/* 8. Honest Review */}
      <HonestReview product={product} />

      {/* 9. Micro Proof */}
      <MicroProof product={product} />

      {/* 10. Bonus Stack */}
      <BonusStack product={product} />

      {/* 11. Comparison */}
      <ComparisonSection product={product} />

      {/* 12. FAQ */}
      <FAQSection product={product} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* 13. Final Decision */}
      <FinalDecisionBlock product={product} />

      {/* 14. Final CTA */}
      <FinalCTA product={product} />

      {/* 15. Footer Trust */}
      <FooterTrust product={product} />
    </div>
  )
}
