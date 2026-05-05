import type { Product } from "@/lib/types"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  const launchMs = new Date(product.launch_date).getTime()
  const daysUntil = Math.ceil((launchMs - Date.now()) / 86400000)
  const isLive = daysUntil <= 0

  return (
    <div className="product-card">
      <div className="product-card-meta">
        <span className="badge badge-slate">{product.niche}</span>
        {isLive ? (
          <span className="badge badge-green">Live now</span>
        ) : (
          <span className="badge badge-amber">In {daysUntil}d</span>
        )}
      </div>

      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-tagline">{product.tagline}</p>

      <div className="product-card-stats">
        <span>
          <strong style={{ color: "#edf2f7" }}>${product.price}</strong>{" "}
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
          <strong style={{ color: "#00d492" }}>{product.commission}%</strong>{" "}
          commission
        </span>
      </div>

      <div className="product-card-actions">
        <Link
          href={`/${product.slug}-review`}
          className="btn-outline btn-sm"
        >
          Read Review
        </Link>
        <Link
          href={`/${product.slug}-bonus`}
          className="btn-primary btn-sm"
        >
          Get Bonuses
        </Link>
      </div>
    </div>
  )
}
