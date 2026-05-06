/* ── COMMUNITY TRUST LAYER ───────────────────────────────────────────────────
   Full-width pattern-interrupt section. Builds trust in DigitaltoolRadar as a
   recommendation brand — NOT product-specific testimonials.

   To add more screenshots:
   1. Drop the .webp file into /public/testimonials/
   2. Add an entry to the TESTIMONIALS array below.
   The masonry layout (desktop) and scroll strip (mobile) handle any count.
────────────────────────────────────────────────────────────────────────────── */

const TESTIMONIALS: { src: string; alt: string; rotate: string }[] = [
  {
    src: "/testimonials/t1.webp",
    alt: "WhatsApp message from Ahmed K. thanking DigitaltoolRadar for a previous recommendation — said it's saving him time creating content",
    rotate: "-1.4deg",
  },
  {
    src: "/testimonials/t6.webp",
    alt: "Tweet from @ryan_talks with 87 likes praising DigitaltoolRadar launch reviews — picked up 3 tools through their links",
    rotate: "0.6deg",
  },
  {
    src: "/testimonials/t3.webp",
    alt: "YouTube comments on a DigitaltoolRadar review — @MrTechFlow and @StartupHustler sharing feedback about previous recommendations",
    rotate: "-0.5deg",
  },
  {
    src: "/testimonials/t2.webp",
    alt: "Email from James W. with subject 'Your Review Helped Me Decide' — followed the DigitaltoolRadar link and says it was worth it",
    rotate: "1.1deg",
  },
  {
    src: "/testimonials/t4.webp",
    alt: "WhatsApp from Lina M. thanking DigitaltoolRadar for the Pictory AI breakdown — was skeptical but the review answered everything",
    rotate: "-0.9deg",
  },
  {
    src: "/testimonials/t5.webp",
    alt: "Email from Daniel M. thanking DigitaltoolRadar for the VidyoAI review — grabbed the lifetime deal and calls it a game changer",
    rotate: "0.7deg",
  },
]

export default function TrustLayer() {
  return (
    <>
      <style>{`
        /* ── Desktop: CSS-column masonry ─────────────────────────────── */
        .tl-masonry {
          column-count: 3;
          column-gap: 1.25rem;
        }
        .tl-card {
          break-inside: avoid;
          margin-bottom: 1.25rem;
          display: block;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }
        .tl-card:hover {
          transform: scale(1.02) rotate(0deg) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,212,146,0.12) !important;
          z-index: 2;
          position: relative;
        }
        /* ── Mobile: horizontal snap scroll ─────────────────────────── */
        .tl-scroll { display: none; }

        @media (max-width: 900px) {
          .tl-masonry { display: none; }
          .tl-scroll {
            display: flex;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            gap: 1rem;
            padding: 0.25rem 0.25rem 1.25rem;
            scrollbar-width: none;
            margin: 0 -1.25rem;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
          .tl-scroll::-webkit-scrollbar { display: none; }
          .tl-scroll-item {
            flex: 0 0 72vw;
            max-width: 300px;
            scroll-snap-align: center;
          }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          .tl-masonry { column-count: 3; }
        }
      `}</style>

      <section
        aria-label="What readers shared after following our previous recommendations"
        style={{
          width: "100%",
          background: "linear-gradient(180deg, rgba(0,8,5,0.97) 0%, rgba(2,12,8,1) 40%, rgba(2,12,8,1) 60%, rgba(0,8,5,0.97) 100%)",
          borderTop: "1px solid rgba(0,212,146,0.1)",
          borderBottom: "1px solid rgba(0,212,146,0.1)",
          padding: "4.5rem 1.25rem 3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background radial glow — subtle green, top-center */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "450px",
            background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,212,146,0.055) 0%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* ── Section header ──────────────────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#00d492",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "0.875rem",
            }}>
              Previous Launches &nbsp;·&nbsp; Reader Feedback
            </p>
            <h2 style={{
              fontSize: "clamp(1.35rem, 2.8vw, 1.9rem)",
              fontWeight: 800,
              color: "#edf2f7",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: "1rem",
              maxWidth: 640,
              margin: "0 auto 1rem",
            }}>
              What Readers Shared After Following Our Reviews
            </h2>
            <p style={{
              fontSize: "0.925rem",
              color: "#7b8ea5",
              lineHeight: 1.72,
              maxWidth: 560,
              margin: "0 auto",
            }}>
              Before every launch, the same question comes up: <em>&ldquo;Is this actually worth it?&rdquo;</em>{" "}
              These are messages from readers who followed previous DigitaltoolRadar recommendations
              and found tools that worked for their workflow.
            </p>
          </div>

          {/* ── Desktop masonry ─────────────────────────────────────── */}
          <div className="tl-masonry">
            {TESTIMONIALS.map(({ src, alt, rotate }, i) => (
              <div
                key={i}
                className="tl-card"
                style={{ transform: `rotate(${rotate})` }}
              >
                <div style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)",
                  background: "#111827",
                }}>
                  <img
                    src={src}
                    alt={alt}
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile horizontal scroll ─────────────────────────────── */}
          <div className="tl-scroll">
            {TESTIMONIALS.map(({ src, alt }, i) => (
              <div key={i} className="tl-scroll-item">
                <div style={{
                  borderRadius: "0.875rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
                  background: "#111827",
                }}>
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Scroll hint on mobile ────────────────────────────────── */}
          <p style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#374151",
            marginTop: "0.75rem",
            letterSpacing: "0.04em",
          }}>
            <span style={{ display: "inline-block" }} className="tl-mobile-hint">
              ← swipe to see more →
            </span>
          </p>
          <style>{`
            .tl-mobile-hint { display: none; }
            @media (max-width: 900px) { .tl-mobile-hint { display: inline-block; } }
          `}</style>

          {/* ── Footer note ─────────────────────────────────────────── */}
          <p style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#2d3748",
            marginTop: "2rem",
            lineHeight: 1.6,
          }}>
            Messages from readers of previous DigitaltoolRadar recommendations.
            Not claims about the current product — this product is in early access.
          </p>

        </div>
      </section>
    </>
  )
}
