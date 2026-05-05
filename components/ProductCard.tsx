import type { Product } from "@/lib/types"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  const now = Date.now()
  const launchMs = new Date(product.launch_date).getTime()
  const daysUntil = Math.ceil((launchMs - now) / 86_400_000)
  const isLive = daysUntil <= 0

  return (
    <div
      className="card flex flex-col"
      style={{ overflow: "hidden", borderLeft: "3px solid transparent" }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderLeftColor = "#00d492"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent"
      }}
    >
      {/* Top meta */}
      <div
        className="flex items-center justify-between px-5 pt-5 pb-0"
        style={{ gap: "0.5rem" }}
      >
        <span className="badge badge-slate">{product.niche}</span>
        {isLive ? (
          <span className="badge badge-green">Live now</span>
        ) : (
          <span className="badge badge-amber">In {daysUntil}d</span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-2 flex-1">
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#edf2f7",
            marginBottom: "0.4rem",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#7b8ea5",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.tagline}
        </p>
      </div>

      {/* Stats row */}
      <div
        className="mx-5 my-3 px-4 py-3 rounded-lg flex items-center gap-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          fontSize: "0.78rem",
          color: "#7b8ea5",
        }}
      >
        <span>
          <span style={{ color: "#edf2f7", fontWeight: 700 }}>${product.price}</span>{" "}
          price
        </span>
        <span
          style={{
            width: 1,
            height: 14,
            background: "rgba(255,255,255,0.08)",
            display: "inline-block",
          }}
        />
        <span>
          <span style={{ color: "#00d492", fontWeight: 700 }}>{product.commission}%</span>{" "}
          commission
        </span>
        {product.vendor && (
          <>
            <span
              style={{
                width: 1,
                height: 14,
                background: "rgba(255,255,255,0.08)",
                display: "inline-block",
              }}
            />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
              {product.vendor.split(" and ")[0]}
            </span>
          </>
        )}
      </div>

      {/* CTA row */}
      <div className="px-5 pb-5 flex gap-2.5">
        <Link href={`/${product.slug}-review`} className="btn-outline" style={{ flex: 1, fontSize: "0.85rem", padding: "0.6rem 0.75rem" }}>
          Read Review
        </Link>
        <Link href={`/${product.slug}-bonus`} className="btn-primary" style={{ flex: 1, fontSize: "0.85rem", padding: "0.6rem 0.75rem" }}>
          Get Bonuses
        </Link>
      </div>
    </div>
  )
}
