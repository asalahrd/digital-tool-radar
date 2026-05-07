import type { Product } from "@/lib/types"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  const launchMs = new Date(product.launch_date).getTime()
  const daysUntil = Math.ceil((launchMs - Date.now()) / 86400000)
  const isLive = daysUntil <= 0

  return (
    <div className="product-card">
      {/* Product image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "0.5rem",
          overflow: "hidden",
          marginBottom: "1rem",
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {product.product_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.product_image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,212,146,0.07) 0%, transparent 70%)",
            }}
          />
        )}
      </div>

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
          href={}
          className="btn-outline btn-sm"
        >
          Read Review
        </Link>
        <Link
          href={}
          className="btn-primary btn-sm"
        >
          Get Bonuses
        </Link>
      </div>
    </div>
  )
}
