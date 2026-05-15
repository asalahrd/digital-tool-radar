import type { Product } from "@/lib/types"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  const daysUntil = Math.ceil(
    (new Date(product.launch_date).getTime() - Date.now()) / 86400000
  )
  const status = daysUntil > 0 ? `Launches in ${daysUntil}d` : "Now live"
  const statusColor = daysUntil > 0 ? "text-amber-600 bg-amber-50" : "text-green-700 bg-green-50"

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{product.niche}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor}`}>{status}</span>
      </div>
      <h3 className="font-extrabold text-slate-900 text-lg mb-1">{product.name}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.tagline}</p>
      <div className="flex gap-2">
        <Link
          href={`/${product.slug}-review`}
          className="flex-1 text-center text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
        >
          Read Review
        </Link>
        <Link
          href={`/${product.slug}-bonus`}
          className="flex-1 text-center text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-colors"
        >
          Get Bonuses
        </Link>
      </div>
    </div>
  )
}
