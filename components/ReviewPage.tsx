import type { Product } from "@/lib/types"
import Link from "next/link"

export default function ReviewPage({ product }: { product: Product }) {
  const stars = "★★★★☆"

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
          {product.niche}
        </span>
        <h1 className="text-3xl font-extrabold mt-3 text-slate-900 leading-tight">
          {product.name} Review {new Date().getFullYear()} — Honest Look Inside
        </h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-slate-500">
          <span className="text-amber-500 text-lg">{stars}</span>
          <span>By Digital Tool Radar</span>
          <span>·</span>
          <span>Launch: {product.launch_date}</span>
          <span>·</span>
          <span>{product.commission}% commission</span>
        </div>
      </div>

      <CtaBox product={product} />

      <div className="prose prose-slate max-w-none mt-8">
        {product.review_article.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>
          if (line.startsWith("- ")) return <li key={i} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
          if (line.trim() === "") return <br key={i} />
          if (line === "[CTA_BUTTON]") return <CtaBox key={i} product={product} />
          return <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        })}
      </div>

      {product.otos.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">💰 OTO / Upsell Breakdown</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-4 py-3 font-semibold text-slate-600">Upsell</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Price</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Worth It?</th>
              </tr>
            </thead>
            <tbody>
              {product.otos.map((oto, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-4 py-3">
                    <strong>{oto.name}</strong>
                    <br />
                    <span className="text-slate-500">{oto.description}</span>
                  </td>
                  <td className="px-4 py-3">{oto.price ?? "Check page"}</td>
                  <td className="px-4 py-3">Reviewed in video ↑</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <CtaBox product={product} />
      </div>
    </div>
  )
}

function CtaBox({ product }: { product: Product }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6 text-center">
      <p className="text-sm font-semibold text-amber-700 mb-1">🎁 Buy through my link — get exclusive bonuses</p>
      <p className="text-lg font-bold text-slate-900 mb-4">{product.tagline}</p>
      <a
        href={product.affiliate_link}
        target="_blank"
        rel="nofollow noopener"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
      >
        Get {product.name} + My Bonuses →
      </a>
      <p className="text-xs text-slate-500 mt-3">
        ⏰ Bonuses expire {product.launch_date} ·{" "}
        <Link href={`/${product.slug}-bonus`} className="underline">
          See full bonus page
        </Link>
      </p>
    </div>
  )
}
