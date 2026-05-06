import SubscribeForm from "./SubscribeForm"

export default function SubscribeSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, rgba(0,212,146,0.06) 0%, rgba(0,0,0,0) 100%)",
        border: "1px solid rgba(0,212,146,0.15)",
        borderRadius: "1.25rem",
        padding: "2.5rem",
        margin: "3rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Left — reasons */}
        <div style={{ flex: "1 1 260px" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#00d492",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            Free — No Credit Card
          </p>
          <h3
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#edf2f7",
              marginBottom: "0.75rem",
              letterSpacing: "-0.025em",
              lineHeight: 1.25,
            }}
          >
            Never Miss a Launch Deal
          </h3>
          <p
            style={{
              color: "#7b8ea5",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            Get honest reviews, exclusive bonus stacks, and price-drop alerts
            before the discount closes — straight to your inbox.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {[
              "📬  Reviews 48h before the public launch goes live",
              "🎁  Exclusive bonuses on every tool we recommend",
              "❌  Honest 'skip this' warnings on overhyped tools",
              "💸  Price-jump alerts so you always buy at launch pricing",
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <p
            style={{
              fontSize: "0.72rem",
              color: "#4a5568",
              marginTop: "1rem",
            }}
          >
            2–3 emails per month. No spam. Unsubscribe anytime.
          </p>
        </div>

        {/* Right — form */}
        <div style={{ flex: "1 1 260px" }}>
          <SubscribeForm />
        </div>
      </div>
    </section>
  )
}
